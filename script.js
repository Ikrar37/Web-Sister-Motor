// Sample Products Data - GANTI DENGAN DATA PRODUK ANDA
const services = [
    {
        id: 1,
        name: "Service Rutin Motor",
        description: "Service berkala untuk motor Anda, termasuk pengecekan menyeluruh",
        price: 150000,
        image: "images/Servis rutin.jpg", // GANTI dengan URL gambar Anda
        category: "service"
    },
    {
        id: 2,
        name: "Tune Up Motor",
        description: "Tune up lengkap untuk performa optimal motor Anda",
        price: 200000,
        image: "images/Tune uo.webp", // GANTI dengan URL gambar Anda
        category: "service"
    },
    {
        id: 10,
        name: "Servis Berat",
        description: "Perbaikan dan perawatan komprehensif untuk masalah motor yang kompleks",
        price: 500000,
        image: "images/Servis berat.jpg", // GANTI dengan URL gambar Anda
        category: "service"
    }
];

const products = [
    {
        id: 3,
        name: "Oli Motul",
        description: "Oli mesin berkualitas tinggi untuk berbagai jenis motor",
        price: 100000,
        image: "images/5.png", // GANTI dengan URL gambar Anda
        category: "product"
    },
    {
        id: 4,
        name: "FDR MP Series",
        description: "Ban berkualitas berbagai ukuran dan merek",
        price: 350000,
        image: "images/6.png", // GANTI dengan URL gambar Anda
        category: "product"
    },
    {
        id: 5,
        name: "Kampas Rem",
        description: "Kampas rem original dan aftermarket berkualitas",
        price: 85000,
        image: "images/4.png", // GANTI dengan URL gambar Anda
        category: "product"
    },
    {
        id: 6,
        name: "Aki Motor",
        description: "Aki motor berbagai tipe dan kapasitas",
        price: 250000,
        image: "images/7.png", // GANTI dengan URL gambar Anda
        category: "product"
    },
    {
        id: 7,
        name: "Filter Udara",
        description: "Filter udara original untuk berbagai motor",
        price: 75000,
        image: "images/8.png", // GANTI dengan URL gambar Anda
        category: "product"
    },
    {
        id: 8,
        name: "Busi Motor",
        description: "Busi motor berbagai merek dan tipe",
        price: 35000,
        image: "images/9.png", // GANTI dengan URL gambar Anda
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
            <div class="product-image">
                <img src="${service.image}" 
                     alt="${service.name}" 
                     onerror="this.onerror=null; this.style.display='none'; this.parentElement.innerHTML='<div style=\\'padding:60px 20px;color:#999;text-align:center\\'>📷 Gambar tidak tersedia</div>';">
            </div>
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
            <div class="product-image">
                <img src="${product.image}" 
                     alt="${product.name}"
                     onerror="this.onerror=null; this.style.display='none'; this.parentElement.innerHTML='<div style=\\'padding:60px 20px;color:#999;text-align:center\\'>📷 Gambar tidak tersedia</div>';">
            </div>
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

// Proceed to checkout - show form
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Keranjang belanja kosong!');
        return;
    }
    
    // Tampilkan form checkout
    document.getElementById('checkoutForm').style.display = 'block';
    document.getElementById('checkoutBtn').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'block';
    
    // Scroll ke form
    document.querySelector('.modal-body').scrollTop = document.querySelector('.modal-body').scrollHeight;
}

