

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

        // Calculate some dynamic stats
        const totalProjects = portfolioData.length;
        const totalSkills = techStackData.length;
        const activeBootcamp = bootcampsDirectory.find(b => b.status === "In Progress")?.title || "No Active Bootcamp";

        container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- 1. Main Profile Card (Span 2 cols) -->
            <div class="md:col-span-2 card p-8 rounded-3xl relative overflow-hidden group">
                <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-700 group-hover:bg-cyan-500/20"></div>
                
                <div class="relative z-10 flex flex-col sm:flex-row items-start gap-8">
                    <div class="relative">
                        <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-br from-cyan-400 to-blue-600">
                            <img class="w-full h-full rounded-full object-cover border-4 border-[#0f172a]" src="${studentData.avatar}" alt="${studentData.name}" onerror="this.src='https://placehold.co/150x150/1a1a1a/FFF?text=${studentData.name}'">
                        </div>
                        <div class="absolute -bottom-2 -right-2 bg-[#0f172a] rounded-full p-1.5 border border-white/10">
                            <div class="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                    
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2">
                            <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight">${studentData.name}</h2>
                            <span class="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">${studentData.role}</span>
                        </div>
                        <p class="text-lg text-gray-300 leading-relaxed mb-6 font-light">
                            ${studentData.description}
                        </p>
                        
                        <div class="flex flex-wrap gap-3">
                            ${studentData.github ? `
                            <a href="${studentData.github}" target="_blank" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-sm font-medium text-gray-300 hover:text-white">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                GitHub
                            </a>` : ''}
                            ${studentData.linkedin ? `
                            <a href="${studentData.linkedin}" target="_blank" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-sm font-medium text-gray-300 hover:text-white">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                LinkedIn
                            </a>` : ''}
                            ${studentData.email ? `
                            <a href="mailto:${studentData.email}" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 border border-transparent transition-all text-sm font-bold text-white shadow-lg shadow-cyan-500/20">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                Hire Me
                            </a>` : ''}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 2. Current Status Card -->
            <div class="card p-6 rounded-3xl flex flex-col justify-center relative overflow-hidden group">
                <div class="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
                <h3 class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">CURRENT FOCUS</h3>
                <div class="flex items-center gap-3 mb-2">
                    <span class="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                    <p class="text-xl font-bold text-white line-clamp-2">${activeBootcamp}</p>
                </div>
                <p class="text-sm text-gray-400">Deep diving into advanced topics and building real-world projects daily.</p>
            </div>

            <!-- 3. Education/Location Card -->
            <div class="card p-6 rounded-3xl flex flex-col justify-between group hover:border-white/10 transition-colors">
                <div>
                     <h3 class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">EDUCATION</h3>
                     <h4 class="font-bold text-white text-lg">${studentData.university}</h4>
                     <p class="text-cyan-400 text-sm">${studentData.major} • Semester ${studentData.semester}</p>
                </div>
                <div class="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                    <span class="text-xs text-gray-500">Bandung, Indonesia</span>
                    <img src="https://flagcdn.com/w20/id.png" alt="Indonesia" class="opacity-50 hover:opacity-100 transition-opacity">
                </div>
            </div>

            <!-- 4. Quick Actions (CV & Idea) -->
            <div class="card p-1 rounded-3xl flex items-center justify-between gap-1 bg-black/20 border border-white/5">
                <a href="${studentData.cv}" target="_blank" class="flex-1 flex flex-col items-center justify-center py-4 rounded-2xl hover:bg-white/5 transition-all group">
                    <svg class="w-6 h-6 text-gray-400 group-hover:text-white mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <span class="text-xs font-bold text-gray-400 group-hover:text-white">Download CV</span>
                </a>
                <div class="w-px h-10 bg-white/10"></div>
                <a href="${studentData.startupIdea}" class="flex-1 flex flex-col items-center justify-center py-4 rounded-2xl hover:bg-white/5 transition-all group">
                    <svg class="w-6 h-6 text-gray-400 group-hover:text-yellow-400 mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                    <span class="text-xs font-bold text-gray-400 group-hover:text-white">Startup Idea</span>
                </a>
            </div>
            
            <!-- 5. Key Stats -->
             <div class="card p-6 rounded-3xl flex items-center justify-around">
                <div class="text-center">
                    <div class="text-2xl font-bold text-white mb-0.5">${totalProjects}+</div>
                    <div class="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Projects</div>
                </div>
                 <div class="w-px h-10 bg-white/5"></div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-white mb-0.5">${totalSkills}+</div>
                    <div class="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Skills</div>
                </div>
                 <div class="w-px h-10 bg-white/5"></div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-white mb-0.5">100%</div>
                    <div class="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Committed</div>
                </div>
            </div>
        </div>
        `;
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

    // --- Bootcamps Directory Data (Static for Navigation) ---
    const bootcampsDirectory = [
        {
            id: 'komdigi',
            title: 'Komdigi x Mandiri AI Bootcamp',
            provider: 'Kementerian Kominfo & Bank Mandiri',
            description: 'Program intensif pembentukan AI Engineer profesional dengan kurikulum komprehensif mulai dari Machine Learning dasar hingga Deep Learning dan Generative AI.',
            year: '2025',
            status: 'Completed',
            logo: '<svg class="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
            color: 'from-cyan-500 to-blue-600'
        },
        {
            id: 'fullstack',
            title: 'The Complete Full Stack Data Science & AI Engineering',
            provider: 'Self-Paced Bootcamp',
            description: 'Comprehensive curriculum covering Python, Data Analysis, Machine Learning, MLOps, NLP, and Deep Learning with end-to-end projects.',
            year: '2026',
            status: 'Ongoing',
            logo: '<svg class="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>',
            color: 'from-purple-500 to-indigo-600'
        },
        {
            id: 'genai',
            title: 'Advanced GenAI: Mastering Agentic RAG & GraphRAG',
            provider: 'Specialization Path',
            description: 'Cutting-edge curriculum on Retrieval-Augmented Generation, Vector DBs, LangChain/LangGraph Agents, and Knowledge Graphs.',
            year: '2026',
            status: 'Upcoming',
            logo: '<svg class="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>', // Placeholder lightning bolt
            color: 'from-emerald-500 to-teal-600'
        }
    ];

    function renderBootcampDirectory() {
        const container = document.getElementById('bootcamp-list-container');
        if (!container) return;

        container.innerHTML = bootcampsDirectory.map(bootcamp => `
            <div class="card p-8 rounded-2xl group cursor-pointer hover:border-cyan-500/30 transition-all hover:-translate-y-1" onclick="showBootcampDetail('${bootcamp.id}')">
                <div class="flex items-start justify-between mb-6">
                    <div class="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
                        ${bootcamp.logo}
                    </div>
                    <span class="px-3 py-1 rounded-full text-xs font-bold bg-white/5 text-gray-400 border border-white/10 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 group-hover:border-cyan-500/20 transition-all">${bootcamp.year}</span>
                </div>
                
                <h3 class="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">${bootcamp.title}</h3>
                <p class="text-sm font-semibold text-gray-500 mb-4">${bootcamp.provider}</p>
                <p class="text-gray-400 leading-relaxed mb-6">${bootcamp.description}</p>
                
                <div class="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                    View Learning Path <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </div>
            </div>
        `).join('');
    }

    function showBootcampDetail(id) {
        if (id === 'komdigi') {
            document.getElementById('bootcamp-hero').style.display = 'block';
            document.getElementById('bootcamp-title').innerText = 'Komdigi x Mandiri AI Bootcamp';
            document.getElementById('bootcamp-desc').innerText = 'Perjalanan detail melalui program intensif AI Engineer.';
            renderBootcampTimeline(komdigiData);
        } else if (id === 'fullstack') {
            document.getElementById('bootcamp-hero').style.display = 'block';
            document.getElementById('bootcamp-title').innerText = 'The Complete Full Stack Data Science & AI Engineering Bootcamp';
            document.getElementById('bootcamp-desc').innerText = 'Mastering Data Science from Foundation to Advanced MLOps & Deep Learning.';
            renderBootcampTimeline(fullStackData);
        } else if (id === 'genai') {
            document.getElementById('bootcamp-hero').style.display = 'block';
            document.getElementById('bootcamp-title').innerText = 'Advanced GenAI: Mastering Agentic RAG & GraphRAG with LangGraph';
            document.getElementById('bootcamp-desc').innerText = 'Build the next generation of AI Agents with LangChain, Vector DBs, and Knowledge Graphs.';
            renderBootcampTimeline(advancedGenAIData);
        } else {
            // Fallback
            document.getElementById('bootcamp-hero').style.display = 'none';
        }

        document.getElementById('bootcamp-list-view').classList.add('hidden');
        document.getElementById('bootcamp-detail-view').classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function hideBootcampDetail() {
        document.getElementById('bootcamp-list-view').classList.remove('hidden');
        document.getElementById('bootcamp-detail-view').classList.add('hidden');
    }

    function renderBootcampTimeline(data) {
        const container = document.getElementById("komdigi-path-container");
        if (!container) return;

        // Add vertical line decoration if not present
        let html = '<div class="absolute left-8 top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>';

        html += data.map(item => {
            const levelColor = {
                'Micro Skill': 'bg-yellow-800/50 text-yellow-300',
                'Beginner': 'bg-blue-800/50 text-blue-300',
                'Intermediate': 'bg-green-800/50 text-green-300',
                'Advance': 'bg-purple-800/50 text-purple-300',
                'Hackathon': 'bg-red-800/50 text-red-300',
                'Specialization': 'bg-indigo-800/50 text-indigo-300',
                'Expert': 'bg-pink-800/50 text-pink-300'
            };
            const statusColor = item.status === 'In Progress' ? 'text-cyan-400' : item.status === 'Completed' ? 'text-green-400' : 'text-gray-500';
            const progressGradient = item.status === 'In Progress' ? 'linear-gradient(90deg, #00C9FF, #92FE9D)' : item.status === 'Completed' ? 'linear-gradient(90deg, #10B981, #6EE7B7)' : '#4A5568';
            const certificateButton = item.status === 'Completed' && item.certificateLink ?
                `<a href="${item.certificateLink}" target="_blank" class="text-sm font-semibold text-green-400 hover:text-green-300 transition-colors">Lihat Sertifikat</a>` : '';

            return `<div class="card rounded-2xl p-8 relative z-10">
                <div class="grid md:grid-cols-12 gap-x-8">
                    <div class="md:col-span-8">
                        <div class="flex items-center gap-4 mb-3">
                            <span class="inline-block px-3 py-1 rounded-full text-sm font-semibold ${levelColor[item.level] || 'bg-gray-800 text-gray-300'}">${item.level}</span>
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
                            ${(item.materials || []).concat(item.competencies || []).map(mat => `<li>${mat}</li>`).join('')}
                        </ul>
                         <div class="mt-6 pt-4 border-t border-gray-700/50 flex items-center gap-6">
                            <a href="${item.syllabusLink}" target="_blank" class="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">Lihat Silabus</a>
                            ${certificateButton}
                        </div>
                    </div>
                </div>
            </div>`;
        }).join('');
        container.innerHTML = html;
    }

    function renderGlobalCalendar() {
        const container = document.getElementById("global-calendar-container");
        if (!container) return;

        const today = new Date(); today.setHours(0, 0, 0, 0);
        const startYear = 2025, endYear = 2027;
        const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

        // Colors
        const roadmapColors = ['#0077b6', '#fb8500', '#8338ec', '#d00000'];
        const komdigiColor = '#94d2bd'; // Mint
        const fullStackColor = '#6366f1'; // Indigo
        const genAIColor = '#10b981'; // Emerald

        // Helper: Check if date is in range of any item in a dataset
        const checkDateInRange = (date, dataset) => {
            const normDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            for (const item of dataset) {
                if (!item.startDate || !item.endDate) continue;
                const startDate = new Date(item.startDate);
                const endDate = new Date(item.endDate);
                const normStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                const normEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
                if (normDate >= normStart && normDate <= normEnd) return true;
            }
            return false;
        };

        const getRoadmapPhase = (date) => {
            const normDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            for (let i = 0; i < roadmapData.length; i++) {
                const item = roadmapData[i];
                if (!item.startDate || !item.endDate) continue;
                const start = new Date(item.startDate); const end = new Date(item.endDate);
                if (normDate >= new Date(start.setHours(0, 0, 0, 0)) && normDate <= new Date(end.setHours(0, 0, 0, 0))) return i;
            }
            return -1;
        };

        let calendarHtml = "";
        for (let y = startYear; y <= endYear; y++) {
            for (let m = 0; m < 12; m++) { // 12 Months
                const firstDay = (new Date(y, m, 1)).getDay();
                const daysInMonth = (new Date(y, m + 1, 0)).getDate();

                // Skip months in past/future far away if needed, but showing all for now

                calendarHtml += `<div><h4 class="font-bold text-lg mb-2 text-white">${monthNames[m]} ${y}</h4><div class="calendar-grid">`;

                // Header
                ['M', 'S', 'S', 'R', 'K', 'J', 'S'].forEach(d => { calendarHtml += `<div class="text-xs text-center text-gray-500 font-semibold">${d}</div>` });

                // Empty slots
                for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) calendarHtml += '<div class="calendar-day empty"></div>';

                // Days
                for (let day = 1; day <= daysInMonth; day++) {
                    const currentDate = new Date(y, m, day);
                    let dayClass = "calendar-day";
                    let dotsHtml = "";

                    // Check events
                    const roadmapIdx = getRoadmapPhase(currentDate);
                    const isKomdigi = checkDateInRange(currentDate, komdigiData);
                    const isFullStack = checkDateInRange(currentDate, fullStackData);
                    const isGenAI = checkDateInRange(currentDate, advancedGenAIData);

                    // We will use small dots for multiple events to avoid messy gradients
                    if (roadmapIdx !== -1) dotsHtml += `<div class="w-1.5 h-1.5 rounded-full" style="background-color: ${roadmapColors[roadmapIdx]}"></div>`;
                    if (isKomdigi) dotsHtml += `<div class="w-1.5 h-1.5 rounded-full" style="background-color: ${komdigiColor}"></div>`;
                    if (isFullStack) dotsHtml += `<div class="w-1.5 h-1.5 rounded-full" style="background-color: ${fullStackColor}"></div>`;
                    if (isGenAI) dotsHtml += `<div class="w-1.5 h-1.5 rounded-full" style="background-color: ${genAIColor}"></div>`;

                    if (currentDate.getTime() === today.getTime()) dayClass += " today";

                    calendarHtml += `<div class="${dayClass}">
                        <span class="relative z-10">${day}</span>
                        <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                            ${dotsHtml}
                        </div>
                    </div>`;
                }
                calendarHtml += '</div></div>';
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
        container.innerHTML = blogData.map(post => `
            <article class="blog-topic group cursor-pointer flex flex-col h-full" data-post-id="${post.id}">
                <div class="relative overflow-hidden rounded-2xl mb-4 border border-white/10 aspect-video group-hover:border-purple-500/50 transition-all duration-300">
                    <img src="${post.coverImage || 'https://placehold.co/600x400/1e293b/cbd5e1?text=No+Cover'}" 
                         alt="${post.title}" 
                         class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60"></div>
                </div>
                
                <div class="flex flex-col flex-grow">
                    <div class="flex items-center gap-3 text-xs text-gray-400 mb-3">
                        <span class="px-2 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">${post.date}</span>
                        <span>•</span>
                        <span>${post.readTime || '5 min read'}</span>
                    </div>
                    
                    <h3 class="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2 leading-tight">
                        ${post.title}
                    </h3>
                    
                    <p class="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
                        ${post.summary}
                    </p>
                    
                    <div class="mt-auto flex items-center gap-2 text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
                        Read Article <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </div>
                </div>
            </article>
        `).join('');
    }

    function showBlogPost(postId) {
        const post = blogData.find(p => p.id === postId);
        if (post) {
            // Hero Section for Blog Detail
            const heroHtml = `
                <div class="mb-8">
                    <div class="relative h-64 md:h-96 rounded-3xl overflow-hidden mb-8 border border-white/10">
                        <img src="${post.coverImage || 'https://placehold.co/800x400/1e293b/cbd5e1?text=Cover+Image'}" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent"></div>
                        <div class="absolute bottom-0 left-0 p-8">
                             <div class="flex items-center gap-4 text-sm text-gray-300 mb-4">
                                <span class="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">${post.date}</span>
                                <span>${post.readTime || '5 min read'}</span>
                            </div>
                            <h1 class="text-3xl md:text-5xl font-bold text-white leading-tight">${post.title}</h1>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById("blog-detail-title").parentElement.innerHTML = `
                <h2 id="blog-detail-title" class="hidden">${post.title}</h2> 
                ${heroHtml}
                <div id="blog-detail-content" class="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
                    ${post.fullContent}
                </div>
            `;

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

    // Expose to global scope for HTML onclick
    window.showBootcampDetail = showBootcampDetail;

    // --- Initialization ---
    function initializePage() {
        renderAboutMe();
        // renderStudentInfo(); // Merged into About Me
        // renderStats(); // Merged into About Me
        renderRoadmap();
        renderTechStack();
        renderBootcampDirectory(); // Render the directory list
        // renderKomdigiPath(); // Removed: Rendered on demand
        renderCaseStudies();
        renderCaseStudyNav();
        renderGlobalCalendar(); // Use new global renderer
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

        const blogBackBtn = document.getElementById('blog-back-button');
        if (blogBackBtn) blogBackBtn.addEventListener('click', showBlogList);

        const bootcampBackBtn = document.getElementById('bootcamp-back-btn');
        if (bootcampBackBtn) bootcampBackBtn.addEventListener('click', hideBootcampDetail);
    }

    initializePage();
});
