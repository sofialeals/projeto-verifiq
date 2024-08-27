import { Usuario } from "./usuario";

export class Postagem {
    titulo: string;
    texto : string;
    like: Number = 0;
    dislike : Number = 0;
    usuario : Usuario;
    status : string;
    // midia : string;

    constructor(titulo: string, texto: string, usuario: Usuario) {
        this.titulo = titulo;
        this.texto = texto;
        this.usuario = usuario;
        this.status = "indefinida";
        // this.midia = midia;
    }

    
}