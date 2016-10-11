import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { ContactsPage } from '../pages/contacts/contacts';
import { EventPage } from '../pages/event/event';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    ProfilePage,
    ContactsPage,
    EventPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCnIhpyAZwQ9siUBO076JYvglFTqPRLFKQ',
      authDomain: 'leaf-api.firebaseapp.com',
      databaseURL: 'https://leaf-api.firebaseio.com/',
      storageBucket: 'gs://firebase-leaf-api.appspot.com'
    })
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    ProfilePage,
    ContactsPage,
    EventPage
  ],
  providers: []
})
export class AppModule {}
