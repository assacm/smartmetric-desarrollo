import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-capturar',
  templateUrl: './capturar.page.html',
  styleUrls: ['./capturar.page.scss'],
})
export class CapturarPage implements OnInit {
  public form = [
    { val: 'Ninguna', isChecked: true },
    { val: 'Sin cambios', isChecked: false },
    { val: 'Sin medidor', isChecked: false }
  ];
  
  option={
    slidesPerView:1.5,
    centeredSlides: true,
    loop:true,
    spaceBetween:10,
   
  }
  constructor() { }

  ngOnInit() {
  }

}
