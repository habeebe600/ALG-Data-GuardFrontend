import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./styles/homeBlogsSection.css";

function formatDate(dateValue) {
  if (!dateValue) return "";
  return new Date(dateValue).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function getReadTime(excerpt = "", title = "") {
  const text = `${title} ${excerpt}`.trim();
  const words = text ? text.split(/\s+/).length : 0;
  const mins = Math.max(1, Math.ceil(words / 120));
  return `${mins} min`;
}

export default function HomeBlogsSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const res = await api.get("/blogs/published/latest?limit=12");
        const fetchedBlogs = res.data?.blogs || [];

        setBlogs(fetchedBlogs);

        const firstCategory =
          fetchedBlogs.find((blog) => blog.category?.trim())?.category || "";

        setActiveCategory(firstCategory);
      } catch (error) {
        console.error("Latest blogs fetch error:", error);
        setErrorMessage("Unable to load blogs right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogs();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(blogs.map((blog) => blog.category).filter(Boolean))];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    const categoryBlogs = activeCategory
      ? blogs.filter((blog) => blog.category === activeCategory)
      : blogs;

    return categoryBlogs.slice(0, 3);
  }, [blogs, activeCategory]);

  return (
    <section className="home-blogs-section">
      <div className="home-blogs-container">
        <aside className="home-blogs-sidebar">
         

          <h2 className="home-blogs-sidebar-title">
            Industries we solve for:
          </h2>

          {loading ? (
            <div className="home-blogs-sidebar-loading">Loading categories...</div>
          ) : categories.length > 0 ? (
            <ul className="home-blogs-industry-list">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    className={
                      activeCategory === category
                        ? "industry-tab active"
                        : "industry-tab"
                    }
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="home-blogs-sidebar-loading">No categories found</div>
          )}
        </aside>

        <div className="home-blogs-content">
          {loading ? (
            <div className="home-blogs-state">Loading latest blogs...</div>
          ) : errorMessage ? (
            <div className="home-blogs-state error">{errorMessage}</div>
          ) : filteredBlogs.length === 0 ? (
            <div className="home-blogs-state empty">
              No blogs found for this category.
            </div>
          ) : (
            <>
              <div className="home-blogs-grid">
                {filteredBlogs.map((blog) => (
                  <article key={blog.id} className="home-blog-card">
                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="home-blog-image-link"
                    >
                      {blog.coverImage ? (
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="home-blog-image"
                        />
                      ) : (
                        <div className="home-blog-image placeholder">
                          No image
                        </div>
                      )}
                    </Link>

                    <div className="home-blog-body">
                      <p className="home-blog-date">
                        {formatDate(blog.publishedAt || blog.createdAt)}
                      </p>

                      <p className="home-blog-category-link">
                        {blog.category || "Services"}
                      </p>

                      <h3>
                        <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                      </h3>

                      <div className="home-blog-meta-line">
                        <span>{blog.featured ? "Video" : "Article"}</span>
                        <span>|</span>
                        <span>{getReadTime(blog.excerpt, blog.title)}</span>
                      </div>

                      <Link
                        to={`/blogs/${blog.slug}`}
                        className="home-blog-preview-link"
                      >
                        Show preview <span>+</span>
                      </Link>

                      <div className="home-blog-divider" />

                      <div className="home-blog-source">
                        <span>From</span>
                        <span className="home-blog-source-mark">ALG Data Guard</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="home-blogs-cta-wrap">
                <Link to="/blogs" className="home-blogs-cta">
                  Explore More in {activeCategory || "Blogs"}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}