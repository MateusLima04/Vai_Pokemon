/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';

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
