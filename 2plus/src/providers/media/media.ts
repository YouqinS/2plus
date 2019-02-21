import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Media } from '../../interfaces/media';
import { User } from '../../interfaces/user';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  constructor(public http: HttpClient,
              public alertController: AlertController,
              public toastCtrl: ToastController) { }

  public hasLoggedIn:Boolean = false;
  token: string;


  login(){

  }



  getAllMedia(){
    //const url:string = 'http://media.mw.metropolia.fi/wbma/media?start=100&limit=5';
    const mediaPath:string = 'http://media.mw.metropolia.fi/wbma/media';

    return this.http.get<Media[]>(mediaPath);
  }

  getSingleMedia(file_id){
    const mediaURL:string = "http://media.mw.metropolia.fi/wbma/media/"+file_id;
    // console.log( "medial url : " + mediaURL );
    return  this.http.get<Media>(mediaURL);
  }








  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
