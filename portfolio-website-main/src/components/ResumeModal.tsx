import { useEffect, useState } from "react";
import { FiDownload, FiExternalLink, FiX, FiFileText, FiEye } from "react-icons/fi";
import { getAssetPath } from "../utils/assetPath";
import "./styles/ResumeModal.css";

export const openResumeModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-resume-modal"));
  }
};

const ResumeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [forceIframe, setForceIframe] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const resumeUrl = getAssetPath("Ashrith_H_N_resume.pdf");

  useEffect(() => {
    const checkMobile = () => {
      const mobileWidth = window.innerWidth <= 768;
      const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsMobile(mobileWidth || mobileUA);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setIframeError(false);
      setForceIframe(false);
      setIsOpen(true);
    };
    window.addEventListener("open-resume-modal", handleOpen);
    return () => window.removeEventListener("open-resume-modal", handleOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const showIframe = !isMobile || forceIframe;

  return (
    <div
      className="resume-modal-overlay"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Resume Viewer"
    >
      <div
        className={`resume-modal-container ${!showIframe ? "resume-modal-compact" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="resume-modal-header">
          <div className="resume-modal-title-wrap">
            <FiFileText className="resume-modal-title-icon" />
            <span className="resume-modal-title">Ashrith H N — Resume</span>
            <span className="resume-modal-badge">PDF</span>
          </div>

          <div className="resume-modal-actions">
            <a
              href={resumeUrl}
              download="Ashrith_H_N_resume.pdf"
              className="resume-modal-download-btn"
              title="Download Resume (PDF)"
            >
              <FiDownload />
              <span>Download</span>
            </a>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-modal-icon-btn"
              title="Open PDF in new tab"
            >
              <FiExternalLink />
            </a>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="resume-modal-icon-btn resume-modal-close-btn"
              title="Close (Esc)"
              aria-label="Close Resume"
            >
              <FiX />
            </button>
          </div>
        </div>

        <div className="resume-modal-body">
          {showIframe ? (
            <>
              <iframe
                src={`${resumeUrl}#toolbar=0&navpanes=0&view=FitH`}
                title="Ashrith H N Resume"
                className="resume-modal-iframe"
                onError={() => setIframeError(true)}
              />
              {iframeError && (
                <div className="resume-modal-error-card">
                  <FiFileText className="resume-card-icon" />
                  <h4>Browser Blocked In-Page Preview</h4>
                  <p>Your browser blocked embedding this PDF directly in the frame.</p>
                  <div className="resume-card-buttons">
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resume-btn-primary"
                    >
                      <FiEye /> Open Resume in Browser
                    </a>
                    <a
                      href={resumeUrl}
                      download="Ashrith_H_N_resume.pdf"
                      className="resume-btn-secondary"
                    >
                      <FiDownload /> Download PDF
                    </a>
                  </div>
                </div>
              )}
              <div className="resume-modal-bottom-bar">
                <span>View controls:</span>
                <div className="resume-modal-bottom-links">
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                    Open in Full Tab
                  </a>
                  <span>•</span>
                  <a href={resumeUrl} download="Ashrith_H_N_resume.pdf">
                    Download PDF
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="resume-modal-mobile-choice">
              <div className="resume-choice-icon-wrap">
                <FiFileText className="resume-choice-icon" />
              </div>
              <h3 className="resume-choice-title">Ashrith H N — Resume</h3>
              <p className="resume-choice-subtitle">
                CSE Graduate • Cloud & Web Systems • 1-Page PDF
              </p>

              <div className="resume-choice-actions">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-btn-primary"
                  onClick={() => setIsOpen(false)}
                >
                  <FiEye />
                  <span>Open Resume in Browser</span>
                </a>

                <a
                  href={resumeUrl}
                  download="Ashrith_H_N_resume.pdf"
                  className="resume-btn-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  <FiDownload />
                  <span>Download PDF (155 KB)</span>
                </a>
              </div>

              <button
                type="button"
                className="resume-preview-toggle-btn"
                onClick={() => setForceIframe(true)}
              >
                Try in-app preview anyway
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
