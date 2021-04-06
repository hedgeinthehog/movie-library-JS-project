import {
  addToStorage,
  filmInQueue,
  filmInWatched,
} from '../localStoragemovies/addToStorage';

function enableModalMovieCardBtns(movie, movieTitle, libraryFlag = false) {
  const movieObj = movie.findMovieForLocalStorage(movieTitle);

  const addToQueueBtnRef = document.querySelector('#add-to-queue-btn');
  const addToWatchedBtnRef = document.querySelector('#add-to-watched-btn');
  addToQueueBtnRef.addEventListener('click', addToQueueOnClick);
  addToWatchedBtnRef.addEventListener('click', addToWatchedOnClick);

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
      addToStorage(movieObj, 'queue');
      if (libraryFlag) movie.paginateLibrary();
      return;
    }
    if (filmInQueue(movieObj) && !filmInWatched(movieObj)) {
      addToQueueBtnRef.textContent = 'add to queue';
      addToWatchedBtnRef.textContent = 'add to watched';
      addToStorage(movieObj, 'queue');
      if (libraryFlag) movie.paginateLibrary();
      return;
    }
    if (!filmInQueue(movieObj) && filmInWatched(movieObj)) {
      addToQueueBtnRef.textContent = 'remove from queue';
      addToWatchedBtnRef.textContent = 'add to watched';
      addToStorage(movieObj, 'queue');
      if (libraryFlag) movie.paginateLibrary();
      return;
    }
  }

  function addToWatchedOnClick() {
    //add and remove film from watched and change buttons text
    if (!filmInQueue(movieObj) && !filmInWatched(movieObj)) {
      addToWatchedBtnRef.textContent = 'remove from watched';
      addToQueueBtnRef.textContent = 'add to queue';
      addToStorage(movieObj, 'watched');
      if (libraryFlag) movie.paginateLibrary();
      return;
    }
    if (filmInWatched(movieObj) && !filmInQueue(movieObj)) {
      addToWatchedBtnRef.textContent = 'add to watched';
      addToQueueBtnRef.textContent = 'add to queue';
      addToStorage(movieObj, 'watched');
      if (libraryFlag) movie.paginateLibrary();
      return;
    }
    if (!filmInWatched(movieObj) && filmInQueue(movieObj)) {
      addToWatchedBtnRef.textContent = 'remove from watched';
      addToQueueBtnRef.textContent = 'add to queue';
      addToStorage(movieObj, 'watched');
      if (libraryFlag) movie.paginateLibrary();
      return;
    }
  }
}

export default enableModalMovieCardBtns;
