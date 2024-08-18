import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import { UsuarioRest } from './rest.service';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private rest: UsuarioRest) {
  }

  

  inserir(usuario: Usuario) {
    let usuarioInserir = null;

    // Verificar se o usuário já existe
    this.rest.buscar(usuario.cpf).subscribe(
      { next:usuarioDevolvido => usuarioInserir = usuarioDevolvido}
      
    )
   
  }
  
}