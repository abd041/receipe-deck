import { useEffect } from 'react';

export default function DocumentTitle({ title }) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} · RecipeDeck` : 'RecipeDeck';
    return () => {
      document.title = previous;
    };
  }, [title]);

  return null;
}
