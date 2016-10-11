import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {GeoService} from '../../shared/geo/geo.service';
import {Observable} from 'rxjs/Observable';

declare var firebase:any;

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {
  constructor(
    private navCtrl: NavController,
    private geo: GeoService,
    private af: AngularFire
  ) {
    this.af.auth.subscribe(auth => {
      this.uid = auth.uid;
      this.invitations = this.af.database.list('/invitations/' + this.uid);
      Geolocation.getCurrentPosition().then(pos => {
        let geohash = this.geo.encode(pos.coords.latitude, pos.coords.longitude, 0.05);
        this.people = this.af.database.list('/events/' + geohash);
      });
    });
  }

  private invitations: FirebaseListObservable<any>;
  private people: FirebaseListObservable<any>;
  private contacts: FirebaseListObservable<any>;
  private isTracking: boolean;
  private uid: string;

  public sendInvitation(p) {

    this.af.database.list('/invitations/' + p.uid).push(this.uid);
    return false;
  }

  public acceptInvitation(i){

    //add contact to sender
    this.af.database.list('/contacts/' + i.uid).push(this.uid);

    //remove invitation
    this.af.database.list('/invitations/' + this.uid);

    //add contact to your list
    this.af.database.list('/contacts/' + this.uid).push(i.uid);

    return false;
  }

  public declineInvitations(i){
    //remove contact
    this.invitations.remove(i._id);
    return false;
  }

  public expandContact(c) {
    c.links = this.af.database.list('/details/' + c.key());
    return false;
  }

  public getAvatar(user){
    return Observable.create(observer => {
      firebase.storage().ref().child(this.uid + '.jpg')
      .getDownloadURL().then((url) => {
        observer.next(url);
        observer.complete();
      });
    });
  }
}
