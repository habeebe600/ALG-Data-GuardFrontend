import { useMemo, useState } from "react";
import { createBlog, uploadBlogImage } from "../../services/blogService";
import "./styles/adminCreateBlog.css";

const initialForm = {
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: "",
  tags: "",
  authorName: "",
  seoTitle: "",
  seoDescription: "",
  status: "DRAFT",
  featured: false,
  type: "Article",
};

export default function AdminCreateBlog() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const previewTags = useMemo(() => {
    return formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  }, [formData.tags]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageUploading(true);
    setErrorMessage("");
    try {
      const res = await uploadBlogImage(file);
      setFormData((prev) => ({ ...prev, coverImage: res.url }));
    } catch {
      setErrorMessage("Image upload failed. Please try again.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      };
      const res = await createBlog(payload);
      setSuccessMessage(res.message || "Blog created successfully");
      setFormData(initialForm);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  const statusClass =
    formData.status === "PUBLISHED"
      ? "published"
      : formData.status === "ARCHIVED"
      ? "archived"
      : "draft";

  return (
    <div className="admin-blog-page">
      <div className="admin-blog-shell">

        {/* Header */}
        <div className="admin-blog-top">
          <p className="admin-blog-kicker">Admin Panel</p>
          <h1>Create Blog Post</h1>
          <p className="admin-blog-subtext">
            Write a new article, save it as draft, or publish it directly.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="admin-blog-layout">

          {/* ── LEFT: Form ── */}
          <form className="admin-blog-form" onSubmit={handleSubmit}>

            {/* Basic Details */}
            <div className="form-section">
              <h2>Basic Details</h2>

              <div className="form-grid two-col">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter blog title"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Author Name</label>
                  <input
                    type="text"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleChange}
                    placeholder="Author name"
                  />
                </div>
              </div>

              <div className="form-grid two-col">
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Data Security"
                  />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="Article">Article</option>
                    <option value="Video">Video</option>
                  </select>
                </div>
              </div>

              {/* Cover Image */}
              <div className="form-group">
                <label>Cover Image</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleImageUpload}
                  disabled={imageUploading}
                />
                {imageUploading && (
                  <span style={{ fontSize: 13, color: "#6b7280" }}>
                    ⏳ Uploading...
                  </span>
                )}
                <input
                  type="text"
                  name="coverImage"
                  placeholder="Or paste an image URL..."
                  value={formData.coverImage}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Excerpt</label>
                <textarea
                  name="excerpt"
                  rows={3}
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Short summary of the article"
                  required
                />
              </div>

              <div className="form-group">
                <label>Content</label>
                <textarea
                  name="content"
                  rows={10}
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Full article content..."
                  required
                />
              </div>
            </div>

            {/* Meta */}
            <div className="form-section">
              <h2>Meta</h2>

              <div className="form-group">
                <label>Tags</label>
                <input
                  type="text"
                  name="tags"
                  placeholder="tag1, tag2, tag3"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </div>

              <div className="form-grid two-col">
                <div className="form-group">
                  <label>SEO Title</label>
                  <input
                    type="text"
                    name="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleChange}
                    placeholder="SEO title"
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>SEO Description</label>
                <textarea
                  name="seoDescription"
                  rows={3}
                  value={formData.seoDescription}
                  onChange={handleChange}
                  placeholder="SEO meta description"
                />
              </div>

              <div className="checkbox-row">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                <label htmlFor="featured">Mark this post as featured</label>
              </div>
            </div>

            {successMessage && (
              <div className="form-alert success">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="form-alert error">{errorMessage}</div>
            )}

            <button
              type="submit"
              className="submit-button"
              disabled={loading || imageUploading}
            >
              {loading ? "Creating..." : "Create Blog"}
            </button>

          </form>

          {/* ── RIGHT: Live Preview Panel ── */}
          <div className="blog-preview-panel">
            <div className="preview-card">

              {formData.coverImage ? (
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  className="preview-image"
                />
              ) : (
                <div className="preview-image placeholder">
                  No cover image yet
                </div>
              )}

              <div className="preview-body">
                <div className="preview-top-row">
                  <span className="preview-category">
                    {formData.category || "Category"}
                  </span>
                  <span className={`preview-status ${statusClass}`}>
                    {formData.status || "DRAFT"}
                  </span>
                </div>

                <h3>{formData.title || "Blog title will appear here"}</h3>
                <p>{formData.excerpt || "Your excerpt will appear here..."}</p>

                {previewTags.length > 0 && (
                  <div className="preview-tags">
                    {previewTags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                )}

                <div className="preview-footer">
                  <span>
                    By <strong>{formData.authorName || "Author"}</strong>
                  </span>
                  <span>{formData.type || "Article"}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}