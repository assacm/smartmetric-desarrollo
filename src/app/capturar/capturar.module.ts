import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapturarPageRoutingModule } from './capturar-routing.module';

import { CapturarPage } from './capturar.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    CapturarPageRoutingModule
  ],
  declarations: [CapturarPage]
})
export class CapturarPageModule {}
