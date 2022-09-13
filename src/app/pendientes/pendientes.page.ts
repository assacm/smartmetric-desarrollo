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
  token:any = localStorage.getItem('token');
  id: any;
  nombre: string;
  medidor: string;
  direccion: string;
  mes: string;
  //usuarios: any;

  constructor(private http: HttpClient, private loginService:LoginServiceService) { }

  ngOnInit(){
    //this.getUsers().subscribe(res=>{
    //  console.log("res", res)
   //   this.users = res;
   // });

    this.loginService.getUsers('smartmetricapi/readingss',this.token).subscribe(res=>{
      console.log("res", res)
      this.users=res;
      this.nombre= this.users[this.id].name;
     // this.medidor= this.users[this.id]
      // this.direccion=
      //this.mes=
    });
  }

 /* getUsers(){
    return this.http
    .get("assets/files/pendiente.json")
    .pipe(
      map((res:any) =>{
        return res.data;
      })
    )
  }
  */
  
}
