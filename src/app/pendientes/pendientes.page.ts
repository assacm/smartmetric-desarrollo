import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.page.html',
  styleUrls: ['./pendientes.page.scss'],
})
export class PendientesPage implements OnInit {

    products;

  constructor(){ 
    this.products = JSON.parse(localStorage.getItem('products'));
  }

  ngOnInit(){ 

    
  }

  /*getUsers(){
    return this.http
    .get("assets/files/route.json")
    .pipe(
      map((res:any) =>{
        return res.product;
      })
    )
  } */
  
  
}
