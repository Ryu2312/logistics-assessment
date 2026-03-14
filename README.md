# Logistics Assessment

Sistema de gestión de operaciones y márgenes de volumen para la evaluación de logística en múltiples plantas. Esta es una aplicación full-stack moderna que utiliza NestJS + GraphQL en el backend y React + TypeScript en el frontend.

## 📋 Estructura del Proyecto

Este es un monorepo organizado con **Turbo** y **pnpm workspaces**:

```
logistics-assessment/
├── apps/
│   ├── api/              # Backend NestJS + GraphQL + Prisma
│   └── web/              # Frontend React + TypeScript + Vite + Tailwind
├── packages/
│   ├── eslint-config/    # Configuración compartida de ESLint
│   ├── prettier-config/  # Configuración compartida de Prettier
│   └── typescript/       # Configuración compartida de TypeScript
└── [archivos de configuración]
```

---

## 🚀 Instalación y Setup Inicial

### Prerequisitos

Asegúrate de tener instalado:

- **Node.js** (v18 o superior)
- **pnpm** (v10 o superior)
- **Docker** y **Docker Compose** (para PostgreSQL)
- **Git**

### Pasos de Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone <repository-url>
   cd logistics-assessment
   ```

2. **Instalar dependencias del monorepo:**

   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno:**

   **Para el backend** (`apps/api/.env`):

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/logistics_db
   PORT=3000
   HOST=0.0.0.0
   CORS_ORIGIN=http://localhost:5173
   NODE_ENV=development
   ```

   **Para el frontend** (`apps/web/.env.local`):

   ```env
   VITE_GRAPHQL_URL=http://localhost:3000/graphql
   ```

4. **¡Listo! Ejecuta el proyecto:**

   ```bash
   pnpm run dev
   ```

   Turbo automáticamente:
   - Levanta Docker con PostgreSQL
   - Ejecuta migraciones y seeds
   - Inicia el API en http://localhost:3000
   - Inicia el Frontend en http://localhost:5173

---

## 🏃 Cómo Ejecutar el Proyecto

### ✅ Modo Desarrollo (Recomendado) - Una Sola Línea

Desde la **raíz del proyecto**:

```bash
pnpm run dev
```

Eso es todo. Turbo automáticamente:

1. **Levanta Docker** con PostgreSQL
2. **Ejecuta migraciones** de Prisma
3. **Ejecuta seeds** de datos
4. **Inicia el Backend** en http://localhost:3000
   - GraphQL Playground disponible en http://localhost:3000/graphql
5. **Espera a que el backend esté listo**
6. **Inicia el Frontend** en http://localhost:5173

Todo en paralelo y en orden correcto. El frontend automáticamente espera a que el backend esté disponible antes de iniciar.

> 💡 **Tip:** No necesitas abrir múltiples terminales. Turbo maneja todo desde una sola línea de comandos.

---

## 📦 Descripción de Módulos Backend

El backend está organizado en módulos especializados. Cada uno maneja una funcionalidad específica del sistema:

### 1. **Módulo de Plantas** (`apps/api/src/modules/plants/`)

**Responsabilidad:** Gestionar las ubicaciones/plantas donde se llevan a cabo las operaciones.

**Componentes:**

- `plant.model.ts` - Modelo GraphQL de Planta
- `plants.service.ts` - Lógica de negocio para plantas
- `plants.resolver.ts` - Resolvers GraphQL para queries de plantas

**Funcionalidades:**

- Obtener listado de todas las plantas

**Ejemplo Query:**

```graphql
query GetPlants {
  plants {
    id
    name
  }
}
```

### 2. **Módulo de Operaciones** (`apps/api/src/modules/operations/`)

**Responsabilidad:** Gestionar las operaciones logísticas asociadas a cada planta (carga, descarga, transporte, etc.).

**Componentes:**

- `operation.model.ts` - Modelo GraphQL de Operación
- `operations.service.ts` - Lógica CRUD de operaciones
- `operations.resolver.ts` - Resolvers para crear, eliminar y listar operaciones
- `inputs/` - DTOs para validación de inputs

