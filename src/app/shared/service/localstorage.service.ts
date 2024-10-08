import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private roteador: Router
  ) { }

  logarUsuario(cpf: string) {
    localStorage.setItem("cpfUsuario", cpf);
  }

  deslogarUsuario(chave: string) {
    localStorage.removeItem(chave);
    this.roteador.navigate(["/"]);
  }

  retornarUsuario(chave: string): string | null {
    return localStorage.getItem(chave);
  }

  usuarioLogado(): boolean {
    let usuarioLogado: boolean = true;

    if(this.retornarUsuario("cpfUsuario") === null){
      usuarioLogado = false
    }

    return usuarioLogado;
  }

  limpar() {
    localStorage.clear();
  }
}
