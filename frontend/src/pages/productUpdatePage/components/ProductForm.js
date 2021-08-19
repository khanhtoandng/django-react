import PropTypes from 'prop-types';
import {
  Form, Button,
} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import GetProductType from '../../../constant/productType';
import productApi from '../../../api/productApi';
import imageSlideApi from '../../../api/imageSlideApi';

const ProductForm = ({ data, id, image }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [validated, setValidated] = useState(false);
  // const [state, setState] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (data) {
      GetProductType.map((type) => {
        if (type.index === data.productType) {
          setCategoryList(type.category);
        }
        return type;
      });
    }

    setName(data.name);
    setCategory(data.sub_category);
    setPrice(data.price);
    setDescription(data.description);
  }, [data]);

  function handleCreateImageForm() {
    const promises = Object.keys(image).map((key) => {
      if (image[key].product !== 0 && image[key].changed === 1) {
        if (image[key].id === 0) {
          const formdata = new FormData();
          formdata.append('image', image[key].raw);
          formdata.append('product', id);
          formdata.append('ordinal_number', image[key].ordinal_number);
          return imageSlideApi.post(formdata);
        }

        if (image[key].id !== 0) {
          if (image[key].deleted === 1) {
            return imageSlideApi.delete(image[key].id);
          }
          const formdata = new FormData();
          formdata.append('image', image[key].image);
          formdata.append('product', id);
          formdata.append('ordinal_number', image[key].ordinal_number);
          return imageSlideApi.put(image[key].id, formdata);
        }
      }
      return null;
    });

    Promise.all(promises);
  }

  function handleCreateProductForm() {
    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('description', description);
    formdata.append('price', price);
    formdata.append('sub_category', category);
    productApi.put(id, formdata)
      .then(() => history.push('/manage', { isEdit: true }));
    handleCreateImageForm();
  }

  function handleSubmit(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (form.checkValidity() === true) {
      e.preventDefault();
      handleCreateProductForm();
    }
    setValidated(true);
  }

  function handleChangeOption(e) {
    setCategoryList(GetProductType[e.target.value - 1]?.category);
  }

  return (
    <div className="container">

      <div className="form-wrapper">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="Name">
            <Form.Label>Name*</Form.Label>
            <Form.Control
              required
              type="text"
              defaultValue={data.name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product name"
            />
            <Form.Control.Feedback>Valid!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide a product name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Name">
            <Form.Label>Code</Form.Label>
            <Form.Control
              type="text"
              value={data.code}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ProductType">
            <Form.Label> Product Type*</Form.Label>
            <select
              className="form-control"
              value={data.productType}
              onChange={handleChangeOption}
              required
            >
              {
                GetProductType.map((item) => (
                  <option value={item.index} key={item.index}>
                    {item.name}
                  </option>
                ))
                }
            </select>
            <Form.Control.Feedback>Valid!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please choose a product type.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Category">
            <Form.Label>Category*</Form.Label>
            <select
              className="form-control"
              required
              value={data.sub_category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {
                  categoryList?.map((item) => (
                    <option value={item.index} key={item.index}>
                      {item.name}
                    </option>
                  ))
                }
            </select>
            <Form.Control.Feedback>Valid!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please choose a category.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Price">
            <Form.Label>Price*</Form.Label>
            <Form.Control
              required
              type="number"
              defaultValue={data.price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
            />
            <Form.Control.Feedback>Valid!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide a product price.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              defaultValue={data.description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product description"
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Image</Form.Label>
            <img
              src={`http://192.168.1.16:8000${data.image}`}
              alt=""
              className="main-img img-thumbnail rounded "
              style={{ marginLeft: '50px' }}
            />
          </Form.Group>
          <Button type="submit">Update</Button>
        </Form>
      </div>
    </div>

  );
};

ProductForm.propTypes = {
  data: PropTypes.object,
  id: PropTypes.string,
  image: PropTypes.object,
};

ProductForm.default = {
  data: {},
};

export default ProductForm;
