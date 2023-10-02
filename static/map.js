var map = new L.map('map', {
    center: [40, -100],
    zoom: 5,
    preferCanvas: true
})

var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

window.onload = function plotPoints(event) {
    event.preventDefault();

    fetch('https://university-database-2l7hgtbxv-travis-daos-projects.vercel.app/api/filter', {
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
            var markers = new L.MarkerClusterGroup();
            for (var name in data){
                markers.addLayer(L.marker([data[name][0], data[name][1]], {color: '#2C4251'}).bindTooltip(name, {
                    permanent: true,
                    direction: 'right'
                }));
            }
            map.addLayer(markers);
        })
        .catch(error => console.error('Error:', error));
}