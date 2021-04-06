import MoviePagination from '../pagination/moviePagination';
import refs from '../refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import enableModalMovieCardBtns from '../localStoragemovies/modalBtns';

const {
  watchedBtnRef,
  queueBtnRef,
  loaderRef,
  prevRef,
  nextRef,
  pageNumsRef,
  moviesListRef,
} = refs;

const movie = new MoviePagination('.movies-list');

movie.libraryWatchedHelpersData();
movie.init();
loaderRef.classList.add('visually-hidden');

prevRef.addEventListener('click', movie.goToPrevPage);
nextRef.addEventListener('click', movie.goToNextPage);
pageNumsRef.addEventListener('click', movie.goToPage);
watchedBtnRef.addEventListener('click', showWatchedOnClick);
queueBtnRef.addEventListener('click', showQueueOnClick);
moviesListRef.addEventListener('click', openModal);

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

function openModal(event) {
  //open modal card of film
  event.preventDefault();
  const { target } = event;
  const movieTitle = target.alt;
  if (!movieTitle) {
    return;
  }
  const markup = movie.renderMovieCard(movieTitle);

  const modal = basicLightbox.create(markup);
  modal.show();

  enableModalMovieCardBtns(movie, movieTitle, movie.forLibraryFlag);

  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(event) {
    //close modal and remove event listeners
    if (event.code === 'Escape') {
      modal.close();
      addToQueueBtnRef.removeEventListener('keydown', addToQueueOnClick);
      addToWatchedBtnRef.removeEventListener('keydown', addToWatchedOnClick);
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}
