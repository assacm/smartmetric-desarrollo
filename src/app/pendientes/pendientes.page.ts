import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { ProductsService } from '../servicios/products.service';
import { StorageService } from '../servicios/storage.service';
import { AlertController } from '@ionic/angular';
import { validValue } from '../functions';
import { Network } from '@awesome-cordova-plugins/network/ngx';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.page.html',
  styleUrls: ['./pendientes.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PendientesPage implements OnInit, AfterViewInit {
   storage = {
    products :JSON.parse(localStorage.getItem('products')),
    employee :JSON.parse(localStorage.getItem('employee'))
  }
   products = [];
   employee ;
   reload = new Subject<any>();
   connection : boolean = true;

  constructor(
              private network: Network, 
              private updateStrg : StorageService, 
              private productS : ProductsService,
              private loadingCtrl: LoadingController,
              private update: StorageService,
              private alertController: AlertController,
              private menuCtrl:MenuController){
                window.addEventListener('offline', ()=>{
                  this.connection = false;
                 })
              }

  ngOnInit(){ 
    this.menuCtrl.enable(true)
    if(validValue(this.storage.products) != false){
    this.products= this.storage.products;
    }
    if(validValue(this.storage.employee) != false){
      this.employee= this.storage.employee;
      }

  }
  ngAfterViewInit(){
    window.addEventListener('offline', ()=>{
      this.connection = false;
      this.loadingCtrl.dismiss;
     })

    this.updateStrg.getProducts().subscribe(res => {
      console.log('update storage service');
      this.products = res.text;
      
    })
    this.reload.asObservable().subscribe( res =>{
      console.log('reload subject')
      console.log(res)
      this.products = res;
      if(this.products){    
        this.loadingCtrl.dismiss();
        /*window.location.reload();*/ 
       }
      if(res == null){
        this.loadingCtrl.dismiss();
        this.alert('Ruta no disponible', 'No se ha encontrado ruta')
      } 
    })

  }
  showButton(){
 
    if(validValue(this.products) == false || this.products.length == 0 ){
      console.log('no hay products')
      return true;
   }
    return false;

  }
  download(){
   this.showLoading()

    console.log(this.connection);
    

   if (this.connection == false) {
    this.loadingCtrl.dismiss();


    console.log("ANTES DEL ALERT");
    
    this.alert('Alerta', 'No cuentas con conexion a Internet')
    console.log(this.connection);
    
    console.log("DESPUES DEL ALERT");
    

  }
  else{
    this.productS.products(localStorage.getItem('token'),this.employee.id)
   .subscribe(res =>{
    if(res[0].data != undefined)
    localStorage.setItem('products', JSON.stringify(res[0].data)) ; 
    this.reload.next(JSON.parse(localStorage.getItem('products'))); 
   });
  }
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Obteniendo ruta...',
    });

    loading.present();
  }
  async alert(header:string,message:string){
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}
