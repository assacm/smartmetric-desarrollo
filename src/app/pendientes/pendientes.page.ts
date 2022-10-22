import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.page.html',
  styleUrls: ['./pendientes.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PendientesPage implements OnInit, AfterViewInit {
  //products=JSON.parse(localStorage.getItem('products'));
   products;
  constructor(private cdr : ChangeDetectorRef){ 
    
  }

  ngOnInit(){ 
    this.products=JSON.parse(localStorage.getItem('products'));
    console.log(this.products)
  }
  ngAfterViewInit(){
   // this.local.subscribe(res => {
   //   this.products = res
   //   this.cdr.markForCheck()})
    
  }
  
}
