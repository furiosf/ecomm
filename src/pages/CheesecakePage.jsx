import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContentShell from '../components/ContentShell';
import EmptyResults from '../components/EmptyResults';
import CheesecakeDetails from '../components/CheesecakeDetails';
import SweetRecommendations from '../components/SweetRecommendations';
import { cartItemPropType, productPropType } from '../helpers/typeRules';

function CheesecakePage({ products, cart, favorites, onToggleFavorite, onAddToBasket, onBuyNow }) {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  if (product === undefined) {
    return (
      <ContentShell>
        <EmptyResults
          icon="box"
          title="Product not found"
          message="The product you are looking for does not exist or has been removed."
          actionLabel="Back to shop"
          actionTo="/"
        />
      </ContentShell>
    );
  }

  const cartItem = cart.find((item) => item.id === product.id);
  const cartQuantity = cartItem === undefined ? 0 : cartItem.quantity;
  const relatedProducts = products.filter((item) => item.category === product.category && item.id !== product.id);

  const renderRelated = () => {
    if (relatedProducts.length === 0) {
      return null;
    }
    return (
      <div className="mt-24">
        <SweetRecommendations
          title={'More from ' + product.category}
          products={relatedProducts}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          onAddToBasket={onAddToBasket}
          onBuyNow={onBuyNow}
        />
      </div>
    );
  };

  return (
    <ContentShell>
      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
        <Link to="/" className="transition hover:text-zinc-950">
          Menu
        </Link>
        <span aria-hidden="true">/</span>
        <span>{product.category}</span>
        <span aria-hidden="true">/</span>
        <span className="font-semibold text-zinc-950">{product.name}</span>
      </nav>

      <CheesecakeDetails
        key={product.id}
        product={product}
        isFavorite={favorites.includes(product.id)}
        cartQuantity={cartQuantity}
        onToggleFavorite={onToggleFavorite}
        onAddToBasket={onAddToBasket}
        onBuyNow={onBuyNow}
      />

      {renderRelated()}
    </ContentShell>
  );
}

CheesecakePage.propTypes = {
  products: PropTypes.arrayOf(productPropType).isRequired,
  cart: PropTypes.arrayOf(cartItemPropType).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onAddToBasket: PropTypes.func.isRequired,
  onBuyNow: PropTypes.func.isRequired,
};

export default CheesecakePage;
