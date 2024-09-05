import { Postagem } from "./postagem";

export class Usuario {
    id?: string;
    cpf : string;
    nome : string;
    nomeUsuario : string;
    senha: string;
    pontuacao : Number = 0;
    postagens: string[] = [];

    constructor(cpf: string, nome: string, nomeUsuario : string, senha: string) {
        this.cpf = cpf;
        this.nome = nome;
        this.nomeUsuario = nomeUsuario;
        this.senha = senha;

    }
}