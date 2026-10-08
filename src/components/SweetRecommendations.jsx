import { useRef } from 'react';
import PropTypes from 'prop-types';
import KoreanIcon from './KoreanIcon';
import CheesecakeCard from './CheesecakeCard';
import { productPropType } from '../helpers/typeRules';

function SweetRecommendations({ title, products, favorites, onToggleFavorite, onAddToBasket, onBuyNow }) {
  const trackRef = useRef(null);

  const handleScroll = (direction) => {
    const track = trackRef.current;
    if (track === null) {
      return;
    }
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' });
  };

  const arrowClass =
    'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-zinc-200 text-zinc-950 transition hover:bg-[#8f7bd8] hover:text-white active:scale-90';

  if (products.length === 0) {
    return null;
  }

  return (
    <section aria-label={title}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-zinc-950 md:text-3xl">{title}</h2>
        <div className="flex gap-2">
          <button type="button" onClick={() => handleScroll(-1)} aria-label="Scroll left" className={arrowClass}>
            <KoreanIcon name="arrowLeft" className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => handleScroll(1)} aria-label="Scroll right" className={arrowClass}>
            <KoreanIcon name="arrowRight" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div ref={trackRef} className="no-scrollbar -mx-1 mt-6 flex snap-x gap-5 overflow-x-auto px-1 pb-2">
        {products.map((product) => (
          <CheesecakeCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onToggleFavorite={onToggleFavorite}
            onAddToBasket={onAddToBasket}
            onBuyNow={onBuyNow}
            className="w-64 shrink-0 snap-start sm:w-72"
          />
        ))}
      </div>
    </section>
  );
}

SweetRecommendations.propTypes = {
  title: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(productPropType).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onAddToBasket: PropTypes.func.isRequired,
  onBuyNow: PropTypes.func.isRequired,
};

export default SweetRecommendations;
