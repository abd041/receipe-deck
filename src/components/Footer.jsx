import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>
          <strong>RecipeDeck</strong> — interactive digital recipe cards
        </p>
        <p className="site-footer__note">
          Favorites are saved locally in your browser. No account required.
        </p>
      </div>
    </footer>
  );
}
