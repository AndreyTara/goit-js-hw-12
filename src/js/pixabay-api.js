export function pixabayApi(picThema) {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: '32923501-8d8c5bf31ee0b7b85cce4fb99',
    q: picThema,
    image_type: 'photo',
    orientation: 'horizontal',
    // per_page: 9,
  });

  const url = `${BASE_URL}?${params.toString()}`;
  return fetch(url).then(res => res.json());
}
