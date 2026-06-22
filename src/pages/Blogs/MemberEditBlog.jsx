import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getBlogById,
  updateBlog,
  uploadBlogImage,
} from "../../services/blogService";
import "./styles/adminEditBlog.css";

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

export default function MemberEditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [pageLoading, setPageLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const previewTags = useMemo(() => {
    return formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }, [formData.tags]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setPageLoading(true);
        setErrorMessage("");

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
    setSubmitLoading(true);
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

      const res = await updateBlog(id, payload);
      setSuccessMessage(res?.message || "Blog updated successfully");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to update blog");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="admin-edit-page">
        <div className="admin-edit-shell">
          <div className="admin-edit-loading">
            <h2>Loading blog details...</h2>
            <p>Update your blog content and metadata.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-edit-page">
      <div className="admin-edit-shell">
        <div className="admin-edit-top">
          <div>
            <p className="admin-edit-kicker">Member Panel</p>
            <h1>Edit Blog Post</h1>
            <p className="admin-edit-subtext">
              Update your blog content and metadata before admin review.
            </p>
          </div>

          <div className="admin-edit-top-actions">
            <button
              type="button"
              className="secondary-nav-btn"
              onClick={() => navigate("/member/blogs")}
            >
              Back to Blogs
            </button>
          </div>
        </div>

        <div className="admin-edit-layout">
          <form className="admin-edit-form" onSubmit={handleSubmit}>
            {successMessage ? (
              <div className="edit-alert success">{successMessage}</div>
            ) : null}

            {errorMessage ? (
              <div className="edit-alert error">{errorMessage}</div>
            ) : null}

            <section className="edit-section">
              <h2>Basic Details</h2>

              <div className="edit-grid two-col">
                <div className="edit-group">
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

                <div className="edit-group">
                  <label htmlFor="authorName">Author Name</label>
                  <input
                    id="authorName"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleChange}
                    placeholder="Enter author name"
                  />
                </div>

                <div className="edit-group">
                  <label htmlFor="category">Category</label>
                  <input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Security, Compliance"
                  />
                </div>

                <div className="edit-group">
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

              <div className="edit-group">
                <label htmlFor="coverImage">Cover Image URL</label>
                <input
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="Uploaded image URL will appear here"
                />
              </div>

              <div className="edit-group">
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

              <div className="edit-group">
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

            <section className="edit-section">
              <h2>Meta</h2>

              <div className="edit-grid two-col">
                <div className="edit-group">
                  <label htmlFor="tags">Tags</label>
                  <input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="Comma separated tags"
                  />
                </div>

                <div className="edit-group">
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

              <div className="edit-group">
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
              className="update-button"
              disabled={submitLoading || imageUploading}
            >
              {submitLoading ? "Updating..." : "Update Blog"}
            </button>
          </form>

          <aside className="edit-preview-panel">
            <div className="edit-preview-card">
              {formData.coverImage ? (
                <img
                  src={formData.coverImage}
                  alt="Blog cover preview"
                  className="edit-preview-image"
                />
              ) : (
                <div className="edit-preview-image placeholder">No cover image selected</div>
              )}

              <div className="edit-preview-body">
                <div className="edit-preview-top">
                  <span className="edit-preview-category">
                    {formData.category || "Uncategorized"}
                  </span>
                  <span className="edit-preview-status draft">DRAFT</span>
                </div>

                <h3>{formData.title || "Your blog title will appear here"}</h3>
                <p>{formData.excerpt || "Your excerpt preview will appear here."}</p>

                {previewTags.length > 0 ? (
                  <div className="edit-preview-tags">
                    {previewTags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                ) : null}

                <div className="edit-preview-footer">
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