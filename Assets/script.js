const API_KEY = "yQcZrCeti000GPZSD0YCrR0I8tGm3HfK";
const API_URL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&locale=*`;

$(document).ready(() => {
  let radius = $("#radiusInput").val();
  let type = $("#typeInput").val();

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
          const events = response._embedded.events;
          if (events.length === 0) {
            $("#events").html("<p>No events found for the specified location.</p>");
          } else {
            const eventsHtml = events.map((event) => {
              return `
                <h2 class="event-name">${event.name}</h2>
                <p class="event-date">${event.dates.start.localDate} at ${event.dates.start.localTime}</p>
                <p class="event-location">${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}</p>
                <p class="event-type">Type: ${event.classifications[0].segment.name}</p>
                <img src="${event.images[0].url}" alt="${event.name}" class="event-image">
                <a href="${event.url}" target="_blank" class="event-price">Buy Tickets</a>
                <hr class="event-line">
              `;
            }).join("");
            $("#events").html(eventsHtml);
          }
        },
        error: (error) => {
          console.log(error); 
        }
      });
    }
  });

  $("#radiusInput").change(() => {
    radius = $("#radiusInput").val();
    $("#searchButton").trigger("click");
  });

  $("#typeInput").change(() => {
    type = $("#typeInput").val();
    $("#searchButton").trigger("click");
  });
});