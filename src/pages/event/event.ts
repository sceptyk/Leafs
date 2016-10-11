import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
import {Geolocation} from 'ionic-native';
import {GeoService} from '../../shared/geo/geo.service';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {
  constructor(
    private navCtrl: NavController,
    private af: AngularFire,
    private geo: GeoService
  ){

    this.af.auth.subscribe(auth => {
      this.uid = auth.uid;
      
    });

  }

  private uid:string;
  private events:FirebaseListObservable<any>;

  public checkIn(){

  }

}
