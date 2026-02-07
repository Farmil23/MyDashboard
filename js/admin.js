
// Access Security
function checkAccess() {
    const code = document.getElementById('access-code').value;
    if (code === '232615' || code === 'Farmil23') { // Updated valid code
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
let currentFullStackData = [...fullStackData]; // New
// Active Bootcamp Context
let activeBootcampContext = 'komdigi'; // 'komdigi' or 'fullstack'
let currentBlogData = [...blogData];
let currentTechStackData = [...techStackData];

function initAdmin() {
    renderProfileForm();
    renderRoadmapList();
    renderProjectsList();
    renderBootcampList();
    renderBlogList();
    renderTechStackList();
}

// --- TAB SWITCHING ---
function switchTab(tabName) {
    // Buttons
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('bg-slate-800', 'text-white', 'active');
        btn.classList.add('text-slate-400');
    });
    const activeBtn = document.getElementById(`nav-${tabName}`);
    if (activeBtn) activeBtn.classList.add('bg-slate-800', 'text-white', 'active');

    // Content
    document.querySelectorAll('.tab-content').forEach(section => section.classList.add('hidden'));
    document.getElementById(`tab-${tabName}`).classList.remove('hidden');

    // Title
    const titles = {
        'profile': 'Edit Profile',
        'roadmap': 'Roadmap Progress',
        'projects': 'Manage Projects',
        'bootcamps': 'Manage Bootcamps',
        'blog': 'Blog Editor',
        'techstack': 'Tech Stack Manager'
    };
    document.getElementById('current-tab-title').textContent = titles[tabName];
}

