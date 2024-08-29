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
    private usuarioService : UsuarioService
  ){}

  cadastrarUsuario(){
    this.usuarioService.inserir(this.usuario);
  }
}
