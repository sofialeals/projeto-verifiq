import { Postagem } from "./postagem";

export class Usuario {
    cpf : string;
    nome : string;
    nomeUsuario : string;
    senha: string;
    pontuacao : Number = 0;
    postagens : Postagem[];

    constructor(cpf: string, nome: string, nomeUsuario : string, senha: string, postagens: Postagem[] = []) {
        this.cpf = cpf;
        this.nome = nome;
        this.nomeUsuario = nomeUsuario;
        this.senha = senha;
        this.postagens = postagens;
    }
}