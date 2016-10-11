import { Component } from '@angular/core';
import { ProfilePage } from '../profile/profile';
import { ContactsPage } from '../contacts/contacts';
import { EventPage } from '../event/event';
import { GeoService } from '../../shared/geo/geo.service';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
  providers: [
    GeoService
  ]
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor() {
    // Set tabs target links
    this.tab1Root = ProfilePage;
    this.tab2Root = ContactsPage;
    this.tab3Root = EventPage;
  }
}
