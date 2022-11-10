import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  constructor(private cdr : ChangeDetectorRef, private updateStrg : StorageService){ 
    
  }

  ngOnInit(){ 
    this.products=JSON.parse(localStorage.getItem('products'));
    console.log(this.products)
  }
  ngAfterViewInit(){
  /*  this.updateStrg.getUpdate().subscribe(res => {
      console.log(res.text)
      this.products = res.text;
    }) */
    this.updateStrg.getProducts().subscribe(res => {
      console.log(res.text)
      this.products = res.text;
    })

  }
  
}
