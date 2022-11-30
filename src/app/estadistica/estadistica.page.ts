import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.page.html',
  styleUrls: ['./estadistica.page.scss'],
})
export class EstadisticaPage implements OnInit {
  incomplete= JSON.parse(localStorage.getItem('products')) 
  completed = JSON.parse(localStorage.getItem('completed'))
  readings = JSON.parse(localStorage.getItem('readings'))
  stats = new Object();
  

  constructor() { }
   
  ngOnInit() {
  
    this.stats = {
    route : 42,
    incomplete: this.incomplete.length,
    complete :this.completed.length,
    anomalies : this.anomalies(),
    time : 50,
    currentTime :20
    }
  }
  anomalies(){
    let anomalies=0;
    
    for(let reading of this.readings){
       
      anomalies += reading.anomaly.length
    }

    return anomalies;
  }
}
