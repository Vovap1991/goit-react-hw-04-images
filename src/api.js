import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const defaultParams = {
  key: '38154528-67f43a39de2efb7355f45b1d8',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const fetchImages = async (query, page) => {
  const params = {
    ...defaultParams,
    q: query,
    page: page,
  };
  const response = await axios.get('', { params });
  return response.data;
};
