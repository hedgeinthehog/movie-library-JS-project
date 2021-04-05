import MoviePagination from '../pagination/moviePagination';
import refs from '../refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import {addToStorage, 
  resetStorage, 
  removeFromStorage, 
  filmInQueue, 
  filmInWatched} from '../addToStorage/addToStorage';

// resetStorage();
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
  
  const addToQueueBtnRef = document.querySelector('#add-to-queue-btn');
  const addToWatchedBtnRef = document.querySelector('#add-to-watched-btn');
  addToQueueBtnRef.addEventListener('click', addToQueueOnClick);
  addToWatchedBtnRef.addEventListener('click', addToWatchedOnClick);

  if(filmInQueue(movieObj)){
    const expanded = addToQueueBtnRef.getAttribute("aria-expanded") === "true" || false;
    togleTexstContentQueue(expanded);
    addToQueueBtnRef.setAttribute("aria-expanded", !expanded);
  }
  if(filmInWatched(movieObj)){
    const expanded = addToWatchedBtnRef.getAttribute("aria-expanded") === "true" || false;
    console.log(expanded)
    togleTexstContentWatched(expanded);
    addToWatchedBtnRef.setAttribute("aria-expanded", !expanded);
  }

  function addToQueueOnClick(){
    const expanded = addToQueueBtnRef.getAttribute("aria-expanded") === "true" || false;
    addToStorage(movieObj, 'queue');
    togleTexstContentQueue(expanded);
    addToQueueBtnRef.setAttribute("aria-expanded", !expanded);
  }
  function togleTexstContentQueue(expanded){
    if(!expanded) return addToQueueBtnRef.textContent = 'add to queue';
     else return addToQueueBtnRef.textContent = 'remove from queue';
  }

  
  function addToWatchedOnClick(){
    const expanded = addToWatchedBtnRef.getAttribute("aria-expanded") === "true" || false;
    addToStorage(movieObj, 'watched');
    togleTexstContentWatched(expanded);
    addToWatchedBtnRef.setAttribute("aria-expanded", !expanded);
  }
  function togleTexstContentWatched(expanded){
    if(expanded) return addToWatchedBtnRef.textContent = 'add to watched';
     else return addToWatchedBtnRef.textContent = 'remove from watched';
  }

  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(event) {
    if (event.code === 'Escape') {
      modal.close();
      // addToQueueBtnRef.removeEventListener('click', addToQueueOnClick);
      // addToWatchedBtnRef.removeEventListener('click', addToWatchedOnClick);
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}
