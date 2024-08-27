import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { HttpClient } from '@angular/common/http';
import { Postagem } from '../model/postagem';

@Injectable({
  providedIn: 'root'
})

export class UsuarioRestService{
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

  // atualizar(cpf: string, dadosAtualizados: Partial<Usuario>): Observable<Usuario> {
  //   return this.http.patch<Usuario>(`${this.rotaUsuarios}?cpf=${cpf}`, dadosAtualizados);
  // }

  // atualizar(cpf: string, usuario: Usuario): Observable<Usuario> {
  //   return this.http.put<Usuario>(`${this.rotaUsuarios}?cpf=${cpf}`, usuario);
  // }
}