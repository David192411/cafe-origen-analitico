### 7. `bitacora.md`
Registro técnico completo de los 4 MiniRetos[cite: 1, 2, 4, 6, 8].

```markdown
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
   * *Decisión:* Conservar intacto `src/datos.js`[cite: 8] y normalizar siempre con `.trim().toLowerCase()` dentro de `src/analitica.js`[cite: 4, 5].
2. **Transacción con `cantidad: 0`:**
   * *Hallazgo:* El registro `#8` tiene `cantidad: 0`[cite: 9].
   * *Decisión:* Suma `0` al total y a las unidades, pero **se excluye** del conteo de ventas válidas al calcular `ticketPromedio`[cite: 6].
3. **Clientes recurrentes:**
   * *Hallazgo:* El cliente `C01` aparece en los registros `#1`, `#4` y `#11`[cite: 9].
   * *Decisión:* Cada fila representa una transacción independiente y no un cliente único; no se deduplica por cliente.

---

## MiniReto 2: Pseudocódigo, casos borde y trazas manuales

### 1. Pseudocódigo de los indicadores

* **`valorVenta(venta)`:** Retornar `venta.cantidad * venta.precio`[cite: 6].
* **`totalVendido(ventas)`:** Iniciar `total = 0`. Recorrer cada `venta` en `ventas` y acumular `total += valorVenta(venta)`. Retornar `total`[cite: 6].
* **`unidadesVendidas(ventas)`:** Iniciar `unidades = 0`. Recorrer cada `venta` en `ventas` y acumular `unidades += venta.cantidad`. Retornar `unidades`[cite: 6].
* **`ventaMayor(ventas)`:** Si `ventas.length === 0`, retornar `null`. Iniciar `mayor = ventas[0]`. Recorrer `ventas`; si `valorVenta(venta) > valorVenta(mayor)`, asignar `mayor = venta`. Retornar `mayor`[cite: 6].
* **`ticketPromedio(ventas)`:** Iniciar `total = 0` y `ventasValidas = 0`. Recorrer `ventas`; si `venta.cantidad > 0`, acumular `total += valorVenta(venta)` y `ventasValidas++`. Si `ventasValidas === 0`, retornar `0`; si no, retornar `total / ventasValidas`[cite: 6].
* **`ventasPorCiudad(ventas, ciudad)`:** Normalizar `objetivo = ciudad.trim().toLowerCase()`. Iniciar `total = 0`. Recorrer `ventas`; si `venta.ciudad.trim().toLowerCase() === objetivo`, acumular `total += valorVenta(venta)`. Retornar `total`[cite: 5, 6].

### 2. Decisiones ante arreglo vacío (`[]`)

* `totalVendido([])` $\rightarrow$ `0`[cite: 6].
* `unidadesVendidas([])` $\rightarrow$ `0`[cite: 6].
* `ventaMayor([])` $\rightarrow$ `null` (no hay registro existente)[cite: 6].
* `ticketPromedio([])` $\rightarrow$ `0` (evita la indeterminación `0 / 0 = NaN`)[cite: 5, 6].
* `ventasPorCiudad([], "Cali")` $\rightarrow$ `0`[cite: 6].

### 3. Tablas de traza manual (primeros 4 registros)

#### Traza 1: `totalVendido(ventas)`
| Iteración | `venta.id` | `cantidad` | `precio` | `valorVenta(venta)` | `total` (acumulado) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Inicio | - | - | - | - | `0` |
| 1 | `1`[cite: 9] | `2`[cite: 9] | `45.000` | `90.000` | `90.000` |
| 2 | `2`[cite: 9] | `1`[cite: 9] | `30.000` | `30.000` | `120.000` |
| 3 | `3`[cite: 9] | `1`[cite: 9] | `85.000` | `85.000` | `205.000` |
| 4 | `4`[cite: 9] | `1`[cite: 9] | `45.000` | `45.000` | **`250.000`** |

#### Traza 2: `ventaMayor(ventas)`
| Iteración | `venta.id` | `valorVenta(venta)` | `valorVenta(mayor)` | ¿Cambia `mayor`? | `mayor.id` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Inicio | - | - | - | - | `1` |
| 1 | `1`[cite: 9] | `90.000` | `90.000` | No | `1` |
| 2 | `2`[cite: 9] | `30.000` | `90.000` | No | `1` |
| 3 | `3`[cite: 9] | `85.000` | `90.000` | No | `1` |
| 4 | `4`[cite: 9] | `45.000` | `90.000` | No | **`1`** |

