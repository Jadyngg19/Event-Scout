// Initialize and add the map
let map;
let marker;
let geocoder;


async function initMap() {
  // The location of the central US
  const position = { lat: 38.000, lng: -97.000 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  // The map, centered on contiguous US
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapTypeControl: false,
  });
  geocoder = new google.maps.Geocoder();

  // The marker, positioned at the center of the US
  marker = new google.maps.Marker({
    map: map,
    position: position,
    title: "United States",
  });

  // Add event listener to search button
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", () => {
    const input = document.querySelector("input[type=text]");
    const address = input.value;

    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: position,
      mapTypeControl: false,
    });

    geocode({ address })
      .then((results) => console.log(results))
      .catch((error) => console.log(error));
  });
}

function geocode(request) {

  return geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;

      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}


initMap();
