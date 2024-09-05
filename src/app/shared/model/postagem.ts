export class Postagem {
    id?: string;
    titulo: string;
    texto : string;
    like: Number = 0;
    dislike : Number = 0;
    idUsuario : string;
    status : string;
    // midia : string;

    constructor(titulo: string, texto: string, usuario: string) {
        this.titulo = titulo;
        this.texto = texto;
        this.idUsuario = usuario;
        this.status = "indefinida";
        // this.midia = midia;
    }

    
}