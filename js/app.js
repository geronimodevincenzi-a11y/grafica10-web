/* =========================================================
   GRÁFICA 10 — lógica de la página
   Renderiza catálogo y combos a partir de products.js,
   maneja el carrito, el modal de cotización y el checkout
   con Mercado Pago.
   ========================================================= */

const money = (n) =>
  "$" + Number(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });

let activeCategory = "todos";

/* ---------------------- CATEGORÍAS / CATÁLOGO ---------------------- */

function renderTabs() {
  const tabsEl = document.getElementById("categoryTabs");
  const all = [{ id: "todos", label: "Todos" }, ...CATEGORIES];
  tabsEl.innerHTML = all
    .map(
      (c) =>
        `<button class="tab-btn${c.id === activeCategory ? " active" : ""}" data-cat="${c.id}">${c.label}</button>`
    )
    .join("");

  tabsEl.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.cat;
      renderTabs();
      renderProducts();
    });
  });
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  const list =
    activeCategory === "todos"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  grid.innerHTML = list
    .map(
      (p) => `
      <div class="product-card">
        <span class="product-icon">${p.icon || "🎨"}</span>
        <h3>${p.name}</h3>
        <p class="desc">${p.description}</p>
        <button class="btn btn-outline" data-quote="${p.id}">Pedir cotización</button>
      </div>`
    )
    .join("");

  grid.querySelectorAll("[data-quote]").forEach((btn) => {
    btn.addEventListener("click", () => openQuoteModal(btn.dataset.quote));
  });
}

/* ---------------------- COMBOS ---------------------- */

function renderCombos() {
  const grid = document.getElementById("comboGrid");
  grid.innerHTML = COMBOS.map(
    (c) => `
    <div class="combo-card">
      <span class="combo-icon">${c.icon || "🎁"}</span>
      <h3>${c.name}</h3>
      <p class="desc">${c.description}</p>
      <div class="combo-price-row">
        <span class="combo-price">${money(c.price)}</span>
        <span class="combo-note">${c.priceNote || ""}</span>
      </div>
      <button class="btn btn-primary" data-add="${c.id}">Agregar al carrito</button>
    </div>`
  ).join("");

  grid.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const combo = COMBOS.find((c) => c.id === btn.dataset.add);
      Cart.add(combo);
      renderCart();
      openCart();
    });
  });
}

/* ---------------------- MODAL DE COTIZACIÓN ---------------------- */

let currentQuoteProduct = null;

function openQuoteModal(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;
  currentQuoteProduct = product;

  document.getElementById("quoteTitle").textContent = `Cotizar: ${product.name}`;
  document.getElementById("quoteDescription").textContent = product.description;

  const optionsEl = document.getElementById("quoteOptions");
  optionsEl.innerHTML = "";
  if (product.options) {
    Object.entries(product.options).forEach(([label, values]) => {
      const wrap = document.createElement("div");
      wrap.className = "quote-option";
      wrap.innerHTML = `
        <label>${label}</label>
        <select data-option="${label}">
          ${values.map((v) => `<option value="${v}">${v}</option>`).join("")}
        </select>`;
      optionsEl.appendChild(wrap);
    });
  }

  document.getElementById("quoteQty").value = 1;
  document.getElementById("quoteNotes").value = "";
  document.getElementById("quoteOverlay").classList.add("open");
}

function closeQuoteModal() {
  document.getElementById("quoteOverlay").classList.remove("open");
  currentQuoteProduct = null;
}

