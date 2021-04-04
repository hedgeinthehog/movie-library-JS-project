import MoviePagination from '../pagination/moviePagination';
import refs from '../refs';

const { watchedBtnRef, queueBtnRef, loaderRef} = refs;


const movie = new MoviePagination('.movies-list');

movie.libraryWatchedHelpersData();
movie.init();
movie.resetLibraryHelpersData();
loaderRef.classList.add('visually-hidden');

watchedBtnRef.addEventListener('click', showWatchedOnClick);
queueBtnRef.addEventListener('click', showQueueOnClick);

function showQueueOnClick(){
    //function thats shown films from queue from lockalStorage
    movie.libraryQueueHelpersData();
    movie.init();
    movie.resetLibraryHelpersData();
    queueBtnRef.classList.add('is-active');
    watchedBtnRef.classList.remove('is-active');
}
function showWatchedOnClick(){
    //function thats shown films from wathed from lockalStorage
    movie.libraryWatchedHelpersData();
    movie.init();
    movie.resetLibraryHelpersData();
    watchedBtnRef.classList.add('is-active');
    queueBtnRef.classList.remove('is-active');
}