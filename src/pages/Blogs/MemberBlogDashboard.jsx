import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyBlogs, deleteBlog } from "../../services/blogService";
import "./styles/adminBlogManagement.css";

export default function MemberBlogDashboard() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await getMyBlogs();
      setBlogs(res.blogs || []);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Failed to load your blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      setDeleteLoadingId(id);
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Failed to delete blog");
    } finally {
      setDeleteLoadingId(null);
    }
  };

  if (loading) return <div className="manage-empty-state">Loading your blogs...</div>;

  return (
    <div className="admin-manage-page">
      <div className="admin-manage-shell">

        <div className="admin-manage-header">
          <div>
            <p className="admin-manage-kicker">Member Panel</p>
            <h1>My Blogs</h1>
            <p className="admin-manage-subtext">
              Manage your blog posts. All new posts are saved as Draft for admin review.
            </p>
          </div>
          <button
            className="create-blog-link"
            onClick={() => navigate("/member/blogs/create")}
          >
            + New Blog
          </button>
        </div>

        {errorMessage && (
          <div className="manage-alert error">{errorMessage}</div>
        )}

        {blogs.length === 0 ? (
          <div className="manage-empty-state">
            <p>You haven't created any blogs yet.</p>
            <br />
            <button className="create-blog-link" onClick={() => navigate("/member/blogs/create")}>
              Create your first blog
            </button>
          </div>
        ) : (
          <div className="blog-manage-grid">
            {blogs.map((blog) => (
              <div key={blog.id} className="manage-blog-card">
                {blog.coverImage ? (
                  <img src={blog.coverImage} alt={blog.title} className="manage-blog-image" />
                ) : (
                  <div className="manage-blog-image placeholder">No Image</div>
                )}
                <div className="manage-blog-body">
                  <div className="manage-card-top">
                    <span className="manage-category">{blog.category || "Uncategorized"}</span>
                    <span className={`manage-status ${blog.status.toLowerCase()}`}>
                      {blog.status}
                    </span>
                  </div>
                  <h3>{blog.title}</h3>
                  <p>{blog.excerpt}</p>
                  <div className="manage-tags">
                    {blog.tags?.length
                      ? blog.tags.map((tag) => <span key={tag}>{tag}</span>)
                      : <span>No tags</span>
                    }
                  </div>
                  <div className="manage-actions">
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/member/blogs/edit/${blog.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(blog.id)}
                      disabled={deleteLoadingId === blog.id}
                    >
                      {deleteLoadingId === blog.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}