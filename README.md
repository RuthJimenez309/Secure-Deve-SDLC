# Secure Development Lifecycle (SDLC) Automation Engine

Este ecosistema automatizado de ciberseguridad y gobernanza de TI ha sido diseñado para integrar métricas de infraestructura y flujos de datos de aplicaciones con normativas internacionales de cumplimiento corporativo como **GDPR**, **ISO 27001** y el marco de trabajo **NIST CSF**.

El motor actúa de forma nativa analizando estructuras en tiempo de ejecución, calculando la madurez de la seguridad corporativa y consolidando reportes listos para auditorías regulatorias (Auditor-Ready GRC).

## Componentes Core del Sistema

* **Auditoría de Endpoints y Privacidad (GDPR / ISO 27001):** Intercepta e identifica estructuras JSON móviles en busca de datos personales no cifrados (PII) mediante patrones criptográficos e inspecciona los esquemas de retención de datos.
* **Evaluación Cuantitativa de Riesgos (NIST CSF):** Analiza variables de incidentes previos, intentos de intrusión y firewalls obsoletos para calcular el nivel exacto de madurez de la infraestructura.
* **Generador de Evidencia de Cumplimiento:** Consolida las brechas operativas detectadas y redacta un informe técnico ejecutivo con planes de remediación estructurados bajo taxonomías de seguridad estándar.

## Tecnologías Utilizadas

* **Node.js** (Entorno de ejecución)
* **TypeScript** (Tipado estricto y tipado de seguridad avanzada)
* **Compilador TSC nativo** (Generación de empaquetado seguro)

## Instrucciones de Instalación y Uso

1. Instalar las dependencias de desarrollo y del sistema:
   ```bash
   npm install
   ```

2. Compilar el código fuente TypeScript de forma estricta:
   ```bash
   npx tsc
   ```

3. Ejecutar el motor de auditoría automatizada:
   ```bash
   node dist/index.js
   ```
