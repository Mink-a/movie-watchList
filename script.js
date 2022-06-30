const cardContainer = document.querySelector('.card-container');
const searchBtn = document.querySelector('.search-btn');

let cardArr;

function render() {
  const search = document.querySelector('input').value;
  fetch(`https://omdbapi.com/?apikey=6a00f621&s=${search}`)
    .then((res) => res.json())
    .then((data) => {
      cardArr = data.Search;

      cardArr.forEach((item) => {
        cardContainer.innerHTML += `
    <!-- Card 
    ---------------------------->
    <div class="card">
      <span class="hide">${item.imdbID}keyID</span>
      <div class="img-container">
        <img
          src=${item.Poster}
          alt="an image"
          class="image"
        />
      </div>
      <div class="info">
        <h3 class="title">${item.Title}</h3>
        <button class="add">Add</button>
      </div>
    </div>
    <!---------------------------- 
      Card End -->
    `;
      });
      // localStorage.setItem('list', JSON.stringify(cardHtml));
      // const list = JSON.parse(localStorage.getItem('list'));
      // cardContainer.innerHTML = list.join('');
      document.querySelectorAll('.add').forEach((item) => {
        item.addEventListener('click', (e) => {
          let movie = e.target.parentNode.parentNode;
          let movieID = movie.childNodes[1].textContent;
          // console.log(movie, movieID);
          localStorage.setItem(movieID, movie.innerHTML);
        });
      });
    });

  cardContainer.innerHTML = '';
}

searchBtn.addEventListener('click', render);
