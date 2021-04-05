import MoviePagination from '../pagination/moviePagination';
import refs from '../refs';

const {
  watchedBtnRef,
  queueBtnRef,
  loaderRef,
  prevRef,
  nextRef,
  pageNumsRef,
} = refs;

const movie = new MoviePagination('.movies-list');

movie.libraryWatchedHelpersData();
movie.paginateLibrary();
loaderRef.classList.add('visually-hidden');

prevRef.addEventListener('click', movie.goToPrevPage);
nextRef.addEventListener('click', movie.goToNextPage);
pageNumsRef.addEventListener('click', movie.goToPage);
watchedBtnRef.addEventListener('click', showWatchedOnClick);
queueBtnRef.addEventListener('click', showQueueOnClick);

function showQueueOnClick() {
  //function thats shown films from queue from lockalStorage
  movie.libraryQueueHelpersData();
  movie.paginateLibrary();
  queueBtnRef.classList.add('is-active');
  watchedBtnRef.classList.remove('is-active');
}
function showWatchedOnClick() {
  //function thats shown films from wathed from lockalStorage
  movie.libraryWatchedHelpersData();
  movie.paginateLibrary();
  watchedBtnRef.classList.add('is-active');
  queueBtnRef.classList.remove('is-active');
}
