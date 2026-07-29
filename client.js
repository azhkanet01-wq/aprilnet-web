// Base URL API Backend MixRadius Anda
const API_BASE_URL = "https://netid.topsetting.com:973/";

// 1. Integrasi Login Client Area
async function prosesLoginClient(event) {
    event.preventDefault();
    
    const idPelanggan = document.getElementById('idPelanggan').value.trim();
    const passClient = document.getElementById('passClient').value;
    const btnSubmit = event.target.querySelector('button[type="submit"]');

    btnSubmit.innerText = 'Memeriksa...';
    btnSubmit.disabled = true;

    try {
        // Panggil Endpoint Login MixRadius API
        const response = await fetch(`${API_BASE_URL}/client/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username: idPelanggan, 
                password: passClient 
            })
        });

        const result = await response.json();

        if (response.ok && result.success) {
            // Simpan token otentikasi di localStorage
            localStorage.setItem('mixradius_token', result.token);
            
            // Tampilkan Dashboard
            document.getElementById('login-client-card').style.display = 'none';
            document.getElementById('dashboard-client').style.display = 'block';

            // Isi Data dari Response API MixRadius
            document.getElementById('dashNamaUser').innerText = result.data.nama;
            document.getElementById('dashIdUser').innerText = `ID: ${result.data.id_pelanggan}`;
            document.getElementById('dashStatusTag').innerText = result.data.status; // AKTIF / ISOLIR
            document.getElementById('dashPaket').innerText = result.data.nama_paket;
            document.getElementById('dashIP').innerText = result.data.ip_address;
            document.getElementById('dashJatuhTempo').innerText = result.data.jatuh_tempo;
            document.getElementById('dashTagihan').innerText = `Rp ${result.data.total_tagihan.toLocaleString('id-ID')}`;
            
            if (result.data.wifi_ssid) {
                document.getElementById('wifiSSID').value = result.data.wifi_ssid;
            }
        } else {
            alert(result.message || 'ID Pelanggan atau Kata Sandi salah.');
        }

    } catch (err) {
        console.error(err);
        alert('Gagal terhubung ke server MixRadius. Periksa koneksi Anda.');
    } finally {
        btnSubmit.innerText = 'Masuk ke Portal';
        btnSubmit.disabled = false;
    }
}

// 2. Integrasi Ubah Password Wi-Fi Modem via ACS MixRadius
async function prosesGantiPassWifi(event) {
    event.preventDefault();
    
    const ssid = document.getElementById('wifiSSID').value;
    const passBaru = document.getElementById('wifiPasswordBaru').value;
    const token = localStorage.getItem('mixradius_token');

    if (!confirm(`Apakah Anda yakin ingin mengubah password Wi-Fi (${ssid})?`)) {
        return;
    }

    const btnSubmit = event.target.querySelector('button[type="submit"]');
    btnSubmit.innerText = 'Mengirim Perintah...';
    btnSubmit.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}/client/change-wifi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                ssid: ssid,
                wifi_password: passBaru
            })
        });

        const result = await response.json();

        if (response.ok && result.success) {
            alert('Berhasil! Password Wi-Fi Modem Anda telah diperbarui melalui MixRadius ACS.');
            document.getElementById('wifiPasswordBaru').value = '';
        } else {
            alert(result.message || 'Gagal mengubah password Wi-Fi.');
        }

    } catch (err) {
        console.error(err);
        alert('Terjadi kesalahan saat menghubungi ACS MixRadius.');
    } finally {
        btnSubmit.innerText = 'Perbarui Password Wi-Fi';
        btnSubmit.disabled = false;
    }
}

// 3. Logout Client
function logoutClient() {
    localStorage.removeItem('mixradius_token');
    document.getElementById('dashboard-client').style.display = 'none';
    document.getElementById('login-client-card').style.display = 'block';
    document.getElementById('formLoginClient').reset();
}

// 4. Integrasi Payment Gateway / Invoice MixRadius
async function prosesBayarOnline() {
    const token = localStorage.getItem('mixradius_token');
    
    try {
        const response = await fetch(`${API_BASE_URL}/client/pay-invoice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (response.ok && result.payment_url) {
            // Arahkan ke Halaman Pembayaran (QRIS/Transfer/dll)
            window.location.href = result.payment_url;
        } else {
            alert(result.message || 'Gagal membuat transaksi pembayaran.');
        }
    } catch (err) {
        alert('Gagal terhubung ke sistem pembayaran MixRadius.');
    }
}