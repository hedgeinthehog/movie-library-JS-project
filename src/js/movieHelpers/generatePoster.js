import variables from '../settingsApi/apiVariables';
import '../../images/error-card/error.jpg';
const { POSTER_URL } = variables;

export const generatePosterPath = (backdrop, poster)  => {
   if(backdrop){ return `${POSTER_URL}${backdrop}`;}
   if(!backdrop && poster){ return `${POSTER_URL}${poster}`;}
   if(!backdrop && !poster){return './images/error-card/error.jpg';}
};
