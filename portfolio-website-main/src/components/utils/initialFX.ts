import { TextSplitter } from "../../utils/textSplitter";
import gsap from "gsap";
import { lenis } from "../Navbar";

let isFXRunning = false;

export function initialFX() {
  if (isFXRunning) return;
  isFXRunning = true;

  document.body.style.overflowY = "auto";
  document.body.style.overflow = "auto";
  document.documentElement.style.overflowY = "auto";
  if (lenis) {
    lenis.start();
  }
  const mainEl = document.getElementsByTagName("main")[0];
  if (mainEl) {
    mainEl.classList.add("main-active");
  }
  gsap.to("body", {
    backgroundColor: "#eae5ec",
    duration: 0.4,
    delay: 0.2,
  });

  const selectors = [".landing-intro h2", ".landing-intro h1"];
  const elements = selectors.flatMap(selector => Array.from(document.querySelectorAll(selector)));
  
  if (elements.length > 0) {
    const landingText = new TextSplitter(elements, {
      type: "chars,lines",
      linesClass: "split-line",
    });
    gsap.fromTo(
      landingText.chars,
      { opacity: 0, y: 50, filter: "blur(4px)" },
      {
        opacity: 1,
        duration: 0.9,
        filter: "blur(0px)",
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
        delay: 0.1,
      }
    );
  }

  gsap.fromTo(
    [".landing-info h3", ".landing-hero-title", ".landing-hero-title-accent", ".landing-hero-tag"],
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      y: 0,
      stagger: 0.12,
      delay: 0.2,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.8,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );
}
