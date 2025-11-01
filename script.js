// Sample Products Data - GANTI DENGAN DATA PRODUK ANDA
const services = [
    {
        id: 1,
        name: "Service Rutin Motor",
        description: "Service berkala untuk motor Anda, termasuk pengecekan menyeluruh",
        price: 150000,
        image: "Service Rutin",
        category: "service"
    },
    {
        id: 2,
        name: "Tune Up Motor",
        description: "Tune up lengkap untuk performa optimal motor Anda",
        price: 200000,
        image: "Tune Up",
        category: "service"
    },
    {
        id: 9,
        name: "Servis Ringan",
        description: "Perawatan ringan meliputi ganti oli, filter, dan pengecekan dasar",
        price: 100000,
        image: "Servis Ringan",
        category: "service"
    },
    {
        id: 10,
        name: "Servis Berat",
        description: "Perbaikan dan perawatan komprehensif untuk masalah motor yang kompleks",
        price: 500000,
        image: "Servis Berat",
        category: "service"
    }
];

const products = [
    {
        id: 3,
        name: "Oli Mesin Premium",
        description: "Oli mesin berkualitas tinggi untuk berbagai jenis motor",
        price: 100000,
        image: "Oli Mesin",
        category: "product"
    },
    {
        id: 4,
        name: "Ban Motor",
        description: "Ban berkualitas berbagai ukuran dan merek",
        price: 350000,
        image: "Ban Motor",
        category: "product"
    },
    {
        id: 5,
        name: "Kampas Rem",
        description: "Kampas rem original dan aftermarket",
        price: 85000,
        image: "Kampas Rem",
        category: "product"
    },
    {
        id: 6,
        name: "Aki Motor",
        description: "Aki motor berbagai tipe dan kapasitas",
        price: 250000,
        image: "Aki Motor",
        category: "product"
    },
    {
        id: 7,
        name: "Filter Udara",
        description: "Filter udara original untuk berbagai motor",
        price: 75000,
        image: "Filter Udara",
        category: "product"
    },
    {
        id: 8,
        name: "Busi Motor",
        description: "Busi motor berbagai merek dan tipe",
        price: 35000,
        image: "Busi Motor",
        category: "product"
    }
];

const allItems = [...services, ...products];

let cart = [];

// Load services
function loadServices() {
    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = services.map(service => `
        <div class="product-card">
            <div class="product-image">${service.image}</div>
            <div class="product-info">
                <div class="product-name">${service.name}</div>
                <div class="product-description">${service.description}</div>
                <div class="product-price">Mulai dari Rp ${service.price.toLocaleString('id-ID')}</div>
            </div>
        </div>
    `).join('');
}

// Load products
function loadProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">Rp ${product.price.toLocaleString('id-ID')}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Tambah ke Keranjang
                </button>
            </div>
        </div>
    `).join('');
}

// Add to cart
function addToCart(productId) {
    const item = allItems.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({...item, quantity: 1});
    }

    updateCart();
    showNotification('Produk ditambahkan ke keranjang!');
}

// Update cart display
function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Keranjang belanja kosong</div>';
        cartTotal.innerHTML = '';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Hapus</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerHTML = `Total: Rp ${total.toLocaleString('id-ID')}`;
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Open cart modal
function openCart() {
    document.getElementById('cartModal').style.display = 'flex';
}

// Close cart modal
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Checkout via WhatsApp dan Spreadsheet
let isCheckingOut = false; // Flag untuk mencegah double submit

async function checkout() {
    if (cart.length === 0) {
        alert('Keranjang belanja kosong!');
        return;
    }

    // Cegah double submit
    if (isCheckingOut) {
        return;
    }
    isCheckingOut = true;

    // Disable tombol checkout untuk mencegah double click
    const checkoutBtn = document.querySelector('.checkout-btn');
    const originalText = checkoutBtn.textContent;
    checkoutBtn.disabled = true;
    checkoutBtn.textContent = 'Memproses...';
    checkoutBtn.style.opacity = '0.6';

    try {
        // GANTI NOMOR WHATSAPP DI BAWAH INI (gunakan format internasional, contoh: 628123456789)
        const phoneNumber = '6282246194259'; // GANTI DENGAN NOMOR WHATSAPP ANDA
        
        // GANTI URL GOOGLE APPS SCRIPT DI BAWAH INI
        const spreadsheetUrl = 'https://script.google.com/macros/s/AKfycbxaBm5cPFv__jlf1kdpDQxi03ROt4uzbTjeApOD84p2RgUiZQkMN9JoMqq7H_1mu_E/exec'; // GANTI DENGAN URL APPS SCRIPT ANDA
        
        // Kirim data ke Google Spreadsheet
        await sendToSpreadsheet(spreadsheetUrl);
        
        // Buat pesan WhatsApp
        let message = '*Pesanan dari Sister Motor*%0A%0A';
        
        cart.forEach(item => {
            message += `*${item.name}*%0A`;
            message += `Jumlah: ${item.quantity}%0A`;
            message += `Harga: Rp ${item.price.toLocaleString('id-ID')}%0A`;
            message += `Subtotal: Rp ${(item.price * item.quantity).toLocaleString('id-ID')}%0A%0A`;
        });

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `*Total: Rp ${total.toLocaleString('id-ID')}*`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        
        // Buka WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Tutup modal dan reset keranjang setelah berhasil
        setTimeout(() => {
            closeCart();
            cart = [];
            updateCart();
            showNotification('Pesanan berhasil dikirim! Silakan lanjutkan di WhatsApp.');
            
            // Reset flag dan tombol
            isCheckingOut = false;
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = originalText;
            checkoutBtn.style.opacity = '1';
        }, 1500);
        
    } catch (error) {
        console.error('Error saat checkout:', error);
        alert('Terjadi kesalahan. Silakan coba lagi.');
        
        // Reset flag dan tombol jika error
        isCheckingOut = false;
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = originalText;
        checkoutBtn.style.opacity = '1';
    }
}

// Fungsi untuk mengirim data ke Google Spreadsheet
async function sendToSpreadsheet(url) {
    // Skip jika URL belum diganti
    if (url === 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' || !url) {
        console.log('Google Spreadsheet URL belum diatur');
        return;
    }
    
    try {
        const now = new Date();
        const date = now.toLocaleDateString('id-ID');
        const time = now.toLocaleTimeString('id-ID');
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const orderData = {
            date: date,
            time: time,
            items: cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.price * item.quantity
            })),
            total: total
        };
        
        const response = await fetch(url, {
            method: 'POST',
            mode: 'no-cors', // Penting untuk Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        console.log('Data berhasil dikirim ke spreadsheet');
        
    } catch (error) {
        console.error('Error mengirim data ke spreadsheet:', error);
        // Tetap lanjutkan ke WhatsApp meskipun gagal kirim ke spreadsheet
    }
}

// Show notification
function showNotification(message) {
    alert(message);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        closeCart();
    }
}

// Initialize
loadServices();
loadProducts();
updateCart();

// Logo upload handler (optional - untuk preview logo)
// Anda bisa upload gambar logo dengan mengedit HTML atau menggunakan JavaScript