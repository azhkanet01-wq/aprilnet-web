// Logika Client Area & MixRadius API Integration

async function prosesLoginClient(event) {
    event.preventDefault();
    const idPelanggan = document.getElementById('idPelanggan').value.trim();
    const btnSubmit = event.target.querySelector('button[type="submit"]');

    btnSubmit.innerText = 'Memeriksa...';
    btnSubmit.disabled = true;

    try {
        // Panggil endpoint API backend MixRadius (sesuaikan dengan endpoint backend Anda)
        /*
        const response = await fetch(`/api/pelanggan/${idPelanggan}`);
        const result = await response.json();
        */

        // SIMULASI BERHASIL
        setTimeout(() => {
            document.getElementById('login-client-card').style.display = 'none';
            document.getElementById('dashboard-client').style.display = 'block';

            document.getElementById('dashNamaUser').innerText = "Budi Santoso";
            document.getElementById('dashIdUser').innerText = `ID: ${idPelanggan}`;
            
            btnSubmit.innerText = 'Masuk ke Portal';
            btnSubmit.disabled = false;
        }, 1000);

    } catch (err) {
        alert('Terjadi kesalahan saat terhubung ke sistem MixRadius.');
        btnSubmit.innerText = 'Masuk ke Portal';
        btnSubmit.disabled = false;
    }
}

function logoutClient() {
    document.getElementById('dashboard-client').style.display = 'none';
    document.getElementById('login-client-card').style.display = 'block';
    document.getElementById('formLoginClient').reset();
}

function prosesBayarOnline() {
    const idPelanggan = document.getElementById('dashIdUser').innerText;
    alert(`Mengarahkan ke Payment Gateway untuk ${idPelanggan}...\nPilih pembayaran via QRIS, Transfer Bank, atau Minimarket.`);
}

function prosesGantiPassWifi(event) {
    event.preventDefault();
    const ssid = document.getElementById('wifiSSID').value;
    const passBaru = document.getElementById('wifiPasswordBaru').value;

    if (confirm(`Apakah Anda yakin ingin mengubah password Wi-Fi (${ssid}) menjadi: ${passBaru}?`)) {
        alert("Mengirimkan perintah pembaruan ke Modem via MixRadius ACS...");
        setTimeout(() => {
            alert('Berhasil! Password Wi-Fi Modem Anda telah diperbarui.');
            document.getElementById('wifiPasswordBaru').value = '';
        }, 1200);
    }
}