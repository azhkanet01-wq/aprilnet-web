document.addEventListener('DOMContentLoaded', () => {
    // 1. Hamburger Menu Mobile
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            navLinks.classList.toggle('active');
        });
    }

    // 2. Tab Paket Internet
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetId) {
                    content.classList.add('active');
                }
            });
        });
    });

    // 3. Form Pendaftaran ke WhatsApp
    const formDaftar = document.getElementById('formPendaftaran');

    if (formDaftar) {
        formDaftar.addEventListener('submit', function(e) {
            e.preventDefault();

            const paket = document.getElementById('inputPaket').value;
            const nama = document.getElementById('regNama').value;
            const alamat = document.getElementById('regAlamat').value;

            const noWA = "6285715708144"; 

            const pesan = `Halo PELANGINET, saya ingin mendaftar pemasangan internet.%0A%0A` +
                          `*Detail Pendaftaran:*%0A` +
                          `- Paket: ${paket}%0A` +
                          `- Nama: ${nama}%0A` +
                          `- Alamat: ${alamat}%0A%0A` +
                          `Mohon segera diproses, terima kasih.`;

            const urlWA = `https://wa.me/${noWA}?text=${pesan}`;
            window.open(urlWA, '_blank');
        });
    }

    // 4. Auto Slide Promo
    setInterval(() => {
        movePromo(1);
    }, 5000);
});

// Menutup Navigasi Mobile
function tutupMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle) {
        menuToggle.classList.remove('is-active');
        navLinks.classList.remove('active');
    }
}

// Navigasi Promo Slider
let promoIndex = 0;
function movePromo(direction) {
    const slides = document.getElementById('promoSlides');
    const totalPromoSlides = 3;

    if (slides) {
        promoIndex = (promoIndex + direction + totalPromoSlides) % totalPromoSlides;
        slides.style.transform = `translateX(-${promoIndex * 33.333}%)`;
    }
}

// Navigasi Halaman Pendaftaran
function bukaPendaftaran(namaPaket) {
    tutupIklan();
    const sectionDaftar = document.getElementById('halaman-daftar');
    const mainContent = document.getElementById('main-content');
    const inputPaket = document.getElementById('inputPaket');

    if (sectionDaftar && mainContent) {
        mainContent.style.display = 'none';
        sectionDaftar.style.display = 'block';
        inputPaket.value = namaPaket;
        window.scrollTo(0, 0);
    }
}

function tutupPendaftaran() {
    document.getElementById('halaman-daftar').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
}

// Modal Popup Iklan
window.onload = function() {
    setTimeout(function() {
        const modal = document.getElementById('modalIklan');
        if (modal) modal.style.display = 'flex';
    }, 1000);
};

function tutupIklan() {
    const modal = document.getElementById('modalIklan');
    if (modal) modal.style.display = 'none';
}