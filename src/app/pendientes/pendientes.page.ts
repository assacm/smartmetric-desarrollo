import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginServiceService } from '../servicios/login-service.service';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.page.html',
  styleUrls: ['./pendientes.page.scss'],
})
export class PendientesPage implements OnInit {

  users: any = [];

  constructor(private http: HttpClient, private loginService:LoginServiceService) { }

  ngOnInit(){
    this.getUsers().subscribe(res=>{
      console.log("res", res)
      this.users = res;
    });

    this.loginService.getUsers('smartmetricapi/readingss','Uy2Bo6h11OTOXI1bOeJ8Ph1rg1kxL1u8').subscribe(res=>{
      console.log("res", res)
    });
  }

  getUsers(){
    return this.http
    .get("assets/files/pendiente.json")
    .pipe(
      map((res:any) =>{
        return res.data;
      })
    )
  }
  
  
}
