import { IonicPage, Nav, NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';


export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  // Basic root for our content view
  rootPage = 'TabsPage';

  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  pages: PageInterface[] = [
    { title: 'Home', pageName: 'Homepage', tabComponent: 'Homepage', index: 0, icon: 'home' },
    { title: 'Upload', pageName: 'MyItemsPage', tabComponent: 'UploadPage', index: 1, icon: 'contacts' },
    { title: 'Search', pageName: 'MyItemsPage', tabComponent: 'SearchPage', index: 2, icon: 'contacts' },
    { title: 'My Items', pageName: 'MyItemsPage', tabComponent: 'MyItemsPage', index: 3, icon: 'contacts' },
    { title: 'Profile', pageName: 'ProfilePage', icon: 'shuffle' },
    { title: 'Logout', pageName: 'LogoutPage', icon: 'shuffle' },
  ];

  constructor(public navCtrl: NavController) { }

  openPage(page: PageInterface) {
    let params = {};

    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      // Tabs are not active, so reset the root page
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.pageName, params);
    }
  }

  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNav();

    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }

}
