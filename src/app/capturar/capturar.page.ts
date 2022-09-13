import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormArray, Validators, FormBuilder, FormControl, RequiredValidator } from '@angular/forms';
import { of } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-capturar',
  templateUrl: './capturar.page.html',
  styleUrls: ['./capturar.page.scss'],
})
export class CapturarPage implements OnInit {
  fgCaptura: FormGroup;
  
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
  constructor(private alertController: AlertController, public fb: FormBuilder, private router: Router) { 
    this.fgCaptura = this.fb.group({
      "lectura": new FormControl("",Validators.compose([Validators.required,Validators.minLength(10)]) ),
      "confirmar": new FormControl("",Validators.compose([Validators.required,Validators.minLength(10)]) )
    })

  }

  ngOnInit() {
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
