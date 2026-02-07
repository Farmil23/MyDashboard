
const studentData = {
    "name": "Farhan Kamil Hermansyah alias Farmil",
    "role": "Open to Work",
    "avatar": "images/profile.jpg",
    "major": "Teknik Informatika",
    "semester": 3,
    "university": "Institut Teknologi Nasional Bandung",
    "description": "Seorang pembelajar seumur hidup dengan hasrat untuk memecahkan masalah kompleks menggunakan data. Saya percaya bahwa perpaduan antara keahlian teknis yang mendalam dan pemahaman bisnis yang kuat adalah kunci untuk menciptakan solusi AI yang berdampak.",
    "github": "https://github.com/Farmil23",
    "linkedin": "https://www.linkedin.com/in/farhan-kamil-hermansyah-184850328/",
    "instagram": "https://instagram.com/mashivee",
    "email": "farmiljobs@gmail.com",
    "cv": "farmil-cv.png",
    "startupIdea": "idea.html"
};

const roadmapData = [
    {
        "id": "fase1",
        "title": "The Foundation",
        "subtitle": "Menjadi Arsitek Data",
        "startDate": "2025-08-01",
        "endDate": "2026-01-31",
        "progress": 95,
        "status": "In Progress",
        "bootcampName": "Complete Data Science, Machine Learning, DL, NLP Bootcamp",
        "skills": [
            "Python",
            "Data Analysis",
            "SQL",
            "Statistics",
            "ML Ops",
            "Deep Learning",
            "NLP",
            "Git"
        ],
        "goalProject": "Prediksi Harga Rumah (End-to-End)",
        "syllabusLink": "Bootcamp/FASE-1/SILABUS-BOOTCAMP-DS-ML-DL.pdf",
        "certificateLink": null
    },
    {
        "id": "fase2",
        "title": "The Vanguard",
        "subtitle": "Memasuki Dunia Generative AI",
        "startDate": "2026-02-01",
        "endDate": "2026-05-31",
        "progress": 0,
        "status": "Not Started",
        "bootcampName": "Complete Generative AI Course With Langchain and Huggingface",
        "skills": [
            "Transformers",
            "LangChain",
            "Vector DBs",
            "Prompt Engineering",
            "HuggingFace"
        ],
        "goalProject": "Chatbot Q&A Dokumen Pribadi (RAG)",
        "syllabusLink": "#",
        "certificateLink": null
    },
    {
        "id": "fase3",
        "title": "The Professional",
        "subtitle": "Menguasai MLOps",
        "startDate": "2026-06-01",
        "endDate": "2026-09-30",
        "progress": 0,
        "status": "Not Started",
        "bootcampName": "Complete MLOps Bootcamp",
        "skills": [
            "MLflow",
            "DVC",
            "CI/CD",
            "Docker",
            "AWS",
            "Kubernetes"
        ],
        "goalProject": "Pipeline ML Otomatis (CI/CD)",
        "syllabusLink": "#",
        "certificateLink": null
    },
    {
        "id": "fase4",
        "title": "The Specialist",
        "subtitle": "Membangun Sistem Agen Cerdas",
        "startDate": "2026-10-01",
        "endDate": "2027-03-31",
        "progress": 0,
        "status": "Not Started",
        "bootcampName": "Ultimate RAG, Agentic AI (LangGraph), Autogen",
        "skills": [
            "Advanced RAG",
            "LangGraph",
            "Autogen",
            "Multi-Agent Systems"
        ],
        "goalProject": "Asisten Riset Multi-Agen",
        "syllabusLink": "#",
        "certificateLink": null
    }
];

