import { Component } from '@angular/core';
import { UsuarioService } from '../../shared/service/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../../shared/service/localstorage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackBarService } from '../../shared/service/snack-bar.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrl: './login-usuario.component.scss'
})
export class LoginUsuarioComponent {
  cpfUsuario: string = "";
  senhaUsuario: string = "";

  constructor(
    private service: UsuarioService,
    private localStorage: LocalStorageService,
    private roteador : Router,
    private rota : ActivatedRoute,
    private snackbar : SnackBarService
  ) {}
  
  entrarUsuario() {
    this.service.buscarUsuario(this.cpfUsuario).subscribe(
      {
        next: usuarioRetornado => {
          console.log(typeof(usuarioRetornado))
          if(usuarioRetornado instanceof Object) {
            if(usuarioRetornado.senha === this.senhaUsuario){
              const botaoApertado = this.rota.snapshot.queryParamMap.get('returnUrl');
              this.localStorage.logarUsuario(this.cpfUsuario)
              if(botaoApertado === '0'){
                this.roteador.navigate(["/criar-postagem"]);
              } else if (botaoApertado === '1'){
                this.roteador.navigate(["/exibir-postagens"]);
              } else {
                this.roteador.navigate(["/"]);
              }
              this.limparInputs();
            } else {
              this.snackbar.exibirMensagem("Senha incorreta.");
              this.limparInputs();
            }
          }
          else {
            this.snackbar.exibirMensagem(`Usuário de CPF ${this.cpfUsuario} não existe.`)
            this.limparInputs();
          }
        }
      }
    );
  }

  limparInputs(){
    this.cpfUsuario = "";
    this.senhaUsuario = "";
  }
}
