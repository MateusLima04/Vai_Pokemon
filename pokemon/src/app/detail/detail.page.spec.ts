// Importa ComponentFixture e TestBed para configurar e testar componentes
import { ComponentFixture, TestBed } from '@angular/core/testing';
// Importa o componente DetailPage a ser testado
import { DetailPage } from './detail.page';

// Suite de testes para o componente DetailPage
describe('DetailPage', () => {
  let component: DetailPage;
  let fixture: ComponentFixture<DetailPage>;

  // Configura o ambiente de testes antes de cada teste
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPage],
    }).compileComponents();
    // Cria a fixture do componente para os testes
    fixture = TestBed.createComponent(DetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verifica se o componente DetailPage é criado corretamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
