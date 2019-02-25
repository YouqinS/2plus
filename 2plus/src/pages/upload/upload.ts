import { Component, ViewChild } from '@angular/core';
import {
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
} from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';
import { Chooser } from '@ionic-native/chooser';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  constructor(private chooser:Chooser,
              public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public mediaProvider: MediaProvider) {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  filedata = '';
  title = '';
  description = '';
  public myBlob: Blob;
  public isImage:Boolean = false;
  public hasFile:Boolean = false;
  @ViewChild('uploadForm') uploadForm: any;

  filters = {
    brightness: 100,
    contrast: 100,
    warmth: 0,
    saturation: 100,
  };




  loading = this.loadingCtrl.create({
    content: 'Uploading, please wait...',
  });


  showPreview(file) {

    this.myBlob = new Blob(
      [file.data], {
        type: file.mediaType
      });

    const reader = new FileReader();
    reader.addEventListener("loadend", function() {
      // reader.result contains the contents of blob as a typed array
      reader.result;
    });
    reader.readAsArrayBuffer(this.myBlob);
    console.log('myfile: ', this.myBlob);

    if (file.mediaType.includes('video')) {
      this.filedata = 'http://via.placeholder.com/500X200/000?text=Video';
    } else if (file.mediaType.includes('audio')) {
      this.filedata = 'http://via.placeholder.com/500X200/000?text=Audio';
    } else {
      this.filedata = file.dataURI;
      // if(file.mediaType.includes('image')){}
      this.isImage = true;
    }

  }

  public uploadMedia(){
    const description = `[d]${this.description}[/d]`;
    const filters = `[f]${JSON.stringify(this.filters)}[/f]`;

    // show spinner
    this.loading.present().catch();

    const formData = new FormData();
    formData.append('title', this.title);
    console.log('title: ', this.title);

    formData.append('description', description + filters);// + filters
    console.log('description: ', description);

    //formData.append('file', this.file);
    formData.append('file', this.myBlob);

    this.mediaProvider.uploadMedia( formData).subscribe(response => {

      console.log('upload media response', response);

      // setTimeout 2. secs
      setTimeout(() => {
        this.navCtrl.pop().catch();
        // hide spinner
        this.loading.dismiss().catch();
      }, 2000);

      if(response.message ==="file uploaded"){
        // this.navCtrl.pop();
        console.log('file uploaded');
        //this.mediaProvider.presentToast(response.message);
       // this.uploadForm.reset();
        this.navCtrl.popTo(HomePage);
      }

    });

  }


  public chooseFile(){
    this.chooser.getFile("image/*, video/!*, audio/!*")
    .then(file => {
      if(file){
        console.log(file ? file.name : 'canceled');
        console.log(file.dataURI);
        console.log(file.mediaType);
        //console.log(file.uri);
        this.hasFile = true;
        this.showPreview(file);

      }else {
        alert("please choose a file to upload");
      }
    })
    .catch((error: any) => console.error(error));

  }




  cancelUpload() {
    console.log('reset form');
    this.uploadForm.reset();
    this.filedata='';
    this.isImage=false;
  }


}
