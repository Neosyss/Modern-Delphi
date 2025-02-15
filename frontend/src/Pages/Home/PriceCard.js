import './PriceCard.css';
import { FaCheck } from "react-icons/fa";

const PriceCard = ({name, elem, img ,price, desc}) => {
    return (
        <>
        <div className="price-card">
            <div className={`${elem == 2 ? "top-head-price-card2" : "top-head-price-card" }`}>
                <h4>{name}</h4>
            </div>

            <div className="d-flex justify-content-between m-4">
                <div className="d-flex justify-content-center flex-column">
                    <div className='bolder-price-card text-dark'>Start from</div>
                    <div className="d-flex justify-content-center align-items-end">
                        <div className="heading-price-card ">${price}</div>
                        <p className='p session-pc grey'>/session</p>
                    </div>
                </div>
                <img src={img} className='price-card-img'/>
            </div>
            <div className='grey m-3 p-2'>{desc}</div>
{/*             
            <div className='col-md-7 mt-3 m-4'>
                <div><FaCheck className="tickSvg2 my-1"/><strong className="f-small text-dark mx-3 pt-2">Personalized</strong></div>
                <div><FaCheck className="tickSvg2 my-1"/><strong className="f-small text-dark mx-3 pt-2">Confidential</strong></div>
                <div><FaCheck className="tickSvg2 my-1"/><strong className="f-small text-dark mx-3 pt-2">Effective</strong></div>
            </div>

            <div className='appoint-btn m-4 mb-5'>Make Appointment</div> */}
        </div>
        </>
    );
}

export default PriceCard;