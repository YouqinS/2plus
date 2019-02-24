import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Media } from '../../interfaces/media';
import { Observable } from 'rxjs';
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
import { User } from '../../interfaces/user';
import { LoginRegisterPage } from '../login-register/login-register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mediaStoragePath = 'http://media.mw.metropolia.fi/wbma/uploads/';
  mediaArray:Observable<Media[]>;


  constructor(public navCtrl: NavController, public mediaProvider:MediaProvider, public userAuth:UserAuthenticationProvider) { }

  ngOnInit() {
    this.getAllMedia();
  }


  getAllMedia(){
    console.log("getting all media?");
    this.mediaArray = this.mediaProvider.getAllMedia();
  }


  viewBiggerImg(file_id: number) {

  }

}
