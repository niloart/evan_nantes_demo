
// --- State Management ---
const state = {
    currentPage: 'login', // login, instructions, recorder, dashboard
    user: { name: '', password: '' },
    permissionsGranted: false,
    recording: false,
    recordingTime: 0,
    timerInterval: null
};

// --- Navigate ---
function navigate(page) {
    state.currentPage = page;
    render();
}

// --- Render Logic ---
function render() {
    const app = document.getElementById('app');
    app.innerHTML = ''; // Clear content

    switch (state.currentPage) {
        case 'login':
            app.innerHTML = renderLogin();
            break;
        case 'instructions':
            app.innerHTML = renderInstructions();
            break;
        case 'recorder':
            app.innerHTML = renderRecorder();
            break;
        case 'dashboard':
            app.innerHTML = renderDashboard();
            break;
        default:
            app.innerHTML = renderLogin();
    }

    // Re-initialize icons
    lucide.createIcons();

    // specific post-render logic
    if (state.currentPage === 'dashboard') {
        initChart();
    }
}

// --- Components (HTML Templates) ---

function renderLogin() {
    return `
    <div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#003366] via-[#004e92] to-[#0066CC]">
        <!-- Background Shapes -->
        <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#00AEEF] rounded-full blur-3xl opacity-10 animate-pulse" style="animation-delay: 1s;"></div>

        <div class="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl animate-[slideUp_0.8s_ease-out]">
            <div class="flex flex-col items-center mb-8">
                <img src="logo.png" alt="Nantes Logo" class="h-16 mb-4 filter drop-shadow-lg animate-[fadeIn_0.5s_ease-out_0.2s_both]">
                <h1 class="text-2xl font-bold text-white tracking-wide">Avaliação de Apresentações</h1>
                <p class="text-blue-100 text-sm mt-1">Bem-vindo ao sistema de avaliação</p>
            </div>

            <form onsubmit="handleLogin(event)" class="space-y-6">
                <div class="space-y-2">
                    <label class="text-sm font-medium text-blue-100 ml-1">Usuário</label>
                    <div class="relative">
                        <i data-lucide="user" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 h-5 w-5"></i>
                        <input type="text" placeholder="Seu usuário corporativo" 
                            class="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00AEEF] text-white placeholder-blue-300/50 transition-all"
                            required>
                    </div>
                </div>

                <div class="space-y-2">
                    <label class="text-sm font-medium text-blue-100 ml-1">Senha</label>
                    <div class="relative">
                        <i data-lucide="lock" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 h-5 w-5"></i>
                        <input type="password" placeholder="Sua senha" 
                            class="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00AEEF] text-white placeholder-blue-300/50 transition-all"
                            required>
                    </div>
                </div>

                <button type="submit" 
                    class="w-full py-3.5 bg-gradient-to-r from-[#0066CC] to-[#00AEEF] hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl shadow-lg shadow-blue-900/30 flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] group">
                    <span>Vamos Começar</span>
                    <i data-lucide="arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
                </button>
            </form>

            <div class="mt-6 text-center">
                <p class="text-xs text-blue-200/60">© 2026 Nantes. Todos os direitos reservados.</p>
            </div>
        </div>
    </div>
    `;
}

function handleLogin(e) {
    e.preventDefault();
    navigate('instructions');
}


