import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarPostagemComponent } from './postagem/criar-postagem/criar-postagem.component';
import { CadastrarUsuarioComponent } from './usuario/cadastrar-usuario/cadastrar-usuario.component';

const routes: Routes = [

  {
    path: 'criar-postagem',
    component: CriarPostagemComponent
  },

  {
    path: 'cadastrar-usuario',
    component: CadastrarUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
