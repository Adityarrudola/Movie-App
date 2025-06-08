const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.input-box');

const getMovieInfo = async (movie) =>{
    try {
        const myapikey = "966c4f4f";
        const url = `https://www.omdbapi.com/?apikey=${myapikey}&t=${movie}`;
    
        const response = await fetch(url);
        if(!response.ok){
            throw new error("Unable to fetch movie data");   
        }
        const data = await response.json();
        showMovieData(data);
    } catch (error) {
        showErrorMessage("No movie found");
    }

}

const showMovieData = (data) => {
    movieContainer.innerHTML = "";
    movieContainer.classList.remove("no-background");
    const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster} = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#11088</strong>${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movies-genre');
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

const showErrorMessage = (message) =>{
    movieContainer.classList.add("no-background");
    movieContainer.innerHTML = `<h2>${message}</h2>`;
}

const handleFormSubmission = (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName !== ''){
        showErrorMessage("Fetching movie information");
        getMovieInfo(movieName);
    }else{ 
        showErrorMessage("Enter a movie name");
        movieContainer.classList.add("no-background");
    }
}

searchForm.addEventListener('submit',handleFormSubmission);