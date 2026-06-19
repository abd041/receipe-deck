import Reveal from './Reveal';
import './HowItWorks.css';

const STEPS = [
  {
    num: '01',
    title: 'Browse',
    desc: 'Explore a curated deck of recipe cards — search, filter, and discover your next meal.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="5" y="7" width="22" height="18" rx="4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 13h12M10 17h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    accent: 'olive',
  },
  {
    num: '02',
    title: 'Flip',
    desc: 'Tap any card to flip it over and reveal ingredients — just like a real recipe card.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M8 10h16v14a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 10l8-4 8 4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M14 18h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    accent: 'orange',
  },
  {
    num: '03',
    title: 'Cook',
    desc: 'Expand for a preview or open the full recipe with step-by-step instructions.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="17" r="8" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 9c0-2 1.8-4 4-4s4 2 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M14 20l2 2 4-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: 'beige',
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works" aria-labelledby="how-it-works-title">
      <Reveal className="how-it-works__header">
        <span className="how-it-works__eyebrow">How it works</span>
        <h2 id="how-it-works-title">
          Three steps to your
          <span className="how-it-works__gradient"> perfect plate</span>
        </h2>
      </Reveal>

      <div className="how-it-works__grid">
        {STEPS.map((step, i) => (
          <Reveal key={step.num} delay={i * 120} className="how-it-works__item">
            <article className={`how-it-works__card how-it-works__card--${step.accent}`}>
              <span className="how-it-works__num">{step.num}</span>
              <div className="how-it-works__icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              <div className="how-it-works__card-shine" aria-hidden="true" />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
