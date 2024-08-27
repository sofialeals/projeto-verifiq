import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { LocalStorageService } from './shared/service/localstorage.service';
import { SnackBarService } from './shared/service/snack-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  mostrarHome : boolean = true;

  constructor(
    private roteador : Router,
    private localStorage : LocalStorageService,
    private snackbar : SnackBarService
  ){}

  ngOnInit(): void {
    this.roteador.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const urlAtual = this.roteador.url;
      
      if (urlAtual === '/') {
        this.mostrarHome = true;
      } else {
        this.mostrarHome = false;
      }
    });
  }

  limparLocalStorage(){
    this.localStorage.limpar();
  }

  deslogar(){
    this.localStorage.deslogarUsuario("cpfUsuario");
  }

  usuarioLogado() : boolean {
    let usuarioLogado: boolean = false;
    const usuarioAtual = this.localStorage.retornarUsuario("cpfUsuario");
    
    if (usuarioAtual != null) {
      usuarioLogado = true;
    } else {
      usuarioLogado = false;
    }

    return usuarioLogado;
  }

  redirecionar(botaoApertado : string){
    if(this.usuarioLogado()){
      if(botaoApertado === '0'){
        this.roteador.navigate(["/criar-postagem"]);
      } else if (botaoApertado === '1'){
        this.roteador.navigate(["/exibir-postagens"]);
      }
      
    } else {
      this.snackbar.exibirMensagem("Você precisa fazer login antes.")
      this.roteador.navigate(["/login-usuario"], {
        queryParams: { returnUrl: botaoApertado }
      });
    }
  }

  title = 'projeto-verifiq';
}
