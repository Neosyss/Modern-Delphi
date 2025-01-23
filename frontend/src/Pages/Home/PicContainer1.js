import './PicContainer1.css';
import pic1 from '../../images/misc/10.webp';
import pic2 from '../../images/misc/11.webp';
import pic3 from '../../images/misc/3.webp';
import pic4 from '../../images/misc/8.webp';

const PicContainer1 = () => {
    return (
        <>
        <div className="dvcontainer">
            <div className="divpc-container mt-5">
                <div className="divpc1 divpc"><img className="pc pc1" src={pic2} alt="pic1" /></div>
                <div className="divpc2 divpc"><img className="pc pc2" src={pic3} alt="pic1" /></div>
            </div>
            <div className="divpc-container">
                <div className="divpc3 divpc"><img className="pc pc3" src={pic1} alt="pic1" /></div>
                <div className="divpc4 divpc"><img className="pc pc4" src={pic4} alt="pic1" /></div>
            </div>
        </div>
        </>
    );
};

export default PicContainer1;