import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Pendientes', url: '/pendientes', icon: 'list-circle' },
    { title: 'Ruta', url: '/ruta', icon: 'analytics' },
    { title: 'Realizados', url: '/realizados', icon: 'checkmark-circle' },
    { title: 'Estadística', url: '/estadistica', icon: 'bar-chart' },
    { title: 'Ayuda', url: '/ayuda', icon: 'help-circle' },
    { title: 'Cerrar sesión', url: '/log-in', icon: 'log-out' },
  ];
 
  constructor() {}
}
