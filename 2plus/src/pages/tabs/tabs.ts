import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';
import { LoginRegisterPage } from '../login-register/login-register';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider:MediaProvider) {
    this.LoginRegisterPage = LoginRegisterPage;
    this.HomePage = HomePage;
    this.ProfilePage = ProfilePage;
  }

  LoginRegisterPage: any;
  HomePage: any;
  ProfilePage: any;

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TabsPage');
    if(this.mediaProvider.hasLoggedIn == false){
      this.navCtrl.push(LoginRegisterPage);
    }
  }

}