**Funcionalidades:**

- Crear nuevas operaciones
- Eliminar operaciones
- Obtener todas las operaciones

**Ejemplo Mutation:**

```graphql
mutation CreateOperation {
  createOperation(input: { name: "Carga" }) {
    operationId
    operationName
  }
}
```

### 3. **Módulo de Márgenes** (`apps/api/src/modules/margins/`)

**Responsabilidad:** Gestionar los márgenes de ganancia por rango de volumen para cada operación.

**Componentes:**

- `operation-margin.model.ts` - Modelo GraphQL para márgenes
- `margins.service.ts` - Lógica de cálculo y gestión de márgenes
- `margins.resolver.ts` - Resolvers para upsert de márgenes
- `models/` - Modelos de volumen y margen
- `inputs/` - Validación de inputs para márgenes

**Funcionalidades:**

- Asignar márgenes a operaciones por rango de volumen
- Actualizar márgenes existentes
- Obtener márgenes por planta y operación
- Validar rangos de volumen (300KG, 500KG, 1T, 3T, 5T, 10T, 20T, 30T)

**Rangos de Volumen Soportados:**

```typescript
enum VolumeRange {
  KG_300 = "300 kilogramos"
  KG_500 = "500 kilogramos"
  T_1   = "1 tonelada"
  T_3   = "3 toneladas"
  T_5   = "5 toneladas"
  T_10  = "10 toneladas"
  T_20  = "20 toneladas"
  T_30  = "30 toneladas"
}
```

**Ejemplo Mutation:**

```graphql
mutation UpsertMargins {
  upsertOperationMargins(
    input: {
      operationId: "op-1"
      plantId: "plant-1"
      margins: [{ volume: KG_300, margin: 15.5 }, { volume: T_1, margin: 12.0 }]
    }
  ) {
    operationId
    operationName
    margins {
      volume
      margin
    }
  }
}
```

### 4. **Módulo Prisma** (`apps/api/src/prisma/`)

**Responsabilidad:** Configuración de la conexión a la base de datos PostgreSQL mediante Prisma ORM.

**Componentes:**

- `prisma.module.ts` - Módulo que exporta el servicio Prisma
- `prisma.service.ts` - Servicio singleton para transacciones y conexión

---

## 🛠️ Stack Tecnológico

### Backend

- **Framework:** NestJS 11
- **API:** GraphQL con Apollo Server
- **ORM:** Prisma + PostgreSQL
- **Lenguaje:** TypeScript
- **Validación:** class-validator, class-transformer

### Frontend

- **Framework:** React 18
- **Build:** Vite 8
- **Lenguaje:** TypeScript
- **Styling:** Tailwind CSS
- **GraphQL Client:** Apollo Client
- **Gestión de Estado:** React Context API

### DevOps

- **Monorepo:** Turbo
- **Package Manager:** pnpm
- **Base de Datos:** PostgreSQL 15
- **Containerización:** Docker & Docker Compose
- **Control de Versiones:** Git

---

## 🔄 Manejo de Conflictos en `schema.graphql`

### ✨ La Solución Elegante: Schema Autogenerado

El archivo `schema.gql` **se regenera automáticamente** mediante NestJS. Esta decisión arquitectónica es brillante porque:

✅ **NUNCA se edita manualmente** (evita errores de sincronización)  
✅ **Los conflictos se resuelven automáticamente** al regenerar  
✅ **El schema siempre está sincronizado** con el código TypeScript  
✅ **Cero inconsistencias** entre lo que escribiste y lo que se ejecuta

### ¿Qué Pasa si Hay Un Conflicto de Merge?

**No es un problema.** El archivo se regenerará automáticamente cuando levantes el servidor.

**Resolución automática:**

```bash
# 1. Durante merge, si hay conflicto en schema.gql
git merge origin/main
# CONFLICT: apps/api/src/schema.gql

# 2. Simplemente elimina el archivo conflictivo
git rm apps/api/src/schema.gql

# 3. Completa el merge
git add -A
git commit -m "chore: merge main, schema.gql será regenerado"

# 4. Cuando inicies el servidor desde la raíz
pnpm run dev

# El API se levanta y regenera automáticamente schema.gql
# ✓ Incluyendo todos los cambios de ambas ramas
```

