import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './shared/service/localstorage.service';
import { SnackBarService } from './shared/service/snack-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{

  constructor(
    private roteador : Router,
    private localStorage : LocalStorageService,
    private snackbar : SnackBarService
  ){}

  mostrarHome(): boolean {
    let mostrarHome: boolean = true;

    const urlAtual = this.roteador.url;
      
    if (urlAtual === '/') {
      mostrarHome = true;
    } else {
      mostrarHome = false;
    }

    return mostrarHome;
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

  deslogar(){
    this.localStorage.deslogarUsuario("cpfUsuario");
  }

  usuarioLogado() : boolean {
    return this.localStorage.usuarioLogado();
  }

  title = 'projeto-verifiq';
}
