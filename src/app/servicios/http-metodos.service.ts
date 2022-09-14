import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpMetodosService {
  _url='https://real14.sysbiterp.com/api/index.php/'
  
  constructor(public http:HttpClient) { }

  get(endpoint,token){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'DOLAPIKEY': token
      })
    }
    return this.http.get(this._url + endpoint , httpOptions).pipe( 
      map((res : any) => {return res}
    ));
   }

  post(endpoint:string, item){       
         let httpOptions = {
           headers: new HttpHeaders({
             'Content-Type': 'application/json',
           })
          }

   return this.http.post(this._url + endpoint, item, httpOptions ).pipe( 
     map((res : any) => {return res}
   ))
  }
  
  update(endpoint:string, body:any){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
     }
    this.http.put(this._url, body, httpOptions)
  }

  delete(endpoint:string){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
     }
    this.http.delete(this._url + endpoint, httpOptions)
  }
}


