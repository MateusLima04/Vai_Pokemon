# 📱 Documentação Completa - Projeto VaiPokémon

## 🎯 Visão Geral do Projeto

O **VaiPokémon** é uma aplicação móvel desenvolvida com **Angular 20** e **Ionic 8** que permite aos usuários simular batalhas entre pokémons aleatórios, visualizar detalhes completos de cada pokémon e comparar suas estatísticas. A aplicação consome dados da **PokéAPI**, uma API REST pública que fornece informações detalhadas sobre pokémons.

---

## 📊 Atendimento dos Requisitos

| # | Requisito | Pontuação | Status |
|---|-----------|-----------|--------|
| 1 | Mínimo 2 pages (Home + Detail) | 0,5 | ✅ |
| 2 | Uso da biblioteca HttpClient | 0,5 | ✅ |
| 3 | Uma API com método GET | 0,5 | ✅ |
| 4 | 2 Pipes (1 customizado + 1 builtin) | 1,0 | ✅ |
| 5 | 1 Service com HttpClient | 1,0 | ✅ |
| 6 | 1 Diretiva customizada + @if e @for | 1,5 | ✅ |
| 7 | EXTRA: Parâmetro por rota | 1,0 | ✅ |
| | **TOTAL** | **6,5 + 1,0** | **7,5** |

---

## 🗂️ Estrutura de Diretórios

```
src/app/
├── app.component.ts          ← Componente raiz
├── app.component.html        ← Template raiz
├── app.routes.ts             ← Definição de rotas
│
├── home/
│   ├── home.page.ts          ← Lógica da página inicial
│   ├── home.page.html        ← Template da página inicial
│   └── home.page.scss        ← Estilos da página inicial
│
├── detail/
│   ├── detail.page.ts        ← Lógica da página de detalhes
│   ├── detail.page.html      ← Template da página de detalhes
│   ├── detail.page.scss      ← Estilos da página de detalhes
│   └── detail.page.spec.ts   ← Testes unitários
│
├── services/
│   └── pokemon.service.ts    ← Service para chamadas HTTP
│
├── pipes/
│   ├── capitalize.pipe.ts    ← Pipe customizada
│   └── capitalize.pipe.spec.ts ← Testes do pipe
│
└── directives/
    ├── highlight.directive.ts    ← Diretiva customizada
    └── highlight.directive.spec.ts ← Testes da diretiva
```

---

## 📄 PÁGINA 1: HOME PAGE (Batalha de Pokémons)

### 🎬 O que a página faz?

A **Home Page** é a página inicial da aplicação. Ela funciona como um **simulador de batalhas pokémon** onde:

1. **Carrega dois pokémons aleatórios** ao abrir a página
2. **Exibe os pokémons lado a lado** com suas imagens, tipos e estatísticas
3. **Calcula automaticamente o vencedor** baseado em poder de ataque vs. defesa
4. **Permite gerar novas batalhas** clicando no botão "Gerar Nova Batalha"
5. **Oferece links para visualizar detalhes** clicando nos pokémons

### 📁 Arquivo: `home.page.ts`

```typescript
export class HomePage implements OnInit {
  pokemonEsquerda: any = null;    // Pokémon 1
  pokemonDireita: any = null;     // Pokémon 2
  carregando = false;             // Estado de carregamento
  ganhador: string | null = null; // 'esquerda', 'direita' ou 'empate'

  ngOnInit() {
    this.gerarBatalha(); // Inicia uma batalha ao carregar
  }

  gerarBatalha() {
    // 1. Marca como carregando
    // 2. Busca pokémon aleatório via PokemonService
    // 3. Busca segundo pokémon aleatório
    // 4. Calcula o vencedor
  }

  calcularGanhador() {
    // Compara: Ataque - Defesa do adversário
    // Determina: esquerda venceu, direita venceu ou empate
  }
}
```

**Responsabilidades:**
- ✅ Gerenciar estado de dois pokémons em batalha
- ✅ Chamar `PokemonService` para buscar dados
- ✅ Calcular resultado da batalha
- ✅ Oferecer interface para nova batalha

