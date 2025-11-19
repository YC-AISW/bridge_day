const eventInfo = [
  { icon: "📅", label: "12월 6일 (금) 12:00" },
  { icon: "📍", label: "AI-DX 센터 2층" },
];

export const Hero = () => (
  <header className="hero">
    <div className="container">
      <span className="badge">Special Invitation</span>
      <h1>2025 BRIDGE DAY</h1>
      <p className="subtitle">소프트웨어 인재를 위한 특별한 만남의 장</p>
      <div className="event-info">
        {eventInfo.map((info) => (
          <div className="info-item" key={info.label}>
            <span className="icon" aria-hidden>
              {info.icon}
            </span>
            <span>{info.label}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="scroll-indicator">
      <span>아래로 스크롤</span>
      <div className="arrow" />
    </div>
  </header>
);
