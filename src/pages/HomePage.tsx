import { useEffect, useState } from "react";
import { AboutSection } from "../components/AboutSection";
import { ClubsSection } from "../components/ClubsSection";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { MainNav } from "../components/MainNav";
import { MentorsSection } from "../components/MentorsSection";
import { ScheduleSection } from "../components/ScheduleSection";
import { useFadeIn } from "../hooks/useFadeIn";

export const HomePage = () => {
  useFadeIn();
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNavVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (  
    <>
      <div className="background-glow" />
      <MainNav visible={navVisible} />
      <Hero />
      <main>
        <AboutSection />
        <ScheduleSection />
        <MentorsSection />
        <ClubsSection />
      </main>
      <Footer />
    </>
  );
};
