import PropTypes from 'prop-types';

const ProductComponent = ({ productList }) => (
  <>
    <div className="container d-flex justify-content-center align-item-center h-100">
      <div className="row">
        {
          productList.map(((data) => (
            <div key={data.id}>
              <ProductCard data={data} />
            </div>
          )))
        }
      </div>
    </div>

  </>
);

const ProductCard = ({ data }) => (
  <div className="card text-center">
    <div className="overflow">
      <img className="card-img-top overflow card-img" src={data.image} alt="Card top" />
    </div>
    <div className="card-body">
      <h6 className="card-name">{data.name}</h6>
      <a href={`/product/${data.id}`} className="card-price stretched-link">{data.price}$</a>
    </div>
  </div>
);

ProductCard.default = {
  data: {},
};

ProductCard.propTypes = {
  data: PropTypes.object.isRequired,
};

ProductComponent.default = {
  productList: [],
};

ProductComponent.propTypes = {
  productList: PropTypes.array,
};

export default ProductComponent;
