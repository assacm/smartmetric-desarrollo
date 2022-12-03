import { Component, OnInit } from '@angular/core';
import { validValue } from '../functions';
@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.page.html',
  styleUrls: ['./estadistica.page.scss'],
})
export class EstadisticaPage implements OnInit {
  
  storage ={
    incomplete: JSON.parse(localStorage.getItem('products')) ,
    completed : JSON.parse(localStorage.getItem('completed')),
    readings : JSON.parse(localStorage.getItem('readings'))
  }
  incomplete = [];
  completed = [];
  readings = [];
  stats = new Object();
  

  constructor() { }
   
  ngOnInit() {

    console.log()
    if(validValue(this.storage.incomplete)!= false){
      this.incomplete= this.storage.incomplete;
      }
    if(validValue(this.storage.completed)!= false){
        this.completed= this.storage.completed;
      }
      if(validValue(this.storage.completed) != false){
        this.readings= this.storage.readings;
      }      
  
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
