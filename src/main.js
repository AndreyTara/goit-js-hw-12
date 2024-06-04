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
let totalHits = 500;

// змінна кілкість елементів контенту за 1 запит
const perPage = 15;

//максимальна кількість кроків додавання контенту
let totalPages = tpCount(totalHits, perPage);

function tpCount(totalHits, perPage) {
  return Math.ceil(totalHits / perPage);
}

//початкова сторінка для завантаження контенту
let page = 1;

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
  //відображення константи кнопки submit Form
  const btnSubmit = event.target.elements.btnSubmit;
  // нективна кнопка до завешення запиту
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
    //перевірка на кількість можливих отриманих елементів із сайту для завантаження на поточну сторінцу
    if (pics.totalHits < totalHits) {
      totalPages = tpCount(pics.totalHits, perPage);
    }
    //перевірка на отримання данних //якщо відсутні
    if (!pics.hits.length) {
      //вивести вікно попередження про відсутність даних
      iziToast.error(optionsIziToast);
      // додавання  у тексту та лодеру класу 'hidden'
      refs.textEl.classList.add('hidden');
      return;
    }

    //рендерінг у строку контенту arr, 'сторінка'
    const markup = renderFunction(pics.hits, page);
    //відмільювівання контенту
    refs.listEl.insertAdjacentHTML('beforeend', markup);
    //додавання lightBox до відмальованного контенту
    lightBox.refresh();
    // //перевірка 'сторінки' контенту на ліміт контенту
    if (page >= totalPages) {
      //додавання попереджувального вікна про відсутність контенту або достатнього для відображення
      iziToast.error({
        ...optionsIziToast,
        title: "We're sorry, there are no more posts to load.",
      });
      // кнопка loadMore додати стиль "display = 'none'"
      refs.btnEl.style.display = 'none';
      // текс+лодер додати класс 'hidden'
      refs.textEl.classList.add('hidden');
      return;
    }

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
    // відображення попереджуваного вікна про помилку
    iziToast.error(optionsIziToast);
    // текс+лодер додати класс 'hidden'
    refs.textEl.classList.add('hidden');
    // відображення про помилку у консолі
    console.log(error.message);
  } finally {
    //відображення активної кнопки після запиту
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
    // прибрання у тексту та лодеру класу 'hidden'
    refs.textEl.classList.remove('hidden');
    //вітворення запиту до серверу для отримання обїєкту
    const res = await pixabayApi(themaOfThePics, page, perPage);
    //отримання arr для відображення на сторінці
    const pics = res.data;
    //кнопка loadMore додати стиль "display = 'none'"
    refs.btnEl.style.display = 'none';
    //формування шаблонної строки в залежності від отриманого масиву
    const markup = renderFunction(pics.hits, page);
    //відмільювівання контенту
    refs.listEl.insertAdjacentHTML('beforeend', markup);
    //навішування lightBox на зававнтажений на сторінку контент
    lightBox.refresh();
    //якщо кількість сторінок відповідає максимальній кількості контенту
    if (page >= totalPages) {
      //додавання попереджувального вікна про відсутність контенту або достатнього для відображення
      iziToast.error({
        ...optionsIziToast,
        title: "We're sorry, there are no more posts to load.",
      });
      // кнопка loadMore додати стиль "display = 'none'"
      refs.btnEl.style.display = 'none';
      // текс+лодер додати класс 'hidden'
      refs.textEl.classList.add('hidden');
      return;
    }
    //затримка щоб побачити спінер
    setTimeout(() => {
      // текс+лодер додати класс 'hidden'
      refs.textEl.classList.add('hidden');
      //// кнопка loadMore додати стиль "display = 'block'"
      refs.btnEl.style.display = 'block';
      //плавний скрол  сторнки після підвантаження елементів
      toScroll('.section-list');
    }, 1000);
  } catch (error) {
    // відображення попереджуваного вікна про помилку
    iziToast.error(optionsIziToast);
    // текс+лодер додати класс 'hidden'
    refs.textEl.classList.add('hidden');
    // кнопка loadMore додати стиль "display = 'none'"
    refs.btnEl.style.display = 'none';
    // відображення про помилку у консолі
    console.log(error);
  } finally {
    //відображення активної кнопки після запиту
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
  // розрахунок 2 висоти останнього елементу контенту
  const heightItem =
    document.querySelector(`${srtClDom}`).lastChild.clientHeight * 2;
  // скрол у відповідності до заданої висоти
  window.scrollBy({
    top: heightItem,
    left: 0,
    behavior: 'smooth',
  });
  // }
}
