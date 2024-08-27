import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private snackbar : MatSnackBar
  ) { }

  exibirMensagem(mensagem : string){
    this.snackbar.open(mensagem, "Fechar")
  }
}
