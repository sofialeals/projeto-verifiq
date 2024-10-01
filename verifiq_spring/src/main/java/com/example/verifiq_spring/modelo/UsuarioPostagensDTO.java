package com.example.verifiq_spring.modelo;

import java.util.List;

public record UsuarioPostagensDTO(
    List<String> postagens
    ) {
    public UsuarioPostagensDTO(Usuario usuario) {
        this(usuario.getPostagens());
    }
}