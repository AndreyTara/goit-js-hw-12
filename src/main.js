//Функція отримання проміса за запитом
import { pixabayApi } from './js/pixabay-api.js';

// рендер картинок
import { renderFunction } from './js/render-function.js';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// налаштування IziToast
const optionsIziToast = {
  theme: 'light', // темна тема
  timeout: 3000, // час прогресс бару
  title:
    'Sorry, there are no images matching your search query. Please try again!', //фраза сповіщення
  titleSize: 16,
  position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
  progressBar: true,
  displayMode: 'once', // спрацювати 1 раз
  transitionIn: 'fadeInUp',
  close: true, // закривання при натисканні на будь-який елемент сповіщення
};

// налаштування lightBox
const lightBox = new SimpleLightbox('.section-list a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  overlayOpacity: 0.3,
  widthRatio: 0.77,
  heightRatio: 0.919,
});

const refs = {
  formEl: document.querySelector('.section-form'),
  listEl: document.querySelector('.section-list'),
  textEl: document.querySelector('.section-text'),
};

refs.formEl.addEventListener('submit', e => {
  e.preventDefault();
  refs.listEl.innerHTML = '';
  const themaOfThePics = e.target.elements.query.value;
  if (!themaOfThePics) {
    return;
  }
  pixabayApi(themaOfThePics)
    .then(pics => {
      // console.log(pics.hits);
      if (!pics.hits.length) {
        iziToast.error(optionsIziToast);
        return;
      }
      const markup = renderFunction(pics.hits);
      refs.textEl.classList.remove('hidden');
      refs.listEl.insertAdjacentHTML('beforeend', markup);
      lightBox.refresh();
      setTimeout(() => {
        refs.textEl.classList.add('hidden');
      }, 1000);
    })
    .catch(error => {
      iziToast.error(optionsIziToast);
      console.log(error);
    });
});
