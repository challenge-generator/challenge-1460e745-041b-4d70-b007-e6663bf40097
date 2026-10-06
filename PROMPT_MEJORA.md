# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `Dockerfile` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.
- `docker-compose.yml` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/infrastructure/repositories/prisma-loan-request.repository.ts` — `LoanRequest.create`: Se invoca `create` sobre `LoanRequest`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/repositories/prisma-loan-request.repository.ts` — `LoanRequest.findUnique`: Se invoca `findUnique` sobre `LoanRequest`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/repositories/prisma-loan-request.repository.ts` — `LoanRequest.update`: Se invoca `update` sobre `LoanRequest`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/repositories/prisma-loan-request.repository.ts` — `LoanRequest.findMany`: Se invoca `findMany` sobre `LoanRequest`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/repositories/prisma-loan-request.repository.ts` — `LoanRequest.delete`: Se invoca `delete` sobre `LoanRequest`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/application/loan-request.service.ts` — `WinstonLogger.info`: Se invoca `info` sobre `WinstonLogger`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/controllers/loan-request.controller.ts` — `LoanRequestService.findAll`: Se invoca `findAll` sobre `LoanRequestService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/controllers/loan-request.controller.ts` — `LoanRequestService.delete`: Se invoca `delete` sobre `LoanRequestService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/controllers/loan-request.controller.spec.ts` — `LoanRequestController.processLoanRequest`: Se invoca `processLoanRequest` sobre `LoanRequestController`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `package.json` — `typescript@5.7.0`: typescript declara la version 5.7.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Senior

### Brecha de conocimiento
Experiencia comprobable en al menos un marco de trabajo (Framework) en su lenguaje de programación principal. Puede realizar el enrutamiento de solicitudes, controlar las variables de entorno, generar registros de rastros (Logs) y conectarse con bases de datos utilizando un Mapeador Relacional de Objetos (ORM).

### Misión / candidato
Candidato con experiencia Senior en Node.

### Reto
- Tema: Experiencia en Frameworks
- Seniority: senior-l2
- Tipo: practical
- Título: Desarrollo de un microservicio en Node.js
- Tiempo estimado: 2 semanas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Enrutamiento de solicitudes — objetivo: Implementar el enrutamiento básico de solicitudes de préstamos. — entregable (NO resolver): Microservicio con enrutamiento básico de solicitudes operativo.
- Fase 2: Control de variables de entorno y logs — objetivo: Implementar el control de variables de entorno y la generación de logs. — entregable (NO resolver): Microservicio con control de variables de entorno y generación de logs.
- Fase 3: Conexión con base de datos utilizando ORM — objetivo: Implementar la conexión con una base de datos utilizando un ORM. — entregable (NO resolver): Microservicio conectado a una base de datos utilizando un ORM.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "loan-microservice",
  "version": "1.0.0",
  "description": "Microservicio para manejo de solicitudes de préstamos",
  "main": "dist/main.js",
  "scripts": {
    "build": "rimraf dist && tsc",
    "format": "prettier --write \"src/**/*.ts\"",
    "start": "ts-node src/main.ts",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev --name init",
    "prisma:studio": "prisma studio"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/config": "^3.1.1",
    "@nestjs/swagger": "^7.1.13",
    "prisma": "^5.10.2",
    "@prisma/client": "^5.10.2",
    "winston": "^3.11.0",
    "dotenv": "^16.3.1",
    "joi": "^17.11.0",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/testing": "^11.0.0",
    "@types/jest": "^29.5.12",
    "@types/node": "^20.11.19",
    "@types/supertest": "^2.0.16",
    "@typescript-eslint/eslint-plugin": "^6.21.0",
    "@typescript-eslint/parser": "^6.21.0",
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "jest": "^29.7.0",
    "prettier": "^3.2.5",
    "rimraf": "^5.0.5",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.2",
    "ts-node": "^10.9.2",
    "typescript": "^5.7.0"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "exclude": ["node_modules", "dist", "test", "**/*.spec.ts"]
}

// === ARCHIVO: src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          ),
        }),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          ),
        }),
        new winston.transports.File({
          filename: 'logs/combined.log',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          ),
        }),
      ],
    }),
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Loan Microservice API')
    .setDescription('API para manejo de solicitudes de préstamos')
    .setVersion('1.0')
    .addTag('loans')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch(err => {
  console.error('Failed to start application:', err);
  process.exit(1);
});

// === ARCHIVO: src/domain/entities/loan-request.entity.ts ===
import { IsString, IsNumber, IsDate, IsEnum, IsUUID } from 'class-validator';

export enum LoanRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  TIMEOUT = 'TIMEOUT'
}

export class LoanRequest {
  @IsUUID()
  id: string;

  @IsString()
  operationNumber: string;

  @IsString()
  channel: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  termMonths: number;

  @IsString()
  customerId: string;

  @IsEnum(LoanRequestStatus)
  status: LoanRequestStatus;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsString()
  antifraudResult?: string;

  @IsString()
  riskBureauResult?: string;

  @IsString()
  creditOriginatorResult?: string;

  constructor(
    id: string,
    operationNumber: string,
    channel: string,
    amount: number,
    termMonths: number,
    customerId: string,
    status: LoanRequestStatus = LoanRequestStatus.PENDING,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    antifraudResult?: string,
    riskBureauResult?: string,
    creditOriginatorResult?: string
  ) {
    this.id = id;
    this.operationNumber = operationNumber;
    this.channel = channel;
    this.amount = amount;
    this.termMonths = termMonths;
    this.customerId = customerId;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.antifraudResult = antifraudResult;
    this.riskBureauResult = riskBureauResult;
    this.creditOriginatorResult = creditOriginatorResult;
  }

  updateStatus(newStatus: LoanRequestStatus): void {
    this.status = newStatus;
    this.updatedAt = new Date();
  }

  updateAntifraudResult(result: string): void {
    this.antifraudResult = result;
    this.updatedAt = new Date();
  }

  updateRiskBureauResult(result: string): void {
    this.riskBureauResult = result;
    this.updatedAt = new Date();
  }

  updateCreditOriginatorResult(result: string): void {
    this.creditOriginatorResult = result;
    this.updatedAt = new Date();
  }
}

// === ARCHIVO: src/domain/ports/loan-request.repository.ts ===
import { LoanRequest, LoanRequestStatus } from '../entities/loan-request.entity';

export interface LoanRequestRepository {
  create(loanRequest: LoanRequest): Promise<LoanRequest>;
  findById(id: string): Promise<LoanRequest | null>;
  findByOperationNumberAndChannel(operationNumber: string, channel: string): Promise<LoanRequest | null>;
  updateStatus(id: string, status: LoanRequestStatus): Promise<LoanRequest>;
  updateAntifraudResult(id: string, result: string): Promise<LoanRequest>;
  updateRiskBureauResult(id: string, result: string): Promise<LoanRequest>;
  updateCreditOriginatorResult(id: string, result: string): Promise<LoanRequest>;
  findAll(): Promise<LoanRequest[]>;
  delete(id: string): Promise<void>;
}

// === ARCHIVO: src/infrastructure/repositories/prisma-loan-request.repository.ts ===
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { LoanRequest, LoanRequestStatus } from '../../domain/entities/loan-request.entity';
import { LoanRequestRepository } from '../../domain/ports/loan-request.repository';

@Injectable()
export class PrismaLoanRequestRepository implements LoanRequestRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(loanRequest: LoanRequest): Promise<LoanRequest> {
    const created = await this.prisma.loanRequest.create({
      data: {
        id: loanRequest.id,
        operationNumber: loanRequest.operationNumber,
        channel: loanRequest.channel,
        amount: loanRequest.amount,
        termMonths: loanRequest.termMonths,
        customerId: loanRequest.customerId,
        status: loanRequest.status,
        createdAt: loanRequest.createdAt,
        updatedAt: loanRequest.updatedAt,
        antifraudResult: loanRequest.antifraudResult,
        riskBureauResult: loanRequest.riskBureauResult,
        creditOriginatorResult: loanRequest.creditOriginatorResult,
      },
    });
    return this.mapToDomain(created);
  }

  async findById(id: string): Promise<LoanRequest | null> {
    const loanRequest = await this.prisma.loanRequest.findUnique({
      where: { id },
    });
    return loanRequest ? this.mapToDomain(loanRequest) : null;
  }

  async findByOperationNumberAndChannel(operationNumber: string, channel: string): Promise<LoanRequest | null> {
    const loanRequest = await this.prisma.loanRequest.findUnique({
      where: { operationNumber_channel: { operationNumber, channel } },
    });
    return loanRequest ? this.mapToDomain(loanRequest) : null;
  }

  async updateStatus(id: string, status: LoanRequestStatus): Promise<LoanRequest> {
    const updated = await this.prisma.loanRequest.update({
      where: { id },
      data: { status, updatedAt: new Date() },
    });
    return this.mapToDomain(updated);
  }

  async updateAntifraudResult(id: string, result: string): Promise<LoanRequest> {
    const updated = await this.prisma.loanRequest.update({
      where: { id },
      data: { antifraudResult: result, updatedAt: new Date() },
    });
    return this.mapToDomain(updated);
  }

  async updateRiskBureauResult(id: string, result: string): Promise<LoanRequest> {
    const updated = await this.prisma.loanRequest.update({
      where: { id },
      data: { riskBureauResult: result, updatedAt: new Date() },
    });
    return this.mapToDomain(updated);
  }

  async updateCreditOriginatorResult(id: string, result: string): Promise<LoanRequest> {
    const updated = await this.prisma.loanRequest.update({
      where: { id },
      data: { creditOriginatorResult: result, updatedAt: new Date() },
    });
    return this.mapToDomain(updated);
  }

  async findAll(): Promise<LoanRequest[]> {
    const loanRequests = await this.prisma.loanRequest.findMany();
    return loanRequests.map(this.mapToDomain);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.loanRequest.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaLoanRequest: any): LoanRequest {
    return new LoanRequest(
      prismaLoanRequest.id,
      prismaLoanRequest.operationNumber,
      prismaLoanRequest.channel,
      prismaLoanRequest.amount,
      prismaLoanRequest.termMonths,
      prismaLoanRequest.customerId,
      prismaLoanRequest.status as LoanRequestStatus,
      prismaLoanRequest.createdAt,
      prismaLoanRequest.updatedAt,
      prismaLoanRequest.antifraudResult,
      prismaLoanRequest.riskBureauResult,
      prismaLoanRequest.creditOriginatorResult
    );
  }
}

// === ARCHIVO: src/app.module.ts ===
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoanRequestService } from './application/loan-request.service';
import { LoanRequestRepository } from './domain/ports/loan-request.repository';
import { PrismaLoanRequestRepository } from './infrastructure/repositories/prisma-loan-request.repository';
import { PrismaService } from './infrastructure/database/prisma.service';
import { AppConfig } from './infrastructure/config/app.config';
import { WinstonLogger } from './infrastructure/logging/winston.logger';
import { HttpExceptionFilter } from './infrastructure/filters/http-exception.filter';
import { LoggingInterceptor } from './infrastructure/interceptors/logging.interceptor';
import { TransformInterceptor } from './infrastructure/interceptors/transform.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig],
      validationSchema: null,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: LoanRequestService,
      inject: [LoanRequestRepository, WinstonLogger],
      useFactory: (repository: LoanRequestRepository, logger: WinstonLogger) => {
        return new LoanRequestService(repository, logger);
      },
    },
    {
      provide: LoanRequestRepository,
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => {
        return new PrismaLoanRequestRepository(prisma);
      },
    },
    PrismaService,
    WinstonLogger,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
  exports: [LoanRequestService, LoanRequestRepository],
})
export class AppModule {}

// === ARCHIVO: src/application/loan-request.service.ts ===
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { LoanRequest, LoanRequestStatus } from '../domain/entities/loan-request.entity';
import { LoanRequestRepository } from '../domain/ports/loan-request.repository';
import { WinstonLogger } from '../infrastructure/logging/winston.logger';

export interface CreateLoanRequestInput {
  operationNumber: string;
  channel: string;
  applicantName: string;
  applicantDocument: string;
  requestedAmount: number;
  currency: string;
  termMonths: number;
  interestRate: number;
  destinationAccount: string;
}

export interface LoanRequestResponse {
  id: string;
  operationNumber: string;
  channel: string;
  status: LoanRequestStatus;
  applicantName: string;
  requestedAmount: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateLoanRequestStatusInput {
  id: string;
  newStatus: LoanRequestStatus;
}

export interface UpdateAntifraudResultInput {
  id: string;
  result: string;
}

export interface UpdateRiskBureauResultInput {
  id: string;
  result: string;
}

export interface UpdateCreditOriginatorResultInput {
  id: string;
  result: string;
}

@Injectable()
export class LoanRequestService {
  private readonly logger = new Logger(LoanRequestService.name);

  constructor(
    private readonly loanRequestRepository: LoanRequestRepository,
    private readonly winstonLogger: WinstonLogger,
  ) {}

  async createLoanRequest(input: CreateLoanRequestInput): Promise<LoanRequestResponse> {
    this.winstonLogger.info('Iniciando creación de solicitud de préstamo', {
      operationNumber: input.operationNumber,
      channel: input.channel,
      requestedAmount: input.requestedAmount,
    });

    const existingRequest = await this.loanRequestRepository.findByOperationNumberAndChannel(
      input.operationNumber,
      input.channel,
    );

    if (existingRequest) {
      this.winstonLogger.warn('Solicitud duplicada detectada - idempotencia', {
        operationNumber: input.operationNumber,
        channel: input.channel,
        existingRequestId: existingRequest.id,
      });

      return this.mapToResponse(existingRequest);
    }

    const loanRequest = new LoanRequest(
      input.operationNumber,
      input.channel,
      input.applicantName,
      input.applicantDocument,
      input.requestedAmount,
      input.currency,
      input.termMonths,
      input.interestRate,
      input.destinationAccount,
    );

    const created = await this.loanRequestRepository.create(loanRequest);

    this.winstonLogger.info('Solicitud de préstamo creada exitosamente', {
      requestId: created.id,
      operationNumber: input.operationNumber,
      status: created.status,
    });

    return this.mapToResponse(created);
  }

  async findById(id: string): Promise<LoanRequestResponse | null> {
    this.winstonLogger.debug('Buscando solicitud de préstamo por ID', { requestId: id });

    const request = await this.loanRequestRepository.findById(id);

    if (!request) {
      this.winstonLogger.warn('Solicitud de préstamo no encontrada', { requestId: id });
      return null;
    }

    return this.mapToResponse(request);
  }

  async findAllLoanRequests(): Promise<LoanRequestResponse[]> {
    this.winstonLogger.debug('Listando todas las solicitudes de préstamo');

    const requests = await this.loanRequestRepository.findAll();

    this.winstonLogger.info(`Se encontraron ${requests.length} solicitudes de préstamo`);

    return requests.map((req) => this.mapToResponse(req));
  }

  async updateStatus(input: UpdateLoanRequestStatusInput): Promise<LoanRequestResponse> {
    this.winstonLogger.info('Actualizando estado de solicitud de préstamo', {
      requestId: input.id,
      newStatus: input.newStatus,
    });

    const updated = await this.loanRequestRepository.updateStatus(input.id, input.newStatus);

    this.winstonLogger.info('Estado de solicitud actualizado', {
      requestId: input.id,
      status: input.newStatus,
    });

    return this.mapToResponse(updated);
  }

  async updateAntifraudResult(input: UpdateAntifraudResultInput): Promise<LoanRequestResponse> {
    this.winstonLogger.info('Actualizando resultado de antifraude', {
      requestId: input.id,
      result: input.result,
    });

    const updated = await this.loanRequestRepository.updateAntifraudResult(input.id, input.result);

    this.winstonLogger.info('Resultado de antifraude actualizado', {
      requestId: input.id,
      result: input.result,
    });

    return this.mapToResponse(updated);
  }

  async updateRiskBureauResult(input: UpdateRiskBureauResultInput): Promise<LoanRequestResponse> {
    this.winstonLogger.info('Actualizando resultado del buró de riesgos', {
      requestId: input.id,
      result: input.result,
    });

    const updated = await this.loanRequestRepository.updateRiskBureauResult(input.id, input.result);

    this.winstonLogger.info('Resultado del buró de riesgos actualizado', {
      requestId: input.id,
      result: input.result,
    });

    return this.mapToResponse(updated);
  }

  async updateCreditOriginatorResult(input: UpdateCreditOriginatorResultInput): Promise<LoanRequestResponse> {
    this.winstonLogger.info('Actualizando resultado del originador de crédito', {
      requestId: input.id,
      result: input.result,
    });

    const updated = await this.loanRequestRepository.updateCreditOriginatorResult(input.id, input.result);

    this.winstonLogger.info('Resultado del originador de crédito actualizado', {
      requestId: input.id,
      result: input.result,
    });

    return this.mapToResponse(updated);
  }

  async deleteLoanRequest(id: string): Promise<void> {
    this.winstonLogger.info('Eliminando solicitud de préstamo', { requestId: id });

    const existing = await this.loanRequestRepository.findById(id);
    if (!existing) {
      throw new HttpException(
        `Solicitud de préstamo con ID ${id} no encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.loanRequestRepository.delete(id);

    this.winstonLogger.info('Solicitud de préstamo eliminada', { requestId: id });
  }

  private mapToResponse(loanRequest: LoanRequest): LoanRequestResponse {
    return {
      id: loanRequest.id,
      operationNumber: loanRequest.operationNumber,
      channel: loanRequest.channel,
      status: loanRequest.status,
      applicantName: loanRequest.applicantName,
      requestedAmount: loanRequest.requestedAmount,
      currency: loanRequest.currency,
      createdAt: loanRequest.createdAt,
      updatedAt: loanRequest.updatedAt,
    };
  }
}

