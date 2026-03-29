import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogBySlug } from "../../services/blogService";
import "./styles/blogDetailsPage.css";

function formatDate(dateValue) {
    if (!dateValue) return "";
    return new Date(dateValue).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function renderContent(content) {
    if (!content) return null;

    return content.split("\n").filter(Boolean).map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
    ));
}

export default function BlogDetailsPage() {
    const { slug } = useParams();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                setErrorMessage("");

                const res = await getBlogBySlug(slug);
                setBlog(res?.blog || null);
            } catch (error) {
                setErrorMessage(
                    error.response?.data?.message || "Failed to fetch blog details"
                );
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchBlog();
        }
    }, [slug]);

    const publishedDate = useMemo(() => {
        return formatDate(blog?.publishedAt || blog?.createdAt);
    }, [blog]);

    if (loading) {
        return (
            <section className="blog-details-page">
                <div className="blog-details-shell">
                    <div className="blog-details-state">Loading article...</div>
                </div>
            </section>
        );
    }

    if (errorMessage || !blog) {
        return (
            <section className="blog-details-page">
                <div className="blog-details-shell">
                    <div className="blog-details-state error">
                        <h2>Article not available</h2>
                        <p>{errorMessage || "The requested blog could not be found."}</p>
                        <Link to="/blogs" className="back-link-btn">
                            Back to Blogs
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="blog-details-page">
            <div className="blog-details-shell">
                <div className="blog-details-breadcrumb">
                    <Link to="/">Home</Link>
                    <span>/</span>
                    <Link to="/blogs">Blogs</Link>
                    <span>/</span>
                    <span>{blog.title}</span>
                </div>

                <article className="blog-article">
                    <header className="blog-hero">
                        <div className="blog-hero-text">
                            <span className="blog-category">{blog.category || "Insight"}</span>
                            <h1>{blog.title}</h1>
                            <p className="blog-excerpt">{blog.excerpt}</p>

                            <div className="blog-meta">
                                <span>{blog.authorName || "Admin"}</span>
                                <span>{publishedDate}</span>
                                {blog.featured ? <strong>Featured</strong> : null}
                            </div>

                            {blog.tags?.length ? (
                                <div className="blog-tags">
                                    {blog.tags.map((tag) => (
                                        <span key={tag}>{tag}</span>
                                    ))}
                                </div>
                            ) : null}
                        </div>

                        {blog.coverImage ? (
                            <div className="blog-hero-image-wrap">
                                <img
                                    src={blog.coverImage}
                                    alt={blog.title}
                                    className="blog-hero-image"
                                />
                            </div>
                        ) : null}
                    </header>

                    <div className="blog-content">
                        {renderContent(blog.content)}
                    </div>
                </article>
            </div>
        </section>
    );
}