import './BackgroundDecor.css';

const FLOATERS = ['🌿', '🍋', '🧄', '🫒', '🌶', '🥄'];

export default function BackgroundDecor() {
  return (
    <div className="bg-decor" aria-hidden="true">
      <div className="bg-decor__blob bg-decor__blob--1" />
      <div className="bg-decor__blob bg-decor__blob--2" />
      <div className="bg-decor__blob bg-decor__blob--3" />
      <div className="bg-decor__grain" />
      <div className="bg-decor__floaters">
        {FLOATERS.map((icon, i) => (
          <span
            key={icon}
            className="bg-decor__floater"
            style={{ '--i': i }}
          >
            {icon}
          </span>
        ))}
      </div>
    </div>
  );
}
