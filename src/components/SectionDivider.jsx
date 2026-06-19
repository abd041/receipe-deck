import './SectionDivider.css';

export default function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden="true">
      <svg className="section-divider__curve" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path
          d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
          fill="currentColor"
        />
      </svg>
      <div className="section-divider__glow" />
      <span className="section-divider__leaf">🌿</span>
      <span className="section-divider__tomato">🍅</span>
    </div>
  );
}
