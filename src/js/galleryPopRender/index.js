import MoviePagination from '../pagination/moviePagination';
import refs from '../refs'
import debounce from 'lodash.debounce';

const {prevRef, nextRef, searchInpRef} = refs;

const movie = new MoviePagination('.movies-list', '#search-input');
movie.init();

searchInpRef.addEventListener('input', debounce(requestMovie, 1000));

prevRef.addEventListener('click', movie.goToPrevPage);
nextRef.addEventListener('click', movie.goToNextPage);

function requestMovie(){            //searching logic movies by query or popular
    if(!searchInpRef.value) {
        movie.pageReset();
        movie.searchKey = '';
        movie.byQueryFlag = false;
        return movie.init();
    }
    if(searchInpRef.value){
        movie.pageReset();
        movie.searchKey = searchInpRef.value;
        movie.byQueryFlag = true;
        return movie.init();
    }
}