import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../../services/blogService";
import "./styles/adminCreateBlog.css";

const initialForm = {
  title: "", excerpt: "", content: "", coverImage: "",
  category: "", tags: "", authorName: "", seoTitle: "", seoDescription: "",
};

export default function MemberCreateBlog() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const previewTags = useMemo(() => {
    return formData.tags.split(",").map((t) => t.trim()).filter(Boolean);
  }, [formData.tags]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      };
      await createBlog(payload);
      setSuccessMessage("Blog submitted! It will be reviewed by an admin before publishing.");
      setFormData(initialForm);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-blog-page">
      <div className="admin-blog-shell">

        <div className="admin-blog-top">
          <p className="admin-blog-kicker">Member Panel</p>
          <h1>Create Blog Post</h1>
          <p className="admin-blog-subtext">
            Write a new article. It will be saved as Draft for admin review.
          </p>
          <br />
          <button className="submit-button" style={{ background: "#e5e7eb", color: "#111827" }} onClick={() => navigate("/member/blogs")}>
            ← Back to My Blogs
          </button>
        </div>

        <div className="admin-blog-layout">
          <form onSubmit={handleSubmit} className="admin-blog-form">

            <div className="form-section">
              <h2>Basic Details</h2>
              <div className="form-grid two-col">
                <div className="form-group">
                  <label>Title</label>
                  <input name="title" value={formData.title} onChange={handleChange} placeholder="Blog title" required />
                </div>
                <div className="form-group">
                  <label>Author Name</label>
                  <input name="authorName" value={formData.authorName} onChange={handleChange} placeholder="Your name" />
                </div>
              </div>
              <div className="form-grid two-col">
                <div className="form-group">
                  <label>Category</label>
                  <input name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Technology" />
                </div>
                <div className="form-group">
                  <label>Cover Image URL</label>
                  <input name="coverImage" value={formData.coverImage} onChange={handleChange} placeholder="https://..." />
                </div>
                <div className="form-group">
  <label>Type</label>
  <select name="type" value={formData.type} onChange={handleChange}>
    <option value="Article">Article</option>
    <option value="Video">Video</option>
  </select>
</div>
              </div>
              <div className="form-group">
                <label>Excerpt</label>
                <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} placeholder="Short description" rows={3} required />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Write your blog content here..." rows={10} required />
              </div>
            </div>

            <div className="form-section">
              <h2>Meta</h2>
              <div className="form-group">
                <label>Tags <span style={{ fontWeight: 400, color: "#6b7280" }}>(comma separated)</span></label>
                <input name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g. cloud, security, IT" />
                {previewTags.length > 0 && (
                  <div className="preview-tags" style={{ marginTop: 8 }}>
                    {previewTags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                )}
              </div>
              <div className="form-grid two-col">
                <div className="form-group">
                  <label>SEO Title</label>
                  <input name="seoTitle" value={formData.seoTitle} onChange={handleChange} placeholder="SEO title (optional)" />
                </div>
                <div className="form-group">
                  <label>SEO Description</label>
                  <textarea name="seoDescription" value={formData.seoDescription} onChange={handleChange} placeholder="SEO description (optional)" rows={3} />
                </div>
              </div>
            </div>

            {successMessage && <div className="form-alert success">{successMessage}</div>}
            {errorMessage && <div className="form-alert error">{errorMessage}</div>}

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Submitting..." : "Submit Blog"}
            </button>

          </form>

          {/* Live Preview Panel */}
          <div className="blog-preview-panel">
            <div className="preview-card">
              {formData.coverImage ? (
                <img src={formData.coverImage} alt="Preview" className="preview-image" />
              ) : (
                <div className="preview-image placeholder">Cover Preview</div>
              )}
              <div className="preview-body">
                <div className="preview-top-row">
                  <span className="preview-category">{formData.category || "Category"}</span>
                  <span className="preview-status draft">DRAFT</span>
                </div>
                <h3>{formData.title || "Your blog title"}</h3>
                <p>{formData.excerpt || "Your excerpt will appear here..."}</p>
                {previewTags.length > 0 && (
                  <div className="preview-tags">
                    {previewTags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                )}
                <div className="preview-footer">
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