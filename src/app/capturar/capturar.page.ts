import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormArray, Validators, FormBuilder, FormControl, RequiredValidator } from '@angular/forms';
import { of } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AnomaliasService } from '../servicios/anomalias.service';
import { UsersService } from '../servicios/users.service';
@Component({
  selector: 'app-capturar',
  templateUrl: './capturar.page.html',
  styleUrls: ['./capturar.page.scss'],
})
export class CapturarPage implements OnInit {
  token:any = localStorage.getItem('token');
  captureID:string= "ID1233"
  id: any;
  name: string;
  measurer: string;
  addres: string;
  month: string;
  users: any; 
  last:string = "3456788" //reading
  current:string //reading
  confirm:string 
  details = JSON.parse(localStorage.getItem('anomalies')); //asignamos anomalias de local storage
  anomalies:string[] = [] //anomalías seleccionadas
  date = new Date();
  option={
    slidesPerView:1.5,
    centeredSlides: true,
    loop:true,
    spaceBetween:10  
  }
  constructor(
    private alertController: AlertController, 
    private router: Router, 
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private usersService : UsersService
    ) { }

  ngOnInit() {
    /* this.id = this.activatedRoute.snapshot.paramMap.get('id');
     console.log('id ', this.id)
     this.usersService.users( this.token).subscribe(res=>{
      console.log("res", res)
      this.users= res;
      console.log('id ', this.id)
      let i:number= 0;
      while(this.users[i] != this.id){
       
        if(this.users[i].ref == this.id){
          console.log('es igual')
          this.name= this.users[i].name;
          this.measurer= this.users[i].measurer;
          this.addres= this.users[i].address;
          this.month= this.users[i].month;
          break;      
        }
        i++;
        
        console.log(i)
      }
      
  
    }); */
  }
  
  validation(){
    
    if (this.current == '' || this.confirm=='') {
      this.alert('Alerta', 'Debe llenar los campos')
     }
     else{      
        if(this.current != this.confirm){
           this.alert('Alerta','La lectura ingresada no coincide')
         }else{
           this.alert('Finalizado', 'Captura realizada con éxito')
           }
      }
    
  }
      
  async alert(header:string,message:string){
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
  
  pushAnomaly(item){
    this.anomalies.unshift(item);
    console.log(item);
 } 
  pushLog(msg) {
    //this.logs.unshift(msg);
    console.log('ion dissmis: ' + msg);
  }

  handleChange(e) {
    //this.pushLog('ionChange fired with value: ' + e.detail.value);
    console.log('ionChange: ' + e.detail.value)
    let text = e.detail.value.toString();  
    let str = text.split(",");

    this.anomalies= str.map(str => {
      return Number(str);
    });

     console.log(this.anomalies);
     this.pushReading();
  }

  pushReading(){
     let lat:any;
     let lon:any;
    navigator.geolocation.getCurrentPosition((position) => { 
      console.log("Got position", position.coords);
      lat = position.coords.latitude; 
      lon = position.coords.longitude;
      console.log('lat: ' + lat + 'long: ' + lon);

    });
     
    /*let reading ={
      employee_id: this.id,
      hydrometer: this.current,
      latlong: '129.123,110.123',
      anomaly_id: this.anomalies,
      //fotos
      date: this.date.getDate() 
    }
     */
  }

  pushReadings(){}
}

 /* 
      employee_id (integer): can be empty (get from employee assign) ,
      product_id (integer): product register ,
      hydrometer (integer): actual hydrometer ,
      date (string, optional): date ,
      latlong (string, optional): latitude Longitude (don't know for what) ,
      photos (string, optional): photos in base64 ,
      anomaly (integer, optional): fk_anomaly from smartmetric_anomalys ,
      description (string, optional): anomaly description*/