import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormArray, Validators, FormBuilder, FormControl, RequiredValidator } from '@angular/forms';
import { of } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LoginServiceService } from '../servicios/login-service.service';

@Component({
  selector: 'app-capturar',
  templateUrl: './capturar.page.html',
  styleUrls: ['./capturar.page.scss'],
})
export class CapturarPage implements OnInit {
  fgCaptura: FormGroup;
  token:any = localStorage.getItem('token');
  id: any;
  nombre: string;
  medidor: string;
  direccion: string;
  mes: string;
  usuarios: any;
  
  public form = [
    { val: 'Ninguna', isChecked: true },
    { val: 'Sin cambios', isChecked: false },
    { val: 'Sin medidor', isChecked: false }
  ];
  
  option={
    slidesPerView:1.5,
    centeredSlides: true,
    loop:true,
    spaceBetween:10,
   
  }
  constructor(
    private alertController: AlertController, 
    public fb: FormBuilder, 
    private router: Router, 
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private loginService:LoginServiceService) { 
    this.fgCaptura = this.fb.group({
      "lectura": new FormControl("",Validators.compose([Validators.required,Validators.minLength(10)]) ),
      "confirmar": new FormControl("",Validators.compose([Validators.required,Validators.minLength(10)]) )
    })

  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.loginService.getUsers('smartmetricapi/readingss', this.token).subscribe(res=>{
      console.log("res", res)
      console.log('wenas wenas')
      this.usuarios= res;

      //this.nombre=  this.usuarios[this.id].name;
     // this.medidor= this.usuarios[this.id]
      //this.direccion=
      //this.mes=
      //this.usuarios=
    });
  }
  
  validacion(){
    var lecturas = this.fgCaptura.value;
    let  lectura = lecturas.lectura;
    let confirmar=lecturas.confirmar;
    
    if (this.fgCaptura.invalid) {
      
      this.alert('Alerta', 'Datos incompletos')
 
     }else{
       
      if(lectura != confirmar){
        this.alert('Alerta','La lectura ingresada no coincide')
      }
      else{
        this.alert('Finalizado', 'Captura realizada con éxito')
      }
 
     }
    
    // this.fgCaptura.reset();

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
