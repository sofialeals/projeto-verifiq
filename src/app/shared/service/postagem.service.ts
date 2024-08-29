import { Injectable } from '@angular/core';
import { PostagemRestService } from './postagem-rest.service';
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
    private postagemRest : PostagemRestService,
    private snackbar : SnackBarService,
    private localStorage : LocalStorageService
  ){}

  criarPostagem(titulo: string, texto : string){
    const cpfUsuario = this.localStorage.retornarUsuario("cpfUsuario");

    if(cpfUsuario != null){
      this.servicoUsuario.buscarUsuario(cpfUsuario).subscribe(
        {
          next: usuarioBuscado => {
            if(usuarioBuscado.length > 0){
              const postagem : Postagem = new Postagem(titulo, texto, usuarioBuscado[0]);
              this.postagemRest.inserir(postagem).subscribe(
                {
                  next: postagemInserida => this.servicoUsuario.adicionarPostUsuario(usuarioBuscado[0].cpf, postagemInserida)
                }
              );  
            } else {
              this.snackbar.exibirMensagem("Usuário não encontrado.")
            }
          }
        }
      )
    }
  }
}

