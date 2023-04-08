
// Initialize and add the map
let map;
let marker;
let geocoder;

function initMap() {
  // Request needed libraries.

 // const { Map } = await google.maps.importLibrary("maps");

  // The map, centered on the user's current location
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    mapTypeControl: false,
  });

  geocoder = new google.maps.Geocoder();

  // Try HTML5 geolocation to center the map on the user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        map.setCenter(pos);
        marker = new google.maps.Marker({
          map: map,
          position: pos,
          title: "User Location",
        });
      },
      () => {
        handleLocationError(true, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
  }

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          map.setCenter(pos);
          marker.setPosition(pos);
          marker.setMap(map);
        },
        () => {
          handleLocationError(true, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, pos) {
  alert(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  // Center the map on the contiguous US if geolocation doesn't work
  map.setCenter({ lat: 38.000, lng: -97.000 });
}
//function pins on map
window.initMap = initMap;
//Look into maybe moving the marker instead of recreating the map
// Add event listener to search button
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
  const input = document.querySelector("input[type=text]");
  const address = input.value;
  let type = ''; // add initialization for type variable
 // let radius = ''; // add initialization for radius variable

 map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    mapTypeControl: false,
  });

  geocode({ address })
    .then((results) => console.log(results))
    .catch((error) => console.log(error));

});


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

//initMap();
