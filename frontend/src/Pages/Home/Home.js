import Carousel from "./Carousel";
import WelcomeSection from "./WelcomeSection";
import PricingPlans from "./PricingPlans";
import Support from "./Support";
import axios from "axios";
import { useEffect } from "react";
import HomeChatBot from "./HomeChatBot";
import FadeInSection from "./UseInView";

const trackSiteVisit = async () => {
  try {
      await axios.post("/api/sitemetrics/track");
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
      <Carousel />
      <FadeInSection>
        <WelcomeSection />
      </FadeInSection>

      <FadeInSection>
        <HomeChatBot/>
      </FadeInSection>
    
      <FadeInSection>
        <PricingPlans />
      </FadeInSection>

      <FadeInSection>
        <Support/>
      </FadeInSection>
    </>
  );
};

export default Home;