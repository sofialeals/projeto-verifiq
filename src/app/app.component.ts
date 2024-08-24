import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { LocalStorageService } from './shared/service/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  mostrarHome : boolean = true;
  usuarioLogado : boolean = true;
  teste: boolean = true;

  constructor(
    private roteador : Router,
    private localStorage : LocalStorageService
  ){}

  ngOnInit(): void {
    this.roteador.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const urlAtual = this.roteador.url;
      const usuarioAtual = this.localStorage.checarLogin("cpfUsuario");
      console.log(usuarioAtual)
      
      if (urlAtual === '/') {
        this.mostrarHome = true;
      } else {
        this.mostrarHome = false;
      }

      if (usuarioAtual != null) {
        this.usuarioLogado = true;
      } else {
        this.usuarioLogado = false;
      }
    });
  }

  limparLocalStorage(){
    this.localStorage.limpar();
  }

  title = 'projeto-verifiq';
}
