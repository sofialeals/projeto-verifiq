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
            if(usuarioBuscado.length > 0 && usuarioBuscado[0].id != undefined){
              const idUsuario = usuarioBuscado[0].id;
              const postagem : Postagem = new Postagem(titulo, texto, idUsuario);
              this.postagemRest.inserir(postagem).subscribe(
                {
                  next: postagemInserida => {
                    if(postagemInserida.id != undefined){
                      this.servicoUsuario.adicionarPostUsuario(usuarioBuscado[0].cpf, postagemInserida.id)
                    }
                  }
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

