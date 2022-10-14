import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IProducts,Datum, Client, IReading, IReadings } from '../interfaces';

@Component({
  selector: 'app-capturar',
  templateUrl: './capturar.page.html',
  styleUrls: ['./capturar.page.scss'],
})
export class CapturarPage implements OnInit {
  captureID:string= "ID1233"
  id: any;
  measurer: string;  
  current:string //reading
  confirm:string //reading
  details = JSON.parse(localStorage.getItem('anomalies')); 
  products = JSON.parse(localStorage.getItem('products'));
  client : Datum;

  employeeID:string;
  productID:string;
  anomalies:string[] = [] //anomalías seleccionadas
  latlong:string
  date = new Date();
  
  readings: any = [];
  example:any = [];
  reading:IReading;

  option={
    slidesPerView:1.5,
    centeredSlides: true,
    loop:true,
    spaceBetween:10  
  }
  constructor(
    private alertController: AlertController, 
    private router: Router, 
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    let i = this.id - 1;
    this.employeeID=this.products[0].employee;
    this.productID=this.id;
    console.log(this.products[0].data[i])
    this.client = {
      id: this.id,
      label: this.products[0].data[i].label,
      address: this.products[0].data[i].address,
      last_measure:this.products[0].data[i].last_measure,
      client :       {
        rowid: this.products[0].data[i].client.rowid,
        name:  this.products[0].data[i].client.name
      }
    } 
  }
  
  validation(){
    this.latlong=this.location();

    if (this.current == '' || this.confirm=='' || this.current != '' || this.confirm=='' || this.current == '' || this.confirm!='') {
      this.alert('Alerta', 'Debe llenar los campos')
     }
     else{      
        if(this.current != this.confirm){
           this.alert('Alerta','La lectura ingresada no coincide')
         }else{
             
             this.pushReadings(this.reading);
             this.pendingsUpdate();
             
             this.alert('Finalizado', 'Captura realizada con éxito')

           }
      }

      this.current='';
      this.confirm='';
    
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
    
    return this.anomalies
  }
  location(){
     let location:string;
     let lat:any;
     let lon:any;
    navigator.geolocation.getCurrentPosition((position) => { 
      console.log("Got position", position.coords);
      lat = position.coords.latitude.toString(); 
      lon = position.coords.longitude.toString();
      location = lat+', '+lon

    });
      return location
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
  
  getReading(employee:string,product:string,hydrometer:string,latlong:string,anomaly:string[],date:number){
    let reading = {
      employee_id : employee,
      product_id : product,
      hydrometer  : hydrometer,
      date        : date,
      latlong : latlong,
      anomaly : anomaly
     }

     return reading
  }
  pushReadings(reading: IReading){
 
      this.readings.push(reading);

      localStorage.setItem('readings', JSON.stringify(this.readings));
      
      console.log(this.reading);
  }

  pendingsUpdate(){
     
    for( let product of this.products[0].data){
          if(product.id != this.id){
            this.example.push(product)
          }
            
    }
    this.products[0].data = []
    this.products[0].data= this.example
    localStorage.setItem('products', JSON.stringify(this.products))
     localStorage.setItem('example', JSON.stringify(this.products[0].data))
  }
  
  report(){
    this.latlong = this.location();
    this.reading = this.getReading(this.employeeID,this.productID,this.current,this.latlong,this.anomalies, this.date.getDate())
    this.router.navigate(['/reporte', JSON.stringify(this.reading)]);
  }

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


 