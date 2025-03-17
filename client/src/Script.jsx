import { useEffect } from "react";

const Script = () => {
  useEffect(() => {
    const container = document.querySelector(".horizontal-slide");
    const scrollLine = document.querySelector(".line-bar");
    const sections = document.querySelectorAll(".box");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    if (
      !container ||
      !scrollLine ||
      !prevBtn ||
      !nextBtn ||
      sections.length === 0
    )
      return;

    let currentIndex = 0;

    const scrollToIndex = (index) => {
      if (index < 0 || index >= sections.length) return;
      currentIndex = index;
      container.scrollTo({
        left: sections[index].offsetLeft,
        behavior: "smooth",
      });
      updateScrollLine();
    };

    const updateScrollLine = () => {
      const progress =
        (container.scrollLeft /
          (container.scrollWidth - container.clientWidth)) *
        100;
      scrollLine.style.width = `${progress}%`;
    };

    const handleScroll = () => {
      let closestIndex = 0;
      let minDiff = Math.abs(container.scrollLeft - sections[0].offsetLeft);

      sections.forEach((section, index) => {
        let diff = Math.abs(container.scrollLeft - section.offsetLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = index;
        }
      });

      currentIndex = closestIndex;
      updateScrollLine();
    };

    const handlePrevClick = () => {
      if (currentIndex > 0) scrollToIndex(currentIndex - 1);
    };

    const handleNextClick = () => {
      if (currentIndex < sections.length - 1) scrollToIndex(currentIndex + 1);
    };

    container.addEventListener("scroll", handleScroll);
    prevBtn.addEventListener("click", handlePrevClick);
    nextBtn.addEventListener("click", handleNextClick);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      prevBtn.removeEventListener("click", handlePrevClick);
      nextBtn.removeEventListener("click", handleNextClick);
    };
  }, []);

  return null;
};

export default Script;
