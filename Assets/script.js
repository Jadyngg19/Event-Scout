const API_KEY = "yQcZrCeti000GPZSD0YCrR0I8tGm3HfK";
const API_URL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&locale=*`;
let events = [];

$(document).ready(() => {
  let radius = $("#radiusInput").val();
  let type = $("#typeInput").val();

  console.log("radius: ", radius);
  console.log("type: ", type);

  $("#searchButton").click(() => {
    const userLocation = $("#locationInput").val();

    if (userLocation) {
      $.ajax({
        url: API_URL,
        data: {
          "size": 10,
          "sort": "date,asc",
          "radius": radius,
          "unit": "km",
          "city": userLocation,
          "classificationName": type
        },
        success: (response) => {
          events = response._embedded.events;
          addMarkersToMap(events); //calls function from google-maps-api.js
          const jsonEvents = JSON.stringify(events); // Convert the events to a JSON string
          localStorage.setItem("events", jsonEvents); // Save the JSON string to local storage


          if (events.length === 0) {
            $("#events").html("<p>No events found for the specified location and radius.</p>");
          } else {
            const eventsHtml = events.map((event) => {
              let priceHtml = "<p>No pricing information available.</p>";
              if (event.priceRanges && event.priceRanges.length > 0) {
                const priceRange = event.priceRanges[0];
                priceHtml = `<a href="${event.url}" target="_blank" class="event-price">Price:  ${priceRange.max} (${priceRange.currency})</a>`;
              }
              return `
                <h2 class="event-name">${event.name}</h2>
                <p class="event.date">${event.dates.start.localDate} at ${event.dates.start.localTime}</p>
                <p class="event-location">${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}</p>
                <img class="event-image" src="${event.images[0].url}" alt="${event.name}">
                ${priceHtml}
                <hr class="event-line" />
                <br />
              `;
            }).join("");
            console.log(eventsHtml)
            $("#events").html(eventsHtml);
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    $("#radiusInput").change(() => {
      radius = $("#radiusInput").val();
      $("#searchButton").trigger("click");
    });

    $("#typeInput").change(() => {
      type = $("#typeInput").val();
      $("#searchButton").trigger("click");
    });
  });
});


// Step 2: Create variables for minimum and maximum prices
let minPrice = $("#test5").val();
let maxPrice = $("#test6").val();

// Step 3: Add event listeners to range inputs
$("#test5").on("input", () => {
  minPrice = $("#test5").val();
  refreshEvents();
});

$("#test6").on("input", () => {
  maxPrice = $("#test6").val();
  refreshEvents();
});

// Helper function to refresh events display
function refreshEvents() {
  $("#searchButton").trigger("click");
}
*/
/*added for filter

const priceRangeInput = document.querySelector('#price-range');
const distanceRangeInput = document.querySelector('#distance-range');

priceRangeInput.addEventListener('input', filterSearchResults);
distanceRangeInput.addEventListener('input', filterSearchResults);

function filterSearchResults() {
  const priceRangeValue = priceRangeInput.value;
  const distanceRangeValue = distanceRangeInput.value;

  
  // Use the current values to filter and display search results
  // ...
}

};
*/

