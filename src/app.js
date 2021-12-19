function getGeoLocation(source) {
  return fetch(source).then((response) => response.json());
}

function getTrip(source) {
  return fetch(source).then((response) => response.json());
}

function getFirstData(data) {
  getGeoLocation(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${data}.json?bbox=-97.325875,49.766204,-96.953987,49.99275&access_token=pk.eyJ1IjoiZGVmYXVsdHVzZXIiLCJhIjoiY2t4Y2ZzdGRpMW9vMDJ3cnlzNHhtNWZyaiJ9.A23Ri4cSq3C5FY1lTtFb9g`
  )
    .then((data2) => renderOrigin(data2))
    .catch((err) => console.log(err));
}
function getSecondData(data) {
  getGeoLocation(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${data}.json?bbox=-97.325875,49.766204,-96.953987,49.99275&access_token=pk.eyJ1IjoiZGVmYXVsdHVzZXIiLCJhIjoiY2t4Y2ZzdGRpMW9vMDJ3cnlzNHhtNWZyaiJ9.A23Ri4cSq3C5FY1lTtFb9g`
  )
    .then((data2) => renderDestination(data2))
    .catch((err) => console.log(err));
}

