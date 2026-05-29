// Importa decorador Directive, ElementRef para acessar o elemento DOM, HostListener para eventos e Input para receber dados
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

// Diretiva que aplica efeitos visuais de destaque a um elemento
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
// Define a diretiva com o seletor appHighlight para ser usada nos templates
export class HighlightDirective {
  @Input() appHighlight: string = '#ffff00'; // cor padrão: amarelo

  // Aplica uma cor de fundo ao elemento quando a diretiva é inicializada
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
  }

  // Aumenta o tamanho do elemento e adiciona sombra quando o mouse passa por cima
  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.style.transform = 'scale(1.05)';
    this.el.nativeElement.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
  }

  // Remove o efeito de aumento e sombra quando o mouse sai do elemento
  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.transform = 'scale(1)';
    this.el.nativeElement.style.boxShadow = 'none';
  }
}
