/*
* Javascript for spotCalculator
* for SurfProx project
*
*
*
* by Hazen Breen
*/


/*
*
*
NOTES:

Example API call:
http://magicseaweed.com/api/aa7c27d863d5e5e6a592ad528479c91f/forecast/?spot_id=369&fields=localTimestamp,solidRating

Main page location:
file:///Users/Hazen/Documents/surfProxProject/surfProx/mainPage.html





*
*
*/


var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var myLocation = new google.maps.LatLng(myLat, myLng);
var myOptions = {
            zoom: 12, 
            center: myLocation,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
var map;
var userMarker;
var spotMarker;
var infowindow = new google.maps.InfoWindow();

/*
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = parseJSONData;
var object;
xhttp.open("GET", "https://guarded-ravine-54398.herokuapp.com/redline.json", true);
xhttp.send();

*/


/////////create stations///////////////
theWall          = new google.maps.LatLng(42.9366346,-70.8030722);
narragansett     = new google.maps.LatLng(41.435521, -71.455771);







var allStations = [theWall, narragansett];  

var allStationNames = ["The Wall", "Narragansett"]



//TODO: use start button to hide map: control flow should be 1) select time 2)press find button 3) map and description pop up
function onStartButtonClicked()
{
    console.log("Start Button is working!");

    //first get user location
    //  in theory, generate region or some other way to filter down from all locations
    //  in reality, only pulling from small list so no need to filter down


    //generate time drop down


    //generate Find Button
}

function onFindButtonClicked()
{
    console.log("Find Button is working!");

    //Go through nearby locations and find which are within time limit


    //Go through possible drivable locations and compare best rating


    //Show best location
    //  Show on map?
    //  Show route?
    //  Show rating?
}

function initMap()
{
    //first get user location
    //  in theory, generate region or some other way to filter down from all locations
    //  in reality, only pulling from small list so no need to filter down
    // navigator.geolocation.getCurrentPosition(createMyMarker);
    //createUserMarker();




    map = new google.maps.Map(document.getElementById('map'), myOptions);
    navigator.geolocation.getCurrentPosition(createMyMarker);
    // createMarkers();
    // createPolyline();
    // parseJSONData();
    console.log("Hello world!");
    //document.getElementById("findButton").onclick = onFindButtonClicked();
}




function createUserMarker()
{

}

/*

function findMyClosestStation()
{
    var closestDistance = 0.000621371192 * google.maps.geometry.spherical.computeDistanceBetween(myLocation, southStation);
    var currentDistance = 0;
    var closestStationNumber = 0;

    for (i = 0; i < 22; i++) {
        currentDistance = 0.000621371192 * google.maps.geometry.spherical.computeDistanceBetween(myLocation, allStations[i]);
        if (currentDistance < closestDistance){
            closestDistance = currentDistance;
            closestStationNumber = i;
        }
    }

    infowindow.setContent(marker.title + "<br />Closest Redline Station:  " + allStationNames[closestStationNumber] + 
                            "<br />Distance from you:  " + closestDistance.toFixed(2) + " miles");
    infowindow.open(map, marker);

    //create polyline
    var myLocationToClosestStation = [
        myLocation,
        allStations[closestStationNumber]
    ]
    
    var myLocationToClosestStationPath = new google.maps.Polyline({
      path: myLocationToClosestStation, 
      geodesic: true,
      strokeColor: '#0FFF00',
      strokeOpacity: 1.0,
      strokeWeight: 4
    });


    myLocationToClosestStationPath.setMap(map);
}
*/

function createMyMarker(position)
{

    myLat = position.coords.latitude;
    myLng = position.coords.longitude;

    myLocation = new google.maps.LatLng(myLat, myLng);
    map.setCenter(myLocation);

    marker = new google.maps.Marker({
        position: myLocation,
        title: "You are here!"
    });

    // Open info window on click of marker
    //google.maps.event.addListener(marker, 'click', findMyClosestStation);



    marker.setMap(map);

}


/*
function createMarkers()
{
    markerSouthStation = new google.maps.Marker({
        position: southStation,
        map: map,
        icon: 'T_logo.png'
    });
    var SSInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerSouthStation, 'click', function() {
        SSInfowindow.setContent(getSchedule("South Station"));
        SSInfowindow.open(map, markerSouthStation);
    })

    markerAndrew = new google.maps.Marker({
        position: andrew,
        map: map,
        icon: 'T_logo.png'
    });
    var andrewInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerAndrew, 'click', function() {
        andrewInfowindow.setContent(getSchedule("Andrew"));
        andrewInfowindow.open(map, markerAndrew);
    })

    markerPorterSquare = new google.maps.Marker({
        position: porterSquare,
        map: map,
        icon: 'T_logo.png'
    });
    var PSInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerPorterSquare, 'click', function() {
        PSInfowindow.setContent(getSchedule("Porter Square"));
        PSInfowindow.open(map, markerPorterSquare);
    })

    markerHarvardSquare = new google.maps.Marker({
        position: harvardSquare,
        map: map,
        icon: 'T_logo.png'
    });
    var HSInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerHarvardSquare, 'click', function() {
        HSInfowindow.setContent(getSchedule("Harvard Square"));
        HSInfowindow.open(map, markerHarvardSquare);
    })

    markerJFK = new google.maps.Marker({
        position: JFK,
        map: map,
        icon: 'T_logo.png'
    });
    var JFKInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerJFK, 'click', function() {
        JFKInfowindow.setContent(getSchedule("JFK/UMass"));
        JFKInfowindow.open(map, markerJFK);
    })

    markerSavinHill = new google.maps.Marker({
        position: savinHill,
        map: map,
        icon: 'T_logo.png'
    });
    var SHInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerSavinHill, 'click', function() {
        SHInfowindow.setContent(getSchedule("Savin Hill"));
        SHInfowindow.open(map, markerSavinHill);
    })

    markerParkStreet = new google.maps.Marker({
        position: parkStreet,
        map: map,
        icon: 'T_logo.png'
    });
    var ParkSInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerParkStreet, 'click', function() {
        ParkSInfowindow.setContent(getSchedule("Park Street"));
        ParkSInfowindow.open(map, markerParkStreet);
    })

    markerBroadway = new google.maps.Marker({
        position: broadway ,
        map: map,
        icon: 'T_logo.png'
    });
    var BInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerBroadway, 'click', function() {
        BInfowindow.setContent(getSchedule("Broadway"));
        BInfowindow.open(map, markerBroadway);
    })

    markerNorthQuincy = new google.maps.Marker({
        position: northQuincy,
        map: map,
        icon: 'T_logo.png'
    });
    var NQInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerNorthQuincy, 'click', function() {
        NQInfowindow.setContent(getSchedule("North Quincy"));
        NQInfowindow.open(map, markerNorthQuincy);
    })

    markerShawmut = new google.maps.Marker({
        position: shawmut,
        map: map,
        icon: 'T_logo.png'
    });
    var ShawmutInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerShawmut, 'click', function() {
        ShawmutInfowindow.setContent(getSchedule("Shawmut"));
        ShawmutInfowindow.open(map, markerShawmut);
    })

    markerDavis = new google.maps.Marker({
        position: davis,
        map: map,
        icon: 'T_logo.png'
    });
    var DavisInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerDavis, 'click', function() {
        DavisInfowindow.setContent(getSchedule("Davis"));
        DavisInfowindow.open(map, markerDavis);
    })

    markerAlewife = new google.maps.Marker({
        position: alewife,
        map: map,
        icon: 'T_logo.png'
    });
    var AlewifeInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerAlewife, 'click', function() {
        AlewifeInfowindow.setContent(getSchedule("Alewife"));
        AlewifeInfowindow.open(map, markerAlewife);
    })

    markerKendalLMIT = new google.maps.Marker({
        position: kendallMIT,
        map: map,
        icon: 'T_logo.png'
    });
    var KMInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerKendalLMIT, 'click', function() {
        KMInfowindow.setContent(getSchedule("Kendall/MIT"));
        KMInfowindow.open(map, markerKendalLMIT);
    })

    markerCharlesMGH= new google.maps.Marker({
        position: charlesMGH,
        map: map,
        icon: 'T_logo.png'
    });
    var CMGHInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerCharlesMGH, 'click', function() {
        CMGHInfowindow.setContent(getSchedule("Charles/MGH"));
        CMGHInfowindow.open(map, markerCharlesMGH);
    })

    markerDowntownCrossing = new google.maps.Marker({
        position: downtownCrossing,
        map: map,
        icon: 'T_logo.png'
    });
    var DCInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerDowntownCrossing, 'click', function() {
        DCInfowindow.setContent(getSchedule("Downtown Crossing"));
        DCInfowindow.open(map, markerDowntownCrossing);
    })

    markerQuincyCenter = new google.maps.Marker({
        position: quincyCenter,
        map: map,
        icon: 'T_logo.png'
    });
    var QCInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerQuincyCenter, 'click', function() {
        QCInfowindow.setContent(getSchedule("Quincy Center"));
        QCInfowindow.open(map, markerQuincyCenter);
    })

    markerQuincyAdams = new google.maps.Marker({
        position: quincyAdams,
        map: map,
        icon: 'T_logo.png'
    });
    var QAInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerQuincyAdams, 'click', function() {
        QAInfowindow.setContent(getSchedule("Quincy Adams"));
        QAInfowindow.open(map, markerQuincyAdams);
    })

    markerAshmont = new google.maps.Marker({
        position: ashmont,
        map: map,
        icon: 'T_logo.png'
    });
    var AshInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerAshmont, 'click', function() {
        AshInfowindow.setContent(getSchedule("Ashmont"));
        AshInfowindow.open(map, markerAshmont);
    })

    markerWollaston = new google.maps.Marker({
        position: wollaston,
        map: map,
        icon: 'T_logo.png'
    });
    var WollInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerWollaston, 'click', function() {
        WollInfowindow.setContent(getSchedule("Wollaston"));
        WollInfowindow.open(map, markerWollaston);
    })

    markerFieldsCorner = new google.maps.Marker({
        position: fieldsCorner,
        map: map,
        icon: 'T_logo.png'
    });
    var FCInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerFieldsCorner, 'click', function() {
        FCInfowindow.setContent(getSchedule("Fields Corner"));
        FCInfowindow.open(map, markerFieldsCorner);
    })

    markerCentralSquare = new google.maps.Marker({
        position: centralSquare,
        map: map,
        icon: 'T_logo.png'
    });
    var CSInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerCentralSquare, 'click', function() {
        CSInfowindow.setContent(getSchedule("Central Square"));
        CSInfowindow.open(map, markerCentralSquare);
    })

    markerBraintree = new google.maps.Marker({
        position: braintree,
        map: map,
        icon: 'T_logo.png'
    });
    var BtInfowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(markerBraintree, 'click', function() {
        BtInfowindow.setContent(getSchedule("Braintree"));
        BtInfowindow.open(map, markerBraintree);
    })
}





function getSchedule(name) {

    var schedule = "Train Schedule <br/>Destination: Time to Arrival in Station<br /><br />";
    var minutesToArrival;
    var secondsToArrival;
    var stringSecondsToArrival;

    for (var i = 0; i < object.TripList.Trips.length; i++) {
        for (var j = 0; j < object.TripList.Trips[i].Predictions.length; j++) {
            if (name == object.TripList.Trips[i].Predictions[j].Stop) {

                minutesToArrival = 0;
                secondsToArrival = (object.TripList.Trips[i].Predictions[j].Seconds)

                //convert from seconds to minutes and seconds
                while (secondsToArrival > 60) {
                    minutesToArrival += 1;
                    secondsToArrival -= 60;
                }

                if (secondsToArrival < 0) { // if train just left
                    secondsToArrival = Math.abs(secondsToArrival);
                    stringSecondsToArrival = secondsToArrival.toString();
                    schedule += object.TripList.Trips[i].Destination + ": -" + minutesToArrival + 
                        ":" + stringSecondsToArrival + "<br/>";
                } else if (secondsToArrival < 10) { //if number of seconds is less than 10 prepend 0
                    stringSecondsToArrival = "0" + secondsToArrival.toString();
                    schedule += object.TripList.Trips[i].Destination + ": " + minutesToArrival + 
                        ":" + stringSecondsToArrival + "<br/>";
                } else { //print normal
                    stringSecondsToArrival = secondsToArrival.toString();
                    schedule += object.TripList.Trips[i].Destination + ": " + minutesToArrival + 
                        ":" + stringSecondsToArrival + "<br/>";
                }
            }            
        }
    }
    return schedule;
}




function parseJSONData() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
       object = JSON.parse(xhttp.responseText);
    }
}
*/