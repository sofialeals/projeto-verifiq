package com.example.verifiq_spring.controlador;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.verifiq_spring.modelo.Usuario;
import com.example.verifiq_spring.modelo.UsuarioDTO;
import com.example.verifiq_spring.modelo.UsuarioPostagensDTO;
import com.example.verifiq_spring.servico.UsuarioService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/usuarios")
public class UsuarioControlador {
    
    @Autowired
    private UsuarioService service;

    @GetMapping("/{id}")
    public UsuarioDTO getUsuarioPorId(@PathVariable("id") Long idUsuario) {
        Usuario usuario = this.service.getUsuarioPorId(idUsuario);
        return new UsuarioDTO(usuario);
    }

    @GetMapping("/cpf")
    public ResponseEntity<UsuarioDTO> getUsuarioPorCpf(@RequestParam("cpf") String cpf) {
        try {
        Usuario usuario = this.service.getUsuarioPorCpf(cpf);
        return ResponseEntity.ok(new UsuarioDTO(usuario));
        } catch (NoSuchElementException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/nomeUsuario")
    public ResponseEntity<UsuarioDTO> getUsuarioPorNomeUsuario(@RequestParam("nomeUsuario") String nomeUsuario) {
        try {
        Usuario usuario = this.service.getUsuarioPorUsername(nomeUsuario);
        return ResponseEntity.ok(new UsuarioDTO(usuario));
        } catch (NoSuchElementException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{id}/postagens")
    public UsuarioPostagensDTO getPostsPorId(@PathVariable("id") Long idUsuario) {
        Usuario usuario = this.service.getUsuarioPorId(idUsuario);
        return new UsuarioPostagensDTO(usuario);
    }
    
    @GetMapping
    public List<UsuarioDTO> listarUsuarios() {
        List<Usuario> usuarios = this.service.listarTodosUsuarios();
        return usuarios.stream().map(UsuarioDTO::new).collect(Collectors.toList());
    }

    @PostMapping("/autenticacao")
    public ResponseEntity<Boolean> autenticacao(@RequestBody String[] credenciais) {
        boolean autenticado = this.service.verificarSenha(credenciais);

        return ResponseEntity.ok(autenticado);
    }

    @PostMapping
    public ResponseEntity<Usuario> inserir(@RequestBody Usuario usuario){
        Usuario usuarioInserido;
        try {
            usuarioInserido = this.service.inserir(usuario);
            return new ResponseEntity<>(usuarioInserido, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/{id}/postagens")
    public ResponseEntity<UsuarioPostagensDTO> atualizarPosts(
        @PathVariable("id") Long idUsuario,
        @RequestBody List<String> postagens)
        {
        Usuario usuario = this.service.getUsuarioPorId(idUsuario);
        
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }
        usuario.setPostagens(postagens);
        this.service.atualizar(usuario);
        
        return ResponseEntity.ok(new UsuarioPostagensDTO(usuario));
    }

    @DeleteMapping
    public void remover(@RequestParam("cpf") String cpf) {
        this.service.remover(cpf);
    }
}