function submitQuote(e) {
  e.preventDefault();
  if (!currentQuoteProduct) return;

  const optionSelects = document.querySelectorAll("#quoteOptions select");
  const optionLines = Array.from(optionSelects)
    .map((sel) => `${sel.dataset.option}: ${sel.value}`)
    .join(" | ");

  const qty = document.getElementById("quoteQty").value || 1;
  const notes = document.getElementById("quoteNotes").value.trim();

  let message = `Hola! Quiero pedir una cotización de *${currentQuoteProduct.name}*.`;
  message += `\nCantidad aproximada: ${qty}`;
  if (optionLines) message += `\n${optionLines}`;
  if (notes) message += `\nDetalles: ${notes}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
  closeQuoteModal();
}

/* ---------------------- CARRITO ---------------------- */

function renderCart() {
  const itemsEl = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  const countEl = document.getElementById("cartCount");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const emptyMsg = document.getElementById("cartEmptyMsg");

  countEl.textContent = Cart.count();
  totalEl.textContent = money(Cart.total());

  if (Cart.items.length === 0) {
    itemsEl.innerHTML = "";
    emptyMsg.style.display = "block";
    checkoutBtn.disabled = true;
    return;
  }

  emptyMsg.style.display = "none";
  checkoutBtn.disabled = false;

  itemsEl.innerHTML = Cart.items
    .map(
      (item) => `
      <div class="cart-item">
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-controls">
            <button data-dec="${item.id}">−</button>
            <span>${item.qty}</span>
            <button data-inc="${item.id}">+</button>
          </div>
          <button class="cart-item-remove" data-remove="${item.id}">Quitar</button>
        </div>
        <strong>${money(item.qty * item.price)}</strong>
      </div>`
    )
    .join("");

  itemsEl.querySelectorAll("[data-inc]").forEach((b) =>
    b.addEventListener("click", () => {
      Cart.changeQty(b.dataset.inc, 1);
      renderCart();
    })
  );
  itemsEl.querySelectorAll("[data-dec]").forEach((b) =>
    b.addEventListener("click", () => {
      Cart.changeQty(b.dataset.dec, -1);
      renderCart();
    })
  );
  itemsEl.querySelectorAll("[data-remove]").forEach((b) =>
    b.addEventListener("click", () => {
      Cart.remove(b.dataset.remove);
      renderCart();
    })
  );
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}

/* ---------------------- CHECKOUT (Mercado Pago) ---------------------- */

async function startCheckout() {
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (Cart.items.length === 0) return;

  checkoutBtn.disabled = true;
  checkoutBtn.textContent = "Generando pago...";

  try {
    const res = await fetch("/api/create-preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: Cart.items }),
    });

    if (!res.ok) throw new Error("No se pudo generar el pago");
    const data = await res.json();

    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      throw new Error("Respuesta inválida del servidor");
    }
  } catch (err) {
    alert(
      "No se pudo iniciar el pago. Si el sitio todavía no tiene Mercado Pago configurado, escribinos por WhatsApp para coordinar tu combo.\n\n(" +
        err.message +
        ")"
    );
    checkoutBtn.disabled = false;
    checkoutBtn.textContent = "Pagar con Mercado Pago";
  }
}

/* ---------------------- INIT ---------------------- */

function initContact() {
  document.getElementById("contactAddress").textContent = BUSINESS_ADDRESS;
  document.getElementById("contactHours").textContent = BUSINESS_HOURS;
  document.getElementById("contactInstagram").href = INSTAGRAM_URL;
  document.getElementById("contactWhatsapp").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola! Te escribo desde la web de Gráfica 10."
  )}`;
  document.getElementById("year").textContent = new Date().getFullYear();
}

function initNav() {
  document.getElementById("navToggle").addEventListener("click", () => {
    document.getElementById("mainNav").classList.toggle("open");
  });
  document.querySelectorAll("#mainNav a").forEach((a) =>
    a.addEventListener("click", () => document.getElementById("mainNav").classList.remove("open"))
  );
}

function initCartUI() {
  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("cartClose").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);
  document.getElementById("checkoutBtn").addEventListener("click", startCheckout);
}

function initQuoteModal() {
  document.getElementById("quoteClose").addEventListener("click", closeQuoteModal);
  document.getElementById("quoteOverlay").addEventListener("click", (e) => {
    if (e.target.id === "quoteOverlay") closeQuoteModal();
  });
  document.getElementById("quoteForm").addEventListener("submit", submitQuote);
}

document.addEventListener("DOMContentLoaded", () => {
  renderTabs();
  renderProducts();
  renderCombos();
  renderCart();
  initContact();
  initNav();
  initCartUI();
  initQuoteModal();
});
