import { Injectable } from '@angular/core';
import { UsuarioRest } from './rest.service';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private rest: UsuarioRest) {}

  inserir(usuario: Usuario): Usuario | null{
    let usuarioInserido: Usuario | null = null;

    this.rest.buscar(usuario.cpf).subscribe(
      {
        next: usuarioBuscado => {
          console.log(usuarioBuscado);
          if(usuarioBuscado.length === 0) {
            this.rest.inserir(usuario).subscribe(
              {
                next: resposta => {
                  usuarioInserido = resposta;
                }
              }
            );
          } else {
            usuarioInserido = null;
          }
        }
      }
    );

    return usuarioInserido;
  }
}