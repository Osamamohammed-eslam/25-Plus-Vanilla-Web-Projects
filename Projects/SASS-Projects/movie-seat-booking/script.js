const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

const movieSelect = document.getElementById("movie");
const amountOFSeats = document.getElementById("count");
const totalPrice = document.getElementById("total");

populateUI();
let priceOfMovie = +movieSelect.value;

// Set movie data to local storage
function setMovieData(movieIndex, movieValue) {
  localStorage.setItem("movie-index", movieIndex);
  localStorage.setItem("movie-value", movieValue);
}
// Update total and count
function UpdateNumbers() {
  const selectedSeat = document.querySelectorAll(".row .seat.selected");

  const selectedSeatIndex = [...selectedSeat].map((seat) =>
    [...seats].indexOf(seat)
  );

  localStorage.setItem("selected-seats", JSON.stringify(selectedSeatIndex));

  const numberOfSelectedSeats = selectedSeat.length;
  amountOFSeats.innerText = numberOfSelectedSeats + " ";
  totalPrice.innerText = numberOfSelectedSeats * priceOfMovie;
}

// Populate seats to the UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selected-seats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = JSON.parse(localStorage.getItem("movie-index"));

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Selected Movie Event
movieSelect.addEventListener("change", (e) => {
  priceOfMovie = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  UpdateNumbers();
});

// Selected Seat Event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    UpdateNumbers();
  }
});

UpdateNumbers();
