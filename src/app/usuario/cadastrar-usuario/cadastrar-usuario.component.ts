import { Component } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';
import { UsuarioService } from '../../shared/service/usuario.service';
import { SnackBarService } from '../../shared/service/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrl: './cadastrar-usuario.component.scss'
})
export class CadastrarUsuarioComponent {
  usuario : Usuario = new Usuario("", "", "", "");

  constructor(
    private service : UsuarioService,
    private snackbar : SnackBarService,
    private roteador : Router
  ){}

  cadastrarUsuario(){
    this.service.inserir(this.usuario).subscribe(
      {
        next: usuarioInserido => {
          if(usuarioInserido){
            this.snackbar.exibirMensagem("Cadastro realizado com sucesso.")
            this.usuario = new Usuario("", "", "", "");
            this.roteador.navigate(["/"]);
          } else {
            this.snackbar.exibirMensagem("Não foi possível realizar o cadastro. Nome de usuário ou CPF já cadastrados.")
            this.usuario = new Usuario("", "", "", "");
          }
        }
      }
    )
    
  }
}
