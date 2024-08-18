import { Usuario } from "./usuario";

export class Postagem {
    texto : string;
    like: Number = 0;
    dislike : Number = 0;
    usuario : Usuario;
    status : string;
    midia : string;

    constructor(texto: string, usuario: Usuario, midia: string) {
        this.texto = texto;
        this.usuario = usuario;
        this.status = "indefinida";
        this.midia = midia;
    }
}