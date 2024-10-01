import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PostagensUsuarioComponent } from './postagens-usuario/postagens-usuario.component';

const routes: Routes = [
  {
    path: 'cadastrar-usuario',
    component: CadastrarUsuarioComponent
  }
];

@NgModule({
  declarations: [
    CadastrarUsuarioComponent,
    LoginUsuarioComponent,
    PostagensUsuarioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  exports: [
    CadastrarUsuarioComponent,
    LoginUsuarioComponent,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UsuarioModule { }
