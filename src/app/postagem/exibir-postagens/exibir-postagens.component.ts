import { Component } from '@angular/core';
import { Postagem } from '../../shared/model/postagem';
import { PostagemService } from '../../shared/service/postagem.service';
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
  mostrarSecao: boolean[] = [true, false];
  desabilitados: boolean = false;
  
  constructor(
    private firestoreService: FirestoreService,
    private usuarioService: UsuarioService,
    private postagemService: PostagemService
  ) {
    this.buscarPostsEmAberto();
    this.buscarPostsEncerrados();
  }

  // desabilitarBotoes(postagem: Postagem){
  //   this.postagemService.desabilitar(postagem);
  // }

  contarVoto(postagem: Postagem, voto: string){
    this.postagemService.contabilizar(postagem, voto);
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

  mostrarPostagens(secao: string){
    if(secao === "abertas"){
      this.mostrarSecao = [true, false]
    } else {
      this.mostrarSecao = [false, true]
    }
  }
}