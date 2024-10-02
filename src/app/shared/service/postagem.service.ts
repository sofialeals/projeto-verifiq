import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Postagem } from '../model/postagem';
import { UsuarioService } from './usuario.service';
import { SnackBarService } from './snack-bar.service';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {
  
  constructor(
    private servicoUsuario : UsuarioService,
    private fireStore : FirestoreService,
    private snackbar : SnackBarService,
    private localStorage : LocalStorageService
  ){}

  atualizar(postagem: Postagem){
    postagem.status = "encerrada";
    return this.fireStore.atualizar(postagem).subscribe({
      next: resposta => {
        this.snackbar.exibirMensagem("Você encerrou essa postagem.")
      },
      error: erro => {
        this.snackbar.exibirMensagem("Ocorreu um erro ao encerrar postagem.")
      }
    })
  }

  contabilizar(postagem: Postagem, voto: string){
    if(voto === "like"){
      postagem.like = Number(postagem.like) + 1;
    } else {
      postagem.dislike = Number(postagem.dislike) + 1;
    }
    return this.fireStore.atualizar(postagem).subscribe({
      next: resposta => {
        return resposta;
      },
      error: erro => {
        return erro;
      }
    })
  }

  // desabilitar(postagem: Postagem){
  //   postagem.desabilitada = true;
  //   return this.fireStore.atualizar(postagem).subscribe({
  //     next: resposta => {
  //       this.snackbar.exibirMensagem("Agradecemos pela sua contribuição.")
  //     },
  //     error: erro => {
  //       this.snackbar.exibirMensagem("Ocorreu um erro ao votar na postagem.")
  //     }
  //   })
  // }

  criarPostagem(titulo: string, texto: string, link: string): void {
    const cpfUsuario = this.localStorage.retornarUsuario("cpfUsuario");
  
    if (cpfUsuario != null) {
      this.servicoUsuario.buscarUsuarioCpf(cpfUsuario).subscribe({
        next: usuarioBuscado => {
          if (usuarioBuscado && usuarioBuscado.id != undefined) {
            const postagem: Postagem = new Postagem(usuarioBuscado.nomeUsuario, titulo, texto, usuarioBuscado.id, link);
            
            // Removendo o campo id antes de inserir no Firestore
            delete postagem.id;
            
            // Inserindo a postagem e recebendo o ID gerado pelo Firestore
            this.fireStore.inserir(postagem).subscribe({
              next: postagemInserida => {
                if (postagemInserida && postagemInserida.id != undefined) {
                  // Adiciona o ID da postagem ao usuário
                  this.servicoUsuario.adicionarPostUsuario(usuarioBuscado.cpf, postagemInserida.id);
                } else {
                  this.snackbar.exibirMensagem("Erro ao obter ID da postagem.");
                }
              },
              error: () => {
                this.snackbar.exibirMensagem("Erro ao criar a postagem.");
              }
            });
  
          } else {
            this.snackbar.exibirMensagem("Usuário não encontrado.");
          }
        },
        error: () => {
          this.snackbar.exibirMensagem("Erro ao buscar o usuário.");
        }
      });
    } else {
      this.snackbar.exibirMensagem("CPF do usuário não encontrado no localStorage.");
    }
  }
}  