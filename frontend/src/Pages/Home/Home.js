import Carousel from "./Carousel";
import WelcomeSection from "./WelcomeSection";
import GreenStrip from "./GreenStrip";
import PricingPlans from "./PricingPlans";
import Support from "./Support";
import axios from "axios";
import { useEffect } from "react";
import HomeChatBot from "./HomeChatBot";
import FadeInSection from "./UseInView";


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
    <FadeInSection>
      <WelcomeSection />
    </FadeInSection>

    <FadeInSection>
      <HomeChatBot/>
    </FadeInSection>
  
      <GreenStrip/>
  
    <FadeInSection>
      <PricingPlans />
    </FadeInSection>
  
    {/* <JeffreySection /> */}
    {/* <Services /> */}
    {/* <OurTeam/> */}
    <FadeInSection>
      <Support/>
    </FadeInSection>
    {/* <Questions/> */}
    {/* <ContactCardHome/> */}
    </>
  );
};

export default Home;