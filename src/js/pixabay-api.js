import axios from 'axios';

export function pixabayApi(picThema, page, perPage = 20) {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: '32923501-8d8c5bf31ee0b7b85cce4fb99',
    q: picThema,
    image_type: 'photo',
    orientation: 'horizontal',
    page: page,
    per_page: perPage,
  });

  const url = `${BASE_URL}?${params.toString()}`;
  return axios.get(url);
}
