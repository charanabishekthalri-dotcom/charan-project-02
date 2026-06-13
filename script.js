/* ---------- Product data ---------- */
const products = [
  { id:1, name:"Linen Co-ord Set", brand:"VESTRA Studio", price:2499, mrp:3499, cat:"women", badge:"NEW",
    img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop" },
  { id:2, name:"Oversized Denim Jacket", brand:"Roadster Co.", price:2999, mrp:4499, cat:"women", badge:"-33%",
    img:"https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop" },
  { id:3, name:"Pleated Midi Skirt", brand:"VESTRA Studio", price:1799, mrp:2299, cat:"women", badge:"",
    img:"https://images.unsplash.com/photo-1583496661160-fb5886a13d77?q=80&w=600&auto=format&fit=crop" },
  { id:4, name:"Silk Wrap Blouse", brand:"Anaya", price:2199, mrp:2999, cat:"women", badge:"",
    img:"https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=600&auto=format&fit=crop" },
  { id:5, name:"Tailored Cotton Shirt", brand:"Indigo Thread", price:1599, mrp:1999, cat:"men", badge:"NEW",
    img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop" },
  { id:6, name:"Relaxed Chino Trousers", brand:"Urban Form", price:1899, mrp:2599, cat:"men", badge:"-27%",
    img:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=600&auto=format&fit=crop" },
  { id:7, name:"Merino Wool Sweater", brand:"Northfield", price:3299, mrp:4199, cat:"men", badge:"",
    img:"https://images.unsplash.com/photo-1614975059251-992f11792b9f?q=80&w=600&auto=format&fit=crop" },
  { id:8, name:"Classic Bomber Jacket", brand:"Urban Form", price:3599, mrp:4999, cat:"men", badge:"",
    img:"https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop" },
  { id:9, name:"Chunky Sole Sneakers", brand:"StrideX", price:2899, mrp:3799, cat:"footwear", badge:"NEW",
    img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop" },
  { id:10, name:"Leather Ankle Boots", brand:"Cobbler & Co.", price:4299, mrp:5499, cat:"footwear", badge:"",
    img:"https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=80&w=600&auto=format&fit=crop" },
  { id:11, name:"Woven Strap Sandals", brand:"StrideX", price:1299, mrp:1699, cat:"footwear", badge:"-24%",
    img:"https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=600&auto=format&fit=crop" },
  { id:12, name:"Canvas Slip-Ons", brand:"Daywalk", price:1099, mrp:1499, cat:"footwear", badge:"",
    img:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600&auto=format&fit=crop" },
  { id:13, name:"Structured Tote Bag", brand:"Anaya", price:1999, mrp:2699, cat:"accessories", badge:"NEW",
    img:"https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=600&auto=format&fit=crop" },
  { id:14, name:"Gold Hoop Earrings", brand:"Lustre", price:699, mrp:999, cat:"accessories", badge:"",
    img:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop" },
  { id:15, name:"Minimalist Watch", brand:"Timeworks", price:2799, mrp:3499, cat:"accessories", badge:"-20%",
    img:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop" },
  { id:16, name:"Wool Blend Scarf", brand:"Northfield", price:899, mrp:1199, cat:"accessories", badge:"",
    img:"https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600&auto=format&fit=crop" },
];

/* ---------- State ---------- */
let cart = [];

/* ---------- Render products ---------- */
const grid = document.getElementById("productGrid");

function renderProducts(filter = "all"){
  grid.innerHTML = "";
  const list = filter === "all" ? products : products.filter(p => p.cat === filter);

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-img">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <button class="quick-add" data-id="${p.id}">Add to Bag</button>
      </div>
      <div class="product-info">
        <h4>${p.brand}</h4>
        <p>${p.name}</p>
        <div class="price-row">
          <span class="price">₹${p.price.toLocaleString("en-IN")}</span>
          <span class="strike">₹${p.mrp.toLocaleString("en-IN")}</span>
          <span class="discount">${Math.round((1 - p.price/p.mrp)*100)}% off</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

renderProducts();

/* ---------- Filters ---------- */
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    renderProducts(chip.dataset.filter);
  });
});

/* ---------- Cart logic ---------- */
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItemsEl = document.getElementById("cartItems");
const cartCountEl = document.getElementById("cartCount");
const cartTotalEl = document.getElementById("cartTotal");
const toast = document.getElementById("toast");

function openCart(){
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("show");
}
function closeCart(){
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("show");
}

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

function addToCart(id){
  const product = products.find(p => p.id === Number(id));
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
  showToast(`${product.name} added to bag`);
  openCart();
}

function removeFromCart(id){
  cart = cart.filter(item => item.id !== Number(id));
  renderCart();
}

function renderCart(){
  // count
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCountEl.textContent = totalQty;

  // items
  if (cart.length === 0){
    cartItemsEl.innerHTML = `<p class="empty-msg">Your bag is empty. Time to fix that.</p>`;
  } else {
    cartItemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-item-info">
          <h5>${item.name}</h5>
          <p>${item.brand} · Qty ${item.qty}</p>
          <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString("en-IN")}</div>
          <button class="cart-item-remove" data-id="${item.id}">Remove</button>
        </div>
      </div>
    `).join("");
  }

  // total
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotalEl.textContent = `₹${total.toLocaleString("en-IN")}`;

  // bind remove buttons
  document.querySelectorAll(".cart-item-remove").forEach(btn => {
    btn.addEventListener("click", () => removeFromCart(btn.dataset.id));
  });
}

/* delegate Add to Bag clicks */
grid.addEventListener("click", e => {
  const btn = e.target.closest(".quick-add");
  if (btn) addToCart(btn.dataset.id);
});

/* ---------- Toast ---------- */
let toastTimer;
function showToast(msg){
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------- Promo form ---------- */
document.getElementById("promoForm").addEventListener("submit", e => {
  e.preventDefault();
  showToast("You're on the list! Watch your inbox.");
  e.target.reset();
});

/* ---------- Mobile menu (simple toggle) ---------- */
document.getElementById("menuBtn").addEventListener("click", () => {
  const nav = document.querySelector(".main-nav");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
  nav.style.flexDirection = "column";
  nav.style.position = "absolute";
  nav.style.top = "100%";
  nav.style.left = "0";
  nav.style.right = "0";
  nav.style.background = "#fffdfa";
  nav.style.padding = "1rem 1.5rem";
  nav.style.borderBottom = "1px solid #e4ddd2";
});
