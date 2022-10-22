import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IProducts,Datum, Client, IReading, IReadings } from '../interfaces';
import { FormGroup, FormArray, Validators, FormBuilder, FormControl, RequiredValidator } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-capturar',
  templateUrl: './capturar.page.html',
  styleUrls: ['./capturar.page.scss'],
})
export class CapturarPage implements OnInit {
  captureID:string= "ID1233"
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
  anomalies:string[] = [] //anomalías seleccionadas
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
    public fb: FormBuilder
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
        
             //
           this.pushReading(this.employeeID,this.productID,this.current,this.anomalies)
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
  pushReading(employee:string,product:string,hydrometer:string,anomaly:string[]){
    let reading;
    let date = new Date();

    navigator.geolocation.getCurrentPosition((position) => { 
     let lat = position.coords.latitude.toString(); 
     let lon = position.coords.longitude.toString();
     let loc = lat + ', ' + lon
     reading = {
      employee_id : employee,
      product_id : product,
      hydrometer  : hydrometer,
      date        : date.getDate(),
      latlong : loc,
      anomaly : anomaly
     }
     this.reading = reading
     this.readings.push(reading);
     localStorage.setItem('readings', JSON.stringify(this.readings));
     console.log(reading)
      this.router.navigate( ['/pendientes']);
     
    });
  
  }

  pendingsUpdate(){
     
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
  }
  
  report(){
    //this.latlong = this.location();
    //this.reading = this.getReading(this.employeeID,this.productID,this.current,this.anomalies)
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
      description (string, optional): anomaly description
      

    location(): Observable<any>{
    var coordinates = new Observable(res => {
      navigator.geolocation.getCurrentPosition((position) => { 
      //console.log("Got position", position.coords);
     //let lat = position.coords.latitude.toString(); 
     //let lon = position.coords.longitude.toString();
    });
    })     

    return coordinates
   
      
  }


      getReading(){
    let reading;
    let date = new Date();

    navigator.geolocation.getCurrentPosition((position) => { 
      //console.log("Got position", position.coords);
       let lat = position.coords.latitude.toString(); 
       let lon = position.coords.longitude.toString();
       let loc = lat+', '+lon;
        reading = {
        employee_id : employee,
        product_id : product,
        hydrometer  : hydrometer,
        date        : date.getDate(),
        latlong : loc,
        anomaly : anomaly
       }
  
       return reading
    });
   
    
  }

    
  
  pushReadings(reading: IReading){
 
      this.readings.push(reading);

      localStorage.setItem('readings', JSON.stringify(this.readings));
      
      console.log(this.reading);
  }

  of(this.getReading(this.employeeID,this.productID,this.current,this.anomalies))
           .subscribe({
            next: value => console.log('next:', value),
            error: err => console.log('error:', err),
            complete: () => console.log('the end'),
          }
           )
      
      
      */


 