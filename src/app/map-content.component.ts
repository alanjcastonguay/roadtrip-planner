import {Component, OnInit, SimpleChange} from '@angular/core';

import {GoogleMapsAPIWrapper} from '@agm/core';
import { DataService } from './data.service';

declare var google: any;

@Component({
  selector: 'app-map-content',
  template: ''
})
export class MapContentComponent implements OnInit {

  constructor(public mapApiWrapper: GoogleMapsAPIWrapper, private dataService:DataService) {}

  map_instance = null;

  public static get_position_at_x_km_into_trip(distance_limit_meters, steps) {
    let distance_traveled = 0;
    for (const step of steps) {
      console.log(step);

      if (distance_traveled + step.distance.value > distance_limit_meters) {

        const step_length_meters = google.maps.geometry.spherical.computeDistanceBetween(step.start_point, step.end_point);
        const step_movement_ratio = (distance_limit_meters - distance_traveled) / step.distance.value;
        const partway_point_latlon = google.maps.geometry.spherical.interpolate(step.start_point, step.end_point, step_movement_ratio);
        return partway_point_latlon;
      }

      distance_traveled += step.distance.value;
    }
    return null;
  }

  public update(start_location, end_location, maximum_distance_meters, fitbounds) {
    const directions = new google.maps.DirectionsService;
    const map = this.map_instance;

    const map_content_component_reference = this;


    directions.route({
      origin: start_location,
      destination: end_location,
      travelMode: 'DRIVING'
    }, function(response, status) {
      console.log('Got directions response:');
      console.log(response);

      const start_marker = new google.maps.Marker({
        map: map,
        position: response.routes[0].legs[0].start_location
      });
      const end_marker = new google.maps.Marker({
        map: map,
        position: response.routes[0].legs[0].end_location
      });

      if (fitbounds) {
        map.fitBounds(response.routes[0].bounds);
      }

      const first_stop = MapContentComponent.get_position_at_x_km_into_trip(maximum_distance_meters, response.routes[0].legs[0].steps);
      console.log('First Stop:');
      console.log(first_stop);

      if (first_stop == null) {
        console.log('Reached destination');
        return;
      } else {
        console.log("first_stop", first_stop.toJSON());

        // Search ring for stop
        const first_stop_marker = new google.maps.Circle({
          strokeColor: '#FFFF00',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FFFF00',
          fillOpacity: 0.3,
          map: map,
          center: first_stop,
          radius: 25 * 1000  // 25km
        });

        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: first_stop,
          // rankBy: google.maps.places.RankBy.DISTANCE, // No Results
          radius: maximum_distance_meters / 5,
          type: ['gas_station']
        }, function(gas_station_places, status2) {
          console.log('Closest gas station', status2, gas_station_places);
          console.log(map);

          // We always just use the First result, and hope that it's a good/close one.
          map_content_component_reference.create_location_markers([gas_station_places[0]]);

          // Recursive
          map_content_component_reference.update(gas_station_places[0].geometry.location, end_location, maximum_distance_meters, false);
        });
      }

    });

  }

  create_location_markers(places) {
    const map = this.map_instance;

    for (let i = 0, place; place = places[i]; i++) {
      const image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      const marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

    }
  }

  ngAfterViewInit() {

    // viewChild is set after the view has been initialized
    console.log('AfterViewInit');

    this.mapApiWrapper.getNativeMap()
      .then((map) => {
        this.map_instance = map;

        console.log('Form values:')
        console.log(this.dataService.searchOrigin);
        console.log(this.dataService.searchDestination);
        console.log(this.dataService.searchMaximumDistanceInKm);

        // I have been manually updating core/services/google-maps-types.d.ts to include things they didn't include.
        console.log(this.map_instance.getZoom());

        const start_position = 'Seattle, WA';
        const end_location = 'Toronto, Ontario';
        // Hardcoded example of getting directions from remote API during load. Just logs the structure to console.

        this.update(start_position, end_location, 175000, true);

      });

  }
  ngOnInit() {

    /*this.mapApiWrapper.getNativeMap()
      .then((map) => {
        this.map_instance = map;
      });
      */
  }

}
