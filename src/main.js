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
  btnEl: document.querySelector('.section-more-btn'),
};
const limitEl = 45;
const perPage = 15;
const totalHits = Math.ceil(limitEl / perPage);
let page = 1;

refs.formEl.addEventListener('input', function (event) {
  if (event.target.tagName === 'INPUT' && !event.target.value.trim()) {
    alert('Please fill the form - input.');
  }
});
refs.formEl.addEventListener('submit', async e => {
  e.preventDefault();
  refs.listEl.innerHTML = '';
  const themaOfThePics = e.target.elements.query.value;
  if (!themaOfThePics) {
    return;
  }
  try {
    refs.textEl.classList.remove('hidden');
    const res = await pixabayApi(themaOfThePics, page, perPage);
    const pics = res.data;
    if (!pics.hits.length) {
      iziToast.error(optionsIziToast);
      refs.textEl.classList.add('hidden');
      return;
    }
    if (page >= totalHits) {
      refs.btnEl.style.display = 'none';
      return;
    }
    const markup = renderFunction(pics.hits, page);
    refs.listEl.insertAdjacentHTML('beforeend', markup);
    lightBox.refresh();
    setTimeout(() => {
      refs.textEl.classList.add('hidden');
      refs.textEl.style.order = 1;
      refs.btnEl.style.display = 'block';
      toScroll('.section-list');
    }, 1000);
  } catch (error) {
    iziToast.error(optionsIziToast);
    refs.textEl.classList.add('hidden');
    console.log(error.message);
  } finally {
  }
});

refs.btnEl.addEventListener('click', handheSecondSubmit);

async function handheSecondSubmit(e) {
  refs.btnEl.disabled = true;
  e.preventDefault();
  page++;
  const themaOfThePics = refs.formEl.elements.query.value;
  try {
    if (page > totalHits) {
      iziToast.error({
        position: 'topRight',
        message: "We're sorry, there are no more posts to load",
      });
      refs.btnEl.style.display = 'none';
      return;
    }
    refs.textEl.classList.remove('hidden');
    const res = await pixabayApi(themaOfThePics, page, perPage);
    const pics = res.data;
    refs.btnEl.style.display = 'none';
    const markup = renderFunction(pics.hits, page);
    refs.listEl.insertAdjacentHTML('beforeend', markup);
    lightBox.refresh();
    setTimeout(() => {
      refs.textEl.classList.add('hidden');
      refs.btnEl.style.display = 'block';
      toScroll('.section-list');
    }, 1000);
  } catch (error) {
    iziToast.error(optionsIziToast);
    refs.textEl.classList.add('hidden');
    refs.btnEl.style.display = 'none';
    console.log(error);
  } finally {
    refs.btnEl.disabled = false;
  }
}

function toScroll(srtClDom) {
  // refs.listEl.addEventListener('scroll', fnScroll, { once: true });
  // function fnScroll() {
  const heightItem =
    document.querySelector(`${srtClDom}`).lastChild.clientHeight * 2;
  window.scrollBy({
    top: heightItem,
    left: 0,
    behavior: 'smooth',
  });
  // }
}
