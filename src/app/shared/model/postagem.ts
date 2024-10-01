export class Postagem {
    id?: string;
    username : string;
    titulo: string 
    texto : string;
    link: string;
    like: Number = 0;
    dislike : Number = 0;
    idUsuario : number;
    status : string;

    constructor(username: string, titulo: string, texto: string, idUsuario: number, link: string) {
        this.username = username;
        this.titulo = titulo;
        this.texto = texto;
        this.idUsuario = idUsuario;
        this.link = link;
        this.status = "aberta";
    }
}