import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import KoreanIcon from './KoreanIcon';
import CheesecakeImage from './CheesecakeImage';
import { formatPrice, getDiscountPercent } from '../helpers/displayTools';
import { productPropType } from '../helpers/typeRules';

function CheesecakeCard({ product, isFavorite = false, onToggleFavorite, onAddToBasket, onBuyNow, className = '' }) {
  const imageRef = useRef(null);
  const [addedToBasket, setJustAdded] = useState(false);
  const isSoldOut = product.stock === 0;
  const discountPercent = getDiscountPercent(product);

  useEffect(() => {
    if (addedToBasket === false) {
      return undefined;
    }
    const timer = setTimeout(() => setJustAdded(false), 1400);
    return () => clearTimeout(timer);
  }, [addedToBasket]);

  const handleAdd = () => {
    const added = onAddToBasket(product, 1, imageRef.current);
    if (added === true) {
      setJustAdded(true);
    }
  };

  const handleBuy = () => {
    onBuyNow(product, 1);
  };

  const handleFavorite = () => {
    onToggleFavorite(product.id);
  };

  const getAddButtonClass = () => {
    const base =
      'flex cursor-pointer items-center justify-center gap-1.5 rounded-full border py-2.5 text-xs font-bold transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ';
    if (addedToBasket === true) {
      return base + 'border-emerald-600 bg-emerald-600 text-white';
    }
    return base + 'border-zinc-200 bg-zinc-50 text-zinc-900 hover:bg-zinc-200';
  };

  const getHeartClass = () => {
    if (isFavorite === true) {
      return 'flex animate-heart-pop text-red-500';
    }
    return 'flex text-zinc-700';
  };

  const renderLeftBadge = () => {
    if (isSoldOut === true) {
      return (
        <span className="absolute left-3 top-3 rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-bold text-white">
          Sold out
        </span>
      );
    }
    if (discountPercent > 0) {
      return (
        <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-[11px] font-bold text-white">
          -{discountPercent}%
        </span>
      );
    }
    
    return null;
  };

  const renderOldPrice = () => {
    if (product.oldPrice === null) {
      return null;
    }
    return <span className="block text-xs text-zinc-400 line-through">{formatPrice(product.oldPrice)}</span>;
  };

  const renderAddLabel = () => {
    if (addedToBasket === true) {
      return (
        <>
          <KoreanIcon name="check" className="h-4 w-4" />
          Added
        </>
      );
    }
    return 'Add to Basket';
  };

  return (
    <article className={'chijeu-card group flex flex-col overflow-hidden rounded-[1.75rem] p-2 ' + className}>
      <div ref={imageRef} className="relative overflow-hidden rounded-[1.4rem] bg-[#f8f1fb]">
        <Link to={'/product/' + product.id} aria-label={'View details of ' + product.name} className="block aspect-4/5">
          <CheesecakeImage
            src={product.image}
            alt={product.name}
            fit={product.imageFit}
            className="h-full w-full transition duration-500 ease-out group-hover:scale-105"
          />
        </Link>
        {renderLeftBadge()}
        <button
          type="button"
          onClick={handleFavorite}
          aria-pressed={isFavorite}
          aria-label={(isFavorite === true ? 'Remove ' : 'Add ') + product.name + (isFavorite === true ? ' from' : ' to') + ' favorites'}
          className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-110 active:scale-90"
        >
          <span key={isFavorite === true ? 'on' : 'off'} className={getHeartClass()}>
            <KoreanIcon name="heart" filled={isFavorite} className="h-5 w-5" />
          </span>
        </button>
        <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-zinc-700 shadow-sm">
          {product.category}
        </span>
      </div>

      <Link to={'/product/' + product.id} className="mt-4 text-base font-bold text-[#633b68] transition hover:text-[#b55c8a]">
        {product.name}
      </Link>
      <p className="mt-1 line-clamp-2 min-h-8 text-xs leading-relaxed text-slate-500">{product.description}</p>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div className="text-right">
          {renderOldPrice()}
          <span className="text-lg font-extrabold leading-none text-[#633b68]">{formatPrice(product.price)}</span>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
        <button type="button" onClick={handleAdd} disabled={isSoldOut} className={getAddButtonClass()}>
          {renderAddLabel()}
        </button>
        <button
          type="button"
          onClick={handleBuy}
          disabled={isSoldOut}
          className="cursor-pointer rounded-full bg-[#8f7bd8] py-2.5 text-xs font-bold text-white transition hover:bg-[#735fbf] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Buy Now
        </button>
      </div>
    </article>
  );
}

CheesecakeCard.propTypes = {
  product: productPropType.isRequired,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func.isRequired,
  onAddToBasket: PropTypes.func.isRequired,
  onBuyNow: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default CheesecakeCard;
