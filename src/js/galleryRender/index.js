import MoviePagination from '../pagination/moviePagination';
import refs from '../refs';
import openModal from '../localStoragemovies/modalBtns';

const { prevRef, nextRef, searchInpRef, pageNumsRef, moviesListRef } = refs;

const movie = new MoviePagination('.movies-list');
movie.init();

searchInpRef.addEventListener('keydown', onPressEnterSearch);
prevRef.addEventListener('click', movie.goToPrevPage);
nextRef.addEventListener('click', movie.goToNextPage);
pageNumsRef.addEventListener('click', movie.goToPage);
moviesListRef.addEventListener('click', onOpenModal);

function onPressEnterSearch(event) {
  //do search on Enter press
  if (event.keyCode === 13) {
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

function onOpenModal(event) {
  openModal(event, movie);
}
