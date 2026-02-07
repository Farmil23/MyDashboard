
// Access Security
function checkAccess() {
    const code = document.getElementById('access-code').value;
    if (code === 'Farmil23' || code === '1234') { // Simple client-side check
        document.getElementById('login-modal').classList.add('hidden');
        document.getElementById('admin-panel').classList.remove('hidden');
        initAdmin();
    } else {
        document.getElementById('login-error').classList.remove('hidden');
    }
}

// Global Data Copies
let currentStudentData = { ...studentData };
let currentRoadmapData = [...roadmapData];
let currentPortfolioData = [...portfolioData];
let currentKomdigiData = [...komdigiData];
let currentBlogData = [...blogData];
let currentTechStackData = [...techStackData];

function initAdmin() {
    renderProfileForm();
    renderRoadmapList();
    renderProjectsList();
    renderKomdigiList();
    renderBlogList();
    renderTechStackList();
}

// --- TAB SWITCHING ---
function switchTab(tabName) {
    // Buttons
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('bg-white/10', 'text-white', 'active'); // simplified active state
        btn.classList.add('text-gray-300');
    });
    const activeBtn = document.getElementById(`nav-${tabName}`);
    if (activeBtn) activeBtn.classList.add('bg-white/10', 'text-white', 'active');

    // Content
    document.querySelectorAll('.tab-content').forEach(section => section.classList.add('hidden'));
    document.getElementById(`tab-${tabName}`).classList.remove('hidden');

    // Title
    const titles = {
        'profile': 'Edit Profile',
        'roadmap': 'Roadmap Progress',
        'projects': 'Manage Projects',
        'komdigi': 'Komdigi Learning Path',
        'blog': 'Blog Editor',
        'techstack': 'Tech Stack Manager'
    };
    document.getElementById('current-tab-title').textContent = titles[tabName];
}

// --- RENDERERS ---