// --- HELPER: Image Upload ---
function handleImageUpload(event, callback) {
    const file = event.target.files[0];
    if (file) {
        if (file.size > 1024 * 1024) { // 1MB Limit Warning
            alert("Warning: File size is large (>1MB). This may slow down your site load time.");
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            callback(e.target.result); // Pass Base64 string to callback
        };
        reader.readAsDataURL(file);
    }
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
        <div class="card p-6 rounded-xl relative">
            <h3 class="font-bold text-lg mb-4 text-cyan-400">Phase ${index + 1}: ${item.title}</h3>
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <label class="form-label">Status</label>
                    <div class="relative">
                        <select class="form-input" onchange="updateRoadmap(${index}, 'status', this.value)">
                            <option value="Not Started" ${item.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
                            <option value="In Progress" ${item.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                            <option value="Completed" ${item.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        </select>
                    </div>
                </div>
                <div>
                     <label class="form-label">Progress: <span id="roadmap-prog-val-${index}">${item.progress}</span>%</label>
                     <input type="range" class="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" min="0" max="100" value="${item.progress}" 
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

                <!-- Syllabus & Certificate -->
                <div class="md:col-span-2 grid md:grid-cols-2 gap-6 bg-slate-800/30 p-4 rounded-lg border border-white/5">
                    <!-- Syllabus -->
                    <div>
                        <label class="form-label text-xs uppercase tracking-wider text-cyan-400 mb-2">Syllabus Link (PDF/URL)</label>
                        <input type="text" class="form-input text-xs mb-2" placeholder="Paste URL..." value="${item.syllabusLink || ''}" onchange="updateRoadmap(${index}, 'syllabusLink', this.value)" id="syllabus-url-${index}">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-[10px] text-gray-500 font-bold">OR UPLOAD FILE</span>
                            <div class="h-px bg-slate-700 flex-1"></div>
                        </div>
                        <input type="file" class="block w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20 cursor-pointer" 
                            onchange="handleImageUpload(event, (base64) => { updateRoadmap(${index}, 'syllabusLink', base64); document.getElementById('syllabus-url-${index}').value = 'File Loaded'; })">
                    </div>

                    <!-- Certificate -->
                     <div>
                        <label class="form-label text-xs uppercase tracking-wider text-green-400 mb-2">Certificate Link (PDF/URL)</label>
                        <input type="text" class="form-input text-xs mb-2" placeholder="Paste URL..." value="${item.certificateLink || ''}" onchange="updateRoadmap(${index}, 'certificateLink', this.value)" id="cert-url-${index}">
                         <div class="flex items-center gap-2 mb-2">
                            <span class="text-[10px] text-gray-500 font-bold">OR UPLOAD FILE</span>
                            <div class="h-px bg-slate-700 flex-1"></div>
                        </div>
                        <input type="file" class="block w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-green-500/10 file:text-green-400 hover:file:bg-green-500/20 cursor-pointer" 
                            onchange="handleImageUpload(event, (base64) => { updateRoadmap(${index}, 'certificateLink', base64); document.getElementById('cert-url-${index}').value = 'File Loaded'; })">
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}
function updateRoadmap(index, key, value) { currentRoadmapData[index][key] = value; }

// 3. Projects (With Image Upload)
function renderProjectsList() {
    const container = document.getElementById('projects-list');
    container.innerHTML = currentPortfolioData.map((project, index) => `
        <div class="card p-8 rounded-xl relative group transition-all hover:border-cyan-500/30">
            <button onclick="deleteProject(${index})" class="absolute top-4 right-4 text-red-500 hover:text-red-400 p-2 bg-slate-800 rounded-lg"><i class="fas fa-trash"></i></button>
            <h3 class="font-bold text-xl mb-6 text-white border-b border-slate-700 pb-4 flex items-center gap-3">
                <span class="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-lg text-sm">#${index + 1}</span> 
                ${project.title}
            </h3>
            
            <div class="grid md:grid-cols-2 gap-6">
                <!-- Basic Info -->
                <div class="md:col-span-2">
                    <label class="form-label">Title</label>
                    <input type="text" class="form-input font-bold text-lg" value="${project.title}" onchange="updateProject(${index}, 'title', this.value)">
                </div>
                <div class="md:col-span-2">
                    <label class="form-label">Description (Short/Teaser)</label>
                    <textarea class="form-input h-24 text-sm" onchange="updateProject(${index}, 'description', this.value)">${project.description}</textarea>
                </div>

                <!-- Case Study Details -->
                <div class="md:col-span-2 bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                    <h4 class="text-sm font-bold text-cyan-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                        <i class="fas fa-file-alt"></i> Case Study Content
                    </h4>
                    <div class="grid gap-6">
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="form-label">The Problem</label>
                                <textarea class="form-input text-sm" rows="4" onchange="updateProject(${index}, 'problem', this.value)">${project.problem || ''}</textarea>
                            </div>
                            <div>
                                <label class="form-label">The Solution</label>
                                <textarea class="form-input text-sm" rows="4" onchange="updateProject(${index}, 'solution', this.value)">${project.solution || ''}</textarea>
                            </div>
                        </div>
                        
                         <!-- Image Upload Section -->
                         <div class="p-4 bg-slate-900 rounded-lg border border-slate-700 border-dashed">
                             <label class="form-label mb-2">Architecture/Project Image</label>
                             <div class="flex flex-col md:flex-row gap-4 items-center">
                                 <div class="flex-1 w-full">
                                    <input type="text" class="form-input mb-2 text-xs" placeholder="Paste URL here..." value="${project.architectureDiagram || ''}" onchange="updateProject(${index}, 'architectureDiagram', this.value)" id="img-url-${index}">
                                    <div class="flex items-center gap-3">
                                        <div class="h-px bg-slate-700 flex-1"></div>
                                        <span class="text-xs text-slate-500 font-bold">OR UPLOAD</span>
                                        <div class="h-px bg-slate-700 flex-1"></div>
                                    </div>
                                    <input type="file" accept="image/*" class="mt-2 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20 cursor-pointer" 
                                        onchange="handleImageUpload(event, (base64) => { updateProject(${index}, 'architectureDiagram', base64); document.getElementById('img-preview-${index}').src = base64; document.getElementById('img-url-${index}').value = 'Base64 Image Loaded'; })">
                                 </div>
                                 <div class="w-full md:w-48 h-32 bg-black rounded-lg overflow-hidden border border-slate-700 flex items-center justify-center relative group/preview">
                                    <img id="img-preview-${index}" src="${project.architectureDiagram || 'https://placehold.co/400x300?text=No+Image'}" class="w-full h-full object-cover">
                                    <div class="absolute inset-0 bg-black/50 opacity-0 group-hover/preview:opacity-100 flex items-center justify-center text-xs text-white transition-opacity pointer-events-none">Preview</div>
                                 </div>
                             </div>
                        </div>

                        <div>
                             <label class="form-label">Tags (comma separated)</label>
                             <input type="text" class="form-input" value="${project.tags.join(', ')}" onchange="updateProjectTags(${index}, this.value)">
                        </div>

                        <div class="grid md:grid-cols-2 gap-4">
                             <div>
                                 <label class="form-label"><i class="fab fa-github"></i> Repo Link</label>
                                 <input type="text" class="form-input" value="${project.repoLink || ''}" onchange="updateProject(${index}, 'repoLink', this.value)">
                            </div>
                            <div>
                                 <label class="form-label"><i class="fas fa-link"></i> Live Demo Link</label>
                                 <input type="text" class="form-input" value="${project.liveDemoLink || ''}" onchange="updateProject(${index}, 'liveDemoLink', this.value)">
                            </div>
                        </div>
                         
                         <div>
                             <label class="form-label">Code Snippet</label>
                             <div class="flex gap-2 mb-2">
                                <select class="form-input w-40" onchange="updateProjectCode(${index}, 'language', this.value)">
                                    <option value="python" ${(project.codeSnippet && project.codeSnippet.language === 'python') ? 'selected' : ''}>Python</option>
                                    <option value="javascript" ${(project.codeSnippet && project.codeSnippet.language === 'javascript') ? 'selected' : ''}>JavaScript</option>
                                    <option value="plaintext" ${(project.codeSnippet && project.codeSnippet.language === 'plaintext') ? 'selected' : ''}>Plaintext</option>
                                </select>
                             </div>
                             <textarea class="form-input font-mono text-xs bg-[#0d1117] text-gray-300 border-none" rows="6" placeholder="Paste your code here..." onchange="updateProjectCode(${index}, 'code', this.value)">${project.codeSnippet ? project.codeSnippet.code : ''}</textarea>
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

// 4. Bootcamps (Generic)
function switchBootcampContext(bootcampId) {
    activeBootcampContext = bootcampId;
    renderBootcampList();
}

function renderBootcampList() {
    const container = document.getElementById('komdigi-list'); // Reusing ID for simplicity or rename in HTML
    let dataToRender = [];

    if (activeBootcampContext === 'komdigi') dataToRender = currentKomdigiData;
    else if (activeBootcampContext === 'fullstack') dataToRender = currentFullStackData;

    container.innerHTML = dataToRender.map((item, index) => `
        <div class="card p-4 rounded-xl border border-white/5 flex justify-between items-center">
            <div>
                <h4 class="font-bold text-white">${item.title}</h4>
                <p class="text-xs text-gray-400">${item.level || item.program}</p>
            </div>
             <div class="flex gap-4 items-center">
                <select class="form-input py-1 px-3 text-sm w-32" onchange="updateBootcampItem(${index}, 'status', this.value)">
                    <option value="Not Started" ${item.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
                    <option value="In Progress" ${item.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Completed" ${item.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
                <input type="number" class="form-input py-1 px-3 text-sm w-20" min="0" max="100" value="${item.progress}" onchange="updateBootcampItem(${index}, 'progress', parseInt(this.value))">
            </div>
        </div>
    `).join('');
}

function updateBootcampItem(index, key, value) {
    if (activeBootcampContext === 'komdigi') currentKomdigiData[index][key] = value;
    else if (activeBootcampContext === 'fullstack') currentFullStackData[index][key] = value;
}

// 5. Blog
function renderBlogList() {
    const container = document.getElementById('blog-list');
    container.innerHTML = currentBlogData.map((post, index) => `
        <div class="card p-8 rounded-xl border border-white/5 relative group transition-all hover:border-purple-500/30">
             <button onclick="deleteBlogPost(${index})" class="absolute top-4 right-4 text-red-500 hover:text-red-400 p-2 bg-slate-800 rounded-lg"><i class="fas fa-trash"></i></button>
            <div class="mb-6 border-b border-slate-700 pb-4">
                 <span class="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider mb-3 inline-block">Post #${index + 1}</span>
                <input type="text" class="form-input text-2xl font-bold bg-transparent border-none p-0 focus:ring-0 text-white placeholder-slate-600" value="${post.title}" placeholder="Enter Post Title..." onchange="updateBlog(${index}, 'title', this.value)">
            </div>

             <div class="grid md:grid-cols-12 gap-6">
                 <!-- Main Content -->
                 <div class="md:col-span-8 space-y-6">
                    <div>
                        <label class="form-label text-xs uppercase tracking-wider text-slate-500">Summary (Excerpt)</label>
                        <textarea class="form-input text-sm h-24" placeholder="Short description for the card..." onchange="updateBlog(${index}, 'summary', this.value)">${post.summary}</textarea>
                    </div>
                    <div>
                        <label class="form-label text-xs uppercase tracking-wider text-slate-500">Full Content (HTML Supported)</label>
                        <textarea class="form-input font-mono text-sm leading-relaxed text-gray-300 bg-[#0d1117]" rows="12" placeholder="<p>Write your content here...</p>" onchange="updateBlog(${index}, 'fullContent', this.value)">${post.fullContent}</textarea>
                        <p class="text-[10px] text-gray-500 mt-2">Tips: You can use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;img&gt; for styling.</p>
                    </div>
                 </div>

                 <!-- Sidebar Meta -->
                 <div class="md:col-span-4 space-y-6">
                     <!-- Cover Image -->
                    <div class="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                        <label class="form-label text-xs uppercase tracking-wider text-purple-400 mb-2">Cover Image</label>
                         <div class="w-full h-32 bg-black rounded-lg overflow-hidden border border-slate-700 mb-3 relative group/preview">
                            <img id="blog-img-preview-${index}" src="${post.coverImage || 'https://placehold.co/600x400?text=No+Cover'}" class="w-full h-full object-cover opacity-75 group-hover/preview:opacity-100 transition-opacity">
                         </div>
                        <input type="text" class="form-input text-xs mb-2" placeholder="Image URL..." value="${post.coverImage || ''}" onchange="updateBlog(${index}, 'coverImage', this.value)" id="blog-img-url-${index}">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-[10px] text-gray-500 font-bold">OR UPLOAD</span>
                            <div class="h-px bg-slate-700 flex-1"></div>
                        </div>
                        <input type="file" accept="image/*" class="block w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-500/10 file:text-purple-400 hover:file:bg-purple-500/20 cursor-pointer" 
                            onchange="handleImageUpload(event, (base64) => { updateBlog(${index}, 'coverImage', base64); document.getElementById('blog-img-preview-${index}').src = base64; document.getElementById('blog-img-url-${index}').value = 'Base64 Image Loaded'; })">
                    </div>

                    <div>
                        <label class="form-label text-xs uppercase tracking-wider text-slate-500">Publish Date</label>
                        <input type="text" class="form-input" value="${post.date}" placeholder="e.g 12 Aug 2025" onchange="updateBlog(${index}, 'date', this.value)">
                    </div>
                     <div>
                        <label class="form-label text-xs uppercase tracking-wider text-slate-500">Read Time</label>
                        <input type="text" class="form-input" value="${post.readTime || '5 min read'}" onchange="updateBlog(${index}, 'readTime', this.value)">
                    </div>
                 </div>
             </div>
        </div>
    `).join('');
}
function updateBlog(index, key, value) { currentBlogData[index][key] = value; }

function addNewBlogPost() {
    currentBlogData.unshift({
        id: 'new-post-' + Date.now(),
        title: 'New Untitled Post',
        summary: 'Write a short summary here...',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        fullContent: '<p>Start writing your new amazing article...</p>',
        coverImage: '',
        readTime: '3 min read'
    });
    renderBlogList();
    // Scroll to top
    document.getElementById('blog-list').scrollIntoView({ behavior: 'smooth' });
}

function deleteBlogPost(index) {
    if (confirm('Are you sure you want to delete this post?')) {
        currentBlogData.splice(index, 1);
        renderBlogList();
    }
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

const fullStackData = ${JSON.stringify(currentFullStackData, null, 4)};

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
