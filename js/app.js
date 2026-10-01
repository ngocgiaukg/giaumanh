/**
 * Hải Sản Giàu Mạnh (giaumanh.com)
 * Ứng dụng Bán hàng & Giao hàng Phường Rạch Giá, An Giang
 */

(function () {
  'use strict';

  // State
  let cart = [];
  let currentCategory = 'all';
  let searchQuery = '';
  let selectedAreaId = 'rg-central';
  let selectedPaymentMethod = 'cod'; // 'cod' or 'vietqr'

  // DOM Elements
  const productsGrid = document.getElementById('products-grid');
  const catTabsContainer = document.getElementById('category-tabs');
  const searchInput = document.getElementById('search-input');
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  const closeCartBtn = document.getElementById('close-drawer-btn');
  const cartBadge = document.getElementById('cart-badge');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartTotalEl = document.getElementById('cart-total');
  const freeshipProgressFill = document.getElementById('freeship-progress-fill');
  const freeshipRemainingText = document.getElementById('freeship-remaining-text');
  const openCheckoutBtn = document.getElementById('open-checkout-btn');

  // Checkout Modal Elements
  const checkoutModal = document.getElementById('checkout-modal');
  const closeCheckoutBtn = document.getElementById('close-checkout-btn');
  const checkoutForm = document.getElementById('checkout-form');
  const checkoutItemsPreview = document.getElementById('checkout-items-preview');
  const checkoutSubtotalEl = document.getElementById('checkout-subtotal');
  const checkoutShipFeeEl = document.getElementById('checkout-ship-fee');
  const checkoutTotalEl = document.getElementById('checkout-total');
  const qrPreviewBox = document.getElementById('qr-payment-preview');
  const qrCodeImg = document.getElementById('qr-code-img');
  const areaSelectCheckout = document.getElementById('checkout-area-select');

  // Quick View Modal
  const quickviewModal = document.getElementById('quickview-modal');
  const closeQuickviewBtn = document.getElementById('close-quickview-btn');
  const quickviewContent = document.getElementById('quickview-dynamic-content');

  // Success Modal
  const successModal = document.getElementById('success-modal');
  const closeSuccessBtn = document.getElementById('close-success-btn');

  // Shipping Calculator
  const calcAreaSelect = document.getElementById('calc-area-select');
  const calcFeeVal = document.getElementById('calc-fee-val');
  const calcTimeVal = document.getElementById('calc-time-val');
  const calcNoteVal = document.getElementById('calc-note-val');

  // Reviews Grid
  const reviewsGrid = document.getElementById('reviews-grid');

  // Initialize
  function init() {
    loadCartFromStorage();
    renderCategoryTabs();
    renderProducts();
    renderReviews();
    setupShippingCalculator();
    setupCountdown();
    setupEventListeners();
    updateCartUI();
  }

  // Format Currency
  function formatMoney(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  }

  // Local Storage Cart
  function loadCartFromStorage() {
    try {
      const saved = localStorage.getItem('giaumanh_cart');
      if (saved) {
        cart = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not parse cart from localStorage:', e);
      cart = [];
    }
  }

  function saveCartToStorage() {
    try {
      localStorage.setItem('giaumanh_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart:', e);
    }
  }

  // Render Category Tabs
  function renderCategoryTabs() {
    if (!catTabsContainer) return;
    catTabsContainer.innerHTML = CATEGORIES.map(cat => `
      <button class="cat-tab-btn ${cat.id === currentCategory ? 'active' : ''}" data-cat-id="${cat.id}">
        <span>${cat.icon}</span>
        <span>${cat.name}</span>
      </button>
    `).join('');

    catTabsContainer.querySelectorAll('.cat-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        catTabsContainer.querySelectorAll('.cat-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-cat-id');
        renderProducts();
      });
    });
  }

  // Render Products
  function renderProducts() {
    if (!productsGrid) return;

    let filtered = PRODUCTS.filter(p => {
      const matchCat = (currentCategory === 'all') || (p.category === currentCategory);
      const matchSearch = searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #fff; border-radius: 16px; border: 1px dashed #cbd5e1;">
          <div style="font-size: 3rem; margin-bottom: 12px;">🌊</div>
          <h3 style="color: var(--color-primary-dark); font-size: 1.2rem; margin-bottom: 8px;">Không tìm thấy hải sản phù hợp</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem;">Vui lòng thử tìm từ khóa khác hoặc liên hệ hotline để đặt hàng theo yêu cầu ghe cập bến.</p>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = filtered.map(p => {
      const oldPriceHtml = p.originalPrice ? `<span class="price-old">${formatMoney(p.originalPrice)}</span>` : '';
      return `
        <article class="product-card" data-product-id="${p.id}">
          <div class="card-img-wrapper">
            <img src="${p.image}" alt="${p.name}" class="card-img" loading="lazy" />
            <div class="card-badges">
              <span class="badge-tag ${p.badgeType || 'hot'}">${p.badge}</span>
            </div>
            <button class="quick-view-btn" data-action="quickview" data-id="${p.id}">
              🔍 Xem Chi Tiết
            </button>
          </div>
          <div class="card-body">
            <div class="card-freshness">
              <span>⚓</span>
              <span>${p.freshness}</span>
            </div>
            <h3 class="card-title" data-action="quickview" data-id="${p.id}" style="cursor: pointer;">${p.name}</h3>
            <p class="card-desc">${p.description}</p>
            <div class="card-price-row">
              <div>
                <span class="price-main">${formatMoney(p.price)}</span>
                ${oldPriceHtml}
              </div>
              <span class="price-unit">/${p.unit}</span>
            </div>
            <div class="card-action-row">
              <div class="qty-control">
                <button type="button" class="qty-btn minus" data-id="${p.id}">-</button>
                <input type="number" class="qty-input" id="qty-${p.id}" value="1" min="1" max="50" readonly />
                <button type="button" class="qty-btn plus" data-id="${p.id}">+</button>
              </div>
              <button class="btn-add-cart" data-action="add-cart" data-id="${p.id}">
                <span>🛒</span>
                <span>Thêm Giỏ</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach Event Handlers for Product Cards
    productsGrid.querySelectorAll('.qty-btn.minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const input = document.getElementById(`qty-${id}`);
        let val = parseInt(input.value, 10) || 1;
        if (val > 1) input.value = val - 1;
      });
    });

    productsGrid.querySelectorAll('.qty-btn.plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const input = document.getElementById(`qty-${id}`);
        let val = parseInt(input.value, 10) || 1;
        input.value = val + 1;
      });
    });

    productsGrid.querySelectorAll('[data-action="add-cart"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const input = document.getElementById(`qty-${id}`);
        const qty = parseInt(input ? input.value : 1, 10) || 1;
        addToCart(id, qty);
      });
    });

    productsGrid.querySelectorAll('[data-action="quickview"]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = el.getAttribute('data-id');
        openQuickView(id);
      });
    });
  }

  // Add to Cart
  function addToCart(productId, quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        image: product.image,
        quantity: quantity
      });
    }

    saveCartToStorage();
    updateCartUI();
    playSound('add');
    showToast(`Đã thêm ${quantity} ${product.unit} ${product.name} vào giỏ!`);

    // Animate badge
    if (cartBadge) {
      cartBadge.style.transform = 'scale(1.4)';
      setTimeout(() => { cartBadge.style.transform = 'scale(1)'; }, 200);
    }
  }

  // Update Cart Quantity
  function updateCartItemQty(productId, delta) {
    const index = cart.findIndex(i => i.id === productId);
    if (index === -1) return;

    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }

    saveCartToStorage();
    updateCartUI();
  }

  // Remove Item
  function removeCartItem(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCartToStorage();
    updateCartUI();
    showToast('Đã xóa món khỏi giỏ hàng');
  }

  // Update Cart UI
  function updateCartUI() {
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    if (cartBadge) {
      cartBadge.textContent = totalCount;
      cartBadge.style.display = totalCount > 0 ? 'flex' : 'none';
    }

    if (cartSubtotalEl) cartSubtotalEl.textContent = formatMoney(subtotal);
    if (cartTotalEl) cartTotalEl.textContent = formatMoney(subtotal);

    // Freeship Progress
    const threshold = STORE_CONFIG.freeShipThreshold;
    if (freeshipProgressFill && freeshipRemainingText) {
      if (subtotal >= threshold) {
        freeshipProgressFill.style.width = '100%';
        freeshipRemainingText.innerHTML = `🎉 Chúc mừng! Đơn hàng được <strong>FREESHIP</strong> tại Rạch Giá!`;
      } else {
        const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
        freeshipProgressFill.style.width = `${pct}%`;
        const diff = threshold - subtotal;
        freeshipRemainingText.innerHTML = `Mua thêm <strong>${formatMoney(diff)}</strong> để được <strong>FREESHIP</strong>`;
      }
    }

    // Render Drawer Items
    if (cartItemsList) {
      if (cart.length === 0) {
        cartItemsList.innerHTML = `
          <div class="empty-cart-state">
            <div class="empty-cart-icon">🛒</div>
            <h4>Giỏ hàng của bạn đang trống</h4>
            <p style="font-size: 0.85rem; margin-top: 6px;">Hãy chọn các món hải sản tươi ngon ghe câu sáng nay để thêm vào giỏ nhé!</p>
          </div>
        `;
        if (openCheckoutBtn) openCheckoutBtn.disabled = true;
      } else {
        if (openCheckoutBtn) openCheckoutBtn.disabled = false;
        cartItemsList.innerHTML = cart.map(item => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
            <div class="cart-item-details">
              <span class="cart-item-name">${item.name}</span>
              <span class="cart-item-price">${formatMoney(item.price)} / ${item.unit}</span>
              <div class="cart-item-footer">
                <div class="cart-qty-ctrl">
                  <button class="cart-qty-btn" data-action="cart-minus" data-id="${item.id}">-</button>
                  <span class="cart-qty-num">${item.quantity}</span>
                  <button class="cart-qty-btn" data-action="cart-plus" data-id="${item.id}">+</button>
                </div>
                <button class="cart-item-remove" data-action="cart-remove" data-id="${item.id}">
                  🗑️ Xóa
                </button>
              </div>
            </div>
          </div>
        `).join('');

        cartItemsList.querySelectorAll('[data-action="cart-minus"]').forEach(btn => {
          btn.addEventListener('click', () => updateCartItemQty(btn.getAttribute('data-id'), -1));
        });
        cartItemsList.querySelectorAll('[data-action="cart-plus"]').forEach(btn => {
          btn.addEventListener('click', () => updateCartItemQty(btn.getAttribute('data-id'), 1));
        });
        cartItemsList.querySelectorAll('[data-action="cart-remove"]').forEach(btn => {
          btn.addEventListener('click', () => removeCartItem(btn.getAttribute('data-id')));
        });
      }
    }
  }

  // Quick View Modal Open
  function openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || !quickviewModal || !quickviewContent) return;

    quickviewContent.innerHTML = `
      <div class="quickview-grid">
        <div class="quickview-img-box">
          <img src="${product.image}" alt="${product.name}" class="quickview-img" />
        </div>
        <div class="quickview-info">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
            <span class="badge-tag ${product.badgeType || 'hot'}">${product.badge}</span>
            <span style="font-size: 0.8rem; color: #0d9488; font-weight: 600;">⚓ ${product.freshness}</span>
          </div>
          <h2>${product.name}</h2>
          <div class="quickview-price-bar">
            <span class="price-main" style="font-size: 1.6rem;">${formatMoney(product.price)}</span>
            <span class="price-unit">/${product.unit}</span>
            ${product.originalPrice ? `<span class="price-old">${formatMoney(product.originalPrice)}</span>` : ''}
          </div>
          <p class="quickview-desc">${product.description}</p>
          <div class="quickview-specs">
            <div class="spec-line">
              <strong>Kích thước:</strong>
              <span>${product.details.size}</span>
            </div>
            <div class="spec-line">
              <strong>Hỗ trợ sơ chế:</strong>
              <span>${product.details.soChe}</span>
            </div>
            <div class="spec-line">
              <strong>Cách bảo quản:</strong>
              <span>${product.details.baoQuan}</span>
            </div>
            <div class="spec-line" style="flex-direction: column; gap: 4px;">
              <strong>Gợi ý món ngon:</strong>
              <div class="recipe-tags">
                ${product.details.monNgon.map(m => `<span class="recipe-tag">🍲 ${m}</span>`).join('')}
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 12px; align-items: center;">
            <div class="qty-control" style="height: 44px;">
              <button type="button" class="qty-btn" id="qv-minus">-</button>
              <input type="number" class="qty-input" id="qv-qty" value="1" min="1" max="50" readonly />
              <button type="button" class="qty-btn" id="qv-plus">+</button>
            </div>
            <button class="btn-primary" id="qv-add-btn" style="flex: 1; justify-content: center; height: 44px;">
              🛒 Thêm Vào Giỏ Hàng
            </button>
          </div>
        </div>
      </div>
    `;

    // Modal Qty
    const qvMinus = document.getElementById('qv-minus');
    const qvPlus = document.getElementById('qv-plus');
    const qvQty = document.getElementById('qv-qty');
    const qvAddBtn = document.getElementById('qv-add-btn');

    if (qvMinus && qvPlus && qvQty) {
      qvMinus.addEventListener('click', () => {
        let v = parseInt(qvQty.value, 10) || 1;
        if (v > 1) qvQty.value = v - 1;
      });
      qvPlus.addEventListener('click', () => {
        let v = parseInt(qvQty.value, 10) || 1;
        qvQty.value = v + 1;
      });
    }

    if (qvAddBtn && qvQty) {
      qvAddBtn.addEventListener('click', () => {
        const qty = parseInt(qvQty.value, 10) || 1;
        addToCart(product.id, qty);
        closeModal(quickviewModal);
      });
    }

    openModal(quickviewModal);
  }

  // Open Checkout Modal
  function openCheckout() {
    if (cart.length === 0) {
      showToast('Giỏ hàng chưa có sản phẩm nào!');
      return;
    }

    closeCartDrawer();
    populateCheckoutAreas();
    updateCheckoutSummary();
    openModal(checkoutModal);
  }

  function populateCheckoutAreas() {
    if (!areaSelectCheckout) return;
    areaSelectCheckout.innerHTML = RACH_GIA_AREAS.map(area => `
      <option value="${area.id}" ${area.id === selectedAreaId ? 'selected' : ''}>
        ${area.name} - Phí: ${area.fee === 0 ? 'Freeship' : formatMoney(area.fee)} (${area.time})
      </option>
    `).join('');
  }

  function updateCheckoutSummary() {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const area = RACH_GIA_AREAS.find(a => a.id === selectedAreaId) || RACH_GIA_AREAS[0];

    // Shipping fee calculation
    let shipFee = area.fee;
    if (subtotal >= STORE_CONFIG.freeShipThreshold) {
      shipFee = 0;
    }

    const total = subtotal + shipFee;

    if (checkoutItemsPreview) {
      checkoutItemsPreview.innerHTML = cart.map(item => `
        <div class="checkout-item-row">
          <span>${item.name} <strong>x${item.quantity}</strong></span>
          <span>${formatMoney(item.price * item.quantity)}</span>
        </div>
      `).join('');
    }

    if (checkoutSubtotalEl) checkoutSubtotalEl.textContent = formatMoney(subtotal);
    if (checkoutShipFeeEl) {
      checkoutShipFeeEl.textContent = shipFee === 0 ? 'Miễn phí (Freeship)' : formatMoney(shipFee);
      checkoutShipFeeEl.style.color = shipFee === 0 ? '#10b981' : '#ef476f';
    }
    if (checkoutTotalEl) checkoutTotalEl.textContent = formatMoney(total);

    // QR / MoMo Payment Update
    const qrTitle = document.getElementById('qr-payment-title');
    const qrDetails = document.getElementById('qr-payment-details');

    if (selectedPaymentMethod === 'momo' && qrPreviewBox && qrCodeImg) {
      qrPreviewBox.style.display = 'block';
      const orderHint = 'GM' + Math.floor(100000 + Math.random() * 900000);
      const momoPhone = STORE_CONFIG.momo;
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`2|99|${momoPhone}|||0|0|${total}|GIAUMANH ${orderHint}|transfer_p2p`)}`;
      qrCodeImg.src = qrUrl;
      if (qrTitle) qrTitle.textContent = 'Quét mã Ví MoMo để chuyển khoản nhanh:';
      if (qrDetails) {
        qrDetails.innerHTML = `
          <div>👛 Ví MoMo: <strong>0969 474 065</strong></div>
          <div>👤 Chủ tài khoản: <strong>Tran Thi Ngoc Giau</strong></div>
          <div>💰 Số tiền: <strong>${formatMoney(total)}</strong></div>
          <div>📝 Nội dung: <strong>GIAUMANH ${orderHint}</strong></div>
          <div style="margin-top: 8px; font-size: 0.85rem; color: #a50064; font-weight: 600;">📱 Quét mã bằng App MoMo hoặc Ngân Hàng bất kỳ</div>
        `;
      }
    } else if (selectedPaymentMethod === 'vietqr' && qrPreviewBox && qrCodeImg) {
      qrPreviewBox.style.display = 'block';
      const orderHint = 'GM' + Math.floor(100000 + Math.random() * 900000);
      const bank = STORE_CONFIG.bankInfo;
      const qrUrl = `https://img.vietqr.io/image/${bank.bankId}-${bank.accountNo}-compact2.png?amount=${total}&addInfo=${encodeURIComponent(orderHint)}&accountName=${encodeURIComponent(bank.accountName)}`;
      qrCodeImg.src = qrUrl;
      if (qrTitle) qrTitle.textContent = 'Quét mã VietQR Napas (MBBank):';
      if (qrDetails) {
        qrDetails.innerHTML = `
          <div>🏦 Ngân hàng: <strong>MBBank (Quân Đội)</strong></div>
          <div>🔢 Số TK: <strong>${bank.accountNo}</strong></div>
          <div>👤 Chủ tài khoản: <strong>Tran Thi Ngoc Giau</strong></div>
          <div>💰 Số tiền: <strong>${formatMoney(total)}</strong></div>
          <div>📝 Nội dung: <strong>GIAUMANH ${orderHint}</strong></div>
        `;
      }
    } else if (qrPreviewBox) {
      qrPreviewBox.style.display = 'none';
    }
  }

  // Complete Order
  function handleOrderSubmit(e) {
    e.preventDefault();
    if (cart.length === 0) return;

    const name = document.getElementById('checkout-name').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const address = document.getElementById('checkout-address').value.trim();
    const note = document.getElementById('checkout-note').value.trim();
    const timeSlot = document.getElementById('checkout-time-slot').value;

    if (!name || !phone || !address) {
      showToast('Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ giao hàng');
      return;
    }

    const area = RACH_GIA_AREAS.find(a => a.id === selectedAreaId) || RACH_GIA_AREAS[0];
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipFee = subtotal >= STORE_CONFIG.freeShipThreshold ? 0 : area.fee;
    const grandTotal = subtotal + shipFee;
    const orderCode = 'HSGM-' + Math.floor(100000 + Math.random() * 900000);

    const orderData = {
      orderCode,
      customer: { name, phone, address, areaName: area.name },
      note,
      timeSlot,
      paymentMethod: selectedPaymentMethod,
      items: [...cart],
      subtotal,
      shipFee,
      grandTotal,
      createdAt: new Date().toLocaleString('vi-VN')
    };

    // Save to order history in localStorage
    try {
      let orders = JSON.parse(localStorage.getItem('giaumanh_orders') || '[]');
      orders.unshift(orderData);
      localStorage.setItem('giaumanh_orders', JSON.stringify(orders));
    } catch (err) {
      console.warn('Could not save order history', err);
    }

    // Clear Cart
    cart = [];
    saveCartToStorage();
    updateCartUI();

    // Close Checkout Modal
    closeModal(checkoutModal);

    // Play celebration sound
    playSound('success');

    // Show Success Modal
    showOrderSuccess(orderData);
  }

  function showOrderSuccess(order) {
    if (!successModal) return;
    const codeEl = document.getElementById('success-order-code');
    const descEl = document.getElementById('success-order-desc');
    const zaloBtn = document.getElementById('success-zalo-btn');

    if (codeEl) codeEl.textContent = `Mã Đơn: #${order.orderCode}`;
    if (descEl) {
      descEl.innerHTML = `
        Cảm ơn <strong>${order.customer.name}</strong>! Đơn hàng của bạn trị giá <strong>${formatMoney(order.grandTotal)}</strong> đã được tiếp nhận.<br/>
        Giao hàng tới: <strong>${order.customer.address}, ${order.customer.areaName}</strong>.<br/>
        Đội ngũ Hải Sản Giàu Mạnh sẽ gọi xác nhận trong 5 phút và chuyển đơn hàng ướp đá ngay!
      `;
    }

    if (zaloBtn) {
      const zaloMsg = encodeURIComponent(`Chào Hải Sản Giàu Mạnh, tôi vừa đặt đơn hàng #${order.orderCode} trị giá ${formatMoney(order.grandTotal)} giao tại Phường Rạch Giá, vui lòng xác nhận giúp tôi nhé!`);
      zaloBtn.href = `https://zalo.me/${STORE_CONFIG.zalo}?text=${zaloMsg}`;
    }

    openModal(successModal);
  }

  // Shipping Calculator Setup
  function setupShippingCalculator() {
    if (!calcAreaSelect) return;
    calcAreaSelect.innerHTML = RACH_GIA_AREAS.map(a => `
      <option value="${a.id}">${a.name}</option>
    `).join('');

    calcAreaSelect.addEventListener('change', () => {
      const selected = RACH_GIA_AREAS.find(a => a.id === calcAreaSelect.value);
      if (!selected) return;
      if (calcFeeVal) calcFeeVal.textContent = selected.fee === 0 ? 'Freeship (0đ)' : formatMoney(selected.fee);
      if (calcTimeVal) calcTimeVal.textContent = `⚡ Giao hỏa tốc trong ${selected.time}`;
      if (calcNoteVal) calcNoteVal.textContent = `Ghi chú: ${selected.note}`;
    });

    // Trigger initial change
    calcAreaSelect.dispatchEvent(new Event('change'));
  }

  // Render Reviews
  function renderReviews() {
    if (!reviewsGrid) return;
    reviewsGrid.innerHTML = REVIEWS.map(r => `
      <div class="review-card">
        <div class="review-header">
          <img src="${r.avatar}" alt="${r.author}" class="review-avatar" />
          <div>
            <div class="reviewer-name">${r.author}</div>
            <div class="reviewer-loc">📍 ${r.address}</div>
          </div>
        </div>
        <div class="star-rating">⭐⭐⭐⭐⭐ <span style="font-size: 0.75rem; color: #64748b; font-weight: 500;">(${r.date})</span></div>
        <p class="review-text">"${r.content}"</p>
        <span class="review-item-tag">Đã mua: ${r.item}</span>
      </div>
    `).join('');
  }

  // Live Countdown to Boat Arrival (8:30 AM or 14:30)
  function setupCountdown() {
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    function update() {
      const now = new Date();
      // Target next 8:30 AM
      let target = new Date();
      target.setHours(8, 30, 0, 0);

      if (now > target) {
        // Target next afternoon boat 14:30
        let targetPM = new Date();
        targetPM.setHours(14, 30, 0, 0);
        if (now > targetPM) {
          // Target tomorrow 8:30 AM
          target.setDate(target.getDate() + 1);
        } else {
          target = targetPM;
        }
      }

      const diff = Math.max(0, target - now);
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  // Toast Notification
  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✨</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3200);
  }

  // Modal Helpers
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openCartDrawer() {
    if (cartDrawer) cartDrawer.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    if (cartDrawer) cartDrawer.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Setup Event Listeners
  function setupEventListeners() {
    // Search
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderProducts();
      });
    }

    // Cart Drawer Toggle
    if (cartToggleBtn) {
      cartToggleBtn.addEventListener('click', openCartDrawer);
    }
    if (closeCartBtn) {
      closeCartBtn.addEventListener('click', closeCartDrawer);
    }
    if (cartOverlay) {
      cartOverlay.addEventListener('click', closeCartDrawer);
    }

    // Checkout
    if (openCheckoutBtn) {
      openCheckoutBtn.addEventListener('click', openCheckout);
    }
    if (closeCheckoutBtn) {
      closeCheckoutBtn.addEventListener('click', () => closeModal(checkoutModal));
    }
    if (checkoutModal) {
      checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) closeModal(checkoutModal);
      });
    }
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', handleOrderSubmit);
    }

    // Quick View Close
    if (closeQuickviewBtn) {
      closeQuickviewBtn.addEventListener('click', () => closeModal(quickviewModal));
    }
    if (quickviewModal) {
      quickviewModal.addEventListener('click', (e) => {
        if (e.target === quickviewModal) closeModal(quickviewModal);
      });
    }

    // Success Modal Close
    if (closeSuccessBtn) {
      closeSuccessBtn.addEventListener('click', () => closeModal(successModal));
    }
    if (successModal) {
      successModal.addEventListener('click', (e) => {
        if (e.target === successModal) closeModal(successModal);
      });
    }

    // Payment Radio Switch
    const payRadios = document.querySelectorAll('input[name="payment-method"]');
    payRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        selectedPaymentMethod = radio.value;
        document.querySelectorAll('.pay-radio-label').forEach(lbl => lbl.classList.remove('selected'));
        if (radio.parentElement) radio.parentElement.classList.add('selected');
        updateCheckoutSummary();
      });
    });

    // Checkout Area Select Change
    if (areaSelectCheckout) {
      areaSelectCheckout.addEventListener('change', () => {
        selectedAreaId = areaSelectCheckout.value;
        updateCheckoutSummary();
      });
    }

    // Orders Management Modal Toggle
    const ordersToggleBtn = document.getElementById('orders-toggle-btn');
    const ordersModal = document.getElementById('orders-modal');
    const closeOrdersBtn = document.getElementById('close-orders-btn');

    if (ordersToggleBtn) {
      ordersToggleBtn.addEventListener('click', openOrdersModal);
    }
    if (closeOrdersBtn) {
      closeOrdersBtn.addEventListener('click', () => closeModal(ordersModal));
    }
    if (ordersModal) {
      ordersModal.addEventListener('click', (e) => {
        if (e.target === ordersModal) closeModal(ordersModal);
      });
    }

    // MoMo Quick Modal
    const floatMomoBtn = document.getElementById('float-momo-btn');
    const momoModal = document.getElementById('momo-modal');
    const closeMomoBtn = document.getElementById('close-momo-btn');
    const copyMomoBtn = document.getElementById('copy-momo-number-btn');

    if (floatMomoBtn && momoModal) {
      floatMomoBtn.addEventListener('click', () => openModal(momoModal));
    }
    if (closeMomoBtn && momoModal) {
      closeMomoBtn.addEventListener('click', () => closeModal(momoModal));
    }
    if (momoModal) {
      momoModal.addEventListener('click', (e) => {
        if (e.target === momoModal) closeModal(momoModal);
      });
    }
    if (copyMomoBtn) {
      copyMomoBtn.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText('0969474065').then(() => {
            showToast('Đã sao chép số Ví MoMo: 0969 474 065!');
          }).catch(() => {
            showToast('Số MoMo: 0969 474 065 (Tran Thi Ngoc Giau)');
          });
        } else {
          showToast('Số MoMo: 0969 474 065 (Tran Thi Ngoc Giau)');
        }
      });
    }
  }

  // Sound Effects using Web Audio API
  function playSound(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (type === 'add') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'success') {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.value = freq;
          const start = ctx.currentTime + i * 0.08;
          gain.gain.setValueAtTime(0.15, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(start);
          osc.stop(start + 0.35);
        });
      }
    } catch (e) {
      // Audio not allowed or failed
    }
  }

  // Open Orders Management Modal
  function openOrdersModal() {
    const ordersModal = document.getElementById('orders-modal');
    const ordersListBody = document.getElementById('orders-list-body');
    if (!ordersModal || !ordersListBody) return;

    let orders = [];
    try {
      orders = JSON.parse(localStorage.getItem('giaumanh_orders') || '[]');
    } catch (e) {
      orders = [];
    }

    if (orders.length === 0) {
      ordersListBody.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
          <div style="font-size: 3rem; margin-bottom: 12px;">📋</div>
          <h4 style="color: var(--color-primary-dark); font-size: 1.15rem; margin-bottom: 6px;">Chưa có đơn hàng nào được ghi nhận</h4>
          <p style="font-size: 0.9rem;">Khi bạn hoặc khách hàng đặt hàng qua website, thông tin đơn sẽ được lưu tự động tại đây để quản lý và in phiếu giao hàng.</p>
        </div>
      `;
    } else {
      ordersListBody.innerHTML = orders.map((order, idx) => `
        <div class="order-card-item">
          <div class="order-card-header">
            <div>
              <span class="order-code-text">Đơn #${order.orderCode}</span>
              <span style="font-size: 0.8rem; color: #64748b; margin-left: 8px;">(${order.createdAt})</span>
            </div>
            <span class="order-status-badge">🟢 Đang chuẩn bị giao</span>
          </div>
          <div class="order-card-details">
            <div>👤 <strong>Khách hàng:</strong> ${order.customer.name}</div>
            <div>📞 <strong>Điện thoại:</strong> <a href="tel:${order.customer.phone}" style="color: var(--color-primary); font-weight: 700;">${order.customer.phone}</a></div>
            <div>📍 <strong>Khu vực:</strong> ${order.customer.areaName}</div>
            <div>🏠 <strong>Địa chỉ:</strong> ${order.customer.address}</div>
            <div>⏰ <strong>Giờ giao:</strong> ${order.timeSlot}</div>
            <div>💳 <strong>Thanh toán:</strong> ${order.paymentMethod === 'vietqr' ? 'Quét mã VietQR' : 'Tiền mặt (COD)'}</div>
          </div>
          ${order.note ? `<div style="font-size: 0.82rem; background: #fff; padding: 6px 10px; border-radius: 4px; border-left: 3px solid var(--color-gold);">📝 <strong>Ghi chú sơ chế:</strong> ${order.note}</div>` : ''}
          <div class="order-items-mini-list">
            ${order.items.map(it => `
              <div style="display: flex; justify-content: space-between;">
                <span>${it.name} (x${it.quantity} ${it.unit})</span>
                <span style="font-weight: 600;">${formatMoney(it.price * it.quantity)}</span>
              </div>
            `).join('')}
          </div>
          <div class="order-card-actions">
            <div>
              <span style="font-size: 0.88rem; color: #64748b;">Tổng tiền: </span>
              <span style="font-size: 1.15rem; font-weight: 800; color: var(--color-coral);">${formatMoney(order.grandTotal)}</span>
            </div>
            <div style="display: flex; gap: 8px;">
              <button type="button" class="btn-print-receipt" data-action="print-order" data-index="${idx}">
                🖨️ In Phiếu Giao Hàng
              </button>
              <button type="button" class="btn-print-receipt" data-action="delete-order" data-index="${idx}" style="color: #ef476f; border-color: #fecdd3;">
                🗑️ Xóa
              </button>
            </div>
          </div>
        </div>
      `).join('');

      ordersListBody.querySelectorAll('[data-action="print-order"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-index'), 10);
          printOrderReceipt(orders[idx]);
        });
      });

      ordersListBody.querySelectorAll('[data-action="delete-order"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-index'), 10);
          orders.splice(idx, 1);
          localStorage.setItem('giaumanh_orders', JSON.stringify(orders));
          openOrdersModal();
          showToast('Đã xóa đơn hàng thành công');
        });
      });
    }

    openModal(ordersModal);
  }

  // Print Delivery Slip
  function printOrderReceipt(order) {
    const printArea = document.getElementById('printable-receipt-area');
    if (!printArea) return;

    printArea.innerHTML = `
      <div style="max-width: 500px; margin: 20px auto; padding: 24px; border: 1px solid #000; font-family: sans-serif; line-height: 1.5;">
        <div style="text-align: center; border-bottom: 2px dashed #000; padding-bottom: 12px; margin-bottom: 14px;">
          <h2 style="margin: 0; font-size: 1.4rem;">HẢI SẢN GIÀU MẠNH</h2>
          <p style="margin: 4px 0; font-size: 0.85rem;">giaumanh.com • Hotline / MoMo / Zalo: 0969 474 065</p>
          <p style="margin: 2px 0; font-size: 0.85rem;">Địa chỉ: 72 đường Chu Văn An, Phường Rạch Giá, Tỉnh An Giang</p>
          <h3 style="margin: 10px 0 0; font-size: 1.15rem;">PHIẾU ĐÓNG THÙNG & GIAO HÀNG</h3>
          <p style="margin: 2px 0; font-weight: bold;">Mã đơn: #${order.orderCode}</p>
          <p style="margin: 0; font-size: 0.8rem; color: #555;">Thời gian tạo: ${order.createdAt}</p>
        </div>
        <div style="margin-bottom: 14px; font-size: 0.9rem;">
          <p style="margin: 4px 0;"><strong>Khách hàng:</strong> ${order.customer.name}</p>
          <p style="margin: 4px 0;"><strong>Số điện thoại:</strong> ${order.customer.phone}</p>
          <p style="margin: 4px 0;"><strong>Địa chỉ giao:</strong> ${order.customer.address}, ${order.customer.areaName}</p>
          <p style="margin: 4px 0;"><strong>Giờ giao yêu cầu:</strong> ${order.timeSlot}</p>
          ${order.note ? `<p style="margin: 4px 0;"><strong>Ghi chú sơ chế:</strong> ${order.note}</p>` : ''}
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 0.88rem;">
          <thead>
            <tr style="border-bottom: 1px solid #000;">
              <th style="text-align: left; padding: 6px 0;">Món hải sản</th>
              <th style="text-align: center; padding: 6px 0;">SL</th>
              <th style="text-align: right; padding: 6px 0;">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(it => `
              <tr style="border-bottom: 1px dotted #ccc;">
                <td style="padding: 6px 0;">${it.name}</td>
                <td style="text-align: center; padding: 6px 0;">${it.quantity}</td>
                <td style="text-align: right; padding: 6px 0;">${formatMoney(it.price * it.quantity)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div style="border-top: 1px solid #000; padding-top: 8px; font-size: 0.92rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Tiền hàng:</span>
            <span>${formatMoney(order.subtotal)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Phí giao hàng:</span>
            <span>${order.shipFee === 0 ? 'Miễn phí' : formatMoney(order.shipFee)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 1.1rem; font-weight: bold; margin-top: 6px; border-top: 2px dashed #000; padding-top: 6px;">
            <span>TỔNG THU:</span>
            <span>${formatMoney(order.grandTotal)}</span>
          </div>
          <div style="margin-top: 4px; font-style: italic; font-size: 0.82rem;">
            Hình thức: ${order.paymentMethod === 'vietqr' ? 'Đã quét QR Napas' : 'Thu tiền mặt khi nhận hàng (COD)'}
          </div>
        </div>
        <div style="margin-top: 16px; border-top: 1px dashed #000; padding-top: 10px; font-size: 0.8rem; text-align: center;">
          <p style="margin: 2px 0;">[x] Đã ướp đá thùng xốp | [x] Đã tặng muối ớt xanh</p>
          <p style="margin: 2px 0; font-weight: bold;">Cảm ơn quý khách đã tin dùng Hải Sản Giàu Mạnh!</p>
        </div>
      </div>
    `;

    printArea.style.display = 'block';
    window.print();
    printArea.style.display = 'none';
  }

  // Run on DOM ready
  document.addEventListener('DOMContentLoaded', init);
})();
