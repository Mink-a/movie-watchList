const container = document.querySelector('.card-container');

let list = [];
function render() {
  for (let key in localStorage) {
    if (key.includes('keyID'))
      list.push(`<div class="card">${localStorage[key]}</div>`);
  }
  const remove = list.map((item) => {
    return item.replace(
      '<button class="add">Add</button>',
      '<button class="remove">remove</button>'
    );
  });

  container.innerHTML = remove.join('');
}

// Render localStorage items
render();

// IIFEs
(() => {
  document.querySelectorAll('.remove').forEach((item) => {
    item.addEventListener('click', (e) => {
      let movie = e.target.parentNode.parentNode;
      let movieID = movie.childNodes[1].textContent;
      localStorage.removeItem(movieID);

      location.reload();
    });
  });
})();
