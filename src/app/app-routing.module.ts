import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarPostagemComponent } from './postagem/criar-postagem/criar-postagem.component';
import { CadastrarUsuarioComponent } from './usuario/cadastrar-usuario/cadastrar-usuario.component';
import { LoginUsuarioComponent } from './usuario/login-usuario/login-usuario.component';
import { ExibirPostagensComponent } from './postagem/exibir-postagens/exibir-postagens.component';

const routes: Routes = [

  {
    path: 'criar-postagem',
    component: CriarPostagemComponent
  },
  {
    path: 'cadastrar-usuario',
    component: CadastrarUsuarioComponent
  },
  {
    path: 'login-usuario',
    component: LoginUsuarioComponent
  },
  {
    path: 'exibir-postagens',
    component: ExibirPostagensComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
