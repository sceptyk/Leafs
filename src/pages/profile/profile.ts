import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
import {ImagePicker, Camera} from 'ionic-native';

import {UserService} from '../../shared/user/user.service';
import {User, ILink, Link, Card} from '../../shared/model/user.model';
import {AddLinkPage} from './modal/add-link';

declare var firebase: any;

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  private user: User = <User>{
    card: new Card(),
    links: null
  };

  private newLink: Link = new Link();

  private EDIT_MODE = false;

  private card: FirebaseObjectObservable<any>;
  private links: FirebaseListObservable<any>;
  private uid: string;
  private image: string = null;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private af: AngularFire
  ) {
    this.af.auth.subscribe(auth => {
      this.uid = auth.uid;
      this.card = this.af.database.object('/users/' + auth.uid);
      this.card.subscribe(data => {
        if (data.$value == null) {

        }
        this.user.card = new Card().fromObject(data);
        firebase.storage().ref().child(this.uid + '.jpg')
          .getDownloadURL().then(url => {
            this.user.card.avatar = url;
          })
          .catch(err => {
            console.log(err);
          });
      });

      this.links = this.af.database.list('/details/' + auth.uid);
      this.links.subscribe(data => {
        this.user.links = data;
        console.log(this.user);
      });
    });
  }

  public addLink() {
    this.links.push(this.newLink.toJSON());
    this.newLink = new Link();
    return false;
  }

  public updateLink(link) {
    this.links.update(link.$key, link);
    return false;
  }

  public removeLink(link) {
    this.links.remove(link.$key);
    return false;
  }

  public updateCard() {
    this.card.update(this.user.card.toJSON());
    this.uploadAvatar();
    return false;
  }

  public uploadAvatar() {
    firebase
      .storage()
      .ref()
      .child(this.uid + '.jpg')
      .putString(this.image, 'base64')
      .then(() => {
        console.log("Image uploaded");
      })
  }

  public takePhoto() {
    Camera.getPicture({
      targetWidth: 285,
      targetHeight: 285,
      cameraDirection: Camera.Direction.FRONT
    }).then((imageData) => {
      console.log(imageData);
      this.image = imageData;
    });
  }

  openModal(characterNum) {

    let modal = this.modalCtrl.create(AddLinkPage, characterNum);
    modal.present();
  }

}