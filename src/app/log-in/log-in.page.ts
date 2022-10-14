import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginServiceService } from '../servicios/login-service.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormGroup, FormArray, Validators, FormBuilder, FormControl, RequiredValidator } from '@angular/forms';
import { of } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { AnomaliasService } from '../servicios/anomalias.service';
import { UsersService } from '../servicios/users.service';
import { EmployeService} from '../servicios/employe.service';
import {ProductsService} from '../servicios/products.service'
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  formularLogin: FormGroup;

  respuesta: any;
  token:any;
  constructor(private alertController: AlertController, 
    public fb: FormBuilder, 
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private loginService: LoginServiceService,
    private anomalias: AnomaliasService,
    private users: UsersService,
    private employe: EmployeService,
    private products: ProductsService) {
    this.formularLogin = this.fb.group({
      "user": new FormControl("",Validators.required),
      "password": new FormControl("",Validators.compose([Validators.required,Validators.minLength(8)]) )
    })
  }

  ngOnInit() {
     localStorage.clear();
  }

  async login() {
    var datos = this.formularLogin.value;
    let jsonLogin = {
      "login": datos.user,
      "password": datos.password
    }


    if (this.formularLogin.invalid) {
      
this.alert('Alerta', 'Datos incompletos')
    }
    else{
      this.loginService.login(jsonLogin).subscribe( res =>{
        console.log(res['success']['token']);
        localStorage.setItem('token',res['success']['token']);
        this.token= localStorage.getItem('token');

        this.employe.employeInfo(jsonLogin.login, this.token).subscribe(
          res => { 
            this.products.products(this.token,res['id']).subscribe( 
              res =>{              
    
                localStorage.setItem('products', JSON.stringify(res))
              });
            })
        
        this.anomalias.getAnomalias(this.token).subscribe( res =>{
         
        localStorage.setItem('anomalies', JSON.stringify(res));
        })
      
        this.router.navigate(['/pendientes']);

    },(error)=>{
       console.log(error)
       this.alert('Alerta','Credenciales incorrectas')

      // if(error.status){enviar alerta correspondiente al error}
    })
    }
    this.formularLogin.reset();
  }

  async alert(header:string,message:string){
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}

  /*
  this.users.users(this.token,res['id']).subscribe( 
              res =>{
                console.log(res.data)
                localStorage.setItem('users', JSON.stringify(res))
              });
  */ 
