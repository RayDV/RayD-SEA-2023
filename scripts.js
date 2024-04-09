// Data for all the cafes
let cafes = [
  {
    name: "Smoking Tiger",
    location: "11190 South St #134, Cerritos, CA 90703",
    rating: 4.4,
    number_of_reviews: 58,
    imageURL: "https://s3-media0.fl.yelpcdn.com/bphoto/I4Xtn4-OAmkLEk7B1tddTw/348s.jpg"
  },
  {
    name: "Caffe Bené",
    location: "1555 Sepulveda Blvd, Torrance, CA 90501",
    rating: 4.2,
    number_of_reviews: 318,
    imageURL: "https://res.heraldm.com/content/image/2016/02/04/20160204001792_0.jpg"
  },
  {
    name: "Starbucks",
    location: "31202 Palos Verdes Dr W Golden Cove Shopping Center, Rancho Palos Verdes, CA 90275-5361",
    rating: 4.5,
    number_of_reviews: 73,
    imageURL: "https://images.pexels.com/photos/3352765/pexels-photo-3352765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "Meet Fresh",
    location: "11900 South St Ste 109, Cerritos, CA 90703",
    rating: 4.2,
    number_of_reviews: 225,
    imageURL: "https://static.wixstatic.com/media/1a3e4e_9dda8ac67ad94a78ad79ab6c28ebe18e~mv2.jpg/v1/fill/w_800,h_533,al_c,q_85/1a3e4e_9dda8ac67ad94a78ad79ab6c28ebe18e~mv2.jpg"
  }
];

// Function to display all cafe cards
// Get a reference to the container that will hold the cafe cards
// Clear out the old cards
// Clone the template card
// For each cafe in the cafes array, update the cloned card with this cafe's data
// Lastly, append the new card to the container
function showCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  for (let i = 0; i < cafes.length; i++) {
    const nextCard = templateCard.cloneNode(true);
    editCardContent(nextCard, cafes[i]);
    cardContainer.appendChild(nextCard);
  }
}

// Function that takes a card element and a cafe object, and updates the card element with the cafe's data
// Set the display style of the card to "block" to make it visible
// Set the text content of the cafe name element to the cafe's name
// Set the source of the image element to the cafe's imageURL
// Set the alt text of the image element to "Cafe name: " followed by the cafe's name
function editCardContent(card, cafe) {
  card.style.display = "block";
  card.querySelector(".cafe-name").textContent = cafe.name;
  card.querySelector("img").src = cafe.imageURL;
  card.querySelector("img").alt = "Cafe name: " + cafe.name;

  let actualRating = Math.round(cafe.rating * 2) / 2;
  let starRating = `${"★".repeat(Math.floor(actualRating))}${"☆".repeat(5 - Math.floor(actualRating))}`;

  card.querySelector(".number-rating").textContent = cafe.rating;
  card.querySelector(".star-rating").textContent = starRating;
  card.querySelector(".reviews-count").textContent = cafe.number_of_reviews;

  let cafeLocationElement = card.querySelector("#maps-link");
  cafeLocationElement.href = cafe.mapsLink;
  cafeLocationElement.textContent = cafe.location;
}

// Function that takes a location string and returns a Google Maps link for that location
function getGoogleMapsLink(location) {
  let formattedLocation = encodeURIComponent(location);
  return `https://www.google.com/maps/search/?api=1&query=${formattedLocation}`;
}

// Add Google Maps links to all cafes
cafes.forEach((cafe) => {
  cafe.mapsLink = getGoogleMapsLink(cafe.location);
});

// Function to sort the cafes array by rating, and then update the cards displayed on page
function sortCafesByRating() {
  cafes.sort((a, b) => b.rating - a.rating);
  showCards();
}

// Function to sort cafes by number of reviews
function sortCafeByNumberofRating() {
  cafes.sort((a, b) => b.number_of_reviews - a.number_of_reviews);
  showCards();
}

// Similar functions to sort the cafes array by number of reviews, name (from A to Z), and name (from Z to A)
function sortCafeByAtoZ() {
  cafes.sort((a, b) => a.name.localeCompare(b.name));
  showCards();
}

function sortCafeByZtoA() {
  cafes.sort((a, b) => b.name.localeCompare(a.name));
  showCards();
}

// Make a copy of the original cafes array to save the original order
let originalCafes = [...cafes]; // create a copy of original cafes array

// Function to filter the cafes array by search keyword, and then update the cards displayed on page
function searchCafes() {
  const searchQuery = document.querySelector("#search-input").value.toLowerCase();

  const filteredCafes = originalCafes.filter(cafe => cafe.name.toLowerCase().includes(searchQuery));

  cafes = [...filteredCafes];  // assign a copy of filtered results array
  showCards();
}

// Function to restore the cafes array to its original order, and then update the cards displayed on page
function defaultOrder() {
  cafes = [...originalCafes];
  showCards();
}

// Code that runs once the page finishes loading
document.addEventListener("DOMContentLoaded", function() {
  showCards();
  document.querySelector("#sort-by-rating-button").addEventListener("click", sortCafesByRating);
  document.querySelector("#sort-by-number-of-reviews").addEventListener("click", sortCafeByNumberofRating);
  document.querySelector("#sort-by-A-Z").addEventListener("click", sortCafeByAtoZ);
  document.querySelector("#sort-by-Z-A").addEventListener("click", sortCafeByZtoA);
  document.querySelector("#default-order").addEventListener("click", defaultOrder);

  let searchInput = document.querySelector("#search-input");
  let searchBtn = document.querySelector("#search-button");

  searchBtn.addEventListener("click", searchCafes);
  searchInput.addEventListener("input", function (event) {
      event.preventDefault(); // prevent form submission
      searchCafes();
  });
});
