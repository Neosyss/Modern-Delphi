import "./FooterHome.css";

const FooterHome = () => {
    return (
        <>
        <div className="footer-main py-5">
            <div className="row p-4 pt-5">
                <div className="col-md-4 mt-3 px-4">
                    <p className="p grey">Neosyss</p>
                    
                    <p className="p grey">At Neosyss, we understand that life's challenges can sometimes feel overwhelming, and seeking support can be a daunting step. That's why our team of dedicated therapists is here to provide you with the compassionate guidance and expert care you deserve.</p>
                </div>
                <div className="col-md-4 mt-3 px-4">
                    <div className="d-flex">
                        <div className="w-50">
                            <p className="p text-dark mb-4 fw-bold">Company</p>
                            <div className="my-4">
                                <div className="f-link grey">Individual Therapy</div>
                                <div className="f-link grey">Couples Counseling</div>
                                <div className="f-link grey">Career Counseling</div>
                                <div className="f-link grey">Stress management</div>
                                <div className="f-link grey">Anxiety Treatment</div>
                                <div className="f-link grey">Depression Therapy</div>
                            </div>
                        </div>
                        <div className="w-50 px-2">
                            <p className="p text-dark fw-bold">Our Services</p>
                            <div className="my-4">
                                <div className="f-link grey">About Us</div>
                                <div className="f-link grey">Our Services</div>
                                <div className="f-link grey">Case Study</div>
                                <div className="f-link grey">Blog</div>
                                <div className="f-link grey">Contact Us</div>
                                <div className="f-link grey">Testimonials</div>
                            </div>
                        </div>

                    </div>
                    
                </div>
                <div className="col-md-4 mt-3 px-4">

                </div>
                </div>
            </div>
        </>
    )
};

export default FooterHome;