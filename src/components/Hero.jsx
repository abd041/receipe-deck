import './Hero.css';

export default function Hero({ recipeCount }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__content">
        <p className="hero__eyebrow">Your kitchen recipe box, reimagined</p>
        <h1 id="hero-title">Discover recipes through interactive cards</h1>
        <p className="hero__text">
          Flip for ingredients, expand for a quick preview, and save your favorites —
          all in a clean, card-based experience inspired by physical recipe cards.
        </p>
        <div className="hero__stats">
          <div>
            <strong>{recipeCount}</strong>
            <span>Recipe cards</span>
          </div>
          <div>
            <strong>Flip</strong>
            <span>&amp; expand</span>
          </div>
          <div>
            <strong>Local</strong>
            <span>Favorites</span>
          </div>
        </div>
      </div>
      <div className="hero__visual" aria-hidden="true">
        <div className="hero__card hero__card--back">
          <span>Ingredients</span>
          <ul>
            <li>Fresh herbs</li>
            <li>Olive oil</li>
            <li>Garlic</li>
          </ul>
        </div>
        <div className="hero__card hero__card--front">
          <div className="hero__card-image" />
          <div className="hero__card-body">
            <strong>Creamy Garlic Pasta</strong>
            <span>Italian · 20 min</span>
          </div>
        </div>
      </div>
    </section>
  );
}
