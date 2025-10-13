# Kepler.gl Demo App - Panduan Lengkap Setup & Troubleshooting

Ini adalah source code aplikasi demo kepler.gl yang dapat Anda jalankan secara lokal. Panduan ini akan membantu Anda mengatasi error umum seperti `process is not defined` dan mengkonfigurasi dengan Carto sebagai alternatif MapBox.

## 📋 Persyaratan Sistem

- **[Node.js ^18.x](http://nodejs.org)**: Digunakan untuk development server, build tools, dan testing
- **[Yarn 4.4.0](https://yarnpkg.com)**: Package manager untuk instalasi dependencies
- **Akun Carto**: Untuk layanan peta dan visualisasi data (sebagai pengganti MapBox)
- **Git**: Untuk clone repository

## 🚀 Instalasi dan Setup

### 1. Clone Repository dan Setup Awal

```bash
# Clone repository kepler.gl
git clone https://github.com/keplergl/kepler.gl.git
cd kepler.gl

# Install dependencies utama di root directory
yarn bootstrap
```

### 2. Navigate ke Demo App

```bash
cd examples/demo-app
```

### 3. Install Dependencies Demo App

```bash
yarn install
```

## 🔧 Konfigurasi Environment Variables

### Buat File Environment

**PENTING**: File `.env` harus dibuat di **root directory kepler.gl**, bukan di folder demo-app!

```bash
# Dari root directory kepler.gl (bukan dari demo-app)
cd ../../  # kembali ke root jika masih di demo-app
cp .env.template .env
```

### Konfigurasi Environment Variables

Edit file `.env` dengan kredensial Anda:

```env
# Environment Variables Wajib
NODE_ENV=local

# Konfigurasi Carto (WAJIB - Pengganti MapBox)
CartoClientId=your_carto_client_id_here
CartoApiUrl=https://gcp-us-east1.api.carto.com

# Konfigurasi MapBox (Opsional - bisa gunakan token publik)
MapboxAccessToken=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw
MapboxExportToken=

# Layanan Pihak Ketiga (Opsional)
DropboxClientId=
FoursquareClientId=
FoursquareDomain=
FoursquareAPIURL=
FoursquareUserMapsURL=
```

### Cara Mendapatkan Kredensial Carto

1. Kunjungi [CARTO](https://carto.com/) dan buat akun
2. Masuk ke dashboard dan navigasi ke **API Keys**
3. Copy **Client ID** dan **API URL** Anda
4. Paste ke file `.env`

## 🛠️ Fix Error "process is not defined"

### 1. Buat Process Shim File

Buat file `process-shim.js` di directory `examples/demo-app/`:

```javascript
// process-shim.js
// Polyfill untuk process object di browser environment
if (typeof process === 'undefined') {
  window.process = {
    env: {},
    platform: 'browser',
    version: '16.0.0',
    versions: { 
      node: '16.0.0' 
    },
    nextTick: function(callback) {
      setTimeout(callback, 0);
    },
    cwd: function() {
      return '/';
    },
    browser: true
  };
}

// Buat tersedia secara global
globalThis.process = window.process || process;
```

### 2. Update ESBuild Configuration

File `esbuild.config.mjs` perlu diupdate untuk include process polyfill:

```javascript
// Tambahkan di bagian config
const config = {
  // ...existing config
  define: {
    NODE_ENV,
    'process.env.NODE_ENV': NODE_ENV,
    global: 'globalThis'
  },
  inject: ['./process-shim.js'], // Tambahkan ini
  // ...rest of config
};
```

## 🚀 Menjalankan Aplikasi

### Development Mode

```bash
# Pastikan berada di directory demo-app
cd examples/demo-app

# Jalankan development server
yarn start:local

# Atau alternatif:
NODE_ENV=local node esbuild.config.mjs --start
```

### Akses Aplikasi

Buka browser dan kunjungi:
```
http://localhost:8080
```

## 🐛 Troubleshooting Error Umum

### Error: "process is not defined"

**Penyebab**: Browser tidak mengenali object `process` yang hanya ada di Node.js

**Solusi**:
1. Pastikan file `process-shim.js` sudah dibuat
2. Update `esbuild.config.mjs` dengan inject polyfill
3. Clear cache dan rebuild

```bash
rm -rf dist/
rm -rf node_modules/.cache/
yarn start:local
```

### Error: Environment variables not found

**Penyebab**: File `.env` tidak ditemukan atau tidak di lokasi yang benar

**Solusi**:
1. Pastikan file `.env` ada di **root directory kepler.gl**
2. Cek path dari demo-app ke root: `../../.env`
3. Restart development server

### Error: Carto authentication failed

**Penyebab**: Kredensial Carto tidak valid atau salah format

**Solusi**:
1. Verifikasi Client ID dan API URL di dashboard Carto
2. Pastikan tidak ada extra spaces di file `.env`
3. Test koneksi dengan curl:

```bash
curl -H "Authorization: Bearer YOUR_CARTO_TOKEN" \
     "https://gcp-us-east1.api.carto.com/v3/maps"
```

### Error: Bundle tidak ter-generate

**Penyebab**: ESBuild configuration error atau missing dependencies

**Solusi**:
1. Reinstall dependencies:
```bash
rm -rf node_modules/
yarn install
```

2. Check Node.js version:
```bash
node --version  # Harus ^18.x
```

3. Update Yarn:
```bash
npm install -g yarn@4.4.0
```

## 📁 Struktur Project

```
kepler.gl/
├── .env                    # Environment variables (ROOT LEVEL)
├── examples/
│   └── demo-app/
│       ├── process-shim.js # Process polyfill
│       ├── esbuild.config.mjs
│       ├── package.json
│       ├── src/
│       │   ├── app.tsx
│       │   ├── main.js
│       │   └── ...
│       └── dist/           # Built files
```

## 🌐 Fitur yang Tersedia

- **Visualisasi Data Geospasial**: Upload dan visualisasi file CSV, JSON, GeoJSON
- **Layer Management**: Berbagai jenis layer (point, arc, polygon, heatmap)
- **Interactive Filters**: Filter data berdasarkan kolom tertentu
- **Custom Styling**: Kustomisasi warna, ukuran, dan opacity
- **Export Functionality**: Export ke PNG, HTML, JSON
- **Cloud Integration**: Integrasi dengan Carto untuk data storage

## 🎯 Tips Penggunaan

### Upload Data
1. Klik tombol "Add Data" di sidebar
2. Upload file CSV/JSON dengan kolom latitude/longitude
3. Kepler.gl akan otomatis detect geographic fields

### Membuat Layer
1. Setelah data ter-upload, pilih layer type
2. Map kolom data ke visual properties
3. Adjust styling dan filtering sesuai kebutuhan

### Export Maps
1. Klik icon "Share" di toolbar
2. Pilih format export (PNG, HTML, atau JSON)
3. Konfigurasi settings export

## 🆘 Bantuan Lebih Lanjut

### Dokumentasi Resmi
- [Kepler.gl Documentation](https://docs.kepler.gl/)
- [Carto Documentation](https://docs.carto.com/)

### Community Support
- [GitHub Issues](https://github.com/keplergl/kepler.gl/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/kepler.gl)

### Kontribusi
Silakan buat pull request atau issue di repository GitHub untuk perbaikan atau fitur baru.

---

**Catatan**: Panduan ini telah ditest dengan Node.js 18.x, Yarn 4.4.0, dan Carto API v3 pada Oktober 2025.
