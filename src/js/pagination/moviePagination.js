import api from '../api/apiFetching';
import moviesListTemplate from '../../templates/gallery-card-template.hbs';
import pageNumetationTemplate from '../../templates/page-numeration.hbs';
import modalMovieCardTemplate from '../../templates/modal.hbs';
import { generatePosterPath } from '../movieHelpers/generatePoster';
import switchErrorHide from '../movieHelpers/switchError';
import getFromStorage from '../localStoragemovies/getFromStorage';

class MoviePagination {
  #movies = [];
  searchKey = '';
  byQueryFlag = false;
  forLibraryFlag = false;
  movieType = '';
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.#movies = [];
    this.searchKey = '';
    this.byQueryFlag = false;
    this.movieType = '';
    this.forLibraryFlag = false;
    this.currentPage = 1;
    this.totalPages = 0;
    this.rowsPerLibraryPage = 0;
    this.pageNumsRef = document.querySelector('.page-numbers');
    this.totalGenres = [];
    this.goToPrevPage = this.goToPrevPage.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.init = this.init.bind(this);
    this.pageReset = this.pageReset.bind(this);
    this.renderMovieCard = this.renderMovieCard.bind(this);
    this.findMovieForLocalStorage = this.findMovieForLocalStorage.bind(this);
    this.paginateLibrary = this.paginateLibrary.bind(this);
  }

  // gets list of genres from the server and shows the first page of trending movies
  init() {
    this.getAllGenres();
    this.forLibraryFlag ? this.paginateLibrary() : this.loadPage();
  }

  // shows the page of movies
  loadPage() {
    return this.fetchMovies().then(data => {
      this.prepareMovies();
      this.render();
    });
  }

  paginateLibrary() {
    if (window.screen.width >= 1024) {
      this.rowsPerLibraryPage = 9;
    } else if (window.screen.width >= 768) {
      this.rowsPerLibraryPage = 8;
    } else {
      this.rowsPerLibraryPage = 4;
    }

    return this.fetchMovies().then(data => {
      this.prepareMovies();
      this.renderlibraryPage();
    });
  }

  // renders My Library Watched/Queued movies
  renderlibraryPage() {
    const rowsPerPage = this.rowsPerLibraryPage;
    if (this.totalPages < this.currentPage) this.currentPage = this.totalPages;

    let loopStart = rowsPerPage * (this.currentPage - 1);
    let loopEnd = loopStart + rowsPerPage;
    let paginatedItems = this.#movies.slice(loopStart, loopEnd);

    this.element.innerHTML = moviesListTemplate(paginatedItems);
    this.setPageNumbers();
  }

  //fetch trending or searching movies by byQueryFlag value
  fetchMovies() {
    if (this.forLibraryFlag) {
      return this.fetchMoviesFromLibrary();
    }
    if (!this.byQueryFlag && !this.forLibraryFlag) {
      return this.fetchMoviesPopular();
    }
    if (this.byQueryFlag && !this.forLibraryFlag) {
      return this.fetchMoviesByQuery();
    }
  }

  // fetches current page of searching movies
  fetchMoviesByQuery() {
    return api.fetchFilmByQuery(this.currentPage, this.searchKey).then(data => {
      const { results, total_pages } = data;
      switchErrorHide(results);
      this.totalPages = total_pages;
      this.#movies = results;
      return results;
    });
  }

  // fetches current page of trending movies
  fetchMoviesPopular() {
    return api.fetchPopularFilms(this.currentPage).then(data => {
      const { results, total_pages } = data;
      switchErrorHide(results);
      this.totalPages = total_pages;
      this.#movies = results;
      return results;
    });
  }

  // fetches movies from library depending on movieType
  fetchMoviesFromLibrary() {
    const moviesId = getFromStorage(this.movieType);
    let promisesArray = [];
    moviesId.forEach(movieId => promisesArray.push(api.fetchFilmById(movieId)));
    return Promise.all(promisesArray).then(data => {
      this.totalPages = Math.ceil(data.length / this.rowsPerLibraryPage);
      this.#movies = data;
      return data;
    });
  }

  // renders markup
  render() {
    this.element.innerHTML = moviesListTemplate(this.#movies);
    this.setPageNumbers();
  }

  // clears markup
  clear() {
    this.element.innerHTML = '';
  }

  //resets page
  pageReset() {
    this.currentPage = 1;
    this.#movies = [];
    this.clear();
  }

  // prepares info for movie cards
  prepareMovies() {
    this.#movies.forEach(movie => {
      if (movie) {
        this.getMovieGenres(movie);
        this.getReleaseYear(movie);
        this.getPosterImg(movie);
        this.validateAvgVote(movie);
        this.validateMovieDescription(movie);
      }
    });
  }

  // gets an array of all genres from the server
  getAllGenres() {
    api.fetchGanres().then(result => {
      const { genres } = result;
      this.totalGenres = [...genres];
    });
  }

  // converts genres to array of genre names
  adaptMovieGenres(movie) {
    if (movie.hasOwnProperty('genres')) {
      for (let i = 0; i < movie.genres.length; i++) {
        movie.genres[i] = movie.genres[i].id;
      }
      return movie.genres;
    }
    if (movie.hasOwnProperty('genre_ids')) {
      return movie.genre_ids;
    }
  }

  getMovieGenres(movie) {
    // checks if a movie has genres
    if (
      (movie.hasOwnProperty('genre_ids') && movie.genre_ids.length === 0) ||
      (movie.hasOwnProperty('genres') && movie.genres.length === 0)
    ) {
      movie.genres = 'Genres unknown';
      return;
    }

    // if the movie has genres, translates an array of genres to a string, limits count of genres to 3
    const maxGenresViewed = 3;
    movie.genres = this.adaptMovieGenres(movie);

    if (movie.genres.length > maxGenresViewed) {
      movie.genres = movie.genres.slice(0, 3);
      this.convertGenreIds(movie);
      movie.genres.splice(maxGenresViewed - 1, 1, 'Other');
      movie.genres = this.convertMovieGenresToString(movie.genres);
      return;
    }
    movie.genres = movie.genres.slice(0, 3);
    this.convertGenreIds(movie);
    movie.genres = this.convertMovieGenresToString(movie.genres);
  }

  // converts movie's genres from ids to names ([28, 12] -> [Action, Adventure])
  convertGenreIds(movie) {
    for (let i = 0; i < movie.genres.length; i++) {
      const genre = this.totalGenres.find(
        genreItem => genreItem.id === movie.genres[i],
      );
      movie.genres[i] = genre.name;
    }
  }

  // creates a string of movie's genres
  convertMovieGenresToString(genres) {
    genres = genres.join(', ');
    return genres;
  }

  // coverts release date to a year (2017-03-21 -> 2017)
  getReleaseYear(movie) {
    if (!movie.release_date) {
      movie.release_date = 'unknown';
      return;
    }

    const date = new Date(movie.release_date);
    const year = date.getFullYear();
    movie.release_date = year;
  }

  // if no average vote available, sets it to '-'
  validateAvgVote(movie) {
    movie.vote_average = movie.vote_average || '-';
  }

  // if no description available available, sets it to 'No description available'
  validateMovieDescription(movie) {
    movie.overview = movie.overview || 'No description available';
  }

  // generates path of a movie's poster image
  getPosterImg(movie) {
    movie.poster_path = generatePosterPath(
      movie.backdrop_path,
      movie.poster_path,
    );
  }

  goToPrevPage() {
    if (this.currentPage === 1) {
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.currentPage -= 1;
    if (this.forLibraryFlag) {
      this.renderlibraryPage();
      return;
    }
    this.fetchMovies().then(results => {
      this.#movies = results;
      this.prepareMovies();
      this.render();
    });
  }

  goToNextPage() {
    if (this.currentPage === this.totalPages) {
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.currentPage += 1;
    if (this.forLibraryFlag) {
      this.renderlibraryPage();
      return;
    }
    this.fetchMovies().then(results => {
      this.#movies = results;
      this.prepareMovies();
      this.render();
    });
  }

  // shows page selected by page number
  goToPage(event) {
    const clickedElem = event.target;
    if (clickedElem.matches('button')) {
      const page = Number(clickedElem.innerHTML);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (this.currentPage === page) return;
      this.currentPage = page;
      if (this.forLibraryFlag) {
        this.renderlibraryPage();
        return;
      }
      this.fetchMovies().then(results => {
        this.#movies = results;
        this.prepareMovies();
        this.render();
      });
    }
  }

  // renders current page numbers' selection (1 ... 4 5 6 7 8 ... 89)
  setPageNumbers() {
    this.pageNumsRef.innerHTML = '';

    const firstPage = 1;
    const lastPage = this.totalPages;
    const currentPage = this.currentPage;
    const pagesTotal = this.totalPages;

    if (this.totalPages <= 7) {
      for (let i = 1; i < this.totalPages + 1; i++) {
        this.pageNumsRef.append(this.createPageButton(i));
      }
      return;
    }

    this.pageNumsRef.innerHTML = pageNumetationTemplate({
      firstPage,
      lastPage,
    });

    if (currentPage === firstPage) {
      this.pageNumsRef
        .querySelector('.first-page')
        .classList.add('active-page');
    }

    if (currentPage === pagesTotal) {
      this.pageNumsRef.querySelector('.last-page').classList.add('active-page');
    }

    this.middlePageNumsRef = document.querySelector('.middle-page-numbers');

    if (window.screen.width < 768) {
      if (currentPage <= 3) {
        for (let page = 1; page < 6; page++) {
          this.middlePageNumsRef.append(this.createPageButton(page));
        }
        return;
      }
      if (currentPage > pagesTotal - 3) {
        for (let page = pagesTotal - 4; page < pagesTotal; page++) {
          this.middlePageNumsRef.append(this.createPageButton(page));
        }
        return;
      }
    }

    if (currentPage <= 4) {
      this.pageNumsRef.querySelector('.pre-separator').classList.add('hidden');

      for (let page = 2; page < 7; page++) {
        this.middlePageNumsRef.append(this.createPageButton(page));
      }
    }

    if (currentPage > pagesTotal - 4) {
      this.pageNumsRef.querySelector('.post-separator').classList.add('hidden');
      for (let page = pagesTotal - 5; page < pagesTotal; page++) {
        this.middlePageNumsRef.append(this.createPageButton(page));
      }
    }

    if (this.currentPage > 4 && this.currentPage <= this.totalPages - 4) {
      for (
        let page = this.currentPage - 2;
        page < this.currentPage + 3;
        page++
      ) {
        this.middlePageNumsRef.append(this.createPageButton(page));
      }
    }
  }

  // creates a page number's button and sets active page number
  createPageButton(pageNum) {
    let pageBtn = document.createElement('button');
    pageBtn.classList.add('pagination-controls', 'pagination-elem');
    if (this.currentPage === pageNum) pageBtn.classList.add('active-page');
    pageBtn.innerText = pageNum;
    return pageBtn;
  }

  // finding a movie from movies list and create modal card markup
  renderMovieCard(title) {
    const movie = this.#movies.find(movie => movie.title === title);
    return modalMovieCardTemplate(movie);
  }

  //return the movie object by title for localStorage
  findMovieForLocalStorage(title) {
    return this.#movies.find(movie => movie.title === title);
  }

  //function that set helpers data for fetching movies from library by ids array from watched list
  libraryWatchedHelpersData() {
    this.currentPage = 1;
    this.movieType = 'watched';
    this.forLibraryFlag = true;
  }

  //function that set helpers data for fetching movies from library by ids array from queue list
  libraryQueueHelpersData() {
    this.currentPage = 1;
    this.movieType = 'queue';
    this.forLibraryFlag = true;
  }

  //function for clearing helpers data for fetching movies from library by id
  // resetLibraryHelpersData() {
  //   this.movieType = '';
  //   this.forLibraryFlag = false;
  // }
}

export default MoviePagination;
