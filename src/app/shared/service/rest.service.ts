import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { Postagem } from '../model/postagem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsuarioRest{
  private http: HttpClient;

  rotaUsuarios = 'http://localhost:3000/usuarios';
    
  constructor(http : HttpClient) {
    this.http = http;
  }

  inserir(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.rotaUsuarios, usuario);
  }

  buscar(cpf: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.rotaUsuarios}/${cpf}`);
  }
}

export class PostagemRest{
  private http: HttpClient;

  rotaPostagens = 'http://localhost:3000/postagens';
    
  constructor(http : HttpClient) {
    this.http = http;
  }

  inserir(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>(this.rotaPostagens, postagem);
  }

  buscar(username: string): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`${this.rotaPostagens}/${username}`);
  }
}