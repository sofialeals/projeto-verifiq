import { Component } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';
import { UsuarioService } from '../../shared/service/usuario.service';

@Component({
  selector: 'cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrl: './cadastrar-usuario.component.scss'
})
export class CadastrarUsuarioComponent {
  usuario : Usuario = new Usuario("", "", "", "");

  constructor(private service : UsuarioService){}

  verificarUsername(){
    // to do
  }

  cadastrarUsuario(){
    this.service.inserir(this.usuario).subscribe(
      {
        next: usuarioInserido => {
          if(usuarioInserido){
            // informar que houve o cadastro
            console.log("cadastrou");
            this.usuario = new Usuario("", "", "", "");
          } else {
            // informar que nao inseriu
            console.log("nõ cadastrou");
            this.usuario = new Usuario("", "", "", "");
          }
        }
      }
    )
    
  }
}
