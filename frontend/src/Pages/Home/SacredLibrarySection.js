import { useNavigate } from 'react-router-dom';
import './SacredLibrarySection.css';

const SacredLibrarySection = () => {
    const navigate = useNavigate();

  return (
    <>
        <div className="slhome-background2 bgx">
            <div className="row justify-content-center">
                {/* <div className="col-md-5  d-flex justify-content-center align-items-center order-md-1 order-2">
                    <img src={img2} className="img-fluid slhomeimg1" />
                </div> */}
                <div className="col-md-7 order-1 text-center padding-ar-1">
                    <h1 className="justify-content-center my-3">Explore the Sacred Library</h1>
                    <h3 className="text-center">A space for inquiry and insight.</h3>
                    <p className="justify-content-center p sl-para">The Sacred Library is a place for seekers to explore profound ideas, challenge assumptions, and uncover deeper truths. Here, questions are honoured, knowledge is tested, and understanding unfolds through inquiry.</p>

                    <p className="p justify-content-center my-1 text-dark">Enter, and explore pathways of myth, philosophy, embodiment, and action</p>

                    <div className="d-flex mt-5 justify-content-center my-3" onClick={() => { navigate('/sacred-library')}}>
                        <div className="prb-1 mx-1"><div>Explore</div></div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SacredLibrarySection