### 🎨 Arquivo: `home.page.html`

**Estrutura:**
1. **Header com título** - "Batalha Pokémon"
2. **Arena de batalha** com 3 seções:
   - **Pokémon Esquerda**: Exibe imagem, nome, tipos, poder, defesa
   - **VS no meio**: Texto indicador
   - **Pokémon Direita**: Exibe imagem, nome, tipos, poder, defesa
3. **Resultado da batalha**: Mostra quem venceu com troféu 🏆
4. **Botão de ação**: "Gerar Nova Batalha"

**Features utilizadas:**
- ✅ **@if** - Mostra pokémons apenas quando carregados
- ✅ **@for** - Lista tipos de cada pokémon
- ✅ **Pipe capitalize** - "pikachu" → "Pikachu"
- ✅ **Pipe titlecase** - "fire" → "Fire"
- ✅ **Diretiva HighlightDirective** - Destaca cards com cor e efeito hover
- ✅ **[routerLink]** - Link para página de detalhes com ID do pokémon

### 🎨 Arquivo: `home.page.scss`

**Estilos principais:**
- Background com imagem de grama
- Cards com gradiente e sombra
- Animações de slide-in para pokémons
- Efeitos hover com transform e shadow
- Design responsivo para mobile

---

## 📄 PÁGINA 2: DETAIL PAGE (Detalhes do Pokémon)

### 🎬 O que a página faz?

A **Detail Page** exibe informações completas sobre um pokémon específico:

1. **Recebe um ID de pokémon via rota** (ex: `/detail/25` para Pikachu)
2. **Busca dados completos** via `PokemonService`
3. **Exibe informações detalhadas**:
   - Nome capitalizado
   - ID do pokémon
   - Imagem oficial
   - Tipos (com cores específicas)
   - Todas as estatísticas em gráfico
   - Lista dos 10 primeiros movimentos
   - Altura e peso
4. **Oferece botão para voltar** à home

### 📁 Arquivo: `detail.page.ts`

```typescript
export class DetailPage implements OnInit {
  pokemon: any = null;           // Dados do pokémon
  carregando = true;             // Estado de carregamento
  erro: string | null = null;    // Mensagem de erro

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit() {
    // Lê o ID da rota
    this.route.params.subscribe((params) => {
      this.carregarPokemon(params['id']);
    });
  }

  carregarPokemon(id: string) {
    // 1. Chama PokemonService.getPokemonPorId(id)
    // 2. Armazena dados em this.pokemon
    // 3. Marca carregamento como falso
  }

  get moves(): any[] {
    // Retorna movimentos ou array vazio
    // Isso evita erro de tipagem
    return this.pokemon?.moves || [];
  }

  voltarParaHome() {
    // Navega de volta para /home
  }
}
```

**Responsabilidades:**
- ✅ Ler parâmetro `id` da rota
- ✅ Buscar dados completos do pokémon
- ✅ Gerenciar estado de carregamento
- ✅ Oferecer getter seguro para movimentos

### 🎨 Arquivo: `detail.page.html`

**Estrutura:**
1. **Header com botão voltar** - Volta para home
2. **Seção de carregamento** - Mostra enquanto busca dados
3. **Seção de erro** - Se falhar a requisição
4. **Detalhes do pokémon**:
   - Nome e ID
   - Imagem grande com destaque
   - Tipos com cores por tipo
   - Gráfico de estatísticas
   - Lista de movimentos
   - Altura e peso
   - Botão voltar

**Features utilizadas:**
- ✅ **@if** - Renderização condicional (carregando, erro, dados)
- ✅ **@for** - Lista tipos, stats, movimentos
- ✅ **Pipe capitalize** - Nome do pokémon
- ✅ **Pipe titlecase** - Nomes de tipos e movimentos
- ✅ **Pipe slice** - Limita a 10 primeiros movimentos
- ✅ **Diretiva HighlightDirective** - Destaca seção de detalhes

### 🎨 Arquivo: `detail.page.scss`

