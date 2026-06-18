/* =========================================================
   Copia de los combos para uso en el SERVIDOR (api/create-preference.js).
   ⚠️ IMPORTANTE: si cambiás precios o combos en js/products.js,
   replicá el mismo cambio acá. Se mantiene duplicado a propósito:
   el backend NUNCA debe confiar en el precio que manda el navegador
   (alguien podría manipularlo), así que valida siempre contra esta
   lista de precios "oficiales" del servidor.
   ========================================================= */

const COMBOS = [
  {
    id: "pack-10-remeras",
    name: "Pack 10 remeras personalizadas",
    price: 199000,
  },
  {
    id: "combo-premium-mate",
    name: "Combo Premium Mate",
    price: 85000,
  },
  {
    id: "remeras-gorras",
    name: "10 Remeras + 10 Gorras",
    price: 260000,
  },
  {
    id: "combo-dia-especial",
    name: "Combo Día Especial",
    price: 25000,
  },
];

module.exports = { COMBOS };
