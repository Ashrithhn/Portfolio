import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import { config } from "../config";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  const openHomePage = () => {
    setLoaded(true);
    setIsLoaded(true);
    setClicked(true);
    import("./utils/initialFX").then((module) => {
      if (module.initialFX) {
        module.initialFX();
      }
    });
    setIsLoading(false);
  };

  // Auto safety: if user is still on loader after 3.5s, immediately open home page
  useEffect(() => {
    const safety = setTimeout(() => {
      openHomePage();
    }, 3500);
    return () => clearTimeout(safety);
  }, []);

  // Step 1: Once percent reaches 100, set loaded = true (reveals "Welcome")
  useEffect(() => {
    if (percent >= 100 && !loaded) {
      setLoaded(true);
    }
  }, [percent, loaded]);

  // Step 2: Once loaded = true, show "Welcome" for 400ms, then trigger transition
  useEffect(() => {
    if (loaded && !isLoaded) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [loaded, isLoaded]);

  // Step 3: Expand the circle smoothly and open home page
  useEffect(() => {
    if (isLoaded) {
      setClicked(true);
      const timer = setTimeout(() => {
        import("./utils/initialFX").then((module) => {
          if (module.initialFX) {
            module.initialFX();
          }
        });
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, setIsLoading]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          {config.developer.name} <span>{config.developer.fullName.split(" ").slice(1).join(" ")}</span>
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen" onClick={openHomePage} style={{ cursor: "pointer" }}>
        <div className="loading-marquee">
          <Marquee speed={40}>
            <span>&nbsp; Frontend Developer &nbsp;</span>
            <span>&nbsp; Aspiring SDE &nbsp;</span>
            <span>&nbsp; Cloud Enthusiast &nbsp;</span>
            <span>&nbsp; Computer Science Student &nbsp;</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded ? "loading-complete" : ""}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  let interval = setInterval(() => {
    const maxTarget = isMobile ? 100 : 90;
    if (percent < maxTarget) {
      percent += Math.floor(Math.random() * 6) + 4;
      if (percent > maxTarget) percent = maxTarget;
      setLoading(percent);
    } else {
      clearInterval(interval);
    }
  }, isMobile ? 40 : 35);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent += 4;
          if (percent > 100) percent = 100;
          setLoading(percent);
        } else {
          resolve(100);
          clearInterval(interval);
        }
      }, 15);
    });
  }
  return { loaded, percent, clear };
};
