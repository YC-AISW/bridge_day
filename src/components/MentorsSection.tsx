import { mentors } from "../data";
import { MentorCarousel } from "./MentorCarousel";

export const MentorsSection = () => (
  <section id="mentors" className="fade-in">
    <div className="container">
      <h2>Meet Your Mentors</h2>
      <p className="section-desc">
        선후배가 한 공간에서 진짜 이야기를 나누는 시간. Swipe 하면서
        멘토들을 만나보세요!
      </p>
      <MentorCarousel mentors={mentors} />
    </div>
  </section>
);

