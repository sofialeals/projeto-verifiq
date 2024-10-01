import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UsuarioRestService{
  rotaUsuarios = 'http://localhost:8080/usuarios';
    
  constructor(
    private http: HttpClient
  ) {}

  inserir(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.rotaUsuarios, usuario);
  }

  buscarPorId(id: Number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.rotaUsuarios}/${id}`)
  }

  buscarPorCpf(cpf: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.rotaUsuarios}/cpf?cpf=${cpf}`);
  }

  buscarPostagens(id: Number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.rotaUsuarios}/${id}/postagens`);
  }

  buscarNomeUsuario(username: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.rotaUsuarios}/nomeUsuario?nomeUsuario=${username}`);
  }

  atualizarPostsUsuario(idUsuario: number, novasPostagens: string[]): Observable<any> {
    return this.http.patch(`${this.rotaUsuarios}/${idUsuario}/postagens`, novasPostagens);
  }

  verificarSenha(credenciais: string[]): Observable<any> {
    return this.http.post(`${this.rotaUsuarios}/autenticacao`, credenciais);
  }
}