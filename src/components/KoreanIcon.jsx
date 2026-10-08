import PropTypes from 'prop-types';

const iconPaths = {
  cake: (<>
    <path d="M5 10h14v9H5z" />
    <path d="M7 10c0-2 2-3 5-3s5 1 5 3M9 4v3M12 3v4M15 4v3" />
    <path d="M5 14h14" />
  </>),
  logo: <path d="M16.5 8.2C16 6.8 14.3 6 12 6c-2.6 0-4.5 1.2-4.5 3 0 4 9 1.8 9 6 0 1.8-1.9 3-4.5 3-2.3 0-4.1-.9-4.6-2.4" strokeWidth="2.2" />,
  heart: <path d="M20.5 8.8c0 5.2-8.5 10-8.5 10s-8.5-4.8-8.5-10A4.5 4.5 0 0 1 12 6.3a4.5 4.5 0 0 1 8.5 2.5z" />,
  shirt: <path d="M8.5 4 3 7l2 4.2 2-.9V20h10V10.3l2 .9L21 7l-5.5-3c-.5 1.5-1.8 2.3-3.5 2.3S9 5.5 8.5 4z" />,
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx=".6" />
      <path d="M9.5 3v3M14.5 3v3M9.5 18v3M14.5 18v3M3 9.5h3M3 14.5h3M18 9.5h3M18 14.5h3" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8.5 5-14 15-14 0 10-5.5 15-14 15" />
      <path d="M5 19c2-5 5-8 9-10" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  cart: (
    <>
      <path d="M6 8h12l1 12H5L6 8z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  bag: (
    <>
      <path d="M6 7h12l1 13H5z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </>
  ),
  star: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  trash: <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 3 3 5-6" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m21 16-5-5-8 8" />
    </>
  ),
  sparkle: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />,
  strawberry: (
    <>
      <path d="M12 8c-4.1 0-6.5 2.4-6.5 5.7 0 3.6 2.7 6.3 6.5 6.3s6.5-2.7 6.5-6.3C18.5 10.4 16.1 8 12 8z" />
      <path d="M9 7c.8-2 2.1-3 3-3s2.2 1 3 3M8.2 6.5c1.1.3 2.1.2 3-.2M15.8 6.5c-1.1.3-2.1.2-3-.2" />
      <path d="M9.5 11.5v.1M13 13v.1M15.5 11.5v.1M11 16v.1" />
    </>
  ),
  chocolate: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M10 5v5h5V5M4 12h6v5M15 10v5h5" />
    </>
  ),
  cookie: (
    <>
      <path d="M19.5 13.2A7.5 7.5 0 1 1 10.8 4.5a3.6 3.6 0 0 0 8.7 8.7z" />
      <circle cx="9" cy="9" r=".7" fill="currentColor" stroke="none" />
      <circle cx="7.5" cy="13.5" r=".7" fill="currentColor" stroke="none" />
      <circle cx="12" cy="16" r=".7" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="11.5" r=".7" fill="currentColor" stroke="none" />
    </>
  ),
  crown: (
    <>
      <path d="m4 7 3 3 5-6 5 6 3-3-1.5 12h-13z" />
      <path d="M5 16h14" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0z" />
      <path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 20h6M10 17h4" />
    </>
  ),
  percent: (
    <>
      <path d="M19 5 5 19" />
      <circle cx="7" cy="7" r="2.2" />
      <circle cx="17" cy="17" r="2.2" />
    </>
  ),
  box: (
    <>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z" />
      <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
    </>
  ),
  x: <path d="M5 4l14 16M19 4 5 20" />,
  facebook: <path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V20H14v-5.5h2.5L17 11h-3V9c0-.3.2-.5.5-.5z" />,
  linkedin: <path d="M6.5 10v8M6.5 6.6v.1M10.5 18v-8M10.5 13.2a3 3 0 0 1 6 0V18" />,
  tiktok: (
    <>
      <path d="M14 4v10.2a3.8 3.8 0 1 1-3-3.7" />
      <path d="M14 4c.6 2.3 2 3.7 4.5 4.2" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17" cy="7" r=".6" />
    </>
  ),
};

function KoreanIcon({ name, className = 'h-5 w-5', filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled === true ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {iconPaths[name]}
    </svg>
  );
}

KoreanIcon.propTypes = {
  name: PropTypes.oneOf(Object.keys(iconPaths)).isRequired,
  className: PropTypes.string,
  filled: PropTypes.bool,
};

export default KoreanIcon;
