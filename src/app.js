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

function renderOrigin(data) {
  let firstInput = document.getElementsByClassName("origins")[0];
  while (firstInput.hasChildNodes()) {
    firstInput.removeChild(firstInput.firstChild);
  }
  data.features.forEach((location) => {
    firstInput.insertAdjacentHTML(
      `beforeend`,
      `<li data-long="${location.geometry.coordinates[0]}" data-lat="${
        location.geometry.coordinates[1]
      }" class="">
          <div class="name">${location.text}</div>
          <div>${
            !location.properties.address
              ? location.context[2].text
              : location.properties.address
          }</div>
        </li>
    `
    );
  });
}

function renderDestination(data) {
  let secondInput = document.getElementsByClassName("destinations")[0];
  while (secondInput.hasChildNodes()) {
    secondInput.removeChild(secondInput.firstChild);
  }
  data.features.forEach((location) => {
    secondInput.insertAdjacentHTML(
      `beforeend`,
      `<li data-long="${location.geometry.coordinates[0]}" data-lat="${location.geometry.coordinates[1]}" class="">
          <div class="name">${location.text}</div>
          <div>${location.properties.address}</div>
        </li>
    `
    );
  });
}

function planTrip() {
  let firstInput = document.getElementsByClassName("origins")[0];
  let secondInput = document.getElementsByClassName("destinations")[0];
  let options1Li = firstInput.querySelectorAll("li");
  let options2Li = secondInput.querySelectorAll("li");
  for (option of options1Li) {
    if (option.classList.contains("selected")) {
      lat1 = option.getAttribute("data-lat");
      lon1 = option.getAttribute("data-long");
    }
  }
  for (option of options2Li) {
    if (option.classList.contains("selected")) {
      lat2 = option.getAttribute("data-lat");
      lon2 = option.getAttribute("data-long");
    }
  }
  getTrip(
    `https://api.winnipegtransit.com/v3/trip-planner.json?api-key=FYkqe4oC7kGOnfP30xPB&origin=geo/${lat1},${lon1}&destination=geo/${lat2},${lon2}`
  )
    .then((data2) => renderTrip(data2))
    .catch((err) => console.log(err));
}

function renderTrip(data) {
  let output = document.getElementsByClassName("my-trip")[0];
  while (output.hasChildNodes()) {
    output.removeChild(output.firstChild);
  }
  let a = 0;
  data.plans.forEach((info) => {
    output.insertAdjacentHTML("beforeend", `<h2>Route ${a + 1}</h2>`);
    a++;
    for (let i = 0; i < info.segments.length; i++) {
      if (info.segments[i].type === "walk") {
        output.insertAdjacentHTML(
          "beforeend",
          `<li><i class="fas fa-walking" aria-hidden="true"></i>
            ${info.segments[i].type} for ${
            info.segments[i].times.durations.total
          } minutes to ${
            !info.segments[i].to.stop
              ? "destination"
              : info.segments[i].to.stop.name
          }
          </li>`
        );
      }
      if (info.segments[i].type === "ride") {
        output.insertAdjacentHTML(
          "beforeend",
          `<li><i class="fas fa-bus" aria-hidden="true"></i>
            ${info.segments[i].type} the ${info.segments[i].route.name} bus for ${info.segments[i].times.durations.total} minutes
          </li>`
        );
      }
      if (info.segments[i].type === "transfer") {
        output.insertAdjacentHTML(
          "beforeend",
          `<li><i class="fas fa-ticket-alt" aria-hidden="true"></i>
            ${info.segments[i].type} from ${info.segments[i].from.stop.name} to
            ${info.segments[i].to.stop.name}
          </li>`
        );
      }
    }
    output.insertAdjacentHTML("beforeend", `<hr>`);
  });
}
