import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs, deleteBlog } from "../../services/blogService";
import "./styles/adminBlogManagement.css";

export default function AdminBlogManagement() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoadingId, setDeleteLoadingId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [filters, setFilters] = useState({
        search: "",
        status: "",
        category: "",
    });

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            setErrorMessage("");

            const params = {};
            if (filters.search) params.search = filters.search;
            if (filters.status) params.status = filters.status;
            if (filters.category) params.category = filters.category;

            const res = await getBlogs(params);
            setBlogs(res?.blogs || []);
        } catch (error) {
            console.error("Admin blogs fetch error:", error);
            setErrorMessage(error.response?.data?.message || "Failed to fetch blogs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.status, filters.category]);

    const uniqueCategories = useMemo(() => {
        return [...new Set(blogs.map((blog) => blog.category).filter(Boolean))];
    }, [blogs]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchBlogs();
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmed) return;

        try {
            setDeleteLoadingId(id);
            setErrorMessage("");
            setSuccessMessage("");

            const res = await deleteBlog(id);
            setSuccessMessage(res.data?.message || "Blog deleted successfully");
            setBlogs((prev) => prev.filter((blog) => blog.id !== id));
        } catch (error) {
            console.error("Delete blog error:", error);
            setErrorMessage(error.response?.data?.message || "Failed to delete blog");
        } finally {
            setDeleteLoadingId("");
        }
    };

    return (
        <section className="admin-manage-page">
            <div className="admin-manage-shell">
                <div className="admin-manage-header">
                    <div>
                        <p className="admin-manage-kicker">Admin Panel</p>
                        <h1>Manage Blogs</h1>
                        <p className="admin-manage-subtext">
                            View, filter, and manage all your blog posts from one place.
                        </p>
                    </div>

                    <Link to="/admin/blogs/create" className="create-blog-link">
                        Create New Blog
                    </Link>
                </div>

                <div className="admin-manage-toolbar">
                    <form className="toolbar-search" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            name="search"
                            value={filters.search}
                            onChange={handleFilterChange}
                            placeholder="Search title, excerpt, content..."
                        />
                        <button type="submit">Search</button>
                    </form>

                    <div className="toolbar-filters">
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                        >
                            <option value="">All Status</option>
                            <option value="DRAFT">Draft</option>
                            <option value="PUBLISHED">Published</option>
                            <option value="ARCHIVED">Archived</option>
                        </select>

                        <select
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                        >
                            <option value="">All Categories</option>
                            {uniqueCategories.map((category) => (
                                <option value={category} key={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {successMessage ? (
                    <div className="manage-alert success">{successMessage}</div>
                ) : null}

                {errorMessage ? (
                    <div className="manage-alert error">{errorMessage}</div>
                ) : null}

                <div className="admin-manage-content">
                    {loading ? (
                        <div className="manage-empty-state">Loading blogs...</div>
                    ) : blogs.length === 0 ? (
                        <div className="manage-empty-state">
                            No blogs found for the selected filters.
                        </div>
                    ) : (
                        <div className="blog-manage-grid">
                            {blogs.map((blog) => (
                                <article className="manage-blog-card" key={blog.id}>
                                    {blog.coverImage ? (
                                        <img
                                            src={blog.coverImage}
                                            alt={blog.title}
                                            className="manage-blog-image"
                                        />
                                    ) : (
                                        <div className="manage-blog-image placeholder">
                                            No image
                                        </div>
                                    )}

                                    <div className="manage-blog-body">
                                        <div className="manage-card-top">
                                            <span className="manage-category">
                                                {blog.category || "Uncategorized"}
                                            </span>
                                            <span className={`manage-status ${blog.status.toLowerCase()}`}>
                                                {blog.status}
                                            </span>
                                        </div>

                                        <h3>{blog.title}</h3>
                                        <p>{blog.excerpt}</p>

                                        <div className="manage-tags">
                                            {blog.tags?.length ? (
                                                blog.tags.map((tag) => <span key={tag}>{tag}</span>)
                                            ) : (
                                                <span>No tags</span>
                                            )}
                                        </div>

                                        <div className="manage-meta">
                                            <span>{blog.authorName || "Unknown author"}</span>
                                            {blog.featured ? <strong>Featured</strong> : null}
                                        </div>

                                        <div className="manage-actions">
                                            <Link to={`/admin/blogs/edit/${blog.id}`} className="edit-btn">
                                                Edit
                                            </Link>

                                            <button
                                                type="button"
                                                className="delete-btn"
                                                onClick={() => handleDelete(blog.id)}
                                                disabled={deleteLoadingId === blog.id}
                                            >
                                                {deleteLoadingId === blog.id ? "Deleting..." : "Delete"}
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}