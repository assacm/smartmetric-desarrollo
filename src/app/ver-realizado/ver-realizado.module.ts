import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerRealizadoPageRoutingModule } from './ver-realizado-routing.module';

import { VerRealizadoPage } from './ver-realizado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerRealizadoPageRoutingModule
  ],
  declarations: [VerRealizadoPage]
})
export class VerRealizadoPageModule {}
