import PropTypes from 'prop-types';

function ContentShell({ children, className = '' }) {
  return <div className={'mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 ' + className}>{children}</div>;
}

ContentShell.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default ContentShell;