const portfolioData = [
    {
        "id": "analisis-ecommerce",
        "title": "Analisis Umpan Balik E-commerce",
        "description": "Menganalisis review produk untuk menemukan insight kepuasan pelanggan menggunakan EDA mendalam dan pemodelan NLP.",
        "tags": [
            "Python",
            "NLP",
            "LLM",
            "EDA",
            "Google Colab"
        ],
        "repoLink": "https://github.com/Farmil23/Analisis-Umpan-Balik-Ecommerce",
        "certLink": "https://drive.google.com/file/d/1595y6XsGSToGWKD7i6ERnYauf6t1ACHh/view",
        "status": "Completed",
        "problem": "Banyaknya ulasan produk yang tidak terstruktur menyulitkan pemilik bisnis untuk memahami sentimen pelanggan secara keseluruhan dan mengidentifikasi area yang perlu perbaikan.",
        "solution": "Membangun sebuah pipeline analisis sentimen menggunakan model NLP untuk mengklasifikasikan ulasan menjadi positif, negatif, atau netral. Hasilnya divisualisasikan dalam dashboard interaktif untuk memberikan wawasan yang dapat ditindaklanjuti.",
        "businessImpact": "Memberikan dashboard sentimen real-time yang memungkinkan manajer produk memprioritaskan perbaikan fitur berdasarkan umpan balik pelanggan secara kuantitatif.",
        "keyLearnings": "Mempelajari teknik text cleaning dan preprocessing yang efektif untuk data ulasan yang tidak terstruktur. Berhasil menerapkan model pre-trained untuk analisis sentimen dengan akurasi tinggi.",
        "architectureDiagram": "https://placehold.co/800x400/0a0a0a/333?text=Diagram+Arsitektur+Proyek",
        "liveDemoLink": null,
        "codeSnippet": {
            "language": "plaintext",
            "code": "1. Baca dataset ulasan produk\n2. UNTUK SETIAP ulasan DALAM dataset:\n3.   Analisis polaritas sentimen (positif/netral/negatif)\n4.   Tambahkan hasil sentimen ke kolom baru\n5. Tampilkan 5 ulasan pertama beserta sentimennya"
        }
    },
    {
        "id": "prediksi-harga-rumah",
        "title": "Prediksi Harga Rumah (End-to-End)",
        "description": "Proyek fondasi yang mencakup siklus hidup ML penuh, dari EDA hingga deployment model sebagai web API interaktif.",
        "tags": [
            "Scikit-learn",
            "Streamlit",
            "Docker",
            "AWS"
        ],
        "repoLink": "https://github.com/Farmil23/Propify-Smart-Property-Price-Estimator/",
        "certLink": "#",
        "status": "Completed",
        "problem": "Kesulitan dalam menentukan harga jual rumah yang kompetitif dan akurat berdasarkan fitur-fitur properti seperti luas, jumlah kamar, dan lokasi.",
        "solution": "Mengembangkan model regresi machine learning yang dilatih pada data historis properti. Model ini kemudian di-deploy sebagai aplikasi web sederhana di mana pengguna dapat memasukkan fitur rumah dan mendapatkan estimasi harga secara real-time.",
        "businessImpact": "Aplikasi ini dapat membantu agen properti dan pemilik rumah mengurangi waktu riset harga hingga 75% dan menetapkan harga awal yang lebih kompetitif, berpotensi mempercepat proses penjualan.",
        "keyLearnings": "Proyek ini mengajarkan pentingnya feature engineering dalam meningkatkan akurasi model regresi. Selain itu, proses deployment ke AWS Beanstalk memberikan pengalaman langsung dalam mengatasi masalah dependensi dan konfigurasi environment produksi.",
        "architectureDiagram": "https://github.com/Farmil23/Propify-Smart-Property-Price-Estimator/blob/main/demo-images/Screenshot%202025-08-14%20224304.png?raw=true",
        "liveDemoLink": "http://propify-smart-estimator-env.eba-cymnihm3.ap-southeast-2.elasticbeanstalk.com/",
        "codeSnippet": {
            "language": "plaintext",
            "code": "1. Muat model prediksi yang sudah dilatih\n2. Buat antarmuka web dengan judul\n3. Sediakan input untuk 'Luas Tanah' dan 'Jumlah Kamar' dan fitur lainnya \n4. JIKA tombol 'Prediksi' ditekan:\n5.   Ambil nilai dari input pengguna\n6.   Gunakan model untuk memprediksi harga dari nilai input\n7.   Tampilkan hasil estimasi harga kepada pengguna"
        }
    },
    {
        "id": "techleap-ai-agent",
        "title": "TechLeap AI: Agen Karir Cerdas",
        "description": "Mengembangkan sistem agen AI proaktif yang mempersonalisasi jalur karir untuk mahasiswa dan lulusan informatika, dari rekomendasi kursus hingga simulasi wawancara.",
        "tags": [
            "AI Agents",
            "LangGraph",
            "LLM",
            "RAG",
            "Python"
        ],
        "repoLink": "https://github.com/Farmil23",
        "certLink": "#",
        "status": "Planned",
        "problem": "Mahasiswa tingkat akhir dan lulusan baru informatika seringkali menghadapi kebingungan dalam merencanakan karir. Mereka kesulitan menghubungkan skill yang dimiliki dengan lowongan yang ada, memilih sertifikasi yang relevan, dan mempersiapkan diri untuk wawancara teknis secara efektif.",
        "solution": "Membangun sistem multi-agen AI: 1. Profiler Agent: Menganalisis CV dan profil GitHub. 2. Market Analyst Agent: Memindai tren skill di lowongan kerja. 3. Learning Planner Agent: Merekomendasikan kursus/proyek untuk menutup kesenjangan skill. 4. Interview Coach Agent: Mensimulasikan wawancara dan memberikan umpan balik.",
        "businessImpact": "Menyediakan asisten karir AI personal 24/7 yang dapat secara signifikan mengurangi waktu pencarian kerja, meningkatkan kesiapan kandidat, dan memperbesar peluang lulusan untuk mendapatkan pekerjaan pertama yang relevan.",
        "keyLearnings": "Implementasi arsitektur multi-agen menggunakan LangGraph. Mengorkestrasi alur kerja kompleks antar agen, dan mendesain prompt yang efektif untuk setiap peran agen.",
        "architectureDiagram": "https://placehold.co/800x400/0a0a0a/333?text=Arsitektur+Multi-Agen+TechLeap",
        "liveDemoLink": null,
        "codeSnippet": {
            "language": "plaintext",
            "code": "1. Mulai: Pengguna mengunggah CV dan target karir.\n2. Panggil Profiler Agent: Ekstrak skill, pengalaman, pendidikan.\n3. Panggil Market Analyst Agent: Cari 5 lowongan kerja cocok.\n4. Panggil Learning Planner Agent: Bandingkan skill pengguna dengan syarat lowongan, buat rencana belajar.\n5. Panggil Interview Coach Agent: Buat 3 pertanyaan wawancara.\n6. Tampilkan hasil gabungan: Lowongan, Rencana Belajar, dan Pertanyaan Wawancara."
        }
    },
    {
        "id": "rag-chatbot",
        "title": "Conversational Q&A Chatbot (RAG)",
        "description": "Membangun aplikasi RAG untuk bertanya jawab dengan dokumen akademis menggunakan Streamlit dan Vector Store.",
        "tags": [
            "Streamlit",
            "LangChain",
            "RAG",
            "Vector DB"
        ],
        "repoLink": "https://github.com/Farmil23",
        "certLink": "#",
        "status": "Planned",
        "problem": "Paper penelitian dan dokumen teknis seringkali padat dan sulit dicari informasinya secara cepat. Membaca manual untuk menemukan jawaban spesifik sangat tidak efisien.",
        "solution": "Menciptakan sebuah chatbot cerdas di mana pengguna dapat mengunggah dokumen PDF. Sistem akan memproses dan mengindeks konten, memungkinkan pengguna untuk bertanya dalam bahasa natural dan mendapatkan jawaban yang akurat beserta sumbernya langsung dari dokumen.",
        "architectureDiagram": "https://placehold.co/800x400/0a0a0a/333?text=Arsitektur+Sistem+RAG",
        "liveDemoLink": null,
        "codeSnippet": {
            "language": "plaintext",
            "code": "1. Pengguna mengunggah file PDF\n2. Sistem memecah PDF menjadi potongan teks (chunks)\n3. UNTUK SETIAP chunk:\n4.   Buat representasi vektor (embedding)\n5.   Simpan chunk dan embedding di Vector Store\n6. Pengguna bertanya (query)\n7. Cari chunk yang paling relevan dengan query di Vector Store\n8. Berikan query + chunk relevan ke LLM untuk menghasilkan jawaban"
        }
    }
];

