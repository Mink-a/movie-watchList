const cardContainer = document.querySelector('.card-container');
const searchBtn = document.querySelector('.search-btn');

let cardArr;

function render() {
  const search = document.querySelector('input').value;
  fetch(`https://omdbapi.com/?apikey=6a00f621&s=${search}`)
    .then((res) => res.json())
    .then((data) => {
      cardArr = data.Search;

      const movieIDArr = cardArr.map((item) => item.imdbID);
      movieIDArr.forEach((movieID) => {
        fetch(`https://omdbapi.com/?apikey=6a00f621&i=${movieID}`)
          .then((res) => res.json())
          .then((data) => {
            cardContainer.innerHTML += `
              <!-- Card 
              ---------------------------->
              <div class="card">
                <span class="hide">${data.imdbID}keyID</span>
                <div class="img-container">
                  <img
                    src=${data.Poster}
                    alt="an image"
                    class="image"
                  />
                </div>
                <div class="info">
                  <h3 class="title">${data.Title}  <span class="rating">⭐ ${data.imdbRating}</span></h3>
                  <p>
                    ${data.Plot}
                  </p>
                  <button class="add">Add</button>
                </div>
              </div>
              <!---------------------------- 
                Card End -->
              `;

            document.querySelectorAll('.add').forEach((item) => {
              item.addEventListener('click', (e) => {
                let movie = e.target.parentNode.parentNode;
                let movieID = movie.childNodes[1].textContent;
                console.log(movie, movieID);
                localStorage.setItem(movieID, movie.innerHTML);
              });
            });
          });
      });
    });

  cardContainer.innerHTML = '';
}

searchBtn.addEventListener('click', render);
