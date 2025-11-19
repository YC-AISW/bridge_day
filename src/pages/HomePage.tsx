import { AboutSection } from "../components/AboutSection";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { MentorsSection } from "../components/MentorsSection";
import { ScheduleSection } from "../components/ScheduleSection";
import { useFadeIn } from "../hooks/useFadeIn";

export const HomePage = () => {
  useFadeIn();

  return (
    <>
      <div className="background-glow" />
      <Hero />
      <main>
        <AboutSection />
        <ScheduleSection />
        <MentorsSection />
      </main>
      <Footer />
    </>
  );
};

