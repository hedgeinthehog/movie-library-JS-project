import variables from '../settingsApi/apiVariables';
import '../../images/error-card/error.jpg';
const { POSTER_URL } = variables;

export const generatePosterPath = (backdrop, poster)  => {
   if(poster){ return `${POSTER_URL}${poster}`; }
   if(!poster && backdrop){return `${POSTER_URL}${backdrop}`;}
   if(!poster && !backdrop){return './images/error-card/error.jpg';}
};
