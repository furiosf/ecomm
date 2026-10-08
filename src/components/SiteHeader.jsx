import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import KoreanIcon from './KoreanIcon';

const navLinks = [
  { to: '/', label: 'Menu' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/cart', label: 'Basket' },
  { to: '/orders', label: 'Orders' },
];

function FavoriteIcon({ filled = false, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

FavoriteIcon.propTypes = {
  filled: PropTypes.bool,
  className: PropTypes.string,
};

function BasketIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 8h12l1 12H5L6 8z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

BasketIcon.propTypes = {
  className: PropTypes.string,
};

function SiteHeader({ basketCount, favoritesCount, basketPulse = 0 }) {
  const [headerMenuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? 'rounded-full bg-[#ffd9e9] px-4 py-2 text-sm font-bold text-[#7d3c67] transition'
      : 'rounded-full px-4 py-2 text-sm font-semibold text-slate-500 transition hover:bg-[#f3e9ff] hover:text-[#6b4c8a]';

  const mobileLinkClass = ({ isActive }) =>
    isActive
      ? 'block rounded-xl bg-[#ffd9e9] px-4 py-3 text-sm font-bold text-[#7d3c67]'
      : 'block rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-[#f5f0ff]';

  const badgeClass = (count) =>
    'absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-bold ' +
    (count > 0
      ? 'bg-[#8f7bd8] text-white'
      : 'bg-[#e9e3f7] text-[#6b5d82]');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#eee4f3] bg-white/95 shadow-[0_6px_24px_rgba(144,108,174,0.10)] backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">

        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between gap-4"
        >

          <Link
            to="/"
            className="flex items-center gap-3 text-lg font-black tracking-tight text-[#633b68]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ffd9e9] text-[#633b68] shadow-sm">
              <KoreanIcon name="cake" className="h-5 w-5" />
            </span>

            Chijeu Keikeu
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={linkClass}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">

            <NavLink
              to="/favorites"
              aria-label={`Favorites, ${favoritesCount} items`}
              className={({ isActive }) =>
                'relative flex h-10 w-10 items-center justify-center rounded-full transition ' +
                (isActive
                  ? 'bg-[#ffe1ee] text-[#d05c92]'
                  : 'bg-[#f5f0ff] text-[#6b5d82] hover:bg-[#ece2ff]')
              }
            >
              <FavoriteIcon
                filled={favoritesCount > 0}
                className="h-[21px] w-[21px]"
              />

              <span className={badgeClass(favoritesCount)}>
                {favoritesCount}
              </span>
            </NavLink>

            <Link
              to="/cart"
              id="nav-cart"
              aria-label={`Shopping basket, ${basketCount} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#e3f4ff] text-[#5c82a5] transition hover:bg-[#ccecff]"
            >
              <span
                key={basketPulse}
                className={
                  'flex ' +
                  (basketPulse > 0 ? 'animate-cart-bump' : '')
                }
              >
                <BasketIcon className="h-[21px] w-[21px]" />
              </span>

              <span className={badgeClass(basketCount)}>
                {basketCount}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(!headerMenuOpen)}
              aria-label={
                headerMenuOpen ? 'Close menu' : 'Open menu'
              }
              aria-expanded={headerMenuOpen}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#fff0f7] text-[#7d3c67] transition hover:bg-[#ffe1ee] md:hidden"
            >
              <KoreanIcon
                name={headerMenuOpen ? 'close' : 'menu'}
                className="h-5 w-5"
              />
            </button>
          </div>
        </nav>

        {headerMenuOpen && (
          <ul className="mt-3 space-y-1 border-t border-[#f0e4f5] pt-3 md:hidden">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={mobileLinkClass}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}

SiteHeader.propTypes = {
  basketCount: PropTypes.number.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  basketPulse: PropTypes.number,
};

export default SiteHeader;