import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpMetodosService } from './http-metodos.service';
@Injectable({
  providedIn: 'root'
})
export class AnomaliasService {

  endpoint='smartmetricapi/anomaly'
  constructor(public http:HttpClient, public metodos: HttpMetodosService) {
    console.log("Anomalías service");
    
   }
  
   getAnomalias(token:string){
     
     return this.metodos.get(this.endpoint, token);
   }
   
}
