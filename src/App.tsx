import { About } from "./components/About";
import { Clubs } from "./components/Clubs";
import { Directions } from "./components/Directions";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Mentors } from "./components/Mentors";
import { Schedule } from "./components/Schedule";
import { ScrollProgress } from "./components/ScrollProgress";
import { SiteNav } from "./components/SiteNav";
import { Ticker } from "./components/Ticker";
import { usePauseOffscreen } from "./hooks/usePauseOffscreen";
import { useReveal } from "./hooks/useReveal";

const App = () => {
  useReveal();
  usePauseOffscreen();

  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 건너뛰기
      </a>
      <ScrollProgress />
      <SiteNav />
      <Hero />
      <main id="main">
        <Ticker />
        <About />
        <Schedule />
        <Mentors />
        <Clubs />
        <Directions />
      </main>
      <Footer />
    </>
  );
};

export default App;
