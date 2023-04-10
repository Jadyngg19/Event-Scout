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
          console.log(events); 
          if (response._embedded) {
            events = response._embedded.events;
          } else {
            events = [];
          }
          addMarkersToMap(events); //calls function from google-maps-api.js
          
          const jsonEvents = JSON.stringify(events); // Convert the events to a JSON string
          localStorage.setItem("events", jsonEvents); // Save the JSON string to local storage 
          
          if (events.length === 0) {
            $("#events").html("<p>No events found for the specified location and radius.</p>");
          } else {
            const eventsHtml = events.map((event) => {
              let priceHtml = "";
              if (event.priceRanges) {
                const priceRange = event.priceRanges[0];
                priceHtml = `<a href="${event.url}" target="_blank" class="event-price">Price:  ${priceRange.max} (${priceRange.currency})</a>`;
              } else {
                priceHtml = "<p>No pricing information available.</p>";
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
            $("#events").html(eventsHtml);
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      $("#events").html("<p>Please enter a location to search for events.</p>");
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

function debounce(func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  }
}

let minPrice = $("#priceMin").val();
let maxPrice = $("#priceMax").val();

$("#test5").on("input", debounce(() => {
  minPrice = $("#priceMin").val();
  refreshEvents();
}, 2000));

$("#test6").on("input", debounce(() => {
  maxPrice = $("#priceMax").val();
  refreshEvents();
}, 2000));

// Helper function to refresh events display
function refreshEvents() {
  $("#searchButton").trigger("click");
}
