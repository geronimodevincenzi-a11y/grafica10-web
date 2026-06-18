/* =========================================================
   GRÁFICA 10 INDUMENTARIA — datos de catálogo
   -----------------------------------------------------------
   Acá vive todo el contenido del catálogo. Para sumar, sacar
   o editar un producto/combo, alcanza con tocar estos arrays:
   no hace falta tocar el HTML ni el CSS.

   Para poner fotos reales: subí la imagen a
   assets/products/<algo>.jpg y poné esa ruta en "image".
   Si "image" queda vacío, se muestra un placeholder con ícono.
   ========================================================= */

// Categorías del catálogo (sin precio fijo -> se cotizan por WhatsApp)
const CATEGORIES = [
  { id: "indumentaria", label: "Indumentaria" },
  { id: "bebidas", label: "Artículos para bebidas" },
  { id: "mates", label: "Mates & compañía" },
  { id: "oficina", label: "Oficina y escritorio" },
  { id: "regalos", label: "Accesorios y regalos" },
  { id: "banderas", label: "Banderas" },
];

const PRODUCTS = [
  // ---------- Indumentaria ----------
  {
    id: "remera-estampada",
    category: "indumentaria",
    name: "Remeras estampadas",
    description:
      "Diseños únicos para eventos, equipos o marcas. Personalizables por color y talle.",
    icon: "👕",
    options: { Talle: ["S", "M", "L", "XL", "XXL"], Color: ["A elección"] },
  },
  {
    id: "remera-sublimada",
    category: "indumentaria",
    name: "Remeras sublimadas",
    description:
      "Diseños únicos para eventos, equipos o marcas. Personalizables por color y talle.",
    icon: "👕",
    options: { Talle: ["S", "M", "L", "XL", "XXL"], Color: ["A elección"] },
  },
  {
    id: "chombas",
    category: "indumentaria",
    name: "Chombas",
    description: "Confort, estilo y durabilidad en una sola prenda.",
    icon: "🎽",
    options: { Talle: ["S", "M", "L", "XL", "XXL"] },
  },
  {
    id: "gorras",
    category: "indumentaria",
    name: "Gorras",
    description:
      "Ideales para promociones, uniformes o regalos. Personalizá con tu logo o frase favorita.",
    icon: "🧢",
  },
  {
    id: "buzos",
    category: "indumentaria",
    name: "Buzos personalizados",
    description: "Abrigo con identidad: tu logo o diseño en el buzo.",
    icon: "🧥",
    options: { Talle: ["S", "M", "L", "XL", "XXL"] },
  },

  // ---------- Banderas ----------
  {
    id: "banderas",
    category: "banderas",
    name: "Banderas",
    description:
      "Color, identidad y presencia en cada evento. Realizadas con tela resistente, ideales para promociones, ferias o decoración.",
    icon: "🚩",
  },

  // ---------- Bebidas ----------
  {
    id: "taza-ceramica",
    category: "bebidas",
    name: "Tazas de cerámica",
    description:
      "Clásicas, resistentes y perfectas para regalos o merchandising. Personalización total con fotos, logos o frases.",
    icon: "☕",
  },
  {
    id: "taza-plastico",
    category: "bebidas",
    name: "Tazas de plástico",
    description:
      "Livianas y seguras. Ideales para niños, empresas o eventos al aire libre.",
    icon: "🥤",
  },
  {
    id: "taza-magica",
    category: "bebidas",
    name: "Tazas mágicas",
    description: "Con el calor revela su diseño… un detalle hermoso para regalar.",
    icon: "✨",
  },
  {
    id: "botella-deportiva",
    category: "bebidas",
    name: "Botellas deportivas",
    description:
      "Resistentes, prácticas y duraderas. Perfectas para uso diario o como regalo empresarial.",
    icon: "🚰",
  },
  {
    id: "vaso-cervecero",
    category: "bebidas",
    name: "Vaso cervecero",
    description:
      "Diseños resistentes y personalizados para regalos, eventos o bares.",
    icon: "🍺",
  },

  // ---------- Mates ----------
  {
    id: "mates",
    category: "mates",
    name: "Mates",
    description: "Livianos y únicos. Ideales para regalar o llevar a todos lados.",
    icon: "🧉",
  },
  {
    id: "yerberas-azucareras",
    category: "mates",
    name: "Yerberas y azucareras",
    description:
      "Disponibles en plástico y cerámica. Prácticas, funcionales y con estilo.",
    icon: "🫙",
  },

  // ---------- Oficina ----------
  {
    id: "lapiceras",
    category: "oficina",
    name: "Lapiceras personalizadas",
    description: "Un clásico infaltable para empresas, ferias o eventos.",
    icon: "🖊️",
  },
  {
    id: "mousepads",
    category: "oficina",
    name: "Mouse pads",
    description: "Comodidad, color y diseño en cada espacio de trabajo.",
    icon: "🖱️",
  },

  // ---------- Accesorios y regalos ----------
  {
    id: "llaveros",
    category: "regalos",
    name: "Llaveros",
    description: "Pequeños detalles que marcan la diferencia, en distintas formas.",
    icon: "🔑",
  },
  {
    id: "llaveros-cinta",
    category: "regalos",
    name: "Llaveros cinta",
    description:
      "Prácticos, livianos y llenos de estilo. Agregale tu logo o nombre y creá un accesorio único.",
    icon: "🎀",
  },
  {
    id: "rompecabezas",
    category: "regalos",
    name: "Rompecabezas personalizado",
    description: "Un regalo diferente que combina creatividad y emoción.",
    icon: "🧩",
  },
  {
    id: "set-asado",
    category: "regalos",
    name: "Set de asado",
    description:
      "Ideal para regalar o disfrutar en familia, incluye piezas esenciales.",
    icon: "🔪",
  },
  {
    id: "caja-regalo",
    category: "regalos",
    name: "Caja de regalo personalizada",
    description:
      "Armamos cajas a medida: vino + copas, chocolates, rompecabezas con fotos y stickers. Perfectas para sorprender.",
    icon: "🎁",
  },
];

