# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Desarrollo de un microservicio en Node.js**.

| | |
|---|---|
| Tema | Experiencia en Frameworks |
| Nivel | senior-l2 |
| Chapter | Backend |
| Especialidad | Node |
| Stack | TypeScript / NestJS 11 |
| Patron arquitectonico | microservicio reactivo con arquitectura hexagonal |
| Tiempo estimado | 2 semanas |

## Receta del stack

Esqueleto obligatorio:

- `package.json y tsconfig.json en la raiz`
- `src/main.ts como bootstrap`
- `modulo raiz de Nest`
- `src/domain con entidades y puertos`
- `src/application con casos de uso`
- `src/infrastructure con repositorios y controller`

Trampas conocidas:

- No inventes versiones de npm. Usa rango con caret (`^5.7.0`) sobre una version que exista, o deja que el paquete la resuelva. Una version inexistente (ej. `@types/react-router-dom@6.19.0`) hace fallar `npm install` con ETARGET y el proyecto no instala.
- Los paquetes `@types/*` solo hacen falta para librerias que no traen sus propios tipos. React Router, NestJS y Prisma ya los traen: agregar `@types/` de esos rompe o sobra.
- El `tsconfig.json` es obligatorio: sin el, `tsc` no sabe que compilar.

Dependencias:

- @nestjs/common 11.0.0
- @nestjs/core 11.0.0
- @nestjs/platform-express 11.0.0
- @nestjs/config 3.1.1
- @nestjs/swagger 7.1.13
- prisma 5.10.2
- @prisma/client 5.10.2
- winston 3.11.0
- dotenv 16.3.1
- joi 17.11.0
- class-validator 0.14.0
- class-transformer 0.5.1
- @nestjs/testing 11.0.0
- jest 29.7.0
- supertest 6.3.3
- typescript 5.7.0
- ts-node n/a
- eslint n/a
- prettier n/a

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Enrutamiento de solicitudes**: Microservicio con enrutamiento básico de solicitudes operativo.
- **Fase 2 — Control de variables de entorno y logs**: Microservicio con control de variables de entorno y generación de logs.
- **Fase 3 — Conexión con base de datos utilizando ORM**: Microservicio conectado a una base de datos utilizando un ORM.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `Dockerfile` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.
- [ ] `docker-compose.yml` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.

## Lo que falta y tenes que completar

### 1. Referencias colgando (10)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/infrastructure/repositories/prisma-loan-request.repository.ts` — `LoanRequest.create`
      Se invoca `create` sobre `LoanRequest`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/repositories/prisma-loan-request.repository.ts` — `LoanRequest.findUnique`
      Se invoca `findUnique` sobre `LoanRequest`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/repositories/prisma-loan-request.repository.ts` — `LoanRequest.update`
      Se invoca `update` sobre `LoanRequest`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/repositories/prisma-loan-request.repository.ts` — `LoanRequest.findMany`
      Se invoca `findMany` sobre `LoanRequest`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/repositories/prisma-loan-request.repository.ts` — `LoanRequest.delete`
      Se invoca `delete` sobre `LoanRequest`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/application/loan-request.service.ts` — `WinstonLogger.info`
      Se invoca `info` sobre `WinstonLogger`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/controllers/loan-request.controller.ts` — `LoanRequestService.findAll`
      Se invoca `findAll` sobre `LoanRequestService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/controllers/loan-request.controller.ts` — `LoanRequestService.delete`
      Se invoca `delete` sobre `LoanRequestService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/controllers/loan-request.controller.spec.ts` — `LoanRequestController.processLoanRequest`
      Se invoca `processLoanRequest` sobre `LoanRequestController`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `package.json` — `typescript@5.7.0`
      typescript declara la version 5.7.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

### Presentes (19)

- `package.json`
- `tsconfig.json`
- `src/main.ts`
- `src/domain/entities/loan-request.entity.ts`
- `src/domain/ports/loan-request.repository.ts`
- `src/infrastructure/repositories/prisma-loan-request.repository.ts`
- `src/app.module.ts`
- `src/application/loan-request.service.ts`
- `src/application/loan-request.service.spec.ts`
- `src/infrastructure/controllers/loan-request.controller.ts`
- `src/infrastructure/config/app.config.ts`
- `src/infrastructure/logging/winston.logger.ts`
- `prisma/schema.prisma`
- `src/infrastructure/database/prisma.service.ts`
- `src/infrastructure/controllers/loan-request.controller.spec.ts`
- `.env`
- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src`
- `src/domain`
- `src/domain/entities`
- `src/domain/ports`
- `src/application`
- `src/infrastructure`
- `src/infrastructure/controllers`
- `src/infrastructure/repositories`
- `src/infrastructure/config`
- `src/infrastructure/logging`
- `src/infrastructure/database`
- `test`

## Verificacion

```bash
npm install && npm run build
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **microservicio reactivo con arquitectura hexagonal**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Backend, Especialidad Desarrollador, Tecnología Node, Senior
- Brecha que el reto ataca: Experiencia comprobable en al menos un marco de trabajo (Framework) en su lenguaje de programación principal. Puede realizar el enrutamiento de solicitudes, controlar las variables de entorno, generar registros de rastros (Logs) y conectarse con bases de datos utilizando un Mapeador Relacional de Objetos (ORM).
- Mision: Candidato con experiencia Senior en Node.

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
