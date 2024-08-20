import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  mostrarHome : boolean = true;

  constructor(private roteador : Router){}

  // ngOnInit(): void {
  //   let urlAtual = this.roteador.url;
  //   if(urlAtual === "/"){
  //     this.mostrarHome = true;
  //   } else {
  //     this.mostrarHome = false;
  //   }
  // }

  ngOnInit(): void {
    this.roteador.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const urlAtual = this.roteador.url;
      
      if (urlAtual === '/') {
        this.mostrarHome = true;
      } else {
        this.mostrarHome = false;
      }
    });
  }

  title = 'projeto-verifiq';
}
