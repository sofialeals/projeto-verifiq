export class Usuario {
    id?: number;
    cpf : string;
    nome : string;
    nomeUsuario : string;
    senha: string;
    postagens: string[] = [];

    constructor(nome: string, cpf: string, nomeUsuario : string, senha: string) {
        this.cpf = cpf;
        this.nome = nome;
        this.nomeUsuario = nomeUsuario;
        this.senha = senha;
    }
}