import cardTemplate from '../../templates/modal.hbs';
import MoviePagination from '../pagination/moviePagination';
import refs from '../refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const { moviesListRef } = refs;
const movie = new MoviePagination('.movies-list');

moviesListRef.addEventListener('click', openModal);

function openModal(event) {
  event.preventDefault();
  const { target } = event;
  const movieTitle = target.alt;

  const markup = movie.renderMovieCard(movieTitle);
  const modal = basicLightbox.create(markup);
  modal.show();
}

// function openModal(event) {
//   event.preventDefault();
//   const { target } = event;
//   const titleMovie = target.alt;
//   if (!titleMovie) {
//     return;
//   }

//   movie.fetchMoviesPopular().then(data =>
//     data.find(result => {
//       if (result.title === titleMovie) {
//         const markup = cardTemplate(result);
//         console.log(result);
//         const modal = basicLightbox.create(markup);
//         modal.show();
//       }
//     }),
//   );
// }
