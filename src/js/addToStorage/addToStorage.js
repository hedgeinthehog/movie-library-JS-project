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
  const watchedId = watched.map(film => film.id);
  const queueId = queue.map(film => film.id);

  switch (filmType) {
    case 'watched':
      if (!watchedId.includes(filmObj.id)) {
        watched.push(filmObj);
        const filteredQueue = queue.filter(film => {
          return film.id !== filmObj.id;
        });

        localStorage.setItem('watched', JSON.stringify(watched));
        localStorage.setItem('queue', JSON.stringify(filteredQueue));
      } else {
        const filteredWatched = watched.filter(film => {
          return film.id !== filmObj.id;
        });
        localStorage.setItem('watched', JSON.stringify(filteredWatched));
      }
      break;
    case 'queue':
      if (!queueId.includes(filmObj.id)) {
        queue.push(filmObj);
        const filtredWatched = watched.filter(film => {
          return film.id !== filmObj.id;
        });

        localStorage.setItem('watched', JSON.stringify(filtredWatched));
        localStorage.setItem('queue', JSON.stringify(queue));
      } else {
        const filteredQueue = queue.filter(film => {
          return film.id !== filmObj.id;
        });
        localStorage.setItem('queue', JSON.stringify(filteredQueue));
      }
      break;
    default:
      console.log('Не коректно указан filmType');
  }
}

//Функция для очистки localStorage

const resetStorage = function () {
  localStorage.removeItem('watched');
  localStorage.removeItem('queue');
};

export { addToStorage, resetStorage };
