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
  ganhador: string | null = null;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.gerarBatalha();
  }

  gerarBatalha() {
    this.carregando = true;
    this.ganhador = null;
    
    this.pokemonService.getPokemonAleatorio().subscribe(
      (pokemon1) => {
        this.pokemonEsquerda = pokemon1;
        
        this.pokemonService.getPokemonAleatorio().subscribe(
          (pokemon2) => {
            this.pokemonDireita = pokemon2;
            this.calcularGanhador();
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

  calcularGanhador() {
    if (!this.pokemonEsquerda || !this.pokemonDireita) return;

    // Índices dos stats: 0=hp, 1=ataque, 2=defesa, 3=ataque especial, 4=defesa especial, 5=velocidade
    const ataqueEsquerda = this.pokemonEsquerda.stats[1].base_stat;
    const defesaEsquerda = this.pokemonEsquerda.stats[2].base_stat;

    const ataqueDireita = this.pokemonDireita.stats[1].base_stat;
    const defesaDireita = this.pokemonDireita.stats[2].base_stat;

    // Calcula o dano que cada pokémon causa (ataque - defesa do adversário)
    const danoEsquerda = Math.max(0, ataqueEsquerda - defesaDireita);
    const danoDireita = Math.max(0, ataqueDireita - defesaEsquerda);

    if (danoEsquerda > danoDireita) {
      this.ganhador = 'esquerda';
    } else if (danoDireita > danoEsquerda) {
      this.ganhador = 'direita';
    } else {
      this.ganhador = 'empate';
    }
  }
}