function renderInstructions() {
    const btnClass = state.permissionsGranted
        ? 'bg-green-50 border-green-200 text-green-700'
        : 'border-[#0066CC] text-[#0066CC] hover:bg-blue-50';

    const startBtnClass = state.permissionsGranted
        ? 'bg-[#003366] text-white hover:bg-[#0066CC] hover:scale-105 cursor-pointer'
        : 'bg-gray-300 text-gray-500 cursor-not-allowed';

    return `
    <div class="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <!-- Logo -->
        <div class="absolute top-6 left-6 z-20">
            <img src="logo.png" alt="Nantes Logo" class="h-8 brightness-0 invert">
        </div>

        <!-- Background Accents -->
        <div class="absolute top-0 left-0 w-full h-32 bg-[#003366] opacity-90 z-0"></div>
        <div class="absolute top-24 left-1/2 transform -translate-x-1/2 w-[120%] h-32 bg-white rounded-t-[50%] z-0"></div>

        <div class="max-w-4xl w-full relative z-10 animate-[fadeIn_0.5s_ease-out]">
            <div class="text-center mb-10 mt-8">
                <h2 class="text-3xl font-bold text-[#003366] mb-2">Instruções para Avaliação</h2>
                <p class="text-gray-500">Prepare seu ambiente para começar</p>
            </div>

            <div class="grid md:grid-cols-2 gap-8 mb-10">
                <!-- Permission Section -->
                <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm animate-[slideUp_0.5s_ease-out_0.2s_both]">
                    <div class="flex items-center space-x-3 mb-4">
                        <div class="p-2 bg-blue-100/50 rounded-lg text-[#0066CC]">
                            <i data-lucide="camera" class="w-6 h-6"></i>
                        </div>
                        <h3 class="font-semibold text-lg text-gray-800">Permissão de Acesso</h3>
                    </div>
                    <p class="text-sm text-gray-600 mb-6 leading-relaxed">
                        O sistema precisa de acesso à sua câmera e microfone para registrar sua apresentação.
                        Por favor, autorize o acesso no seu navegador.
                    </p>

                    <button onclick="grantPermissions()" ${state.permissionsGranted ? 'disabled' : ''}
                        class="w-full py-3 rounded-xl border-2 font-medium transition-all flex items-center justify-center space-x-2 ${btnClass}">
                        ${state.permissionsGranted
            ? `<i data-lucide="check-circle" class="w-5 h-5"></i><span>Permissões Concedidas</span>`
            : `<span>Conceder Permissões</span>`}
                    </button>
                </div>

                <!-- Positioning Guide -->
                <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm animate-[slideUp_0.5s_ease-out_0.4s_both]">
                    <div class="flex items-center space-x-3 mb-4">
                        <div class="p-2 bg-blue-100/50 rounded-lg text-[#0066CC]">
                            <i data-lucide="user" class="w-6 h-6"></i>
                        </div>
                        <h3 class="font-semibold text-lg text-gray-800">Posicionamento</h3>
                    </div>

                    <ul class="space-y-3 text-sm text-gray-600 mb-6">
                        <li class="flex items-start space-x-2">
                            <span class="w-1.5 h-1.5 bg-[#0066CC] rounded-full mt-1.5 flex-shrink-0"></span>
                            <span>Esteja em um local bem iluminado.</span>
                        </li>
                        <li class="flex items-start space-x-2">
                            <span class="w-1.5 h-1.5 bg-[#0066CC] rounded-full mt-1.5 flex-shrink-0"></span>
                            <span>Enquadre da cintura até acima da cabeça.</span>
                        </li>
                        <li class="flex items-start space-x-2">
                            <span class="w-1.5 h-1.5 bg-[#0066CC] rounded-full mt-1.5 flex-shrink-0"></span>
                            <span>Fale de forma clara e pausada.</span>
                        </li>
                    </ul>

                    <div class="h-24 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                        <span class="text-xs text-gray-400">Exemplo de Enquadramento</span>
                    </div>
                </div>
            </div>

            <div class="flex justify-center animate-[fadeIn_0.5s_ease-out_0.6s_both]">
                <button onclick="navigate('recorder')" ${!state.permissionsGranted ? 'disabled' : ''}
                    class="py-4 px-12 rounded-full font-bold text-lg shadow-xl shadow-blue-500/20 flex items-center space-x-2 transition-all ${startBtnClass}">
                    <span>Iniciar Apresentação</span>
                    <i data-lucide="arrow-right" class="w-5 h-5"></i>
                </button>
            </div>
        </div>
    </div>
    `;
}

