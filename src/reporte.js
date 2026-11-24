const ventas = require("./datos");
const {
  totalVendidoM,
  unidadesVendidasM,
  ticketPromedio,
  ventaMayor,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia
} = require("./analitica");

const formatoCOP = (valor) => `$${valor.toLocaleString("es-CO")}`;

console.log("==================================================");
console.log("       REPORTE DE ANALÍTICA - CAFÉ ORIGEN v0.1    ");
console.log("==================================================\n");

// 1. Resumen general
const mayor = ventaMayor(ventas);
console.log("--- 1. RESUMEN GENERAL ---");
console.log(`Total vendido:      ${formatoCOP(totalVendidoM(ventas))}`);
console.log(`Unidades vendidas:  ${unidadesVendidasM(ventas)} uds`);
console.log(`Ticket promedio:    ${formatoCOP(Math.round(ticketPromedio(ventas)))}`);
if (mayor) {
  console.log(`Venta mayor:        #${mayor.id} (${mayor.producto} - ${formatoCOP(mayor.cantidad * mayor.precio)})`);
}
console.log("");

// 2. Ventas por ciudad
console.log("--- 2. VENTAS POR CIUDAD ---");
const tablaCiudades = Object.entries(totalPorCiudad(ventas)).map(([ciudad, total]) => ({
  Ciudad: ciudad,
  "Total Vendido": formatoCOP(total)
}));
console.table(tablaCiudades);

// 3. Unidades por producto
console.log("--- 3. UNIDADES POR PRODUCTO ---");
const tablaProductos = Object.entries(unidadesPorProducto(ventas)).map(([producto, unidades]) => ({
  Producto: producto,
  Unidades: unidades
}));
console.table(tablaProductos);

// 4. Top 3 productos por valor
console.log("--- 4. TOP 3 PRODUCTOS POR VALOR ---");
const tablaTop3 = topProductosPorValor(ventas, 3).map((item, idx) => ({
  Puesto: `#${idx + 1}`,
  Producto: item.producto,
  "Ingresos Generados": formatoCOP(item.total)
}));
console.table(tablaTop3);

// 5. Resumen por fecha (con ventas y sin ventas)
console.log("--- 5. RESUMEN POR FECHA ---");
const diaConVentas = ventasDelDia(ventas, "2026-09-01");
const diaSinVentas = ventasDelDia(ventas, "2026-12-25");

console.log(
  `Fecha ${diaConVentas.fecha}: ${diaConVentas.unidades} uds | Total: ${formatoCOP(diaConVentas.total)} | Ticket promedio: ${formatoCOP(Math.round(diaConVentas.ticketPromedio))}`
);
console.log(
  `Fecha ${diaSinVentas.fecha}: ${diaSinVentas.unidades} uds | Total: ${formatoCOP(diaSinVentas.total)} | Ticket promedio: ${formatoCOP(Math.round(diaSinVentas.ticketPromedio))} (Sin ventas registradas)`
);