import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import "./SLHome.css";
import pic1 from '../../images/misc/10.webp';
import pic2 from '../../isvgs/flowers-crop-2.webp';

const SLHome = () => {

    const navigate = useNavigate();
    const [sections, setSections] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        hasMore: true,
        isInitialLoad: true
    });
    const [loading, setLoading] = useState(false);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const limit = pagination.isInitialLoad ? 3 : 7; // Adjust limit accordingly
    
            const response = await axios.post('http://localhost:5000/api/blogs/paginated', {
                limit,
                page: pagination.currentPage
            });
    
            const data = response.data;
    
            // Ensure data.blogs is an array
            if (!Array.isArray(data.blogs)) {
                console.error("Expected an array of blogs, but got:", data.blogs);
                return;
            }
    
            // Replace previous blogs with new ones
            setBlogs(data.blogs);
    
            setPagination(prev => ({
                ...data.pagination,
                isInitialLoad: false
            }));
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };
    
    const handleLoadMore = () => {
        setPagination(prev => ({
            ...prev,
            currentPage: prev.currentPage + 1
        }));
    
        fetchBlogs(); // Call without `true` to prevent appending
    };
    

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <>
            <div className="slhome-background">
                <div className="tb-2">Wisdom</div>
                <h1 className="my-3">Explore Ancient Knowledge</h1>
                <div className="d-flex justify-content-center">
                    <p className="p sl-para w-80">
                        Delve into a treasure trove of insights, reflections, & guidance for your journey ahead
                    </p>
                </div>
                
            </div>

            <div className="slhome-background2">
                <div className="row">
                    <div className="col-md-7">
                        <div className="tb-2">Guidance</div>
                        <h1 className="my-3">Explore the Depths of Knowledge in The Sacred Library</h1>
                        <p className="p sl-para text-start">
                            The Sacred Library serves as a treasure trove of insights, thoughtfully organized into themes like Self-Leadership, Mysticism, and Reflections. Dive into our curated articles to enrich your journey and discover new perspectives.
                        </p>
                        <div className="p my-4 sl-para text-start">
                            <p className="sl-para p text-start">
                                <span className="p sl-para fw-bold">Self-Leadership: </span> 
                                Empower Your Inner Guide
                            </p>
                            <p className="sl-para p text-start">
                                <span className="p sl-para fw-bold">Mysticism: </span> 
                                Explore the Unknown and Unseen
                            </p>
                            <p className="sl-para p text-start">
                                <span className="p sl-para fw-bold">Reflections: </span>
                                Insights for personal Growth and Renewal
                            </p>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <img src={pic1} className="img-fluid slhomeimg1" alt="Sacred Library" />
                    </div>
                </div>
            </div>

            <div className="slhome-background3 back-priopa py-5">
                <div className="tb-2">Knowledge</div>
                <div className="d-flex justify-content-center align-items-center flex-column text-center">
                    <h1 className="my-3 w-80 sl-heading3">
                        Explore the Depths of Knowledge in The Sacred Library
                    </h1>
                    <p className="p sl-para w-80 sl-heading3">
                        Explore transformative insights on self-leadership, mysticism, & personal growth.
                    </p>
                </div>
                <div className="container my-4">
                    <div className="row justify-content-center">
                        {blogs.map((blog) => (
                            <div key={blog.blog_id} className="col-md-3">
                                <SLCard 
                                    image={blog.images || pic1} 
                                    title={blog.title.substring(0,50)} 
                                    description={blog.description.substring(0, 100)} 
                                    id={blog.blog_id}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner">Loading...</div>
                    </div>
                ) : pagination.hasMore && (
                    <div className="d-flex justify-content-center">
                        <div className="prb-1" onClick={handleLoadMore}>
                            <div>Load More ...</div>
                        </div>
                    </div>
                )}
            </div>

            <div className="slhome-background4">
                <img src={pic2} className="slhomesvg" alt="Sacred Library" />
                <div className="tb-2">Explore</div>
                <div className="d-flex justify-content-center align-items-center flex-column text-center">
                    <h1 className="my-3 sl-heading3">Your Journey Awaits</h1>
                    <p className="p sl-para sl-heading3">
                        Discover Insights and Wisdom for your path.
                    </p>
                </div>
                <div className="container my-4">
                    <div className="row justify-content-center">
                        <div className="col-md-3 my-2">
                            <div className="sl-card2 cursor-pointer p-4" onClick={() => {navigate('/journeyers-anteroom')}}>
                                <div>
                                    <FaArrowRight className="arrow-sl my-4"/>
                                    <h5>Return to the Anteroom</h5>
                                    <p>Connect with the Oracle for guidance</p>
                                </div>
                                <div className="d-flex mt-3 justify-content-end">
                                    <p className="card-description m-2">Consult</p>
                                    <FaArrowRight className="arrow-sl2"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 my-2">
                            <div className="sl-card2 cursor-pointer p-4 sl-spec">
                                <div>
                                    <FaArrowRight className="arrow-sl my-4"/>
                                    <h5>Visit the Resting Grove</h5>
                                    <p>Take a moment to reflect & rejuvenate</p>
                                </div>
                                <div className="d-flex mt-3 justify-content-end">
                                    <p className="card-description text-light m-2">Rest</p>
                                    <FaArrowRight className="arrow-sl2"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 my-2">
                            <div className="sl-card2 cursor-pointer p-4" onClick={() => {navigate('/consult-oracle')}}>
                                <div>
                                    <FaArrowRight className="arrow-sl my-4"/>
                                    <h5>Explore More Resources</h5>
                                    <p>Find articles and tools for your journey</p>
                                </div>
                                <div className="d-flex mt-3 justify-content-end">
                                    <p className="card-description m-2">Learn</p>
                                    <FaArrowRight className="arrow-sl2"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const SLCard = ({ image, title, description, id }) => {
    const navigate = useNavigate();

    return (
        <div className="sl-card my-3">
            <div className="img-sl-card">
                <img src={image} alt={title} className="img-fluid" />
            </div>
            <div className="card- p-3">
                <h4 style={{color: "var(--sec)"}} className="card-title">{title}</h4>
                <div className="d-flex mt-1 justify-content-between">
                    <p className="card-description" dangerouslySetInnerHTML={{__html:description}}></p>
                    <FaArrowRight className="arrow-sl" onClick={() => {navigate(`/sacred-blog/${id}`)}}/>
                </div>
            </div>
        </div>
    );
};

export default SLHome;