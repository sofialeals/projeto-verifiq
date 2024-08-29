import { Injectable } from '@angular/core';
import { UsuarioRestService } from './usuario-rest.service';
import { Usuario } from '../model/usuario';
import { switchMap } from 'rxjs';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from './localstorage.service';
import { SnackBarService } from './snack-bar.service';
import { Postagem } from '../model/postagem';

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
    this.rest.buscarCpf(usuario.cpf).subscribe(
      {
        next: usuarioBuscado => {
          if(usuarioBuscado.length === 0){
            this.usernameExiste(usuario).subscribe(
              {
                next: resposta => {
                  if(resposta){
                    this.rest.inserir(usuario).subscribe(
                      {
                        next: usuarioInserido => {
                          this.snackbar.exibirMensagem("Você foi cadastrado.");
                          this.logarUsuario(usuario.cpf, usuario.senha)
                          this.roteador.navigate(["/"]);
                        }
                      }
                    );
                  }
                  else {
                    this.snackbar.exibirMensagem("Esse nome de usuário já existe.")
                  }
                }
              }
            )
          } else {
            this.snackbar.exibirMensagem("O usuário já existe.")
          }
        }
      }
    )
  }

  buscarUsuario(cpfUsuario: string){
    return this.rest.buscarCpf(cpfUsuario);
  }

  usernameExiste(usuario: Usuario){
    return this.rest.buscarUsername(usuario.nomeUsuario).pipe(
      switchMap(usuarioBuscado => {
        if(usuarioBuscado.length === 0) {
          return of(true);
        } else {
          return of(false);
        }
      })
    );
  }

  logarUsuario(cpfUsuario: string, senhaUsuario: string) {
    this.rest.buscarCpf(cpfUsuario).subscribe(
      {
        next: usuarioRetornado => {
          if(usuarioRetornado.length > 0) {
            if(usuarioRetornado[0].senha === senhaUsuario){
              this.localStorage.logarUsuario(cpfUsuario);

              const botaoPressionado = this.rota.snapshot.queryParamMap.get('returnUrl');
              if(botaoPressionado === '0'){
                this.roteador.navigate(["/criar-postagem"]);
              } else if (botaoPressionado === '1'){
                this.roteador.navigate(["/exibir-postagens"]);
              } else {
                this.roteador.navigate(["/"]);
              }
            } else {
              this.snackbar.exibirMensagem("Senha incorreta. Tente novamente.");
            }
          }
          else {
            this.snackbar.exibirMensagem(`O usuário de CPF ${cpfUsuario} não existe.`);
          }
        }
      }
    )
  }

  adicionarPostUsuario(cpfUsuario: string, novaPostagem: Postagem){
    this.rest.buscarCpf(cpfUsuario).subscribe(
      {
        next: usuarioBuscado => {
          const postsAtualizados: Postagem[] = [...usuarioBuscado[0].postagens, novaPostagem];
          this.rest.atualizarPostsUsuario(usuarioBuscado[0].id, postsAtualizados).subscribe(
            {
              next: resposta => this.snackbar.exibirMensagem('Postagem inserida. Acompanhe o progresso por meio da aba "Minhas postagens".')
            }
          )
        }
      }
    )
  }
}