import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-products',
  templateUrl: './cards-products.component.html',
  styleUrls: ['./cards-products.component.scss'],
})
export class CardsProductsComponent implements OnInit {
@Input()  client : Object;
  constructor() { }

  ngOnInit() {


  }


}
