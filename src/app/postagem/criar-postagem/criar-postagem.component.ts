import { Component } from '@angular/core';
// import { PostagemService } from '../../shared/service/postagem.service';

@Component({
  selector: 'criar-postagem',
  templateUrl: './criar-postagem.component.html',
  styleUrl: './criar-postagem.component.scss'
})
export class CriarPostagemComponent {
  private midia : File | null = null;

  // constructor(private servico : PostagemService){}

  // salvarArq(evento : Event){
  //   this.midia = this.servico.capturarMidia(evento);
  // }
}
