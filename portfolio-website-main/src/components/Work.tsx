import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { config } from "../config";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    // Disable pinning on mobile to allow scrolling
    if (window.innerWidth <= 768) return;

    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Refresh ScrollTrigger after layout settles
    ScrollTrigger.refresh();

    // Auto-slide in loop when user arrives at the section, also allowing manual scroll
    let isHovered = false;
    let isResetting = false;
    let autoScrollRaf: number;
    let lastTime = performance.now();
    const autoScrollSpeed = 1.3; // gentle smooth sliding

    const workSection = document.getElementById("work");
    const onMouseEnter = () => {
      isHovered = true;
    };
    const onMouseLeave = () => {
      isHovered = false;
    };

    workSection?.addEventListener("mouseenter", onMouseEnter);
    workSection?.addEventListener("mouseleave", onMouseLeave);

    function autoScrollLoop(now: number) {
      const dt = Math.min((now - lastTime) / 16.67, 2.5);
      lastTime = now;

      const st = timeline.scrollTrigger;
      if (st && st.isActive && !isHovered && !isResetting) {
        if (st.progress >= 0.985) {
          isResetting = true;
          window.scrollTo({ top: st.start, behavior: "smooth" });
          setTimeout(() => {
            isResetting = false;
          }, 1200);
        } else {
          window.scrollBy(0, autoScrollSpeed * dt);
        }
      }

      autoScrollRaf = requestAnimationFrame(autoScrollLoop);
    }

    autoScrollRaf = requestAnimationFrame(autoScrollLoop);

    // Clean up
    return () => {
      cancelAnimationFrame(autoScrollRaf);
      workSection?.removeEventListener("mouseenter", onMouseEnter);
      workSection?.removeEventListener("mouseleave", onMouseLeave);
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {config.projects.map((project, index) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{index < 9 ? `0${index + 1}` : index + 1}</h3>
                  <div className="work-title-text">
                    <h4>{project.title}</h4>
                    <p className="work-category">{project.category}</p>
                  </div>
                </div>
                <p className="work-description">{project.description}</p>
                <div className="work-tools">
                  <h5>Tools &amp; Features</h5>
                  <p>{project.technologies}</p>
                </div>
              </div>
              <WorkImage image={project.image} alt={project.title} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
