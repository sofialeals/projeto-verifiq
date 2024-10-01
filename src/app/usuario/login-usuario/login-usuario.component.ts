import { Component } from '@angular/core';
import { UsuarioService } from '../../shared/service/usuario.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrl: './login-usuario.component.scss'
})
export class LoginUsuarioComponent {
  cpfUsuario: string = "";
  senhaUsuario: string = "";

  constructor(
    private usuarioService: UsuarioService
  ) {}
  
  entrarUsuario() {
    this.usuarioService.logarUsuario(this.cpfUsuario, this.senhaUsuario);
    this.limparInputs();
  }

  limparInputs(){
    this.cpfUsuario = "";
    this.senhaUsuario = "";
  }
}
