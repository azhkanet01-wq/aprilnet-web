document.addEventListener('DOMContentLoaded', () => {
    // Toggle Hamburger Menu Mobile
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
});

// Tutup menu mobile
function tutupMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu && navLinks) {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    }
}

// Switch Tab Paket
function switchTab(tabId, event) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Control Promo Slider
let currentPromoIndex = 0;
function movePromo(direction) {
    const promoSlides = document.getElementById('promoSlides');
    const totalSlides = 3;
    currentPromoIndex += direction;

    if (currentPromoIndex < 0) {
        currentPromoIndex = totalSlides - 1;
    } else if (currentPromoIndex >= totalSlides) {
        currentPromoIndex = 0;
    }

    const offset = -currentPromoIndex * 33.333;
    promoSlides.style.transform = `translateX(${offset}%)`;
}

// Buka Formulir Pendaftaran
function bukaPendaftaran(namaPaket) {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('halaman-daftar').style.display = 'block';
    document.getElementById('inputPaket').value = namaPaket;
    window.scrollTo(0, 0);
}

// Tutup Formulir Pendaftaran
function tutupPendaftaran() {
    document.getElementById('halaman-daftar').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
}

function tutupClientArea() {}
function bukaClientArea() {}

// Kirim Form ke WA
function kirimPendaftaran(event) {
    event.preventDefault();
    const paket = document.getElementById('inputPaket').value;
    const nama = document.getElementById('regNama').value;
    const alamat = document.getElementById('regAlamat').value;

    const pesan = `Halo PELANGINET, saya ingin mendaftar paket internet:%0A%0A- *Paket*: ${paket}%0A- *Nama*: ${nama}%0A- *Alamat*: ${alamat}`;
    window.open(`https://wa.me/6285715708144?text=${pesan}`, '_blank');
}