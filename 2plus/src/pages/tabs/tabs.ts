import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';
import { LoginRegisterPage } from '../login-register/login-register';
import { ProfilePage } from '../profile/profile';
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
import { User } from '../../interfaces/user';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userAuth:UserAuthenticationProvider,
              public mediaProvider:MediaProvider)
  {
    this.LoginRegisterPage = LoginRegisterPage;
    this.HomePage = HomePage;
    this.ProfilePage = ProfilePage;
  }

  LoginRegisterPage: any;
  HomePage: any;
  ProfilePage: any;

  ngOnInit() {
    this.checkToken();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TabsPage');
  }


  public checkToken(){
    console.log('token: ', localStorage.getItem('token'));
    if (localStorage.getItem('token') !== null) {
      this.userAuth.checkToken().subscribe((user: User) => {
        this.userAuth.user = user;
        console.log(user.username + " / " + user.user_id);
        this.userAuth.hasLoggedIn = true;
      });
    }
  }

}
