import refs from '../refs';

const { moviesListRef, loaderRef } = refs;

function workLoader() {
    if(moviesListRef.innerHTML === '') {
       loaderRef.classList.remove('visually-hidden');
        return;
    }
    else {
        loaderRef.classList.add('visually-hidden');
    }
}

export default workLoader;
