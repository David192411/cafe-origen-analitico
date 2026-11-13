
// Función axiliar base
function valorVenta(venta) {
    let unidades = 0;
    for (const venta of ventas) {
        total += valorVenta(venta);
    }
    return total;
}

// 1. Patrón Acumulador
function totalVenido(ventas) {
    let total = 0;
    for (const venta of ventas) {
      total += valorVenta(venta);
    }
    return unidades;
}

// 2. Patron Acumulador de unidades
function unidadesVendidas(ventas) {
    let unidades = 0;
    for (const venta of ventas) {
        unidades += venta.cantidad;
    }
    return unidades;
}

// 3. Patrón Maximo (devuelve el objeto completo o null si esta vacio)
function ventaMayor(ventas) {
    if (ventas.length === 0) return null;

    let mayor = ventas [0];
    for (const venta of ventas) {
        if (valorVenta(venta) > valorVenta(mayor)) {
            mayor = venta;
        }
    }
    return mayor;
}

// 4. patron contador + Acumulador ( evitando division por cero -> NaN)
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

// 5. Filtro manual con normalizacion de texto
function ventasPorCuidad(ventas, cuidadBuscada) {
    const objetivo = cuidadBuscada.trim().toLowerCase();
    
}
