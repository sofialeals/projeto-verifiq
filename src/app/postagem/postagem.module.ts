import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { CriarPostagemComponent } from './criar-postagem/criar-postagem.component';
import { ExibirPostagensComponent } from './exibir-postagens/exibir-postagens.component';

@NgModule({
  declarations: [
    CriarPostagemComponent,
    ExibirPostagensComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CriarPostagemComponent,
    ExibirPostagensComponent
  ]
})
export class PostagemModule { }
