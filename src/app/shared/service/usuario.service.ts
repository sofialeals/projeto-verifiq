import { Injectable } from '@angular/core';
import { UsuarioRest } from './rest.service';
import { Usuario } from '../model/usuario';
import { switchMap } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private rest: UsuarioRest) {}

  inserir(usuario: Usuario){
    return this.rest.buscarCpf(usuario.cpf).pipe(
      switchMap(usuarioBuscado => {
        if(usuarioBuscado.length === 0) {
          return this.rest.inserir(usuario);
        } else {
          return of(false);
        }
      } 
      )
    );
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