// === ARCHIVO: src/application/loan-request.service.spec.ts ===
import { Test, TestingModule } from '@nestjs/testing';
import { LoanRequestService, CreateLoanRequestInput } from './loan-request.service';
import { LoanRequestRepository } from '../domain/ports/loan-request.repository';
import { LoanRequest, LoanRequestStatus } from '../domain/entities/loan-request.entity';
import { WinstonLogger } from '../infrastructure/logging/winston.logger';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('LoanRequestService', () => {
  let service: LoanRequestService;
  let repository: jest.Mocked<LoanRequestRepository>;
  let logger: jest.Mocked<WinstonLogger>;

  const mockLoanRequest: LoanRequest = {
    id: 'test-uuid-123',
    operationNumber: 'OP-2024-001',
    channel: 'DIGITAL',
    status: LoanRequestStatus.PENDING,
    applicantName: 'Juan Pérez',
    applicantDocument: '12345678',
    requestedAmount: 50000,
    currency: 'USD',
    termMonths: 12,
    interestRate: 0.15,
    destinationAccount: 'ACC-123456',
    antifraudResult: null,
    riskBureauResult: null,
    creditOriginatorResult: null,
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
    updateStatus: jest.fn(),
    updateAntifraudResult: jest.fn(),
    updateRiskBureauResult: jest.fn(),
    updateCreditOriginatorResult: jest.fn(),
  };

  const mockCreateInput: CreateLoanRequestInput = {
    operationNumber: 'OP-2024-001',
    channel: 'DIGITAL',
    applicantName: 'Juan Pérez',
    applicantDocument: '12345678',
    requestedAmount: 50000,
    currency: 'USD',
    termMonths: 12,
    interestRate: 0.15,
    destinationAccount: 'ACC-123456',
  };

  beforeEach(async () => {
    const mockRepository: Partial<jest.Mocked<LoanRequestRepository>> = {
      create: jest.fn(),
      findById: jest.fn(),
      findByOperationNumberAndChannel: jest.fn(),
      updateStatus: jest.fn(),
      updateAntifraudResult: jest.fn(),
      updateRiskBureauResult: jest.fn(),
      updateCreditOriginatorResult: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    };

    const mockLogger: Partial<jest.Mocked<WinstonLogger>> = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanRequestService,
        {
          provide: LoanRequestRepository,
          useValue: mockRepository,
        },
        {
          provide: WinstonLogger,
          useValue: mockLogger,
        },
      ],
    }).compile();

    service = module.get<LoanRequestService>(LoanRequestService);
    repository = module.get(LoanRequestRepository);
    logger = module.get(WinstonLogger);
  });

  describe('createLoanRequest', () => {
    it('debería crear una nueva solicitud de préstamo exitosamente', async () => {
      repository.findByOperationNumberAndChannel.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockLoanRequest);

      const result = await service.createLoanRequest(mockCreateInput);

      expect(repository.findByOperationNumberAndChannel).toHaveBeenCalledWith(
        mockCreateInput.operationNumber,
        mockCreateInput.channel,
      );
      expect(repository.create).toHaveBeenCalled();
      expect(result.operationNumber).toBe(mockCreateInput.operationNumber);
      expect(result.channel).toBe(mockCreateInput.channel);
      expect(result.status).toBe(LoanRequestStatus.PENDING);
    });

    it('debería retornar solicitud existente por idempotencia', async () => {
      repository.findByOperationNumberAndChannel.mockResolvedValue(mockLoanRequest);

      const result = await service.createLoanRequest(mockCreateInput);

      expect(repository.create).not.toHaveBeenCalled();
      expect(result.id).toBe(mockLoanRequest.id);
    });
  });

  describe('findById', () => {
    it('debería encontrar una solicitud por ID', async () => {
      repository.findById.mockResolvedValue(mockLoanRequest);

      const result = await service.findById('test-uuid-123');

      expect(result).not.toBeNull();
      expect(result?.id).toBe('test-uuid-123');
    });

    it('debería retornar null cuando la solicitud no existe', async () => {
      repository.findById.mockResolvedValue(null);

      const result = await service.findById('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('findAllLoanRequests', () => {
    it('debería listar todas las solicitudes', async () => {
      const mockRequests = [mockLoanRequest, { ...mockLoanRequest, id: 'test-uuid-456' }];
      repository.findAll.mockResolvedValue(mockRequests);

      const result = await service.findAllLoanRequests();

      expect(result.length).toBe(2);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('updateStatus', () => {
    it('debería actualizar el estado de una solicitud', async () => {
      const updatedRequest = { ...mockLoanRequest, status: LoanRequestStatus.APPROVED };
      repository.updateStatus.mockResolvedValue(updatedRequest);

      const result = await service.updateStatus({
        id: 'test-uuid-123',
        newStatus: LoanRequestStatus.APPROVED,
      });

      expect(repository.updateStatus).toHaveBeenCalledWith(
        'test-uuid-123',
        LoanRequestStatus.APPROVED,
      );
      expect(result.status).toBe(LoanRequestStatus.APPROVED);
    });
  });

  describe('updateAntifraudResult', () => {
    it('debería actualizar el resultado de antifraude', async () => {
      const updatedRequest = { ...mockLoanRequest, antifraudResult: 'APPROVED' };
      repository.updateAntifraudResult.mockResolvedValue(updatedRequest);

      const result = await service.updateAntifraudResult({
        id: 'test-uuid-123',
        result: 'APPROVED',
      });

      expect(repository.updateAntifraudResult).toHaveBeenCalledWith('test-uuid-123', 'APPROVED');
      expect(result.id).toBe('test-uuid-123');
    });
  });

  describe('updateRiskBureauResult', () => {
    it('debería actualizar el resultado del buró de riesgos', async () => {
      const updatedRequest = { ...mockLoanRequest, riskBureauResult: 'LOW_RISK' };
      repository.updateRiskBureauResult.mockResolvedValue(updatedRequest);

      const result = await service.updateRiskBureauResult({
        id: 'test-uuid-123',
        result: 'LOW_RISK',
      });

      expect(repository.updateRiskBureauResult).toHaveBeenCalledWith('test-uuid-123', 'LOW_RISK');
      expect(result.id).toBe('test-uuid-123');
    });
  });

  describe('updateCreditOriginatorResult', () => {
    it('debería actualizar el resultado del originador de crédito', async () => {
      const updatedRequest = { ...mockLoanRequest, creditOriginatorResult: 'APPROVED' };
      repository.updateCreditOriginatorResult.mockResolvedValue(updatedRequest);

      const result = await service.updateCreditOriginatorResult({
        id: 'test-uuid-123',
        result: 'APPROVED',
      });

      expect(repository.updateCreditOriginatorResult).toHaveBeenCalledWith('test-uuid-123', 'APPROVED');
      expect(result.id).toBe('test-uuid-123');
    });
  });

  describe('deleteLoanRequest', () => {
    it('debería eliminar una solicitud existente', async () => {
      repository.findById.mockResolvedValue(mockLoanRequest);
      repository.delete.mockResolvedValue();

      await service.deleteLoanRequest('test-uuid-123');

      expect(repository.delete).toHaveBeenCalledWith('test-uuid-123');
    });

    it('debería lanzar excepción cuando la solicitud no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.deleteLoanRequest('non-existent-id')).rejects.toThrow(HttpException);
    });
  });

  describe('mapToResponse', () => {
    it('debería mapear correctamente la entidad a response', async () => {
      repository.findById.mockResolvedValue(mockLoanRequest);

      const result = await service.findById('test-uuid-123');

      expect(result).toEqual({
        id: 'test-uuid-123',
        operationNumber: 'OP-2024-001',
        channel: 'DIGITAL',
        status: LoanRequestStatus.PENDING,
        applicantName: 'Juan Pérez',
        requestedAmount: 50000,
        currency: 'USD',
        createdAt: mockLoanRequest.createdAt,
        updatedAt: mockLoanRequest.updatedAt,
      });
    });
  });
});

// === ARCHIVO: src/infrastructure/controllers/loan-request.controller.ts ===
import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, UseGuards, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { LoanRequestService } from '../../application/loan-request.service';
import { LoanRequest, LoanRequestStatus } from '../../domain/entities/loan-request.entity';
import { CreateLoanRequestDto } from './dtos/create-loan-request.dto';
import { UpdateLoanRequestStatusDto } from './dtos/update-loan-request-status.dto';
import { WinstonLogger } from '../logging/winston.logger';

@ApiTags('loans')
@Controller('api/loan-requests')
export class LoanRequestController {
  private readonly logger = new Logger(LoanRequestController.name);

  constructor(
    private readonly loanRequestService: LoanRequestService,
    private readonly winstonLogger: WinstonLogger,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva solicitud de préstamo' })
  @ApiBody({ type: CreateLoanRequestDto })
  @ApiResponse({ status: 201, description: 'Solicitud de préstamo creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 409, description: 'Conflicto: solicitud duplicada por número de operación y canal' })
  async create(@Body() createLoanRequestDto: CreateLoanRequestDto): Promise<LoanRequest> {
    this.logger.log(`Creating loan request for operation: ${createLoanRequestDto.operationNumber}`);
    this.winstonLogger.log('info', 'Loan request creation initiated', {
      operationNumber: createLoanRequestDto.operationNumber,
      channel: createLoanRequestDto.channel,
      requestedAmount: createLoanRequestDto.requestedAmount,
    });

    try {
      const loanRequest = await this.loanRequestService.createLoanRequest(createLoanRequestDto);
      this.winstonLogger.log('info', 'Loan request created successfully', {
        loanRequestId: loanRequest.id,
        operationNumber: loanRequest.operationNumber,
        status: loanRequest.status,
      });
      return loanRequest;
    } catch (error) {
      this.winstonLogger.log('error', 'Failed to create loan request', {
        operationNumber: createLoanRequestDto.operationNumber,
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una solicitud de préstamo por ID' })
  @ApiParam({ name: 'id', description: 'ID único de la solicitud de préstamo' })
  @ApiResponse({ status: 200, description: 'Solicitud de préstamo encontrada' })
  @ApiResponse({ status: 404, description: 'Solicitud de préstamo no encontrada' })
  async findById(@Param('id') id: string): Promise<LoanRequest | null> {
    this.logger.log(`Fetching loan request with id: ${id}`);
    this.winstonLogger.log('info', 'Loan request fetch initiated', { loanRequestId: id });

    const loanRequest = await this.loanRequestService.findById(id);
    if (loanRequest) {
      this.winstonLogger.log('info', 'Loan request found', { loanRequestId: id });
    } else {
      this.winstonLogger.log('warning', 'Loan request not found', { loanRequestId: id });
    }
    return loanRequest;
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las solicitudes de préstamos' })
  @ApiResponse({ status: 200, description: 'Lista de solicitudes de préstamos' })
  async findAll(): Promise<LoanRequest[]> {
    this.logger.log('Fetching all loan requests');
    this.winstonLogger.log('info', 'Fetching all loan requests', {});

    const loanRequests = await this.loanRequestService.findAll();
    this.winstonLogger.log('info', 'All loan requests fetched', { count: loanRequests.length });
    return loanRequests;
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Actualizar el estado de una solicitud de préstamo' })
  @ApiParam({ name: 'id', description: 'ID único de la solicitud de préstamo' })
  @ApiBody({ type: UpdateLoanRequestStatusDto })
  @ApiResponse({ status: 200, description: 'Estado actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Solicitud de préstamo no encontrada' })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateLoanRequestStatusDto,
  ): Promise<LoanRequest> {
    this.logger.log(`Updating status for loan request: ${id} to ${updateStatusDto.status}`);
    this.winstonLogger.log('info', 'Loan request status update initiated', {
      loanRequestId: id,
      newStatus: updateStatusDto.status,
    });

    try {
      const loanRequest = await this.loanRequestService.updateStatus(id, updateStatusDto.status);
      this.winstonLogger.log('info', 'Loan request status updated successfully', {
        loanRequestId: id,
        newStatus: loanRequest.status,
      });
      return loanRequest;
    } catch (error) {
      this.winstonLogger.log('error', 'Failed to update loan request status', {
        loanRequestId: id,
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  @Put(':id/antifraud-result')
  @ApiOperation({ summary: 'Actualizar resultado del motor antifraude' })
  @ApiParam({ name: 'id', description: 'ID único de la solicitud de préstamo' })
  @ApiBody({ schema: { properties: { result: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Resultado antifraude actualizado' })
  @ApiResponse({ status: 404, description: 'Solicitud de préstamo no encontrada' })
  async updateAntifraudResult(
    @Param('id') id: string,
    @Body('result') result: string,
  ): Promise<LoanRequest> {
    this.logger.log(`Updating antifraud result for loan request: ${id}`);
    this.winstonLogger.log('info', 'Antifraud result update initiated', {
      loanRequestId: id,
      result,
    });

    const loanRequest = await this.loanRequestService.updateAntifraudResult(id, result);
    this.winstonLogger.log('info', 'Antifraud result updated successfully', { loanRequestId: id });
    return loanRequest;
  }

  @Put(':id/risk-bureau-result')
  @ApiOperation({ summary: 'Actualizar resultado del buró de riesgos' })
  @ApiParam({ name: 'id', description: 'ID único de la solicitud de préstamo' })
  @ApiBody({ schema: { properties: { result: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Resultado del buró de riesgos actualizado' })
  @ApiResponse({ status: 404, description: 'Solicitud de préstamo no encontrada' })
  async updateRiskBureauResult(
    @Param('id') id: string,
    @Body('result') result: string,
  ): Promise<LoanRequest> {
    this.logger.log(`Updating risk bureau result for loan request: ${id}`);
    this.winstonLogger.log('info', 'Risk bureau result update initiated', {
      loanRequestId: id,
      result,
    });

    const loanRequest = await this.loanRequestService.updateRiskBureauResult(id, result);
    this.winstonLogger.log('info', 'Risk bureau result updated successfully', { loanRequestId: id });
    return loanRequest;
  }

  @Put(':id/credit-originator-result')
  @ApiOperation({ summary: 'Actualizar resultado del originador de créditos' })
  @ApiParam({ name: 'id', description: 'ID único de la solicitud de préstamo' })
  @ApiBody({ schema: { properties: { result: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Resultado del originador actualizado' })
  @ApiResponse({ status: 404, description: 'Solicitud de préstamo no encontrada' })
  async updateCreditOriginatorResult(
    @Param('id') id: string,
    @Body('result') result: string,
  ): Promise<LoanRequest> {
    this.logger.log(`Updating credit originator result for loan request: ${id}`);
    this.winstonLogger.log('info', 'Credit originator result update initiated', {
      loanRequestId: id,
      result,
    });

    const loanRequest = await this.loanRequestService.updateCreditOriginatorResult(id, result);
    this.winstonLogger.log('info', 'Credit originator result updated successfully', { loanRequestId: id });
    return loanRequest;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una solicitud de préstamo' })
  @ApiParam({ name: 'id', description: 'ID único de la solicitud de préstamo' })
  @ApiResponse({ status: 204, description: 'Solicitud de préstamos eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Solicitud de préstamo no encontrada' })
  async delete(@Param('id') id: string): Promise<void> {
    this.logger.log(`Deleting loan request: ${id}`);
    this.winstonLogger.log('info', 'Loan request deletion initiated', { loanRequestId: id });

    await this.loanRequestService.delete(id);
    this.winstonLogger.log('info', 'Loan request deleted successfully', { loanRequestId: id });
  }
}

// === ARCHIVO: src/infrastructure/config/app.config.ts ===
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, Global } from '@nestjs/common';
import * as Joi from 'joi';
import { PrismaService } from '../database/prisma.service';

interface AppConfig {
  database: {
    url: string;
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  };
  app: {
    host: string;
    port: number;
    env: string;
    apiTitle: string;
    apiVersion: string;
  };
  logging: {
    level: string;
    format: string;
  };
  services: {
    antifraud: {
      timeout: number;
      retryAttempts: number;
    };
    riskBureau: {
      timeout: number;
      retryAttempts: number;
    };
    creditOriginator: {
      timeout: number;
      retryAttempts: number;
    };
  };
}

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().default('postgres'),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().default('loan_db'),
        APP_HOST: Joi.string().default('0.0.0.0'),
        APP_PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        API_TITLE: Joi.string().default('Loan Microservice API'),
        API_VERSION: Joi.string().default('1.0'),
        LOG_LEVEL: Joi.string().valid('error', 'warn', 'info', 'debug').default('info'),
        LOG_FORMAT: Joi.string().valid('json', 'text').default('json'),
        ANTIFRAUD_TIMEOUT: Joi.number().default(2000),
        ANTIFRAUD_RETRY_ATTEMPTS: Joi.number().default(3),
        RISK_BUREAU_TIMEOUT: Joi.number().default(2000),
        RISK_BUREAU_RETRY_ATTEMPTS: Joi.number().default(3),
        CREDIT_ORIGINATOR_TIMEOUT: Joi.number().default(2000),
        CREDIT_ORIGINATOR_RETRY_ATTEMPTS: Joi.number().default(3),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
  ],
  providers: [
    {
      provide: 'APP_CONFIG',
      useFactory: (configService: ConfigService): AppConfig => {
        return {
          database: {
            url: configService.get<string>('DATABASE_URL')!,
            host: configService.get<string>('DB_HOST')!,
            port: configService.get<number>('DB_PORT')!,
            username: configService.get<string>('DB_USERNAME')!,
            password: configService.get<string>('DB_PASSWORD')!,
            name: configService.get<string>('DB_NAME')!,
          },
          app: {
            host: configService.get<string>('APP_HOST')!,
            port: configService.get<number>('APP_PORT')!,
            env: configService.get<string>('NODE_ENV')!,
            apiTitle: configService.get<string>('API_TITLE')!,
            apiVersion: configService.get<string>('API_VERSION')!,
          },
          logging: {
            level: configService.get<string>('LOG_LEVEL')!,
            format: configService.get<string>('LOG_FORMAT')!,
          },
          services: {
            antifraud: {
              timeout: configService.get<number>('ANTIFRAUD_TIMEOUT')!,
              retryAttempts: configService.get<number>('ANTIFRAUD_RETRY_ATTEMPTS')!,
            },
            riskBureau: {
              timeout: configService.get<number>('RISK_BUREAU_TIMEOUT')!,
              retryAttempts: configService.get<number>('RISK_BUREAU_RETRY_ATTEMPTS')!,
            },
            creditOriginator: {
              timeout: configService.get<number>('CREDIT_ORIGINATOR_TIMEOUT')!,
              retryAttempts: configService.get<number>('CREDIT_ORIGINATOR_RETRY_ATTEMPTS')!,
            },
          },
        };
      },
      inject: [ConfigService],
    },
    PrismaService,
  ],
  exports: ['APP_CONFIG', PrismaService],
})
export class AppConfigModule {}

export { AppConfig };

// === ARCHIVO: src/infrastructure/logging/winston.logger.ts ===
import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { ConfigService } from '@nestjs/config';

export interface LogMetadata {
  [key: string]: any;
}

@Injectable()
export class WinstonLogger implements LoggerService {
  private readonly logger: winston.Logger;
  private readonly isProduction: boolean;

  constructor(private readonly configService: ConfigService) {
    const logLevel = this.configService.get<string>('LOG_LEVEL') || 'info';
    const logFormat = this.configService.get<string>('LOG_FORMAT') || 'json';
    this.isProduction = this.configService.get<string>('NODE_ENV') === 'production';

    const transports: winston.transport[] = [
      new winston.transports.Console({
        level: logLevel,
        format: this.isProduction
          ? winston.format.combine(
              winston.format.timestamp(),
              winston.format.errors({ stack: true }),
              winston.format.json(),
            )
          : winston.format.combine(
              winston.format.colorize(),
              winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
              winston.format.printf(({ timestamp, level, message, context, ...metadata }) => {
                let msg = `${timestamp} [${context || 'App'}] ${level}: ${message}`;
                if (Object.keys(metadata).length > 0) {
                  msg += ` ${JSON.stringify(metadata)}`;
                }
                return msg;
              }),
            ),
      }),
    ];

    if (this.isProduction) {
      transports.push(
        new DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          maxSize: '20m',
          maxFiles: '14d',
          zippedArchive: true,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.json(),
          ),
        }),
        new DailyRotateFile({
          filename: 'logs/combined-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
          zippedArchive: true,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.json(),
          ),
        }),
      );
    }

    this.logger = winston.createLogger({
      level: logLevel,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
      ),
      defaultMeta: { service: 'loan-microservice' },
      transports,
      exitOnError: false,
    });
  }

  log(level: string, message: string, metadata?: LogMetadata): void {
    const logEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...metadata,
    };

    switch (level) {
      case 'error':
        this.logger.error(message, logEntry);
        break;
      case 'warn':
        this.logger.warn(message, logEntry);
        break;
      case 'info':
        this.logger.info(message, logEntry);
        break;
      case 'debug':
        this.logger.debug(message, logEntry);
        break;
      default:
        this.logger.info(message, logEntry);
    }
  }

  error(message: string, trace?: string, context?: string, metadata?: LogMetadata): void {
    this.logger.error(message, {
      trace,
      context,
      ...metadata,
    });
  }

  warn(message: string, context?: string, metadata?: LogMetadata): void {
    this.logger.warn(message, {
      context,
      ...metadata,
    });
  }

  http(message: string, metadata?: LogMetadata): void {
    this.logger.http(message, metadata);
  }

  verbose(message: string, context?: string, metadata?: LogMetadata): void {
    this.logger.verbose(message, {
      context,
      ...metadata,
    });
  }

  debug(message: string, context?: string, metadata?: LogMetadata): void {
    this.logger.debug(message, {
      context,
      ...metadata,
    });
  }

  silly(message: string, context?: string, metadata?: LogMetadata): void {
    this.logger.silly(message, {
      context,
      ...metadata,
    });
  }

  setLogLevels(levels: Record<string, string>): void {
    Object.keys(levels).forEach((key) => {
      this.logger.add(new winston.transports.Console({ level: levels[key] }));
    });
  }

  getLogger(): winston.Logger {
    return this.logger;
  }
}

// === ARCHIVO: prisma/schema.prisma ===
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model LoanRequest {
  id                       String           @id @default(uuid())
  operationNumber          String           @unique
  channel                  String
  requestedAmount          Decimal          @db.Decimal(15, 2)
  termMonths               Int
  status                   LoanRequestStatus @default(PENDING_ANTIFRAUD)
  applicantName            String
  applicantEmail           String
  applicantDocumentNumber  String
  applicantPhone           String?
  antifraudResult          String?
  antifraudCheckedAt       DateTime?
  riskBureauResult         String?
  riskBureauCheckedAt      DateTime?
  creditOriginatorResult   String?
  creditOriginatorCheckedAt DateTime?
  createdAt                DateTime         @default(now())
  updatedAt                DateTime         @updatedAt

  @@index([operationNumber, channel])
  @@index([status])
  @@index([createdAt])
}

enum LoanRequestStatus {
  PENDING_ANTIFRAUD
  ANTIFRAUD_APPROVED
  ANTIFRAUD_REJECTED
  PENDING_RISK_BUREAU
  RISK_BUREAU_APPROVED
  RISK_BUREAU_REJECTED
  PENDING_CREDIT_ORIGINATOR
  CREDIT_ORIGINATOR_APPROVED
  CREDIT_ORIGINATOR_REJECTED
  APPROVED
  REJECTED
}

// === ARCHIVO: src/infrastructure/database/prisma.service.ts ===
import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private isConnected = false;

  constructor(private readonly configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get<string>('DATABASE_URL'),
        },
      },
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'info' },
      ],
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.$connect();
      this.isConnected = true;
      this.logger.log('Prisma Client connected to database successfully');
      
      this.$on('error', (event: any) => {
        this.logger.error(`Prisma Client error event: ${event.message}`, event.stack);
      });
      
      this.$on('warn', (event: any) => {
        this.logger.warn(`Prisma Client warning: ${event.message}`);
      });
    } catch (error) {
      this.logger.error('Failed to connect Prisma Client to database', error.stack);
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.$disconnect();
      this.isConnected = false;
      this.logger.log('Prisma Client disconnected from database successfully');
    } catch (error) {
      this.logger.error('Error disconnecting Prisma Client', error.stack);
    }
  }

  async enableShutdownHooks(): Promise<void> {
    process.on('beforeExit', async () => {
      await this.$disconnect();
      this.logger.log('Prisma Client shutdown hooks executed');
    });
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  async executeTransaction<T>(
    callback: (tx: PrismaClient) => Promise<T>
  ): Promise<T> {
    return this.$transaction(callback);
  }

  async executeInTransaction<T>(
    operations: Array<() => Promise<T>>
  ): Promise<T[]> {
    return this.$transaction(async (tx) => {
      const results: T[] = [];
      for (const operation of operations) {
        results.push(await operation());
      }
      return results;
    });
  }
}

// === ARCHIVO: src/infrastructure/controllers/loan-request.controller.spec.ts ===
import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import { LoanRequestController } from './loan-request.controller';
import { LoanRequestService } from '../../application/loan-request.service';
import { LoanRequestStatus } from '../../domain/entities/loan-request.entity';

describe('LoanRequestController', () => {
  let controller: LoanRequestController;
  let service: LoanRequestService;

  const mockLoanRequest = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    operationNumber: 'OP-2024-001',
    channel: 'WEB',
    requestedAmount: 10000,
    termMonths: 12,
    status: LoanRequestStatus.PENDING_ANTIFRAUD,
    applicantName: 'John Doe',
    applicantEmail: 'john.doe@example.com',
    applicantDocumentNumber: '12345678',
    applicantPhone: '+1234567890',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockLoanRequestService = {
    create: jest.fn().mockResolvedValue(mockLoanRequest),
    findById: jest.fn().mockResolvedValue(mockLoanRequest),
    findAll: jest.fn().mockResolvedValue([mockLoanRequest]),
    updateStatus: jest.fn().mockResolvedValue({ ...mockLoanRequest, status: LoanRequestStatus.APPROVED }),
    processLoanRequest: jest.fn().mockResolvedValue({ ...mockLoanRequest, status: LoanRequestStatus.APPROVED }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanRequestController],
      providers: [
        {
          provide: LoanRequestService,
          useValue: mockLoanRequestService,
        },
      ],
    }).compile();

    controller = module.get<LoanRequestController>(LoanRequestController);
    service = module.get<LoanRequestService>(LoanRequestService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new loan request successfully', async () => {
      const createDto = {
        operationNumber: 'OP-2024-001',
        channel: 'WEB',
        requestedAmount: 10000,
        termMonths: 12,
        applicantName: 'John Doe',
        applicantEmail: 'john.doe@example.com',
        applicantDocumentNumber: '12345678',
        applicantPhone: '+1234567890',
      };

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockLoanRequest);
    });

    it('should handle errors when creating loan request fails', async () => {
      const createDto = {
        operationNumber: 'OP-2024-001',
        channel: 'WEB',
        requestedAmount: 10000,
        termMonths: 12,
        applicantName: 'John Doe',
        applicantEmail: 'john.doe@example.com',
        applicantDocumentNumber: '12345678',
      };

      mockLoanRequestService.create.mockRejectedValueOnce(new Error('Database error'));

      await expect(controller.create(createDto)).rejects.toThrow('Database error');
    });
  });

  describe('findById', () => {
    it('should return a loan request by id', async () => {
      const result = await controller.findById('123e4567-e89b-12d3-a456-426614174000');

      expect(service.findById).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000');
      expect(result).toEqual(mockLoanRequest);
    });

    it('should return null when loan request not found', async () => {
      mockLoanRequestService.findById.mockResolvedValueOnce(null);

      const result = await controller.findById('non-existent-id');

      expect(service.findById).toHaveBeenCalledWith('non-existent-id');
      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return all loan requests', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockLoanRequest]);
    });

    it('should return empty array when no loan requests exist', async () => {
      mockLoanRequestService.findAll.mockResolvedValueOnce([]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('updateStatus', () => {
    it('should update loan request status', async () => {
      const updateDto = { status: LoanRequestStatus.APPROVED };
      const result = await controller.updateStatus('123e4567-e89b-12d3-a456-426614174000', updateDto);

      expect(service.updateStatus).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000', LoanRequestStatus.APPROVED);
      expect(result.status).toBe(LoanRequestStatus.APPROVED);
    });
  });

  describe('processLoanRequest', () => {
    it('should process a loan request through all stages', async () => {
      const result = await controller.processLoanRequest('123e4567-e89b-12d3-a456-426614174000');

      expect(service.processLoanRequest).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000');
      expect(result.status).toBe(LoanRequestStatus.APPROVED);
    });

    it('should handle processing errors gracefully', async () => {
      mockLoanRequestService.processLoanRequest.mockRejectedValueOnce(
        new Error('Processing timeout')
      );

      await expect(
        controller.processLoanRequest('123e4567-e89b-12d3-a456-426614174000')
      ).rejects.toThrow('Processing timeout');
    });
  });

// === ARCHIVO: .env ===
# Configuración del Microservicio de Préstamos
# Este archivo contiene las variables de entorno necesarias para el funcionamiento
# del microservicio. Copiar a .env y ajustar los valores según el entorno.

# Puerto donde escuchará la aplicación
APP_PORT=3000

# Configuración de la base de datos PostgreSQL
# Formato: postgresql://usuario:password@host:puerto/nombre_base
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/loan_db

# Configuración de logs con Winston
LOG_LEVEL=info
LOG_FORMAT=json

# Configuración de timeouts para servicios externos
ANTIFRAUD_TIMEOUT_MS=5000
RISK_BUREAU_TIMEOUT_MS=2000
CREDIT_ORIGINATOR_TIMEOUT_MS=3000

# Configuración de idempotencia
IDEMPOTENCY_CHECK_ENABLED=true

# Configuración del entorno
NODE_ENV=development
APP_NAME=loan-microservice
APP_VERSION=1.0.0

# Configuración de Swagger
SWAGGER_ENABLED=true
SWAGGER_PATH=api

# Configuración de Prisma
DATABASE_POOL_SIZE=10
DATABASE_CONNECT_TIMEOUT_MS=10000

# Configuración de rendimiento
MAX_REQUEST_BODY_SIZE=10mb

// === ARCHIVO: Dockerfile ===
# Dockerfile del microservicio de préstamos

// === ARCHIVO: docker-compose.yml ===
# Docker Compose para levantar el microservicio y sus dependencias

// === ARCHIVO: .dockerignore ===
# =============================================================================
# Docker Ignore File for NestJS Loan Microservice
# =============================================================================
# This file specifies patterns to exclude from the Docker build context
# to reduce image size, improve build performance, and avoid including
# sensitive or unnecessary files in the final image.
# =============================================================================

# =============================================================================
# Version Control
# =============================================================================
.git
.gitignore
.gitattributes

# =============================================================================
# Node.js Dependencies (installed during Docker build)
# =============================================================================
node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
yarn.lock
package-lock.json
pnpm-lock.yaml

# =============================================================================
# Build Outputs and Compiled Files
# =============================================================================
dist
build
out
coverage
.nyc_output
*.tsbuildinfo
.next
.nuxt
.cache
.parcel-cache

# =============================================================================
# Environment Files (secrets should never be in the image)
# =============================================================================
.env
.env.local
.env.*.local
.env.production
.env.development
.env.test
*.pem
*.key
*.crt
*.p12
*.keystore

# =============================================================================
# IDE and Editor Files
# =============================================================================
.vscode
.idea
*.swp
*.swo
*~
.DS_Store
Thumbs.db

# =============================================================================
# Testing Files
# =============================================================================
coverage
.nyc_output
junit.xml
test-results
*.spec.ts
*.test.ts
*.spec.js
*.test.js
__tests__
tests
test
mocks

# =============================================================================
# Documentation (not needed in production image)
# =============================================================================
*.md
!README.md
LICENSE
CONTRIBUTING.md
CHANGELOG.md
docs
documentation

# =============================================================================
# Logs
# =============================================================================
logs
*.log
npm-debug.log*

# =============================================================================
# Docker and Container Files
# =============================================================================
Dockerfile
docker-compose*.yml
docker-compose*.yaml
.docker
docker
.dockerignore

# =============================================================================
# Terraform and Infrastructure
# =============================================================================
terraform
*.tf
*.tfvars
.terraform

# =============================================================================
# Temporary and Cache Files
# =============================================================================
tmp
temp
.cache
.parcel-cache
.eslintcache
.stylelintcache

# =============================================================================
# Database and Prisma
# =============================================================================
prisma/migrations
prisma/*.db
prisma/*.db-journal
*.sqlite
*.sqlite3

# =============================================================================
# Miscellanous
# =============================================================================
*.bak
*.backup
*.orig
*.rej
.npm
.eslintrc.js
.eslintrc.json
.prettierrc
.prettierrc.json
.tsconfig.tsbuildinfo
jest.config.js
jest.config.ts
tsconfig.json
tslint.json
```
