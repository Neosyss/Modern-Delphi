import './PicContainer1.css';

import img1 from '../../images/actual/home12.jpeg';
import img2 from '../../images/actual/home13.jpeg';
import img3 from '../../images/actual/home14.jpeg';
import img4 from '../../images/actual/home15.jpeg';

const PicContainer1 = () => {
    return (
        <>
        <div className="dvcontainer">
            <div className="divpc-container mt-5">
                <div className="divpc1 divpc"><img className="pc pc1" src={img1} alt="pic1" /></div>
                <div className="divpc2 divpc"><img className="pc pc2" src={img2} alt="pic1" /></div>
            </div>
            <div className="divpc-container">
                <div className="divpc3 divpc"><img className="pc pc3" src={img3} alt="pic1" /></div>
                <div className="divpc4 divpc"><img className="pc pc4" src={img4} alt="pic1" /></div>
            </div>
        </div>
        </>
    );
};

export default PicContainer1;