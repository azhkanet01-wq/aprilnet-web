document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btnExplore');

  // URL Worker dari langkah 3
  const WORKER_URL = 'https://pelanginet-mixradius-proxy.azhkanet01.workers.dev/';

  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    btn.textContent = 'Memuat Paket...';

    try {
      // Panggil Worker (BUKAN panggil Mixradius langsung)
      const response = await fetch(WORKER_URL);
      const data = await response.json();

      console.log('Data Paket Mixradius:', data);
      alert('Berhasil mengambil data dari Mixradius! Cek console browser.');
      
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal memuat paket.');
    } finally {
      btn.textContent = 'Jelajahi Paket';
    }
  });
});