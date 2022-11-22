import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginServiceService } from '../servicios/login-service.service';
import { Router } from '@angular/router';
import { concatMap, tap} from 'rxjs/operators';
import { FormGroup, FormArray, Validators, FormBuilder, FormControl, RequiredValidator } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AnomaliasService } from '../servicios/anomalias.service';
import { EmployeService} from '../servicios/employe.service';
import {ProductsService} from '../servicios/products.service';
import { LoadingController } from '@ionic/angular';

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
    private employe: EmployeService,
    private products: ProductsService,
    private loadingCtrl: LoadingController) {
    this.formularLogin = this.fb.group({
      "user": new FormControl("",Validators.required),
      "password": new FormControl("",Validators.compose([Validators.required,Validators.minLength(8)]) )
    })
  }

  ngOnInit() {
     this.token = localStorage.getItem('token');
     if(this.token){ console.log(this.token); this.router.navigate(['/pendientes'])}
    
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
      this.showLoading();

      this.loginService.login(jsonLogin).pipe(
        tap( post => {this.token=post['success']['token'];
        localStorage.setItem('token', this.token)}),
        concatMap( employee => this.employe.employeInfo(jsonLogin.login, this.token)),
        tap( resp => localStorage.setItem('employee', JSON.stringify(resp))),
        concatMap( products => this.products.products(this.token, products.id)),
        tap( resp => localStorage.setItem('products', JSON.stringify(resp[0].data))),
        concatMap( anomalies => this.anomalias.getAnomalias(this.token)),
        tap( resp =>localStorage.setItem('anomalies', JSON.stringify(resp))),
        tap(res => this.loadingCtrl.dismiss())
       ).subscribe(() => {      
        this.router.navigate(['/pendientes']);
        }, (error) => {
        console.log(error)
        this.loadingCtrl.dismiss();

        this.alert('Alerta','Credenciales incorrectas')
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
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
    });

    loading.present();
  }
}


/*
this.loginService.login(jsonLogin).subscribe( res =>{
        console.log(res['success']['token']);
        localStorage.setItem('token',res['success']['token']);
        this.token= localStorage.getItem('token');

        this.employe.employeInfo(jsonLogin.login, this.token).subscribe(
          res => { 
            this.products.products(this.token,res['id']).subscribe( 
              res =>{              
    
                localStorage.setItem('products', JSON.stringify(res))

                this.router.navigate(['/pendientes']);

              });
            })
        
        this.anomalias.getAnomalias(this.token).subscribe( res =>{
         
        localStorage.setItem('anomalies', JSON.stringify(res));
        })
      

    },(error)=>{
       console.log(error)
       this.alert('Alerta','Credenciales incorrectas')

      // if(error.status){enviar alerta correspondiente al error}
    })



*/

/*() => {

      // Here you are sure that the send has shared the data sucessFully

    }, (error) => {

    } 
    {
      next(x) {
        console.log(x);
      },
      error(err) {
        //this.alert('Alerta','Credenciales incorrectas');
        console.error('something wrong occurred: ' + err);
      }, 
      complete() {
        console.log('done');
       // this.router.navigate(['/pendientes']);
      },
    }
    
    */