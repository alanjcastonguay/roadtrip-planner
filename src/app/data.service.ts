import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  searchOrigin:string = "Toronto, Ontario, Canada";
  searchDestination:string = "Vancouver, British Columbia, Canada";
  searchMaximumDistanceInKm:number = 200;
}
