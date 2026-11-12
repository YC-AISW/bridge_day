import { AboutSection } from "../components/AboutSection";
import { ApplyBar } from "../components/ApplyBar";
import { ClubsSection } from "../components/ClubsSection";
import { DirectionsSection } from "../components/DirectionsSection";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { MentorsSection } from "../components/MentorsSection";
import { ScheduleSection } from "../components/ScheduleSection";
import { SideNav } from "../components/SideNav";
import { useFadeIn } from "../hooks/useFadeIn";

export const HomePage = () => {
  useFadeIn();

  return (
    <>
      <div className="background-glow" />
      <SideNav />
      <Hero />
      <main>
        <AboutSection />
        <ScheduleSection />
        <MentorsSection />
        <ClubsSection />
        <DirectionsSection />
      </main>
      <Footer />
      <ApplyBar />
    </>
  );
};
