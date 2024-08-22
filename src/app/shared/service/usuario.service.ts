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

    this.rest.buscarCpf(usuario.cpf).subscribe(
      {
        next: usuarioBuscado => {
          if(usuarioBuscado.length === 0) {
            this.rest.inserir(usuario).subscribe(
              {
                next: resposta => {
                  usuarioInserido = resposta;
                  // return usuarioInserido;
                }
              }
            );
            // this.rest.buscarUsername(usuario.nomeUsuario).subscribe(
            //   {
            //     next: usuarioEncontrado => {
            //       if(usuarioEncontrado.length === 0){
            //         this.rest.inserir(usuario).subscribe(
            //           {
            //             next: resposta => {
            //               usuarioInserido = resposta;
            //             }
            //           }
            //         );
            //       } else {
            //         usuarioInserido = null;
            //       }
            //     }
            //   }
            // )
          } else {
            usuarioInserido = null;
            // return usuarioInserido;
          }
        }
      }
    );
    return usuarioInserido;
  }

  usernameExiste(usuario: Usuario): boolean{
    let usernameExiste: boolean = false;

    this.rest.buscarUsername(usuario.nomeUsuario).subscribe(
        {
          next: usuarioEncontrado => {
            if(usuarioEncontrado.length === 0){
              usernameExiste = false;
              return usernameExiste;
            } else {
              usernameExiste = true;
              return usernameExiste;
            }
          }
        }
    )

    return usernameExiste;
  }
}