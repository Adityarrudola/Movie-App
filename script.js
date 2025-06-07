const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.input-box');

const getMovieInfo = async (movie) =>{
    const myapikey = "966c4f4f";
    const url = `http://www.omdbapi.com/?apikey=${myapikey}&t=${movie}`;

    const response = await fetch(url);
    const data = await response.json();
    showMovieData(data);
}

const showMovieData = (data) => {
    movieContainer.innerHTML = "";
    const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster} = data;

    const movieElement = document.createElement('div');
     movieElement.classList.add('.movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#11088</strong>${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('.movies-genre');
    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement); 

    movieElement.innerHTML += `
    <p><strong>Released date: </strong>${Released}</p>
    <p><strong>Duration: </strong>${Runtime}</p>
    <p><strong>Actors: </strong>${Actors}</p>
    <p><strong>Plot: </strong>${Plot}</p>
    `;

    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`;

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
}

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName !== ''){
        getMovieInfo(movieName);
    }
});