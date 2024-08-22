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
    this.service.inserir(this.usuario);
    this.usuario = new Usuario("", "", "", "");
  }
}
