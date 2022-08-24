import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapturarPage } from './capturar.page';

const routes: Routes = [
  {
    path: '',
    component: CapturarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapturarPageRoutingModule {}
