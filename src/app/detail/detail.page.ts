// Importa decorador Component e interface OnInit do Angular
import { Component, OnInit } from '@angular/core';
// Importa CommonModule para usar diretivas comuns como *ngIf, *ngFor
import { CommonModule } from '@angular/common';
// Importa ActivatedRoute para acessar parâmetros da URL e Router para navegação
import { ActivatedRoute, Router } from '@angular/router';
// Importa componentes de interface do Ionic para a página de detalhes
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonBackButton, IonButtons } from '@ionic/angular/standalone';
// Importa o serviço de Pokémon para requisições de dados
import { PokemonService } from '../services/pokemon.service';
// Importa o pipe customizado para capitalizar texto
import { CapitalizePipe } from '../pipes/capitalize.pipe';
// Importa a diretiva customizada para destacar elementos
import { HighlightDirective } from '../directives/highlight.directive';

// Componente que exibe os detalhes de um Pokémon específico selecionado
@Component({
  selector: 'app-detail',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonBackButton, IonButtons, CapitalizePipe, HighlightDirective],
})
// Define o componente DetailPage com o template e estilos associados
export class DetailPage implements OnInit {
  pokemon: any = null;
  carregando = true;
  erro: string | null = null;

  // Inicializa o componente com a rota ativada, roteador e serviço de Pokémon
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  // Carrega os parâmetros da URL e busca o Pokémon correspondente quando a página é inicializada
  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.carregarPokemon(params['id']);
      }
    });
  }

  // Busca os detalhes de um Pokémon específico pela ID na API e armazena no componente
  carregarPokemon(id: string) {
    this.carregando = true;
    this.erro = null;
    // Faz a requisição para obter o Pokémon da API
    this.pokemonService.getPokemonPorId(id).subscribe(
      (pokemon) => {
        this.pokemon = pokemon;
        this.carregando = false;
      },
      // Trata o erro na requisição
      (error) => {
        this.erro = 'Erro ao carregar os detalhes do Pokémon';
        console.error('Erro:', error);
        this.carregando = false;
      }
    );
  }

  // Navega de volta para a página inicial
  voltarParaHome() {
    this.router.navigate(['/home']);
  }

  // Retorna a lista de movimentos do Pokémon ou um array vazio se não houver dados
  get moves(): any[] {
    return this.pokemon?.moves || [];
  }
}
