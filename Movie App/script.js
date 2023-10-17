/* &page=1 giati de thelw ooooola ta apotelesmata*/
const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b031d188af8f144812a49db1f5ed18c4&page=1"

const IMG_PATH = "https://image.tmdb.org/t/p/w1280"
/* to query=" sto telos, alliws de douleuei, den kserw giati*/
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=b031d188af8f144812a49db1f5ed18c4&query="'

const form = document.getElementById("form")
const search = document.getElementById("search")
const main = document.getElementById("main")
/* get initial movies */
getMovies(API_URL)


async function getMovies (url) {
    const res = await fetch(url)
    const data = await res.json()
    /* to .results to brhka apo to object page toy API */
    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ""
    movies.forEach((movie) => {
        /* mporoume na paroume sugkekrimena pedia apo to db, san variables */
        const {title, poster_path, vote_average, overview} = movie
        const movieEl =document.createElement("div")
        movieEl.classList.add("movie")
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if (vote>=8) {
        return "green"
    }
    else if (vote>= 5) {
        return "orange"
    }
    else {
        return "red"
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const searchTerm = search.value
    if (searchTerm && searchTerm !== "") {
        getMovies(SEARCH_API + searchTerm)
        search.value = "" 
    }
    else {
        window.location.reload()
    }
})




