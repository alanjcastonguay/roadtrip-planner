import { Component, OnInit } from '@angular/core';
import { Request } from '../request';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  panelOpenState = false;
  model = new Request('', '', 15);

  submitted = false;

  onSubmit() {
    this.submitted = true;

    // var directionsService = new google.maps.DirectionsService;



  }

  constructor() {}

  ngOnInit() {
    /*
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        // map.setCenter(pos);
      }, function() {
        // handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      // handleLocationError(false, infoWindow, map.getCenter());
    }
    */
  }

  get diagnostic() { return JSON.stringify(this.model); }

}
