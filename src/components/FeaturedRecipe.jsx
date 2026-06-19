import { Link } from 'react-router-dom';
import { ChefHatIcon, ClockIcon } from './Icons';
import Reveal from './Reveal';
import './FeaturedRecipe.css';

const FEATURED = {
  id: 'thai-green-curry',
  name: 'Thai Green Curry',
  cuisine: 'Thai',
  mealType: 'Lunch',
  difficulty: 'Medium',
  prepTime: 25,
  cookTime: 30,
  servings: 4,
  image: '/images/recipe-6.png',
  description:
    'A fragrant coconut curry layered with fresh vegetables and aromatic green curry paste — the kind of recipe that deserves a place at the front of your deck.',
};

export default function FeaturedRecipe() {
  return (
    <section className="featured-recipe" aria-labelledby="featured-recipe-title">
      <Reveal className="featured-recipe__wrap">
        <div className="featured-recipe__glow" aria-hidden="true" />
        <div className="featured-recipe__layout">
          <div className="featured-recipe__media">
            <div className="featured-recipe__image-frame">
              <img src={FEATURED.image} alt={FEATURED.name} />
              <div className="featured-recipe__image-shine" />
              <div className="featured-recipe__image-bloom" />
            </div>
            <span className="featured-recipe__tag">Editor&apos;s pick</span>
          </div>

          <div className="featured-recipe__copy">
            <span className="featured-recipe__eyebrow">Featured recipe</span>
            <h2 id="featured-recipe-title">{FEATURED.name}</h2>
            <p className="featured-recipe__story">{FEATURED.description}</p>

            <div className="featured-recipe__stats">
              <div>
                <ClockIcon size={16} />
                <span>
                  <strong>{FEATURED.prepTime} min</strong>
                  prep
                </span>
              </div>
              <div>
                <ChefHatIcon size={16} />
                <span>
                  <strong>{FEATURED.difficulty}</strong>
                  level
                </span>
              </div>
              <div>
                <span className="featured-recipe__stat-icon">🍽</span>
                <span>
                  <strong>Serves {FEATURED.servings}</strong>
                  people
                </span>
              </div>
            </div>

            <Link
              to={`/recipe/${FEATURED.id}`}
              className="btn btn-primary btn-lg btn-shine featured-recipe__cta"
            >
              View full recipe
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
