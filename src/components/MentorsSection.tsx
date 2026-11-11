import { mentors } from "../data";
import { MentorCarousel } from "./MentorCarousel";

export const MentorsSection = () => (
  <section id="mentors" className="fade-in">
    <div className="container">
      <h2>Meet Your Mentors</h2>
      <p className="section-desc">
        여러분을 도와줄 든든한 선배들을 소개합니다.
      </p>
      <MentorCarousel mentors={mentors} />
    </div>
  </section>
);
