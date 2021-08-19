import React, { useEffect, useState } from 'react';
import './style.css';

import productApi from '../../api/productApi';
import ProductComponent from './component/ProductCard';
import Pagination from '../../component/Pagination';
import ProductSearch from './component/ProductSearch';
import ProductFilter from './component/ProductFilter';
import ErrorComponent from '../../component/ErrorComponent';

const ProductPage = () => {
  const [hasError, setHasError] = useState(false);
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    page: 1,
    page_size: 6,
    search: '',
    productType: '',
    category: '',
  });

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const { results, count } = await productApi.getBySearch(
          filters.search, filters.productType, filters.category, filters.page, filters.page_size,
        );
        setProductList(results);
        setTotalPages(Math.ceil(count / filters.page_size));
      } catch (error) {
        setHasError(true);
      }
    };

    fetchProductList();
  }, [filters]);

  function handlePageChange(newPage) {
    setPage(newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
  }

  function handleSearchChange(value, type) {
    setPage(1);
    const filter = { ...filters, page: 1 };
    filter[type] = value;
    if (type === 'productType') {
      filter.category = '';
    }
    setFilters(filter);
  }

  return (
    <>
      {!hasError && (
      <>
        <div>
          <div className="row justify-content-end filter-bar">
            <ProductFilter
              onFilter={handleSearchChange}
            />
            <div className="col-md-auto ">
              <ProductSearch
                onSubmit={handleSearchChange}
              />
            </div>
          </div>
        </div>
        <div>
          <ProductComponent
            productList={productList}
          />
        </div>
        {
        (productList.length !== 0) ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Pagination
              onPageChange={handlePageChange}
              totalPages={totalPages}
              page={page}
            />
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>No Product!</p>
          </div>
        )
      }
      </>
      )}

      {hasError && <ErrorComponent />}
    </>
  );
};

export default ProductPage;
