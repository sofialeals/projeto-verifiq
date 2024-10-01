package com.example.verifiq_spring.modelo;

public record UsuarioVerificacaoDTO(
    String cpf,
    String senha
    ) {
    public UsuarioVerificacaoDTO(Usuario usuario) {
        this(usuario.getCpf(), usuario.getSenha());
    }
}