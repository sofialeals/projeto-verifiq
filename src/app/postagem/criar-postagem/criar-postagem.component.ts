import { Component, ElementRef, ViewChild } from '@angular/core';
import { PostagemService } from '../../shared/service/postagem.service';
import { LocalStorageService } from '../../shared/service/localstorage.service';
import { AngularFireStorage } from "@angular/fire/compat/storage";


@Component({
  selector: 'criar-postagem',
  templateUrl: './criar-postagem.component.html',
  styleUrl: './criar-postagem.component.scss'
})
export class CriarPostagemComponent {
  
  texto : string = "";
  titulo : string = "";
  link: string = "";
  @ViewChild('inputImagem') inputImagem!: ElementRef<HTMLInputElement>;

  constructor(
    private servicoPostagem : PostagemService,
    private localStorage : LocalStorageService,
    private fireStorage: AngularFireStorage
  
  ){}

  async imagemCarregada(event: any){
    const cpfUsuario = this.localStorage.retornarUsuario("cpfUsuario");
    const arquivo = event.target.files[0];
    if(arquivo){
      const caminho = `${cpfUsuario}/${arquivo.name}`;
      const carregarImagem = await this.fireStorage.upload(caminho, arquivo);
      const urlImagem = await carregarImagem.ref.getDownloadURL();
      this.link = urlImagem;
    }
    
  }

  enviarPostagem(){
    if(this.link != ""){
      this.servicoPostagem.criarPostagem(this.titulo, this.texto, this.link);
      this.limparInputs();
    }
  }

  limparInputs(){
    this.texto = "";
    this.titulo = "";
    if (this.inputImagem) {
      this.inputImagem.nativeElement.value = '';
    }
  }
}