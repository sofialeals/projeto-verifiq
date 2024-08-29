import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UsuarioModule } from './usuario/usuario.module';
import { PostagemModule } from './postagem/postagem.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
    BrowserModule,
    AppRoutingModule,
    UsuarioModule,
    PostagemModule,
    MaterialModule,
    RouterModule,

  ],
  exports: [
    MaterialModule
  ],

providers: [provideHttpClient(), provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
