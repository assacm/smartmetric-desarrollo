import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { ProductsService } from '../servicios/products.service';
import { StorageService } from '../servicios/storage.service';
@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.page.html',
  styleUrls: ['./pendientes.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PendientesPage implements OnInit, AfterViewInit {
   products = [];
   employee = JSON.parse(localStorage.getItem('employee'));
   reload = new Subject<any>();

  constructor(private cdr : ChangeDetectorRef, 
              private updateStrg : StorageService, 
              private productS : ProductsService,
              private loadingCtrl: LoadingController,
              private update: StorageService){}

  ngOnInit(){ 
    console.log('onInit'); 
    this.products=JSON.parse(localStorage.getItem('products'));
    
  }
  ngAfterViewInit(){
    console.log('AfterViewInit');
    this.updateStrg.getProducts().subscribe(res => {
      console.log('update storage service');
      this.products = res.text;
      
    })
    this.reload.asObservable().subscribe( res =>{
      this.products = res;
      if(this.products){    
        this.loadingCtrl.dismiss();
        window.location.reload(); 
       }
    })

  }
  showButton(){
    console.log(this.products)
    if(!this.products || this.products.length == 0){
      console.log('no hay products')
      return true;
   }
    return false;

  }
  download(){
   this.showLoading()
   console.log('1');
   this.productS.products(localStorage.getItem('token'),this.employee.id)
   .subscribe(res =>{
    localStorage.setItem('products', JSON.stringify(res[0].data)) ; 
    this.reload.next(JSON.parse(localStorage.getItem('products'))); 
   });
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Obteniendo ruta...',
    });

    loading.present();
  }
}
