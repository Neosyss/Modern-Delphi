import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import pfp from "../../images/team/2.webp"
import axios from "axios";
import "./SacredBlog.css";

const SacredBlog = () => {
    const { id } = useParams(); // Get the blog ID dynamically
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
                setBlog(response.data);
            } catch (err) {
                setError("Failed to fetch blog post.");
                navigate('/lost-page')
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!blog) return <div>Blog not found.</div>;

    return (
        <div className="container sl-blog">
            <div className="prb-1 mb-3" onClick = {() => {navigate('/sacred-library')}}>
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
                <div className="col-md-8 mx-0 padding-psm my-5" dangerouslySetInnerHTML={{ __html: blog.description }}>
                </div>
                <div className="col-md-4 py-4">
                    <h4 className="my-3 mt-4">Popular Posts</h4>
                    {blog.popularPosts?.map((post, index) => (
                        <div className="small-slcard pt-4" key={index}>
                            <div className="img-cont-smcard">
                                <img src={post.image || "default-thumbnail.jpg"} alt="Popular post" />
                            </div>
                            <div className="px-3">
                                <div>{post.category}</div>
                                <h5>{post.title}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SacredBlog;
