const ventas = require("./datos");
const {
  totalVendido,
  totalVendidoM,
  unidadesVendidas,
  unidadesVendidasM,
  ventasPorCiudad,
  ventasPorCiudadM,
  totalPorCiudad,
  topProductosPorValor
} = require("./analitica");

const estadoInicial = JSON.stringify(ventas);

console.log("=== COMPARACIÓN CICLO VS MÉTODO ===");
console.log("totalVendido:", totalVendido(ventas) === totalVendidoM(ventas) ? "OK" : "DIFERENTE");
console.log("unidadesVendidas:", unidadesVendidas(ventas) === unidadesVendidasM(ventas) ? "OK" : "DIFERENTE");
console.log("ventasPorCiudad (Medellín):", ventasPorCiudad(ventas, "Medellín") === ventasPorCiudadM(ventas, "Medellín") ? "OK" : "DIFERENTE");

console.log("\n=== VALIDACIÓN DE AGRUPACIONES Y TOP 3 ===");
const ciudades = Object.keys(totalPorCiudad(ventas));
console.log("Ciudades únicas (" + ciudades.length + "):", ciudades);
console.log("Top 3 productos por valor:", topProductosPorValor(ventas, 3));

console.log("\n=== VALIDACIÓN DE INMUTABILIDAD ===");
console.log("Arreglo ventas sin mutaciones:", JSON.stringify(ventas) === estadoInicial ? "OK" : "DIFERENTE");