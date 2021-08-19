import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GetProductType from '../../../constant/productType';
import '../style.css';

const ProductFilter = (props) => {
  const { onFilter } = props;
  const [categoryList, setCategoryList] = useState([]);

  function handleChangeOption(e) {
    const { value } = e.target;
    setCategoryList(GetProductType[value - 1]?.category);
    onFilter(value, 'productType');
  }

  function handleFilterOption(e) {
    const { value } = e.target;
    onFilter(value, 'category');
  }

  return (
    <>
      <div className="col-auto">
        <select className="form-control" onChange={handleChangeOption} required>
          <option value="">Please choose an option</option>
          {
       GetProductType.map((productType) => (
         <option value={productType.index} key={productType.index}>
           {productType.name}
         </option>
       ))
       }
        </select>
      </div>
      <div className="col-auto">
        <select className="form-control" required onChange={handleFilterOption}>
          <option value="">Please choose an option</option>
          {
            categoryList?.map((category) => (
              <option value={category.index} key={category.index}>
                {category.name}
              </option>
            ))
     }
        </select>
      </div>
    </>
  );
};

ProductFilter.propTypes = {
  onFilter: PropTypes.func,
};

ProductFilter.default = {
  onFilter: null,
};
export default ProductFilter;
