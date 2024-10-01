import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {firebaseConfig} from '../../../../firebase.config'
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFireStorageModule } from "@angular/fire/compat/storage";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ]
})
export class FirestoreModule { }