const komdigiData = [
    {
        "program": "Program 1. Micro Skill",
        "title": "AI Engineer For Mienial",
        "level": "Micro Skill",
        "registration": "24 Juli - 12 Agustus 2025",
        "execution": "Selesaikan minimal satu MicroSkill",
        "materials": [
            "Dasar-Dasar Implementasi Kecerdasan Artifisial"
        ],
        "competencies": [],
        "type": "Mandiri",
        "startDate": "2025-07-24",
        "endDate": "2025-08-12",
        "progress": 100,
        "status": "Completed",
        "syllabusLink": "Bootcamp/PROGRAM-2-KOMDIGI/SILABUS-PROGRAM-2-KOMDIGI.pdf",
        "certificateLink": "path/to/certificate-komdigi1.pdf"
    },
    {
        "program": "Program 2. Fundamental Deep Learning",
        "title": "Fundamental Deep Learning",
        "level": "Beginner",
        "registration": "24 Juli - 12 Agustus 2025",
        "execution": "14 - 27 Agustus 2025",
        "materials": [
            "Kategori Mesin yang Belajar",
            "Metrik Kinerja Model Klasifikasi",
            "Regresi Linier",
            "Regresi Logistik",
            "Mesin yang Belajar Mengurai Benang Kusut",
            "Istilah dan Konsep Dasar",
            "Reviu Matematika Dasar"
        ],
        "competencies": [
            "Menentukan Objektif Bisnis",
            "Menentukan Tujuan Teknis Data Science",
            "Mengubah Data",
            "Membangun Model",
            "Merancang Skenario Model",
            "Mengevaluasi Hasil Pemodelan"
        ],
        "type": "Lab Session",
        "startDate": "2025-08-14",
        "endDate": "2025-08-27",
        "progress": 100,
        "status": "Completed",
        "syllabusLink": "Bootcamp/PROGRAM-2-KOMDIGI/SILABUS-PROGRAM-2-KOMDIGI.pdf",
        "certificateLink": "Bootcamp/PROGRAM-2-KOMDIGI/PROGRAM-2.pdf"
    },
    {
        "program": "Program 3. Intermediate Deep Learning",
        "title": "Intermediate Deep Learning",
        "level": "Intermediate",
        "registration": "29 Agustus - 1 September 2025",
        "execution": "3 - 9 September 2025",
        "materials": [
            "Jaringan Saraf Berlapis",
            "Optimasi dan Regulasi"
        ],
        "competencies": [
            "Membangun Skenario Model",
            "Membangun Model",
            "Optimasi Hasil Pemodelan",
            "Melakukan Reviu Proyek Data Science"
        ],
        "type": "Live Session",
        "startDate": "2025-09-03",
        "endDate": "2025-09-09",
        "progress": 100,
        "status": "Completed",
        "syllabusLink": "#",
        "certificateLink": null
    },
    {
        "program": "Program 4. Mastery Deep Learning",
        "title": "Mastery Deep Learning",
        "level": "Advance",
        "registration": "11 - 14 September 2025",
        "execution": "16 - 22 September 2025",
        "materials": [
            "Jaringan Saraf Pengenal Gambar",
            "Berbagai Macam Pemodelan Deep Learning"
        ],
        "competencies": [
            "Mengkonstruksi Data",
            "Membangun Model",
            "Mengevaluasi Skenario Model",
            "Melakukan Reviu Proyek DS"
        ],
        "type": "Live Session",
        "startDate": "2025-09-16",
        "endDate": "2025-09-22",
        "progress": 100,
        "status": "Completed",
        "syllabusLink": "#",
        "certificateLink": null
    },
    {
        "program": "Program 5 & 6. Hackathon",
        "title": "Pra-Hackathon & Hackathon",
        "level": "Hackathon",
        "registration": "Pra: 24 Sep - 5 Okt 2025 | Final: 12-14 Nov 2025",
        "execution": "Pra: 8 Okt - 9 Nov 2025 | Final: 18 Nov 2025",
        "materials": [
            "Penerapan skill gabungan dalam sebuah kompetisi final."
        ],
        "competencies": [
            "Kompetisi SKKNI Puncak"
        ],
        "type": "Gratis",
        "startDate": "2025-10-08",
        "endDate": "2025-11-18",
        "progress": 100,
        "status": "Completed",
        "syllabusLink": "#",
        "certificateLink": null
    }
];