function grantPermissions() {
    // Simulate async permission
    setTimeout(() => {
        state.permissionsGranted = true;
        render(); // Re-render to update UI
    }, 800);
}


function renderRecorder() {
    const mins = Math.floor(state.recordingTime / 60).toString().padStart(2, '0');
    const secs = (state.recordingTime % 60).toString().padStart(2, '0');
    const timeDisplay = `${mins}:${secs}`;

    return `
    <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 relative">
        <!-- Header -->
        <div class="absolute top-6 left-6 z-10">
            <img src="logo.png" alt="Nantes Logo" class="h-8 brightness-0 invert">
        </div>

        <div class="absolute top-6 right-6 flex items-center space-x-2 z-10">
            <div class="w-3 h-3 rounded-full ${state.recording ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}"></div>
            <span class="font-mono text-lg">${timeDisplay}</span>
        </div>

        <div class="w-full max-w-5xl aspect-video bg-gray-800 rounded-3xl overflow-hidden relative shadow-2xl border border-gray-800">
            <!-- Mock Camera Feed -->
            <div class="absolute inset-0 flex items-center justify-center bg-gray-800">
                <div class="text-center">
                    <i data-lucide="video" class="w-16 h-16 text-gray-600 opacity-50 mx-auto mb-4"></i>
                    <p class="text-gray-500 text-sm">Câmera Simulada</p>
                </div>
            </div>

            <!-- Overlay Grid -->
            <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20">
                <div class="border border-white/10"></div>
                <div class="border border-white/10"></div>
                <div class="border border-white/10"></div>
                <div class="border border-white/10"></div>
                <div class="border border-white/10"></div>
                <div class="border border-white/10"></div>
                <div class="border border-white/10"></div>
                <div class="border border-white/10"></div>
                <div class="border border-white/10"></div>
            </div>

            <!-- Recording Controls Overlay -->
            <div class="absolute bottom-8 left-0 w-full flex justify-center items-center space-x-6 z-20">
                ${!state.recording ? `
                <button onclick="startRecording()"
                    class="w-16 h-16 rounded-full bg-red-500 border-4 border-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors transform hover:scale-110 active:scale-95">
                    <div class="w-6 h-6 bg-white rounded-sm"></div>
                </button>
                ` : `
                <button onclick="stopRecording()"
                    class="w-16 h-16 rounded-full bg-transparent border-4 border-red-500 text-red-500 flex items-center justify-center hover:bg-red-500/10 transition-colors transform hover:scale-110 active:scale-95">
                    <i data-lucide="stop-circle" class="w-8 h-8 fill-current"></i>
                </button>
                `}
            </div>

            <!-- Audio waveform mock -->
            ${state.recording ? `
            <div class="absolute bottom-8 right-8 flex space-x-1 items-end h-8">
                <div class="w-1 bg-green-500 rounded-full animate-[pulse_0.5s_infinite]"></div>
                <div class="w-1 bg-green-500 rounded-full animate-[pulse_0.6s_infinite]"></div>
                <div class="w-1 bg-green-500 rounded-full animate-[pulse_0.4s_infinite]"></div>
                <div class="w-1 bg-green-500 rounded-full animate-[pulse_0.7s_infinite]"></div>
                <div class="w-1 bg-green-500 rounded-full animate-[pulse_0.5s_infinite]"></div>
            </div>
            ` : ''}
        </div>

        <div class="mt-6 text-gray-400 text-sm">
            ${state.recording ? 'Gravando... Fale com clareza.' : 'Aperte o botão vermelho para iniciar.'}
        </div>
    </div>
    `;
}

function startRecording() {
    state.recording = true;
    state.timerInterval = setInterval(() => {
        state.recordingTime++;
        // Update timer display without full re-render for performance? 
        // For simplicity, re-render is fine for this MVP scale.
        renderRecorderTimer();
    }, 1000);
    render();
}

