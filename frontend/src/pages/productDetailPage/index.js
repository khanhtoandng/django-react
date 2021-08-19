import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import './style.css';
import { Carousel } from 'react-bootstrap';
import productApi from '../../api/productApi';
import ErrorComponent from '../../component/ErrorComponent';
import GetCategoryByID from '../../constant/category';
import GetProductType from '../../constant/productType';

const ProductDetailPage = () => {
  const [product, setProduct] = useState({});
  const [imageSlide, setImageSlide] = useState([]);
  const [hasError, setHasError] = useState(false);
  const { id } = useParams();

  const handleSlideSort = (a, b) => {
    if (a.ordinal_number < b.ordinal_number) {
      return -1;
    }
    if (a.ordinal_number > b.ordinal_number) {
      return 1;
    }
    return 0;
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.get(id);
        const category = GetCategoryByID(response.sub_category);
        response.sub_category = category.name;
        response.product_type = GetProductType[category.ProductIndex].name;
        response.price = formatter.format(response.price);
        setProduct(response);
      } catch (error) {
        setHasError(true);
      }
    };

    const fetchImageSlide = async () => {
      try {
        const results = await productApi.getImageSlide(id);
        results.sort(handleSlideSort);
        setImageSlide(results);
      } catch (error) {
        setHasError(true);
      }
    };

    fetchProduct();
    fetchImageSlide();
  }, []);

  return (
    <>
      {!hasError && (
      <>
        <div id="col-1">
          <Direction data={`/product/${id}`} />
          <ProductDetail data={product} />
        </div>
        <div id="col-2">
          <div className="product-carousel">
            <Carousel>
              {
              imageSlide.map((image) => (
                <Carousel.Item>
                  <ProductCarousel data={image} />
                </Carousel.Item>
              ))
              }
            </Carousel>
          </div>
        </div>
      </>
      )}

      {hasError && <ErrorComponent />}

    </>
  );
};

const Direction = ({ data }) => (
  <>
    <div className="link-page">
      <p>
        <a href="/products" className="a-href">Product</a>
        <a href={data} className="link-detail a-href">Detail</a>
      </p>
    </div>
  </>
);

const ProductDetail = ({ data }) => (
  <>
    <div className="product-content">
      <h2 className="product-title">{data.name}</h2>
      <div className="product-detail">
        <table style={{ width: '50%' }}>
          <tr>
            <th>Code:</th>
            <td>{data.code}</td>
          </tr>
          <tr>
            <th>Product Type:</th>
            <td>{data.product_type}</td>
          </tr>
          <tr>
            <th>Category:</th>
            <td>{data.sub_category}</td>
          </tr>
          <tr>
            <th>Price:</th>
            <td>{data.price}</td>
          </tr>
        </table>
      </div>
      <div className="product-description">
        <h6
          style={{
            color: 'black',
            fontWeight: 'lighter',
          }}
        >About the item:
        </h6>
        <p style={{ marginTop: '10px', marginLeft: '10px', fontSize: '17px' }}>{data.description}</p>
      </div>
    </div>
  </>
);

const ProductCarousel = ({ data }) => (
  <img
    className="d-block"
    src={data.image}
    alt={data.id}
  />
);

ProductDetail.default = {
  data: {},
};

ProductDetail.propTypes = {
  data: PropTypes.object,
};

ProductCarousel.propTypes = {
  data: PropTypes.object,
};

ProductCarousel.default = {
  data: {},
};

Direction.default = {
  data: null,
};

Direction.propTypes = {
  data: PropTypes.string,
};
export default ProductDetailPage;
