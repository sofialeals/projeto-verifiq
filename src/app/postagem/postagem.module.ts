import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { CriarPostagemComponent } from './criar-postagem/criar-postagem.component';

@NgModule({
  declarations: [
    CriarPostagemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CriarPostagemComponent
  ]
})
export class PostagemModule { }
