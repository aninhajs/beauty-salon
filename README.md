# Beauty Salon - Guia de Setup e Documentação

## 📋 Visão Geral

Este projeto é uma aplicação de salão de beleza construída com Next.js 15, React 19, Prisma 7 e PostgreSQL (Supabase). A migração para Prisma 7 foi concluída com sucesso em 28/09/2026.

## 🚀 O que foi criado/atualizado

### Dependências Instaladas

- **Prisma 7.9.1** - ORM para gerenciar banco de dados
- **@prisma/client 7.9.1** - Cliente Prisma para Node.js/TypeScript
- **Next.js 15.5.2** - Framework React
- **React 19.1.0** - Biblioteca UI
- **TypeScript 5** - Tipagem estática

### Arquivos Criados/Modificados

```
beauty-salon/
├── prisma/
│   ├── schema.prisma          (✅ Atualizado com generator client)
│   └── migrations/
│       ├── 0_init/
│       │   └── migration.sql   (✅ Criado - Schema inicial)
│       └── migration_lock.toml (✅ Criado - Lock de provider)
├── .env                        (✅ Corrigido - Credenciais escapadas)
├── .env.local                  (✅ Atualizado - URL direta)
└── package.json                (✅ @prisma/client adicionado)
```

## 🗄️ Modelo de Dados

### Tabelas Criadas

#### 1. **User** - Usuários do Sistema

```sql
- id: String (ID único)
- name: String (Opcional)
- email: String (Único)
- emailVerified: DateTime (Opcional)
- image: String (Opcional)
- createdAt: DateTime
- updatedAt: DateTime
- Relações: accounts, sessions, bookings
```

#### 2. **Account** - Contas de Login (OAuth)

```sql
- provider: String (ID composto)
- providerAccountId: String (ID composto)
- userId: String (FK para User)
- type: String
- refresh_token: String (Opcional)
- access_token: String (Opcional)
- expires_at: Int (Opcional)
- token_type: String (Opcional)
- scope: String (Opcional)
- id_token: String (Opcional)
- session_state: String (Opcional)
- createdAt: DateTime
- updatedAt: DateTime
```

#### 3. **Session** - Sessões de Usuário

```sql
- sessionToken: String (Único)
- userId: String (FK para User)
- expires: DateTime
- createdAt: DateTime
- updatedAt: DateTime
```

#### 4. **VerificationToken** - Tokens de Verificação

```sql
- identifier: String (ID composto)
- token: String (ID composto)
- expires: DateTime
```

#### 5. **Barbershop** - Barbearias/Salões

```sql
- id: String (UUID)
- name: String
- address: String
- phones: String[] (Array)
- description: String
- imageUrl: String
- createdAt: DateTime
- updatedAt: DateTime
- Relações: services
```

#### 6. **BarbershopService** - Serviços Oferecidos

```sql
- id: String (UUID)
- name: String
- description: String
- imageUrl: String
- price: Decimal(10,2)
- barbershopId: String (FK para Barbershop)
- Relações: barbershop, bookings
```

#### 7. **Booking** - Reservas/Agendamentos

```sql
- id: String (UUID)
- userId: String (FK para User)
- serviceId: String (FK para BarbershopService)
- date: DateTime
- createdAt: DateTime
- updatedAt: DateTime
```

## 🔌 Configuração do Banco de Dados

### Supabase PostgreSQL

- **Provider**: PostgreSQL
- **Host**: aws-0-us-east-1.pooler.supabase.com
- **Database**: postgres
- **Porta (Pool)**: 6543 (pgbouncer)
- **Porta (Direto)**: 5432

### Variáveis de Ambiente

#### `.env` (Com pgbouncer - para aplicação)

```env
DATABASE_URL="postgresql://postgres.qvbxueupipsvrmfjqhfp:Anajeize38%40@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.qvbxueupipsvrmfjqhfp:Anajeize38%40@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
```

#### `.env.local` (Direto - para migrações)

```env
DATABASE_URL="postgresql://postgres.qvbxueupipsvrmfjqhfp:Anajeize38%40@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
```

**Nota**: O caractere `@` na senha foi escapado como `%40` para evitar conflitos na URL.

## 📦 Instalação e Setup

