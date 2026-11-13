# Bitácora de Ingeniería — Café Origen Analítica (v0.1)

---

## MiniReto 1: Diccionario de datos y casos borde

### 1. Diccionario de datos (`src/datos.js`)

| Propiedad | Tipo de dato | Significado | Ejemplo |
| :--- | :--- | :--- | :--- |
| `id` | `number` | Identificador único consecutivo de la transacción. | `1` |
| `fecha` | `string` | Fecha de la venta en formato ISO (`AAAA-MM-DD`). | `"2026-09-01"` |
| `cliente` | `string` | Código identificador del cliente que realiza la compra. | `"C01"` |
| `producto` | `string` | Nombre y presentación del producto vendido. | `"Origen Huila 500 g"` |
| `ciudad` | `string` | Ciudad donde se efectuó la venta. | `"Medellín"` |
| `cantidad` | `number` | Número de unidades adquiridas en la transacción. | `2` |
| `precio` | `number` | Precio unitario del producto en pesos colombianos (COP). | `45000` |

### 2. Casos borde detectados en la muestra

1. **Inconsistencias de formato en `ciudad` (mayúsculas y espacios):**
   * *Hallazgo:* El registro `#5` contiene `"medellín "` en minúscula y con un espacio al final[cite: 5, 9], y en pruebas posteriores aparecen entradas como `"Bogotá "`[cite: 4].
   * *Decisión:* No alterar el archivo `datos.js` original[cite: 8], pero aplicar siempre `.trim().toLowerCase()` dentro de las funciones de analítica antes de comparar o agrupar ciudades[cite: 4, 5].
2. **Transacción con `cantidad: 0`:**
   * *Hallazgo:* El registro `#8` tiene `cantidad: 0`[cite: 9].
   * *Decisión:* Se conserva en el historial; aporta `0` al total vendido y a las unidades, pero **se excluye** del conteo de ventas válidas al calcular el `ticketPromedio` para no distorsionar el promedio por compra[cite: 6].
3. **Clientes recurrentes en múltiples fechas:**
   * *Hallazgo:* El cliente `C01` aparece en los registros `#1`, `#4` y `#11`[cite: 9].
   * *Decisión:* Cada objeto del arreglo representa una transacción individual y no un cliente único; no se deben deduplicar registros por `cliente`.

---