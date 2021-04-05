import MoviePagination from '../pagination/moviePagination';
import refs from '../refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import {addToStorage, 
  resetStorage, 
  removeFromStorage, 
  filmInQueue, 
  filmInWatched} from '../addToStorage/addToStorage';


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
  const markup = movie.renderMovieCard(movieTitle);
  const movieObj = movie.findMovieForLocalStorage(movieTitle);
  
  const modal = basicLightbox.create(markup);
  modal.show();
  
  const addToQueueBtnRef = document.querySelector('.add-to-queue-btn');
  const addToWatchedBtnRef = document.querySelector('#add-to-watched-btn');
  addToQueueBtnRef.addEventListener('click', addToQueueOnClick);
  addToWatchedBtnRef.addEventListener('click', addToWatchedOnClick);
  
  function addToQueueOnClick(){
    if(filmInQueue(movieObj)){
      addToQueueBtnRef.textContent = 'remove from queue';
      addToQueueBtnRef.addEventListener('click', queueRemoveFilmOnClick);
      function queueRemoveFilmOnClick(){
        addToQueueBtnRef.textContent = 'add to queue'
        addToQueueBtnRef.removeEventListener( 'click', queueRemoveFilmOnClick);
        return removeFromStorage(movieObj, 'queue');
      }
    }
    else return addToStorage(movieObj, 'queue');
    }

  function addToWatchedOnClick(){
    if(filmInWatched(movieObj)){
      addToWatchedBtnRef.textContent = 'remove from watched';
      addToWatchedBtnRef.addEventListener('click', watchedRemoveFilmOnClick);

      function watchedRemoveFilmOnClick(){
        addToWatchedBtnRef.textContent = 'add to watched'
        addToWatchedBtnRef.removeEventListener('click', watchedRemoveFilmOnClick);
        return removeFromStorage(movieObj, 'watched');
      }
    }
     else return addToStorage(movieObj, 'watched');
  }

  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(event) {
    if (event.code === 'Escape') {
      modal.close();
      addToQueueBtnRef.removeEventListener('click', addToQueueOnClick);
      addToWatchedBtnRef.removeEventListener('click', addToWatchedOnClick);
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}
