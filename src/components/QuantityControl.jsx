import PropTypes from 'prop-types';
import KoreanIcon from './KoreanIcon';

function QuantityControl({ quantity, min = 1, max, onIncrease, onDecrease, label = 'item' }) {
  const buttonClass =
    'flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#633b68] transition hover:bg-[#f3e9ff] active:scale-90 disabled:cursor-not-allowed disabled:text-zinc-300 disabled:hover:bg-transparent';

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[#eadcf2] bg-[#fffafd] p-1 shadow-sm">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label={'Decrease quantity of ' + label}
        className={buttonClass}
      >
        <KoreanIcon name="minus" className="h-4 w-4" />
      </button>
      <span className="w-8 text-center text-sm font-extrabold tabular-nums text-[#633b68]" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        aria-label={'Increase quantity of ' + label}
        className={buttonClass}
      >
        <KoreanIcon name="plus" className="h-4 w-4" />
      </button>
    </div>
  );
}

QuantityControl.propTypes = {
  quantity: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default QuantityControl;
