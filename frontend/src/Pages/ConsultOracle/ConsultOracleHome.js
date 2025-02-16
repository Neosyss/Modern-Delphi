import { FaArrowRight } from "react-icons/fa6";
import "./ConsultOracleHome.css";
import pic1 from '../../images/misc/10.webp';
import pic2 from '../../isvgs/flowers-crop-2.webp';

const ConsultOracleHome = () => {
    return (
        <>
            <div className="slhome-background">
                <div className="tb-2">Wisdom</div>
                <h1 className="my-3">Consult The Oracle</h1>
                <div className="d-flex justify-content-center">
                    <p className="p sl-para w-80">Seek wisdom and guidance from the Mystic Oracle for your journey ahead.</p>
                </div>
                <div className="d-flex justify-content-center m-2">
                    <div className="prb-2 mx-1"><div>Book Now</div></div>
                    <div className="prb-1 mx-1"><div>Learn More</div></div>
                </div>
            </div>

            <div className="slhome-background2">
                <div className="row">
                    <div className="col-md-7">
                        <div className="tb-2">Guidance</div>
                        <h1 className="my-3">Explore the Depths of Knowledge in The Sacred Library</h1>
                        <p className="p sl-para text-start">The Sacred Library serves as a treasure trove of insights, thoughtfully organized into themes like Self-Leadership, Mysticism, and Reflections. Dive into our curated articles to enrich your journey and discover new perspectives.</p>
                        <p className="p my-4 sl-para text-start">
                            <p className="sl-para p text-start "><span className=" p sl-para fw-bold">Self-Leadership: </span> Empower Your Inner Guide </p>
                            <p className="sl-para p text-start "><span className="p sl-para fw-bold">Mysticism: </span> Explore the Unknown and Unseen</p>
                            <p className="sl-para p text-start "><span className="p sl-para fw-bold">Reflections: </span>Insights for personal Growth and Renewal</p>
                        </p>
                    </div>
                    <div className="col-md-5">
                        <img src={pic1} className="img-fluid slhomeimg1" />
                    </div>
                </div>
            </div>

            <div className="slhome-background3">
                <div className="tb-2">Knowledge</div>
                <div className="d-flex justify-content-center align-items-center flex-column text-center">
                    <h1 className="my-3 w-80 sl-heading3">Explore the Depths of Knowledge in The Sacred Library</h1>
                    <p className="p sl-para w-80 sl-heading3">Explore transformative insights on self-leadership, mysticism, & personal growth.</p>
                </div>
                <div className="container my-4">
                    <div className="row justify-content-center">
                        <div className="col-md-3">
                            <SLCard image={pic1} title="Discover insights across themes of self-leadership, mysticism, & reflections" description="The sacred library is your gateway to transformative articles & resources" />
                        </div>
                        <div className="col-md-3">
                            <SLCard image={pic1} title="Discover insights across themes of self-leadership, mysticism, & reflections" description="The sacred library is your gateway to transformative articles & resources" />
                        </div>
                        <div className="col-md-3">
                            <SLCard image={pic1} title="Discover insights across themes of self-leadership, mysticism, & reflections" description="The sacred library is your gateway to transformative articles & resources" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="slhome-background4">
                <img src={pic2} className="slhomesvg" />
                <div className="tb-2">Explore</div>
                <div className="d-flex justify-content-center align-items-center flex-column text-center">
                    <h1 className="my-3  sl-heading3">Your Journey Awaits</h1>
                    <p className="p sl-para  sl-heading3">Discover Insights and Wisdom for your path.</p>
                </div>
                <div className="container my-4">
                    <div className="row justify-content-center">
                        <div className="col-md-3 my-2">
                            <div className="sl-card2 p-4">
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
                            <div className="sl-card2 p-4 sl-spec">
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
                            <div className="sl-card2 p-4">
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
}

const SLCard = ({ image, title, description }) => {
    return (
        <div className="sl-card my-3">
            <div className="img-sl-card">
                <img src={image} alt={title} className="img-fluid" />
            </div>
            <div className="card- p-3 ">
                <h4 className="card-title">{title}</h4>
                <div className="d-flex mt-3 justify-content-center">
                    <p className="card-description">{description}</p>
                    <FaArrowRight className="arrow-sl"/>
                </div>
            </div>
        </div>
    );
};


export default ConsultOracleHome;