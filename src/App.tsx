import { About } from "./components/About";
import { Clubs } from "./components/Clubs";
import { Directions } from "./components/Directions";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Mentors } from "./components/Mentors";
import { Schedule } from "./components/Schedule";
import { SiteNav } from "./components/SiteNav";

const App = () => {
  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 건너뛰기
      </a>
      <SiteNav />
      <Hero />
      <main id="main">
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
