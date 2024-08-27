// import { createClient, SupabaseClient } from '@supabase/supabase-js'
// import { SUPABASE_KEY, SUPABASE_URL } from '../../../../arquivo';
import { Injectable } from '@angular/core';
import { PostagemRestService } from './postagem-rest.service';
import { Postagem } from '../model/postagem';
import { UsuarioService } from './usuario.service';
import { UsuarioRestService } from './usuario-rest.service';
import { SnackBarService } from './snack-bar.service';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {
  
  constructor(
    private servicoUsuario : UsuarioService,
    private rest : PostagemRestService,
    private usuarioRest : UsuarioRestService, 
    private snackbar : SnackBarService
  ){}

  // private supabase : SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

  criarPostagem(cpfUsuario: string, titulo: string, texto : string){
    this.servicoUsuario.buscarUsuario(cpfUsuario).subscribe(
      {
        next: usuarioBuscado => {
          if(usuarioBuscado instanceof Object){
            const postagem : Postagem = new Postagem(titulo, texto, usuarioBuscado);
            this.rest.inserir(postagem).subscribe(
              {
                next: postagemInserida => this.snackbar.exibirMensagem('Postagem inserida. Acompanhe o progresso por meio da aba "Minhas postagens".')
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

