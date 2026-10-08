import PropTypes from 'prop-types';
import KoreanIcon from './KoreanIcon';

function FlavorSearch({ value, onChange, onSubmit, placeholder = 'Search cheesecakes' }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="mx-auto flex w-full items-center gap-2 rounded-full border border-[#eadff2] bg-white py-2 pl-5 pr-2 shadow-[0_8px_25px_rgba(144,108,174,0.12)] transition focus-within:ring-2 focus-within:ring-[#8f7bd8]"
    >
      <KoreanIcon name="search" className="h-4 w-4 shrink-0 text-zinc-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products by name, description or category"
        className="min-w-0 flex-1 bg-transparent text-sm outline-hidden placeholder:text-zinc-400"
      />
      <button
        type="submit"
        className="cursor-pointer rounded-full bg-[#8f7bd8] px-5 py-2 text-xs font-bold text-white transition hover:bg-[#735fbf] active:scale-95"
      >
        Search
      </button>
    </form>
  );
}

FlavorSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default FlavorSearch;
