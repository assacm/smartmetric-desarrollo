import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StorageService } from '../servicios/storage.service';

@Component({
  selector: 'app-realizados',
  templateUrl: './realizados.page.html',
  styleUrls: ['./realizados.page.scss'],
})
export class RealizadosPage implements OnInit, AfterViewInit {
  
   completed = JSON.parse(localStorage.getItem('completed'));
  
   constructor(private updateStrg : StorageService) { }
 
  ngAfterViewInit(): void {
     this.updateStrg.getCompleted().subscribe(res => {
      console.log(res.text)
      this.completed=res.text
     });
    }

  ngOnInit() {

  }


  
}
