// /js/scripts.js

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

const state = {
  products: [
    { id: 1, name: "Honey Lavender Bliss", price: 28.99, image: "/assets/images/candle1.png", scent: "Floral & Sweet" },
    { id: 2, name: "Golden Vanilla Dream", price: 32.99, image: "/assets/images/candle2.png", scent: "Warm & Creamy" },
    { id: 3, name: "Eucalyptus Mint Fresh", price: 26.99, image: "/assets/images/candle3.png", scent: "Fresh & Crisp" },
    { id: 4, name: "Citrus Honey Burst", price: 29.99, image: "/assets/images/candle4.png", scent: "Bright & Citrusy" },
    { id: 5, name: "Amber Rose Garden", price: 34.99, image: "/assets/images/candle5.png", scent: "Romantic & Elegant" },
    { id: 6, name: "Ocean Breeze Serenity", price: 30.99, image: "/assets/images/candle6.png", scent: "Fresh & Aquatic" }
  ],
  cart: {}
};

function toId(name) {
  const p = state.products.find(x => x.name.trim().toLowerCase() === name.trim().toLowerCase());
  return p ? p.id : null;
}

function getQtyInput(card) {
  return $(".quantity-input", card);
}

function getQty(card) {
  const input = getQtyInput(card);
  const v = parseInt(input?.value ?? "1", 10);
  return Number.isFinite(v) ? Math.min(99, Math.max(1, v)) : 1;
}

function setQty(card, n) {
  const input = getQtyInput(card);
  if (input) input.value = Math.min(99, Math.max(1, n));
}

function cartCount() {
  return Object.values(state.cart).reduce((a, b) => a + b, 0);
}

function cartTotal() {
  return Object.entries(state.cart).reduce((sum, [pid, q]) => {
    const p = state.products.find(x => x.id === Number(pid));
    return sum + (p ? p.price * q : 0);
  }, 0);
}

function money(n) {
  return `$${n.toFixed(2)}`;
}

function updateYear() {
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
}

function updateCartBadge() {
  const badge = $(".cart-count");
  if (!badge) return;
  const c = cartCount();
  badge.textContent = c;
  badge.classList.toggle("cart-count-active", c > 0);
}

function renderCart() {
  const dropdown = $(".cart-dropdown");
  const itemsWrap = $(".cart-items", dropdown);
  const empty = $(".cart-empty", dropdown);
  const totalEl = $(".cart-total strong", dropdown);
  if (!dropdown || !itemsWrap || !empty || !totalEl) return;

  const entries = Object.entries(state.cart).filter(([, q]) => q > 0);
  itemsWrap.innerHTML = "";

  if (entries.length === 0) {
    empty.hidden = false;
    itemsWrap.hidden = true;
    totalEl.textContent = `Total: ${money(0)}`;
    return;
  }

  empty.hidden = true;
  itemsWrap.hidden = false;

  entries.forEach(([pid, q]) => {
    const p = state.products.find(x => x.id === Number(pid));
    if (!p) return;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h4 class="cart-item-name">${p.name}</h4>
        <p class="cart-item-price">${money(p.price)}</p>
        <div class="cart-item-quantity">
          <button class="quantity-btn-cart" data-act="dec" data-id="${p.id}" ${q <= 1 ? "disabled" : ""}>-</button>
          <span class="quantity-display-cart">${q}</span>
          <button class="quantity-btn-cart" data-act="inc" data-id="${p.id}">+</button>
        </div>
      </div>
      <div class="cart-item-actions">
        <p class="cart-item-total">${money(p.price * q)}</p>
        <button class="remove-item-btn" title="Remove from cart" data-act="remove" data-id="${p.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    `;
    itemsWrap.appendChild(row);
  });

  totalEl.textContent = `Total: ${money(cartTotal())}`;
}

function openCart(open) {
  const dd = $(".cart-dropdown");
  const overlay = $(".cart-overlay");
  if (!dd || !overlay) return;
  const isOpen = open === undefined ? dd.hasAttribute("hidden") : open;
  dd.toggleAttribute("hidden", !isOpen);
  overlay.toggleAttribute("hidden", !isOpen);
}

