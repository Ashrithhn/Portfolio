import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import { config } from "../config";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const Navbar = () => {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Start paused
    lenis.stop();

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateLenisTicker = (time: number) => {
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(updateLenisTicker);
    gsap.ticker.lagSmoothing(0);

    // Sudden scroll recovery failsafe: restore landing elements when near top
    const restoreLandingAtTop = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY < 80) {
        const landing = document.querySelector(".landing-container") as HTMLElement;
        if (landing && parseFloat(window.getComputedStyle(landing).opacity) < 0.95) {
          gsap.to(".landing-container", {
            opacity: 1,
            y: "0%",
            duration: 0.2,
            overwrite: "auto",
          });
        }
        const charModel = document.querySelector(".character-model") as HTMLElement;
        if (
          charModel &&
          (charModel.style.transform.includes("-100%") ||
            parseFloat(window.getComputedStyle(charModel).opacity) < 0.9)
        ) {
          gsap.to(".character-model", {
            x: window.innerWidth > 1024 ? "0%" : "-50%",
            y: "0%",
            opacity: 1,
            duration: 0.2,
            overwrite: "auto",
          });
        }
      }
    };

    window.addEventListener("scroll", restoreLandingAtTop, { passive: true });
    lenis.on("scroll", restoreLandingAtTop);

    // Handle navigation links
    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (section && lenis) {
            const target = document.querySelector(section) as HTMLElement;
            if (target) {
              lenis.scrollTo(target, {
                offset: 0,
                duration: 1.5,
              });
            }
          }
        }
      });
    });

    // Handle resize
    window.addEventListener("resize", () => {
      lenis?.resize();
    });

    return () => {
      window.removeEventListener("scroll", restoreLandingAtTop);
      lenis?.off("scroll", ScrollTrigger.update);
      lenis?.off("scroll", restoreLandingAtTop);
      gsap.ticker.remove(updateLenisTicker);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Ashrith <span>H N</span>
        </a>
        <a
          href={`mailto:${config.social.email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {config.social.email}
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
