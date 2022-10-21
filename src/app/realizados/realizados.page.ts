import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-realizados',
  templateUrl: './realizados.page.html',
  styleUrls: ['./realizados.page.scss'],
})
export class RealizadosPage implements OnInit {
  
   completed = JSON.parse(localStorage.getItem('completed'));
  constructor() { }

  ngOnInit() {

  }

}
