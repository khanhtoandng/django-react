import PropTypes from 'prop-types';
import { useState, useRef } from 'react';

const ProductSearch = (props) => {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const typingTimeoutRef = useRef(null);

  function handeleSearchTermChange(e) {
    const { value } = e.target;
    setSearchTerm(value);

    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (value.length >= 3) {
        onSubmit(value, 'search');
      }
      if (value.length < 1) {
        onSubmit('', 'search');
      }
    }, 300);
  }

  return (
    <form>
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={handeleSearchTermChange}
      />
    </form>
  );
};

ProductSearch.propTypes = {
  onSubmit: PropTypes.func,
};

ProductSearch.default = {
  onSubmit: null,
};

export default ProductSearch;
