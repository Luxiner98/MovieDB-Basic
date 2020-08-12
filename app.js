let idGenres = document.getElementById('myGenres');
let randButton = document.getElementById('randomButton');
let close = document.getElementsByClassName('close')[0];
let radioGenres = document.getElementsByClassName('radio-genres');

const IMAGE_URL = 'https://image.tmdb.org/t/p/w200';
const API_KEY = '5e7d0c061419626c5f26ce46b7738aa0';


const randomMovieBtn =(e)=>{

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

//generating movies
$(document).ready(()=>{
    showMovies();
})

function showMovies(){
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=5e7d0c061419626c5f26ce46b7738aa0&language=en-US&page=1')
    .then((res)=>{
        //console.log(res);
        let movieTopRated= res.data.results;
        let movieParts = '';
        movieTopRated.forEach(topRated => {
            console.log(topRated);
            movieParts += `
                    <div class='col-md-3'>
                        <div class='blocks'>
                            <div class='rating'>${topRated.vote_average}</div>
                            <img src='${IMAGE_URL+topRated.poster_path}' id='poster-img' />
                            <h5 id='movie-title'>${topRated.title} (${topRated.release_date.slice(0,4)})</h5>
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
