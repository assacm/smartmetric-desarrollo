import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClient, HttpClientModule } from '@angular/common/http'
import { HttpMetodosService } from './servicios/http-metodos.service';
import { LoginServiceService} from '../app/servicios/login-service.service'
import { UsersService } from './servicios/users.service';
import {AnomaliasService} from '../app/servicios/anomalias.service'
import { EmployeService } from './servicios/employe.service';
import { ProductsService } from './servicios/products.service';
import{ environment} from '../environments/environment'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: 
  [ HttpMetodosService,
    LoginServiceService,
    UsersService,
    AnomaliasService,
    EmployeService,
    ProductsService,
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
