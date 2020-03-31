const mycontainer = document.querySelector(".mycontainer");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const checkout = document.getElementById("checkOutBtn");

updateUI();

let ticketPrice = +movieSelect.value;

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function changeMovie() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach(seat => {
      seat.classList.remove("selected");
    });
  }
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map(function(seat) {
    return [...seats].indexOf(seat);
  });
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

function updateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

function reloadPage() {
  localStorage.clear();
  window.location.href = window.location.href;
}

function checkingOut() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  if (selectedSeats.length > 0) {
    document.body.innerHTML =
      '<h1>You have bought the tickets! Enjoy the movie! &#128521;</h1> <br><button id="returnBtn" class="btn">Back</button><script src="script.js"></script>';
    const returnBtn = document.getElementById("returnBtn");
    returnBtn.addEventListener("click", reloadPage);
  } else {
    document.body.innerHTML =
      '<h1>You haven\'t selected any tickets...&#128546;</h1> <br><button id="returnBtn" class="btn">Back</button><script src="script.js"></script>';
    const returnBtn = document.getElementById("returnBtn");
    returnBtn.addEventListener("click", reloadPage);
  }
}

//Event Listeners

movieSelect.addEventListener("change", e => {
  changeMovie();
  ticketPrice = +e.target.value;

  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

mycontainer.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

checkout.addEventListener("click", checkingOut);

updateSelectedCount();
