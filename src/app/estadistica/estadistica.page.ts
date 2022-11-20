import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.page.html',
  styleUrls: ['./estadistica.page.scss'],
})
export class EstadisticaPage implements OnInit {
  
  route = 42;
  pending = 25;
  complete = 2;
  anomalies = 16;
  time = 50;
  currentTime = 20;

  constructor() { }

  ngOnInit() {
  }

}
