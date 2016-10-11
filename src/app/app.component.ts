import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController } from 'ionic-angular';
import { StatusBar } from 'ionic-native'; // import { Splashscreen, StatusBar } from 'ionic-native'; //set splashscreen
import {AngularFire} from "angularfire2";

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';



@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  constructor(
    private platform: Platform,
    private af: AngularFire
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
    //check if logged in
    this.af.auth.subscribe(authData => {
      console.log("app", authData);
      if (authData) {
        this.nav.setRoot(TabsPage);
      } else {
        this.nav.setRoot(LoginPage);
      }
    });
  }
}
