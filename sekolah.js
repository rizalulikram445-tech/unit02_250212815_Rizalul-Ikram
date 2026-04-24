// Ini adalah bagian awal dari kode JavaScript yang akan dijalankan ketika halaman web dimuat
// Kode ini digunakan untuk menangani interaksi pada form pendaftaran ekskul

// Variabel formEkskul menyimpan referensi ke elemen HTML dengan id 'form-ekskul'
// Ini adalah elemen form yang akan kita tangani ketika pengguna mengirim data
const formEkskul = document.getElementById('form-ekskul');

// Variabel listPeserta menyimpan referensi ke elemen HTML dengan id 'list-peserta'
// Ini adalah tempat di mana kita akan menampilkan daftar siswa yang sudah mendaftar
const listPeserta = document.getElementById('list-peserta');

// Variabel errorMsg menyimpan referensi ke elemen HTML dengan id 'error-msg'
// Ini adalah elemen paragraf yang akan menampilkan pesan error jika ada kesalahan
const errorMsg = document.getElementById('error-msg');

// Baris ini menambahkan event listener ke formEkskul
// Event listener mendengarkan event 'submit' yang terjadi ketika form dikirim
// Ketika form dikirim, fungsi anonim (function(event) { ... }) akan dijalankan
formEkskul.addEventListener('submit', function(event) {
    // Di dalam fungsi ini, kita mencegah perilaku default dari event submit
    // Perilaku default adalah mengirim data ke server dan me-reload halaman
    // Dengan preventDefault(), halaman tidak akan reload, sehingga kita bisa menangani data secara manual
    event.preventDefault(); // Mencegah reload

    // Sekarang kita mengambil nilai dari input fields
    // document.getElementById('namaSiswa') mencari elemen dengan id 'namaSiswa'
    // .value mengambil nilai yang diketik pengguna
    // .trim() menghapus spasi di awal dan akhir string
    const nama = document.getElementById('namaSiswa').value.trim();

    // Sama seperti di atas, mengambil nilai NISN dan melakukan trim
    const nisn = document.getElementById('nisn').value.trim();

    // Mengambil nilai dari dropdown select pilihan ekskul
    const ekskul = document.getElementById('pilihanEkskul').value;
    
    // MEMVALIDASI NILAI NISN HARUS 10 DIGIT 
    if (nisn.length !== 10 || isNaN(nisn)){
        errorMsg.innerText = "NISN tidak valid! Wajib 10 digit angka.";
        errorMsg.classList.replace('error-hidden', 'error-visible');
        return;
    }

    // Sekarang kita reset pesan error
    // classList.replace mengganti class 'error-visible' dengan 'error-hidden'
    // Ini menyembunyikan pesan error yang mungkin sedang ditampilkan
    errorMsg.classList.replace('error-visible', 'error-hidden');

    // Kita cari elemen dengan class 'empty-list' yang menunjukkan daftar kosong
    // querySelector mencari elemen pertama yang cocok dengan selector '.empty-list'
    const emptyState = document.querySelector('.empty-list');

    // Jika elemen emptyState ada (tidak null), maka kita hapus elemen tersebut
    // Ini dilakukan agar pesan "Belum ada siswa yang mendaftar" hilang ketika ada siswa baru
    if (emptyState) emptyState.remove();

    // Sekarang kita buat elemen baru untuk kartu siswa
    // document.createElement('div') membuat elemen div baru
    const cardSiswa = document.createElement('div');

    // Kita tambahkan class 'card-siswa' ke elemen div yang baru dibuat
    // Ini untuk styling menggunakan CSS
    cardSiswa.classList.add('card-siswa');
    if (ekskul=== "Pramuka"){
        cardSiswa.style.backgroundColor= "#FFF1D3";
        cardSiswa.style.borderLeft="5px solid #ea4a06"
    } else if (ekskul=== "Palang Merah Remaja (PMR)") {
        cardSiswa.style.backgroundColor= "#FFF1D3";
        cardSiswa.style.borderLeft="5px solid #f10c0c"
    } else if (ekskul=== "Klub Coding & Robotik") {
        cardSiswa.style.backgroundColor= "#FFF1D3";
        cardSiswa.style.borderLeft="5px solid #167cd5"
    } else if (ekskul==="Jurnalistik") {
        cardSiswa.style.backgroundColor= "#FFF1D3";
        cardSiswa.style.borderLeft="5px solid #0fea79"
    }

    // Kita isi konten HTML ke dalam elemen cardSiswa menggunakan innerHTML
    // Template literal (dengan backticks) memungkinkan kita menyisipkan variabel dengan ${}
    // Konten ini akan menampilkan nama, NISN, dan ekskul siswa
    cardSiswa.innerHTML = `
        <h4>${nama}</h4>
        <p><strong>NISN:</strong> ${nisn}</p>
        <p><strong>Ekstrakurikuler:</strong> ${ekskul}</p>
    `; 
    // Membuat tombol hapus secara dinamis [cite: 76]
    const btnHapus = document.createElement('button');
    btnHapus.innerText = "Batalkan Pendaftaran";
    btnHapus.classList.add('btn-hapus');

    // Event listener untuk menghapus kartu [cite: 77]
    btnHapus.addEventListener('click', function() {
        // Menggunakan parentElement.remove() untuk menghapus kartu ini saja [cite: 78, 89]
        cardSiswa.remove();
        
        // Opsional: Jika daftar kosong lagi, tampilkan pesan "Belum ada siswa"
        if (listPeserta.children.length === 0) {
            listPeserta.innerHTML = '<p class="empty-list">Belum ada siswa yang mendaftar.</p>';
        }
    });

    // Masukkan tombol ke dalam kartu, lalu kartu ke dalam list
    cardSiswa.appendChild(btnHapus);
    
    // Sekarang kita tambahkan kartu siswa yang baru dibuat ke dalam listPeserta
    // appendChild menambahkan elemen anak baru ke elemen induk
    listPeserta.appendChild(cardSiswa);

    // Terakhir, kita bersihkan formulir
    // formEkskul.reset() mengosongkan semua input fields di dalam form
    formEkskul.reset();
});
