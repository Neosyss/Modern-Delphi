import Carousel from "./Carousel";
import WelcomeSection from "./WelcomeSection";
import GreenStrip from "./GreenStrip";
import PricingPlans from "./PricingPlans";
import Support from "./Support";
import axios from "axios";
import { useEffect } from "react";
import HomeChatBot from "./HomeChatBot";

const trackSiteVisit = async () => {
  try {
      await axios.post("/api/sitemetrics/track");
      console.log(1);
  } catch (error) {
      console.error("Error tracking site visit:", error);
  }
};

const Home = () => {

  useEffect(() => {
    trackSiteVisit(); 
  }, []);

  return (
    <>
    {/* <Navbar /> */}
    <Carousel />
    <WelcomeSection />
    <HomeChatBot/>
    <GreenStrip/>
    <PricingPlans />
    {/* <JeffreySection /> */}
    {/* <Services /> */}
    {/* <OurTeam/> */}
    <Support/>
    {/* <Questions/> */}
    {/* <ContactCardHome/> */}
    </>
  );
};

export default Home;