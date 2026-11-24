// ==========================================
// MINIRETO 2: Funciones con ciclos (for...of)
// ==========================================

function valorVenta(venta) {
  return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
  let total = 0;
  for (const venta of ventas) {
    total += valorVenta(venta);
  }
  return total;
}

function unidadesVendidas(ventas) {
  let unidades = 0;
  for (const venta of ventas) {
    unidades += venta.cantidad;
  }
  return unidades;
}

function ventaMayor(ventas) {
  if (ventas.length === 0) return null;

  let mayor = ventas[0];
  for (const venta of ventas) {
    if (valorVenta(venta) > valorVenta(mayor)) {
      mayor = venta;
    }
  }
  return mayor;
}

function ticketPromedio(ventas) {
  let total = 0;
  let ventasValidas = 0;

  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      total += valorVenta(venta);
      ventasValidas++;
    }
  }

  if (ventasValidas === 0) return 0;
  return total / ventasValidas;
}

function ventasPorCiudad(ventas, ciudad) {
  const objetivo = ciudad.trim().toLowerCase();
  let total = 0;

  for (const venta of ventas) {
    if (venta.ciudad.trim().toLowerCase() === objetivo) {
      total += valorVenta(venta);
    }
  }
  return total;
}

// ==========================================
// MINIRETO 3: Métodos de arreglo y rankings
// ==========================================

function totalVendidoM(ventas) {
  return ventas.reduce((acc, venta) => acc + valorVenta(venta), 0);
}

function unidadesVendidasM(ventas) {
  return ventas.reduce((acc, venta) => acc + venta.cantidad, 0);
}

function ventasPorCiudadM(ventas, ciudad) {
  const objetivo = ciudad.trim().toLowerCase();
  return ventas
    .filter((venta) => venta.ciudad.trim().toLowerCase() === objetivo)
    .reduce((acc, venta) => acc + valorVenta(venta), 0);
}

function normalizarNombre(texto) {
  const limpio = texto.trim().toLowerCase();
  return limpio.charAt(0).toUpperCase() + limpio.slice(1);
}

function totalPorCiudad(ventas) {
  return ventas.reduce((acc, venta) => {
    const ciudad = normalizarNombre(venta.ciudad);
    acc[ciudad] = (acc[ciudad] || 0) + valorVenta(venta);
    return acc;
  }, {});
}

function unidadesPorProducto(ventas) {
  return ventas.reduce((acc, venta) => {
    const producto = venta.producto.trim();
    acc[producto] = (acc[producto] || 0) + venta.cantidad;
    return acc;
  }, {});
}

function topProductosPorValor(ventas, k) {
  const totalesPorProducto = ventas.reduce((acc, venta) => {
    const producto = venta.producto.trim();
    acc[producto] = (acc[producto] || 0) + valorVenta(venta);
    return acc;
  }, {});

  return [...Object.entries(totalesPorProducto)]
    .map(([producto, total]) => ({ producto, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, k);
}

// ==========================================
// MINIRETO 4: Consulta diaria para reporte
// ==========================================

function ventasDelDia(ventas, fecha) {
  const filtradas = ventas.filter((venta) => venta.fecha === fecha);
  return {
    fecha,
    transacciones: filtradas.length,
    unidades: unidadesVendidasM(filtradas),
    total: totalVendidoM(filtradas),
    ticketPromedio: ticketPromedio(filtradas)
  };
}

module.exports = {
  valorVenta,
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  ventasPorCiudad,
  totalVendidoM,
  unidadesVendidasM,
  ventasPorCiudadM,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia
};