import PropTypes from 'prop-types';
import KoreanIcon from './KoreanIcon';

function FlavorCategories({
  categories,
  selectedCategory,
  counts,
  onCategoryChange,
  onReset,
}) {
  const allCategories = ['All', ...categories];

  const getIcon = (category) => {
    switch (category) {
      case 'Fruit-Based':
        return 'strawberry';
      case 'Rich & Indulgent':
        return 'chocolate';
      case 'Biscuit-Based':
        return 'cookie';
      case 'Signature Specials':
        return 'crown';
      default:
        return 'cake';
    }
  };

  return (
    <aside className="w-full">
      <div className="mb-6">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#8e6fb2]">
          Categories
        </p>

        <h2 className="text-xl font-bold text-zinc-800">
          Find your flavor
        </h2>
      </div>

      <div className="border-t border-zinc-200">
        {allCategories.map((category) => {
          const active = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={[
                'group flex w-full items-center gap-3 border-b border-zinc-200 py-4 text-left transition',
                active
                  ? 'text-[#8e6fb2]'
                  : 'text-zinc-600 hover:text-[#8e6fb2]',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition',
                  active
                    ? 'bg-[#eee9ff]'
                    : 'bg-zinc-100 group-hover:bg-[#f3efff]',
                ].join(' ')}
              >
                <KoreanIcon
                  name={getIcon(category)}
                  className="h-4 w-4"
                />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">
                  {category}
                </span>

                <span className="mt-0.5 block text-xs text-zinc-400">
                  {counts[category] || 0}{' '}
                  {counts[category] === 1 ? 'flavor' : 'flavors'}
                </span>
              </span>

              <span
                className={[
                  'h-1.5 w-1.5 rounded-full transition',
                  active
                    ? 'bg-[#8e6fb2]'
                    : 'bg-transparent group-hover:bg-[#d9cff8]',
                ].join(' ')}
              />
            </button>
          );
        })}
      </div>

      {selectedCategory !== 'All' && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 text-xs font-semibold text-zinc-400 underline underline-offset-4 transition hover:text-[#8e6fb2]"
        >
          Show all cheesecakes
        </button>
      )}
    </aside>
  );
}

FlavorCategories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  counts: PropTypes.objectOf(PropTypes.number).isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default FlavorCategories;