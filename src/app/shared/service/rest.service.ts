import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { Postagem } from '../model/postagem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsuarioRest{
  rotaUsuarios = 'http://localhost:3000/usuarios';
    
  constructor(
    private http: HttpClient
  ) {}

  inserir(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.rotaUsuarios, usuario);
  }

  buscarCpf(cpf: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.rotaUsuarios}?cpf=${cpf}`);
  }

  buscarUsername(username: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.rotaUsuarios}?nomeUsuario=${username}`);
  }
}

export class PostagemRest{

  rotaPostagens = 'http://localhost:3000/postagens';
    
  constructor(private http: HttpClient) {}

  inserir(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>(this.rotaPostagens, postagem);
  }

  buscar(username: string): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`${this.rotaPostagens}/${username}`);
  }
}