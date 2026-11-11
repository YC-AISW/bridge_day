import { Icon } from "./Icon";
import "./Ticker.css";

const WORDS = ["NETWORKING", "LUNCH & GIFT", "MENTORING", "PORTFOLIO", "AI·DX CENTER", "PROJECT DEMO"];

// 같은 묶음을 두 번 이어 붙여서 끊김 없이 흐르게 해요.
const Tape = ({ variant }: { variant: "fill" | "outline" }) => (
  <div className={`ticker__tape ticker__tape--${variant}`}>
    {[0, 1].map((copy) => (
      <div className="ticker__group" key={copy}>
        {WORDS.map((word) => (
          <span className="ticker__item" key={word}>
            {word}
            <Icon name="star" size={22} />
          </span>
        ))}
      </div>
    ))}
  </div>
);

/** 엇갈린 두 줄의 흐르는 띠 (장식) */
export const Ticker = () => (
  <div className="ticker" aria-hidden="true" data-anim>
    <Tape variant="outline" />
    <Tape variant="fill" />
  </div>
);
