import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IProducts,Datum, Client, IReading, IReadings } from '../interfaces';
import { FormGroup, FormArray, Validators, FormBuilder, FormControl, RequiredValidator } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { StorageService } from '../servicios/storage.service';

@Component({
  selector: 'app-capturar',
  templateUrl: './capturar.page.html',
  styleUrls: ['./capturar.page.scss'],
})
export class CapturarPage implements OnInit {
  id: any;
  measurer: string;
  fgReading: FormGroup;  
  current:string //reading
  confirm:string //reading
  details = JSON.parse(localStorage.getItem('anomalies')); 
  products = JSON.parse(localStorage.getItem('products'));
  employee = JSON.parse(localStorage.getItem('employee'));
  client : Datum;

  employeeID:string;
  productID:string;
  anomalies:number[] = [] //id anomalías seleccionadas
  descAnomalies:string[] = []
  latlong:string
  date = new Date();
  
  readings: any = [];
  example:any = [];
  reading:IReading;
  completed:any=[];
 
  option={
    slidesPerView:1.5,
    centeredSlides: true,
    loop:true,
    spaceBetween:10  
  }
  constructor(
    private alertController: AlertController, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private updateStrg : StorageService
    ) { 
      this.fgReading = this.fb.group({
        "current": new FormControl("",Validators.required),
        "confirm": new FormControl("",Validators.required)
      })

    }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.employeeID=this.employee.id;
    this.productID=this.products[this.id].id;
    console.log(this.products)
    this.client = {
      id: this.products[this.id].id,
      label: this.products[this.id].label,
      address: this.products[this.id].address,
      last_measure:this.products[this.id].last_measure,
      client :       {
        rowid: this.products[this.id].client.rowid,
        name:  this.products[this.id].client.name
      }
    } 
  }
  
  validation(){

    var fgVal = this.fgReading.value;
    this.current = fgVal.current;
    this.confirm = fgVal.confirm;

    if (this.fgReading.invalid) {
      this.alert('Alerta', 'Debe llenar los campos')
     }
     else{      
        if(this.current != this.confirm){
           this.alert('Alerta','La lectura ingresada no coincide')
         }else{
           this.pushReading(this.employeeID,this.productID,this.current,this.anomalies, this.descAnomalies)
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

  handleChange(e) {
   let ev = e.detail.value
   this.descAnomalies = ev.map( res => res.label) //arreglo con la desc
   this.anomalies= ev.map( res => {return Number(res.rowid)}) //arreglo con los id
  
   console.log(this.descAnomalies)
   console.log(this.anomalies)

  }
  pushReading(employee:string,product:string,hydrometer:string,anomaly:number[], descAnomaly : string[]){
    //Fri, 04 Nov 2022 20:50:57 GMT
    let reading;
    if(localStorage.getItem('readings')){
      this.readings=JSON.parse(localStorage.getItem('readings'))
    } 
    navigator.geolocation.getCurrentPosition((position) => { 
     let lat = position.coords.latitude.toString(); 
     let lon = position.coords.longitude.toString();
     let loc = lat + ', ' + lon
     reading = {
      employee_id : employee,
      product_id : product,
      hydrometer  : hydrometer,
      date        : this.date, //checar
      latlong : loc,
      anomaly : anomaly,
      description: descAnomaly
     }
     this.reading = reading
     this.readings.push(reading);
     
     localStorage.setItem('readings', JSON.stringify(this.readings));
     console.log(reading)
     this.pendingsUpdate();
     this.router.navigate( ['/pendientes']);
     
    });
    this.alert('Finalizado', 'Captura realizada con éxito')
  }
  camera(){
    //codigo para la camara
    //codigo para arreglo de fotos
    //hacer push a array de fotos, declarado global, del tipo del codigo que genera las fotos

  }
  photos(){
    //de aqui return array photos

    //slides si no hay fotos tomadas... que no se muestre?? default fotos smartmetric?
  }

  
  pendingsUpdate(){
    if(localStorage.getItem('completed')){
      this.completed=JSON.parse(localStorage.getItem('completed'))
    } 

    for( let product of this.products){
          if(product.id != this.productID){
            this.example.push(product)
          }else{
            this.completed.push(product);
          }          
    }
    this.products = []
    this.products = this.example
    localStorage.setItem('products', JSON.stringify(this.products))
    localStorage.setItem('example', JSON.stringify(this.products))
    localStorage.setItem('completed',JSON.stringify(this.completed))
    this.updateStrg.updateProducts(JSON.parse(localStorage.getItem('products')));
    this.updateStrg.updateCompleted(JSON.parse(localStorage.getItem('completed')));

  }
  
  report(){
    var fgVal = this.fgReading.value;
    this.current = fgVal.current;
    let currentReading = {
      index:this.id,
      id: this.productID,
      label: this.products[this.id].label,
      address: this.products[this.id].address,
      last_measure:this.products[this.id].last_measure,
      current : this.current,
      anomalies : this.descAnomalies,
      client :       {
        rowid: this.products[this.id].client.rowid,
        name:  this.products[this.id].client.name
      }
    }
    this.router.navigate(['/reporte', JSON.stringify(currentReading)]);
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
      description (string, optional): anomaly description
      

   */


 