import React, { useRef, useEffect } from "react";
import "./Pathways.css";
import "../ConsultOracle/ConsultOracleHome.css";
import { useNavigate } from "react-router-dom";

const PathwaysToExploration = () => {
  const backgroundRef = useRef(null);
  const containerRef = useRef(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && backgroundRef.current) {
        const containerTop = containerRef.current.getBoundingClientRect().top;
        const containerHeight = containerRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        // Check if container is in view
        if (containerTop < windowHeight && containerTop + containerHeight > 0) {
          // Calculate scroll percentage within the container
          const scrollPercentage = Math.max(
            0,
            Math.min(
              (windowHeight - containerTop) / (windowHeight + containerHeight),
              1
            )
          );

          // Limit movement and ensure smooth downward motion only
          const moveAmount = scrollPercentage * 30; // Adjust multiplier for speed control

          backgroundRef.current.style.transform = `translateY(-${moveAmount}%)`;
        } else {
          // Reset position when container is out of view
          backgroundRef.current.style.transform = "translateY(0)";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="pathways-section">
      <div ref={backgroundRef} className="pathways-background"></div>
      <div className="pathways-content">
        <div className="row ">
          <div className="d-flex justify-content-center mt-4">
            <h1 className="heading-main-2 mx-1">Pathways to Exploration</h1>
          </div>
          <div className="justify-content-center d-flex">
            <p className="p custom-p-pathways">
              Unlock personalized insights with AI-assisted guidance.
            </p>
          </div>
          <div className="my-4">
            <div className="row justify-content-center">
              <div className="col-md-4 my-2" style={{ cursor: "pointer" }} onClick={() => {navigate('/journeyers-anteroom')}}>
                <div className="pathways-card d-flex flex-column justify-content-between">
                  <div>
                    <div className="top-head-pathways-card2">
                      <h4>Step into the Anteroom</h4>
                    </div>
                    <div className="d-flex justify-content-between m-4">
                      <div className="d-flex justify-content-center flex-column">
                        <h4 className="bolder-pathways-card text-dark">
                          A sanctuary for reflection, clarity, and preparation.
                        </h4>
                      </div>
                    </div>
                    <div className="grey m-3 p-2">
                      Before any great journey begins, the traveler prepares. In
                      the Anteroom, Kleio will challenge you to pause, reflect,
                      and clarify your vision before taking your next step.
                      Through guided questions and structured insights, you will
                      uncover the truths that already reside within you.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 my-2" style={{ cursor: "pointer" }} onClick={() => {navigate('/consult-oracle')}}>
                <div className="pathways-card d-flex flex-column justify-content-between">
                  <div>
                    <div className="top-head-pathways-card2">
                      <h4>Consult the Oracle</h4>
                    </div>
                    <div className="d-flex justify-content-between m-4">
                      <div className="d-flex justify-content-center flex-column">
                        <h4 className="bolder-pathways-card text-dark">
                          Ask, and the path will unfold.
                        </h4>
                      </div>
                    </div>
                    <div className="grey m-3 p-2">
                      Since ancient times, seekers have consulted the Oracle for
                      guidance. Here, you are invited to engage the Oracle, your
                      Human guide who will work with you, using AI tools to
                      receive wisdom that challenges, illuminates, and inspires.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 my-2" style={{ cursor: "pointer" }} onClick={() => {navigate('/sacred-library')}}>
                <div className="pathways-card d-flex flex-column justify-content-between">
                  <div>
                    <div className="top-head-pathways-card2">
                      <h4>Explore the Sacred Library</h4>
                    </div>
                    <div className="d-flex justify-content-between m-4">
                      <div className="d-flex justify-content-center flex-column">
                        <h4 className="bolder-pathways-card text-dark">
                          A space for inquiry and insight.
                        </h4>
                      </div>
                    </div>
                    <div className="grey m-3 p-2">
                      The Sacred Library is a place for seekers to explore
                      profound ideas, challenge assumptions, and uncover deeper
                      truths. Here, questions are honoured, knowledge is tested,
                      and understanding unfolds through inquiry.
                    </div>
                    <div className="grey m-3 p-2">
                      Enter, and explore pathways of myth, philosophy,
                      embodiment, and action
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathwaysToExploration;
