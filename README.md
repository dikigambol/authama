# Authama

Authama adalah aplikasi web berbasis Next.js untuk manajemen produk dengan fitur autentikasi admin. Aplikasi ini memungkinkan admin untuk menambah, mengedit, menghapus, dan melihat daftar produk, serta menghasilkan kode QR untuk produk tertentu. Menggunakan MongoDB sebagai database dan dilengkapi dengan sistem autentikasi berbasis token.

## Struktur Proyek

```
authama/
├── components/              # Komponen React yang dapat digunakan ulang
│   ├── header-admin.js      # Header untuk halaman admin
│   └── product/
│       └── table.js         # Tabel untuk menampilkan produk
├── lib/                     # Library dan koneksi eksternal
│   ├── axios.js             # Konfigurasi Axios untuk HTTP requests
│   └── mongodb.js           # Koneksi dan konfigurasi MongoDB
├── middlewares/             # Middleware untuk autentikasi
│   └── authenticateToken.js # Middleware untuk verifikasi token JWT
├── pages/                   # Halaman Next.js (App Router)
│   ├── _app.js              # Entry point aplikasi
│   ├── _document.js         # Custom document
│   ├── index.js             # Halaman utama
│   ├── api/                 # API routes
│   │   ├── addProduct.js    # API untuk menambah produk
│   │   ├── deleteProduct.js # API untuk menghapus produk
│   │   ├── findProduct.js   # API untuk mencari produk
│   │   ├── listProducts.js  # API untuk daftar produk
│   │   ├── login.js         # API untuk login
│   │   ├── updateProduct.js # API untuk update produk
│   │   └── verifyToken.js   # API untuk verifikasi token
│   ├── dashboard/           # Halaman dashboard admin
│   │   └── index.js
│   ├── login/               # Halaman login
│   │   └── index.js
│   ├── products/            # Halaman manajemen produk
│   │   └── index.js
│   └── qr/                  # Halaman untuk kode QR
│       └── index.js
├── public/                  # File statis
│   ├── css/                 # Stylesheet
│   │   └── azia.css
│   ├── imgs/                # Gambar
│   └── lib/                 # Library frontend (Bootstrap, FontAwesome, dll.)
├── utils/                   # Utility functions
│   ├── alertSwal.js         # Konfigurasi SweetAlert
│   └── configToken.js       # Konfigurasi token
├── jsconfig.json            # Konfigurasi JavaScript
├── next.config.mjs          # Konfigurasi Next.js
├── package.json             # Dependencies dan scripts
└── README.md                # Dokumentasi proyek
```

## Teknologi yang Digunakan

- **Next.js**: Framework React untuk server-side rendering dan static site generation
- **MongoDB**: Database NoSQL untuk penyimpanan data produk
- **JWT**: JSON Web Token untuk autentikasi
- **Axios**: HTTP client untuk API calls
- **Bootstrap**: Framework CSS untuk styling
- **FontAwesome**: Icon library
- **SweetAlert**: Library untuk alert dan modal

## Fitur Utama

- Autentikasi admin dengan login
- Manajemen produk (CRUD operations)
- Dashboard admin
- Generate kode QR untuk produk
- Responsive design dengan Bootstrap

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

login authama:
"email": "authama@gmail.com",
"password": "adminauthama"
