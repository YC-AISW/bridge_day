// 행사 기본 정보를 렌더링할 데이터 배열 (아이콘 + 텍스트)
const eventInfo = [
  { icon: "📅", label: "12월 6일 (토) 12:00" },
  { icon: "📍", label: "AI-DX 센터 2층" },
];

// 메인 Hero 섹션: 페이지 최상단 헤더 역할 + 스크롤 전 사용자 인지 영역
export const Hero = () => (
  <header id="top" className="hero">
    <div className="container">
      {/* 초대 배지 */}
      <span className="badge">Special Invitation</span>

      {/* 행사 제목 및 주요 캐치프레이즈 */}
      <h1>2025 BRIDGE DAY</h1>
      <p className="subtitle">소프트웨어 인재를 위한 특별한 만남의 장</p>

      {/* 날짜/장소 등 핵심 정보 */}
      <div className="event-info">
        {eventInfo.map((info) => (
          <div className="info-item" key={info.label}>
            {/* 아이콘은 시각적 장식 용도이므로 aria-hidden 지정 */}
            <span className="icon" aria-hidden>
              {info.icon}
            </span>
            <span>{info.label}</span>
          </div>
        ))}
      </div>
    </div>

    {/* 페이지 아래로 안내하는 스크롤 힌트 영역 */}
    <div className="scroll-indicator">
      <span>아래로 스크롤</span>
      <div className="arrow" />
    </div>
  </header>
);
