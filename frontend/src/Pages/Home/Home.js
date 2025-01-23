import react from "react";
import Navbar from "../Global/Navbar";
import Carousel from "./Carousel";
import WelcomeSection from "./WelcomeSection";
import JeffreySection from "./JeffreySection";
import Services from "./Services";
import GreenStrip from "./GreenStrip";
import OurTeam from "./OurTeam";


const Home = () => {
  return (
    <>
    {/* <Navbar /> */}
    <Carousel />
    <WelcomeSection />
    <JeffreySection />
    <Services />
    <GreenStrip/>
    <OurTeam/>
    <div style={{height: "100vh"}}></div>
    </>
  );
};

export default Home;