/* =========================================================
   GRÁFICA 10 — estado del carrito
   Solo guarda combos de precio fijo (los del catálogo se
   cotizan por WhatsApp y no entran al carrito). Se persiste
   en localStorage para que no se pierda si recargás la página.
   ========================================================= */

const Cart = {
  STORAGE_KEY: "g10_cart_v1",
  items: [], // [{ id, name, price, qty }]

  load() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      this.items = raw ? JSON.parse(raw) : [];
    } catch (e) {
      this.items = [];
    }
  },

  save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
  },

  add(combo) {
    const existing = this.items.find((i) => i.id === combo.id);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ id: combo.id, name: combo.name, price: combo.price, qty: 1 });
    }
    this.save();
  },

  changeQty(id, delta) {
    const item = this.items.find((i) => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      this.remove(id);
      return;
    }
    this.save();
  },

  remove(id) {
    this.items = this.items.filter((i) => i.id !== id);
    this.save();
  },

  clear() {
    this.items = [];
    this.save();
  },

  count() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },

  total() {
    return this.items.reduce((sum, i) => sum + i.qty * i.price, 0);
  },
};

Cart.load();
