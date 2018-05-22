  //getting the current time in hours to be use in loop to check if store is open and how long till close
  var date = new Date();
  var time = date.getHours();

  var day;
  switch(new Date().getDay()) {
    case 0:
        day = "sunday_close";
        break;
    case 1:
        day = "monday_close";
        break;
    case 2:
        day = "tuesday_close";
        break;
    case 3:
        day = "wednesday_close";
        break;
    case 4:
        day = "thursday_close";
        break;
    case 5:
        day = "friday_close";
        break;
    case 6:
        day = "saturday_close";
  }

  function msmTo24time(msm) {
    var hour = msm / 60;
    var mins = msm % 60;

    return [hour, mins];
  }

  var gmarkers = [];

  function initMap() {
      //initialize map center and starting zoom
      var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: mapLat, lng: mapLong},
          zoom: 12
      });

      //Creating the selected park icon, location, marker and InfoWindow
      var park = {
        url: 'imgs/Park-icon.png',
        scaledSize: new google.maps.Size(100, 100)
      };
      var markerPark = new google.maps.Marker({
          position: {lat: mapLat, lng: mapLong},
          icon: park,
          animation: google.maps.Animation.DROP,
          map: map,
          title: locName
      });
      var infowindowPark = new google.maps.InfoWindow({
        content: "<div class='infoBox'><h2>" + locName + "</h2></div>"
      });
      markerPark.addListener('click', function() {
        infowindowPark.open(map, markerPark);
      });

      var infoWindow = new google.maps.InfoWindow();
      //Looping through JSON result set and creating a marker and other info for 10 closest stores
      for(var i = 0; i < lcbo.result.length; i++) {
          var storeAddress = lcbo.result[i].address_line_1 + ", " + lcbo.result[i].city + " " + lcbo.result[i].postal_code;
          var storeName = lcbo.result[i].name;

          //time and day calculations, output changes based on open vs closed
          var minstoMid = lcbo.result[i][day];
          var closeTime = msmTo24time(minstoMid);
          var status;
          if(time == closeTime[0] || time > closeTime[0]) {
            status = "<p class='closed'>Closed</p>";
          } else if (time < closeTime[0]) {
            status = "<p class='open'>Open, Closes in " + (closeTime[0] - time) + " hours</p>";
          }
          var infoContent = "<div class='infoBox'><h2>" + storeName + "</h2><p>" + storeAddress + "</p>" + status + "</div>";

          geocodeInfoAddress(storeAddress, infoWindow, infoContent, map);
      }
      //function that takes address geocodes it and adds infoWindow with correct info for each store
      function geocodeInfoAddress(address, infoWindow, info, map) {
        var gcoder = new google.maps.Geocoder();
        gcoder.geocode({
          address: address
        }, function(results, status) {
          if (status == 'OK') {
            var beer = {
              url: 'imgs/Beer-icon.png',
              scaledSize: new google.maps.Size(50, 50)
            };
            var marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
              icon: beer
            });
            google.maps.event.addListener(marker, 'click', function() {
              infoWindow.setContent(info);
              infoWindow.open(map, this);
              map.panTo(results[0].geometry.location);
            });
            gmarkers.push(marker);
          }
      });
    }
  }
  //function so that sidebar tags open infoWindow for correct park
  function clickStoreTag(i) {
    google.maps.event.trigger(gmarkers[i], "click");
  }
