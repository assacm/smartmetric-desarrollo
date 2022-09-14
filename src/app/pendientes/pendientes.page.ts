import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../servicios/users.service';
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
  constructor(private http: HttpClient, private usuarios:UsersService) { }

  ngOnInit(){
    this.usuarios.users(this.token).subscribe(res=>{
      console.log("res", res)
      this.users=res;
    
    });

    //  this.getUsers().subscribe(res=>{
    //  console.log("res", res)
    //  this.users = res;
    // });
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
