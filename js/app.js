

document.addEventListener('DOMContentLoaded', function () {

    // --- Helper Functions ---
    async function fetchGithubActivity() {
        const username = 'Farmil23';
        const totalCommitsEl = document.getElementById('total-commits');
        const lastCommitEl = document.getElementById('last-commit');

        try {
            // Using a simple cache mechanism or fallback
            let recentCommits = 0;
            let lastCommitText = 'Menghubungkan ke GitHub...';

            const response = await fetch(`https://api.github.com/users/${username}/events/public`);

            if (!response.ok) {
                if (response.status === 403) throw new Error('API Rate Limit Exceeded');
                throw new Error('Network response was not ok');
            }

            const events = await response.json();
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            recentCommits = events
                .filter(event => event.type === 'PushEvent' && new Date(event.created_at) > thirtyDaysAgo)
                .reduce((acc, event) => acc + event.payload.commits.length, 0);

            const lastPushEvent = events.find(event => event.type === 'PushEvent');
            if (lastPushEvent) {
                const lastCommitDate = new Date(lastPushEvent.created_at);
                const hoursAgo = Math.round((new Date() - lastCommitDate) / (1000 * 60 * 60));
                const repoName = lastPushEvent.repo.name.split('/')[1];

                if (hoursAgo < 1) lastCommitText = `Baru saja di <strong>${repoName}</strong>`;
                else if (hoursAgo < 24) lastCommitText = `${hoursAgo} jam lalu di <strong>${repoName}</strong>`;
                else lastCommitText = `${Math.round(hoursAgo / 24)} hari lalu di <strong>${repoName}</strong>`;
            } else {
                lastCommitText = "Belum ada aktivitas baru-baru ini.";
            }

            if (totalCommitsEl) {
                totalCommitsEl.style.setProperty('--num', recentCommits); // For CSS animation
                totalCommitsEl.classList.add('counter-value');
                totalCommitsEl.textContent = ""; // CSS counter handles the text
                // Fallback for browsers not supporting @property
                if (!window.CSS || !CSS.registerProperty) totalCommitsEl.textContent = recentCommits;
            }
            if (lastCommitEl) lastCommitEl.innerHTML = lastCommitText;

        } catch (error) {
            console.warn('GitHub Graph/API Error:', error);
            if (totalCommitsEl) {
                totalCommitsEl.innerHTML = `<span class="text-sm text-gray-500">View on GitHub</span>`;
                totalCommitsEl.href = `https://github.com/${username}`;
                totalCommitsEl.tagName = 'a';
            }
            if (lastCommitEl) lastCommitEl.textContent = 'Data tidak tersedia saat ini.';
        }
    }

    function renderAboutMe() {
        const container = document.getElementById("about");
        if (!container) return;
        container.innerHTML = `<div class="flex flex-col sm:flex-row items-center gap-8">
            <div class="flex-shrink-0">
                <img class="h-32 w-32 rounded-full object-cover border-4 border-gray-700 ring-2 ring-cyan-500/50" src="images/profile.jpg" alt="Foto Profil Farmil" onerror="this.src='https://placehold.co/150x150/1a1a1a/FFF?text=Farmil'">
            </div>
            <div>
                <h2 class="text-3xl font-bold mb-2 gradient-text">Farmil</h2>
                <p class="text-gray-300 mb-6">Mahasiswa informatika dengan tekad membara untuk menjadi ahli di bidang AI dan Data. Roadmap ini adalah komitmen publik saya untuk belajar, membangun, dan berkembang setiap hari.</p>
                <div class="flex items-center gap-5">
                    <a href="https://github.com/Farmil23" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 font-medium">GitHub</a>
                    <a href="https://www.linkedin.com/in/farmil-sangaji-106584294/" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 font-medium">LinkedIn</a>
                    <a href="https://instagram.com/mashivee" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 font-medium">Instagram</a>
                </div>
                <div class="mt-6 flex flex-wrap gap-4">
                    <a href="mailto:farmiljobs@gmail.com" class="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        Hubungi Saya
                    </a>
                    <a href="farmil-cv.png" target="_blank" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        Unduh CV
                    </a><a href="idea.html" target="_blank" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        My startup Idea
                    </a>
                </div>
            </div>
        </div>`;
    }

    function renderStudentInfo() {
        const container = document.getElementById("student-status");
        if (!container) return;
        container.innerHTML = `<h2 class="text-xl font-bold mb-4 text-white">Status Mahasiswa</h2><div class="space-y-3"><div><span class="font-semibold text-gray-400">Jurusan:</span><p class="text-white">${studentData.major}</p></div><div><span class="font-semibold text-gray-400">Semester:</span><p class="text-white">${studentData.semester}</p></div><div><span class="font-semibold text-gray-400">Universitas:</span><p class="text-white">${studentData.university}</p></div></div><div class="mt-4 pt-4 border-t border-gray-700/50"><p class="text-sm text-gray-400">${studentData.description}</p></div>`;
    }

    function renderStats() {
        const container = document.getElementById("key-stats");
        if (!container) return;
        const completedProjects = portfolioData.filter(p => p.status === 'Completed').length;
        container.innerHTML = `<h2 class="text-xl font-bold mb-4 text-white">Statistik Kunci</h2><div class="space-y-4"><div><span class="font-semibold text-gray-400">Proyek Selesai:</span><p class="text-2xl font-bold gradient-text">${completedProjects}</p></div><div id="github-stats-container"><div><span class="font-semibold text-gray-400">Total Commit (30 hari):</span><p id="total-commits" class="text-2xl font-bold gradient-text">Memuat...</p></div><div><span class="font-semibold text-gray-400">Commit Terakhir:</span><p id="last-commit" class="text-sm font-medium text-gray-300">Memuat...</p></div></div><div><span class="font-semibold text-gray-400">Status:</span><p class="text-lg font-bold text-green-400">Aktif Belajar & Membangun</p></div></div>`;
    }

    function renderRoadmap() {
        const container = document.getElementById("roadmap-container");
        if (!container) return;
        container.innerHTML = roadmapData.map((phase, index) => {
            const statusColor = phase.status === 'In Progress' ? 'text-cyan-400' : phase.status === 'Completed' ? 'text-green-400' : 'text-gray-500';
            const progressGradient = phase.status === 'In Progress' ? 'linear-gradient(90deg, #06b6d4, #3b82f6)' : phase.status === 'Completed' ? 'linear-gradient(90deg, #10B981, #34D399)' : '#334155';
            const certificateButton = phase.status === 'Completed' && phase.certificateLink ?
                `<a href="${phase.certificateLink}" target="_blank" class="text-sm font-semibold text-green-400 hover:text-green-300 transition-colors inline-flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Sertifikat</a>` : '';

            return `<div class="card rounded-3xl p-8 relative overflow-hidden group">
                <div class="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-white select-none group-hover:opacity-20 transition-opacity">
                    ${index + 1}
                </div>
                <div class="grid md:grid-cols-12 gap-x-10 items-start relative z-10">
                    <div class="md:col-span-7">
                        <div class="flex items-center gap-3 mb-2">
                            <span class="px-3 py-1 rounded-full text-xs font-bold bg-white/5 border border-white/10 text-white">PHASE ${index + 1}</span>
                            <span class="text-xs font-medium ${statusColor} uppercase tracking-wider">${phase.status}</span>
                        </div>
                        <h3 class="text-3xl font-bold text-white mb-2">${phase.title}</h3>
                        <p class="text-lg font-medium text-cyan-400 mb-6">${phase.subtitle}</p>
                        
                        <div class="mb-6 bg-black/20 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
                            <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Bootcamp Focus</h4>
                            <p class="text-gray-200 font-medium">${phase.bootcampName}</p>
                        </div>

                        <div class="space-y-2">
                            <div class="flex justify-between text-xs font-semibold text-gray-400">
                                <span>PROGRESS</span>
                                <span>${phase.progress}%</span>
                            </div>
                            <div class="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                                <div class="h-full rounded-full transition-all duration-1000 ease-out" style="width: ${phase.progress}%; background: ${progressGradient};"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="md:col-span-5 mt-8 md:mt-0 flex flex-col h-full justify-between">
                        <div>
                            <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Key Skills & Tools</h4>
                            <div class="flex flex-wrap gap-2">
                                ${phase.skills.map(skill => `<span class="bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-default">${skill}</span>`).join('')}
                            </div>
                        </div>

                         <div class="mt-8 pt-6 border-t border-white/5 space-y-4">
                            <div class="flex items-start gap-3">
                                <div class="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0 text-cyan-400">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                </div>
                                <div>
                                    <h5 class="text-sm font-bold text-white">Target Project</h5>
                                    <p class="text-sm text-gray-400">${phase.goalProject}</p>
                                </div>
                            </div>
                            
                            <div class="flex items-center gap-4 pt-2">
                                <a href="${phase.syllabusLink}" target="_blank" class="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg> Silabus
                                </a>
                                ${certificateButton}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }).join('');
    }

    function renderPortfolioPreview() {
        const container = document.getElementById("portfolio-container");
        if (!container) return;
        container.innerHTML = portfolioData.map((project, index) => {
            const statusBadge = { 'Completed': 'bg-green-500/20 text-green-300 border-green-500/30', 'In Progress': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30', 'Planned': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' };
            const badgeClass = statusBadge[project.status] || statusBadge['Planned'];
            // Create a staggered animation delay
            const delay = index * 100;

            return `
            <div 
                class="card group rounded-3xl p-8 flex flex-col h-full relative overflow-hidden hover:border-cyan-500/30 transition-all duration-300 transform hover:-translate-y-1"
                style="animation-delay: ${delay}ms"
            >
                <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-0"></div>
                <div class="relative z-10 flex flex-col h-full">
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 transition-colors">
                            <svg class="w-6 h-6 text-gray-300 group-hover:text-cyan-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                        </div>
                        <span class="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${badgeClass} border backdrop-blur-md">${project.status}</span>
                    </div>
                    
                    <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">${project.title}</h3>
                    <p class="text-gray-400 mb-6 text-sm flex-grow leading-relaxed">${project.description}</p>
                    
                    <div class="flex flex-wrap gap-2 mb-6">
                         ${project.tags.slice(0, 3).map(tag => `<span class="text-xs font-medium text-gray-500 bg-black/30 px-2 py-1 rounded border border-white/5">${tag}</span>`).join('')}
                    </div>

                    <div class="mt-auto pt-4 border-t border-white/5">
                        <a class="cursor-pointer font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center justify-between w-full" data-page="case-studies" data-target-project="#${project.id}">
                            <span>Explore Case Study</span>
                            <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                        </a>
                    </div>
                </div>
            </div>`;
        }).join('');
    }

    function renderCaseStudies() {
        const container = document.getElementById("case-studies-container");
        if (!container) return;
        container.innerHTML = portfolioData.map((project, index) => {
            const isEven = index % 2 === 0;
            return `
            <article id="${project.id}" class="mb-48 scroll-mt-32 relative group">
                <!-- Decorative Background Blur -->
                <div class="absolute -top-20 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
                <div class="absolute top-40 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

                <!-- 1. Hero Section -->
                <div class="text-center mb-16 relative">
                    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6 shadow-lg shadow-cyan-500/5">
                        <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span> Case Study 0${index + 1}
                    </div>
                    <h2 class="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-gray-400 leading-tight drop-shadow-sm">${project.title}</h2>
                    <p class="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-light">${project.description}</p>
                    
                    <div class="flex flex-wrap justify-center gap-4">
                         ${project.liveDemoLink ? `
                            <a href="${project.liveDemoLink}" target="_blank" class="group/btn relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300">
                                <span class="relative z-10">Live Link</span>
                                <svg class="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                                <div class="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                            </a>
                         ` : ''}
                         ${project.repoLink ? `
                            <a href="${project.repoLink}" target="_blank" class="group/btn inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold tracking-wide transition-all duration-300 hover:-translate-y-1">
                                <svg class="w-5 h-5 text-gray-400 group-hover/btn:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg>
                                <span>Repository</span>
                            </a>
                         ` : ''}
                    </div>
                </div>

                <!-- 2. Main Content Grid -->
                <div class="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                    
                    <!-- Content Column (Left/Right alternating could be cool, but let's stick to consistent Left for readability) -->
                    <div class="lg:col-span-8 space-y-12">
                        
                        <!-- Challenge & Solution Cards -->
                        <div class="grid md:grid-cols-2 gap-6">
                            <!-- Challenge -->
                            <div class="relative group/card">
                                <div class="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl opacity-20 group-hover/card:opacity-40 transition duration-500 blur"></div>
                                <div class="relative h-full bg-[#121212] border border-white/10 p-8 rounded-2xl">
                                    <div class="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-6 text-red-500">
                                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                                    </div>
                                    <h3 class="text-xl font-bold text-white mb-3">The Challenge</h3>
                                    <p class="text-gray-400 leading-relaxed text-sm">${project.problem}</p>
                                </div>
                            </div>

                            <!-- Solution -->
                            <div class="relative group/card">
                                <div class="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl opacity-20 group-hover/card:opacity-40 transition duration-500 blur"></div>
                                <div class="relative h-full bg-[#121212] border border-white/10 p-8 rounded-2xl">
                                    <div class="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 text-green-500">
                                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                    </div>
                                    <h3 class="text-xl font-bold text-white mb-3">The Solution</h3>
                                    <p class="text-gray-400 leading-relaxed text-sm">${project.solution}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Architecture Diagram -->
                        <div class="space-y-6">
                            <div class="flex items-center gap-3 mb-2">
                                <div class="h-px bg-white/10 flex-grow"></div>
                                <span class="text-xs font-bold text-gray-500 uppercase tracking-widest">System Architecture</span>
                                <div class="h-px bg-white/10 flex-grow"></div>
                            </div>
                            <div class="p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent border border-white/5 shadow-2xl">
                                <div class="bg-black/40 rounded-xl overflow-hidden backdrop-blur-sm relative group/img">
                                    <img src="${project.architectureDiagram}" alt="Architecture Diagram" class="w-full h-auto opacity-90 group-hover/img:opacity-100 group-hover/img:scale-[1.02] transition-all duration-700 ease-in-out">
                                    
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <span class="text-sm font-medium text-white">Figure 1.0: End-to-End System Flow</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Code Logic -->
                        <div class="space-y-6">
                            <div class="flex items-center gap-3 mb-2">
                                <div class="h-px bg-white/10 flex-grow"></div>
                                <span class="text-xs font-bold text-gray-500 uppercase tracking-widest">Workflow Logic</span>
                                <div class="h-px bg-white/10 flex-grow"></div>
                            </div>
                            
                            <div class="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl">
                                <!-- Mock Window Header -->
                                <div class="bg-[#161b22] px-4 py-3 border-b border-white/5 flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                        <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                        <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                    </div>
                                    <span class="text-xs text-gray-400 font-mono">logic_flow.${project.codeSnippet.language === 'python' ? 'py' : 'js'}</span>
                                    <div class="w-12"></div> <!-- Spacer for center alignment -->
                                </div>
                                <!-- Content -->
                                <div class="p-6 overflow-x-auto custom-scrollbar">
                                    <pre class="font-mono text-sm leading-relaxed"><code class="language-${project.codeSnippet.language}">${project.codeSnippet.code.trim()}</code></pre>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Sticky Sidebar Meta -->
                    <div class="lg:col-span-4 relative">
                        <div class="sticky top-32 space-y-8">
                            
                            <!-- Tech Stack -->
                            <div class="p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md">
                                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Technologies</h4>
                                <div class="flex flex-wrap gap-2">
                                    ${project.tags.map(tag => `
                                        <span class="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-medium text-gray-300 hover:text-white hover:border-cyan-500/50 transition-colors cursor-default select-none">
                                            ${tag}
                                        </span>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- Impact & Learnings -->
                            <div class="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/20 to-blue-600/5 border border-cyan-500/20">
                                <div class="bg-[#0c0c0c] rounded-[22px] p-6 h-full relative overflow-hidden">
                                    <div class="absolute top-0 right-0 p-4 opacity-10">
                                        <svg class="w-24 h-24 text-cyan-500" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                                    </div>

                                    ${project.businessImpact ? `
                                        <div class="mb-8 relative z-10">
                                            <h5 class="text-cyan-400 font-bold mb-2 text-sm flex items-center gap-2">
                                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                                                Business Impact
                                            </h5>
                                            <p class="text-gray-400 text-sm leading-relaxed border-l-2 border-cyan-500/20 pl-4">
                                                ${project.businessImpact}
                                            </p>
                                        </div>
                                    ` : ''}

                                    ${project.keyLearnings ? `
                                        <div class="relative z-10">
                                            <h5 class="text-blue-400 font-bold mb-2 text-sm flex items-center gap-2">
                                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                                                Key Learnings
                                            </h5>
                                            <p class="text-gray-400 text-sm leading-relaxed border-l-2 border-blue-500/20 pl-4">
                                                ${project.keyLearnings}
                                            </p>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </article>`;
        }).join('');
    }

    function renderKomdigiPath() {
        const container = document.getElementById("komdigi-path-container");
        if (!container) return;
        container.innerHTML = komdigiData.map(item => {
            const levelColor = { 'Micro Skill': 'bg-yellow-800/50 text-yellow-300', 'Beginner': 'bg-blue-800/50 text-blue-300', 'Intermediate': 'bg-green-800/50 text-green-300', 'Advance': 'bg-purple-800/50 text-purple-300', 'Hackathon': 'bg-red-800/50 text-red-300' };
            const statusColor = item.status === 'In Progress' ? 'text-cyan-400' : item.status === 'Completed' ? 'text-green-400' : 'text-gray-500';
            const progressGradient = item.status === 'In Progress' ? 'linear-gradient(90deg, #00C9FF, #92FE9D)' : item.status === 'Completed' ? 'linear-gradient(90deg, #10B981, #6EE7B7)' : '#4A5568';
            const certificateButton = item.status === 'Completed' && item.certificateLink ?
                `<a href="${item.certificateLink}" target="_blank" class="text-sm font-semibold text-green-400 hover:text-green-300 transition-colors">Lihat Sertifikat</a>` : '';

            return `<div class="card rounded-2xl p-8">
                <div class="grid md:grid-cols-12 gap-x-8">
                    <div class="md:col-span-8">
                        <div class="flex items-center gap-4 mb-3">
                            <span class="inline-block px-3 py-1 rounded-full text-sm font-semibold ${levelColor[item.level] || ''}">${item.level}</span>
                        </div>
                        <h3 class="text-2xl font-bold text-white">${item.title}</h3>
                        <p class="text-lg font-medium text-gray-400 mb-4">${item.program}</p>
                        <div class="space-y-2 text-sm mb-6">
                            <p><strong class="text-gray-300">Pendaftaran:</strong> ${item.registration}</p>
                            <p><strong class="text-gray-300">Pelaksanaan:</strong> ${item.execution}</p>
                        </div>
                        <div class="mb-2">
                            <div class="flex justify-between items-center mb-1">
                                <span class="text-sm font-medium ${statusColor}">${item.status}</span>
                                <span class="text-sm font-bold text-white">${item.progress}%</span>
                            </div>
                            <div class="w-full bg-gray-700 rounded-full h-2.5">
                                <div class="h-2.5 rounded-full" style="width: ${item.progress}%; background: ${progressGradient};"></div>
                            </div>
                        </div>
                    </div>
                    <div class="md:col-span-4 mt-6 md:mt-0">
                        <h4 class="font-semibold text-white mb-3">Materi & Kompetensi</h4>
                        <ul class="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            ${[...item.materials, ...item.competencies].map(mat => `<li>${mat}</li>`).join('')}
                        </ul>
                         <div class="mt-6 pt-4 border-t border-gray-700/50 flex items-center gap-6">
                            <a href="${item.syllabusLink}" target="_blank" class="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">Lihat Silabus</a>
                            ${certificateButton}
                        </div>
                    </div>
                </div>
            </div>`;
        }).join('');
    }

    function renderUnifiedCalendar() {
        const container = document.getElementById("unified-calendar-container");
        if (!container) return;
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const startYear = 2025, endYear = 2027;
        const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const roadmapPhaseColors = ['#0077b6', '#fb8500', '#8338ec', '#d00000'];
        const komdigiColor = '#94d2bd';

        const getRoadmapPhaseIndex = (date) => {
            const normDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            for (let i = 0; i < roadmapData.length; i++) {
                const item = roadmapData[i];
                const startDate = new Date(item.startDate);
                const endDate = new Date(item.endDate);
                const normStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                const normEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
                if (normDate >= normStart && normDate <= normEnd) return i;
            }
            return -1;
        };

        const isKomdigiDay = (date) => {
            const normDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            for (const item of komdigiData) {
                const startDate = new Date(item.startDate);
                const endDate = new Date(item.endDate);
                const normStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                const normEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
                if (normDate >= normStart && normDate <= normEnd) return true;
            }
            return false;
        };

        let calendarHtml = "";
        for (let y = startYear; y <= endYear; y++) {
            for (let m = 0; m < 12; m++) {
                const firstDayOfMonth = (new Date(y, m, 1)).getDay();
                const daysInMonth = (new Date(y, m + 1, 0)).getDate();
                calendarHtml += `<div><h4 class="font-bold text-lg mb-2 text-white">${monthNames[m]} ${y}</h4><div class="calendar-grid">`;
                ['M', 'S', 'S', 'R', 'K', 'J', 'S'].forEach(d => { calendarHtml += `<div class="text-xs text-center text-gray-500 font-semibold">${d}</div>` });
                for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) calendarHtml += '<div class="calendar-day empty"></div>';
                for (let day = 1; day <= daysInMonth; day++) {
                    const currentDate = new Date(y, m, day);
                    let dayClass = "calendar-day", markHtml = "";

                    const roadmapPhaseIdx = getRoadmapPhaseIndex(currentDate);
                    const onKomdigiDay = isKomdigiDay(currentDate);

                    if (roadmapPhaseIdx !== -1 && onKomdigiDay) {
                        markHtml = `<div class="calendar-day-mark" style="background: linear-gradient(45deg, ${roadmapPhaseColors[roadmapPhaseIdx]} 50%, ${komdigiColor} 50%);"></div>`;
                    } else if (roadmapPhaseIdx !== -1) {
                        markHtml = `<div class="calendar-day-mark roadmap-fase${roadmapPhaseIdx + 1}-mark"></div>`;
                    } else if (onKomdigiDay) {
                        markHtml = `<div class="calendar-day-mark komdigi-mark"></div>`;
                    }

                    if (currentDate.getTime() === today.getTime()) dayClass += " today";
                    calendarHtml += `<div class="${dayClass}">${day}${markHtml}</div>`;
                }
                calendarHtml += "</div></div>";
            }
        }
        container.innerHTML = calendarHtml;
    }

    function renderTechStack() {
        const container = document.getElementById("tech-stack-container");
        if (!container) return;
        container.innerHTML = techStackData.map(tech => `<div class="text-center group flex flex-col items-center tech-logo" style="--tech-color: ${tech.color};"><svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${tech.svg}</svg><p class="mt-2 text-sm font-semibold text-gray-400 group-hover:text-white transition-colors">${tech.name}</p></div>`).join('');
    }

    function renderBlogList() {
        const container = document.getElementById("blog-list-container");
        if (!container) return;
        container.innerHTML = blogData.map(post => `<div class="card card-clickable blog-topic p-6 rounded-2xl" data-post-id="${post.id}"><p class="text-sm text-gray-400 mb-2">${post.date}</p><h3 class="text-xl font-bold text-white mb-2">${post.title}</h3><p class="text-gray-300 text-sm">${post.summary}</p></div>`).join('');
    }

    function showBlogPost(postId) {
        const post = blogData.find(p => p.id === postId);
        if (post) {
            document.getElementById("blog-detail-title").innerText = post.title;
            document.getElementById("blog-detail-content").innerHTML = post.fullContent;
            document.getElementById("blog-list-view").classList.add("hidden");
            document.getElementById("blog-detail-view").classList.remove("hidden");
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (window.Prism) window.Prism.highlightAll();
        }
    }

    function showBlogList() {
        document.getElementById("blog-list-view").classList.remove("hidden");
        document.getElementById("blog-detail-view").classList.add("hidden");
    }

    // --- Interaction ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const openIcon = document.getElementById('hamburger-open-icon');
    const closeIcon = document.getElementById('hamburger-close-icon');

    function switchPage(pageId, targetProject = null) {
        pages.forEach(page => page.classList.toggle('active', page.id === pageId));
        document.querySelectorAll('.nav-link').forEach(navLink => {
            const isTargetLink = navLink.getAttribute('data-page') === pageId;
            navLink.classList.toggle('text-white', isTargetLink);
            navLink.classList.toggle('bg-gray-700', isTargetLink);
            navLink.classList.toggle('text-gray-300', !isTargetLink);
        });
        if (!targetProject) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setTimeout(() => {
                const projectElement = document.querySelector(targetProject);
                if (projectElement) projectElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }


    function renderCaseStudyNav() {
        const menuContainer = document.getElementById("case-study-menu");
        if (!menuContainer) return;

        menuContainer.innerHTML = portfolioData.map(project => `
            <li>
                <a href="#${project.id}" class="case-nav-link" data-target="${project.id}">
                    ${project.title}
                </a>
            </li>
        `).join('');

        // Smooth Scroll for Sidebar
        document.querySelectorAll('.case-nav-link').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    // Update URL hash without jumping
                    history.pushState(null, null, `#${targetId}`);
                    // Smooth scroll
                    window.scrollTo({
                        top: targetSection.offsetTop - 100, // Offset for sticky header
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    function initScrollSpy() {
        const sections = document.querySelectorAll('#case-studies-container article');
        const navLinks = document.querySelectorAll('.case-nav-link');

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px', // Trigger when section is near top
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active from all
                    navLinks.forEach(link => link.classList.remove('active'));
                    // Add active to current
                    const activeLink = document.querySelector(`.case-nav-link[href="#${entry.target.id}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    // --- Initialization ---
    function initializePage() {
        renderAboutMe();
        renderStudentInfo();
        renderStats();
        renderRoadmap();
        renderTechStack();
        renderKomdigiPath();
        renderCaseStudies();
        renderCaseStudyNav(); // New Function
        renderUnifiedCalendar();
        renderBlogList();
        fetchGithubActivity();
        renderPortfolioPreview();

        // Initialize ScrollSpy after a slight delay to ensure DOM is ready
        setTimeout(initScrollSpy, 500);

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const pageId = e.currentTarget.getAttribute('data-page');
                const targetProject = e.currentTarget.getAttribute('data-target-project');
                if (pageId) {
                    switchPage(pageId, targetProject);
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        openIcon.classList.remove('hidden');
                        closeIcon.classList.add('hidden');
                    }
                }
            });
        });

        if (hamburgerBtn) {
            hamburgerBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                openIcon.classList.toggle('hidden');
                closeIcon.classList.toggle('hidden');
            });
        }

        document.addEventListener('click', function (e) {
            if (e.target.closest('#portfolio-container .nav-link')) {
                e.preventDefault();
                const link = e.target.closest('#portfolio-container .nav-link');
                switchPage(link.getAttribute('data-page'), link.getAttribute('data-target-project'));
            }
            if (e.target.closest('.blog-topic')) {
                showBlogPost(e.target.closest('.blog-topic').getAttribute('data-post-id'));
            }
        });

        const backBtn = document.getElementById('blog-back-button');
        if (backBtn) backBtn.addEventListener('click', showBlogList);
    }

    initializePage();
});
