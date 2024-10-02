import { Component } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';
import { UsuarioService } from '../../shared/service/usuario.service';
import { SnackBarService } from '../../shared/service/snack-bar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrl: './cadastrar-usuario.component.scss'
})
export class CadastrarUsuarioComponent {
  usuario : Usuario = new Usuario("", "", "", "");
  formulario: FormGroup;

  constructor(
    private snackbar: SnackBarService,
    private usuarioService : UsuarioService,
    private construtorForm: FormBuilder
  ){
    this.formulario = this.construtorForm.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      nome: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)]],
      nomeUsuario: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      senha: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/)]]
    })
  }

  cadastrarUsuario(){
    this.usuarioService.inserir(this.usuario);
  }
}