const fullStackData = [
    {
        "program": "Section 1",
        "title": "Fondasi Pemrograman Python & Software Engineering",
        "level": "Beginner",
        "registration": "TBA",
        "execution": "Self-Paced",
        "materials": [
            "Setup & Basics: Anaconda, VS Code",
            "Python Core: Syntax, Variables, Loops",
            "Data Structures: List, Tuple, Dicts",
            "Functions & Lambda",
            "Advanced Python: Decorators, Generators",
            "OOP: Classes, Inheritance",
            "Backend Basics: SQLite3, Multithreading"
        ],
        "competencies": [
            "Python Proficiency",
            "Software Engineering Best Practices"
        ],
        "type": "Online",
        "startDate": "2026-02-01",
        "endDate": "2026-03-01",
        "progress": 100,
        "status": "Completed",
        "syllabusLink": "#",
        "certificateLink": null
    },
    {
        "program": "Section 2",
        "title": "Data Analysis & Matematika Statistik",
        "level": "Intermediate",
        "registration": "TBA",
        "execution": "Self-Paced",
        "materials": [
            "Numpy & Pandas Manipulation",
            "Data Visualization: Matplotlib, Seaborn",
            "Statistik Deskriptif",
            "Statistik Inferensial & Probabilitas",
            "Exploratory Data Analysis (EDA)"
        ],
        "competencies": [
            "Data Manipulation",
            "Statistical Analysis"
        ],
        "type": "Online",
        "startDate": "2026-03-02",
        "endDate": "2026-04-01",
        "progress": 100,
        "status": "Completed",
        "syllabusLink": "#",
        "certificateLink": null
    },
    {
        "program": "Section 3",
        "title": "Machine Learning Algorithms",
        "level": "Advance",
        "registration": "TBA",
        "execution": "Self-Paced",
        "materials": [
            "Supervised vs Unsupervised Concepts",
            "Regression Models (Linear, Ridge, Lasso)",
            "Classification Models (Logistic, SVM, KNN)",
            "Tree & Ensembles (Random Forest, XGBoost)",
            "Unsupervised Learning (PCA, K-Means)",
            "Model Optimization (Grid Search, Cross Val)"
        ],
        "competencies": [
            "Model Building",
            "Hyperparameter Tuning"
        ],
        "type": "Online",
        "startDate": "2026-04-02",
        "endDate": "2026-05-15",
        "progress": 100,
        "status": "Completed",
        "syllabusLink": "#",
        "certificateLink": null
    },
    {
        "program": "Section 4",
        "title": "MLOps, Pipeline, & Deployment",
        "level": "Advance",
        "registration": "TBA",
        "execution": "Self-Paced",
        "materials": [
            "Web Frameworks: Flask, Streamlit",
            "Docker & Version Control",
            "ML Pipelines (ETL)",
            "MLOps Tools: MLflow, DagsHub",
            "Cloud Deployment (AWS, Azure)"
        ],
        "competencies": [
            "Model Deployment",
            "MLOps Practices"
        ],
        "type": "Project",
        "startDate": "2026-05-16",
        "endDate": "2026-06-15",
        "progress": 100,
        "status": "Completed",
        "syllabusLink": "#",
        "certificateLink": null
    },
    {
        "program": "Section 5",
        "title": "Natural Language Processing (NLP)",
        "level": "Specialization",
        "registration": "TBA",
        "execution": "Self-Paced",
        "materials": [
            "Text Preprocessing (NLTK)",
            "Feature Extraction (TF-IDF, BoW)",
            "Word Embeddings (Word2Vec)",
            "Sentiment Analysis Projects"
        ],
        "competencies": [
            "Text Processing",
            "NLP Modeling"
        ],
        "type": "Specialization",
        "startDate": "2026-06-16",
        "endDate": "2026-07-15",
        "progress": 100,
        "status": "Completed",
        "syllabusLink": "#",
        "certificateLink": null
    },
    {
        "program": "Section 6",
        "title": "Deep Learning & Advanced Architectures",
        "level": "Expert",
        "registration": "TBA",
        "execution": "Self-Paced",
        "materials": [
            "ANN Basics (Backpropagation)",
            "Computer Vision (CNN)",
            "Sequence Models (RNN, LSTM)",
            "Transformers (Attention Mechanism)"
        ],
        "competencies": [
            "Deep Learning",
            "Neural Network Architecture"
        ],
        "type": "Specialization",
        "startDate": "2026-07-16",
        "endDate": "2026-08-30",
        "progress": 100,
        "status": "Completed",
        "syllabusLink": "#",
        "certificateLink": null
    }
];

