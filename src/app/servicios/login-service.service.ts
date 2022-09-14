import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders,HttpErrorResponse} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { HttpMetodosService } from './http-metodos.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  
   endpoint='login'
   constructor(public http:HttpClient,public metodos: HttpMetodosService) { 
     console.log("Mi servicio");
   }

    login(item:any){
        
      return this.metodos.post(this.endpoint, item);
    }

}
   /*
       getUsers(endpoint,token){
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
   getApiJSON(endpoint:string,item){
     //let header= new HttpHeaders({})
       //   header.append('content-type','aplication/json')
          let httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            })
          }
    return this.http.post(this._url + endpoint, item, httpOptions ).pipe( 
      map((res : any) => {return res}
    ))
   } //

   
}

*/
//'https://real14.sysbiterp.com/api/index.php/login?login=jperez&password=intern123456'


