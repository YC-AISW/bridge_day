import type { ReactNode } from "react";

type Props = {
  id: string;
  title: ReactNode;
  children?: ReactNode;
};

/** 섹션 머리말: 제목 + 한 줄 설명 */
export const SectionHead = ({ id, title, children }: Props) => (
  <header className="section-head">
    <h2 className="section-title" id={id}>
      {title}
    </h2>
    {children && <div className="section-lead">{children}</div>}
  </header>
);