const techStackData = [
    {
        "name": "Python",
        "color": "#a93737",
        "svg": "<path d=\"M13.23 10.34c-.45-.27-.95-.42-1.48-.42s-1.03.15-1.48.42a2.09 2.09 0 0 0-.92 1.77v5.38c0 .69.23 1.3.69 1.77.46.47 1.05.7 1.71.7s1.25-.23 1.71-.7a2.4 2.4 0 0 0 .69-1.77v-1.89a6.67 6.67 0 0 1-3.23.86c-2.28 0-4.13-1.85-4.13-4.13s1.85-4.13 4.13-4.13c.93 0 1.78.3 2.48.86V7.66c0-.69-.23-1.3-.69-1.77a2.41 2.41 0 0 0-1.71-.7c-.66 0-1.25.23-1.71.7a2.4 2.4 0 0 0-.69 1.77v1.89a6.67 6.67 0 0 1 3.23-.86c2.28 0 4.13 1.85 4.13 4.13s-1.85 4.13-4.13 4.13c-.93 0-1.78-.3-2.48-.86z\"/>"
    },
    {
        "name": "Pandas",
        "color": "#150458",
        "svg": "<path d=\"M2.9 8.11h3.11v12.8H2.9zm6.82 0h3.11v12.8H9.72zm6.83 0h3.11v12.8h-3.11zM2.9 3.28h16.8v3.11H2.9z\"/>"
    },
    {
        "name": "Numpy",
        "color": "#4D77CF",
        "svg": "<path d=\"m12 2-7.09 12.28L12 20l7.09-5.72L12 2zM3.28 15.45l-1.16 2L12 22l9.88-4.55-1.16-2L12 18.28 3.28 15.45z\"/>"
    },
    {
        "name": "Scikit-learn",
        "color": "#F7931E",
        "svg": "<circle cx=\"10\" cy=\"10\" r=\"3\"/><circle cx=\"17\" cy=\"7\" r=\"3\"/><circle cx=\"17\" cy=\"17\" r=\"3\"/><path d=\"m10 13 5.5 2.5m0-9-5.5 2.5\"/>"
    },
    {
        "name": "TensorFlow",
        "color": "#FF6F00",
        "svg": "<path d=\"m12 1.5-9 5v11l9 5 9-5v-11zM5.07 9.22 12 13l6.93-3.78L12 5.44Z\"/><path d=\"m5.07 14.78 6.93 3.78 6.93-3.78V9.22L12 13Z\"/>"
    },
    {
        "name": "PyTorch",
        "color": "#EE4C2C",
        "svg": "<circle cx=\"12\" cy=\"12\" r=\"2\"/><path d=\"M12 2a10 10 0 0 0-4.47 18.02m8.94 0A10 10 0 0 0 12 2\"/>"
    },
    {
        "name": "Hugging Face",
        "color": "#FFD21E",
        "svg": "<path d=\"M14.5 10.5c.69.69.69 1.81 0 2.5L10 17.5l-4.5-4.5c-.69-.69-.69-1.81 0-2.5l2-2L10 8.5l2.5-2.5z\"/><path d=\"M10 2.5c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5-3.36-7.5-7.5-7.5zm0 13c-3.04 0-5.5-2.46-5.5-5.5s2.46-5.5 5.5-5.5 5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5z\"/>"
    },
    {
        "name": "LangChain",
        "color": "#6A8EAE",
        "svg": "<path d=\"M9 17H7A5 5 0 0 1 7 7h2\"/><path d=\"M15 7h2a5 5 0 1 1 0 10h-2\"/><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"/>"
    },
    {
        "name": "SQL",
        "color": "#45a244",
        "svg": "<ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\"/><path d=\"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3\"/><path d=\"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5\"/>"
    },
    {
        "name": "Docker",
        "color": "#2496ED",
        "svg": "<path d=\"M20.5 12.5c0 .17-.01.33-.03.5H17v-5h3.5c.28 0 .5.22.5.5v4zM16 7.5v10H4.5c-2.48 0-4.5-2.02-4.5-4.5S2.02 8.5 4.5 8.5H8V4.25c0-.97.78-1.75 1.75-1.75h3.5c.97 0 1.75.78 1.75 1.75v3.25H16zm-4-1.5H9.5v3h2.5v-3z\"/>"
    },
    {
        "name": "AWS",
        "color": "#FF9900",
        "svg": "<path d=\"M17.34 16.89a1.3 1.3 0 0 0 1.3-1.3c0-.43-.22-.84-.57-1.08-.36-.24-.78-.36-1.22-.36H15.2v2.74h1.57c.23 0 .45-.05.67-.1zm-5.76-4.56a1.3 1.3 0 0 0-1.3 1.3c0 .43.22.84.57 1.08.36-.24.78-.36 1.22.36h1.65v-2.74h-1.57c-.23 0-.45.05-.67-.1zM22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zM6.66 12.33h1.65v2.74H6.66zm5.76 4.56H10.8v-2.74h1.62zm5.76 0H16.5v-2.74h1.62z\"/>"
    },
    {
        "name": "Git",
        "color": "#F05032",
        "svg": "<circle cx=\"18\" cy=\"18\" r=\"3\"/><circle cx=\"6\" cy=\"6\" r=\"3\"/><path d=\"M13 6h3a2 2 0 0 1 2 2v7\"/><line x1=\"6\" y1=\"9\" x2=\"6\" y2=\"21\"/>"
    }
];