### 1. Instalação de Dependências

```bash
npm install
```

### 2. Gerar Prisma Client

```bash
npx prisma generate
```

### 3. Aplicar Migrações (Production/Staging)

Use a URL direta para evitar problemas com pool de conexão:

```bash
$env:DATABASE_URL="postgresql://postgres.qvbxueupipsvrmfjqhfp:Anajeize38%40@aws-0-us-east-1.pooler.supabase.com:5432/postgres"; npx prisma migrate deploy
```

Ou via `.env.local`:

```bash
npx prisma migrate deploy
```

### 4. Sincronizar Schema com Banco (Desenvolvimento)

```bash
npx prisma db push
```

### 5. Visualizar Dados (Prisma Studio)

```bash
npx prisma studio
```

Abrirá em `http://localhost:5555`

## 🔄 Usando Prisma no Código

### Importar Prisma Client

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
```

### Exemplos de Queries

#### Criar Usuário

```typescript
const user = await prisma.user.create({
  data: {
    email: "usuario@example.com",
    name: "João Silva",
  },
});
```

#### Criar Barbershop com Serviços

```typescript
const barbershop = await prisma.barbershop.create({
  data: {
    name: "Barbearia Premium",
    address: "Rua Principal, 123",
    phones: ["(11) 98765-4321"],
    description: "Melhor barbearia da cidade",
    imageUrl: "https://...",
    services: {
      create: [
        {
          name: "Corte Simples",
          description: "Corte de cabelo básico",
          price: 50.0,
          imageUrl: "https://...",
        },
      ],
    },
  },
  include: { services: true },
});
```

#### Fazer Agendamento

```typescript
const booking = await prisma.booking.create({
  data: {
    userId: "user-id",
    serviceId: "service-id",
    date: new Date("2026-10-15T14:00:00"),
  },
  include: {
    user: true,
    service: true,
  },
});
```

#### Buscar Barbershops com Serviços

```typescript
const barbershops = await prisma.barbershop.findMany({
  include: {
    services: true,
  },
});
```

#### Buscar Agendamentos de um Usuário

```typescript
const bookings = await prisma.booking.findMany({
  where: {
    userId: "user-id",
  },
  include: {
    service: {
      include: {
        barbershop: true,
      },
    },
  },
});
```

## 📝 Histórico de Migrações

### 0_init (28/09/2026)

- Criação inicial de todas as tabelas
- Setup de relacionamentos
- Criação de índices únicos
- Foreign keys com cascata delete onde apropriado

Para visualizar as migrações:

```bash
npx prisma migrate status
```

## 🛠️ Scripts npm

```json
{
  "dev": "next dev", // Inicia servidor de desenvolvimento
  "build": "next build", // Build de produção
  "start": "next start", // Inicia servidor de produção
  "lint": "eslint" // Verifica código
}
```

### Executar servidor de desenvolvimento

```bash
npm run dev
```

Abrirá em `http://localhost:3000`

## ⚠️ Troubleshooting

### Problema: "prepared statement s1 already exists"

**Solução**: Use a URL direta (porta 5432) em vez da URL com pgbouncer (porta 6543)

### Problema: Prisma Client não encontrado

**Solução**: Execute `npx prisma generate`

### Problema: Migrações não aplicadas

**Solução**: Use a variável de ambiente com URL direta:

```bash
$env:DATABASE_URL="postgresql://postgres.qvbxueupipsvrmfjqhfp:Anajeize38%40@aws-0-us-east-1.pooler.supabase.com:5432/postgres"; npx prisma migrate deploy
```

## 📚 Recursos Úteis

- [Documentação Prisma](https://www.prisma.io/docs/)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Supabase PostgreSQL](https://supabase.com/docs/guides/database)
- [Next.js Documentação](https://nextjs.org/docs)

## 📝 Próximos Passos

1. Criar páginas/componentes React para interface
2. Implementar autenticação (NextAuth.js ou similar)
3. Criar API routes para CRUD das entidades
4. Adicionar validação de dados
5. Implementar testes automatizados
6. Setup de CI/CD

---

**Atualizado em**: 28/09/2026  
**Versão Prisma**: 7.9.1  
**Versão Next.js**: 15.5.2
