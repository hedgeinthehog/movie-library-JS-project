import MoviePagination from '../pagination/moviePagination';
import refs from '../refs'

const {prevRef, nextRef, searchInpRef} = refs;

const movie = new MoviePagination('.movies-list', '#search-input');
movie.init();

searchInpRef.addEventListener('keydown', onPressEnterSearch);

prevRef.addEventListener('click', movie.goToPrevPage);
nextRef.addEventListener('click', movie.goToNextPage);

function onPressEnterSearch(event){         //do search on Enter press
    if(event.code === 'Enter'){
        event.preventDefault();
        requestMovie();
    }
}

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
