//Функция для проверки текущего состояния localStorage

function getCurrentStorage() {
  let watched = localStorage.getItem('watched');
  let queue = localStorage.getItem('queue');
  if (watched === null) {
    watched = [];
  } else {
    watched = JSON.parse(watched);
  }
  if (queue === null) {
    queue = [];
  } else {
    queue = JSON.parse(queue);
  }
  return [watched, queue];
}

//Функция для добавления фильма в localStorage где filmObj - это обект с параметрами фильма, filmType - либо watched либо queue.

function addToStorage(filmObj, filmType) {
  const [watched, queue] = getCurrentStorage();

  switch (filmType) {
    case 'watched':
      if (!watched.includes(filmObj.id)) {
        watched.push(filmObj.id);
        const filteredQueue = queue.filter(filmId => {
          return filmId !== filmObj.id;
        });

        localStorage.setItem('watched', JSON.stringify(watched));
        localStorage.setItem('queue', JSON.stringify(filteredQueue));
      } else {
        const filteredWatched = watched.filter(filmId => {
          return filmId !== filmObj.id;
        });
        localStorage.setItem('watched', JSON.stringify(filteredWatched));
      }
      break;
    case 'queue':
      if (!queue.includes(filmObj.id)) {
        queue.push(filmObj.id);
        const filtredWatched = watched.filter(filmId => {
          return filmId !== filmObj.id;
        });

        localStorage.setItem('watched', JSON.stringify(filtredWatched));
        localStorage.setItem('queue', JSON.stringify(queue));
      } else {
        const filteredQueue = queue.filter(filmId => {
          return filmId !== filmObj.id;
        });
        localStorage.setItem('queue', JSON.stringify(filteredQueue));
      }
      break;
    default:
      console.log('Film type is not correct!');
  }
}

//Функция для очистки localStorage

const resetStorage = function () {
  localStorage.removeItem('watched');
  localStorage.removeItem('queue');
};

function removeFromStorage(filmObj, filmType){
  const [watched, queue] = getCurrentStorage();

  switch (filmType) {
    case 'watched':
      if (watched.includes(filmObj.id)) {
        const filteredWatched = watched.filter(filmId => {
          return filmId !== filmObj.id;
        });
        localStorage.setItem('watched', JSON.stringify(filteredWatched));
      } else {
        console.log('In Watched is no such film!')
      }
      break;
    case 'queue':
      if (queue.includes(filmObj.id)) {
        const filteredQueue = queue.filter(filmId => {
          return filmId !== filmObj.id;
        });
        localStorage.setItem('queue', JSON.stringify(filteredQueue));
      } else {
        console.log('In Queue is no such film!')
      }
      break;
    default:
      console.log('Film type is not correct!');
  }
}

function filmInWatched(filmObj){
  const [watched] = getCurrentStorage();
  const includeInWatched = watched.includes(filmObj.id);
  if (includeInWatched) return true;
  else return false;
}
function filmInQueue(filmObj){
  const [queue] = getCurrentStorage();
  const includeInQueue = queue.includes(filmObj.id);
  if(includeInQueue) return true;
  else return false;
}

export { addToStorage, resetStorage, removeFromStorage, filmInQueue, filmInWatched};
