//---------------Model
var map;
// Create a new blank array for all the listing markers.
var markers = [];
var saved = [];
var polygon = null;
var area = 0;
var contentStreet;
var largeInfowindow;
var locations = [{
        title: 'Park Ave Penthouse',
        location: {
            lat: 40.7713024,
            lng: -73.9632393
        }
    },
    {
        title: 'Chelsea Loft',
        location: {
            lat: 40.7444883,
            lng: -73.9949465
        }
    },
    {
        title: 'Union Square Open Floor Plan',
        location: {
            lat: 40.7347062,
            lng: -73.9895759
        }
    },
    {
        title: 'East Village Hip Studio',
        location: {
            lat: 40.7281777,
            lng: -73.984377
        }
    },
    {
        title: 'TriBeCa Artsy Bachelor Pad',
        location: {
            lat: 40.7195264,
            lng: -74.0089934
        }
    },
    {
        title: 'Chinatown Homey Space',
        location: {
            lat: 40.7180628,
            lng: -73.9961237
        }
    }
];

function initMap() {
    // Create a styles array to use with the map.
    var styles = [{
            elementType: 'geometry',
            stylers: [{
                color: '#242f3e'
            }]
        },
        {
            elementType: 'labels.text.stroke',
            stylers: [{
                color: '#242f3e'
            }]
        },
        {
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#746855'
            }]
        },
        {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#d59563'
            }]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#d59563'
            }]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{
                color: '#263c3f'
            }]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#6b9a76'
            }]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{
                color: '#38414e'
            }]
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{
                color: '#212a37'
            }]
        },
        {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#9ca5b3'
            }]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{
                color: '#746855'
            }]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{
                color: '#1f2835'
            }]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#f3d19c'
            }]
        },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{
                color: '#2f3948'
            }]
        },
        {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#d59563'
            }]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{
                color: '#17263c'
            }]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#515c6d'
            }]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{
                color: '#17263c'
            }]
        }
    ];
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.7413549,
            lng: -73.9980244
        },
        zoom: 13,
        styles: styles,
        mapTypeControl: false
    });

    // These are the real estate listings that will be shown to the user.
    // Normally we'd have these in a database instead.
    largeInfowindow = new google.maps.InfoWindow();
    // Style the markers a bit. This will be our listing marker icon.

    var defaultIcon = makeMarkerIcon('FFFF24');
    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('0091ff');
    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open the large infowindow at each marker.
        // Show Listings by Deafult
        showListings();
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);

        });
        // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        });
    }

}
//Google Map API Exception Handling
googleapiError = () => {
    ViewModel.showError(true);
    ViewModel.error('Sorry! Maps not able to load');

};
// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
    toggleBounce(marker);

    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {

        // Clear the infowindow content to give the streetview time to load.
        infowindow.setContent('');
        infowindow.marker = marker;
        // Add Weather
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
            marker.setAnimation(null);
        });
        fetchFourSquare(marker);
        // Open the infowindow on the correct marker.
        if (infowindow) {
            infowindow.close();
        }
        infowindow.open(map, marker);
    }


}


function fetchFourSquare(marker) {
    var data;
    contentFour = "";
    $.ajax({
        url: 'https://api.foursquare.com/v2/venues/search',
        dataType: 'json',
        data: 'client_id=FVRNLKZDCN45OVJVBTBGB3KKG3WONRYVQRN2XRFWJAU1X3Z5&client_secret=OUX5LTUMSATZKBUA5LWW3APUSKJT0AZPDHRT3VB3R1WLYPZ1&v=20130815%20&ll=+' + marker.position.lat() + ',' + marker.position.lng() + '%20&query=Restaurants',
        async: true,
    }).done(function(response) {
        data = response.response.venues;
        if (response) {
            contentFour = '<center><h1>' + marker.title + '</h1></center>';
            contentFour += '<br><div id="restaurants">Top Nearby Restaurants:</div><br>';
            contentFour += '<ul class="list-group">';
            for (var i = 0; i < 5;) {
                //For Different Restaurants:
                if (i > 0 && (data[i].name == data[i - 1].name)) {
                    i++;
                    continue;
                }
                contentFour += '<li class="list-group-item">' + data[i].name;
                if (data[i].url != undefined)
                    contentFour += '(<a href="' + data[i].url + '">' + data[i].url + ')' + '</a></li>';
                i++;
            }
            contentFour += '</ul>';
        } else {
            contentFour = '<div class="alert alert-danger">Response not available!</div>';
        }
        largeInfowindow.setContent(contentFour);
    }).fail(function(response, status, error) {
        contentFour = 'Could not load restaurants';
        largeInfowindow.setContent(contentFour);
    });


}


// This function will loop through the markers array and display them all.
function showListings() {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    }
    google.maps.event.addDomListener(window, 'resize', function() {
        map.fitBounds(bounds);
    });
}
// This function will loop through the listings and hide them all.
function hideListings() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

function toggleBounce(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
        marker.setAnimation(null);
    }, 730);
}
// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;

}

function highlightMarker(data) {


    if (largeInfowindow.marker != data.location) {
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].title == data.title) {
                populateInfoWindow(markers[i], largeInfowindow);
                break;
            }
        }
    }

}

function showWeather() {
    if (ViewModel.showWeatherConditions() == true)
        ViewModel.showWeatherConditions(false);
    else
        ViewModel.showWeatherConditions(true);

    $.ajax({
        url: "http://api.wunderground.com/api/f2f52c5ecd1ac257/conditions/q/+" + locations[0].location.lat + "," + locations[0].location.lng + ".json",
        dataType: 'json',
        async: true
    }).done(function(data) {
        if (data) {
            articles = data.current_observation;
            content = 'Weather: ' + articles.weather + '<br>';
            content += 'Temperature: ' + articles.temperature_string;
            var infowindow = new google.maps.InfoWindow();

            ViewModel.myWeather(content);
            ViewModel.imageWeatherPath(articles.icon_url);
        } else {
            ViewModel.myWeather('Response not available!');
        }
    }).fail(function(response, status, data) {
        ViewModel.imageWeatherPath('https://cdn4.iconfinder.com/data/icons/basic-interface-overcolor/512/forbidden-128.png');
        ViewModel.myWeather('Failed to Load Weather today');
    });

}
//---------------------------View Model
var ViewModel = {
    error: ko.observable(''),
    showError: ko.observable(false),
    areaCal: ko.observable(area),
    showArea: ko.observable(false), //Toggle Visibility
    showMyList: ko.observable(true),
    list: ko.observableArray([]),
    query: ko.observable(''),
    //Search function for live search
    search: function(value) {
        ViewModel.showMyList(false);
        ViewModel.list.removeAll();
        if (value == '') {
            ViewModel.showMyList(true);
            for (var i = 0; i < markers.length; i++) {
                markers[i].setVisible(true);
            }
            return;
        }
        for (var i = 0; i < markers.length; i++) {
            markers[i].setVisible(false);
        }
        for (var location in locations) {

            if (locations[location].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                ViewModel.list.push(locations[location]);

                var key = locations[location].location;
                for (var j = 0; j < markers.length; j++) {
                    if (markers[j].position.lat().toFixed(5) == key.lat.toFixed(5)) {
                        if (markers[j].position.lng().toFixed(5) == key.lng.toFixed(5)) {
                            markers[j].setVisible(true);
                        }
                    }

                }

            }
        }
    },
    showWeatherConditions: ko.observable(false),
    imageWeatherPath: ko.observable(""),
    myWeather: ko.observable("")
};

ViewModel.query.subscribe(ViewModel.search);
ko.applyBindings(ViewModel);