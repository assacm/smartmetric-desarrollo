import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http'
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
   _url='https://real14.sysbiterp.com/api/index.php/'
   //'https://real14.sysbiterp.com/api/index.php/login?login=jperez&password=intern123456'
  
   constructor(public http:HttpClient) { 
     console.log("Mi servicio");
   }

   getApi(user:string, pass:string, endpoint:string){
    return this.http.get( this._url + endpoint + '?login='+ user +'&password='+pass);
   }

   getApiJSON(item, endpoint:string){
     //let header= new HttpHeaders({})
       //   header.append('content-type','aplication/json')
          let httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            })
          }
    return this.http.post(this._url + endpoint, item, httpOptions );
   }

   getUsers(endpoint,token){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'DOLAPIKEY': token
      })
    }
    return this.http.get(this._url + endpoint , httpOptions);

   }
}
