import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RealizadosPage } from './realizados.page';

const routes: Routes = [
  {
    path: '',
    component: RealizadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RealizadosPageRoutingModule {}
