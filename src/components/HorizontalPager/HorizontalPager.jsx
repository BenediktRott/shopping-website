import { useState, useRef, Children } from "react";
import styles from "./HorizontalPager.module.css";
import React from "react";

const SLIDES = [
  { id: 1, color: "#3b82f6", title: "Slide 1" },
  { id: 2, color: "#10b981", title: "Slide 2" },
  { id: 3, color: "#8b5cf6", title: "Slide 3" },
];

export function HorizontalPager({ children }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const trackRef = useRef(null);

  const childrenArray = Children.toArray(children);

  const handleScroll = () => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const slides = Array.from(track.children);
    const trackCenter = track.scrollLeft + track.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    slides.forEach((slide, idx) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(trackCenter - slideCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIdx(closestIndex);
  };

  const scrollToIndex = (index) => {
    if (!trackRef.current) return;
    const targetSlide = trackRef.current.children[index];
    if (targetSlide) {
      targetSlide.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  return (
    <div className={styles.pagerContainer}>
      {/* Scroll Track */}
      <div className={styles.track} ref={trackRef} onScroll={handleScroll}>
        {childrenArray.map((child, idx) => {
          if (React.isValidElement(child)) {
            return (
              <div
                key={child.key}
                className={`${styles.slide} ${activeIdx === idx ? styles.active : styles.inactive}`}
                onClick={() => scrollToIndex(idx)}
              >
                {React.cloneElement(child, { inactive: activeIdx !== idx })}
              </div>
            );
          }
        })}
      </div>
      {/* Pagination Controls */}
      <div className={styles.pagination}>
        {childrenArray.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.dot} ${activeIdx === idx ? styles.activeDot : ``}`}
            onClick={() => scrollToIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
