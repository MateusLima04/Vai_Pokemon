import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
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
