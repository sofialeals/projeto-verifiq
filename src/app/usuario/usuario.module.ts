import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cadastrar-usuario',
    component: CadastrarUsuarioComponent
  }
];

@NgModule({
  declarations: [
    CadastrarUsuarioComponent,
    LoginUsuarioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    CadastrarUsuarioComponent,
    LoginUsuarioComponent,
    RouterModule,
    MaterialModule
  ]
})
export class UsuarioModule { }
