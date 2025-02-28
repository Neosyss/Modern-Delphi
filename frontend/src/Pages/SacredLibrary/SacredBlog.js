import { useEffect, useState } from "react";
import FadeInSection from "../Home/UseInView";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./SacredBlog.css";

const SacredBlog = () => {
    const { id } = useParams(); // Get the blog ID dynamically
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const authToken = localStorage.getItem("authToken") || localStorage.getItem("adminAuthToken");
    const user = authToken ? jwtDecode(authToken) : null;

    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`/api/blogs/${id}`);
                setBlog(response.data);

            } catch (err) {
                setError(err);
                navigate('/lost-page');
            } finally {
                setLoading(false);
            }
        };

        const fetchName = async () => {
            try {
                const response = await axios.get(`/api/user/${user.user_id}`);
                setUsername(response.data.name);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        const fetchBlogs = async () => {
            try {
                const response = await axios.post('/api/blogs/paginated', {
                    limit: 6,
                    page: 1
                });
                const data = response.data;
                setBlogs(data.blogs.filter(blog => Number(blog.blog_id) !== Number(id)));
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/comments/${id}`);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchBlog();
        fetchName();
        fetchBlogs();
        fetchComments();
    }, [id]);

    const postComment = async () => {
        if (!newComment.trim()) return;

        if (!user) {
            console.error("User not authenticated");
            return;
        }

        try {
            await axios.post("/api/comments", {
                description: newComment,
                user_id: user.user_id,
                blog_id: id
            });
            setNewComment("");
            setComments([...comments, { description: newComment, user_id: user.user_id, user_name: username, date: new Date().toISOString() }]);
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!blog) return <div>Blog not found.</div>;

    return (
        <FadeInSection>
        <div className="container sl-blog">
            <div className="prb-1 mb-3" onClick={() => navigate('/sacred-library')}>
                <div>Back</div>
            </div>
            <h3 className="heading-sblog my-4">{blog.title}</h3>
            <div className="mb-4">
                Published {new Date(blog.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
            </div>

            <div className="sblog-img-cont">
                <img src={blog.images || "default-blog.jpg"} className="sblog-img" alt="Blog" />
            </div>

            <div className="row">
                <div className="col-md-8 mx-0 padding-psm my-5">
                    <div className="mb-3" dangerouslySetInnerHTML={{ __html: blog.description }}></div>

                    <div className="comment-section">
                        <div className="text-center">
                            <p className="grey">Leave your thoughts</p>
                        </div>

                        {user ? (
                            <>
                                <h5>{username || "Anonymous User"}</h5>
                                <p style={{color: "#888"}}>
                                    {new Date().toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                                <textarea
                                    className="form-control"
                                    rows="5"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <div className="d-flex justify-content-end">
                                    <div className="my-3 prb-2" onClick={postComment}><div>Comment</div></div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center">
                                <p>Please <a style={{ color: "var(--sec)" }} href="/login">Sign In</a> to comment.</p>
                            </div>
                        )}

                        <hr className="my-5" />

                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <div key={index} className="user-comment my-3">
                                    <h6 style={{ color: "var(--sec)" }}>{comment.user_id ? `${comment.user_name}` : "Anonymous"}</h6>
                                    <p style={{color: "#888"}}>
                                        {new Date(comment.date).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>

                                    <p>{comment.description}</p>
                                </div>
                            ))
                        ) : (
                            <p>No comments yet.</p>
                        )}
                    </div>
                </div>

                <div className="col-md-4 py-4">
                    <h4 className="my-3 mt-4">Popular Blogs</h4>
                    {blogs.map((blogx, index) => (
                        <div
                            className="small-slcard pt-4"
                            onClick={() => navigate(`/sacred-blog/${blogx.blog_id}`)}
                            key={index}
                        >
                            <div className="img-cont-smcard">
                                <img src={blogx.images || "default-thumbnail.jpg"} alt="Popular post" />
                            </div>
                            <div className="px-3 smwi">
                                <h5>{blogx.title}</h5>
                                <p dangerouslySetInnerHTML={{ __html: blogx.description.substring(0, 70) }}></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </FadeInSection>
    );
};

export default SacredBlog;
