package com.example.verifiq_spring.repositorio;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.verifiq_spring.modelo.Usuario;


public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {
    
    public Optional<Usuario> findBynomeUsuario(String nomeUsuario);

    public Optional<Usuario> findByCpf(String cpf);

    public Optional<Usuario> findById(int id);

	public void deleteByCpf(String cpf);
}