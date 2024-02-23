var ISOK = 200;
var jsObject;
var done;
let map;

async function initMap(latitude, longitude ) {
    const position = { lat: latitude, lng: longitude };
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  
    // The map, centered at Uluru
    map = new Map(document.getElementById("map"), {
      zoom: 4,
      center: position,
      mapId: "DEMO_MAP_ID",
    });
  
    // The marker, positioned at Uluru
    const marker = new AdvancedMarkerElement({
      map: map,
      position: position,
      title: "Uluru",
    });
}
  

function displayData(){
    let long = document.getElementById("longitude");
    let lat = document.getElementById("latitude");
    let alt = document.getElementById("altitude");
    long.value = jsObject.longitude;
    lat.value = jsObject.latitude;
    alt.value = jsObject.altitude;
    initMap(parseFloat(lat), parseFloat(long));
}

function getJSONAsync(url){
    var request = new XMLHttpRequest();
    request.onload = function(){
        if(request.status === ISOK){
            jsObject = JSON.parse(request.responseText);
            displayData();
            console.log(jsObject);
            if(!done){
                setTimeout(getJSONAsync(url), 500000);
            }
        }
    }
    request.open("GET", url, true);
    request.send();

   
}

function getDataAsync(){
    var url = "https://api.wheretheiss.at/v1/satellites/25544";
    getJSONAsync(url);
}