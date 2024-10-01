package com.example.verifiq_spring.modelo;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "usuarios")
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String cpf;
    private String nome;
    private String nomeUsuario;
    private String senha;
    @ElementCollection
    private List<String> postagens;

    
    public Usuario() {}
    
    public Usuario(String nome, String cpf, String nomeUsuario, String senha) {
        this.nome = nome;
        this.cpf = cpf;
        this.nomeUsuario = nomeUsuario;
        this.senha = senha;
        this.postagens = new ArrayList<String>();
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }

    public String getCpf() {
        return cpf;
    }
    
    public void setCpf(String novoCpf) {
        this.cpf = novoCpf;
    }
    
    public String getNome() {
        return nome;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }
    
    public void setNomeUsuario(String novoNomeUsuario) {
        this.nomeUsuario = novoNomeUsuario;
    }
    
    public String getSenha() {
        return senha;
    }
    
    public void setSenha(String senha) {
        this.senha = senha;
    }

    public List<String> getPostagens() {
        return postagens;
    }
    public void setPostagens(List<String> novasPostagens) {
        this.postagens = novasPostagens;
    }
}