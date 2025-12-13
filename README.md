<br>
<div align="center">
    <div>
        <img height="150px" src="https://placehold.co/300x300?text=ExCellera" alt="ExCellera Logo"/>
    </div>
    <div>
            <h3><b>ExCellera</b></h3>
            <p><i>Platform Reintegrasi Kerja Berbasis Teknologi</i></p>
    </div>      
</div>
<br>
<h1 align="center">ExCellera</h1>


ExCellera: Structured Workforce Reintegration Platform

ExCellera adalah platform digital terkontrol yang dirancang untuk membantu mantan narapidana kembali ke dunia kerja secara produktif, bermartabat, dan berkelanjutan. Platform ini hadir untuk menjawab tantangan utama pasca-bebas, seperti stigma sosial, keterbatasan akses pekerjaan, minimnya pendampingan pasca-pembebasan, serta tingginya risiko residivisme.

Berbeda dari platform pencari kerja konvensional, ExCellera menerapkan alur reintegrasi berurutan (sequence-based reintegration). Setiap pengguna harus melalui tahapan yang jelas dan terukur, mulai dari assessment awal, personalisasi course, training kerja 12 bulan, hingga job seeking berbasis sertifikasi kesiapan kerja.

Sebagai pendamping utama, ExCellera dilengkapi dengan CELLA AI, asisten berbasis Retrieval-Augmented Generation (RAG) yang memberikan dukungan belajar dan kesiapan kerja berdasarkan knowledge base internal yang terkurasi dan terverifikasi, sehingga aman, adil, dan bebas stigma.

⸻

Problem Statement

<blockquote align='center'>
<h3>
“Mantan narapidana memiliki tingkat pengangguran yang jauh lebih tinggi dibandingkan populasi umum, yang secara signifikan meningkatkan risiko residivisme.”
</h3>
</blockquote>


Banyak mantan narapidana menghadapi hambatan serius untuk kembali bekerja karena:
	•	Minimnya kepercayaan dari pemberi kerja akibat stigma
	•	Ketidaksesuaian keterampilan dengan kebutuhan lapangan kerja
	•	Tidak adanya sistem pendampingan kerja yang terstruktur
	•	Proses rekrutmen yang tidak mempertimbangkan kesiapan kerja secara objektif

Tanpa intervensi yang tepat, kondisi ini berpotensi mendorong mantan narapidana kembali ke lingkaran kriminal.

⸻

💡 Solusi Utama ExCellera

1. Assessment Awal & Personalisasi Jalur Kerja

Setiap user menjalani assessment awal berbasis AI untuk memetakan minat, kesiapan belajar, pengalaman, dan kedisiplinan dasar. Hasil assessment digunakan untuk menentukan jalur kerja utama dan mempersonalisasi course yang relevan — tanpa opsi pemilihan manual oleh user.

2. CELLA AI (RAG-based Learning Assistant)

CELLA AI berperan sebagai asisten belajar dan kesiapan kerja yang:
	•	Menjelaskan materi course dan training
	•	Membantu refleksi progres dan kesiapan kerja
	•	Membantu penyusunan CV berbasis sertifikat dan pengalaman training

SELURUH jawaban CELLA bersumber dari knowledge base internal ExCellera, bukan internet bebas.

3. Course Offline Terverifikasi

User hanya dapat mengikuti course offline yang sesuai dengan jalur kerja hasil assessment. Course diselenggarakan oleh mitra Non-UMKM dan menghasilkan sertifikat course sebagai syarat masuk training.

4. Training Kerja 12 Bulan

Training dilakukan langsung di mitra (UMKM / Non-UMKM) dengan evaluasi berkala. Output utama dari tahap ini adalah Sertifikat “Siap Kerja” yang diterbitkan berdasarkan performa dan kedisiplinan.

5. Job Seeking Berbasis Sertifikasi

User hanya dapat melamar pekerjaan setelah memiliki sertifikat “Siap Kerja”. Proses job matching dilakukan berdasarkan bidang kerja, performa training, dan hasil evaluasi mitra, bukan riwayat kriminal.

⸻

🔄 Alur Sistem ExCellera

Onboarding Lapas
      ↓
Assessment Awal (AI)
      ↓
Personalisasi Course
      ↓
Course Offline
      ↓
Training Kerja 12 Bulan
      ↓
Sertifikat Siap Kerja
      ↓
Job Seeking / Job Matching


⸻

🎯 Kontribusi terhadap SDGs

SDG 8 – Pekerjaan Layak dan Pertumbuhan Ekonomi

Mendorong akses kerja yang adil dan inklusif bagi kelompok rentan melalui kesiapan kerja yang terverifikasi.

SDG 10 – Pengurangan Ketimpangan

Mengurangi ketimpangan sosial dengan membuka kesempatan kedua berbasis kemampuan, bukan stigma.

SDG 16 – Perdamaian, Keadilan, dan Institusi yang Tangguh

Menekan residivisme melalui sistem reintegrasi yang terstruktur dan berbasis data.

⸻

👨🏻‍💻 Technology Stack

<div align="center">


<a href="https://nextjs.org/">
<kbd><img src="https://placehold.co/60x60?text=Next.js" height="60" /></kbd>
</a>


<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
<kbd><img src="https://placehold.co/60x60?text=JavaScript" height="60" /></kbd>
</a>


<a href="https://www.postgresql.org/">
<kbd><img src="https://placehold.co/60x60?text=PostgreSQL" height="60" /></kbd>
</a>


<a href="https://github.com/pgvector/pgvector">
<kbd><img src="https://placehold.co/60x60?text=pgvector" height="60" /></kbd>
</a>


<a href="https://ai.google.dev/">
<kbd><img src="https://placehold.co/60x60?text=Gemini" height="60" /></kbd>
</a>


</div>


<div align="center">
<h4>Next.js | JavaScript | PostgreSQL | pgvector | Gemini AI</h4>
</div>



⸻

🧠 Arsitektur AI – CELLA (RAG)

CELLA AI menggunakan pendekatan Retrieval-Augmented Generation (RAG) dengan alur:
	1.	Query dari user
	2.	Retrieval ke knowledge base internal (materi course, panduan training, kebijakan)
	3.	Pencarian vektor menggunakan pgvector
	4.	Generasi jawaban oleh Gemini

Pendekatan ini memastikan keamanan, konsistensi, dan auditabilitas setiap respons.

⸻

Catatan Penting
	•	User tidak dapat mendaftar mandiri (onboarding melalui lapas)
	•	User tidak dapat melewati tahapan
	•	AI tidak memiliki kewenangan mengambil keputusan kelulusan

ExCellera bukan sekadar aplikasi, melainkan sistem reintegrasi kerja berbasis struktur, kepercayaan, dan kesempatan kedua.
