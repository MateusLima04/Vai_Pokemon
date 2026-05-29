// Importa o decorador Injectable para definir um serviço injetável
import { Injectable } from '@angular/core';
// Importa HttpClient para fazer requisições HTTP à API
import { HttpClient } from '@angular/common/http';
// Importa Observable do RxJS para trabalhar com dados assíncronos
import { Observable } from 'rxjs';

// Serviço que gerencia requisições de dados de Pokémon da API PokeAPI
@Injectable({
  providedIn: 'root'
})
// Define o serviço como injetável em toda a aplicação
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  // Busca um Pokémon aleatório da API (de ID 1 a 151)
  getPokemonAleatorio(): Observable<any> {
    const id = Math.floor(Math.random() * 151) + 1; // Pokémon de 1 a 151
    return this.http.get(`${this.apiUrl}/pokemon/${id}`);
  }

  // Busca os detalhes de um Pokémon específico pela sua ID na API
  getPokemonPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${id}`);
  }
}
