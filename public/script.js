const tmdbKey = '2f5936eb88d1578d505ecd4735da1c86';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';

// Elements
const genreSelection = document.getElementById('genres');
const moviePosterDiv = document.getElementById('moviePoster');
const movieTextDiv = document.getElementById('movieText');

/* API REQUEST FUNCTIONS */
// Get genres from the API
const getGenres = async () => {
    const genreRequestEndpoint = '/genre/movie/list';
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.genres;
        }
    } catch(error) {
        console.log(error);
    }
};

// Get movies from the API based on the chosen genre
const getMovies = async () => {
    const selectedGenre = genres.value;
    const discoverMovieEndpoint = '/discover/movie';
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.results;
        }
    } catch(error) {
        console.log(error);
    }
};

// Get movie info from the API
const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    const movieEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        }
    } catch(error) {
        console.log(error);
    }
};

/* POPULATE HTML */
// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
  for (const genre of genres) {
    let option = document.createElement("option");
    option.value = genre.id;
    option.text = genre.name;
    genreSelection.appendChild(option);
  }
};

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
  const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;
  const posterImg = document.createElement('img');
  posterImg.setAttribute('src', moviePosterUrl);
  posterImg.setAttribute('id', 'moviePoster');
  return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
  const titleHeader = document.createElement('h1');
  titleHeader.setAttribute('id', 'movieTitle');
  titleHeader.innerHTML = title;
  return titleHeader;
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
  const overviewParagraph = document.createElement('p');
  overviewParagraph.setAttribute('id', 'movieOverview');
  overviewParagraph.innerHTML = overview;
  return overviewParagraph;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo) => {
  const moviePoster = createMoviePoster(movieInfo.poster_path);
  const titleHeader = createMovieTitle(movieInfo.title);
  const overviewText = createMovieOverview(movieInfo.overview);
  const releaseDate = createMovieOverview(movieInfo.release_date);

  // Append title, poster, and overview to page
  moviePosterDiv.appendChild(moviePoster);
  movieTextDiv.appendChild(titleHeader);
  movieTextDiv.appendChild(overviewText);
  movieTextDiv.appendChild(releaseDate);
};

/* MAIN FUNCTION */
// Get a list of movies from the API and display the info of one of them
const showRandomMovie = async () => {
    const movieInfo = document.getElementById('movieInfo');
    if (movieInfo.childNodes.length > 0) {
      moviePosterDiv.innerHTML = '';
      movieTextDiv.innerHTML = '';
    };
    const movies = await getMovies();
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    const info = await getMovieInfo(randomMovie);
    displayMovie(info);
};

getGenres().then(populateGenreDropdown);
showRandomMovie();
genreSelection.onchange = showRandomMovie;
