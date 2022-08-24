import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-realizado',
  templateUrl: './ver-realizado.page.html',
  styleUrls: ['./ver-realizado.page.scss'],
})
export class VerRealizadoPage implements OnInit {

  constructor() { }
  option={
    slidesPerView:1.5,
    centeredSlides: true,
    loop:true,
    spaceBetween:10,
   
  }
  ngOnInit() {
  }

}