// Handle file upload preview
document.addEventListener('DOMContentLoaded', function() {
    // Event listener untuk file input
    const paymentProofInput = document.getElementById('paymentProof');
    
    if (paymentProofInput) {
        paymentProofInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                // Validasi ukuran file (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('Ukuran file terlalu besar! Maksimal 5MB');
                    e.target.value = '';
                    return;
                }
                
                // Validasi tipe file
                if (!file.type.match('image.*')) {
                    alert('File harus berupa gambar (JPG, PNG, dll)');
                    e.target.value = '';
                    return;
                }
                
                // Update nama file
                const fileName = file.name;
                document.getElementById('fileName').textContent = '✅ ' + fileName;
                document.getElementById('fileName').style.color = '#25D366';
                
                // Show preview
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('imagePreview');
                    preview.innerHTML = `
                        <p style="margin-bottom: 10px; color: #666; font-size: 0.9rem;">Preview Bukti Pembayaran:</p>
                        <img src="${e.target.result}" alt="Preview Bukti Pembayaran">
                    `;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

// Submit order with buyer data
let isSubmitting = false;

async function submitOrder() {
    if (isSubmitting) {
        return;
    }
    
    // Validasi form
    const name = document.getElementById('buyerName').value.trim();
    const email = document.getElementById('buyerEmail').value.trim();
    const phone = document.getElementById('buyerPhone').value.trim();
    const address = document.getElementById('buyerAddress').value.trim();
    const paymentProof = document.getElementById('paymentProof').files[0];
    
    if (!name || !email || !phone || !address || !paymentProof) {
        alert('Mohon lengkapi semua data yang diperlukan!');
        return;
    }
    
    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Format email tidak valid!');
        return;
    }
    
    // Validasi nomor telepon
    if (phone.length < 10) {
        alert('Nomor WhatsApp tidak valid!');
        return;
    }
    
    isSubmitting = true;
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Memproses...';
    submitBtn.style.opacity = '0.6';
    
    try {
        console.log('Mulai proses submit order...');
        
        // GANTI NOMOR WHATSAPP DI BAWAH INI
        const phoneNumber = '6282246194259';
        
        // GANTI URL GOOGLE APPS SCRIPT DI BAWAH INI
        const spreadsheetUrl = 'https://script.google.com/macros/s/AKfycbwMxgORodZOrksIZHjOhmCREFNYceaULNaVU7mezpj-9VlUhnul6WxmeyDopN8zPatA/exec';
        
        // Convert image to base64
        console.log('Converting image to base64...');
        const base64Image = await fileToBase64(paymentProof);
        console.log('Image converted successfully');
        
        // Kirim data ke Google Spreadsheet dengan data pembeli dan bukti pembayaran
        // Gunakan try-catch terpisah agar WhatsApp tetap terbuka meski spreadsheet gagal
        try {
            console.log('Mengirim data ke spreadsheet...');
            await sendToSpreadsheetWithBuyerData(spreadsheetUrl, {
                name,
                email,
                phone,
                address,
                paymentProof: base64Image
            });
            console.log('Data berhasil dikirim ke spreadsheet');
        } catch (spreadsheetError) {
            console.error('Error kirim ke spreadsheet (tetap lanjut ke WhatsApp):', spreadsheetError);
        }
        
        // Buat pesan WhatsApp
        console.log('Membuat pesan WhatsApp...');
        
        // Format untuk URL (dengan %0A)
        let messageUrl = '*Pesanan dari Sister Motor*%0A%0A';
        messageUrl += '*DATA PEMBELI*%0A';
        messageUrl += `Nama: ${name}%0A`;
        messageUrl += `Email: ${email}%0A`;
        messageUrl += `WhatsApp: ${phone}%0A`;
        messageUrl += `Alamat: ${address}%0A%0A`;
        messageUrl += '*DETAIL PESANAN*%0A';
        
        cart.forEach(item => {
            messageUrl += `*${item.name}*%0A`;
            messageUrl += `Jumlah: ${item.quantity}%0A`;
            messageUrl += `Harga: Rp ${item.price.toLocaleString('id-ID')}%0A`;
            messageUrl += `Subtotal: Rp ${(item.price * item.quantity).toLocaleString('id-ID')}%0A%0A`;
        });

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        messageUrl += `*Total: Rp ${total.toLocaleString('id-ID')}*%0A%0A`;
        messageUrl += 'Bukti pembayaran telah dilampirkan. Terima kasih!';

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${messageUrl}`;
        
        console.log('Redirect ke WhatsApp...');
        
        // Simpan pesan untuk fallback (jika user kembali)
        sessionStorage.setItem('lastOrderMessage', messageUrl.replace(/%0A/g, '\n'));
        
        // Reset form dan keranjang SEBELUM redirect
        cart = [];
        updateCart();
        resetCheckoutForm();
        closeCart();
        
        // Tampilkan konfirmasi dengan countdown
        showRedirectConfirmation(whatsappUrl, 2);
        
    } catch (error) {
        console.error('Error saat submit order:', error);
        alert('Terjadi kesalahan: ' + error.message + '. Silakan coba lagi atau hubungi admin.');
        
        isSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
    }
}

// Fungsi untuk menampilkan konfirmasi dan redirect
function showRedirectConfirmation(whatsappUrl, seconds) {
    // Buat overlay konfirmasi
    const overlay = document.createElement('div');
    overlay.id = 'redirectOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
    
    const confirmBox = document.createElement('div');
    confirmBox.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    `;
    
    confirmBox.innerHTML = `
        <div style="font-size: 60px; margin-bottom: 20px;">✅</div>
        <h2 style="color: #cc0000; margin-bottom: 15px; font-family: 'Montserrat', sans-serif;">Pesanan Berhasil!</h2>
        <p style="margin-bottom: 25px; color: #666; line-height: 1.6;">
            Anda akan diarahkan ke WhatsApp dalam <span id="countdown" style="color: #25D366; font-weight: bold; font-size: 1.2rem;">${seconds}</span> detik
        </p>
        <button onclick="redirectToWhatsApp('${whatsappUrl}')" style="
            background: #25D366;
            color: white;
            border: none;
            padding: 15px 40px;
            font-size: 1.1rem;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
            margin-bottom: 10px;
            width: 100%;
            font-family: 'Montserrat', sans-serif;
        ">
            Buka WhatsApp Sekarang
        </button>
        <button onclick="closeRedirectOverlay()" style="
            background: transparent;
            color: #666;
            border: 2px solid #ddd;
            padding: 12px 40px;
            font-size: 0.95rem;
            border-radius: 8px;
            cursor: pointer;
            width: 100%;
            font-family: 'Poppins', sans-serif;
        ">
            Tutup
        </button>
    `;
    
    overlay.appendChild(confirmBox);
    document.body.appendChild(overlay);
    
    // Countdown
    let timeLeft = seconds;
    const countdownInterval = setInterval(() => {
        timeLeft--;
        const countdownEl = document.getElementById('countdown');
        if (countdownEl) {
            countdownEl.textContent = timeLeft;
        }
        
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            redirectToWhatsApp(whatsappUrl);
        }
    }, 1000);
    
    // Simpan interval ID untuk dibersihkan jika user klik manual
    overlay.dataset.intervalId = countdownInterval;
}

// Fungsi redirect ke WhatsApp
function redirectToWhatsApp(url) {
    closeRedirectOverlay();
    // Gunakan window.location untuk redirect langsung (tidak ada pop-up blocker)
    window.location.href = url;
}

// Fungsi close overlay
function closeRedirectOverlay() {
    const overlay = document.getElementById('redirectOverlay');
    if (overlay) {
        // Clear countdown interval jika ada
        if (overlay.dataset.intervalId) {
            clearInterval(parseInt(overlay.dataset.intervalId));
        }
        overlay.remove();
    }
    
    // Reset flag submitting
    isSubmitting = false;
}

// Convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Send to spreadsheet with buyer data
async function sendToSpreadsheetWithBuyerData(url, buyerData) {
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
            buyerName: buyerData.name,
            buyerEmail: buyerData.email,
            buyerPhone: buyerData.phone,
            buyerAddress: buyerData.address,
            paymentProof: buyerData.paymentProof,
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
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        console.log('Data berhasil dikirim ke spreadsheet');
        
    } catch (error) {
        console.error('Error mengirim data ke spreadsheet:', error);
    }
}

// Reset checkout form
function resetCheckoutForm() {
    document.getElementById('buyerName').value = '';
    document.getElementById('buyerEmail').value = '';
    document.getElementById('buyerPhone').value = '';
    document.getElementById('buyerAddress').value = '';
    document.getElementById('paymentProof').value = '';
    document.getElementById('fileName').textContent = 'Pilih file gambar (JPG, PNG)';
    document.getElementById('imagePreview').innerHTML = '';
    document.getElementById('checkoutForm').style.display = 'none';
    document.getElementById('checkoutBtn').style.display = 'block';
    document.getElementById('submitBtn').style.display = 'none';
}

// Initialize
loadServices();
loadProducts();
updateCart();

// Logo upload handler (optional - untuk preview logo)
// Anda bisa upload gambar logo dengan mengedit HTML atau menggunakan JavaScript