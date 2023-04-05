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