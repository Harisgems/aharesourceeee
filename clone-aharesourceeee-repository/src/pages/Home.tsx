import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero, { TrustBar } from "../components/Hero";
import { WhoWeAre, VisionMission, Philosophy } from "../components/Intro";
import About from "../components/About";
import { BusinessGrid } from "../components/Businesses";
import { Investments, Ecosystem, Growth } from "../components/Investments";
import Gallery from "../components/Gallery";
import Partnerships from "../components/Partnerships";
import { MediaCareersCsr, Contact } from "../components/Contact";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) {
      // Wait for sections to render, then scroll
      const t = setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      // Clear history state so refresh/back doesn't re-trigger
      window.history.replaceState({}, "");
      return () => clearTimeout(t);
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <TrustBar />
      <WhoWeAre />
      <VisionMission />
      <Philosophy />
      <About />
      <BusinessGrid />
      <Investments />
      <Ecosystem />
      <Growth />
      <Gallery />
      <Partnerships />
      <MediaCareersCsr />
      <Contact />
    </>
  );
}