function toggleMobileNav(open) {
  const nav = $(".mobile-nav");
  if (!nav) return;
  const isOpen = open === undefined ? nav.hasAttribute("hidden") : open;
  nav.toggleAttribute("hidden", !isOpen);
}

function scrollToHash(hash) {
  const el = document.getElementById(hash.replace("#", ""));
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function wireProductCards() {
  $$(".product-card").forEach(card => {
    const name = $(".product-name", card)?.textContent?.trim() ?? "";
    const pid = toId(name);
    if (!pid) return;

    const [dec, inc] = $$(".quantity-btn", card);
    const input = $(".quantity-input", card);
    const btn = $(".add-to-cart-btn", card);

    if (input) {
      input.addEventListener("input", () => setQty(card, getQty(card)));
      input.addEventListener("blur", () => setQty(card, getQty(card)));
    }
    if (dec) dec.addEventListener("click", () => setQty(card, getQty(card) - 1));
    if (inc) inc.addEventListener("click", () => setQty(card, getQty(card) + 1));

    if (btn) {
      btn.addEventListener("click", () => {
        const qty = getQty(card);
        state.cart[pid] = (state.cart[pid] || 0) + qty;
        updateCartBadge();
        renderCart();
        openCart(true);
        setQty(card, 1);
      });
    }
  });
}

function wireCartControls() {
  const dropdown = $(".cart-dropdown");
  if (!dropdown) return;

  dropdown.addEventListener("click", e => {
    const t = e.target.closest("[data-act]");
    if (!t) return;
    const act = t.getAttribute("data-act");
    const pid = Number(t.getAttribute("data-id"));
    if (!pid) return;

    if (act === "inc") {
      state.cart[pid] = Math.min(99, (state.cart[pid] || 0) + 1);
    } else if (act === "dec") {
      state.cart[pid] = Math.max(1, (state.cart[pid] || 1) - 1);
    } else if (act === "remove") {
      delete state.cart[pid];
    }

    if (!Object.keys(state.cart).length) openCart(false);
    updateCartBadge();
    renderCart();
  });

  const closeBtn = $(".cart-close-btn");
  if (closeBtn) closeBtn.addEventListener("click", () => openCart(false));
  const overlay = $(".cart-overlay");
  if (overlay) overlay.addEventListener("click", () => openCart(false));
  const toggleBtn = $(".cart-button");
  if (toggleBtn) toggleBtn.addEventListener("click", () => openCart());
  const checkout = $(".checkout-btn");
  if (checkout) checkout.addEventListener("click", () => alert("Checkout coming soon."));
}

function wireNav() {
  $$(".nav-link, .mobile-nav-link").forEach(a => {
    a.addEventListener("click", e => {
      const href = a.getAttribute("href");
      if (!href?.startsWith("#")) return;
      e.preventDefault();
      toggleMobileNav(false);
      scrollToHash(href);
    });
  });

  const mobileBtn = $(".mobile-menu-btn");
  if (mobileBtn) mobileBtn.addEventListener("click", () => toggleMobileNav());

  const heroCta = $(".hero-cta");
  if (heroCta) heroCta.addEventListener("click", () => scrollToHash("#products"));
}

/* PRELOADER */
function setupPreloader() {
  const preloader = document.createElement("div");
  preloader.id = "preloader";

  Object.assign(preloader.style, {
    position: "fixed",
    inset: "0",
    background: "#f8f8f8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "9999",
    opacity: "1",
    transition: "opacity 0.4s ease"
  });

  const img = document.createElement("img");
  img.src = "/assets/images/preload.gif";
  img.alt = "Loading...";
  img.style.maxWidth = "160px";
  img.style.maxHeight = "160px";

  preloader.appendChild(img);
  document.body.appendChild(preloader);

  // Remove após exatamente 5 segundos
  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => preloader.remove(), 400);
  }, 5000);
}


function init() {
  setupPreloader();
  updateYear();
  wireProductCards();
  wireCartControls();
  wireNav();
  updateCartBadge();
  renderCart();
}

document.addEventListener("DOMContentLoaded", init);
