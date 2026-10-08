import PropTypes from 'prop-types';
import ContentShell from '../components/ContentShell';
import EmptyResults from '../components/EmptyResults';
import SavedItem from '../components/SavedItem';
import { productPropType } from '../helpers/typeRules';

function SavedCheesecakes({ products, favorites, onToggleFavorite, onAddToBasket }) {
  const favoriteProducts = [...favorites]
    .reverse()
    .map((productId) => products.find((product) => product.id === productId))
    .filter((product) => product !== undefined);

  if (favoriteProducts.length === 0) {
    return (
      <ContentShell>
        <div className="rounded-xl border border-[#eadcf2] bg-white px-6 py-8 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8f7bd8]">Saved treats</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#633b68] md:text-5xl">Your sweet list is empty</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
            Keep the cheesecakes you are curious about here. Tap the heart on a flavor to save it for later.
          </p>
        </div>
        <div className="mt-8">
          <EmptyResults
            icon="heart"
            title="Nothing saved yet"
            message="Browse the menu and save a few favorites so they are easy to find next time."
            actionLabel="Explore the menu"
            actionTo="/"
          />
        </div>
      </ContentShell>
    );
  }

  return (
    <ContentShell>
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-[#eadcf2] bg-white p-7 sm:p-8 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8f7bd8]">Saved treats</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#633b68] md:text-5xl">Favorites</h1>
          <p className="mt-3 text-sm text-slate-500">Your personal shortlist of cheesecakes worth coming back for.</p>
        </div>
        <div className="rounded-lg bg-[#fff0f7] px-4 py-2.5 text-sm font-bold text-[#7d3c67]">
          {favoriteProducts.length} {favoriteProducts.length === 1 ? 'saved flavor' : 'saved flavors'}
        </div>
      </div>

      <ul className="mt-6 grid gap-4 lg:grid-cols-2">
        {favoriteProducts.map((product) => (
          <li key={product.id}>
            <SavedItem product={product} onAddToBasket={onAddToBasket} onRemove={onToggleFavorite} />
          </li>
        ))}
      </ul>
    </ContentShell>
  );
}

SavedCheesecakes.propTypes = {
  products: PropTypes.arrayOf(productPropType).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onAddToBasket: PropTypes.func.isRequired,
};

export default SavedCheesecakes;
