import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogById, updateBlog } from "../../services/blogService";
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
    status: "DRAFT",
    featured: false,
};

export default function AdminEditBlog() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialForm);
    const [pageLoading, setPageLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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
                    status: blog?.status || "DRAFT",
                    featured: blog?.featured || false,
                });
            } catch (error) {
                setErrorMessage(
                    error.response?.data?.message || "Failed to load blog"
                );
            } finally {
                setPageLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
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

            setSuccessMessage(res.data?.message || "Blog updated successfully");
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || "Failed to update blog"
            );
        } finally {
            setSubmitLoading(false);
        }
    };

    if (pageLoading) {
        return (
            <section className="admin-edit-page">
                <div className="admin-edit-shell">
                    <div className="admin-edit-loading">Loading blog details...</div>
                </div>
            </section>
        );
    }

    return (
        <section className="admin-edit-page">
            <div className="admin-edit-shell">
                <div className="admin-edit-top">
                    <div>
                        <p className="admin-edit-kicker">Admin Panel</p>
                        <h1>Edit Blog Post</h1>
                        <p className="admin-edit-subtext">
                            Update content, metadata, publishing status, and homepage visibility.
                        </p>
                    </div>

                    <div className="admin-edit-top-actions">
                        <button
                            type="button"
                            className="secondary-nav-btn"
                            onClick={() => navigate("/admin/blogs")}
                        >
                            Back to Blogs
                        </button>
                    </div>
                </div>

                {errorMessage ? (
                    <div className="edit-alert error">{errorMessage}</div>
                ) : null}

                {successMessage ? (
                    <div className="edit-alert success">{successMessage}</div>
                ) : null}

                <div className="admin-edit-layout">
                    <form className="admin-edit-form" onSubmit={handleSubmit}>
                        <div className="edit-section">
                            <h2>Basic Details</h2>

                            <div className="edit-grid two-col">
                                <div className="edit-group">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="edit-group">
                                    <label htmlFor="authorName">Author Name</label>
                                    <input
                                        id="authorName"
                                        name="authorName"
                                        type="text"
                                        value={formData.authorName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="edit-grid two-col">
                                <div className="edit-group">
                                    <label htmlFor="category">Category</label>
                                    <input
                                        id="category"
                                        name="category"
                                        type="text"
                                        value={formData.category}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="edit-group">
                                    <label htmlFor="coverImage">Cover Image URL</label>
                                    <input
                                        id="coverImage"
                                        name="coverImage"
                                        type="text"
                                        value={formData.coverImage}
                                        onChange={handleChange}
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

                            <div className="edit-group">
                                <label htmlFor="excerpt">Excerpt</label>
                                <textarea
                                    id="excerpt"
                                    name="excerpt"
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                />
                            </div>

                            <div className="edit-group">
                                <label htmlFor="content">Content</label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    rows="12"
                                    required
                                />
                            </div>
                        </div>

                        <div className="edit-section">
                            <h2>Meta</h2>

                            <div className="edit-group">
                                <label htmlFor="tags">Tags</label>
                                <input
                                    id="tags"
                                    name="tags"
                                    type="text"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    placeholder="cloud, devops, hosting"
                                />
                            </div>

                            <div className="edit-grid two-col">
                                <div className="edit-group">
                                    <label htmlFor="seoTitle">SEO Title</label>
                                    <input
                                        id="seoTitle"
                                        name="seoTitle"
                                        type="text"
                                        value={formData.seoTitle}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="edit-group">
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

                            <div className="edit-group">
                                <label htmlFor="seoDescription">SEO Description</label>
                                <textarea
                                    id="seoDescription"
                                    name="seoDescription"
                                    value={formData.seoDescription}
                                    onChange={handleChange}
                                    rows="4"
                                />
                            </div>

                            <div className="edit-checkbox-row">
                                <input
                                    id="featured"
                                    name="featured"
                                    type="checkbox"
                                    checked={formData.featured}
                                    onChange={handleChange}
                                />
                                <label htmlFor="featured">Mark as featured</label>
                            </div>
                        </div>

                        <button className="update-button" type="submit" disabled={submitLoading}>
                            {submitLoading ? "Updating..." : "Update Blog"}
                        </button>
                    </form>

                    <aside className="edit-preview-panel">
                        <div className="edit-preview-card">
                            {formData.coverImage ? (
                                <img
                                    src={formData.coverImage}
                                    alt="Blog preview"
                                    className="edit-preview-image"
                                />
                            ) : (
                                <div className="edit-preview-image placeholder">Cover preview</div>
                            )}

                            <div className="edit-preview-body">
                                <div className="edit-preview-top">
                                    <span className="edit-preview-category">
                                        {formData.category || "Category"}
                                    </span>
                                    <span className={`edit-preview-status ${formData.status.toLowerCase()}`}>
                                        {formData.status}
                                    </span>
                                </div>

                                <h3>{formData.title || "Blog title preview"}</h3>

                                <p>
                                    {formData.excerpt ||
                                        "Your blog excerpt preview appears here."}
                                </p>

                                <div className="edit-preview-tags">
                                    {previewTags.length ? (
                                        previewTags.map((tag) => <span key={tag}>{tag}</span>)
                                    ) : (
                                        <span>No tags</span>
                                    )}
                                </div>

                                <div className="edit-preview-footer">
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