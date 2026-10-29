import { useEffect, useState } from "react";
import { FiDownload, FiExternalLink, FiX, FiFileText } from "react-icons/fi";
import { getAssetPath } from "../utils/assetPath";
import "./styles/ResumeModal.css";

export const openResumeModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-resume-modal"));
  }
};

const ResumeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const resumeUrl = getAssetPath("Ashrith_H_N_resume.pdf");

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
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

  return (
    <div
      className="resume-modal-overlay"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Resume Viewer"
    >
      <div
        className="resume-modal-container"
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
          <iframe
            src={`${resumeUrl}#toolbar=0&navpanes=0&view=FitH`}
            title="Ashrith H N Resume"
            className="resume-modal-iframe"
          />
          <div className="resume-modal-mobile-bar">
            <span>Viewing preview</span>
            <a href={resumeUrl} download="Ashrith_H_N_resume.pdf">
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
