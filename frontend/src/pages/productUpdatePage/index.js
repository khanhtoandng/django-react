import React, { useState, useEffect } from 'react';
import './style.css';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import productApi from '../../api/productApi';

import ProductForm from './components/ProductForm';
import Direction from './components/Direction';
import ImageSlide from './components/ImageSlide';
import ImageModal from './components/ImageModal';
import ErrorComponent from '../../component/ErrorComponent';
import GetCategoryByID from '../../constant/category';

const ProductUpdatePage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [hasError, setHasError] = useState(false);

  const [img, setImg] = useState({
    1: {
      image: 'https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png',
      id: 0,
      product: 0,
      ordinal_number: 1,
    },
    2: {
      image: 'https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png',
      id: 0,
      product: 0,
      ordinal_number: 2,
    },
    3: {
      image: 'https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png',
      id: 0,
      product: 0,
      ordinal_number: 3,
    },
    4: {
      image: 'https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png',
      id: 0,
      product: 0,
      ordinal_number: 4,
    },
  });
  const [show, setShow] = useState(false);
  const [imageModal, setImageModal] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const results = await productApi.get(id);
        results.productType = GetCategoryByID(results.sub_category).ProductIndex;
        setProduct(results);
      } catch {
        setHasError(true);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchImageSlide = async () => {
      try {
        const results = await productApi.getImageSlide(id);

        if (results.length > 0) {
          const imageSlide = {};
          const numberArray = [];

          for (let i = 0; i < results.length; i += 1) {
            const number = results[i].ordinal_number;
            imageSlide[number] = results[i];
            imageSlide[number] = { ...imageSlide[number], changed: 0, deleted: 0 };
            numberArray.push(number);
          }

          for (let i = 1; i <= 4; i += 1) {
            if (!numberArray.includes(i)) {
              imageSlide[i] = {
                id: 0,
                image: 'https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png',
                product: 0,
                ordinal_number: i,
                changed: 0,
                deleted: 0,
              };
            }
          }

          setImg(imageSlide);
        }
      } catch {
        setHasError(true);
      }
    };

    fetchImageSlide();
  }, []);

  function handleImageRemove(data) {
    setImg({
      ...img,
      [data.ordinal_number]: {
        id: data.id,
        image: 'https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png',
        product: Number(id),
        ordinal_number: data.ordinal_number,
        changed: 1,
        deleted: 1,
      },

    });
  }

  function handleImageChange(e, data) {
    if (e.target.files[0]) {
      setImg({
        ...img,
        [data.ordinal_number]: {
          id: data.id,
          image: URL.createObjectURL(e.target.files[0]),
          product: Number(id),
          ordinal_number: data.ordinal_number,
          raw: e.target.files[0],
          changed: 1,
          deleted: 0,
        },
      });
    }
  }

  function handleModalClose() {
    setShow(false);
  }

  function handleModalShow(image) {
    setImageModal(image);
    setShow(true);
  }

  return (
    <>
      {!hasError && (
      <>
        <Row style={{ margin: '0' }}>
          <Col sm={4}>
            <Direction data={`/update/${id}`} />
            <ProductForm
              data={product}
              id={id}
              image={img}
            />
          </Col>
          <Col sm={8}>
            <ImageSlide
              img={img}
              handleOnChange={handleImageChange}
              handleOnRemove={handleImageRemove}
              handleModalShow={handleModalShow}
            />
          </Col>
        </Row>

        <ImageModal
          show={show}
          handleClose={handleModalClose}
          image={imageModal}
        />
      </>
      )}

      {hasError && <ErrorComponent />}
    </>
  );
};

export default ProductUpdatePage;
