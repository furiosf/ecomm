import { useRef } from 'react';
import PropTypes from 'prop-types';
import FlavorHero from '../components/FlavorHero';
import FlavorSearch from '../components/FlavorSearch';
import FlavorCategories from '../components/FlavorCategories';
import CheesecakeCard from '../components/CheesecakeCard';
import ProductPagination from '../components/ProductPagination';
import SweetRecommendations from '../components/SweetRecommendations';
import EmptyResults from '../components/EmptyResults';
import { categories, defaultShopFilters, shopFlavorHeroImage } from '../catalog/cheesecakeCatalog';
import { filtersPropType, productPropType } from '../helpers/typeRules';

const ITEMS_PER_PAGE = 6;

function Menu({ products, favorites, filters, setFilters, onToggleFavorite, onAddToBasket, onBuyNow }) {
  const resultsRef = useRef(null);

  const getFilteredProducts = () => {
    const keyword = filters.search.trim().toLowerCase();

    return products.filter((product) => {
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }


      if (keyword !== '') {
        const searchable = (product.name + ' ' + product.description + ' ' + product.category).toLowerCase();
        if (searchable.includes(keyword) === false) {
          return false;
        }
      }

      return true;
    });
  };

  const getCategoryCounts = () => {
    const counts = { All: products.length };
    categories.forEach((category) => {
      counts[category] = products.filter((product) => product.category === category).length;
    });
    return counts;
  };

  const filteredProducts = getFilteredProducts();
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(filters.page, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const recommendedProducts = products.slice(0, 8);

  const scrollToResults = () => {
    if (resultsRef.current !== null) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSearchChange = (value) => {
    setFilters({ ...filters, search: value, page: 1 });
  };

  const handleCategoryChange = (category) => {
    setFilters({ ...filters, category, page: 1 });
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
    scrollToResults();
  };

  const handleReset = () => {
    setFilters(defaultShopFilters);
  };

  const renderResultsSummary = () => {
    if (filteredProducts.length === 0) {
      return 'No cheesecakes found';
    }
    if (filteredProducts.length === 1) {
      return 'Showing 1 cheesecake';
    }
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length);
    return 'Showing ' + (startIndex + 1) + '-' + endIndex + ' of ' + filteredProducts.length + ' cheesecakes';
  };

  const renderProducts = () => {
    if (filteredProducts.length === 0) {
      return (
        <EmptyResults
          icon="search"
          title="No cheesecakes match your search"
          message="Try another flavor, category, or clear the filters to see every cheesecake."
          actionLabel="Clear filters"
          onAction={handleReset}
        />
      );
    }

    return (
      <>
        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product) => (
            <CheesecakeCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onAddToBasket={onAddToBasket}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
        <ProductPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </>
    );
  };

  return (
    <>
      <FlavorHero image={shopFlavorHeroImage} />

      <div className="w-full bg-[#b9adf3] px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <FlavorSearch value={filters.search} onChange={handleSearchChange} onSubmit={scrollToResults} />
        </div>
      </div>

      <div
        ref={resultsRef}
        className="mx-auto flex max-w-6xl scroll-mt-28 flex-col gap-8 px-4 pt-8 sm:px-6 lg:flex-row lg:gap-10"
      >
        <div className="lg:w-56 lg:shrink-0">
          <FlavorCategories
            categories={categories}
            selectedCategory={filters.category}
            counts={getCategoryCounts()}
            onCategoryChange={handleCategoryChange}
            onReset={handleReset}
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="mb-5 text-sm font-semibold text-zinc-500" aria-live="polite">
            {renderResultsSummary()}
          </p>
          {renderProducts()}
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <SweetRecommendations
          title="Sweet picks for you"
          products={recommendedProducts}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          onAddToBasket={onAddToBasket}
          onBuyNow={onBuyNow}
        />
      </div>

    </>
  );
}

Menu.propTypes = {
  products: PropTypes.arrayOf(productPropType).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  filters: filtersPropType.isRequired,
  setFilters: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onAddToBasket: PropTypes.func.isRequired,
  onBuyNow: PropTypes.func.isRequired,
};

export default Menu;
