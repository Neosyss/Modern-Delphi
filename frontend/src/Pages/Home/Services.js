import './Services.css';
import svg1 from '../../isvgs/flowers-crop-2.webp';
import svg2 from '../../isvgs/flowers-crop-3-white.webp';
import img1 from '../../images/services/1.webp';
import img2 from '../../images/services/2.webp';
import img3 from '../../images/services/3.webp';
import img4 from '../../images/services/4.webp';
import img5 from '../../images/services/5.webp';
import img6 from '../../images/services/6.webp';

const data = [
    {
        id: "1",
        img: img1,
        title: "Cognitive Behavioral Therapy",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In etiam sit amet nunc, aliquam, sit.",
    },
    {
        id: "2",
        img: img2,
        title: "Therapy Session 2",
        subtitle: "Short description of therapy session 2. Aenean commodo ligula eget dolor.",
    },
    {
        id: "3",
        img: img3,
        title: "Therapy Session 3",
        subtitle: "Brief information about therapy session 3. Donec quam felis, ultricies nec.",
    },
    {
        id: "4",
        img: img4,
        title: "Therapy Session 3",
        subtitle: "Brief information about therapy session 3. Donec quam felis, ultricies nec.",
    },
    {
        id: "5",
        img: img5,
        title: "Therapy Session 3",
        subtitle: "Brief information about therapy session 3. Donec quam felis, ultricies nec.",
    },
    {
        id: "6",
        img: img6,
        title: "Therapy Session 3",
        subtitle: "Brief information about therapy session 3. Donec quam felis, ultricies nec.",
    },
];

const Services = () => {
    return (
        <>
            <div className="services-container">
                <img src={svg1} alt="Background" className="services-svg" />
                <div className="">
                    <div className="d-flex my-3 justify-content-center">
                        <div className="tb-2">Our Services</div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <h1 className="mt-2 px-1 text-dark heading-main-2">Therapist &</h1>
                        <span className="span mt-3 px-1 style-2">Treatments</span>
                    </div>
                    <div className="d-flex justify-content-center">
                        <p className="p grey f-small w-services text-center pt-4">
                            Qui culpa qui consequat officia cillum quis irure aliquip ut dolore sit eu culpa ut irure nisi occaecat dolore adipisicing do pariatur.
                        </p>
                    </div>
                    <div className="services-grid">
                        {data.map((item) => (
                            <>
                            <div key={item.id} className="service-box">
                                <div className="service-img-cont">
                                    <img src={svg2} alt={item.title} className="svg-serv" />
                                    <img src={item.img} alt={item.title} className="pic-c" />
                                    <div className="read-button prb-2">
                                        <div>Read More</div>
                                    </div>
                                </div>
                                <h3 className="service-title ">{item.title}</h3>
                                <p className="p grey service-subt f-small">{item.subtitle}</p>
                            </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Services;
