import refs from '../refs';

const { errorInpRef, loaderRef } = refs;

function flagChange(flag) {
  if (flag) {
    errorInpRef.classList.add('visually-hidden');
    loaderRef.classList.add('visually-hidden');
  }
  if (!flag) {
    errorInpRef.classList.remove('visually-hidden');
    loaderRef.classList.add('visually-hidden');
  }
}
function switchErrorHide(arr) {
  //function for hiding or showing error
  arr.length ? flagChange(true) : flagChange(false);
}
export default switchErrorHide;