const blogData = [
    {
        "id": "memahami-rag",
        "title": "Memahami Arsitektur RAG dalam 5 Menit",
        "summary": "Sebuah pengantar singkat tentang Retrieval-Augmented Generation, arsitektur yang merevolusi cara kerja LLM.",
        "date": "1 Agu 2025",
        "fullContent": " <p class=\"lead text-gray-300\">Pernahkah Anda berinteraksi dengan sebuah chatbot canggih tapi jawabannya terasa 'mengarang' atau tidak relevan dengan konteks spesifik? Di sinilah arsitektur Retrieval-Augmented Generation (RAG) berperan sebagai game-changer.</p><p>RAG adalah arsitektur cerdas yang menggabungkan kekuatan model bahasa besar (LLM) seperti GPT-4 dengan kemampuan untuk mengambil informasi dari sumber data eksternal secara real-time. Bayangkan Anda bertanya kepada seorang ahli yang sangat pintar, tetapi sebelum menjawab, ia selalu membuka buku referensi terlebih dahulu untuk memastikan jawabannya akurat, terkini, dan relevan. Itulah RAG.</p><h2 class=\"mt-8\">Bagaimana Cara Kerja RAG?</h2><p>Secara sederhana, alur kerja RAG dapat dipecah menjadi beberapa langkah utama:</p><ol><li><strong>Pertanyaan Pengguna (Query):</strong> Semua dimulai saat Anda mengajukan pertanyaan atau memberikan instruksi.</li><li><strong>Pencarian (Retrieval):</strong> Sistem tidak langsung bertanya ke LLM. Sebaliknya, ia menggunakan query Anda untuk mencari informasi yang paling relevan dari sebuah basis pengetahuan (knowledge base). Basis pengetahuan ini bisa berupa dokumen PDF, database, website, atau sumber data privat perusahaan.</li><li><strong>Augmentasi (Augmentation):</strong> Informasi relevan yang ditemukan kemudian 'disuntikkan' sebagai konteks tambahan ke dalam prompt asli Anda.</li><li><strong>Generasi (Generation):</strong> Prompt yang sudah diperkaya dengan konteks ini kemudian diberikan kepada LLM. Dengan konteks tambahan ini, LLM dapat menghasilkan jawaban yang jauh lebih akurat, faktual, dan spesifik.</li></ol><img src=\"https://placehold.co/800x400/0a0a0a/333?text=Diagram+Alur+Kerja+RAG\" alt=\"Diagram alur kerja RAG\" class=\"my-6 rounded-lg\"><h2 class=\"mt-8\">Kelebihan Utama RAG</h2><blockquote>Kelebihan utama RAG adalah kemampuannya untuk mengurangi 'halusinasi' pada LLM dan membuat jawaban selalu relevan dengan data terbaru.</blockquote><ul><li><strong>Mengurangi Halusinasi:</strong> Karena jawaban didasarkan pada data yang diambil, kemungkinan LLM memberikan informasi yang salah atau mengada-ada (halusinasi) sangat berkurang.</li><li><strong>Data Terbaru:</strong> LLM tradisional memiliki \"knowledge cut-off\". RAG memungkinkan model untuk mengakses informasi terbaru tanpa perlu melatih ulang seluruh model.</li><li><strong>Transparansi & Kepercayaan:</strong> Sistem RAG bisa menunjukkan sumber informasi yang digunakannya untuk menjawab, sehingga pengguna bisa memverifikasi sendiri kebenarannya.</li></ul><p>Dengan memahami RAG, kita bisa membangun aplikasi AI yang lebih kuat, tepercaya, dan benar-benar bermanfaat untuk kasus penggunaan spesifik.</p>"
    },
    {
        "id": "akurasi-vs-presisi",
        "title": "Akurasi vs. Presisi: Mana yang Lebih Penting?",
        "summary": "Sering tertukar, kedua metrik ini memiliki arti yang sangat berbeda dalam evaluasi model machine learning.",
        "date": "15 Jul 2025",
        "fullContent": "<p>Dalam machine learning, terutama untuk masalah klasifikasi, akurasi dan presisi adalah dua metrik evaluasi yang sering digunakan. Namun, keduanya mengukur hal yang berbeda dan penting untuk tidak salah mengartikannya.</p><p class=\"mt-4\"><strong>Akurasi</strong> adalah metrik yang paling sederhana: dari semua prediksi yang dibuat, berapa persen yang benar? Rumusnya adalah (Prediksi Benar / Total Prediksi). Akurasi bekerja dengan baik pada dataset yang seimbang (jumlah sampel tiap kelas hampir sama). Namun, ia bisa sangat menyesatkan pada dataset yang tidak seimbang.</p><p class=\"mt-4\"><strong>Presisi</strong>, di sisi lain, menjawab pertanyaan: dari semua prediksi 'Positif' yang kita buat, berapa persen yang benar-benar 'Positif'? Rumusnya adalah (True Positives / (True Positives + False Positives)). Presisi menjadi sangat penting ketika biaya dari False Positive sangat tinggi. Contohnya, dalam sistem deteksi spam, Anda tidak ingin email penting salah diklasifikasikan sebagai spam (False Positive). Dalam kasus ini, presisi tinggi lebih diutamakan.</p><p class=\"mt-4\">Jadi, mana yang lebih penting? Jawabannya: tergantung pada masalah bisnis yang ingin Anda selesaikan. Memahami konteks masalah adalah kunci untuk memilih metrik evaluasi yang tepat.</p>"
    }

];

