package com.example.verifiq_spring.modelo;

public record UsuarioDTO(
    Long id,
    String cpf,
    String nome,
    String nomeUsuario
    ) {
    public UsuarioDTO(Usuario usuario) {
        this(usuario.getId(), usuario.getCpf(), usuario.getNome(), usuario.getNomeUsuario());
    }
}