const API_KEY='api_key=63c0c407badee0f9261a1d30c82966ba';
const BASE_URL='https://api.themoviedb.org/3';
const API_URL= BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL='https://image.tmdb.org/t/p/w500';
const searchURL=BASE_URL+ '/search/movie?'+API_KEY;


const genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]



const main=document.getElementById('main');
const form=document.getElementById('form');
const search=document.getElementById('search');
const tagsEle = document.getElementById('tags');


var selectedGenre = []


Genre();
function Genre() {
    tagsEle.innerHTML = '';
    genres.forEach(genre => {
        const t = document.createElement('li');
        t.classList.add('tag');
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if (selectedGenre.length == 0) {
                selectedGenre.push(genre.id);
            } else {
                if (selectedGenre.includes(genre.id)) {
                    selectedGenre.forEach((id, idx) => {
                        if (id == genre.id) {
                            selectedGenre.splice(idx, 1);
                        }
                    })
                } else {
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre)
            getMovies(API_URL+ '&with_genres=' + encodeURI(selectedGenre.join(',')))
        })
        tagsEle.append(t);
    })

}



getMovies(API_URL);
function getMovies(url){
     fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMovies(data.results);
    })
}

function showMovies(data){
    main.innerHTML='';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview}=movie;
        const movieELe=document.createElement('div')
        movieELe.classList.add('movie');
        movieELe.innerHTML=`<img src="${IMG_URL+poster_path}" alt="${title}">
    
    <div class="overview">
<div class="${color(vote_average)}">
<i class=" first bi bi-star-fill"></i>
                <i class="second bi bi-star-fill"></i>
                <i class="third bi bi-star-fill"></i>
                <i class="fourth bi bi-star-fill"></i>
                <i class=" fifth bi bi-star-fill"></i>
</div>
        <div class="movie-title">
    <h3>${title}</h3>
<div class="details">
<h6>Overview</h6>
${overview}
</div>
</div>
    </div>`

    main.appendChild(movieELe);
        
    });
}


function color(vote){
    if(vote>8){
        return 'five'
    }
    else if(vote>6){
        return 'four'
    }
    else if(vote>4)
        {
            return 'three'
        }
    else if(vote>2)
        return 'two'
    else   return 'one'
}



form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm)
    }
    else {
        getMovies(API_URL);
    }
})
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}
var hom= document.getElementById("home");
hom.addEventListener("click",function(){
    location.reload();
})