### ¿Cómo Funciona?

**En `apps/api/package.json`:**

```json
{
  "scripts": {
    "dev": "docker compose up -d --wait db && prisma generate && prisma migrate dev && prisma db seed && nest start --watch"
  }
}
```

Cada vez que el API inicia, NestJS analiza:

- `@Resolver()` decorators
- `@Query()` y `@Mutation()` decorators
- GraphQL Models e Inputs TypeScript

Y **regenera automáticamente** el `schema.gql` con toda esa información.

### Política de Code Review

En revisión de PR:

- ❌ **NO revisar** cambios línea por línea en `schema.gql`
- ✅ **SÍ revisar** cambios en:
  - `*.resolver.ts` - Nuevas queries/mutations
  - `*.input.ts` - Nuevos inputs validados
  - `*.model.ts` - Nuevos tipos GraphQL

El schema es un **artefacto generado**, confía en la regeneración automática.

---

## 📝 Comandos Útiles

```bash
# Instalar dependencias
pnpm install

# Ejecutar todo en desarrollo
pnpm run dev

# Ejecutar solo backend
cd apps/api && pnpm dev

# Ejecutar solo frontend
cd apps/web && pnpm dev

# Build de toda la aplicación
pnpm run build

# Linting
pnpm run lint

# Formatear código
pnpm run format

# Migraciones de base de datos
cd apps/api && pnpm prisma migrate dev

# Regenerar Prisma Client
cd apps/api && pnpm prisma generate

# Ejecutar seeds de base de datos
cd apps/api && pnpm prisma db seed

# Health check del backend
curl http://localhost:3000/graphql
```

---

## 🐛 Troubleshooting

### La base de datos no se conecta

```bash
# Verificar que Docker está corriendo
docker ps

# Ver logs de PostgreSQL
docker-compose logs postgres

# Reiniciar servicios
docker-compose down && docker-compose up -d
```

### Schema.gql tiene cambios no guardados

```bash
# Cuando abras el proyecto, siempre ejecuta
cd apps/api && pnpm dev

# Esto regenerará automáticamente el schema
# Opcional: hacer commit del schema regenerado
git add apps/api/src/schema.gql
```

### Puerto 3000 o 5173 ya en uso

```bash
# Cambiar puerto en apps/api/.env
PORT=3001

# Cambiar puerto en apps/web/vite.config.ts
server: { port: 5174 }
```

---

## 🙏 Agradecimiento

Agradezco sinceramente la oportunidad de trabajar en esta prueba técnica de **Logistics Assessment**. Este proyecto ha sido una excelente experiencia para:

- **Arquitectura Full-Stack:** Diseñar e implementar un monorepo escalable con NestJS + React
- **GraphQL:** Dominar la integración completa de GraphQL (servidor y cliente)
- **Manejo de Estado:** Implementar Context API con Apollo Client de forma eficiente
- **UI/UX:** Crear interfaces responsivas con Tailwind CSS y validación en tiempo real
- **Buenas Prácticas:** Componentes modularizados, tipos TypeScript strictos, y manejo de conflictos Git

El desafío de implementar un sistema de márgenes con múltiples plantas y volúmenes dinámicos me permitió aplicar principios SOLID, optimización de rendimiento, y patrones de desarrollo modernos.

**Espero haber demostrado:**

- ✅ Capacidad de aprender y adaptarse rápidamente
- ✅ Código limpio, mantenible y documentado
- ✅ Solución de problemas de forma creativa
- ✅ Comunicación clara a través del código y documentación

Quedo disponible para clarificar cualquier aspecto de la implementación o responder preguntas sobre las decisiones arquitectónicas tomadas.

---

## 📞 Contacto

Para preguntas o aclaraciones sobre la implementación, contáctame directamente.

**Happy coding! 🚀**

---

_Última actualización: Marzo 13, 2026_
