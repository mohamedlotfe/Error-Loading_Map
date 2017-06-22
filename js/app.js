  var linkedfunc,removeMarkers,map,create_Place_Marker,marker, infowindow,len,  callback;
 var aux_array=[];
 var temp=0;
//initlization function for loading map 
  function initMap() {
    var Egypt = {lat: 30.056508, lng: 31.337882};			//coordinates of center of my map 

    map = new google.maps.Map(document.getElementById('map'), {
      center: Egypt,
      zoom: 15,
      styles:[
    {
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#f49f53"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "color": "#f9ddc5"
            },
            {
                "lightness": -7
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 43
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "color": "#645c20"
            },
            {
                "lightness": 38
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#1994bf"
            },
            {
                "saturation": -69
            },
            {
                "gamma": 0.99
            },
            {
                "lightness": 43
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f19f53"
            },
            {
                "weight": 1.3
            },
            {
                "visibility": "on"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "poi.business"
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "color": "#645c20"
            },
            {
                "lightness": 39
            }
        ]
    },
    {
        "featureType": "poi.school",
        "stylers": [
            {
                "color": "#a95521"
            },
            {
                "lightness": 35
            }
        ]
    },
    {},
    {
        "featureType": "poi.medical",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 38
            },
            {
                "visibility": "off"
            }
        ]
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {
        "elementType": "labels"
    },
    {
        "featureType": "poi.sports_complex",
        "stylers": [
            {
                "color": "#9e5916"
            },
            {
                "lightness": 32
            }
        ]
    },
    {},
    {
        "featureType": "poi.government",
        "stylers": [
            {
                "color": "#9e5916"
            },
            {
                "lightness": 46
            }
        ]
    },
    {
        "featureType": "transit.station",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 22
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "lightness": 38
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#f19f53"
            },
            {
                "lightness": -10
            }
        ]
    },
    {},
    {},
    {}
]
    });

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: Egypt,radius: 700,
      type: ['bank'] }, 
     callback);

  }

// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
 
  var setValue;
   var self = this;
  self.valid_locations =ko.observableArray();

  
      
  	  //
       callback=function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
 		       len=results.length;
          for (var i = 0; i <8; i++) {
            //create_Place_Marker(results[i]);
            aux_array.push(results[i]);
          }
          search();
          linkedfunc();
           //results.forEach(setValue);
        }
      }

      //create marker on places
	   create_Place_Marker=function (place) {
         marker = new google.maps.Marker({
          map: map,
          place_id: place.place_id,
          name: place.name,
          position: place.geometry.location
          });

         infowindow = new google.maps.InfoWindow();
         google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
          
        self.valid_locations.push(marker); //append new marker ...loop
        

        //when i click on marcker itself
         google.maps.event.addListener(marker, 'click', function() {      
          var X="";
          if(place.formatted_address)
            X=place.formatted_address ;
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Place ID: ' + place.place_id + '<br>' +
                X+ '</div>' );      
          infowindow.open(map, this);
          map.panTo(marker.position); 
          marker.setAnimation(google.maps.Animation.BOUNCE);
          
          setTimeout(function(){
          	marker.setAnimation(null);
            }, 1300);
	        
	     });
      }

         function linkedfunc(){

          for (var i =  0; i <aux_array.length ; i++) {
           create_Place_Marker( aux_array[i]);
          }

        }

      function search()
      {

       var input = (document.getElementById('LocInput'));
       var searchBox = new google.maps.places.SearchBox(input);
       var bounds = new google.maps.LatLngBounds();  
       map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }
         
          aux_array=[];
          //clearMarkers();
          self.valid_locations.removeAll();
          //set new markers for locations
          for(var j=0;j<5;j++){
            aux_array.push(places[j]);
            create_Place_Marker(places[j]);
            //setValue(places[j]);
            //bounds.extend(places[j].geometry.location);   
          }
                  map.fitBounds(bounds); 
        });

         google.maps.event.addListener(map, 'bounds_changed', function(){
            var bounds = map.getBounds();
            searchBox.setBounds(bounds);
          });
      
      }

      //marked place when u press on displayed element itself 
      self.SetMarker = function(place){
	    infowindow.setContent(place.name+" "+place.vicinity);
          infowindow.open(map, this);	
          map.panTo(marker.position); 

      }
    


       setValue = function(place){
		var Temp_Location = {};    
    	Temp_Location.name = place.name;
    	Temp_Location.position = place.geometry.location.toString();
    	self.valid_locations.push(Temp_Location);
      }

    /*   function clearMarkers() {
      for (var i = 0; i < aux_array.length; i++ ) {
        if (aux_array[i]) {
          aux_array[i].setMap(null);
        }
      }

      // reset markers
      markers = []; 
    } 
///clear marker =0
 removeMarkers =function()
  {
    for (var i = 0; i <6 ; i++) {
      self.valid_locations.pop();      
    }

//    self.valid_locations.removeAll();
  }
*/

      

       
 



}
$( document ).ready(function() {
    ko.applyBindings(new AppViewModel());
});
