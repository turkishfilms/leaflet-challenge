
const URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

const elMapo = L.map("map", {
    center: [-120.5253296, 35.9703331],
    zoom: 5
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(elMapo);

d3.json(URL).then(data => {
    data.features.forEach(feature => {
        const { properties: { mag }, geometry:{coordinates: [lat, lon, depth] }} = feature

        L.circleMarker([lat,lon], {
          color: `rgb(${scale(depth,-10,601,255,0)})`,      
          radius: scale(mag, 0,10,10,100)     
      }).addTo(elMapo).bindPopup(lat,lon,mag,depth);
    })
});

const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
} //from stackoverfow
