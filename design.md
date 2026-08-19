# Design Spec & Progress Spec — Portofolio Aji Noto Sutrisno

Dokumentasi sistem desain, tata letak, status pengembangan, serta spesifikasi arsitektur **3D Tech Cube & Ecosystem Section**.

---

## 1. Konsep & Identitas Utama

- **Pemilik Portofolio**: **Aji Noto Sutrisno**
- **Status & Afiliasi**: Mahasiswa Informatika S1 Universitas Telkom Purwokerto
- **Spesialisasi**: Software Developer, AI Engineer, Website Developer, Fullstack Developer, Frontend Developer, Backend Developer.
- **Mood Visual**: Dark, editorial, dramatis, minimalis — mengkombinasikan warna hitam hangat (`#0B0806`), aksen oranye amber bakar (`#E8A33D`), tipografi display tebal, dan tata letak yang bersih (*clean layout*).
- **Prinsip Utama**: Satu keluarga warna harmonis, tanpa garis pembatas kasar antar section (*borderless transition*), dan presisi margin vertikal (*pixel-perfect alignment*).

---

## 2. Status Pengerjaan Section saat Ini

| Section | Status | Deskripsi Implementasi |
|---|---|---|
| **01. Loading Screen** | ✅ Finished | Animasi typewriter `"Welcome to my portfolio"` dengan efek fade-out dan reset posisi scroll ke paling atas (`window.scrollTo(0,0)`). |
| **02. Hero Section + Ticker** | ✅ Finished | Screen 1 penuh (100vh): Judul nama 1 baris (`Aji Noto Sutrisno`), animasi typewriter role looping, tombol CTA, kartu foto monogram glossy glassmorphic, dan Metric Ticker di paling bawah layar. |
| **03. Metric Ticker** | ✅ Finished | Infinite marquee running text tanpa ikon, 60fps GPU hardware acceleration (`translate3d`), perulangan simetris 2 set (*zero glitch*), berjalan terus tanpa jeda saat di-hover. |
| **04. About Section (Tentang Saya)** | ✅ Finished | Tata letak bersih bertema editorial dengan kartu-kartu keahlian & filosofi kerja yang responsif. |
| **05. Skills & Ecosystem (Kemampuan)** | ✅ Finished | **3D Tech Stage Local Section**: Dadu 3D lokal berada di panggung utama dengan pembagian scroll 450vh (Mode Intro free rotate ➔ 6 Slide Teknologi face lock ➔ Mode Outro re-locked free rotate). Panel card redup pekat di mode intro/outro (`opacity: 0.02`) dan menyala di mode detail. Layout 100% bebas dari risiko terpotong/clipping. |
| **06. Contact Section** | ✅ Finished | Terminal interaktif command-line (`help`, `whoami`, `skills`, `experience`, `projects`, `contact`, `clear`) + tautan media sosial. Antarmuka Kontak Saya 100% bersih & bebas halangan dadu. |
| **07. Stack System (Arsitektur)** | ⏸️ Staged | Disembunyikan sementara dari `page.js` untuk pengerjaan bertahap per section. |
| **08. Proyek Terpilih (Projects)** | ⏸️ Staged | Disembunyikan sementara dari `page.js` me-refine section sebelumnya. |

---

## 3. Spesifikasi Arsitektur 3D Tech Cube (InteractiveTechStage3D)

### A. Alur Interaksi Scroll (450vh Height)

```
[Scroll Progress 0.00 - 0.10] ──► INTRO MODE (Free 3D Spin, Darkened Panels 0.02)
[Scroll Progress 0.10 - 0.90] ──► ACTIVE TECH MODE (6 Technologies, Face-Lock, 1.0 Opacity)
[Scroll Progress 0.90 - 1.00] ──► OUTRO MODE (Re-locked Free 3D Spin, Darkened Panels 0.02)
```

### B. Dimensi & Anti-Clipping Canvas
- **Canvas Size**: `300px × 300px` (Ratio 1:1).
- **Camera Position**: `THREE.PerspectiveCamera(40, 1, 0.1, 1000)` pada `Z = 4.8`.
- **Layout Center Stage**: Badge `FULL STACK ECOSYSTEM` diletakkan dalam flex layout di atas area dadu (bukan `absolute top-0` overlay), mencegah kubus 3D bertabrakan atau terpotong teks chip saat berputar 360°.

### C. Matriks Pemetaan Sisi & Rotasi Presisi Three.js

| Index | Teknologi | Warna Tema | Face Vector | Target Rotasi (`x`, `y`) | Deskripsi Visual |
|---|---|---|---|---|---|
| **0** | **React.js** | `#61DAFB` (Sky Cyan) | `+X` (Kanan) | `{ x: 0, y: -Math.PI / 2 }` | Sisi kanan berputar 90° ke depan |
| **1** | **Node.js** | `#22C55E` (Emerald Green) | `-X` (Kiri) | `{ x: 0, y: Math.PI / 2 }` | Sisi kiri berputar 90° ke depan |
| **2** | **Python & AI** | `#3776AB` (Royal Blue) | `+Y` (Atas) | `{ x: Math.PI / 2, y: 0 }` | Sisi atas menunduk 90° ke depan |
| **3** | **Next.js** | `#F5EFE6` (Pearl White) | `-Y` (Bawah) | `{ x: -Math.PI / 2, y: 0 }` | Sisi bawah menengadah 90° ke depan |
| **4** | **TailwindCSS** | `#06B6D4` (Teal) | `+Z` (Depan) | `{ x: 0, y: 0 }` | Sisi depan default tanpa rotasi |
| **5** | **JavaScript** | `#F7DF1E` (Gold Yellow) | `-Z` (Belakang) | `{ x: 0, y: Math.PI }` | Sisi belakang berputar 180° ke depan |

### D. Shortest Path Angular Lerp
Setiap perpindahan sisi dadu menggunakan diferensial sudut terpendek untuk pergerakan yang mulus:
$$\Delta \theta = ((\theta_{target} - \theta_{current} + 3\pi) \pmod{2\pi}) - \pi$$
$$\theta_{current} \leftarrow \theta_{current} + 0.08 \cdot \Delta \theta$$
