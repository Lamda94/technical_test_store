# Technical Test Store - E-commerce Backend

Una API REST completa para tienda en línea desarrollada con NestJS, TypeScript y arquitectura hexagonal (clean architecture).

## Descripción

Este proyecto es un backend para una tienda en línea que maneja artículos, clientes, órdenes, transacciones y entregas. Está integrado con el sistema de pagos de Wompi para procesar transacciones con tarjeta de crédito.

## Arquitectura del Proyecto

El proyecto utiliza **Arquitectura Hexagonal (Clean Architecture)** con la siguiente estructura:

```
src/
├── common/           # Elementos compartidos (guards, middlewares)
├── database/         # Configuración de base de datos
└── store/           # Módulos de negocio
    ├── articles/    # Gestión de artículos
    ├── customer/    # Gestión de clientes
    ├── delivery/    # Gestión de entregas
    ├── order/       # Gestión de órdenes
    └── transaction/ # Gestión de transacciones y pagos
```

### Cada módulo de negocio sigue la estructura:

```
module/
├── application/     # Casos de uso (lógica de negocio)
├── domain/         # Entidades y puertos (interfaces)
│   ├── entity/     # Definición de entidades
│   └── port/       # Interfaces de repositorios
└── infrastructure/ # Implementaciones concretas
    ├── controller/ # Controladores REST
    ├── dto/        # Data Transfer Objects
    ├── models/     # Modelos de base de datos (TypeORM)
    └── repository/ # Implementación de repositorios
```

## Tecnologías Utilizadas

### Backend Framework
- **NestJS** v11 - Framework Node.js progresivo
- **TypeScript** - Superset tipado de JavaScript
- **Express** - Servidor web

### Base de Datos
- **PostgreSQL** - Base de datos relacional
- **TypeORM** - ORM para TypeScript

### Validación y Documentación
- **Class-validator** - Validación de DTOs
- **Class-transformer** - Transformación de datos
- **Swagger/OpenAPI** - Documentación automática de API

### Procesamiento de Pagos
- **Wompi API** - Gateway de pagos colombiano
- **Axios** - Cliente HTTP para integraciones

### Utilidades
- **Moment.js** - Manejo de fechas y zonas horarias
- **dotenv** - Configuración por entornos
- **cross-env** - Variables de entorno multiplataforma

## Instalación y Configuración

### Prerrequisitos

- Node.js >= 18
- PostgreSQL >= 12
- pnpm (recomendado) o npm

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd technical_test_store
$ pnpm install
```

### 2. Instalar dependencias

```bash
pnpm install
# o con npm
npm install
```

### 3. Configurar base de datos PostgreSQL

Crear una base de datos PostgreSQL:

```sql
CREATE DATABASE db_test;
CREATE USER admin WITH PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE db_test TO admin;
```

### 4. Configuración de variables de entorno

El proyecto ya incluye un archivo `.env.local` con la configuración de desarrollo:

```bash
# Base de datos
DB_TYPE=postgres
HOST_DB=localhost
DB_PORT=5432
USER_DB=admin
USER_DB_PASS=admin
DB_NAME_DEV=db_test

# Aplicación
PORT_APP=3004
NODE_ENV=local

# Wompi Payment Gateway (Sandbox)
BASE_URL_PAYMENT=https://api-sandbox.co.uat.wompi.dev/v1
PUBLIC_KEY=pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7
PRIVATE_KEY=prv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg
SECRET_INTEGRITY=stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp
```

### 5. Ejecutar la aplicación

#### Desarrollo
```bash
# Iniciar en modo desarrollo con recarga automática
pnpm run start:dev

# O específicamente para entorno local
pnpm run start:local
```

#### Producción
```bash
# Compilar y ejecutar
pnpm run build
pnpm run start:prod
```

#### Con PM2 (para producción)
```bash
# Instalar PM2 globalmente
npm install -g pm2

# Ejecutar con PM2
pm2 start pm2.config.js
```

## Documentación de la API

Una vez que la aplicación esté ejecutándose, puedes acceder a la documentación Swagger en:

```
http://localhost:3004/api/docs
```

## Scripts Disponibles

```bash
# Desarrollo
pnpm run start:dev      # Modo desarrollo con recarga automática
pnpm run start:local    # Desarrollo con variables de entorno local
pnpm run start:staging  # Entorno de staging

# Producción
pnpm run build          # Compilar proyecto
pnpm run start:prod     # Ejecutar en producción

```

## Funcionalidades Principales

### Gestión de Artículos
- Listar artículos disponibles
- Obtener detalles de un artículo específico
- Control de inventario automático

### Gestión de Clientes
- Registro de nuevos clientes
- Consulta de información del cliente

### Gestión de Órdenes
- Creación de órdenes de compra
- Asociación con clientes y artículos

### Procesamiento de Transacciones
- Integración con Wompi para pagos
- Validación de tarjetas de crédito
- Seguimiento de estado de transacciones
- Firmas digitales para seguridad

### Gestión de Entregas
- Generación automática de entregas
- Seguimiento de estados de entrega
- Asociación con transacciones

## Flujo de Compra

1. **Cliente** → Se registra o proporciona datos
2. **Artículo** → Se selecciona y valida disponibilidad
3. **Orden** → Se crea con los datos del cliente y artículo
4. **Transacción** → Se procesa el pago con Wompi
5. **Entrega** → Se genera automáticamente si el pago es exitoso
6. **Inventario** → Se actualiza el stock del artículo

## Endpoints Principales

### Artículos
- `GET /article/list` - Listar todos los artículos
- `GET /article/detail?id={id}` - Obtener detalles de un artículo

### Clientes
- `POST /customer/create` - Crear nuevo cliente
- `GET /customer/detail?customer_id={id}` - Obtener datos del cliente

### Transacciones
- `POST /transaction/generate` - Iniciar proceso de pago
- `GET /transaction/status?id={id}` - Consultar estado de transacción
- `GET /transaction/acceptance/links` - Obtener enlaces de aceptación

### Entregas
- `GET /delivery/detail?id_trans={id}` - Consultar entrega por transacción

## Seguridad

- Validación de DTOs con class-validator
- Firmas digitales para transacciones
- Tokens de aceptación para pagos
- Variables de entorno para datos sensibles


## Despliegue

### Con PM2 (Recomendado para producción)

```bash
# Instalar PM2
npm install -g pm2

# Ejecutar aplicación
pm2 start pm2.config.js

# Ver logs
pm2 logs technical_test_store

# Reiniciar
pm2 restart technical_test_store
```


## Estructura de Base de Datos

### Tablas Principales

- **articles** - Catálogo de productos
- **customer** - Información de clientes
- **orders** - Órdenes de compra
- **transactions** - Transacciones de pago
- **delivery** - Información de entregas

### Relaciones

- Cliente → Órdenes (1:N)
- Artículo → Órdenes (1:N)
- Orden → Transacciones (1:N)
- Transacción → Entrega (1:1)
