import { Component } from '@angular/core';
import { Postagem } from '../../shared/model/postagem';
import { PostagemRestService } from '../../shared/service/postagem-rest.service';

@Component({
  selector: 'exibir-postagens',
  templateUrl: './exibir-postagens.component.html',
  styleUrl: './exibir-postagens.component.scss'
})
export class ExibirPostagensComponent {
  postagens: Postagem[] = [];

  constructor(
    private restService: PostagemRestService
  ) {
    this.restService.listar().subscribe(
      {
        next: resposta => {
          this.postagens = resposta
          console.log(resposta)
        }
      }
    );
  }
}