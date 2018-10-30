const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

getNewDate = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours();
  const minutes = d.getMinutes();

  const date = ` ${year} - ${month} - ${day} ${hour}: ${minutes < 10 ? "0" + minutes : minutes}`;
  return date
}

let movieArray = [];
let getAllFilms = new Request('https://ghibliapi.herokuapp.com/films');
fetch(getAllFilms)
  .then(function (response) { return response.json(); })
  .then(function (data) {
    for (let i = 0; i < data.length; i++) {
      movieArray.push(data[i].title);
    }
  })

findMovieInArray = () => {
  document.getElementById("error").innerHTML = "";
  let input = document.getElementById("search").value;
  //find item in array;
  let idx = movieArray.indexOf(input);
  //get item in array at place idx
  if (idx == -1) {
    document.getElementById("error").innerHTML = "tyvärr, den filmen hittade vi inte"
    document.getElementById("search").value = "";

    return;
  } else {
    movieArray.find(x => x == input);
    document.getElementById("error").innerHTML = " ";
  }

  let myList = document.querySelector('ul');
  let listItem = document.createElement('li');
  listItem.innerHTML = movieArray[idx] + getNewDate();
  myList.appendChild(listItem);
}

var findMovie = document.getElementById("search");
findMovie.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    getNewDate();
    findMovieInArray();
  }
});
function showMovie(input) {
  let reg = new RegExp(input.split('').join('\\w*').replace(/\W/, ""), 'i');
  return movieArray.filter(function (title) {
    if (title.match(reg)) {
      return title;
    }
  });
}

function changeInput(val) {
  let input = document.getElementById("search").value;
  let res = document.getElementById("result");
  let autoCompleteResult = showMovie(val);
  if (input == '') {
    res.innerHTML = ''
  } else {
    res.innerHTML = autoCompleteResult;
  }
}
changeInput(this.value)
