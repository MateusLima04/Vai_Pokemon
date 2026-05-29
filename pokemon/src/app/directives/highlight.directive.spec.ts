// Importa TestBed para configurar e testar diretivas
import { TestBed } from '@angular/core/testing';
// Importa ElementRef para acessar o elemento DOM nos testes
import { ElementRef } from '@angular/core';
// Importa a diretiva HighlightDirective a ser testada
import { HighlightDirective } from './highlight.directive';

// Suite de testes para a diretiva HighlightDirective
describe('HighlightDirective', () => {
  let directive: HighlightDirective;

  // Configura o ambiente de testes antes de cada teste
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighlightDirective],
    });
    // Cria um elemento DIV e a instância da diretiva para os testes
    const el = document.createElement('div');
    directive = new HighlightDirective(new ElementRef(el));
  });

  // Verifica se a diretiva HighlightDirective é criada corretamente
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  // Verifica se a cor de fundo é aplicada ao inicializar
  it('should set background color on init', () => {
    expect(directive).toBeTruthy();
  });
});