/* =========================================================
   COMBOS — estos sí tienen precio fijo y se compran online
   (carrito + Mercado Pago). Los precios son los publicados
   en Instagram; actualizalos acá cuando cambien.
   ========================================================= */
const COMBOS = [
  {
    id: "pack-10-remeras",
    name: "Pack 10 remeras personalizadas",
    description:
      "Diseño exclusivo, tu logo en la espalda. Ideal para equipos, empresas o eventos.",
    price: 199000,
    priceNote: "$19.900 c/u — pack x10",
    icon: "👕",
  },
  {
    id: "combo-premium-mate",
    name: "Combo Premium Mate",
    description:
      "Mate térmico, termo, yerbera, azucarera y bombilla — todo grabado a láser con tu logo o diseño.",
    price: 85000,
    priceNote: "Grabado a láser incluido",
    icon: "🧉",
  },
  {
    id: "remeras-gorras",
    name: "10 Remeras + 10 Gorras",
    description: "Combo para equipos o empresas: remeras y gorras personalizadas.",
    price: 260000,
    priceNote: "Pack combinado x10 + x10",
    icon: "🏆",
  },
  {
    id: "combo-dia-especial",
    name: "Combo Día Especial",
    description:
      "Remera + taza personalizada, presentadas en caja de regalo. Para el Día del Padre, la Madre o cualquier ocasión.",
    price: 25000,
    priceNote: "Remera + taza + caja",
    icon: "🎁",
  },
];

// ⚠️ COMPLETAR: Santi tiene que poner su número real (con código de país,
// sin espacios ni símbolos, ej: "5492346123456") y su dirección/horarios reales.
const WHATSAPP_NUMBER = "5492346000000"; // TODO: reemplazar por el número real
const INSTAGRAM_URL = "https://www.instagram.com/grafica10.indumentaria/";
const BUSINESS_ADDRESS = "Chivilcoy, Buenos Aires"; // TODO: dirección exacta
const BUSINESS_HOURS = "Consultanos por WhatsApp para conocer el horario de atención"; // TODO: horario real
