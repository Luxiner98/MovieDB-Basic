let idGenres = document.getElementById('myGenres');
let randButton = document.getElementById('randomButton');
let close = document.getElementsByClassName('close')[0];
let radioGenres = document.getElementsByClassName('radio-genres');
let loadMovies =document.getElementById('loadMovies');
let home = document.getElementById('home');

let PAGENUMBER = 1;         //page for LOADING

let searchButton = document.getElementById('search-btn-my');
let searchInput = document.getElementById('search-my');
let page = 1;               //page for SEARCHING

let genreButton = document.getElementById('roll-button');

const IMAGE_URL = 'https://image.tmdb.org/t/p/w200';
const API_KEY = '5e7d0c061419626c5f26ce46b7738aa0';
const POPULAR_MOVIES = 'https://api.themoviedb.org/3/movie/popular?api_key=5e7d0c061419626c5f26ce46b7738aa0&language=en-US&page=';


//const TOP_RATED = 'https://api.themoviedb.org/3/movie/top_rated?api_key=5e7d0c061419626c5f26ce46b7738aa0&language=en-US&page=';

//homepage
home.onclick=()=>{
    document.location.reload(true);
}


//random button
const randomButtonGenre =()=>{

    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=5e7d0c061419626c5f26ce46b7738aa0&language=en-US')
    .then((res)=>{
        let genres = res.data.genres;
        let boxOfGenres= '';
        //console.log(genres);
        genres.forEach(name => {
        //    console.log(name.name); //outputs the name of genres- like: Adventure, Action and so on

            boxOfGenres += `
            <div class='button-div'>
                <input type="radio" id="${name.name}" name="genre" value='${name.name}'>
                <label for='${name.name}'>${name.name}</label><br>
            </div>
            `;
        });

        $('#genres-buttons').html(boxOfGenres);
        

    })
    .catch((err)=>{
        console.log(err);
    })

}

// calling function, and closing overlay
randButton.onclick = () => {
    idGenres.style.display = "block";
    randomButtonGenre();
  }
close.onclick = () => {
    idGenres.style.display='none';
}
window.onclick = (event) => {
    if (event.target == idGenres) {
      idGenres.style.display = "none";
    }
}

//find a random movie
genreButton.onclick=()=>{
    let genreName = document.getElementsByName('genre');
    for(let i=0;i<genreName.length;i++){
        if(genreName[i].checked){
            //console.log(genreName[i].value);
        }
    }
}

//movie details
function movieDetails(movieID){
    axios.get('https://api.themoviedb.org/3/movie/'+movieID+'?api_key=5e7d0c061419626c5f26ce46b7738aa0&language=en-US')
    .then((res)=>{
        let allMovieDetails = res.data;
        let displayMovieDetails = ``;
        let arrCompanies = [];
        allMovieDetails.production_companies.forEach(element => {
            arrCompanies.push(' '+element.name);
        });
        displayMovieDetails += `
            <div class='jumbotron'>
            <h1 class='title' >${allMovieDetails.title} (${allMovieDetails.release_date.slice(0,4)})</h1>
                <div class='container'>
                    <img src='${'https://image.tmdb.org/t/p/w1280'+allMovieDetails.backdrop_path}' id='details-img'>
                    <p id='overview'>${allMovieDetails.overview}</p>
                </div>
                <div class='container'>
                    <p>Rating: ${allMovieDetails.vote_average}<p>
                    <p>Popularity: ${allMovieDetails.popularity}</p>
                    <p>Language: ${allMovieDetails.original_language}</p>
                    <p>Production companies: ${arrCompanies}</p>
                </div>
            </div>
        `;
        //console.log(arrCompanies);

        $('.movies').html(displayMovieDetails);
    })
    .catch((err)=>{
        console.log(err);
    })
}


//generating movies
$(document).ready(()=>{
    showMovies(PAGENUMBER);
    PAGENUMBER = PAGENUMBER+1;
})

