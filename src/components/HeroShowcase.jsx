import { ClockIcon } from './Icons';
import useMouseTilt from '../hooks/useMouseTilt';
import './HeroShowcase.css';

const STACK = [
  {
    id: 's1',
    kind: 'recipe',
    image: '/images/recipe-3.png',
    title: 'Shakshuka',
    meta: '20 min',
    depth: 'far',
    tint: 'rgba(247, 164, 90, 0.35)',
    style: { '--r': '-18deg', '--tx': '-116px', '--ty': '83px', '--s': '0.78', '--z': 1, '--dur': '9s', '--delay': '0s' },
  },
  {
    id: 's2',
    kind: 'ingredients',
    title: 'Ingredients',
    items: ['Basil', 'Olive oil', 'Garlic'],
    depth: 'far',
    style: { '--r': '-10deg', '--tx': '-67px', '--ty': '46px', '--s': '0.86', '--z': 2, '--dur': '7.5s', '--delay': '-1.2s' },
  },
  {
    id: 's3',
    kind: 'recipe',
    image: '/images/recipe-7.png',
    title: 'Grilled Salmon',
    meta: '30 min',
    depth: 'mid',
    tint: 'rgba(107, 142, 35, 0.3)',
    style: { '--r': '6deg', '--tx': '12px', '--ty': '22px', '--s': '0.9', '--z': 3, '--dur': '8s', '--delay': '-2s' },
  },
  {
    id: 's4',
    kind: 'recipe',
    image: '/images/recipe-6.png',
    title: 'Thai Green Curry',
    meta: '25 min',
    depth: 'mid',
    tint: 'rgba(107, 142, 35, 0.4)',
    style: { '--r': '-4deg', '--tx': '-22px', '--ty': '-10px', '--s': '0.96', '--z': 4, '--dur': '6.5s', '--delay': '-0.8s' },
  },
  {
    id: 's5',
    kind: 'recipe',
    image: '/images/recipe-1.png',
    title: 'Avocado Toast',
    meta: '10 min',
    depth: 'near',
    tint: 'rgba(247, 164, 90, 0.28)',
    style: { '--r': '11deg', '--tx': '88px', '--ty': '29px', '--s': '0.88', '--z': 5, '--dur': '10s', '--delay': '-3s' },
  },
  {
    id: 's6',
    kind: 'recipe',
    image: '/images/recipe-9.png',
    title: 'Paneer Masala',
    meta: '35 min',
    depth: 'near',
    tint: 'rgba(230, 57, 70, 0.2)',
    style: { '--r': '-12deg', '--tx': '59px', '--ty': '71px', '--s': '0.84', '--z': 6, '--dur': '11s', '--delay': '-1.8s' },
  },
  {
    id: 's7',
    kind: 'recipe',
    image: '/images/recipe-4.png',
    title: 'Chicken Tikka',
    meta: '28 min',
    featured: true,
    depth: 'focus',
    tint: 'rgba(247, 164, 90, 0.45)',
    style: { '--r': '3deg', '--tx': '0px', '--ty': '0px', '--s': '1', '--z': 7, '--dur': '7s', '--delay': '-0.5s' },
  },
];

const PARTICLES = ['🌿', '🍅', '🧄', '🫒', '🌶', '🍋', '🥬', '🧂'];

export default function HeroShowcase() {
  const { ref, onMove, onLeave } = useMouseTilt();

  return (
    <div
      className="hero-showcase"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="hero-showcase__spotlight" />
      <div className="hero-showcase__glow" />
      <div className="hero-showcase__glow hero-showcase__glow--warm" />
      <div className="hero-showcase__glow hero-showcase__glow--cool" />
      <div className="hero-showcase__floor" />
      <div className="hero-showcase__bloom" aria-hidden="true" />

      <div className="hero-showcase__particles">
        {PARTICLES.map((icon, i) => (
          <span
            key={icon}
            className="hero-showcase__particle"
            style={{ '--pi': i, '--pdur': `${14 + i * 2}s` }}
          >
            {icon}
          </span>
        ))}
      </div>

      <div className="hero-showcase__tilt">
        <div className="hero-showcase__wallet-base" aria-hidden="true" />
        <div className="hero-showcase__stack">
          {STACK.map((card) => (
            <div
              key={card.id}
              className={[
                'hero-showcase__card',
                card.featured && 'is-featured',
                card.kind === 'ingredients' && 'is-ingredients',
                card.depth && `is-depth-${card.depth}`,
              ]
                .filter(Boolean)
                .join(' ')}
              style={{
                ...card.style,
                ...(card.tint ? { '--card-tint': card.tint } : {}),
              }}
            >
              <div className="hero-showcase__card-reflection" aria-hidden="true" />
              <div className="hero-showcase__card-inner">
                {card.kind === 'ingredients' ? (
                  <>
                    <span className="hero-showcase__card-label">{card.title}</span>
                    <ul>
                      {card.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <div className="hero-showcase__card-media">
                      <img src={card.image} alt="" />
                      <div className="hero-showcase__card-overlay" />
                    </div>
                    <div className="hero-showcase__card-info">
                      <strong>{card.title}</strong>
                      <span>
                        <ClockIcon size={12} />
                        {card.meta}
                      </span>
                    </div>
                  </>
                )}
                <div className="hero-showcase__card-shine" />
                <div className="hero-showcase__card-edge" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-showcase__hint">
        <span className="hero-showcase__hint-dot" />
        Flip · Expand · Save
      </div>
    </div>
  );
}
