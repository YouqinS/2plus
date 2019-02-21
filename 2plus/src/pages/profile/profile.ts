import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userAuth: UserAuthenticationProvider,
              public mediaProvider:MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  logout() {

  }

  goToMyFiles() {

  }
}
