import MoviePagination from '../pagination/moviePagination';
import refs from '../refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import {addToStorage, resetStorage} from '../addToStorage/addToStorage';


const { 
  prevRef, 
  nextRef, 
  searchInpRef, 
  pageNumsRef, 
  moviesListRef, 
} = refs;

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
  
  const addToQueueBtnRef = document.querySelector('.add-to-queue-btn');
  const addToWatchedBtnRef = document.querySelector('#add-to-watched-btn');
  const addToQueue = addToQueueBtnRef.addEventListener('click', addToQueueOnClick);
  const addToWatched = addToWatchedBtnRef.addEventListener('click', addToWatchedOnClick);
  function addToQueueOnClick(){
      return addToStorage(movieObj, 'queue');
    }
  function addToWatchedOnClick(){
      return addToStorage(movieObj, 'watched');
  }

  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(event) {
    if (event.code === 'Escape') {
      modal.close();
      addToQueueBtnRef.removeEventListener(addToQueue);
      addToWatchedBtnRef.removeEventListener(addToWatched);
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}
