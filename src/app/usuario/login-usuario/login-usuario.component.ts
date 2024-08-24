import { Component } from '@angular/core';
import { UsuarioService } from '../../shared/service/usuario.service';
import { LocalStorageService } from '../../shared/service/localstorage.service';
import { Usuario } from '../../shared/model/usuario';

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
    private localStorage: LocalStorageService
  ) {}
  
  entrarUsuario() {
    this.service.buscarUsuario(this.cpfUsuario).subscribe(
      {
        next: usuarioRetornado => {
          console.log(typeof(usuarioRetornado))
          if(usuarioRetornado instanceof Object) {
            if(usuarioRetornado.senha === this.senhaUsuario){
              this.localStorage.logarUsuario(this.cpfUsuario)
              console.log("logou")
              console.log(this.localStorage.checarLogin("cpfUsuario"))
              this.limparInputs();
            } else {
              console.log("nao logou")
              this.limparInputs();
            }
          }
          else {
            console.log("EPA! Não logou")
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
