import { useMemo, useState } from "react";
import { createBlog } from "../../services/blogService";
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
};

export default function AdminCreateBlog() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const previewTags = useMemo(() => {
    return formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }, [formData.tags]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const payload = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      const res = await createBlog(payload);

      setSuccessMessage(res.data?.message || "Blog created successfully");
      setFormData(initialForm);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to create blog"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-blog-page">
      <div className="admin-blog-shell">
        <div className="admin-blog-top">
          <div>
            <p className="admin-blog-kicker">Admin Panel</p>
            <h1>Create Blog Post</h1>
            <p className="admin-blog-subtext">
              Write a new article, save it as draft, or publish it directly.
            </p>
          </div>
        </div>

        <div className="admin-blog-layout">
          <form className="admin-blog-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Basic Details</h2>

              <div className="form-grid two-col">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter blog title"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="authorName">Author Name</label>
                  <input
                    id="authorName"
                    name="authorName"
                    type="text"
                    value={formData.authorName}
                    onChange={handleChange}
                    placeholder="Enter author name"
                  />
                </div>
              </div>

              <div className="form-grid two-col">
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <input
                    id="category"
                    name="category"
                    type="text"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Cloud, Security, DevOps..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="coverImage">Cover Image URL</label>
                  <input
                    id="coverImage"
                    name="coverImage"
                    type="text"
                    value={formData.coverImage}
                    onChange={handleChange}
                    placeholder="https://example.com/cover.jpg"
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

              <div className="form-group">
                <label htmlFor="excerpt">Excerpt</label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Short summary shown on homepage and listings"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="12"
                  placeholder="Write the full blog content here..."
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Meta</h2>

              <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="cloud, hosting, infrastructure"
                />
              </div>

              <div className="form-grid two-col">
                <div className="form-group">
                  <label htmlFor="seoTitle">SEO Title</label>
                  <input
                    id="seoTitle"
                    name="seoTitle"
                    type="text"
                    value={formData.seoTitle}
                    onChange={handleChange}
                    placeholder="SEO optimized title"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="seoDescription">SEO Description</label>
                <textarea
                  id="seoDescription"
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Short SEO description"
                />
              </div>

              <div className="checkbox-row">
                <input
                  id="featured"
                  name="featured"
                  type="checkbox"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                <label htmlFor="featured">Mark this post as featured</label>
              </div>
            </div>

            {successMessage ? (
              <div className="form-alert success">{successMessage}</div>
            ) : null}

            {errorMessage ? (
              <div className="form-alert error">{errorMessage}</div>
            ) : null}

            <button className="submit-button" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Blog"}
            </button>
          </form>

          <aside className="blog-preview-panel">
            <div className="preview-card">
              {formData.coverImage ? (
                <img
                  src={formData.coverImage}
                  alt="Blog preview"
                  className="preview-image"
                />
              ) : (
                <div className="preview-image placeholder">Cover preview</div>
              )}

              <div className="preview-body">
                <div className="preview-top-row">
                  <span className="preview-category">
                    {formData.category || "Category"}
                  </span>
                  <span className={`preview-status ${formData.status.toLowerCase()}`}>
                    {formData.status}
                  </span>
                </div>

                <h3>{formData.title || "Your blog title appears here"}</h3>

                <p>
                  {formData.excerpt ||
                    "Your excerpt preview will appear here for the homepage and blog cards."}
                </p>

                <div className="preview-tags">
                  {previewTags.length > 0 ? (
                    previewTags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))
                  ) : (
                    <span>No tags yet</span>
                  )}
                </div>
                <div className="preview-footer">
                  <span>{formData.authorName || "Author name"}</span>
                  {formData.featured ? <strong>Featured</strong> : null}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}