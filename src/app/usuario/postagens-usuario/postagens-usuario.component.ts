import { Component } from '@angular/core';
import { SnackBarService } from '../../shared/service/snack-bar.service';
import { FirestoreService } from '../../shared/service/firestore.service';
import { Postagem } from '../../shared/model/postagem';
import { PostagemService } from '../../shared/service/postagem.service';
import { UsuarioService } from '../../shared/service/usuario.service';
import { LocalStorageService } from '../../shared/service/localstorage.service';

@Component({
  selector: 'app-postagens-usuario',
  templateUrl: './postagens-usuario.component.html',
  styleUrl: './postagens-usuario.component.scss'
})
export class PostagensUsuarioComponent {

  postagensEmAberto: Postagem[] = [];
  postagensEncerradas: Postagem[] = [];
  cpfUsuario: string|null = "";

  constructor(
    private fireStore: FirestoreService,
    private localStorage: LocalStorageService,
    private usuarioService: UsuarioService,
    private postagemService: PostagemService,
    private snackbar: SnackBarService
  ){
    this.cpfUsuario = this.localStorage.retornarUsuario("cpfUsuario");
    this.buscarPostsEmAberto();
    this.buscarPostsEncerrados();
  }

  atualizarPostagem(postagem: Postagem){
    this.postagemService.atualizar(postagem);
  }
  
  apagarPostagem(id: string|undefined) {
    if(id != undefined){
      this.fireStore.apagar(id).subscribe({
        next: deletada => {
          this.snackbar.exibirMensagem("Postagem deletada.")
        },
        error: erro => {
          this.snackbar.exibirMensagem("Houve um erro ao deletar a postagem.")
        }
      })
    }

    if(id != null && this.cpfUsuario != null){
      this.usuarioService.removerPostUsuario(this.cpfUsuario, id);
    }
  }
  
  buscarPostsEmAberto(){
    if(this.cpfUsuario != null){
      this.usuarioService.buscarUsuarioCpf(this.cpfUsuario).subscribe({
        next: buscado => {
          if(buscado.id != undefined){
            this.fireStore.listarPostagensUsuario(buscado.id, "aberta").subscribe({
              next: postagens => {
                this.postagensEmAberto = postagens
              },
              error: erro => {
                return erro;
              }
            })
          }
        },
        error: erro => {
          return erro;
        }
      })
    }
  }

  buscarPostsEncerrados(){
    if(this.cpfUsuario != null){
      this.usuarioService.buscarUsuarioCpf(this.cpfUsuario).subscribe({
        next: buscado => {
          if(buscado.id != undefined){
            this.fireStore.listarPostagensUsuario(buscado.id, "encerrada").subscribe({
              next: postagens => {
                this.postagensEncerradas = postagens
              },
              error: erro => {
                return erro;
              }
            })
          }
        },
        error: erro => {
          return erro;
        }
      })
    }
  }
}