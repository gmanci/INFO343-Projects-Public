/* add your script methods and logic here */

'use strict'; 


/* map variable*/
var map = L.map('map');

/* view set to America*/
map.setView([38.8, -98], 4);

/* creates map*/
var layer = L.tileLayer('https://api.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ21hbmNpIiwiYSI6ImNpZnZpMTN1dzIyeTl1NmtzM2U2eWpxb3QifQ.JywvFvRbnpbGVCwSPvXrlw', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'gmanci.cifvi12hk3fszoekr93zqqnrf',
    accessToken: 'pk.eyJ1IjoiZ21hbmNpIiwiYSI6ImNpZnZpMTN1dzIyeTl1NmtzM2U2eWpxb3QifQ.JywvFvRbnpbGVCwSPvXrlw'
}).addTo(map);

/* declares a weapon category using w/ and w/o weapons */
var withWeapon = L.layerGroup([]);
var withoutWeapon = L.layerGroup([]);
var weapons = {
    "Victims W/ Weapon": withWeapon,
    "Victims W/O Weapon": withoutWeapon
};
var withCounter = 0;
var withoutCounter = 0;

/* function used to place different colored points on map with summaries that show once clicked */
var plotPoints = function(data) {
    for (var i = 0; i < data.length; i++) {
        var summary = data[i].summary;
        if (data[i].armed == true){
            var marker = L.circle([data[i].lat, data[i].lng], 500, {
                color: 'DarkCyan'
            }).bindPopup(summary).addTo(withWeapon);
            withCounter++;
        } else {
            var marker = L.circle([data[i].lat, data[i].lng], 500, {
                color: 'MidnightBlue'
            }).bindPopup(summary).addTo(withoutWeapon);
            withoutCounter++;
        }
    }
    console.log(withCounter, withoutCounter);
}

/* makes small control panel to toggle showing armed and unarmed victims*/
L.control.layers(null, weapons).addTo(map);

/* makes sure data is loaded before points are plotted on map*/
$.getJSON('data/data.min.json').then(plotPoints);





