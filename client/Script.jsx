import { useEffect } from "react";

const Script = () => {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log(`Horizontal Scroll Position: ${window.scrollX}`);
    });

    const container = document.querySelector(".horizontal-slide");
    const scrollLine = document.querySelector(".line-bar");
    const sections = document.querySelectorAll(".horizontal-slide > div");
    const [prevBtn, nextBtn] = document.querySelectorAll(".prev, .next");

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
      scrollLine.style.width = `${
        (container.scrollLeft /
          (container.scrollWidth - container.clientWidth)) *
        100
      }%`;
    };

    const handleScroll = () => {
      let closestIndex = [...sections].reduce(
        (closest, section, index) =>
          Math.abs(container.scrollLeft - section.offsetLeft) <
          Math.abs(container.scrollLeft - sections[closest].offsetLeft)
            ? index
            : closest,
        0
      );
      console.log(currentIndex);
      currentIndex = closestIndex;
      updateScrollLine();
    };

    container.addEventListener("scroll", handleScroll);
    prevBtn.addEventListener("click", () => scrollToIndex(currentIndex - 1));
    nextBtn.addEventListener("click", () => scrollToIndex(currentIndex + 1));

    return () => {
      container.removeEventListener("scroll", handleScroll);
      prevBtn.removeEventListener("click", () =>
        scrollToIndex(currentIndex - 1)
      );
      nextBtn.removeEventListener("click", () =>
        scrollToIndex(currentIndex + 1)
      );
    };
  }, []);

  return null;
};

export default Script;
