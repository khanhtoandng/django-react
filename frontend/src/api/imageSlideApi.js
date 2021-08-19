import axiosClient from './axiosClient';

const imageSlideApi = {
  post: (params) => {
    const url = '/subimage/create/';
    return axiosClient.post(url, params);
  },

  put: (id, params) => {
    const url = `/subimage/update/${id}`;
    return axiosClient.put(url, params);
  },

  delete: (id) => {
    const url = `/subimage/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default imageSlideApi;
