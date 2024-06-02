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
// змінні форма, зони додавання контент, текстове повідомлення при завантаженні + лодер , кнопка loadMore,
const refs = {
  formEl: document.querySelector('.section-form'),
  listEl: document.querySelector('.section-list'),
  textEl: document.querySelector('.section-text'),
  btnEl: document.querySelector('.section-more-btn'),
};

// змінна макс елементів контенту
const limitEl = 65;

// змінна кілкість елементів контенту за 1 запит
const perPage = 15;

//максимальна кількість сторінок
const totalHits = Math.ceil(limitEl / perPage);

//початкова сторінка для завантаження
let page = 1;

//
let curArrLenght = 0;

// валідація форми інпута
refs.formEl.addEventListener('input', fnInput);

/**
 * check to ''
 * @param {*} event
 */
function fnInput(event) {
  if (event.target.tagName === 'INPUT' && !event.target.value.trim()) {
    alert('Please fill the form - input.');
  }
}

// підключення слухача подій на форму
refs.formEl.addEventListener('submit', onHandleSubmit);

/**
 * render section list to submit form
 * @param {*} event
 * @returns
 */
async function onHandleSubmit(event) {
  //відключення стандартної поведінки форми
  event.preventDefault();
  const btnSubmit = event.target.elements.btnSubmit;
  btnSubmit.disabled = true;
  //очищення списку додавання контенту
  refs.listEl.innerHTML = '';
  // отримання значення у формі - инпуті
  const themaOfThePics = event.target.elements.query.value;
  // перевірка чи вводиляся данні у інпут
  if (!themaOfThePics) {
    return;
  }

  //відловлювання помилок при запитах
  try {
    // прибрання у тексту та лодеру класу 'hidden'
    refs.textEl.classList.remove('hidden');
    // формування запиту за темою, сторінкою, та відображенного контенту
    const res = await pixabayApi(themaOfThePics, page, perPage);
    //отримання данних за ключем '.data'
    const pics = res.data;
    //перевірка на отримання данних //якщо відсутні
    if (!pics.hits.length) {
      //вивести вікно попередження про відсутність даних
      iziToast.error(optionsIziToast);
      // додавання  у тексту та лодеру класу 'hidden'
      refs.textEl.classList.add('hidden');
      return;
    }
    //перевірка 'сторінки' контенту на ліміт контенту
    if (page >= totalHits) {
      // кнопка loadMore  додаэться стиль  "display = 'none'""
      refs.btnEl.style.display = 'none';
      return;
    }

    //рендерінг у строку контенту arr, 'сторінка'
    const markup = renderFunction(pics.hits, page);
    //відмільювівання контенту
    refs.listEl.insertAdjacentHTML('beforeend', markup);
    //додавання lightBox до відмальованного контенту
    lightBox.refresh();

    //затримка для роботи лодера 1 секунда
    setTimeout(() => {
      // текс+лодер додати класс 'hidden'
      refs.textEl.classList.add('hidden');
      // текс+лодер додати "order = 1"
      refs.textEl.style.order = 1;
      // кнопка loadMore додати стиль "display = 'block'""
      refs.btnEl.style.display = 'block';
      // смітити контент на 2 розміри висоти останньої картки  класу '.section-list'
      toScroll('.section-list');
    }, 1000);
  } catch (error) {
    iziToast.error(optionsIziToast);
    refs.textEl.classList.add('hidden');
    console.log(error.message);
  } finally {
    btnSubmit.disabled = false;
  }
}

//підключення слухача на кнопку loadMore
refs.btnEl.addEventListener('click', handleClick);
/**
 * render section list to click loadMore
 * @param {*} event
 * @returns
 */
async function handleClick(event) {
  //кнопка loadMore не активна
  refs.btnEl.disabled = true;
  // додавння 1 до змінної page
  page++;
  //отримання поточного значення форми - инпуту
  const themaOfThePics = refs.formEl.elements.query.value;

  try {
    refs.textEl.classList.remove('hidden');
    const res = await pixabayApi(themaOfThePics, page, perPage);
    const pics = res.data;
    console.log(pics.hits.length);
    //якщо кількість сторінок відповідає максимальній кількості контенту
    if (page > totalHits || pics.hits.length === 0) {
      //додавання попереджувального вікна про відсутність контенту або достатнього для відображення
      iziToast.error({
        ...optionsIziToast,
        title: "We're sorry, there are no more posts to load.",
      });

      // кнопка loadMore додати стиль "display = 'block'""
      refs.btnEl.style.display = 'none';
      // текс+лодер додати класс 'hidden'
      refs.textEl.classList.add('hidden');
      return;
    }
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

/**
 * scroll bottom to 2 height last card
 * @param {*} srtClDom
 */
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
