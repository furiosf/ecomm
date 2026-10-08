import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContentShell from '../components/ContentShell';
import EmptyResults from '../components/EmptyResults';
import BasketItem from '../components/BasketItem';
import PurchaseSummary from '../components/PurchaseSummary';
import { getBasketCount } from '../helpers/basketTools';
import { cartItemPropType } from '../helpers/typeRules';

function Basket({ cart, onIncrease, onDecrease, onRemove, onClear }) {
  const itemCount = getBasketCount(cart);

  if (cart.length === 0) {
    return (
      <ContentShell>
        <div className="rounded-xl border border-[#eadcf2] bg-white px-6 py-8 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7d3c67]">Your picks</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#633b68] md:text-5xl">Basket</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500">A few empty crumbs for now. Add a cheesecake and it will appear here.</p>
        </div>
        <div className="mt-8">
          <EmptyResults
            icon="bag"
            title="Nothing in your basket"
            message="Choose a flavor from the menu and build your order one slice at a time."
            actionLabel="Browse cheesecakes"
            actionTo="/"
          />
        </div>
      </ContentShell>
    );
  }

  return (
    <ContentShell>
      <div className="rounded-xl border border-[#eadcf2] bg-white p-7 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8f7bd8]">Almost dessert time</p>
        <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-[#633b68] md:text-5xl">Your basket</h1>
            <p className="mt-2 text-sm text-slate-500">Review your flavors, adjust the portions, then head to delivery.</p>
          </div>
          <span className="rounded-lg bg-[#fff0f7] px-4 py-2 text-sm font-bold text-[#6b4c8a]">
            {itemCount} {itemCount === 1 ? 'slice' : 'slices'} selected
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <section aria-label="Basket items">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-[#633b68]">Your cheesecake picks</h2>
            <button type="button" onClick={onClear} className="cursor-pointer text-xs font-bold text-slate-400 underline underline-offset-4 hover:text-red-500">
              Empty basket
            </button>
          </div>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id}>
                <BasketItem item={item} onIncrease={onIncrease} onDecrease={onDecrease} onRemove={onRemove} />
              </li>
            ))}
          </ul>
        </section>

        <PurchaseSummary items={cart} title="Order total" sticky>
          <Link
            to="/checkout"
            className="rounded-full bg-[#8f7bd8] py-4 text-center text-sm font-bold text-white transition hover:bg-[#735fbf] active:scale-95"
          >
            Continue to delivery
          </Link>
          <Link
            to="/"
            className="rounded-full border border-[#dfd3e7] bg-white py-4 text-center text-sm font-bold text-[#633b68] transition hover:bg-[#f8f1fb] active:scale-95"
          >
            Add another flavor
          </Link>
        </PurchaseSummary>
      </div>
    </ContentShell>
  );
}

Basket.propTypes = {
  cart: PropTypes.arrayOf(cartItemPropType).isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default Basket;
