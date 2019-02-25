import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Media } from '../../interfaces/media';
import { User } from '../../interfaces/user';
import { LoginResponse } from '../../interfaces/loginResponse';

@Injectable()
export class MediaProvider {

  constructor(public http: HttpClient,
              public alertController: AlertController,
              public toastCtrl: ToastController) { }



  getAllMedia(){
    //const url:string = 'http://media.mw.metropolia.fi/wbma/media?start=100&limit=5';
    const mediaPath:string = 'http://media.mw.metropolia.fi/wbma/media';

    return this.http.get<Media[]>(mediaPath);
  }


  getAllMediaByTags(tag){
    //const url:string = 'http://media.mw.metropolia.fi/wbma/media?start=100&limit=5';
    const mediaPath:string = 'http://media.mw.metropolia.fi/wbma/media/tags/'+tag;

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
      duration: 2000
    });
    toast.present();
  }

  //upload media file
  public uploadMedia(data:any){
    console.log('upload media ?');

    let accessToken = localStorage.getItem('token');
    console.log('accessToken: ', accessToken);

    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': accessToken
      }),
    };
    const uploadPath:string = "http://media.mw.metropolia.fi/wbma/media";
    return this.http.post<LoginResponse>(uploadPath, data, httpOptions);
  }
}
