import variables from '../settingsApi/apiVariables';
const { BASE_URL, API_KEY } = variables;

const api = {
  fetchPopularFilms(page = '') {                                      //feth popular films
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
    const url = `${BASE_URL}/3/genre/movie/list?api_key=${API_KEY}`;
    return fetch(url)
      .then(response => {
        if (response.ok) return response.json();
      })
      .catch(() => console.error('no ganres'));
  },
};

export default api;
