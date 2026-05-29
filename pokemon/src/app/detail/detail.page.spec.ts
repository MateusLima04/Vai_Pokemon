import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailPage } from './detail.page';

describe('DetailPage', () => {
  let component: DetailPage;
  let fixture: ComponentFixture<DetailPage>;

  // Configura o ambiente de testes antes de cada teste
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verifica se o componente DetailPage é criado corretamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
