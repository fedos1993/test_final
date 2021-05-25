import '../scss/app.scss';

const API_KEY = '1bcecbcbcd333ae3813e68a15a2bcff7';
const BASE_URL = 'https://api.themoviedb.org/3/';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

getOneMovie();

function generateMovieDBUrl(path) {
  const url = `${BASE_URL}${path}?api_key=${API_KEY}&language=en-US`;
  return url;
}

function getOneMovie() {
  const movieId = sessionStorage.getItem('movieId');
  const path = `movie/${movieId}`;
  const newUrl = generateMovieDBUrl(path);
  fetch(newUrl)
    .then((res) => res.json())
    .then((data) => {
      const movie = data;
      showMovie(movie);
    });
}

function setGenres(movie) {
  const genresName = [];
  movie.filter((item) => genresName.push(item.name));
  return genresName.join(', ').toLowerCase();
}

function showMovie(movie) {
  const movieCard = document.querySelector('.full-movie-card');

  movieCard.innerHTML = `<div class="full-movie-card__header">
                            <div class="full-movie-card__poster">
                              <img
                                src="${movie.poster_path ? IMAGE_URL + movie.poster_path : '../images/content/no_poster.jpg'}" 
                                alt="movie poster ${movie.title}">
                            </div>
                            <div class="full-movie-card__info-box">
                              <h3 class="full-movie-card__title">${movie.title}</h3>
                              <ul class="full-movie-card__info">
                                <li class="full-movie-card__info-item">Genres: ${setGenres(movie.genres)}</li>
                                <li class="full-movie-card__info-item">Running time: ${movie.runtime} minutes</li>
                                <li class="full-movie-card__info-item">Original language: ${movie.original_language}</li>
                                <li class="full-movie-card__info-item">Release date: ${movie.release_date}</li>
                                <li class="full-movie-card__info-item">Rating: ${movie.vote_average}</li>
                                <li class="full-movie-card__info-item">Count of votes: ${movie.vote_count}</li>
                                <li class="full-movie-card__info-item">Popularity: ${movie.popularity}</li>
                              </ul>
                            </div>
                          </div>
                          <div class="full-movie-card__overview">
                            <span class="full-movie-card__overview-title">Overview:</span>
                            <p class="full-movie-card__overview-text">
                              ${movie.overview}
                            </p>
                          </div>`;
}

getTrailerMovie();

function getTrailerMovie() {
  const movieId = sessionStorage.getItem('movieId');

  const path = `/movie/${movieId}/videos`;
  const newUrl = generateMovieDBUrl(path);
  fetch(newUrl)
    .then((res) => res.json())
    .then((videoData) => {
      if (videoData.results.length > 0) {
        const iframeBox = document.querySelector('.movie__iframe-box');
        const embed = [];
        videoData.results.forEach((video) => {
          embed.push(`
            <iframe width="1280" height="720" 
              src="https://www.youtube.com/embed/${video.key}" title="${video.name}" 
              frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; 
              picture-in-picture" allowfullscreen>
            </iframe>
          `);
        });

        iframeBox.innerHTML = embed.join('');

        const trailerTitle = document.createElement('h3');
        trailerTitle.classList.add('movie__iframe-title');
        trailerTitle.textContent = 'Trailers';
        if (videoData.results.length === 1) {
          trailerTitle.textContent = 'Trailer';
        }
        iframeBox.prepend(trailerTitle);
      }
    });
}
