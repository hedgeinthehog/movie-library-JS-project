import MoviePagination from '../pagination/moviePagination';
import refs from '../refs';

const { watchedBtnRef, queueBtnRef } = refs;

const movie = new MoviePagination('.movies-list');

watchedBtnRef.addEventListener('click', showWatchedOnClick);

function showWatchedOnClick(){
    movie.forLibraryFlag = true;
    movie.init();
    movie.forLibraryFlag = false;
}