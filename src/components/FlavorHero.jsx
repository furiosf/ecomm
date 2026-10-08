import PropTypes from 'prop-types';

function FlavorHero({ image }) {
  return (
    <section className="relative h-64 overflow-hidden sm:h-80 md:h-96">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("' + image + '")' }}
      />
    </section>
  );
}

FlavorHero.propTypes = {
  image: PropTypes.string.isRequired,
};

export default FlavorHero;