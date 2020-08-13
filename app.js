let idGenres = document.getElementById('myGenres');
let randButton = document.getElementById('randomButton');
let close = document.getElementsByClassName('close')[0];
let radioGenres = document.getElementsByClassName('radio-genres');
let loadMovies =document.getElementById('loadMovies');

const IMAGE_URL = 'https://image.tmdb.org/t/p/w200';
const API_KEY = '5e7d0c061419626c5f26ce46b7738aa0';
const POPULAR_MOVIES = 'https://api.themoviedb.org/3/movie/popular?api_key=5e7d0c061419626c5f26ce46b7738aa0&language=en-US&page=';
//const TOP_RATED = 'https://api.themoviedb.org/3/movie/top_rated?api_key=5e7d0c061419626c5f26ce46b7738aa0&language=en-US&page=';


const randomMovieBtn =()=>{

    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=5e7d0c061419626c5f26ce46b7738aa0&language=en-US')
    .then((res)=>{
        let genres = res.data.genres;
        let boxOfGenres= '';
        //console.log(genres);
        genres.forEach(name => {
        //    console.log(name.name); //outputs the name of genres- like: Adventure, Action and so on

            boxOfGenres += `
            <div class='button-div'>
                <input type="radio" id="genre-name" name="genre" value='${name.name}'>
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
    randomMovieBtn();
  }
close.onclick = () => {
    idGenres.style.display='none';
}
window.onclick = (event) => {
    if (event.target == idGenres) {
      idGenres.style.display = "none";
    }
}


let PAGENUMBER = 1; 


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
                <div class='blocks'>
                    <div class='rating'>${popular.vote_average}</div>
                    <img src='${IMAGE_URL+popular.poster_path}' id='poster-img' />
                    <h5 id='movie-title'>${popular.title} (${popular.release_date.slice(0,4)})</h5>
                    <p id='movie-language'>Language: ${popular.original_language}</p>
                </div>
            </div>
            `;
        });
        $('.movies').html(movieParts);
    })
    .catch(err=>{
        console.log(err);
    })
}



//load more movies
//same function as before but i just append to class
function loadMoreMovies(pagenumber){
    axios.get(POPULAR_MOVIES+pagenumber)
    .then((res)=>{
        //console.log(res);
        let moviePopular= res.data.results;
        let movieParts = '';
        moviePopular.forEach(popular => {
            //console.log(popular);
            movieParts += `
            <div class='col-md-3'>
                <div class='blocks'>
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

//fuction for LOAD button on the end of page
$(window).scroll(()=> {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        $('#loadMovies').fadeIn();
    } else {
        $('#loadMovies').fadeOut();
    }
});

//when clicking button, load more movies
$(document).ready(() => {
    $("#loadMovies").click((event)=> {
        event.preventDefault();
        loadMoreMovies(PAGENUMBER)
        PAGENUMBER=PAGENUMBER+1;
        return;
    });

});