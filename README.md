# Portfolio-Dart Monorepo

Este u00e9 um monorepo que contu00e9m o cu00f3digo completo do projeto Portfolio Dart, incluindo o backend (API) e o frontend.

## Estrutura do Projeto

- `/api`: Backend NestJS com MongoDB
- `/frontend`: Frontend Next.js 14 (aplicativos admin e portfolio)

## Tecnologias Utilizadas

### Backend
- **NestJS**: Framework para Node.js
- **MongoDB**: Banco de dados NoSQL
- **JWT**: Autenticau00e7u00e3o com tokens

### Frontend
- **Next.js 14**: Framework React para SSR/SSG
- **Material UI**: Biblioteca de componentes UI
- **TypeScript**: Tipagem estu00e1tica

## Aplicau00e7u00f5es

- **Portfolio**: Exibiu00e7u00e3o pu00fablica de projetos, experiu00eancia e habilidades
- **Admin**: u00c1rea administrativa protegida por login para gerenciamento de conteu00fado

## Como Executar

### Requisitos
- Node.js (v18+)
- npm ou yarn
- MongoDB

### Configurando o Ambiente

1. Clone o repositu00f3rio
2. Configure os arquivos de ambiente:
   - Copie `/api/.env.example` para `/api/.env`
   - Configure suas variu00e1veis de ambiente

### Instalando dependu00eancias

```bash
# Instalando backend
cd api
npm install

# Instalando frontend
cd ../frontend
npm install
```

### Executando o projeto

```bash
# Backend
cd api
npm run start:dev

# Frontend
cd ../frontend
npm run dev
```

Acesse:
- Portfolio: http://localhost:3003
- Admin: http://localhost:3002
- API: http://localhost:3001/api
