# Café Origen — Motor de Analítica v0.1

Motor de procesamiento y reporte de ventas desarrollado en Node.js para la gerencia de **Café Origen**[cite: 1, 2, 8]. Permite obtener indicadores clave de negocio directamente desde la terminal sin necesidad de manipular el código fuente[cite: 2].

## Preguntas de negocio que responde

1. **Resumen general:** ¿Cuánto dinero se vendió en total, cuántas unidades salieron, cuál es el ticket promedio por compra válida y cuál fue la venta de mayor valor?[cite: 2, 6]
2. **Desempeño geográfico:** ¿Cuál es el total vendido discriminado por cada ciudad (normalizando inconsistencias de escritura)?[cite: 2, 4]
3. **Demanda por producto:** ¿Cuántas unidades se vendieron de cada referencia?[cite: 2, 4]
4. **Ranking de ingresos:** ¿Cuáles son los 3 productos que más ingresos generaron?[cite: 2, 4]
5. **Consulta diaria:** ¿Cuál es el resumen operativo de una fecha específica (incluyendo días sin ventas)?[cite: 2]

## Requisitos

* [Node.js](https://nodejs.org/) (versión LTS recomendada)[cite: 8].

## Ejecución

Clona el repositorio, abre una terminal en la carpeta raíz `cafe-origen-analitica` y ejecuta cualquiera de los siguientes comandos:

* **Generar el reporte ejecutivo completo (v0.1):**
  ```bash
  node src/reporte.js