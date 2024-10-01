import { Component } from '@angular/core';
import { Postagem } from '../../shared/model/postagem';
import { FirestoreService } from '../../shared/service/firestore.service';
import { UsuarioService } from '../../shared/service/usuario.service'

@Component({
  selector: 'exibir-postagens',
  templateUrl: './exibir-postagens.component.html',
  styleUrl: './exibir-postagens.component.scss'
})
export class ExibirPostagensComponent {
  postagensEmAberto: Postagem[] = [];
  postagensEncerradas: Postagem[] = [];
 
  
  constructor(
    private firestoreService: FirestoreService,
    private  usuarioService: UsuarioService
  ) {
    this.buscarPostsEmAberto();
    this.buscarPostsEncerrados();
  }

  buscarPostsEmAberto(){
    this.firestoreService.listarPostagensStatus("aberta").subscribe({
      next: postagens => {
        this.postagensEmAberto = postagens;
        console.log(postagens)
      },
      error: erro => {
        return erro;
      }
    })
  }

  buscarPostsEncerrados(){
    this.firestoreService.listarPostagensStatus("encerrada").subscribe({
      next: postagens => {
        this.postagensEncerradas = postagens;
        console.log(postagens)
      },
      error: erro => {
        return erro;
      }
    })
  }
}