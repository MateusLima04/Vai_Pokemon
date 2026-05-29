/// <reference types="jasmine" />
// Importa ComponentFixture e TestBed para configurar e testar componentes
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Importa o componente HomePage a ser testado
import { HomePage } from './home.page';

// Suite de testes para o componente HomePage
describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  // Configura o ambiente de testes antes de cada teste
  beforeEach(async () => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verifica se o componente HomePage é criado corretamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
