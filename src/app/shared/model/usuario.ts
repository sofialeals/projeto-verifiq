import { Postagem } from "./postagem";

export class Usuario {
    cpf : string;
    nome : string;
    nomeUsuario : string;
    pontuacao : Number = 0;
    postagens : Postagem[] = [];

    constructor(cpf: string, nome: string, nomeUsuario : string) {
        this.cpf = cpf;
        this.nome = nome;
        this.nomeUsuario = nomeUsuario;
    }
}