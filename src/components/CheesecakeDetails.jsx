import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import KoreanIcon from './KoreanIcon';
import CheesecakeImage from './CheesecakeImage';
import QuantityControl from './QuantityControl';
import { formatPrice, getDiscountPercent } from '../helpers/displayTools';
import { productPropType } from '../helpers/typeRules';

function CheesecakeDetails({ product, isFavorite = false, cartQuantity = 0, onToggleFavorite, onAddToBasket, onBuyNow }) {
  const imageRef = useRef(null);
  const [sliceQuantity, setSliceQuantity] = useState(1);
  const availableToAdd = Math.max(0, product.stock - cartQuantity);
  const isSoldOut = product.stock === 0;
  const cannotAddMore = availableToAdd === 0;
  const discountPercent = getDiscountPercent(product);

  const handleIncrease = () => {
    if (sliceQuantity < availableToAdd) {
      setSliceQuantity(sliceQuantity + 1);
    }
  };

  const handleDecrease = () => {
    if (sliceQuantity > 1) {
      setSliceQuantity(sliceQuantity - 1);
    }
  };

  const handleAdd = () => {
    onAddToBasket(product, sliceQuantity, imageRef.current);
  };

  const handleBuy = () => {
    onBuyNow(product, sliceQuantity);
  };

  const getHeartClass = () => {
    if (isFavorite === true) {
      return 'flex animate-heart-pop text-red-500';
    }
    return 'flex text-zinc-700';
  };

  const renderPrice = () => {
    if (product.oldPrice === null) {
      return <span className="text-4xl font-extrabold text-zinc-950">{formatPrice(product.price)}</span>;
    }
    return (
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="text-4xl font-extrabold text-zinc-950">{formatPrice(product.price)}</span>
        <span className="text-lg text-zinc-400 line-through">{formatPrice(product.oldPrice)}</span>
        <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">Save {discountPercent}%</span>
      </div>
    );
  };

  const renderStock = () => {
    if (isSoldOut === true) {
      return (
        <p className="flex items-center gap-2 text-sm font-bold text-red-600">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          Out of stock
        </p>
      );
    }
    if (availableToAdd <= 5) {
      return (
        <p className="flex items-center gap-2 text-sm font-bold text-amber-600">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          Only {availableToAdd} available to add
        </p>
      );
    }
    return (
      <p className="flex items-center gap-2 text-sm font-bold text-emerald-600">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        In stock, {availableToAdd} available to add
      </p>
    );
  };

  const renderBasketNote = () => {
    if (cartQuantity === 0) {
      return null;
    }
    return <p className="text-xs font-semibold text-zinc-500">{cartQuantity} {cartQuantity === 1 ? 'slice is' : 'slices are'} already in your basket</p>;
  };

  const renderActions = () => {
    if (isSoldOut === true || cannotAddMore === true) {
      return (
        <p className="rounded-2xl bg-zinc-100 px-5 py-4 text-sm font-semibold text-zinc-500">
          {isSoldOut === true ? 'This cheesecake is currently sold out.' : 'You already have all available stock in your basket.'}
        </p>
      );
    }
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <QuantityControl
            quantity={sliceQuantity}
            max={availableToAdd}
            label={product.name}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
          {renderBasketNote()}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleAdd}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 py-4 text-sm font-bold text-zinc-950 transition hover:bg-zinc-200 active:scale-95"
          >
            <KoreanIcon name="cart" className="h-5 w-5" />
            Add to Basket
          </button>
          <button
            type="button"
            onClick={handleBuy}
            className="cursor-pointer rounded-full bg-[#8f7bd8] py-4 text-sm font-bold text-white transition hover:bg-[#735fbf] active:scale-95"
          >
            Buy Now
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div ref={imageRef} className="relative aspect-4/5 overflow-hidden rounded-3xl bg-zinc-100">
        <CheesecakeImage src={product.image} alt={product.name} fit={product.imageFit} className="h-full w-full" />
        <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm">
          {product.category}
        </span>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 md:text-4xl">{product.name}</h1>
          </div>
          <button
            type="button"
            onClick={() => onToggleFavorite(product.id)}
            aria-pressed={isFavorite}
            aria-label={(isFavorite === true ? 'Remove from' : 'Add to') + ' favorites'}
            className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-zinc-200 bg-white transition hover:scale-110 hover:bg-zinc-50 active:scale-90"
          >
            <span key={isFavorite === true ? 'on' : 'off'} className={getHeartClass()}>
              <KoreanIcon name="heart" filled={isFavorite} className="h-6 w-6" />
            </span>
          </button>
        </div>

        {renderPrice()}

        <p className="leading-relaxed text-zinc-600">{product.details}</p>

        <ul className="space-y-3">
          {product.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3 text-sm text-zinc-700">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8f7bd8] text-white">
                <KoreanIcon name="check" className="h-3 w-3" />
              </span>
              {highlight}
            </li>
          ))}
        </ul>

        {renderStock()}
        {renderActions()}
      </div>
    </div>
  );
}

CheesecakeDetails.propTypes = {
  product: productPropType.isRequired,
  isFavorite: PropTypes.bool,
  cartQuantity: PropTypes.number,
  onToggleFavorite: PropTypes.func.isRequired,
  onAddToBasket: PropTypes.func.isRequired,
  onBuyNow: PropTypes.func.isRequired,
};

export default CheesecakeDetails;