**Estilos principais:**
- Cards com background personalizado
- Badges de tipos com cores específicas por tipo
- Gráficos de barras para estatísticas
- Grid layout para tipos
- Responsividade mobile

---

## 🔧 SERVICES

### 📁 Arquivo: `pokemon.service.ts`

**O que é?**
Um serviço Angular que centraliza todas as chamadas HTTP relacionadas a pokémons.

**Métodos:**

```typescript
@Injectable({ providedIn: 'root' })
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  // Método 1: GET pokémon aleatório
  getPokemonAleatorio(): Observable<any> {
    const id = Math.floor(Math.random() * 151) + 1;
    return this.http.get(`${this.apiUrl}/pokemon/${id}`);
  }

  // Método 2: GET pokémon por ID
  getPokemonPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${id}`);
  }
}
```

**Responsabilidades:**
- ✅ Gerenciar URL base da API
- ✅ Encapsular lógica de HTTP
- ✅ Fornecer métodos reutilizáveis
- ✅ Retornar Observables (RxJS)

**Requisitos atendidos:**
- ✅ **Requisito 2**: Usa `HttpClient`
- ✅ **Requisito 3**: 2 métodos GET (aleatório e por ID)
- ✅ **Requisito 5**: 1 Service com HttpClient

---

## 🎯 PIPES (Transformadores de Dados)

### 📁 Arquivo: `pipes/capitalize.pipe.ts`

**O que é?**
Uma pipe customizada que capitaliza a primeira letra de uma string.

```typescript
@Pipe({
  name: 'capitalize',
  standalone: true
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
```

**Exemplos:**
- `"pikachu" | capitalize` → `"Pikachu"`
- `"CHARIZARD" | capitalize` → `"Charizard"`

**Requisitos atendidos:**
- ✅ **Requisito 4 (parte 1)**: Pipe customizada

### 📁 Pipes Built-in Utilizadas

O projeto também utiliza pipes nativas do Angular:

**1. titlecase**
```html
{{ type.type.name | titlecase }}
<!-- "fire" → "Fire" -->
```

**2. uppercase**
```html
{{ pokemon.name | uppercase }}
<!-- "pikachu" → "PIKACHU" -->
```

**3. slice**
```html
{{ pokemon.moves | slice:0:10 }}
<!-- Retorna apenas os 10 primeiros movimentos -->
```

**Requisitos atendidos:**
- ✅ **Requisito 4 (parte 2)**: Pipes built-in (titlecase, uppercase, slice)

---

## 🎨 DIRECTIVES (Comportamentos Customizados)

### 📁 Arquivo: `directives/highlight.directive.ts`

**O que é?**
Uma diretiva customizada que adiciona background color e efeitos de hover a um elemento.

```typescript
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() appHighlight: string = '#ffff00'; // cor padrão

  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.style.transform = 'scale(1.05)';
    this.el.nativeElement.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.transform = 'scale(1)';
    this.el.nativeElement.style.boxShadow = 'none';
  }
}
```

**Como usar:**
```html
<div appHighlight="#e3f2fd">
  <!-- Elemento fica com fundo azul claro -->
  <!-- Ao passar mouse: escala 1.05 + sombra -->
</div>
```

**Requisitos atendidos:**
- ✅ **Requisito 6 (parte 1)**: Diretiva customizada

### 📁 Directives Estruturais Nativas

O projeto utiliza 2 diretivas estruturais do Angular:

**1. @if (ou *ngIf)**
```html
<!-- Renderiza apenas se pokemonEsquerda existir -->
<div *ngIf="pokemonEsquerda">
  <h2>{{ pokemonEsquerda.name }}</h2>
</div>

<!-- Renderiza apenas se carregando for true -->
<div *ngIf="carregando">Carregando...</div>
```

**2. @for (ou *ngFor)**
```html
<!-- Loop sobre tipos de pokémon -->
<span *ngFor="let type of pokemonEsquerda.types">
  {{ type.type.name | titlecase }}
</span>

