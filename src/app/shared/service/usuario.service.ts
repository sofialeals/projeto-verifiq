import { Injectable } from '@angular/core';
import { UsuarioRestService } from './usuario-rest.service';
import { Usuario } from '../model/usuario';
import { switchMap } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private rest: UsuarioRestService) {}

  inserir(usuario: Usuario){
    return this.rest.buscarCpf(usuario.cpf).pipe(
      switchMap(usuarioBuscado => {
        if(usuarioBuscado.length === 0) {
          return this.usernameExiste(usuario).pipe(
            switchMap(resposta => {
              if(resposta){
                return this.rest.inserir(usuario);
              } else {
                return of(false);
              }
            }) 
          )
        } else {
          return of(false);
        }
      }),
      
    );
  }


  usernameExiste(usuario: Usuario){
    return this.rest.buscarUsername(usuario.nomeUsuario).pipe(
      switchMap(usuarioBuscado => {
        if(usuarioBuscado.length === 0) {
          return of(true);
        } else {
          return of(false);
        }
      })
    );
  }

  buscarUsuario(cpf: string) {
    console.log("Entrei no buscar")
    return this.rest.buscarCpf(cpf).pipe(
      switchMap(usuarioBuscado => {
        console.log(usuarioBuscado)
        if(usuarioBuscado.length === 0){
          console.log("Entrei no IF")
          return of(false);
        } else {
          console.log("Entrei no ELSE")
          return usuarioBuscado;
        }
      })
    )
  }
}




