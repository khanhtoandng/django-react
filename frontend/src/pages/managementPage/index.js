import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import productApi from '../../api/productApi';
import ModalComponent from './component/Modal';
import ProductTable from './component/Table';
import FormComponent from './component/CreateForm';

import GetCategoryByID from '../../constant/category';

const ManagePage = () => {
  const [productList, setProductList] = useState([]);

  const [status, setStatus] = useState(false);
  const location = useLocation();
  const isEdit = location.state ? location.state.isEdit : false;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [ID, setID] = useState();

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    page: 1,
    page_size: 6,
  });

  // Toast
  const style = {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  };

  function handleToastShow(msg, code) {
    switch (code) {
      case 'error':
        return toast.error(`${msg} UnSuccessfull!`, style);
      case 'success':
        return toast.success(`${msg} Successfull!`, style);
      default:
        return toast('No message!', style);
    }
  }

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const { results, count } = await productApi.getByPage(filters.page, filters.page_size);
        if (isEdit) {
          handleToastShow('Update', 'success');
          location.state.isEdit = false;
        }
        const newResults = results.map((product) => {
          const { name } = GetCategoryByID(product.sub_category);
          const newProduct = {
            ...product,
            sub_category: name,
          };
          return newProduct;
        });
        setTotalPages(Math.ceil(count / filters.page_size));
        setProductList(newResults);
      } catch {
        handleToastShow('Fetching Data', 'error');
      }
    };

    fetchProductList();
  }, [status, filters]);

  async function handleProductDelete(id) {
    try {
      productApi.delete(id)
        .then(() => {
          if (productList.length === 1) {
            setPage(page - 1);
            setFilters({
              ...filters,
              page: page - 1,
            });
          }
          setStatus(Math.random());
          handleClose();
        });
      handleToastShow('Delete', 'success');
    } catch {
      handleToastShow('Delete', 'error');
    }
  }

  function handleModalClick(id) {
    setID(id);
    handleShow();
  }

  function handlePageChange(newPage) {
    setPage(newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
  }

  return (
    <>
      <Row style={{ margin: '0' }}>
        <Col sm={8}>
          <ProductTable
            products={productList}
            onModalShow={handleModalClick}
            onPageChange={handlePageChange}
            totalPages={totalPages}
            page={page}

          />
        </Col>
        <Col sm={4}>
          <FormComponent
            onChangeStatus={setStatus}
            onShowToast={handleToastShow}
          />
        </Col>
      </Row>

      <ModalComponent
        show={show}
        handleClose={handleClose}
        onDelete={handleProductDelete}
        id={ID}
      />
      <ToastContainer />
    </>
  );
};

export default ManagePage;
