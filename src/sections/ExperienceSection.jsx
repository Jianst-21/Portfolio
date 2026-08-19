'use client';
import React, { useState } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import TabSwitch from '@/components/experience/TabSwitch';
import TimelineItem from '@/components/experience/TimelineItem';

const workData = [
  {
    period: '6 Juli 2026 — 11 Agustus 2026',
    position: 'Web Developer Intern',
    org: 'DPRD Kabupaten Purbalingga',
    desc: 'Mengembangkan dan memelihara portal resmi DPRD Purbalingga secara mandiri menggunakan tema kustom dan pemrograman PHP manual di atas platform WordPress untuk mendukung transparansi dan publikasi informasi kedewanan.',
    tags: ['WordPress', 'PHP', 'Web Development']
  },
  {
    period: 'April 2026 — Juni 2026',
    position: 'Project Manager (Project-Based)',
    org: 'PT Abyakta Ageng Propertindo',
    desc: 'Mengoordinasikan tim pengembang, menyusun timeline proyek, memonitor progres, serta memastikan deliverable website terselesaikan sesuai kebutuhan bisnis perusahaan.',
    tags: ['Project Management', 'Agile', 'Communication']
  },
  {
    period: 'Februari 2026 — April 2026',
    position: 'Fullstack Developer (Project-Based)',
    org: 'PT Putri Jagad Raya Jaya Abadi',
    desc: 'Membantu digitalisasi bisnis perusahaan dengan merancang website, membuat fitur administrasi operasional, laporan sederhana, serta responsif melakukan debugging.',
    tags: ['Fullstack Dev', 'React.js', 'Node.js']
  },
  {
    period: 'Januari 2026 — Februari 2026',
    position: 'Web Developer Intern',
    org: 'Bikin Kreatif ID',
    desc: 'Mendukung pembuatan website klien berbasis WordPress, mengoptimalkan plugin & tema kustom, penataan responsif, dan menganalisis kendala teknis agar stabil.',
    tags: ['WordPress', 'Web Development', 'Technical Analysis']
  },
  {
    period: 'September 2025 — Desember 2025',
    position: 'Frontend Developer (Project-Based)',
    org: 'PT Bangun Persada Property',
    desc: 'Mengembangkan website reservasi perumahan interaktif, menyajikan informasi unit properti secara terstruktur, dan merancang modul pencarian serta booking properti.',
    tags: ['Frontend Dev', 'React.js', 'UI Integration']
  }
];

const eduData = [
  {
    period: '2023 — Saat ini',
    position: 'S1 Informatika (IPK 3.85 / 4.00)',
    org: 'Telkom University Purwokerto',
    desc: 'Mempelajari Rekayasa Perangkat Lunak, Fundamental Big Data, Machine Learning, dan Computer Vision. Mengembangkan kompetensi melalui proyek dan pembelajaran mandiri.',
    tags: ['Informatika', 'Machine Learning', 'Big Data']
  },
  {
    period: '2020 — 2023',
    position: 'Teknik Komputer dan Jaringan (Nilai 92.79 / 100)',
    org: 'SMKN 1 Glagah',
    desc: 'Mempelajari dasar-dasar jaringan komputer, administrasi server, perakitan komputer, serta pemecahan masalah infrastruktur IT dasar.',
    tags: ['TKJ', 'Networking', 'IT Troubleshooting']
  }
];

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState('Kerja');
  
  const currentData = activeTab === 'Kerja' ? workData : eduData;

  return (
    <section className="py-20" id="pengalaman">
      <RevealOnScroll>
        <SectionHeader title="Pengalaman & Pendidikan" highlight="& Pendidikan" />
        <div className="mt-12 flex flex-col gap-10">
          <TabSwitch activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="mt-4">
            {currentData.map((item, index) => (
              <TimelineItem 
                key={index} 
                {...item} 
                isLast={index === currentData.length - 1} 
              />
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
