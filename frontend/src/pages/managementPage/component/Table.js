import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

import '../style.css';
import Pagination from '../../../component/Pagination';

const ProductTable = (props) => {
  const {
    products, page, onModalShow,
    onPageChange, totalPages,
  } = props;

  function handleDelBtnClick(e) {
    const { id } = e.target;
    onModalShow(id);
  }
  return (
    <>
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-xs-5">
              <h2>Product <b>Management</b></h2>
            </div>
          </div>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Code</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
          products.map((product, index) => {
            const orderNum = (page - 1) * 5 + index;

            return (
              <tr id={product.id} key={product.id}>
                <ProductRow
                  data={product}
                  index={orderNum}
                  onModalShow={handleDelBtnClick}
                />
              </tr>
            );
          })
}
          </tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Pagination
            onPageChange={onPageChange}
            totalPages={totalPages}
            page={page}
          />
        </div>
      </div>

    </>

  );
};

const ProductRow = (props) => {
  const { data, index } = props;
  const {
    onModalShow,
  } = props;
  const history = useHistory();
  return (
    <>
      <td>{index}</td>
      <td>{data.name}</td>
      <td>{data.code}</td>
      <td>{data.sub_category}</td>
      <td>{data.price}</td>
      <td>
        <div className="btn-group" role="group" aria-label="Basic example">
          <Button
            className="fa fa-edit"
            style={{ fontSize: '20px', marginRight: '10px' }}
            variant="primary"
            onClick={() => { history.push(`/update/${data.id}`); }}
          />

          <Button
            className="fa fa-trash-o"
            style={{ fontSize: '20px' }}
            id={data.id}
            variant="primary"
            onClick={(e) => onModalShow(e)}
          />

        </div>
      </td>
    </>

  );
};

ProductRow.default = {
  index: 0,
  data: {},
  show: true,
};

ProductRow.propTypes = {
  index: PropTypes.number,
  data: PropTypes.object.isRequired,
  onModalShow: PropTypes.func,

};

ProductTable.default = {
  products: [],
};

ProductTable.propTypes = {
  products: PropTypes.array.isRequired,

  page: PropTypes.number,
  onModalShow: PropTypes.func,
  onPageChange: PropTypes.func,
  totalPages: PropTypes.number,

};

export default ProductTable;