const advancedGenAIData = [
    {
        "program": "Section 1",
        "title": "RAG Fundamentals & Data Engineering",
        "level": "Advance",
        "registration": "TBA",
        "execution": "Self-Paced",
        "materials": [
            "Introduction to GenAI Architecture: RAG vs Fine-Tuning vs Prompt Engineering",
            "Environment Setup: Anaconda, VS Code, UV Package Manager",
            "Data Ingestion (ETL for LLMs): Loading Documents (PDF, Docx, CSV, JSON)",
            "Preprocessing Strategies: Text Splitting (Recursive, Character), Parsing SQL"
        ],
        "competencies": ["RAG Architecture", "Data Engineering for LLMs"],
        "type": "Online",
        "startDate": "2026-09-01",
        "endDate": "2026-09-30",
        "progress": 0,
        "status": "Not Started",
        "syllabusLink": "#",
        "certificateLink": null
    },
    {
        "program": "Section 2",
        "title": "Vector Database & Embedding Mastery",
        "level": "Advance",
        "registration": "TBA",
        "execution": "Self-Paced",
        "materials": [
            "Embeddings Deep Dive: Semantic Search, Cosine Similarity",
            "Vector Stores: ChromaDB, FAISS, In-Memory Stores",
            "Cloud Vector DBs: Pinecone, DataStax Astra DB",
            "RAG Implementation: LangChain Pipelines (LCEL), Conversational Memory"
        ],
        "competencies": ["Vector Database Management", "Semantic Search Implementation"],
        "type": "Online",
        "startDate": "2026-10-01",
        "endDate": "2026-10-31",
        "progress": 0,
        "status": "Not Started",
        "syllabusLink": "#",
        "certificateLink": null
    },
    {
        "program": "Section 3",
        "title": "Advanced Retrieval Strategies (Optimizing RAG)",
        "level": "Specialization",
        "registration": "TBA",
        "execution": "Self-Paced",
        "materials": [
            "Advanced Chunking: Semantic Chunking",
            "Hybrid Search: Dense & Sparse Vectors, Reranking (Cross-Encoders)",
            "Retrieval Refinement: MMR, Query Expansion, Decomposition",
            "Complex Pipelines: HyDE, Multi-Modal RAG"
        ],
        "competencies": ["Advanced RAG Techniques", "Retrieval Optimization"],
        "type": "Online",
        "startDate": "2026-11-01",
        "endDate": "2026-11-30",
        "progress": 0,
        "status": "Not Started",
        "syllabusLink": "#",
        "certificateLink": null
    },
    {
        "program": "Section 4",
        "title": "From Chains to Agents (LangChain Core)",
        "level": "Specialization",
        "registration": "TBA",
        "execution": "Self-Paced",
        "materials": [
            "Agentic Concepts: AI Agents vs Agentic AI, Reasoning Engines (ReAct)",
            "LangChain Tooling: Custom Tools, Structured Output (Pydantic)",
            "Human-in-the-Loop Supervision",
            "Streaming & State Management"
        ],
        "competencies": ["Agentic Design Patterns", "LangChain Advanced Usage"],
        "type": "Project",
        "startDate": "2026-12-01",
        "endDate": "2026-12-31",
        "progress": 0,
        "status": "Not Started",
        "syllabusLink": "#",
        "certificateLink": null
    },
    {
        "program": "Section 5",
        "title": "Orchestrating Complex Flows with LangGraph",
        "level": "Expert",
        "registration": "TBA",
        "execution": "Self-Paced",
        "materials": [
            "LangGraph Fundamentals: Nodes, Edges, State Schema",
            "Agent Patterns: ReAct, Self-Reflection, Chain of Thought",
            "Advanced RAG Agents: CRAG, Adaptive RAG, Self-RAG",
            "Multi-Agent Systems: Supervisor Agent, Hierarchical Agents",
            "Persistence: Checkpointing & Memory"
        ],
        "competencies": ["LangGraph Orchestration", "Multi-Agent Systems"],
        "type": "Project",
        "startDate": "2027-01-01",
        "endDate": "2027-02-15",
        "progress": 0,
        "status": "Not Started",
        "syllabusLink": "#",
        "certificateLink": null
    },
    {
        "program": "Section 6",
        "title": "GraphRAG, Evaluation & Production",
        "level": "Expert",
        "registration": "TBA",
        "execution": "Self-Paced",
        "materials": [
            "RAG Evaluation: LLM as a Judge, Faithfulness, Answer Relevance",
            "Knowledge Graphs (GraphRAG): Neo4j, Cypher Query Language",
            "Graph Implementation & Prompting Strategies",
            "Final Project: Full-Stack Agentic RAG App (Streamlit + LangGraph)"
        ],
        "competencies": ["GraphRAG Implementation", "GenAI Evaluation & Production Data Engineering"],
        "type": "Expert",
        "startDate": "2027-02-16",
        "endDate": "2027-03-31",
        "progress": 0,
        "status": "Not Started",
        "syllabusLink": "#",
        "certificateLink": null
    }
];

module.exports = {
    studentData,
    roadmapData,
    portfolioData,
    komdigiData,
    fullStackData,
    techStackData,
    blogData,
    advancedGenAIData
};
