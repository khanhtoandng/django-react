import PropTypes from 'prop-types';

const Direction = ({ data }) => (
  <>
    <div className="link-page">
      <p>
        <a href="/manage" className="a-href">Management</a>
        <a href={data} className="link-detail a-href">Update Product</a>
      </p>
    </div>
  </>
);

Direction.default = {
  data: null,
};

Direction.propTypes = {
  data: PropTypes.string,
};

export default Direction;
