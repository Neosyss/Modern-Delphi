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
import Support from "./Support";

const Home = () => {
  return (
    <>
    {/* <Navbar /> */}
    <Carousel />
    <WelcomeSection />
    <GreenStrip/>
    <PricingPlans />
    {/* <JeffreySection /> */}
    {/* <Services /> */}
    {/* <OurTeam/> */}
    <Support/>
    {/* <Questions/> */}
    {/* <ContactCardHome/> */}
    <FooterHome/>
    </>
  );
};

export default Home;