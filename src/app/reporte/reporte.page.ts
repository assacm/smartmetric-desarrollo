import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IReading } from '../interfaces';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {

  reading : IReading;
  constructor(private actRoute : ActivatedRoute) { }
  option={
    slidesPerView:1.5,
    centeredSlides: true,
    loop:true,
    spaceBetween:10,
   
  }
  ngOnInit() {
    this.reading = JSON.parse(this.actRoute.snapshot.paramMap.get('id'));
    console.log(this.reading);
  }

}
