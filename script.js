document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((el) => {
    observer.observe(el);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  initMentorSlider();
});

function initMentorSlider() {
  const slider = document.querySelector(".mentor-slider");
  if (!slider) return;

  const track = slider.querySelector(".mentor-track");
  const wrapper = slider.querySelector(".mentor-track-wrapper");
  const cards = Array.from(slider.querySelectorAll(".mentor-card"));
  const prevBtn = slider.querySelector(".slider-nav.prev");
  const nextBtn = slider.querySelector(".slider-nav.next");
  const dotsContainer = slider.querySelector(".slider-dots");

  let currentIndex = 0;
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let activePointerId = null;

  const dots = cards.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slider-dot";
    dot.setAttribute("aria-label", `${index + 1}번째 멘토 카드`);
    dot.addEventListener("click", () => {
      currentIndex = index;
      setPositionByIndex();
      updateDots();
      updateNavState();
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  updateDots();
  updateNavState();
  setPositionByIndex();

  prevBtn.addEventListener("click", () => {
    if (currentIndex === 0) return;
    currentIndex -= 1;
    setPositionByIndex();
    updateDots();
    updateNavState();
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex === cards.length - 1) return;
    currentIndex += 1;
    setPositionByIndex();
    updateDots();
    updateNavState();
  });

  track.addEventListener("pointerdown", pointerDown);
  window.addEventListener("pointerup", pointerUp);
  window.addEventListener("pointercancel", pointerUp);
  window.addEventListener("pointermove", pointerMove);
  window.addEventListener("resize", setPositionByIndex);

  function pointerDown(event) {
    isDragging = true;
    startX = event.clientX;
    activePointerId = event.pointerId;
    track.classList.add("grabbing");
    track.style.transition = "none";
    event.preventDefault();
  }

  function pointerMove(event) {
    if (!isDragging || event.pointerId !== activePointerId) return;
    const currentPosition = event.clientX;
    const diff = currentPosition - startX;
    currentTranslate = prevTranslate + diff;
    setTranslate();
  }

  function pointerUp(event) {
    if (!isDragging || event.pointerId !== activePointerId) return;
    isDragging = false;
    track.classList.remove("grabbing");
    const movedBy = currentTranslate - prevTranslate;
    const threshold = wrapper.offsetWidth * 0.2;

    if (movedBy < -threshold && currentIndex < cards.length - 1) {
      currentIndex += 1;
    }

    if (movedBy > threshold && currentIndex > 0) {
      currentIndex -= 1;
    }

    setPositionByIndex();
    updateDots();
    updateNavState();
    activePointerId = null;
  }

  function setTranslate() {
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  function setPositionByIndex() {
    const width = wrapper.offsetWidth;
    currentTranslate = -currentIndex * width;
    prevTranslate = currentTranslate;
    track.style.transition = isDragging
      ? "none"
      : "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
    setTranslate();
  }

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function updateNavState() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === cards.length - 1;
  }
}

//
