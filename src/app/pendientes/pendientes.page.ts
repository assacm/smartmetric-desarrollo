import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.page.html',
  styleUrls: ['./pendientes.page.scss'],
})
export class PendientesPage implements OnInit {

  users: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(){
    this.getUsers().subscribe(res=>{
      console.log("res", res)
      this.users = res;
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
