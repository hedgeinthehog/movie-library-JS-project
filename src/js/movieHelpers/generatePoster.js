import variables from '../settingsApi/apiVariables';
import '../../images/error-card/error.jpg';
const { POSTER_URL } = variables;

export const generatePosterPath = imageName => {
   if(!imageName){return './images/error-card/error.jpg';}
   else{ return `${POSTER_URL}${imageName}`;}
};