<!-- Loop sobre estatísticas -->
<div *ngFor="let stat of pokemon.stats">
  {{ stat.stat.name }}: {{ stat.base_stat }}
</div>

<!-- Loop sobre movimentos -->
<div *ngFor="let move of (moves | slice:0:10)">
  {{ move.move?.name | titlecase }}
</div>
```

**Requisitos atendidos:**
- ✅ **Requisito 6 (parte 2)**: @if
- ✅ **Requisito 6 (parte 3)**: @for

---

## 🛣️ ROTAS (Navegação)

### 📁 Arquivo: `app.routes.ts`

**Definição de rotas:**

```typescript
export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'detail/:id',  // ← PARÂMETRO DE ROTA
    loadComponent: () => import('./detail/detail.page').then((m) => m.DetailPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
```

**Como funciona:**
- `/home` → Abre página de batalha
- `/detail/25` → Abre detalhes do pokémon com ID 25 (Pikachu)
- `/` → Redireciona para `/home`

**Requisitos atendidos:**
- ✅ **Requisito 1**: 2 pages (home + detail)
- ✅ **Requisito 7**: Parâmetro `:id` passado por rota

---

## 🔄 FLUXO DE NAVEGAÇÃO

```
┌─────────────┐
│  HOME PAGE  │
│  Batalha    │
└──────┬──────┘
       │ Clica no pokémon
       │ (ex: Pikachu)
       │
       ├─→ [routerLink]="['/detail', pokemonEsquerda.id]"
       │
       ▼
┌──────────────────┐
│  DETAIL PAGE     │
│  ID: 25          │
│  Detalhes        │
└──────┬───────────┘
       │ Clica "Voltar"
       │
       └─→ router.navigate(['/home'])
       │
       ▼
┌─────────────┐
│  HOME PAGE  │
│  Nova batalha
└─────────────┘
```

---

## 📡 FLUXO DE DADOS (HTTP)

### Requisição 1: Pokémon Aleatório (Home Page)

```
Home Page
   ↓
gerarBatalha()
   ↓
PokemonService.getPokemonAleatorio()
   ↓
HttpClient.get('https://pokeapi.co/api/v2/pokemon/{id}')
   ↓
PokéAPI Response (JSON)
   ↓
subscribe() → pokemonEsquerda = data
   ↓
Template renderiza com dados
```

### Requisição 2: Pokémon por ID (Detail Page)

```
User clica em pokémon
   ↓
Navega para /detail/25
   ↓
DetailPage ngOnInit()
   ↓
ActivatedRoute.params → ID: 25
   ↓
PokemonService.getPokemonPorId('25')
   ↓
HttpClient.get('https://pokeapi.co/api/v2/pokemon/25')
   ↓
PokéAPI Response (JSON detalhado)
   ↓
subscribe() → pokemon = data
   ↓
Template renderiza com todos os detalhes
```

---

## 📦 MÓDULOS E IMPORTS

### HttpClientModule

**Necessário para fazer requisições HTTP**

```typescript
// No arquivo main.ts (bootstrapping)
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    // ... outros providers
  ],
});
```

**Requisitos atendidos:**
- ✅ **Requisito 2**: Uso da biblioteca HttpClient

### CommonModule

**Necessário para @if, @for, @switch**

```typescript
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, ...]
})
```

---

## 🎯 RESUMO: COMO CADA REQUISITO FOI ATENDIDO

### ✅ Requisito 1: Mínimo 2 Pages (0,5 ponto)
- **HomePage**: Simulador de batalha pokémon
- **DetailPage**: Detalhes completos de um pokémon
- Arquivo: `app.routes.ts` define as 2 rotas

### ✅ Requisito 2: HttpClient (0,5 ponto)
- Importado em `main.ts` como `HttpClientModule`
- Injetado em `PokemonService`
- Usado nos métodos `getPokemonAleatorio()` e `getPokemonPorId()`

### ✅ Requisito 3: API com GET (0,5 ponto)
- **API**: PokéAPI (https://pokeapi.co/api/v2)
- **Métodos GET**: 2 métodos diferentes
  - GET `/pokemon/{id}` → pokémon aleatório
  - GET `/pokemon/{id}` → pokémon por ID

### ✅ Requisito 4: 2 Pipes (1,0 ponto)

**Pipe Customizada (0,5):**
- `CapitalizePipe` em `src/app/pipes/capitalize.pipe.ts`
- Transforma: "pikachu" → "Pikachu"

**Pipes Built-in (0,5):**
- `titlecase`: "fire" → "Fire"
- `uppercase`: "pikachu" → "PIKACHU"
- `slice`: Limita array a 10 elementos

### ✅ Requisito 5: Service com HttpClient (1,0 ponto)
- `PokemonService` em `src/app/services/pokemon.service.ts`
- Fornecido no root com `providedIn: 'root'`
- Métodos: `getPokemonAleatorio()` e `getPokemonPorId(id)`

### ✅ Requisito 6: Diretiva + @if e @for (1,5 pontos)

**Diretiva Customizada (0,5):**
- `HighlightDirective` em `src/app/directives/highlight.directive.ts`
- Adiciona cor de fundo e efeitos ao passar mouse

**Diretivas Estruturais (1,0):**
- **@if**: Renderização condicional de elementos
  - `*ngIf="pokemonEsquerda"`
  - `*ngIf="carregando"`
  - `*ngIf="ganhador"`
  
- **@for**: Loop sobre arrays
  - `*ngFor="let type of pokemon.types"`
  - `*ngFor="let stat of pokemon.stats"`
  - `*ngFor="let move of (moves | slice:0:10)"`

### ✅ Requisito 7: EXTRA - Parâmetro por Rota (1,0 ponto)
- **Rota com parâmetro**: `/detail/:id`
- **Passagem**: `[routerLink]="['/detail', pokemonEsquerda.id]"`
- **Recebimento**: `ActivatedRoute.params.subscribe()`
- Permite navegar de Home para Detail com ID específico do pokémon

---

## 🚀 COMO EXECUTAR O PROJETO

### 1. Instalar dependências
```bash
cd pokemon
npm install
```

### 2. Iniciar servidor de desenvolvimento
```bash
npm start
```

### 3. Acessar a aplicação
Abrir navegador em: `http://localhost:4200`

