import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./styles/homeBlogsSection.css";

function formatDate(dateValue) {
  if (!dateValue) return "";
  return new Date(dateValue).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function HomeBlogsSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
  const fetchLatestBlogs = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const res = await api.get("/blogs/published/latest?limit=3");
      const fetchedBlogs = res.data?.blogs || [];
      setBlogs(fetchedBlogs);
    } catch (error) {
      console.error("Latest blogs fetch error:", error);
      setErrorMessage("Failed to fetch latest blogs");
    } finally {
      setLoading(false);
    }
  };

  fetchLatestBlogs();
}, []);

  return (
    <section className="home-blogs-section">
      <div className="home-blogs-container">
        <div className="home-blogs-header">
          <div>
            <p className="home-blogs-kicker">Latest Insights</p>
            <h2>Read the newest updates from our team</h2>
            <p className="home-blogs-subtext">
              Explore product updates, cloud insights, security notes, and practical engineering articles.
            </p>
          </div>

          <Link to="/blogs" className="home-blogs-view-all">
            View All Blogs
          </Link>
        </div>

        {loading ? (
          <div className="home-blogs-state">Loading latest blogs...</div>
        ) : errorMessage ? (
          <div className="home-blogs-state error">{errorMessage}</div>
        ) : blogs.length === 0 ? (
          <div className="home-blogs-state empty">
            No blogs have been published yet.
          </div>
        ) : (
          <div className="home-blogs-grid">
            {blogs.map((blog) => (
              <article className="home-blog-card" key={blog.id}>
                <Link to={`/blogs/${blog.slug}`} className="home-blog-image-link">
                  {blog.coverImage ? (
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="home-blog-image"
                    />
                  ) : (
                    <div className="home-blog-image placeholder">No image</div>
                  )}
                </Link>

                <div className="home-blog-body">
                  <div className="home-blog-top">
                    <span className="home-blog-category">
                      {blog.category || "Insight"}
                    </span>

                    {blog.featured ? (
                      <span className="home-blog-featured">Featured</span>
                    ) : null}
                  </div>

                  <h3>
                    <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                  </h3>

                  <p>{blog.excerpt}</p>

                  <div className="home-blog-tags">
                    {blog.tags?.length ? (
                      blog.tags.slice(0, 3).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))
                    ) : (
                      <span>No tags</span>
                    )}
                  </div>

                  <div className="home-blog-footer">
                    <div className="home-blog-meta">
                      <span>{blog.authorName || "Admin"}</span>
                      <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                    </div>

                    <Link to={`/blogs/${blog.slug}`} className="home-blog-read-more">
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}