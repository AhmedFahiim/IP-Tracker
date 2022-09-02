//   display the map
let map;
let marker;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: 59.325, lng: 18.07 },
  });

  marker = new google.maps.Marker({
    map,
    animation: google.maps.Animation.DROP,
    position: { lat: 59.327, lng: 18.067 },
  });
}

//   display the map
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------

let inputValue = document.getElementById("inputValue");
let actionButton = document.getElementById("action");
let allData = document.querySelectorAll(".data");

// fetching the address
async function getApi() {
  let key = "at_0milaqhleBAPvULF8LjZUn6r28Iyp";
  let data = (
    await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${key}&ipAddress=${inputValue.value}
      `
    )
  ).json();
  let finalData = await data;

  // consume data
  allData[0].textContent = finalData.ip;
  allData[1].textContent = ` ${finalData.location.city},${finalData.location.region}, ${finalData.location.country}`;
  allData[2].textContent = `${finalData.location.timezone} UTC`;
  allData[3].textContent = finalData.isp;
  loc = { lat: finalData.location.lat, lng: finalData.location.lng };

  // change the map location
  map.setCenter(loc);
  marker.setPosition(loc);
}

actionButton.onclick = () => {
  if (inputValue.value === "") {
    inputValue.value = "Please Enter Valid IP Address !!";
    inputValue.style.color = "red";
    return;
  } else getApi();
};
