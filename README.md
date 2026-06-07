# PrintLab – Gestão de Loja Shopee 🖨️

Dashboard de gestão financeira para loja de impressão 3D na Shopee.

## Funcionalidades

- **Dashboard**: KPIs de receita, lucro, margem e unidades vendidas com gráficos por mês
- **Produtos**: Cadastro com simulação de custo em tempo real (filamento, pintura, embalagem, taxa Shopee)
- **Vendas**: Registro de vendas com filtro por mês e análise de lucro por operação
- **Configurações**: Presets de filamentos com preço por kg

## Como rodar localmente

```bash
npm install
npm run dev
```

## Deploy no Vercel

### Opção 1 – Via GitHub (recomendado)

1. Suba este repositório no GitHub
2. Acesse [vercel.com](https://vercel.com) e faça login
3. Clique em **"Add New Project"**
4. Importe seu repositório do GitHub
5. As configurações são detectadas automaticamente (Vite + React)
6. Clique em **Deploy** ✅

### Opção 2 – Via Vercel CLI

```bash
npm install -g vercel
vercel
```

## Estrutura do projeto

```
src/
├── components/
│   └── Sidebar.jsx         # Navegação lateral
├── pages/
│   ├── Dashboard.jsx       # KPIs e gráficos
│   ├── Products.jsx        # Cadastro de produtos
│   ├── Sales.jsx           # Registro de vendas
│   └── Settings.jsx        # Configurações
├── hooks/
│   └── useStore.js         # Estado global com localStorage
├── utils/
│   └── data.js             # Helpers de cálculo e dados de exemplo
├── App.jsx
├── main.jsx
└── index.css
```

## Lógica de custo

```
Custo Total = Filamento + Pintura + Embalagem + Taxa Shopee (14%)
Filamento   = (gramas / 1000) × preço por kg
Lucro       = Preço de Venda − Custo Total
Margem      = (Lucro / Preço de Venda) × 100
```

> Energia não é considerada (painel solar ☀️)

## Dados

Todos os dados são salvos no **localStorage** do navegador — sem backend, sem banco de dados. Dados de exemplo são carregados na primeira visita.
