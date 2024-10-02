import { Injectable } from '@angular/core';
import { UsuarioRestService } from './usuario-rest.service';
import { Usuario } from '../model/usuario';
import { switchMap } from 'rxjs';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from './localstorage.service';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  constructor(
    private rest: UsuarioRestService,
    private roteador : Router,
    private rota : ActivatedRoute,
    private localStorage: LocalStorageService,
    private snackbar : SnackBarService
  ) {}

  inserir(usuario: Usuario){
    this.rest.buscarPorCpf(usuario.cpf).subscribe({
      next: (usuarioBuscado) => {
        this.snackbar.exibirMensagem(`O usuário com CPF ${usuarioBuscado.cpf} já está cadastrado`);
      },
      error: (erro) => {
        if(erro.status === 404) {
          this.rest.buscarNomeUsuario(usuario.nomeUsuario).subscribe({
            next: (usuarioRetornado) => {
              this.snackbar.exibirMensagem(`O nome de usuário ${usuarioRetornado.nomeUsuario} já está cadastrado`);
            },
            error: (erro) => {
              if(erro.status === 404){
                this.rest.inserir(usuario).subscribe({
                  next: (usuarioInserido) => {
                    this.snackbar.exibirMensagem("Você foi cadastrado.");
                    this.localStorage.logarUsuario(usuarioInserido.cpf);
                    this.roteador.navigate(["/"]);
                  },
                  error: (erro) => {
                    this.snackbar.exibirMensagem("Erro durante cadastramento: "+erro);
                  }});
              }
            }
          })
        } 
      }
    })
  }

  buscarUsuarioCpf(cpfUsuario: string){
    return this.rest.buscarPorCpf(cpfUsuario);
  }

  buscarUsuarioId(idUsuario: number){
    return this.rest.buscarPorId(idUsuario);
  }

  
  logarUsuario(cpf: string, senha: string) {
    this.rest.buscarPorCpf(cpf).subscribe({
      next: usuarioRetornado => {
        this.rest.verificarSenha([cpf, senha]).subscribe({
          next: verificacao => {
            if(verificacao){
              this.localStorage.logarUsuario(usuarioRetornado.cpf);
              const botaoPressionado = this.rota.snapshot.queryParamMap.get('returnUrl');
              if(botaoPressionado === '0'){
                this.roteador.navigate(["/criar-postagem"]);
              } else if (botaoPressionado === '1'){
                this.roteador.navigate(["/exibir-postagens"]);
              } else {
                this.roteador.navigate(["/"]);
              }
            } else {
              this.snackbar.exibirMensagem("Senha incorreta.");
            }
          },
          error: (erro) => {
            this.snackbar.exibirMensagem("Erro de autenticação: "+erro);
          }
        })
      },
      error: erro => {
        if(erro.status === 404){
          this.snackbar.exibirMensagem(`O usuário de CPF ${cpf} não existe.`);
        }
      }
    })
  }

  adicionarPostUsuario(cpfUsuario: string, idNovaPost: string){
    this.rest.buscarPorCpf(cpfUsuario).subscribe(
      {
        next: usuarioBuscado => {
          if(usuarioBuscado.id != undefined){
            this.rest.buscarPostagens(usuarioBuscado.id).subscribe({
              next: usuarioPostagens => {
                let postagens = usuarioPostagens.postagens;
                let postsAtualizados = [...postagens, idNovaPost];
                if(usuarioBuscado.id != undefined){
                  this.rest.atualizarPostsUsuario(usuarioBuscado.id, postsAtualizados).subscribe({
                      next: resposta =>{
                        this.snackbar.exibirMensagem('Postagem criada. Acompanhe o progresso por meio da aba "Minhas postagens".')
                      }, error: erro => {
                        this.snackbar.exibirMensagem("Não foi possível atualizar as postagens do usuário.")
                      }
                    })
                }
              }, error: erro => {
                this.snackbar.exibirMensagem("Não foi possível encontrar as postagens do usuário com ID "+usuarioBuscado.id)
              }
            })
          }          
        }
      }
    )
  }

  removerPostUsuario(cpfUsuario: string, idPostagem: string){
    this.rest.buscarPorCpf(cpfUsuario).subscribe({
        next: usuarioBuscado => {
          if(usuarioBuscado.id != undefined){
            this.rest.removerPostUsuario(usuarioBuscado.id, idPostagem).subscribe({
              next: resposta => {
                return resposta;
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