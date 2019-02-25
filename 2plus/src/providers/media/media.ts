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


  getUserInfoOfSingleFile(user_id){
    const userInfoPath:string = "http://media.mw.metropolia.fi/wbma/users/"+user_id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      })
    };
    return this.http.get<User>(userInfoPath, httpOptions);

  }




  //upload media file
  public uploadMedia(data:any){
    console.log('media provider: upload media');

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




  public getAllMediaOfCurrentUser(user_id){
    const allMediaOfSingleUserPath:string = "http://media.mw.metropolia.fi/wbma/media/user/"+user_id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      }),
    };

    console.log('token: ', localStorage.getItem('token'));

    return this.http.get<Media[]>(allMediaOfSingleUserPath);
  }

  deleteFile(file_id){
    const deleteFilePath:string = "http://media.mw.metropolia.fi/wbma/media/"+file_id;
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token')
      }),
    };
    return this.http.delete<LoginResponse>(deleteFilePath, httpOptions);
  }

  confirmationAlert(message: string): Promise<boolean> {
    let promise = new Promise<boolean>(resolve => {
      let alert = this.alertController.create({
        title: 'Confirmation',
        message: message,
        enableBackdropDismiss: false,
        buttons: [ {
          text: 'No',
          handler: () => resolve(false)
        }, {
          text: 'Yes',
          handler: () => resolve(true)
        } ]
      });

      alert.present();
    });

    return promise;
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}



