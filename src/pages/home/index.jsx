import FooterSection from "./FooterSection";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import { Services } from "./Services";
import { AboutUs } from "./AboutUs";
export const HomePage = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <HeroSection />
      <Services />
      <AboutUs />
      <FooterSection />
    </div>
  );
};
