import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StorageService } from '../servicios/storage.service';
import { UploadService } from '../servicios/upload.service';

@Component({
  selector: 'app-realizados',
  templateUrl: './realizados.page.html',
  styleUrls: ['./realizados.page.scss'],
})
export class RealizadosPage implements OnInit, AfterViewInit {
  
   completed = JSON.parse(localStorage.getItem('completed'));
  
   constructor(private updateStrg : StorageService, private uploadS : UploadService) { }
 
  ngAfterViewInit(): void {
     this.updateStrg.getCompleted().subscribe(res => {
      console.log(res.text)
      this.completed=res.text
     });
    }

  ngOnInit() {

  }

  upload(){
    console.log('clicked');
    /*this.uploadS.upload(this.completed).subscribe( res =>{
      console.log(res);
      //if res === 200
      localStorage.removeItem('readings');
      localStorage.removeItem('completed');
      //else Fallo en la subida, intente de nuevo
    }); */
    //probablemente necesite recargar pagina, checar ese detalle
  }
  
}
