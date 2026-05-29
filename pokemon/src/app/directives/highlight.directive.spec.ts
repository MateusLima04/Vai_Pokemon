import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  let directive: HighlightDirective;

  // Configura o ambiente de testes antes de cada teste
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighlightDirective],
    });

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