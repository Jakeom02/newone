import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { FileValidatorComponent } from './components/file-validator/file-validator.component';


const routes: Routes = [
  { path: "", component: FileValidatorComponent },
  { path: 'fv', component: FileValidatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
