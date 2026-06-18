/* =========================================================
   Vercel Serverless Function
   POST /api/create-preference
   -----------------------------------------------------------
   Recibe el carrito desde el frontend, valida los precios
   contra la lista oficial del servidor (_combos.js) y crea
   una preferencia de pago en Mercado Pago usando el access
   token guardado en la variable de entorno MP_ACCESS_TOKEN.

   El token NUNCA se expone al navegador: vive solo en Vercel
   (Project Settings -> Environment Variables). Ver README.md
   para el paso a paso de cómo configurarlo.
   ========================================================= */

const { COMBOS } = require("./_combos");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    res.status(500).json({
      error:
        "Falta configurar MP_ACCESS_TOKEN en las variables de entorno de Vercel. Ver README.md.",
    });
    return;
  }

  const { items } = req.body || {};
  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: "El carrito está vacío" });
    return;
  }

  // Validamos cada item contra los combos "oficiales" del servidor,
  // ignorando cualquier precio que venga del cliente.
  const preferenceItems = [];
  for (const it of items) {
    const combo = COMBOS.find((c) => c.id === it.id);
    if (!combo) {
      res.status(400).json({ error: `Producto inválido: ${it.id}` });
      return;
    }
    const qty = Math.max(1, parseInt(it.qty, 10) || 1);
    preferenceItems.push({
      title: combo.name,
      quantity: qty,
      unit_price: combo.price,
      currency_id: "ARS",
    });
  }

  const origin = req.headers.origin || `https://${req.headers.host}`;

  try {
    const mpResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        items: preferenceItems,
        back_urls: {
          success: `${origin}/?pago=exitoso`,
          failure: `${origin}/?pago=fallido`,
          pending: `${origin}/?pago=pendiente`,
        },
        auto_return: "approved",
      }),
    });

    const data = await mpResponse.json();

    if (!mpResponse.ok) {
      res.status(502).json({
        error: data.message || "Mercado Pago rechazó la solicitud de pago",
      });
      return;
    }

    res.status(200).json({ init_point: data.init_point });
  } catch (err) {
    res.status(500).json({ error: "Error interno al conectar con Mercado Pago" });
  }
};
