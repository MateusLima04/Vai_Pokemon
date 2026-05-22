import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage implements OnInit {
  pokemonEsquerda: any = null;
  pokemonDireita: any = null;
  carregando = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.gerarBatalha();
  }

  gerarBatalha() {
    this.carregando = true;
    
    this.pokemonService.getPokemonAleatorio().subscribe(
      (pokemon1) => {
        this.pokemonEsquerda = pokemon1;
        
        this.pokemonService.getPokemonAleatorio().subscribe(
          (pokemon2) => {
            this.pokemonDireita = pokemon2;
            this.carregando = false;
          },
          (erro) => {
            console.error('Erro ao buscar Pokémon direita:', erro);
            this.carregando = false;
          }
        );
      },
      (erro) => {
        console.error('Erro ao buscar Pokémon esquerda:', erro);
        this.carregando = false;
      }
    );
  }
}
