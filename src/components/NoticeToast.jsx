import PropTypes from 'prop-types';

function NoticeToast({ notice = null }) {
  const renderMessage = () => {
    if (notice === null) {
      return null;
    }
    return (
      <p
        key={notice.id}
        className="animate-fade-up rounded-full bg-[#8f7bd8] px-5 py-3 text-sm font-semibold text-white shadow-2xl"
      >
        {notice.message}
      </p>
    );
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-90 flex justify-center px-4"
    >
      {renderMessage()}
    </div>
  );
}

NoticeToast.propTypes = {
  notice: PropTypes.shape({
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
  }),
};

export default NoticeToast;
