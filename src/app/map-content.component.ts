import {Component, OnInit} from '@angular/core';

import {GoogleMapsAPIWrapper} from '@agm/core';

declare var google: any;

@Component({
  selector: 'app-map-content',
  template: ''
})
export class MapContentComponent implements OnInit {

  constructor(public mapApiWrapper: GoogleMapsAPIWrapper) {

  }

  ngOnInit() {

    function createMarkers(map, places) {
      for (let i = 0, place; place = places[i]; i++) {
        const image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        let marker = new google.maps.Marker({
          map: map,
          icon: image,
          title: place.name,
          position: place.geometry.location
        });

      }
    }

    this.mapApiWrapper.getNativeMap()
      .then((map) => {

        // I have been manually updating core/services/google-maps-types.d.ts to include things they didn't include.
        console.log(map.getZoom());

        // London Ontario
        const position = new google.maps.LatLng(42.9487956, -81.3887036);

        // Hardcoded example of getting directions from remote API during load. Just logs the structure to console.
        const directions = new google.maps.DirectionsService;

        directions.route({
          origin: position,
          destination: 'Toronto, Ontario',
          travelMode: 'DRIVING'
        }, function(response, status) {
          console.log('Got directions response:');
          console.log(response);

          let start_marker = new google.maps.Marker({
            map: map,
            position: response.routes[0].legs[0].start_location
          });
          let end_marker = new google.maps.Marker({
            map: map,
            position: response.routes[0].legs[0].end_location
          });


          function get_position_at_x_km_into_trip(distance_limit_meters, steps) {
            let distance_traveled = 0;
            for (const step of steps) {
              console.log(step);

              if (distance_traveled + step.distance.value > distance_limit_meters) {
                return step.start_point;
              }

              distance_traveled += step.distance.value;
            }
            return null;
          }

          const first_stop = get_position_at_x_km_into_trip(1000 * 100, response.routes[0].legs[0].steps);
          console.log("First Stop:");
          console.log(first_stop);

          const first_stop_marker = new google.maps.Circle({
            strokeColor: '#FFFF00',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FFFF00',
            fillOpacity: 0.3,
            map: map,
            center: first_stop,
            radius: 15 * 1000
          });

          const service = new google.maps.places.PlacesService(map);
          service.nearbySearch({
            location: first_stop,
            rankBy: google.maps.places.RankBy.DISTANCE,
            type: ['gas_station']
          }, function(response2, status2) {
            console.log("Closest gas station");
            console.log(response2[0]);
            console.log(map);
            createMarkers(map,[
              response2[0],
            ]);
            map.fitBounds(response.routes[0].bounds);
          });

        });

      });

  }

}
