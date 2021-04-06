import MoviePagination from '../pagination/moviePagination';
import refs from '../refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import {
  addToStorage,
  filmInQueue,
  filmInWatched,
} from '../addToStorage/addToStorage';

const { prevRef, nextRef, searchInpRef, pageNumsRef, moviesListRef } = refs;

const movie = new MoviePagination('.movies-list');
movie.init();

searchInpRef.addEventListener('keydown', onPressEnterSearch);
prevRef.addEventListener('click', movie.goToPrevPage);
nextRef.addEventListener('click', movie.goToNextPage);
pageNumsRef.addEventListener('click', movie.goToPage);
moviesListRef.addEventListener('click', openModal);

function onPressEnterSearch(event) {
  //do search on Enter press
  if (event.code === 'Enter') {
    event.preventDefault();
    requestMovie();
  }
}

function requestMovie() {
  //searching logic movies by query or popular
  if (!searchInpRef.value) {
    movie.pageReset();
    movie.searchKey = '';
    movie.byQueryFlag = false;
    return movie.init();
  }
  if (searchInpRef.value) {
    movie.pageReset();
    movie.searchKey = searchInpRef.value;
    movie.byQueryFlag = true;
    return movie.init();
  }
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
  const movieObj = movie.findMovieForLocalStorage(movieTitle);

  const modal = basicLightbox.create(markup);
  modal.show();
  
  const closeBtn = document.querySelector('.modal-close-btn');
  const addToQueueBtnRef = document.querySelector('#add-to-queue-btn');
  const addToWatchedBtnRef = document.querySelector('#add-to-watched-btn');
  addToQueueBtnRef.addEventListener('click', addToQueueOnClick);
  addToWatchedBtnRef.addEventListener('click', addToWatchedOnClick);
  closeBtn.addEventListener('click', () => modal.close());

  if (filmInQueue(movieObj)) {
    addToQueueBtnRef.textContent = 'remove from queue';
    addToWatchedBtnRef.textContent = 'add to watched';
  }
  if (filmInWatched(movieObj)) {
    addToWatchedBtnRef.textContent = 'remove from watched';
    addToQueueBtnRef.textContent = 'add to queue';
  }

  function addToQueueOnClick() {
    //add and remove film from queue and change buttons text
    if (!filmInQueue(movieObj) && !filmInWatched(movieObj)) {
      addToQueueBtnRef.textContent = 'remove from queue';
      addToWatchedBtnRef.textContent = 'add to watched';
      return addToStorage(movieObj, 'queue');
    }
    if (filmInQueue(movieObj) && !filmInWatched(movieObj)) {
      addToQueueBtnRef.textContent = 'add to queue';
      addToWatchedBtnRef.textContent = 'add to watched';
      return addToStorage(movieObj, 'queue');
    }
    if (!filmInQueue(movieObj) && filmInWatched(movieObj)) {
      addToQueueBtnRef.textContent = 'remove from queue';
      addToWatchedBtnRef.textContent = 'add to watched';
      return addToStorage(movieObj, 'queue');
    }
  }

  function addToWatchedOnClick() {
    //add and remove film from watched and change buttons text
    if (!filmInQueue(movieObj) && !filmInWatched(movieObj)) {
      addToWatchedBtnRef.textContent = 'remove from watched';
      addToQueueBtnRef.textContent = 'add to queue';
      return addToStorage(movieObj, 'watched');
    }
    if (filmInWatched(movieObj) && !filmInQueue(movieObj)) {
      addToWatchedBtnRef.textContent = 'add to watched';
      addToQueueBtnRef.textContent = 'add to queue';
      return addToStorage(movieObj, 'watched');
    }
    if (!filmInWatched(movieObj) && filmInQueue(movieObj)) {
      addToWatchedBtnRef.textContent = 'remove from watched';
      addToQueueBtnRef.textContent = 'add to queue';
      return addToStorage(movieObj, 'watched');
    }
  }

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
