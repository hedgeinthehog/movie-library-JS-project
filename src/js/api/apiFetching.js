import variables from '../settingsApi/apiVariables';
const { BASE_URL, API_KEY } = variables;
import workLoader from '../spinner/loader';

const api = {
  fetchPopularFilms(page = '') {                                      //feth popular films
    workLoader();
    const url = `${BASE_URL}/3/trending/movie/week?api_key=${API_KEY}&page=${page}`;
    return fetch(url)
      .then(response => {
        if (response.ok){
          return response.json();
        } 
      })
      .catch(() => console.error('no popular'));
  },
  fetchFilmByQuery(page = '', searchQuery = '') {                   //fetch film by query
    workLoader();
    const url = `${BASE_URL}/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}`;
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .catch(() => console.error('no search movie')); 
  },
  fetchGanres() {                                                   //fetch ganres array
    workLoader();
    const url = `${BASE_URL}/3/genre/movie/list?api_key=${API_KEY}`;
    return fetch(url)
      .then(response => {
        if (response.ok) return response.json();
      })
      .catch(() => console.error('no ganres'));
  },
  fetchFilmById(movieId = ''){
    workLoader();
    const url = `${BASE_URL}/3/movie/${movieId}?api_key=${API_KEY}`;
    return fetch(url)
    .then(response => {
      if(response.ok){
        return response.json();
      }
    })
    .catch(() => console.error('current film is missing'));
  },
};

export default api;

//console.dir(fetchFilmById())