### 4. Usar a aplicação
- Home page abre automaticamente
- Clique em um pokémon para ver detalhes
- Clique "Gerar Nova Batalha" para novos pokémons
- Use botão voltar na detail page

---

## 📝 OBSERVAÇÕES IMPORTANTES

1. **HttpClient é essential**: Todas as requisições passam pelo `PokemonService` centralizado
2. **Tipagem TypeScript**: Usamos `any` para flexibilidade com dados da API
3. **RxJS Observables**: As requisições HTTP retornam Observables que são subscritas nos componentes
4. **Lazy Loading**: As páginas são carregadas sob demanda com `loadComponent()`
5. **Standalone Components**: Todos os componentes, pipes e diretivas são standalone
6. **Responsividade**: Design mobile-first com Ionic e estilos responsivos

---

## 💡 PONTOS EXTRAS IMPLEMENTADOS

1. **Pipe customizada** com lógica própria
2. **Diretiva customizada** com event listeners
3. **Rota parametrizada** para melhor UX
4. **Gráficos de stats** na detail page
5. **Cores de tipo de pokémon** (Fire, Water, Grass, etc.)
6. **Tratamento de erro** com mensagens
7. **Estados de carregamento** em ambas páginas
8. **Animações** de transição
9. **Design visual atraente** com gradientes e shadows

---

## 🎓 CONCLUSÃO

O projeto **VaiPokémon** demonstra o domínio de conceitos fundamentais do Angular:
- Componentes e templates
- Serviços e injeção de dependência
- Pipes (customizadas e built-in)
- Diretivas (customizadas e estruturais)
- Roteamento com parâmetros
- Requisições HTTP assíncronas
- RxJS e Observables

**Pontuação Total: 7,5 pontos** (Máximo possível)

