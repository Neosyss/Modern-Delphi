import react from "react";
import Navbar from "../Global/Navbar";
import Carousel from "./Carousel";
import WelcomeSection from "./WelcomeSection";
import JeffreySection from "./JeffreySection";


const Home = () => {
  return (
    <>
    {/* <Navbar /> */}
    <Carousel />
    <WelcomeSection />
    <JeffreySection />
    <div style={{height: "100vh"}}></div>
    </>
  );
};

export default Home;