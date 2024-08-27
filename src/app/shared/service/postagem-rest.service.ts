import { Injectable } from '@angular/core';
import { Postagem } from '../model/postagem';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostagemRestService {

  rotaPostagens = 'http://localhost:3000/postagens';
    
  constructor(private http: HttpClient) {}

  inserir(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>(this.rotaPostagens, postagem);
  }

  buscar(username: string): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`${this.rotaPostagens}/${username}`);
  }

  listar(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`${this.rotaPostagens}`);
  }

}
