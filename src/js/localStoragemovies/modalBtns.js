import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import {
  addToStorage,
  filmInQueue,
  filmInWatched,
} from '../localStoragemovies/addToStorage';

function openModal(event, movie, libraryFlag = false) {
  //open modal card of film
  event.preventDefault();
  document.body.style.overflow = 'hidden';
  document.body.style.top = `-${window.scrollY}px`;

  const { target } = event;
  const movieTitle = target.alt;
  if (!movieTitle) {
    return;
  }
  const markup = movie.renderMovieCard(movieTitle);

  const modal = basicLightbox.create(markup);
  modal.show();
  const closeBtn = document.querySelector('.modal-close-btn');

  const movieObj = movie.findMovieForLocalStorage(movieTitle);

  const addToQueueBtnRef = document.querySelector('#add-to-queue-btn');
  const addToWatchedBtnRef = document.querySelector('#add-to-watched-btn');
  const lightboxOverlayRef = document.querySelector('.basicLightbox');
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
  window.addEventListener('keydown', closeModalHandler);
  lightboxOverlayRef.addEventListener('click', closeModalHandler);
  closeBtn.addEventListener('click', () => modal.close());

  function closeModalHandler(event) {
    //close modal and remove event listeners
    if (
      event.code === 'Escape' ||
      event.target === event.currentTarget ||
      event.target.classList.contains('modal-close-btn') ||
      event.target.classList.contains('modal-close-btn-line')
    ) {
      modal.close();
      const scrollY = document.body.style.top;
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
      document.body.style.overflow = 'auto';

      addToQueueBtnRef.removeEventListener('keydown', addToQueueOnClick);
      addToWatchedBtnRef.removeEventListener('keydown', addToWatchedOnClick);
      window.removeEventListener('keydown', closeModalHandler);
      lightboxOverlayRef.removeEventListener('click', closeModalHandler);
    }
  }
}

export default openModal;