function showMovies(pagenumber){
    axios.get(POPULAR_MOVIES+pagenumber)
    .then((res)=>{
        //console.log(res);
        let moviePopular= res.data.results;
        let movieParts = '';
        moviePopular.forEach(popular => {
            //console.log(popular);
            movieParts += `
            <div class='col-md-3'>
                <div class='blocks' onclick='movieDetails(${popular.id})'>
                    <div class='rating'>${popular.vote_average}</div>
                    <img src='${IMAGE_URL+popular.poster_path}' id='poster-img' />
                    <h5 id='movie-title'>${popular.title} (${popular.release_date.slice(0,4)})</h5>
                    <p id='movie-language'>Language: ${popular.original_language}</p>
                    
                </div>
            </div>
            `;
        });
        loadButton();
        $('.movies').html(movieParts);
    })
    .catch(err=>{
        console.log(err);
    })
}



//load more movies
//same function as before but i just append to class
function loadMoreMovies(urlMovies,pagenumber){
    axios.get(urlMovies+pagenumber)
    .then((res)=>{
        //console.log(res);
        let moviePopular= res.data.results;
        let movieParts = '';
        moviePopular.forEach(popular => {
            //console.log(popular);
            movieParts += `
            <div class='col-md-3'>
                <div class='blocks' onclick='movieDetails(${popular.id})'>
                    <div class='rating'>${popular.vote_average}</div>
                    <img src='${IMAGE_URL+popular.poster_path}' id='poster-img' />
                    <h5 id='movie-title'>${popular.title} (${popular.release_date.slice(0,4)})</h5>
                    <p id='movie-language'>Language: ${popular.original_language}</p>
                </div>
            </div>
            `;
        });
        $('.movies').append(movieParts);
    })
    .catch(err=>{
        console.log(err);
    })
}

function loadButton(){
    //fuction for LOAD button on the end of page
    $(window).scroll(() => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            $('#loadMovies').fadeIn();
        } else {
            $('#loadMovies').fadeOut();
        }
    });


    //when clicking button, load more movies
    $(document).ready(() => {
        $("#loadMovies").click((event)=> {
            event.preventDefault();
            loadMoreMovies(POPULAR_MOVIES,PAGENUMBER)
            PAGENUMBER=PAGENUMBER+1;
        });
    });
}

//searching movies

//const SEARCH_MOVIES_BY_NAME = 'https://api.themoviedb.org/3/search/movie?api_key='+API_KEY+'&language=en-US&query='+searchInput+'&page=1&include_adult=false';
searchButton.onclick=()=>{
    if(searchInput.value === ''){
        alert('You need to enter movie name to search');
    }else{
        //console.log(searchInput.value);
        searchMovies(searchInput.value,page);
        searchInput.value='';
        page=1;
        PAGENUMBER=1;
    }
}

searchInput.addEventListener('keyup',(e)=>{
    if(e.keyCode === 13){
        searchButton.click();
    }
})


function searchMovies(searchInput,pagenumber) {
    axios.get('https://api.themoviedb.org/3/search/movie?api_key='+API_KEY+'&language=en-US&query='+searchInput+'&page='+pagenumber+'&include_adult=false')
    .then((res)=>{
        //console.log(res.data);
        let similarMovie= res.data.results;
        let similarMovieParts = '';
        similarMovie.forEach(similar => {
            //console.log(similar);
            similarMovieParts += `
            <div class='col-md-3'>
                <div class='blocks' onclick='movieDetails(${similar.id})'>
                    <div class='rating'>${similar.vote_average}</div>
                    <img src='${IMAGE_URL+similar.poster_path}' id='poster-img' />
                    <h5 id='movie-title'>${similar.title} (${similar.release_date.slice(0,4)})</h5>
                    <p id='movie-language'>Language: ${similar.original_language}</p>
                </div>
            </div>
            `;
        });
        $('.movies').html(similarMovieParts);
    })
    .catch(err=>{
        console.log(err);
    })
    
}