function renderRecorderTimer() {
    // Only update the timer element to avoid flickering or re-initializing icons
    const mins = Math.floor(state.recordingTime / 60).toString().padStart(2, '0');
    const secs = (state.recordingTime % 60).toString().padStart(2, '0');
    const el = document.querySelector('.font-mono.text-lg');
    if (el) el.textContent = `${mins}:${secs}`;
}

function stopRecording() {
    state.recording = false;
    clearInterval(state.timerInterval);
    render();

    // Simulate processing
    setTimeout(() => {
        navigate('dashboard');
    }, 1500);
}


function renderDashboard() {
    return `
    <div class="min-h-screen bg-gray-50 text-gray-800 font-sans">
        <!-- Navbar -->
        <nav class="bg-[#003366] text-white p-4 shadow-lg sticky top-0 z-50">
            <div class="max-w-7xl mx-auto flex justify-between items-center">
                <div class="flex items-center">
                    <img src="logo.png" alt="Nantes Logo" class="h-8 brightness-0 invert">
                </div>
                <div class="flex items-center space-x-4">
                    <div class="text-right hidden md:block">
                        <p class="text-sm font-semibold">Elaine Fernandes Ribeiro</p>
                        <p class="text-xs text-blue-200">Participante</p>
                    </div>
                    <div class="bg-white/10 p-2 rounded-full">
                        <i data-lucide="user" class="w-5 h-5"></i>
                    </div>
                </div>
            </div>
        </nav>

        <main class="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
            <!-- Header Section -->
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-[fadeIn_0.5s_ease-out]">
                <div>
                    <h1 class="text-2xl font-bold text-[#003366]">Resultado da Avaliação</h1>
                    <p class="text-gray-500 mt-1">Apresentação de Produto e Perfil do Cliente</p>
                </div>
                <div class="mt-4 md:mt-0 flex items-center space-x-4">
                    <div class="text-center px-6 py-2 bg-blue-50 rounded-xl">
                        <p class="text-xs text-gray-500 uppercase tracking-wide">Nota Final</p>
                        <p class="text-3xl font-bold text-[#0066CC]">78,5</p>
                    </div>
                    <button class="p-3 text-gray-500 hover:text-[#003366] hover:bg-gray-100 rounded-lg transition-colors">
                        <i data-lucide="download" class="w-6 h-6"></i>
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Main Chart Card -->
                <div class="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px] flex flex-col animate-[fadeIn_0.5s_ease-out_0.2s_both]">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="font-semibold text-lg flex items-center space-x-2">
                            <i data-lucide="bar-chart-2" class="w-5 h-5 text-[#FF9900]"></i>
                            <span>Desempenho por Critério</span>
                        </h3>
                        <div class="flex space-x-4 text-xs">
                            <div class="flex items-center space-x-1">
                                <span class="w-3 h-3 rounded-full bg-[#0066CC] opacity-80"></span>
                                <span>Obtido</span>
                            </div>
                            <div class="flex items-center space-x-1">
                                <span class="w-3 h-3 rounded-full bg-red-400 opacity-60"></span>
                                <span>Máximo</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex-1 w-full h-full min-h-[350px] relative">
                        <canvas id="scoresChart"></canvas>
                    </div>
                </div>

                <!-- Score Breakdown -->
                <div class="space-y-6 animate-[fadeIn_0.5s_ease-out_0.3s_both]">
                    <!-- Breakdown list -->
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 class="font-semibold text-lg mb-4 flex items-center space-x-2">
                            <i data-lucide="check-circle" class="w-5 h-5 text-green-500"></i>
                            <span>Detalhamento</span>
                        </h3>
                        <div class="space-y-4">
                            ${[
            { subject: 'Domínio Técnico', score: 7.8, full: 10 },
            { subject: 'Comunicação', score: 7.8, full: 10 },
            { subject: 'Postura Profissional', score: 9.0, full: 10 },
            { subject: 'Escuta Ativa', score: 8.3, full: 10 },
            { subject: 'Soluções', score: 6.3, full: 10 },
            { subject: 'Ética', score: 9.0, full: 10 },
        ].map(item => `
                            <div class="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                <span class="text-sm font-medium text-gray-600">${item.subject}</span>
                                <div class="flex items-center space-x-2">
                                    <span class="font-bold text-[#003366]">${item.score}</span>
                                    <span class="text-xs text-gray-400">/ ${item.full}</span>
                                </div>
                            </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Additional Stats -->
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-blue-50 p-4 rounded-xl text-center">
                            <p class="text-xs text-gray-500 uppercase">Nota Banca A</p>
                            <p class="text-xl font-bold text-gray-800">71</p>
                        </div>
                        <div class="bg-blue-50 p-4 rounded-xl text-center">
                            <p class="text-xs text-gray-500 uppercase">Nota Banca B</p>
                            <p class="text-xl font-bold text-gray-800">86</p>
                        </div>
                    </div>

                    <div class="bg-orange-50 p-4 rounded-xl flex items-center justify-between border border-orange-100">
                        <div>
                            <p class="text-xs text-orange-600 font-bold uppercase">Nota Prova</p>
                            <p class="text-xs text-orange-400">Mínimo: 21 acertos</p>
                        </div>
                        <p class="text-2xl font-bold text-orange-600">23</p>
                    </div>
                </div>
            </div>

            <!-- Comments Section -->
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-[fadeIn_0.5s_ease-out_0.4s_both]">
                <h3 class="font-semibold text-lg mb-4 flex items-center space-x-2">
                    <i data-lucide="file-text" class="w-5 h-5 text-gray-400"></i>
                    <span>Comentários das Bancas</span>
                </h3>
                <div class="p-6 bg-gray-50 rounded-xl border-l-4 border-[#0066CC] italic text-gray-600 leading-relaxed">
                    "Iniciou um pouco nervosa, mas com a evolução da apresentação se acalmou e conseguiu assumir o controle da narrativa cobrindo todos os pontos relevantes da apresentação de produto e perfil do cliente. Ponto de melhoria é a gestão do tempo, estourou o tempo de apresentação. Bem clara, objetiva, mapeou bem o cliente, mapeou bem a situação em relação aos produtos, focou na posição de pagamento (PMT x Potencial de pgto) e ao final deixou o cliente decidir pela necessidade de ter o bem de imediato ou não, se for o CDC e aproveitou e sugeriu o SPF."
                </div>
            </div>
        </main>
    </div>
    `;
}

function initChart() {
    const ctx = document.getElementById('scoresChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Domínio Técnico', 'Comunicação', 'Postura Profissional', 'Escuta Ativa', 'Soluções', 'Ética'],
            datasets: [
                {
                    label: 'Obtido',
                    data: [7.8, 7.8, 9.0, 8.3, 6.3, 9.0],
                    fill: true,
                    backgroundColor: 'rgba(0, 102, 204, 0.2)', // nantes-accent
                    borderColor: '#003366', // nantes-primary
                    pointBackgroundColor: '#0066CC',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#003366'
                },
                {
                    label: 'Máximo',
                    data: [10, 10, 10, 10, 10, 10],
                    fill: true, // Fill the max area
                    backgroundColor: 'rgba(248, 113, 113, 0.1)', // red-400 equivalent
                    borderColor: '#f87171',
                    pointBackgroundColor: 'transparent',
                    pointBorderColor: 'transparent',
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: '#e5e7eb'
                    },
                    grid: {
                        color: '#e5e7eb'
                    },
                    pointLabels: {
                        color: '#4b5563',
                        font: {
                            size: 12
                        }
                    },
                    ticks: {
                        display: false, // hide numbers on axis
                        backdropColor: 'transparent'
                    },
                    suggestedMin: 0,
                    suggestedMax: 10
                }
            },
            plugins: {
                legend: {
                    display: false // We have a custom legend in HTML
                }
            }
        }
    });
}


// Initialize
render();