---

## MiniReto 3: Preguntas sobre colecciones por función

| Función | ¿Qué recorro? | ¿Qué filtro? | ¿Qué transformo? | ¿Qué acumulo? | ¿Cómo agrupo? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `totalVendidoM`[cite: 4] | Arreglo `ventas`. | Nada. | Cada `venta` en su valor monetario (`cantidad * precio`). | El valor total en `acc` (inicia en `0`). | No agrupa. |
| `unidadesVendidasM`[cite: 4] | Arreglo `ventas`. | Nada. | Cada `venta` en su propiedad `cantidad`. | Las unidades en `acc` (inicia en `0`). | No agrupa. |
| `ventasPorCiudadM`[cite: 4] | Arreglo `ventas`. | Ventas cuya `ciudad` normalizada iguala al parámetro. | Registros filtrados a su valor de venta. | Los valores filtrados en `acc` (inicia en `0`). | No agrupa. |
| `totalPorCiudad`[cite: 4] | Arreglo `ventas`. | Nada. | `ciudad` normalizada y capitalizada. | El dinero vendido por cada ciudad. | Objeto `{}` como diccionario (llave: ciudad)[cite: 3, 4]. |
| `unidadesPorProducto`[cite: 4] | Arreglo `ventas`. | Nada. | `producto` limpio con `trim()`. | Las `cantidad`es por cada producto. | Objeto `{}` como diccionario (llave: producto)[cite: 3, 4]. |
| `topProductosPorValor`[cite: 4] | `ventas` y `Object.entries()`[cite: 3]. | Top `k` elementos con `.slice(0, k)`[cite: 3, 4]. | Entradas `[producto, total]` en objetos `{ producto, total }` ordenados[cite: 3]. | El valor vendido por producto. | Diccionario `{}` previo al ordenamiento[cite: 3]. |

---

## MiniReto 4: Registro de depuración

### Error 1: "Bogotá aparecía dos veces"[cite: 2]
* **Síntoma:** Al listar ventas por ciudad, `"Bogotá"` aparecía duplicada (`"Bogotá"` y `"Bogotá "`)[cite: 2, 4] y `"medellín "` quedaba separada de `"Medellín"`[cite: 5, 9].
* **Entrada que lo produce:** Registros con espacios extra al final o diferencias de capitalización (`"Bogotá "`, `"medellín "`)[cite: 4, 5].
* **Hipótesis:** En JavaScript las claves de los objetos son sensibles a espacios y mayúsculas (`"Bogotá" !== "Bogotá "`).
* **Prueba realizada:** Ejecución de `totalPorCiudad(ventas)` inspeccionando `Object.keys()` en `src/verificar.js`[cite: 3, 4].
* **Causa:** Uso directo de `venta.ciudad` sin limpieza de cadena antes de indexar el diccionario.
* **Corrección:** Implementación de `normalizarNombre()` con `.trim().toLowerCase()` y capitalización inicial dentro de `totalPorCiudad`[cite: 4, 5].

### Error 2: "El ticket promedio daba NaN cuando filtraba un día sin ventas"[cite: 2]
* **Síntoma:** Al consultar una fecha sin ventas (ej. `"2026-12-25"`), el ticket promedio imprimía `NaN`[cite: 2].
* **Entrada que lo produce:** Un arreglo vacío `[]` o un arreglo donde todos los registros tienen `cantidad: 0`[cite: 6].
* **Hipótesis:** Cuando `ventasValidas === 0` y `total === 0`, la división `0 / 0` en JavaScript produce `NaN`.
* **Prueba realizada:** Llamada a `ticketPromedio([])` y `ventasDelDia(ventas, "2026-12-25")` desde `src/reporte.js`[cite: 2, 6].
* **Causa:** Ausencia de validación previa antes de ejecutar la división entre `ventasValidas`.
* **Corrección:** Inclusión de la cláusula de guarda `if (ventasValidas === 0) return 0;` en `ticketProme