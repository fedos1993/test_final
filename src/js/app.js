import '../scss/app.scss';

const API_KEY = '1bcecbcbcd333ae3813e68a15a2bcff7';
const BASE_URL = 'https://api.themoviedb.org/3/';
// const Url = `${BASE_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const moviesList = document.querySelector('.movies__list');
const sortMovies = document.querySelector('#sortMovies');
const spinner = document.querySelector('.spinner');
const pagination = document.querySelector('.pagination');

function displaySpinner() {
  spinner.classList.add('display');
}

function hideSpinner() {
  spinner.classList.remove('display');
}

function generateURL(sort, page = '1') {
  const newUrl = `${BASE_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=${page}`;
  return newUrl;
}

function getMovies(url) {
  displaySpinner();
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const movies = data.results;
      hideSpinner();
      showMovies(movies);
    });
}

function sortMoviesChangeHandler() {
  const { value } = sortMovies;
  const newUrl = generateURL(value);
  getMovies(newUrl);
  updateSortMovies();
}

function showMovies(data) {
  moviesList.innerHTML = '';

  data.forEach((movie) => {
    const movieEl = document.createElement('li');
    movieEl.classList.add('movies__item', 'movie-card');
    movieEl.setAttribute('data-movie-id', `${movie.id}`);
    movieEl.innerHTML = `<div class="movie-card__poster">
                            <img 
                              src="${movie.poster_path ? IMAGE_URL + movie.poster_path : '../images/content/no_poster.jpg'}" 
                              alt="movie poster ${movie.title}">
                          </div>
                          <div class="movie-card__info"> 
                            <h3 class="movie-card__title">${movie.title}</h3>
                            <p class="movie-card__date">Release date: ${movie.release_date}</p>
                            <span class="movie-card__rating movie-card__rating--${getColorVote(movie.vote_average)}">
                              ${movie.vote_average}
                            </span>
                          </div>`;
    moviesList.appendChild(movieEl);
  });
}

function getColorVote(vote) {
  if (vote >= 7.5) {
    return 'high';
  } if (vote > 6) {
    return 'average';
  }
  return 'low';
}

function updateSortMovies() {
  sessionStorage.setItem('sortMovies', sortMovies.value);
}

moviesList.addEventListener('click', function(evt) {
  const target = evt.target.closest('.movie-card');
  if (target) {
    const { movieId } = target.dataset;
    movieSelected(movieId);
    window.location.href = 'movie.html';
  }
});

pagination.addEventListener('click', function(evt) {
  const target = evt.target.closest('.pagination__button');
  const totalPages = 15;
  const current = document.querySelector('#current');
  if (target) {
    let currentContent = Number(current.textContent);

    if (target.id === 'next') {
      if (currentContent < totalPages) {
        currentContent += 1;
      }
    } else if (target.id === 'prev') {
      if (currentContent > 1) {
        currentContent -= 1;
      }
    } else if (target.id === 'start') {
      currentContent = 1;
    } else if (target.id === 'end') {
      currentContent = totalPages;
    }
    current.textContent = currentContent;
    stylePageButtonAssignment(currentContent);
    pageCall(currentContent);
  }
});

function stylePageButtonAssignment(page) {
  const next = document.querySelector('#next');
  const prev = document.querySelector('#prev');
  const start = document.querySelector('#start');
  const end = document.querySelector('#end');
  const totalPages = 15;
  const disabled = 'pagination__button--disabled';

  if (page <= 1) {
    prev.classList.add(disabled);
    start.classList.add(disabled);
    next.classList.remove(disabled);
    end.classList.remove(disabled);
  } else if (page >= totalPages) {
    prev.classList.remove(disabled);
    start.classList.remove(disabled);
    next.classList.add(disabled);
    end.classList.add(disabled);
  } else {
    prev.classList.remove(disabled);
    next.classList.remove(disabled);
    start.classList.remove(disabled);
    end.classList.remove(disabled);
  }
}

function pageCall(page) {
  const newUrl = generateURL(sortMovies.value, page);
  getMovies(newUrl);
  sortMovies.scrollIntoView({ behavior: 'smooth' });
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
}

window.onload = () => {
  const newUrl = `${BASE_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
  getMovies(newUrl);
};

sortMovies.addEventListener('change', sortMoviesChangeHandler);
