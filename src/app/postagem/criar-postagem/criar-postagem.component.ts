import { Component } from '@angular/core';
import { PostagemService } from '../../shared/service/postagem.service';
import { LocalStorageService } from '../../shared/service/localstorage.service';

@Component({
  selector: 'criar-postagem',
  templateUrl: './criar-postagem.component.html',
  styleUrl: './criar-postagem.component.scss'
})
export class CriarPostagemComponent {
  
  texto : string = "";
  titulo : string = "";

  constructor(
    private servicoPostagem : PostagemService,
    private localStorage: LocalStorageService
  ){}

  enviarPostagem(){
    this.servicoPostagem.criarPostagem(this.titulo, this.texto)
    this.limparInputs();
  }

  limparInputs(){
    this.texto = "";
    this.titulo = "";
  }
}