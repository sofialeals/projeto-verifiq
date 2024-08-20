import { Injectable } from '@angular/core';
import { UsuarioRest } from './rest.service';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private rest: UsuarioRest) {}

  inserir(usuario: Usuario): Usuario | null {
    let usuarioInserido: Usuario | null = null;
    let usuarioRetornado: boolean = this.buscar(usuario);

    if(usuarioRetornado){
      return null;
    } else {
      this.rest.inserir(usuario).subscribe(
        {
          next: usuarioRetornado => {
            usuarioInserido = usuarioRetornado;
          }
        }
      );
      return usuarioInserido;
    }
  }

  buscar(usuario: Usuario): boolean {
    let usuarioRetornado: boolean = false;

    this.rest.buscar(usuario.cpf).subscribe(
      {
        next: usuarioBuscado => {
          if(usuarioBuscado.length === 0) {
            usuarioRetornado = false;
          } else {
            usuarioRetornado = true;
          }
        }
      }
    );

    return usuarioRetornado;
  }
  
}