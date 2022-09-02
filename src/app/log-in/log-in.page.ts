import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginServiceService } from '../servicios/login-service.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormGroup, FormArray, Validators, FormBuilder, FormControl, RequiredValidator } from '@angular/forms';
import { of } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  formularLogin: FormGroup;

  respuesta: any;

  constructor(private alertController: AlertController, public fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private loginService: LoginServiceService) {
    this.formularLogin = this.fb.group({
      "user": new FormControl("",Validators.required),
      "password": new FormControl("",Validators.compose([Validators.required,Validators.minLength(8)]) )
    })
  }

  ngOnInit() {

  }

  async login() {
    var datos = this.formularLogin.value;
    let jsonLogin = {
      "login": datos.user,
      "password": datos.password
    }


    if (this.formularLogin.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Debe completar los campos',
        buttons: ['Aceptar'],
      });

      await alert.present();
    }else{
    this.loginService.getApiJSON(jsonLogin, 'login').pipe(
      map((info:any) => { console.log('map',info.success.token);
       localStorage.setItem('token',info.success.token);
       this.router.navigate(['/pendientes']);
      }))
      .subscribe(res => {
        console.log('suscribe',res)
        //this.respuesta = res;
      }, async (error) => {
        console.log('error',error)
        //this.respuesta = error;
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Verificar datos ingresados',
          buttons: ['Aceptar'],
        });

        await alert.present();
      })
    }

    this.formularLogin.reset();
  }

}

  /*login1()
  { 
    let jsonLogin ={
             "login": this.user,
             "password": this.password
                  }
    
      this.loginService.getApi(this.user,this.password,'login').subscribe(res=>{
      console.log(res)
     })


    /*abre comentario
     this.loginService.getApi(this.user,this.password,'login').subscribe(res=>{
      console.log(res)
   }) --aqui cierra el comentario
  } */

  /* login2(){
    let jsonLogin ={
      "login": this.user,
      "password": this.password
           }

  this.loginService.getApiJSON(jsonLogin, 'login').subscribe(res =>{
       console.log(res)
       if(res!=[])
        this.router.navigate(['/pendientes'])
        //guardar token en localstorage
       },(error)=>{
        console.log(error)
       })
   
    
  } */

