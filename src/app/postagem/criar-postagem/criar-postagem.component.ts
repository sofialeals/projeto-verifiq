import { Component } from '@angular/core';
import { PostagemService } from '../../shared/service/postagem.service';
import { LocalStorageService } from '../../shared/service/localstorage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'criar-postagem',
  templateUrl: './criar-postagem.component.html',
  styleUrl: './criar-postagem.component.scss'
})
export class CriarPostagemComponent {
  
  // linkMidia : string = "";
  texto : string = "";
  titulo : string = "";

  constructor(
    private servicoPostagem : PostagemService,
    private localStorage: LocalStorageService,
    private snackbar : MatSnackBar
  ){}

  enviarPostagem(){
    const cpfUsuario = this.localStorage.retornarUsuario("cpfUsuario");
    console.log(cpfUsuario)
    if(cpfUsuario != null){
      this.servicoPostagem.criarPostagem(cpfUsuario, this.titulo, this.texto)
      this.limparInputs();

    }
  }

  limparInputs(){
    this.texto = "";
    this.titulo = "";
  }
  
  // salvarMidia(evento : Event){
  //   const input = evento.target as HTMLInputElement;

  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];

  //     const link = document.createElement('a');
  //     const url = URL.createObjectURL(file);
  //     this.linkMidia = url;
  //     console.log(this.linkMidia);

  //     link.href = url;
  //     link.download = file.name;
  //     link.click();

  //     URL.revokeObjectURL(url);
  //   }
  // }
}