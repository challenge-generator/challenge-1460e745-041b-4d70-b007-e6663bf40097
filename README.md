# Desarrollo de un microservicio en Node.js

El equipo de desarrollo de una empresa fintech necesita un nuevo microservicio para manejar las solicitudes de préstamos. El microservicio debe enrutar las solicitudes, controlar las variables de entorno, generar logs y conectarse a una base de datos utilizando un ORM. Los actores involucrados son el 'originador de créditos', el 'motor antifraude' y el 'buró de riesgos'. El microservicio debe manejar un volumen de 1 500 solicitudes por segundo en hora pico y garantizar la idempotencia del registro de solicitudes por número de operación y canal. En caso de timeout del buró mayor a 2 segundos, el sistema debe continuar operando.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Experiencia en Frameworks |
| **Nivel** | senior-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 2 semanas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Enrutamiento de solicitudes

**Objetivo:** Implementar el enrutamiento básico de solicitudes de préstamos.

**Tiempo estimado:** 3 días

**Instrucciones:**

- Identificar los endpoints necesarios para recibir y procesar las solicitudes de préstamos.
- Implementar el enrutamiento de solicitudes utilizando un framework de Node.js.
- Garantizar que el microservicio pueda manejar al menos 1 500 solicitudes por segundo.

**Entregable:** Microservicio con enrutamiento básico de solicitudes operativo.

<details>
<summary>Pistas de conocimiento</summary>

- Considera la idempotencia en el diseño del enrutamiento.
- Piensa en cómo manejarías un timeout del buró mayor a 2 segundos.

</details>

### Fase 2: Control de variables de entorno y logs

**Objetivo:** Implementar el control de variables de entorno y la generación de logs.

**Tiempo estimado:** 2 días

**Instrucciones:**

- Configurar el microservicio para leer variables de entorno.
- Implementar la generación de logs para registrar las solicitudes de préstamos.
- Asegurar que los logs contengan información relevante para la auditoría y el seguimiento de las solicitudes.

**Entregable:** Microservicio con control de variables de entorno y generación de logs.

<details>
<summary>Pistas de conocimiento</summary>

- Considera la seguridad al manejar variables de entorno.
- Piensa en qué información es relevante para los logs.

</details>

### Fase 3: Conexión con base de datos utilizando ORM

**Objetivo:** Implementar la conexión con una base de datos utilizando un ORM.

**Tiempo estimado:** 3 días

**Instrucciones:**

- Configurar el microservicio para conectarse a una base de datos.
- Utilizar un ORM para mapear los objetos de la aplicación a las tablas de la base de datos.
- Asegurar que la conexión con la base de datos sea idempotente y tolerante a fallos.

**Entregable:** Microservicio conectado a una base de datos utilizando un ORM.

<details>
<summary>Pistas de conocimiento</summary>

- Considera la consistencia y la disponibilidad al elegir el ORM.
- Piensa en cómo manejarías un fallo en la conexión con la base de datos.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es un framework de Node.js y por qué se utiliza en el desarrollo de microservicios?
- **paraQueSirve**: ¿Para qué sirve el control de variables de entorno en un microservicio?
- **comoSeUsa**: ¿Cómo se utiliza un ORM para conectar un microservicio a una base de datos?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar el enrutamiento de solicitudes en un microservicio?
- **queDecisionesImplica**: ¿Qué decisiones implica la elección de un framework de Node.js para el desarrollo de un microservicio?

## Criterios de Evaluacion

- Implementación del enrutamiento básico de solicitudes de préstamos.
- Configuración del microservicio para leer variables de entorno.
- Generación de logs para registrar las solicitudes de préstamos.
- Conexión del microservicio a una base de datos utilizando un ORM.
- Garantía de la idempotencia y la tolerancia a fallos en la conexión con la base de datos.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
