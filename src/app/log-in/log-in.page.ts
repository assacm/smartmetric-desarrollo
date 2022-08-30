import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginServiceService } from '../servicios/login-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

    user:string;
    password:string;
  constructor(private router:Router,private activatedRoute : ActivatedRoute, private loginService:LoginServiceService) { }

  ngOnInit() {
    
  
    //suscribe y then uso y diferencias
  }

  login()
  { 
    let jsonLogin ={
             "login": this.user,
             "password": this.password
                  }
    
      this.loginService.getApi(this.user,this.password,'login').subscribe(res=>{
      console.log(res)
     })


    /* this.loginService.getApi(this.user,this.password,'login').subscribe(res=>{
      console.log(res)
   })*/
  }

  login2(){
    let jsonLogin ={
      "login": this.user,
      "password": this.password
           }

  this.loginService.getApiJSON(jsonLogin, 'login').subscribe(res =>{
       console.log(res)
      // if(res.success.code==200)
        this.router.navigate(['/pendientes'])
        //guardar token en localstorage
       },(error)=>{
        console.log(error)
       })
   
    
  }







  
}
