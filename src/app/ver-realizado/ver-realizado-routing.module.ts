import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerRealizadoPage } from './ver-realizado.page';

const routes: Routes = [
  {
    path: '',
    component: VerRealizadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerRealizadoPageRoutingModule {}
