import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogById, updateBlog } from "../../services/blogService";
import "./styles/adminEditBlog.css";

const initialForm = {
  title: "", excerpt: "", content: "", coverImage: "",
  category: "", tags: "", authorName: "", seoTitle: "", seoDescription: "",
};

export default function MemberEditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [pageLoading, setPageLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const previewTags = useMemo(() => {
    return formData.tags.split(",").map((t) => t.trim()).filter(Boolean);
  }, [formData.tags]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setPageLoading(true);
        const res = await getBlogById(id);
        const blog = res?.blog;
        setFormData({
          title: blog?.title || "",
          excerpt: blog?.excerpt || "",
          content: blog?.content || "",
          coverImage: blog?.coverImage || "",
          category: blog?.category || "",
          tags: blog?.tags?.join(", ") || "",
          authorName: blog?.authorName || "",
          seoTitle: blog?.seoTitle || "",
          seoDescription: blog?.seoDescription || "",
        });
      } catch (error) {
        setErrorMessage(error.response?.data?.message || "Failed to load blog");
      } finally {
        setPageLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      };
      const res = await updateBlog(id, payload);
      setSuccessMessage(res?.message || "Blog updated successfully");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to update blog");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (pageLoading) return <div className="admin-edit-loading">Loading blog details...</div>;

  return (
    <div className="admin-edit-page">
      <div className="admin-edit-shell">

        <div className="admin-edit-top">
          <div>
            <p className="admin-edit-kicker">Member Panel</p>
            <h1>Edit Blog Post</h1>
            <p className="admin-edit-subtext">Update your blog content and metadata.</p>
          </div>
          <div className="admin-edit-top-actions">
            <button className="secondary-nav-btn" onClick={() => navigate("/member/blogs")}>
              ← Back to My Blogs
            </button>
          </div>
        </div>

        {errorMessage && <div className="edit-alert error">{errorMessage}</div>}
        {successMessage && <div className="edit-alert success">{successMessage}</div>}

        <div className="admin-edit-layout">
          <form onSubmit={handleSubmit} className="admin-edit-form">

            <div className="edit-section">
              <h2>Basic Details</h2>
              <div className="edit-grid two-col">
                <div className="edit-group">
                  <label>Title</label>
                  <input name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="edit-group">
                  <label>Author Name</label>
                  <input name="authorName" value={formData.authorName} onChange={handleChange} />
                </div>
              </div>
              <div className="edit-grid two-col">
                <div className="edit-group">
                  <label>Category</label>
                  <input name="category" value={formData.category} onChange={handleChange} />
                </div>
                <div className="edit-group">
                  <label>Cover Image URL</label>
                  <input name="coverImage" value={formData.coverImage} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="Article">Article</option>
                    <option value="Video">Video</option>
                  </select>
                </div>
              </div>
              <div className="edit-group">
                <label>Excerpt</label>
                <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows={3} required />
              </div>
              <div className="edit-group">
                <label>Content</label>
                <textarea name="content" value={formData.content} onChange={handleChange} rows={10} required />
              </div>
            </div>

            <div className="edit-section">
              <h2>Meta</h2>
              <div className="edit-group">
                <label>Tags <span style={{ fontWeight: 400, color: "#6b7280" }}>(comma separated)</span></label>
                <input name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g. cloud, security" />
                {previewTags.length > 0 && (
                  <div className="edit-preview-tags" style={{ marginTop: 8 }}>
                    {previewTags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                )}
              </div>
              <div className="edit-grid two-col">
                <div className="edit-group">
                  <label>SEO Title</label>
                  <input name="seoTitle" value={formData.seoTitle} onChange={handleChange} />
                </div>
                <div className="edit-group">
                  <label>SEO Description</label>
                  <textarea name="seoDescription" value={formData.seoDescription} onChange={handleChange} rows={3} />
                </div>
              </div>
            </div>

            <button type="submit" className="update-button" disabled={submitLoading}>
              {submitLoading ? "Updating..." : "Update Blog"}
            </button>

          </form>

          {/* Live Preview Panel */}
          <div className="edit-preview-panel">
            <div className="edit-preview-card">
              {formData.coverImage ? (
                <img src={formData.coverImage} alt="Preview" className="edit-preview-image" />
              ) : (
                <div className="edit-preview-image placeholder">Cover Preview</div>
              )}
              <div className="edit-preview-body">
                <div className="edit-preview-top">
                  <span className="edit-preview-category">{formData.category || "Category"}</span>
                  <span className="edit-preview-status draft">DRAFT</span>
                </div>
                <h3>{formData.title || "Blog title"}</h3>
                <p>{formData.excerpt || "Excerpt preview..."}</p>
                {previewTags.length > 0 && (
                  <div className="edit-preview-tags">
                    {previewTags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                )}
                <div className="edit-preview-footer">
                  <span>By <strong>{formData.authorName || "Author"}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}