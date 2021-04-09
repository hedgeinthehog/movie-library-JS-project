import MoviePagination from '../pagination/moviePagination';
import refs from '../refs';
import openModal from '../localStoragemovies/modalBtns';

const {
  watchedBtnRef,
  queueBtnRef,
  loaderRef,
  prevRef,
  nextRef,
  pageNumsRef,
  moviesListRef,
} = refs;
const libraryFlag = true;

const movie = new MoviePagination('.movies-list');

movie.libraryWatchedHelpersData();
movie.init();
loaderRef.classList.add('visually-hidden');

prevRef.addEventListener('click', movie.goToPrevPage);
nextRef.addEventListener('click', movie.goToNextPage);
pageNumsRef.addEventListener('click', movie.goToPage);
watchedBtnRef.addEventListener('click', showWatchedOnClick);
queueBtnRef.addEventListener('click', showQueueOnClick);
moviesListRef.addEventListener('click', onOpenModal);

function showQueueOnClick() {
  //function thats shown films from queue from lockalStorage
  movie.libraryQueueHelpersData();
  movie.paginateLibrary();
  queueBtnRef.classList.add('is-active');
  watchedBtnRef.classList.remove('is-active');
  loaderRef.classList.add('visually-hidden');
}
function showWatchedOnClick() {
  //function thats shown films from wathed from lockalStorage
  movie.libraryWatchedHelpersData();
  movie.paginateLibrary();
  watchedBtnRef.classList.add('is-active');
  queueBtnRef.classList.remove('is-active');
  loaderRef.classList.add('visually-hidden');
}

function onOpenModal(event) {
  openModal(event, movie, libraryFlag);
}
