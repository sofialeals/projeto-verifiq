import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Salvar item no localStorage
  logarUsuario(cpf: string) {
    localStorage.setItem("cpfUsuario", cpf);
  }

  // Recuperar item do localStorage
  checarLogin(chave: string): string | null {
    return localStorage.getItem(chave);
  }

  // Remover item do localStorage
  deslogarUsuario(chave: string) {
    localStorage.removeItem(chave);
  }

  // Limpar todos os itens do localStorage
  limpar() {
    localStorage.clear();
  }
}
