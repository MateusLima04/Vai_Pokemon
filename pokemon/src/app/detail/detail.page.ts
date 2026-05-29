import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { PokemonService } from '../services/pokemon.service';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { HighlightDirective } from '../directives/highlight.directive';

@Component({
  selector: 'app-detail',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonBackButton, IonButtons, CapitalizePipe, HighlightDirective],
})
export class DetailPage implements OnInit {
  pokemon: any = null;
  carregando = true;
  erro: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.carregarPokemon(params['id']);
      }
    });
  }

  carregarPokemon(id: string) {
    this.carregando = true;
    this.erro = null;

    this.pokemonService.getPokemonPorId(id).subscribe(
      (pokemon) => {
        this.pokemon = pokemon;
        this.carregando = false;
      },
      (error) => {
        this.erro = 'Erro ao carregar os detalhes do Pokémon';
        console.error('Erro:', error);
        this.carregando = false;
      }
    );
  }

  voltarParaHome() {
    this.router.navigate(['/home']);
  }

  get moves(): any[] {
    return this.pokemon?.moves || [];
  }
}
