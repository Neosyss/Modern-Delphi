import react from "react";
import Navbar from "../Global/Navbar";
import Carousel from "./Carousel";
import WelcomeSection from "./WelcomeSection";
import JeffreySection from "./JeffreySection";
import Services from "./Services";
import GreenStrip from "./GreenStrip";
import OurTeam from "./OurTeam";
import PricingPlans from "./PricingPlans";
import Questions from "./Questions";
import ContactCardHome from "./ContactCardHome";
import FooterHome from "./FooterHome";


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
    <PricingPlans />
    <Questions/>
    <ContactCardHome/>
    <FooterHome/>
    <div style={{height: "100vh"}}></div>
    </>
  );
};

export default Home;