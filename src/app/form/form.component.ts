import { Component, OnInit } from '@angular/core';
import { Request } from '../request';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private dataService:DataService) {}

  panelOpenState = false;
  model = new Request('', '', 15);
  submitted = false;

  onSubmit(form: NgForm) {
    this.submitted = true;
    this.dataService.searchOrigin = this.model.origin;
    this.dataService.searchDestination = this.model.destination;
    this.dataService.searchMaximumDistanceInKm = this.model.maximum_distance_km;

    // var directionsService = new google.maps.DirectionsService;
  }


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
