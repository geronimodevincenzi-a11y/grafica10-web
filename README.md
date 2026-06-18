# Gráfica 10 Indumentaria — sitio web

Sitio para Gráfica 10 Indumentaria (Chivilcoy): catálogo con cotización por
WhatsApp + combos de precio fijo que se pueden pagar online con Mercado Pago.

## Qué incluye

- `index.html` — toda la estructura de la página (header, hero, nosotros,
  combos, catálogo, cómo funciona, contacto, carrito, modal de cotización).
- `css/styles.css` — estilos con los colores e identidad visual tomados de
  Instagram (verde oliva/negro, crema, naranja-rojo del logo, teal de acento).
- `js/products.js` — **el archivo que más vas a tocar**: categorías,
  productos del catálogo y combos con precio. También tu número de WhatsApp,
  Instagram, dirección y horarios.
- `js/cart.js` — lógica del carrito (se guarda en el navegador del cliente).
- `js/app.js` — conecta todo: catálogo, combos, carrito, modal y checkout.
- `api/create-preference.js` — función que crea el pago en Mercado Pago.
- `api/_combos.js` — copia de los combos que usa el servidor para validar
  precios (ver más abajo por qué existe esto dos veces).

## 1. Completar tus datos reales

Abrí `js/products.js` y al final del archivo reemplazá:

```js
const WHATSAPP_NUMBER = "5492346000000"; // tu número con código de país, sin + ni espacios
const BUSINESS_ADDRESS = "Chivilcoy, Buenos Aires"; // tu dirección exacta
const BUSINESS_HOURS = "..."; // tu horario real
```

Ejemplo de formato de WhatsApp: si tu número es `011 2346-123456`, en general
queda `5492346123456` (54 = Argentina, 9 = celular, luego código de área sin
el 0 y el número sin el 15).

## 2. Cargar fotos reales (opcional pero recomendado)

Por ahora cada producto muestra un emoji como ícono. Cuando tengas fotos:

1. Creá una carpeta `assets/` (si no existe) y subí ahí tus fotos.
2. En `js/products.js`, en cada producto o combo, agregá una propiedad
   `image: "assets/remera.jpg"`.
3. Decime si querés que te ajuste el HTML/CSS para mostrar esa imagen en la
   tarjeta en lugar del ícono — es un cambio chico.

## 3. Probar el sitio en tu computadora (opcional)

No es obligatorio, pero si tenés Node instalado podés levantar un servidor
local desde esta carpeta:

```bash
npx serve .
```

Y abrís la URL que te muestre en el navegador. El botón de Mercado Pago no va
a funcionar en este modo local (necesita estar en Vercel), pero podés revisar
el catálogo, el carrito y el botón de WhatsApp.

## 4. Publicar en Vercel

1. Creá una cuenta gratis en [vercel.com](https://vercel.com) si no tenés.
2. Subí esta carpeta a un repositorio de GitHub (o usá `vercel` CLI para
   subirla directo sin GitHub: `npx vercel`).
3. En Vercel, "Add New Project" → importá el repositorio → Deploy.
4. Vercel detecta automáticamente la función en `api/create-preference.js`
   y la sirve como `https://tu-sitio.vercel.app/api/create-preference`.

## 5. Configurar Mercado Pago (esto lo hacés vos, no nosotros)

Por seguridad, el sitio nunca pide ni guarda tu usuario/contraseña de
Mercado Pago. Solo necesita un **Access Token** que generás vos mismo desde
tu cuenta y que pegás en Vercel como variable de entorno — nunca queda
visible en el código ni en el navegador.

Pasos:

1. Entrá a [mercadopago.com.ar/developers/panel](https://www.mercadopago.com.ar/developers/panel)
   con tu cuenta de Mercado Pago.
2. Creá una aplicación (cualquier nombre, por ejemplo "Gráfica 10 Web").
3. Entrá a "Credenciales de producción" y copiá el **Access Token**
   (empieza con `APP_USR-...`). Mientras probás, podés usar primero las
   "Credenciales de prueba" para no procesar pagos reales.
4. En Vercel: entrá a tu proyecto → **Settings → Environment Variables**.
5. Agregá una variable:
   - Name: `MP_ACCESS_TOKEN`
   - Value: el token que copiaste
   - Environment: Production (y Preview si querés probar antes)
6. Guardá y volvé a desplegar el proyecto (Vercel te va a sugerir un
   "Redeploy" — aceptalo para que tome la nueva variable).

Listo: a partir de ahí, cuando alguien agregue un combo al carrito y toque
"Pagar con Mercado Pago", el sitio va a redirigirlo al checkout oficial de
Mercado Pago y vos vas a recibir el dinero en tu cuenta como cualquier otra
venta.

## Por qué el catálogo no tiene "comprar" en todos los productos

La mayoría de tus productos (remeras, mates, tazas, etc.) dependen de talle,
cantidad y diseño — no tienen un precio único fijo. Por eso el catálogo usa
"Pedir cotización por WhatsApp": el cliente eligió producto y opciones, y te
llega un mensaje prearmado con todo eso.

Los **combos** (pack de remeras, combo premium de mate, etc.) sí tienen un
precio fijo que ya publicás en Instagram, así que esos se compran
directamente online con Mercado Pago.

Si en algún momento querés sumar más combos de precio fijo, agregalos en
`js/products.js` (array `COMBOS`) **y también** en `api/_combos.js` con el
mismo `id` y `price` — el servidor usa esa segunda copia para no confiar en
el precio que manda el navegador (evita que alguien manipule el precio desde
las herramientas del navegador antes de pagar).

## Soporte

Cualquier cambio de textos, colores, productos o combos se hace editando los
archivos de este proyecto — no se necesita saber programación para los
cambios de contenido en `js/products.js`, son básicamente copiar/pegar un
bloque y cambiar el texto.
