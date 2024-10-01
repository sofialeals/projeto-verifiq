import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {Postagem} from '../model/postagem';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {map} from 'rxjs/operators';


@Injectable({
 providedIn: 'root'
})
export class FirestoreService {


 colecaoPostagens: AngularFirestoreCollection<Postagem>;
 NOME_COLECAO = 'postagens';


 constructor(private afs: AngularFirestore) {
   this.colecaoPostagens = afs.collection(this.NOME_COLECAO);
 }


 listar(): Observable<Postagem[]> {
   // usando options para idField para mapear o id gerado pelo firestore para o campo id de usuário
   
   return this.colecaoPostagens.valueChanges({idField: 'id'});
 }

inserir(postagem: Postagem): Observable<{ id: string }> {
  delete postagem.id;

  return from(this.colecaoPostagens.add(Object.assign({}, postagem))).pipe(
    map(docRef => ({ id: docRef.id }))
  );
}


  
  apagar(id: string): Observable<void> {
    return from(this.colecaoPostagens.doc(id).delete());
  }

  pesquisarPorId(id: string): Observable<Postagem | null> {
    return this.colecaoPostagens.doc(id).get().pipe(
        map(document => {
            if (!document.exists) {
                return null; // Retorna null se o documento não existir
            }
            const data = document.data() as Postagem; // Assegurando que o tipo está correto
            const novaPost: Postagem = new Postagem(data.username, data.titulo, data.texto, data.idUsuario, data.link)
            novaPost.id = data.id;
            return novaPost;
        })
    );
}
 
 
  atualizar(postagem: Postagem): Observable<void> {
    const id = postagem.id;
    // removendo id pois não vamos guardar nos dados do documento, mas sim usar apenas como id para recuperar o documento
    delete postagem.id;
    return from(this.colecaoPostagens.doc(id).update(Object.assign({}, postagem)));

  }

    listarPostagensUsuario(IdUsuario: number, status: string): Observable<Postagem[]> {
      let postagensUsuario: AngularFirestoreCollection<Postagem>;
      postagensUsuario = this.afs.collection(
        this.NOME_COLECAO, ref =>ref.where('idUsuario', '==', IdUsuario).where('status', '==', status)
      );
      return postagensUsuario.valueChanges({idField: 'id'});
  }

  listarPostagensStatus(status: string): Observable<Postagem[]> {
    let postagens: AngularFirestoreCollection<Postagem>;
    postagens = this.afs.collection(
      this.NOME_COLECAO, ref =>ref.where('status', '==', status)
    );
    return postagens.valueChanges({idField: 'id'});
  }
}