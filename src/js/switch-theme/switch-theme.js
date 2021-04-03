import refs from '../refs';

const { toggle, body } = refs;
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
const { LIGHT, DARK } = Theme;

toggle.addEventListener('change', setToggleParam);

// Функция для записи параметров в localStorage и добавления класса body
function setToggleParam() {
  if (toggle.checked) {
    body.setAttribute('class', LIGHT);
    localStorage.setItem('theme', LIGHT);
  } else {
    body.setAttribute('class', DARK);
    localStorage.setItem('theme', DARK);
  }
}

// проверка localStorage та темную тему
if (localStorage.theme === DARK) {
  toggle.checked = false;
  body.setAttribute('class', DARK);
} else {
  toggle.checked = true;
  body.setAttribute('class', LIGHT);
}
