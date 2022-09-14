import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders,HttpErrorResponse} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { HttpMetodosService } from './http-metodos.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
   endpoint='smartmetricapi/readingss'
  constructor(public http:HttpClient,public metodos: HttpMetodosService) { }

  users(token:string){
   
     return this.metodos.get(this.endpoint, token)
  }
  
}
