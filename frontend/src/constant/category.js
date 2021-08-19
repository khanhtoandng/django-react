function GetCategoryByID(id) {
  switch (id) {
    case 1:
      return {
        ProductIndex: 1,
        name: 'Sneaker',
      };
    case 2:
      return {
        ProductIndex: 1,
        name: 'Sandals',
      };
    case 3:
      return {
        ProductIndex: 2,
        name: 'Jackets',
      };
    case 4:
      return {
        ProductIndex: 2,
        name: 'T-Shirts',
      };
    case 5:
      return {
        ProductIndex: 2,
        name: 'Shirts',
      };
    case 6:
      return {
        ProductIndex: 3,
        name: 'Pants',
      };
    case 7:
      return {
        ProductIndex: 3,
        name: 'Dresses',
      };
    case 8:
      return {
        ProductIndex: 3,
        name: 'Short Pants',
      };
    default: return 'none';
  }
}

export default GetCategoryByID;
