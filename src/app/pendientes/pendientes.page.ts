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
  //products=JSON.parse(localStorage.getItem('products'));
   products;
   employee = JSON.parse(localStorage.getItem('employee'));

  constructor(private cdr : ChangeDetectorRef, 
              private updateStrg : StorageService, 
              private productS : ProductsService,
              private loadingCtrl: LoadingController,
              private update: StorageService){ 
    
  }

  ngOnInit(){ 
    this.products=JSON.parse(localStorage.getItem('products'));
    //console.log(this.products)
  }
  ngAfterViewInit(){
  /*  this.updateStrg.getUpdate().subscribe(res => {
      console.log(res.text)
      this.products = res.text;
    }) */
    this.updateStrg.getProducts().subscribe(res => {
      //console.log(res.text)
      this.products = res.text;
      this.loadingCtrl.dismiss();
    })

   /* this.getStorage.asObservable().subscribe(
      x => {console.log('Observer got a next value: ' + x); },
      err => console.error('Observer got an error: ' + err),
      () => {console.log('Observer got a complete notification');this.loadingCtrl.dismiss()}
     ) */
  
  }

  download(){
   this.showLoading()
   
   this.productS.products(localStorage.getItem('token'),this.employee.id)
   .subscribe(res =>{
    console.log(res)
    this.products = res[0].data;
    localStorage.setItem('products', JSON.stringify(res[0].data))
    this.update.updateProducts(JSON.parse(localStorage.getItem('products')));
   });
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Obteniendo ruta...',
    });

    loading.present();
  }
}
