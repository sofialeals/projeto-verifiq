import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UsuarioModule } from './usuario/usuario.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent
    
  ],
    imports: [
    BrowserModule,
    AppRoutingModule,
    UsuarioModule,  
    MaterialModule,

  ],

providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
