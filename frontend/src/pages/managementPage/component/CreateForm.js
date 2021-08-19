import {
  Form, Button,
} from 'react-bootstrap';
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import GetProductType from '../../../constant/productType';
import productApi from '../../../api/productApi';

import ErrorComponent from '../../../component/ErrorComponent';

const FormComponent = (props) => {
  const { onChangeStatus, onShowToast } = props;
  const [categoryList, setCategoryList] = useState([]);
  const [validated, setValidated] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [name, setName] = useState('');
  const [subCategory, setSubCategory] = useState();
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState({
    preview: '',
    raw: '',
  });
  const formRef = useRef(null);

  const handleReset = () => {
    formRef.current.reset();
    setName('');
    setPrice('');
    setDescription('');
    setCategoryList([]);
    setImage({
      preview: '',
      raw: '',
    });
    setValidated(false);
  };

  async function handleCreateProduct() {
    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('description', description);
    formdata.append('price', price);
    formdata.append('sub_category', subCategory);
    formdata.append('image', image.raw);
    try {
      productApi.post(formdata)
        .then(() => {
          onChangeStatus(Math.random());
          onShowToast('Created', 'success');
          handleReset();
        });
    } catch (error) {
      onShowToast('Created', 'error');
      setHasError(true);
    }
  }

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (form.checkValidity() === true) {
      e.preventDefault();
      setValidated(true);
      handleCreateProduct();
    }
  };

  function handleChangeOption(e) {
    setCategoryList(GetProductType[e.target.value - 1]?.category);
  }

  return (
    <div>
      {!hasError && (
      <div className="form-wrapper">
        <Form ref={formRef} validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="Name">
            <Form.Label>Name*</Form.Label>
            <Form.Control
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product name"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a product name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="ProductType">
            <Form.Label> Product Type*</Form.Label>

            <select className="form-control  " onChange={handleChangeOption} required>
              <option value="">Please choose an option</option>
              {
              GetProductType.map((productType) => (
                <option value={productType.index} key={productType.index} required>
                  {productType.name}
                </option>
              ))
            }
            </select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="Category">
            <Form.Label>Category*</Form.Label>
            <select className="form-control" required onChange={(e) => setSubCategory(e.target.value)}>

              {
                  categoryList?.map((category) => (
                    <option value={category.index} key={category.index}>
                      {category.name}
                    </option>
                  ))
                }
            </select>
            <Form.Control.Feedback type="invalid">
              Please choose a category.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="Price">
            <Form.Label>Price*</Form.Label>
            <Form.Control
              required
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
            />

            <Form.Control.Feedback type="invalid">
              Please provide a product price.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="Description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product description"
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Image*</Form.Label>
            <Form.Control
              type="file"
              required
              name="file"
              onChange={(e) => setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0],
              })}
            />
            <div style={{ marginLeft: '20px' }}>
              {
              image.preview ? <img src={image.preview} alt="" width="300" height="300" /> : null
            }
            </div>
            <Form.Control.Feedback type="invalid">
              Please choose a product image.
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" onClick={() => { setValidated(true); }}>Create</Button>
        </Form>
      </div>
      )}

      {hasError && <ErrorComponent>/</ErrorComponent>}
    </div>
  );
};

FormComponent.propTypes = {
  onChangeStatus: PropTypes.func,
  onShowToast: PropTypes.func,

};
export default FormComponent;
