import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import "./SLHome.css";
import pic1 from '../../images/misc/10.webp';

import exploreImg from '../../images/actual/Explore the depth of knowledge 1.jpg';
import FadeInSection from "../Home/UseInView";


const SLHome = () => {

    const navigate = useNavigate();
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
    
            const response = await axios.post('/api/blogs/paginated', {
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
            <FadeInSection>
            <div className="slhome-background slhome-bg-img">
                <div className="tb-2">Wisdom</div>
                <h1 className="my-3 text-dark">Step Into the Sacred Library</h1>
                <div className="d-flex justify-content-center">
                    <p className="p text-dark sl-para w-80">
                        A collection of insights, reflections, and explorations – for seekers, thinkers, and the quietly curious.
                    </p>
                </div>
                
            </div>
            </FadeInSection>

            <FadeInSection>
            <div className="slhome-background2">
                <div className="row">
                    <div className="col-md-7">
                        <div className="tb-2">Pathways to Exploration</div>
                        <h1 className="my-3">Choose Your Path – Explore Knowing through Four Lenses</h1>
                        <p className="p sl-para text-start">
                            Understanding unfolds in many ways. Walk the path that calls to you.
                        </p>
                        <div className="p my-4 sl-para text-start">
                            <p className="sl-para p text-start">
                                <span className="p sl-para fw-bold">🏛️ Mythos – The Stories that Shape Us.</span> 
                                <div className="fst-italic">What do the myths and symbols whisper to us?</div>
                            </p>
                            <p className="sl-para p text-start">
                                <span className="p sl-para fw-bold">🧠 Logos – The Journey of Reason.</span> 
                                <div className="fst-italic">How does critical thought refine our understanding?</div>
                            </p>
                            <p className="sl-para p text-start">
                                <span className="p sl-para fw-bold">🎭 Sensus – The Embodied Experience.</span> 
                                <div className="fst-italic">What can intuition, art and emotion teach us?</div>
                            </p>
                            <p className="sl-para p text-start">
                                <span className="p sl-para fw-bold">⚡ Actio – Practical Insight, Transformative Action.</span> 
                                <div className="fst-italic">Where do wisdom and action meet?</div>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-5 d-flex justify-content-center align-items-center mt-3 px-2">
                        <img src={exploreImg} className="img-fluid slhomeimg1" alt="Sacred Library" />
                    </div>
                </div>
            </div>
            </FadeInSection>
            
            <FadeInSection>
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
            </FadeInSection>

            <FadeInSection>
            <div className="support-container">
                {/* <img src={svg1} alt="Background" className="ourteam-svg" /> */}
                <div className="py-5">
                    <div className="d-flex my-3 justify-content-center">
                        <div className="tb-2">Support</div>
                    </div>
                    <div className="custom-centric text-center">
                        <h1 className="mt-2 px-1 text-dark text-center heading-main-2">Support</h1>
                        <span className="span mt-3 px-1 style-2">Our Sacred Journey</span>
                    </div>
                    <div className="d-flex justify-content-center">
                        <p className="p grey f-small w-services text-center pt-4 w-52 mobileColor">
                            Your kind contribution helps us nurture a space for reflection, insight, and shared growth. Your support will promote a vibrant community. The modern Delphi. Join Us. Together, We Can Build Something Wonderful.
                        </p>
                    </div>
                    {/* Buttons Section */}
                    <div className="d-flex justify-content-center mt-4">
                        <div className="prb-2 "
                        onClick={() => {navigate('/donate')}}
                        >
                            <div>Donate</div>
                            </div>
                    </div>
                </div>
            </div>
        </FadeInSection>
        </>
    );
};

const SLCard = ({ image, title, description, id }) => {
    const navigate = useNavigate();
    return (
        <FadeInSection>
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
        </FadeInSection>
    );
};

export default SLHome;