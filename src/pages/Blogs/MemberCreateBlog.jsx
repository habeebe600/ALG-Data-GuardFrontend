import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
};

export default function MemberCreateBlog() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const previewTags = useMemo(() => {
    return formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }, [formData.tags]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      await createBlog(payload);
      setSuccessMessage(
        "Blog submitted! It will be reviewed by an admin before publishing."
      );
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
            Write a new article. It will be saved as draft for admin review.
          </p>
        </div>

        <div className="admin-blog-layout">
          <form className="admin-blog-form" onSubmit={handleSubmit}>
            {successMessage ? (
              <div className="form-alert success">{successMessage}</div>
            ) : null}

            {errorMessage ? (
              <div className="form-alert error">{errorMessage}</div>
            ) : null}

            <section className="form-section">
              <h2>Basic Details</h2>

              <div className="form-grid two-col">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    name="title"
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
                    value={formData.authorName}
                    onChange={handleChange}
                    placeholder="Enter author name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Security, Compliance"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="coverImageUpload">Cover Image</label>
                  <input
                    id="coverImageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {imageUploading ? <small>Uploading image...</small> : null}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="coverImage">Cover Image URL</label>
                <input
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="Uploaded image URL will appear here"
                />
              </div>

              <div className="form-group">
                <label htmlFor="excerpt">Excerpt</label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  rows="4"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Write a short summary"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  name="content"
                  rows="10"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write the full blog content"
                  required
                />
              </div>
            </section>

            <section className="form-section">
              <h2>Meta</h2>

              <div className="form-grid two-col">
                <div className="form-group">
                  <label htmlFor="tags">Tags</label>
                  <input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="Comma separated tags"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seoTitle">SEO Title</label>
                  <input
                    id="seoTitle"
                    name="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleChange}
                    placeholder="SEO title"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="seoDescription">SEO Description</label>
                <textarea
                  id="seoDescription"
                  name="seoDescription"
                  rows="4"
                  value={formData.seoDescription}
                  onChange={handleChange}
                  placeholder="SEO description"
                />
              </div>
            </section>

            <button
              type="submit"
              className="submit-button"
              disabled={loading || imageUploading}
            >
              {loading ? "Submitting..." : "Submit Blog"}
            </button>
          </form>

          <aside className="blog-preview-panel">
            <div className="preview-card">
              {formData.coverImage ? (
                <img
                  src={formData.coverImage}
                  alt="Blog cover preview"
                  className="preview-image"
                />
              ) : (
                <div className="preview-image placeholder">No cover image selected</div>
              )}

              <div className="preview-body">
                <div className="preview-top-row">
                  <span className="preview-category">
                    {formData.category || "Uncategorized"}
                  </span>
                  <span className="preview-status draft">DRAFT</span>
                </div>

                <h3>{formData.title || "Your blog title will appear here"}</h3>
                <p>{formData.excerpt || "Your excerpt preview will appear here."}</p>

                {previewTags.length > 0 ? (
                  <div className="preview-tags">
                    {previewTags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                ) : null}

                <div className="preview-footer">
                  <span>
                    By <strong>{formData.authorName || "Unknown Author"}</strong>
                  </span>
                  <span>Pending Review</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}