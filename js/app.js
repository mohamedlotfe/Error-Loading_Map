var linkedfunc,query,map,create_Place_Marker,marker, infowindow,len,  callback;
 var markers=[];
 
 //initlization function for loading map 
  function initMap() {

    var Egypt = {lat: 30.056508, lng: 31.337882};			//coordinates of center is my map 

    map = new google.maps.Map(document.getElementById('map'), {
      center: Egypt,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP, 
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
  self.filteredLocations = ko.observableArray([]);
      //self.filterText = ko.observable('');

  	  //
       callback=function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
 		       len=results.length;
          for (var i = 0; i <8; i++) {
 
            markers.push(results[i]);
          
          }
          linkedfunc();
        //search section  
        self.filteredLocations.ko.computed(function() {
              var filter = this.filter().toLowerCase();

              if (!filter) {
              
                // return observableArray
                return  self.filteredLocations;
             }
              else {
                // filter observableArray and return a subset of matching items
                return ko.utils.arrayFilter(self.filteredLocations, function(item) {
            return ko.utils.stringStartsWith(self.filteredLocations.name.toLowerCase(), filter);
             });
           }
      
          });
       } 
      };



         function linkedfunc(){

          for (var i =  0; i <markers.length ; i++) {
           create_Place_Marker( markers[i]);
          }
        
        }





      //create marker on places
	   create_Place_Marker=function (place) {
         marker = new google.maps.Marker({
          map: map,
          name: place.name,
          placeId: place.place_id,
          position: place.geometry.location
          });

         infowindow = new google.maps.InfoWindow();

         google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
                  

        //when i click on marcker itself
         google.maps.event.addListener(marker, 'click', function() {  

          var X="";
          var Y="";
          if(place.formatted_address !== undefined)
            X='address: '+place.formatted_address ;
          if(place.placeId !== undefined)
            Y='Place ID: '+place.placeId ;
         
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>'  + Y + '<br>' +
                X+ '</div>' );      
          infowindow.open(map, this);
          map.panTo(marker.position); 
          this.setAnimation(google.maps.Animation.BOUNCE);
          
          setTimeout(function(){
          	marker.setAnimation(null);
            }, 1300);
	        
	     });
         self.filteredLocations.push(marker);
      };

      

      //marked place when u press on displayed element itself 
      self.SetMarker = function(place){
          var X="";
          var Y="";
          if(place.formatted_address !== undefined)
            X='address: '+place.formatted_address ;
          if(place.placeId !== undefined)
            Y='Place ID: '+place.placeId ;
         
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>'  + Y + '<br>' +
                X+ '</div>' );      
          infowindow.open(map, this);
          map.panTo(marker.position); 
          this.setAnimation(google.maps.Animation.BOUNCE);
          
          setTimeout(function(){
            marker.setAnimation(null);
            }, 1300);

      };
    
}
//handle Error of loading map
mapError = () => {
  // Error handling
   $('#map').text('Error: Google Maps data could not be loaded');
};

$( document ).ready(function() {
    ko.applyBindings(new AppViewModel());
});
