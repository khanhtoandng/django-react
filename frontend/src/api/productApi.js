import axiosClient from './axiosClient';

const productApi = {
  getAll: () => {
    const url = '/product/list/';
    return axiosClient.get(url);
  },
  getByPage: (page, pagesize) => {
    const url = `/product/list/?page=${page}&page_size=${pagesize}`;
    return axiosClient.get(url);
  },
  get: (id) => {
    const url = `/product/detail/${id}`;
    return axiosClient.get(url);
  },

  getImageSlide: (id) => {
    const url = `/subimage/list/${id}`;
    return axiosClient.get(url);
  },

  delete: (id) => {
    const url = `/product/delete/${id}`;
    return axiosClient.delete(url);
  },

  post: (params) => {
    const url = '/product/create/';
    return axiosClient.post(url, params);
  },

  put: (id, params) => {
    const url = `/product/update/${id}`;
    return axiosClient.put(url, params);
  },

  getBySearch: (search, productType, category, page, pagesize) => {
    let slug = '';
    if (productType !== '') {
      slug += `&sub_category__category=${productType}`;
    }
    if (category !== '') {
      slug += `&sub_category=${category}`;
    }

    const url = `/product/search/?search=${search}${slug}&page=${page}&page_size=${pagesize}`;
    return axiosClient.get(url);
  },
};

export default productApi;
