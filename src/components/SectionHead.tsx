import type { ReactNode } from "react";
import { cssVars } from "../lib/cssVars";

type Props = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  center?: boolean;
};

/** 섹션 공통 머리말: 영문 eyebrow + 큰 제목 + 설명 */
export const SectionHead = ({ id, eyebrow, title, children, center }: Props) => (
  <header className={`section-head${center ? " section-head--center" : ""}`}>
    <p className="eyebrow reveal">{eyebrow}</p>
    <h2 className="section-title reveal" id={id} style={cssVars({ "--i": 1 })}>
      {title}
    </h2>
    {children && (
      <div className="section-lead reveal" style={cssVars({ "--i": 2 })}>
        {children}
      </div>
    )}
  </header>
);
