const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=f2894b1c231b433940eed5db2f99cc2f&language=ru&query=' + searchText;
    movie.innerHTML = 'Загрузка...';
    fetch(server)
    .then(function(value) {
        if(value.status !==200) {
            return Promise.reject(new Error('Ошибка'));
        }
        return value.json();
        
    })
    .then(function(output) {
        console.log(output);
        let inner = '';
        output.results.forEach(function (item) {
            let nameItem = item.name || item.title;

                inner += `<div class="col-12 col-md-4 col-xl-3 item"> 
                    <img src="${urlPoster + item.poster_path}" alt="${nameItem}"> <h5 class="text-center">${nameItem}</h5>
                 </div>`;
        });       
    movie.innerHTML= inner;
})
.catch(function(reason){
    movie.innerHTML = "Smth's wrong!";
        console.error('error ' + reason.status);
});
}

searchForm.addEventListener('submit', apiSearch);