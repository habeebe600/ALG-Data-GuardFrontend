import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./styles/blogsPage.css";

function formatDate(dateValue) {
  if (!dateValue) return "";
  return new Date(dateValue).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    category: "",
  });

  const [searchInput, setSearchInput] = useState("");

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const fetchBlogs = async (pageNumber = 1, activeFilters = filters) => {
    try {
      setLoading(true);
      setErrorMessage("");

      const params = {
        status: "PUBLISHED",
        page: pageNumber,
        limit,
      };

      if (activeFilters.search) params.search = activeFilters.search;
      if (activeFilters.category) params.category = activeFilters.category;

      const res = await api.get("/blogs", { params });

      setBlogs(res.data?.blogs || []);
      setTotal(res.data?.total || 0);
      setPage(res.data?.page || pageNumber);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to fetch blogs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(1, filters);
  }, [filters.category]);

  const categories = useMemo(() => {
    return [...new Set(blogs.map((blog) => blog.category).filter(Boolean))];
  }, [blogs]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const updatedFilters = {
      ...filters,
      search: searchInput.trim(),
    };

    setFilters(updatedFilters);
    fetchBlogs(1, updatedFilters);
  };

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    fetchBlogs(nextPage, filters);
  };

  return (
    <section className="blogs-page">
      <div className="blogs-page-container">
        <div className="blogs-page-hero">
          <p className="blogs-page-kicker">Insights & Articles</p>
          <h1>Read our latest blogs and technical updates</h1>
          <p className="blogs-page-subtext">
            Browse engineering articles, cloud notes, infrastructure updates, security insights, and practical product thinking from our team.
          </p>
        </div>

        <div className="blogs-toolbar">
          <form className="blogs-search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <div className="blogs-filter-group">
            <select
              name="category"
              value={filters.category}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

       {loading ? (
  <div className="blogs-state">Loading blogs...</div>
) : errorMessage ? (
  <div className="blogs-state error">{errorMessage}</div>
) : blogs.length === 0 ? (
  <div className="blogs-state empty">
    No blogs have been published yet.
  </div>
) : (
          <>
            <div className="blogs-grid">
              {blogs.map((blog) => (
                <article className="blog-list-card" key={blog.id}>
                  <Link to={`/blogs/${blog.slug}`} className="blog-list-image-link">
                    {blog.coverImage ? (
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="blog-list-image"
                      />
                    ) : (
                      <div className="blog-list-image placeholder">No image</div>
                    )}
                  </Link>

                  <div className="blog-list-body">
                    <div className="blog-list-top">
                      <span className="blog-list-category">
                        {blog.category || "Insight"}
                      </span>
                      {blog.featured ? (
                        <span className="blog-list-featured">Featured</span>
                      ) : null}
                    </div>

                    <h2>
                      <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                    </h2>

                    <p>{blog.excerpt}</p>

                    <div className="blog-list-tags">
                      {blog.tags?.length ? (
                        blog.tags.slice(0, 3).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))
                      ) : (
                        <span>No tags</span>
                      )}
                    </div>

                    <div className="blog-list-footer">
                      <div className="blog-list-meta">
                        <span>{blog.authorName || "Admin"}</span>
                        <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                      </div>

                      <Link to={`/blogs/${blog.slug}`} className="blog-list-read-more">
                        Read More
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="blogs-pagination">
              <button
                type="button"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>

              <span>
                Page {page} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}