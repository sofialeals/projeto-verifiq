package com.example.verifiq_spring.servico;

// import com.example.verifiq_spring.modelo.DadosUsuarioInserirDTO;
import com.example.verifiq_spring.modelo.Usuario;
import com.example.verifiq_spring.repositorio.UsuarioRepositorio;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepositorio repositorio;

    public List<Usuario> listarTodosUsuarios() {
        return repositorio.findAll(); // Isso usa o método findAll() do JpaRepository.
    }
    
    public Usuario getUsuarioPorId(Long idUsuario) {
        return this.repositorio.findById(idUsuario).orElseThrow(() -> new NoSuchElementException("Usuário não encontrado com o ID " + idUsuario));
    }

    public Usuario getUsuarioPorUsername(String nomeUsuario) {
        return this.repositorio.findBynomeUsuario(nomeUsuario).orElseThrow(() -> new NoSuchElementException("Usuário não encontrado com o nome de usuário " + nomeUsuario));
    }

    public Usuario getUsuarioPorCpf(String cpf){
        return this.repositorio.findByCpf(cpf).orElseThrow(() -> new NoSuchElementException("Usuário não encontrado com o CPF " + cpf));
    }

    public boolean verificarSenha(String[] credenciais){
        Usuario usuarioBanco = this.getUsuarioPorCpf(credenciais[0]);
        if (usuarioBanco.getSenha().equals(credenciais[1])){
            return true;
        } else {
            return false;
        }   
    }

    @Transactional
    public Usuario inserir(Usuario usuario) {
        return this.repositorio.save(usuario);
    }
    
    @Transactional
    public Usuario atualizar(Usuario usuario) {
        return this.repositorio.save(usuario);
    }
    
    @Transactional
    public void remover(String cpf) {
        this.repositorio.deleteByCpf(cpf);
    }
}