const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.querySelector('main');
const search = document.querySelector('.search');
const body = document.querySelector('body');

// Get initial movies
getMovies(API_URL)



async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(results) {

    main.innerHTML = '';

    results.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-box');

        movieContainer.innerHTML = `<img src="${IMG_PATH + movie.backdrop_path
            }" alt="" srcset="" />
        <div class="info-box">
          <h3>${movie.original_title}</h3>
          <span class="${getClassName(+movie.vote_average)}">${movie.vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          <p>
           ${movie.overview}
          </p>
        </div>`;

        main.appendChild(movieContainer);
    });
    console.log(results)
}


function getClassName(vote_average) {
    if (vote_average > 8) {
        return 'green';
    } else if (vote_average > 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

search.addEventListener('keydown', async function (e) {
    if (e.code == 'Enter') {
        const searchedString = search.value;
        const searchUrl = SEARCH_API + searchedString;
        const res = await fetch(searchUrl);
        const data = await res.json();

        // window.location.reload();
        showMovies(data.results);


    }


});