// 1. Profile
function renderProfileForm() {
    const container = document.getElementById('profile-form');
    container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="form-group">
                <label class="form-label">Major</label>
                <input type="text" class="form-input" value="${currentStudentData.major}" onchange="updateProfile('major', this.value)">
            </div>
            <div class="form-group">
                <label class="form-label">Semester</label>
                <input type="number" class="form-input" value="${currentStudentData.semester}" onchange="updateProfile('semester', parseInt(this.value))">
            </div>
             <div class="form-group md:col-span-2">
                <label class="form-label">University</label>
                <input type="text" class="form-input" value="${currentStudentData.university}" onchange="updateProfile('university', this.value)">
            </div>
            <div class="form-group md:col-span-2">
                <label class="form-label">Bio Description</label>
                <textarea class="form-input" onchange="updateProfile('description', this.value)">${currentStudentData.description}</textarea>
            </div>
        </div>
    `;
}
function updateProfile(key, value) { currentStudentData[key] = value; }

// 2. Roadmap
function renderRoadmapList() {
    const container = document.getElementById('roadmap-list');
    container.innerHTML = currentRoadmapData.map((item, index) => `
        <div class="card p-6 rounded-xl border border-white/5 relative">
            <h3 class="font-bold text-lg mb-4 text-cyan-400">Phase ${index + 1}: ${item.title}</h3>
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <label class="form-label">Status</label>
                    <select class="form-input" onchange="updateRoadmap(${index}, 'status', this.value)">
                        <option value="Not Started" ${item.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
                        <option value="In Progress" ${item.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                        <option value="Completed" ${item.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    </select>
                </div>
                <div>
                     <label class="form-label">Progress: <span id="roadmap-prog-val-${index}">${item.progress}</span>%</label>
                     <input type="range" class="w-full" min="0" max="100" value="${item.progress}" 
                        oninput="document.getElementById('roadmap-prog-val-${index}').innerText = this.value; updateRoadmap(${index}, 'progress', parseInt(this.value))">
                </div>
                <div class="md:col-span-2">
                     <label class="form-label">Subtitle (Goal)</label>
                     <input type="text" class="form-input" value="${item.subtitle}" onchange="updateRoadmap(${index}, 'subtitle', this.value)">
                </div>
                 <div class="md:col-span-2">
                     <label class="form-label">Target Project Name</label>
                     <input type="text" class="form-input" value="${item.goalProject}" onchange="updateRoadmap(${index}, 'goalProject', this.value)">
                </div>
            </div>
        </div>
    `).join('');
}
function updateRoadmap(index, key, value) { currentRoadmapData[index][key] = value; }

// 3. Projects
function renderProjectsList() {
    const container = document.getElementById('projects-list');
    container.innerHTML = currentPortfolioData.map((project, index) => `
        <div class="card p-6 rounded-xl border border-white/5 relative group">
            <button onclick="deleteProject(${index})" class="absolute top-4 right-4 text-red-500 hover:text-red-400 p-2"><i class="fas fa-trash"></i></button>
            <h3 class="font-bold text-xl mb-6 text-white border-b border-white/5 pb-2">Project: ${project.title}</h3>
            
            <div class="grid md:grid-cols-2 gap-6">
                <div class="md:col-span-2">
                    <label class="form-label">Title</label>
                    <input type="text" class="form-input" value="${project.title}" onchange="updateProject(${index}, 'title', this.value)">
                </div>
                <div class="md:col-span-2">
                    <label class="form-label">Description (Short)</label>
                    <textarea class="form-input h-24" onchange="updateProject(${index}, 'description', this.value)">${project.description}</textarea>
                </div>

                <!-- Case Study Details -->
                <div class="md:col-span-2 bg-black/20 p-4 rounded-lg">
                    <h4 class="text-sm font-bold text-cyan-400 mb-4 uppercase">Case Study Content</h4>
                    <div class="grid gap-4">
                        <div>
                            <label class="form-label">The Problem</label>
                            <textarea class="form-input" onchange="updateProject(${index}, 'problem', this.value)">${project.problem || ''}</textarea>
                        </div>
                        <div>
                            <label class="form-label">The Solution</label>
                            <textarea class="form-input" onchange="updateProject(${index}, 'solution', this.value)">${project.solution || ''}</textarea>
                        </div>
                        <div>
                             <label class="form-label">Tags (comma separated)</label>
                             <input type="text" class="form-input" value="${project.tags.join(', ')}" onchange="updateProjectTags(${index}, this.value)">
                        </div>
                         <div>
                             <label class="form-label">Architecture Image URL</label>
                             <input type="text" class="form-input" value="${project.architectureDiagram || ''}" onchange="updateProject(${index}, 'architectureDiagram', this.value)">
                        </div>
                        <div class="grid md:grid-cols-2 gap-4">
                             <div>
                                 <label class="form-label">Repo Link</label>
                                 <input type="text" class="form-input" value="${project.repoLink || ''}" onchange="updateProject(${index}, 'repoLink', this.value)">
                            </div>
                            <div>
                                 <label class="form-label">Live Demo Link</label>
                                 <input type="text" class="form-input" value="${project.liveDemoLink || ''}" onchange="updateProject(${index}, 'liveDemoLink', this.value)">
                            </div>
                        </div>
                         <div>
                             <label class="form-label">Code Snippet (Language)</label>
                             <select class="form-input" onchange="updateProjectCode(${index}, 'language', this.value)">
                                <option value="python" ${(project.codeSnippet && project.codeSnippet.language === 'python') ? 'selected' : ''}>Python</option>
                                <option value="javascript" ${(project.codeSnippet && project.codeSnippet.language === 'javascript') ? 'selected' : ''}>JavaScript</option>
                                <option value="plaintext" ${(project.codeSnippet && project.codeSnippet.language === 'plaintext') ? 'selected' : ''}>Plaintext</option>
                             </select>
                        </div>
                         <div>
                             <label class="form-label">Code Snippet (Content)</label>
                             <textarea class="form-input font-mono text-xs" rows="6" onchange="updateProjectCode(${index}, 'code', this.value)">${project.codeSnippet ? project.codeSnippet.code : ''}</textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}
function updateProject(index, key, value) { currentPortfolioData[index][key] = value; }
function updateProjectTags(index, str) { currentPortfolioData[index].tags = str.split(',').map(s => s.trim()).filter(s => s); }
function updateProjectCode(index, key, value) {
    if (!currentPortfolioData[index].codeSnippet) currentPortfolioData[index].codeSnippet = {};
    currentPortfolioData[index].codeSnippet[key] = value;
}
function addNewProject() {
    currentPortfolioData.unshift({
        id: `new-project-${Date.now()}`,
        title: 'New Project',
        description: 'New Project Description',
        tags: ['Python'],
        status: 'In Progress',
        problem: '', solution: '',
        repoLink: '', liveDemoLink: '',
        architectureDiagram: 'https://placehold.co/800x400',
        codeSnippet: { language: 'python', code: '# Add code here' },
        businessImpact: '', keyLearnings: ''
    });
    renderProjectsList();
    showToast('New project added! Edit below.');
}
function deleteProject(index) {
    if (confirm('Are you sure you want to delete this project?')) {
        currentPortfolioData.splice(index, 1);
        renderProjectsList();
    }
}

// 4. Komdigi (Simplified for brevity)
function renderKomdigiList() {
    const container = document.getElementById('komdigi-list');
    container.innerHTML = currentKomdigiData.map((item, index) => `
        <div class="card p-4 rounded-xl border border-white/5 flex justify-between items-center">
            <div>
                <h4 class="font-bold text-white">${item.title}</h4>
                <p class="text-xs text-gray-400">${item.level}</p>
            </div>
             <div class="flex gap-4 items-center">
                <select class="form-input py-1 px-3 text-sm w-32" onchange="updateKomdigi(${index}, 'status', this.value)">
                    <option value="Not Started" ${item.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
                    <option value="In Progress" ${item.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Completed" ${item.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
                <input type="number" class="form-input py-1 px-3 text-sm w-20" min="0" max="100" value="${item.progress}" onchange="updateKomdigi(${index}, 'progress', parseInt(this.value))">
            </div>
        </div>
    `).join('');
}
function updateKomdigi(index, key, value) { currentKomdigiData[index][key] = value; }

// 5. Blog
function renderBlogList() {
    const container = document.getElementById('blog-list');
    container.innerHTML = currentBlogData.map((post, index) => `
        <div class="card p-6 rounded-xl border border-white/5 relative group">
             <button onclick="deleteBlogPost(${index})" class="absolute top-4 right-4 text-red-500 hover:text-red-400 p-2"><i class="fas fa-trash"></i></button>
            <input type="text" class="form-input font-bold text-lg mb-4 bg-transparent border-none p-0 focus:ring-0" value="${post.title}" onchange="updateBlog(${index}, 'title', this.value)">
             <div class="grid gap-4">
                 <div>
                    <label class="form-label">Summary</label>
                    <input type="text" class="form-input" value="${post.summary}" onchange="updateBlog(${index}, 'summary', this.value)">
                 </div>
                 <div>
                    <label class="form-label">Content (HTML allowed)</label>
                    <textarea class="form-input font-mono" rows="6" onchange="updateBlog(${index}, 'fullContent', this.value)">${post.fullContent}</textarea>
                 </div>
                  <div>
                    <label class="form-label">Date</label>
                    <input type="text" class="form-input" value="${post.date}" onchange="updateBlog(${index}, 'date', this.value)">
                 </div>
             </div>
        </div>
    `).join('');
}
function updateBlog(index, key, value) { currentBlogData[index][key] = value; }
function addNewBlogPost() {
    currentBlogData.unshift({
        id: `post-${Date.now()}`,
        title: 'New Blog Post',
        summary: 'Short summary here.',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        fullContent: '<p>Write your content here...</p>'
    });
    renderBlogList();
}
function deleteBlogPost(index) {
    if (confirm('Delete this post?')) {
        currentBlogData.splice(index, 1);
        renderBlogList();
    }
}

// 6. Tech Stack
function renderTechStackList() {
    const container = document.getElementById('techstack-list');
    container.innerHTML = currentTechStackData.map((tech, index) => `
        <div class="bg-black/20 p-4 rounded-lg flex items-center gap-4">
            <div class="w-12 h-12 flex items-center justify-center bg-white/5 rounded" style="color: ${tech.color}">${tech.svg}</div>
            <div class="flex-1">
                 <input type="text" class="form-input mb-2" value="${tech.name}" onchange="updateTech(${index}, 'name', this.value)">
                 <input type="color" class="w-full h-8 cursor-pointer rounded bg-transparent" value="${tech.color}" onchange="updateTech(${index}, 'color', this.value)">
            </div>
             <div class="flex-1">
                <label class="form-label text-xs">SVG Path</label>
                <input type="text" class="form-input text-xs" value='${tech.svg}' onchange="updateTech(${index}, 'svg', this.value)">
            </div>
        </div>
    `).join('');
}
function updateTech(index, key, value) { currentTechStackData[index][key] = value; }


// --- EXPORT ---
function saveData() {
    const fileContent = `
const studentData = ${JSON.stringify(currentStudentData, null, 4)};

const roadmapData = ${JSON.stringify(currentRoadmapData, null, 4)};

const portfolioData = ${JSON.stringify(currentPortfolioData, null, 4)};

const komdigiData = ${JSON.stringify(currentKomdigiData, null, 4)};

const techStackData = ${JSON.stringify(currentTechStackData, null, 4)};

const blogData = ${JSON.stringify(currentBlogData, null, 4)};
`;

    // Trigger Download
    const blob = new Blob([fileContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('File downloaded! Please replace js/data.js');
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.querySelector('span').textContent = msg;
    toast.classList.remove('opacity-0', 'translate-y-20');
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-20');
    }, 3000);
}
