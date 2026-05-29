// Importa decorador Pipe e interface PipeTransform do Angular para criar um pipe customizado
import { Pipe, PipeTransform } from '@angular/core';

// Pipe que converte a primeira letra de uma string em maiúscula e o resto em minúsculas
@Pipe({
  name: 'capitalize',
  standalone: true
})
export class CapitalizePipe implements PipeTransform {
  // Transforma a primeira letra em maiúscula e o resto em minúsculas
  transform(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
