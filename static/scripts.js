// === 1. ЛОГИКА ПАНЕЛЕЙ (ПЛАВНАЯ) ===
let activePanel = null; 

function setActivePanel(panel) {
    if (window.innerWidth < 1024) return;
    if (activePanel === panel) return; 

    const calc = document.getElementById('panel-calc');
    const chat = document.getElementById('panel-chat');
    const overlayCalc = document.getElementById('overlay-calc');
    const overlayChat = document.getElementById('overlay-chat');

    if (panel === 'calc') {
        calc.style.width = '65%';
        chat.style.width = '35%';
        if(overlayCalc) { overlayCalc.classList.add('opacity-0', 'pointer-events-none'); overlayCalc.classList.remove('opacity-100', 'pointer-events-auto'); }
        if(overlayChat) { overlayChat.classList.remove('opacity-0', 'pointer-events-none'); overlayChat.classList.add('opacity-100', 'pointer-events-auto'); }
    } else if (panel === 'chat') {
        calc.style.width = '35%';
        chat.style.width = '65%';
        if(overlayChat) { overlayChat.classList.add('opacity-0', 'pointer-events-none'); overlayChat.classList.remove('opacity-100', 'pointer-events-auto'); }
        if(overlayCalc) { overlayCalc.classList.remove('opacity-0', 'pointer-events-none'); overlayCalc.classList.add('opacity-100', 'pointer-events-auto'); }
    }
    activePanel = panel;
}

function resetPanels() {
    if (window.innerWidth < 1024) return;
    document.getElementById('panel-calc').style.width = '50%';
    document.getElementById('panel-chat').style.width = '50%';
    
    const overlayCalc = document.getElementById('overlay-calc');
    const overlayChat = document.getElementById('overlay-chat');
    
    if(overlayCalc) { overlayCalc.classList.add('opacity-0', 'pointer-events-none'); overlayCalc.classList.remove('opacity-100', 'pointer-events-auto'); }
    if(overlayChat) { overlayChat.classList.add('opacity-0', 'pointer-events-none'); overlayChat.classList.remove('opacity-100', 'pointer-events-auto'); }
    activePanel = null;
}

// === 2. ТАЙМЕР И СЛАЙДЕР ФОТО ===
document.addEventListener('DOMContentLoaded', function() {
    function updateTimer() {
        const timerElement = document.getElementById('countdown-timer');
        if (!timerElement) return;

        const deadline = new Date('August 25, 2026 23:59:59').getTime();
        const now = new Date().getTime();
        const diff = deadline - now;

        if (diff < 0) { timerElement.innerText = "Прием завершен"; return; }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000); 
        
        timerElement.innerText = `${days} дн ${hours} ч ${minutes} мин ${seconds} сек`;
    }
    setInterval(updateTimer, 1000); 
    updateTimer();
});

let currentSlideIndex = 0;
function moveSlide(direction) {
    const slider = document.getElementById('media-slider');
    if (!slider) return;
    const totalSlides = slider.children.length;
    if (totalSlides === 0) return;
    currentSlideIndex = (currentSlideIndex + direction + totalSlides) % totalSlides;
    slider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
}

// === 3. УМНЫЙ КАЛЬКУЛЯТОР ЕНТ (С БАЗОЙ АУНиГ) ===
function calculateResults(event) {
    if(event) { event.preventDefault(); }
    
    const hist = parseInt(document.getElementById('hist').value) || 0;
    const math = parseInt(document.getElementById('math_lit').value) || 0;
    const read = parseInt(document.getElementById('read').value) || 0;
    const prof1 = parseInt(document.getElementById('prof1').value) || 0;
    const prof2 = parseInt(document.getElementById('prof2').value) || 0;
    
    const total = hist + math + read + prof1 + prof2;
    const subjectCombo = document.getElementById('subject-combo').value;
    
    // БАЗА ПРОФЕССИЙ (жестко привязана к предметам)
    const specialtiesDB = {
        "Математика - Физика": [
            { name: "Нефтегазовое дело", threshold: 85 },
            { name: "Бурение нефтяных и газовых месторождений", threshold: 80 },
            { name: "Геология и разведка месторождений", threshold: 78 },
            { name: "Проектирование и эксплуатация нефтегазопроводов", threshold: 82 },
            { name: "Электроэнергетика", threshold: 75 },
            { name: "Строительство", threshold: 70 },
            { name: "Технологические машины и оборудование", threshold: 72 },
            { name: "Транспорт, транспортная техника и технологии", threshold: 68 },
            { name: "Автоматизация и управление", threshold: 80 },
            { name: "Радиотехника, электроника и телекоммуникации", threshold: 76 }
        ],
        "Математика - Информатика": [
            { name: "Информационные системы", threshold: 90 },
            { name: "Вычислительная техника и программное обеспечение", threshold: 92 },
            { name: "Информационная безопасность", threshold: 95 },
            { name: "Компьютерные системы управления и робототехника", threshold: 88 },
            { name: "Инфокоммуникационные системы и сети", threshold: 85 }
        ],
        "Математика - География": [
            { name: "Экономика нефтегазового бизнеса", threshold: 85 },
            { name: "Менеджмент нефтегазового бизнеса", threshold: 82 },
            { name: "Финансы нефтегазового бизнеса", threshold: 88 },
            { name: "Учет и аудит нефтегазового бизнеса", threshold: 84 },
            { name: "Организация перевозок, движения и логистика", threshold: 78 },
            { name: "Маркетинг нефти и транспортировки", threshold: 80 }
        ],
        "Химия - Физика": [
            { name: "Химическая экспертиза и технология материалов", threshold: 75 },
            { name: "Химическая технология органических веществ", threshold: 78 },
            { name: "Технология пищевых продуктов", threshold: 68 },
            { name: "Материаловедение и технология новых материалов", threshold: 70 }
        ],
        "Биология - География": [
            { name: "Безопасность жизнедеятельности и защита окружающей среды", threshold: 72 },
            { name: "Рыбное хозяйство", threshold: 65 }
        ]
    };

    document.getElementById('resultsPlaceholder').classList.add('hidden');
    const inlineResults = document.getElementById('inlineResults');
    inlineResults.classList.remove('hidden');
    inlineResults.classList.add('flex');
    
    document.getElementById('total-score-display').innerText = total;

    const resultsContainer = document.getElementById('professions-list');
    if (!resultsContainer) return; 
    resultsContainer.innerHTML = '';

    const professions = specialtiesDB[subjectCombo] || [];

    if (total < 65) {
        resultsContainer.innerHTML = `<div class="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100">Для поступления необходимо набрать минимум 65 баллов.</div>`;
        return;
    }

    professions.forEach((prof, index) => {
        // Умный расчет шансов
        let chance = 0;
        if (total >= prof.threshold + 10) chance = 99;
        else if (total >= prof.threshold) chance = 85;
        else if (total >= prof.threshold - 5) chance = 50;
        else if (total >= prof.threshold - 10) chance = 20;
        else chance = 5;

        let colorClass = chance > 70 ? 'bg-green-500' : (chance > 40 ? 'bg-yellow-500' : 'bg-red-500');
        let textClass = chance > 70 ? 'text-green-600' : (chance > 40 ? 'text-yellow-600' : 'text-red-600');

        const profHtml = `
            <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md mb-3">
                <h4 class="font-bold text-slate-800 mb-2 text-sm leading-snug">${prof.name}</h4>
                <div class="flex justify-between text-xs mb-1 font-bold">
                    <span class="text-slate-500">Порог: ~${prof.threshold}</span>
                    <span class="${textClass}">Вероятность: ${chance}%</span>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div class="${colorClass} h-full rounded-full transition-all duration-1000" style="width: 0%" id="bar-${index}"></div>
                </div>
            </div>
        `;
        resultsContainer.insertAdjacentHTML('beforeend', profHtml);

        setTimeout(() => {
            const bar = document.getElementById(`bar-${index}`);
            if(bar) bar.style.width = `${chance}%`;
        }, 100);
    });
}

// === 4. ЧАТ-БОТ (ИНТЕГРАЦИЯ С РЕАЛЬНЫМ ИИ GEMINI/OPENAI) ===
function handleKeyPress(event) {
    if (event.key === 'Enter') sendMessage();
}

async function sendMessage(event) {
    if(event) event.preventDefault();
    
    const inputField = document.getElementById('chat-input');
    const messageText = inputField.value.trim();
    if (messageText === '') return;
    
    const chatBox = document.getElementById('chat-box');
    
    const userHtml = `<div class="flex gap-3 justify-end"><div class="bg-blue-600 p-3 rounded-2xl rounded-tr-none shadow-sm text-white text-sm max-w-[85%]">${messageText}</div></div>`;
    chatBox.insertAdjacentHTML('beforeend', userHtml);
    inputField.value = ''; 
    chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
    
    const loadingId = 'loading-' + Date.now();
    const loadingHtml = `<div id="${loadingId}" class="flex gap-3"><div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold mt-1 shadow-md">AI</div><div class="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm text-slate-400 text-sm italic">Анализирую...</div></div>`;
    chatBox.insertAdjacentHTML('beforeend', loadingHtml);
    chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });

    try {
        // Запрос к твоему Django Backend (views.py)
        const response = await fetch('/chatbot/api/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: messageText })
        });
        
        const data = await response.json();
        document.getElementById(loadingId).remove();

        if (data.status === 'success') {
            const formattedReply = data.reply.replace(/\n/g, '<br>');
            const botHtml = `<div class="flex gap-3"><div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold mt-1 shadow-md">AI</div><div class="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm text-slate-800 text-sm max-w-[85%] leading-relaxed">${formattedReply}</div></div>`;
            chatBox.insertAdjacentHTML('beforeend', botHtml);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        document.getElementById(loadingId).remove();
        const errorHtml = `<div class="flex gap-3"><div class="w-8 h-8 bg-red-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold mt-1 shadow-md">!</div><div class="bg-red-50 p-3 rounded-2xl rounded-tl-none border border-red-200 text-red-700 text-sm max-w-[85%]">Ошибка связи с ИИ. Убедитесь, что сервер Django запущен и API-ключ работает.</div></div>`;
        chatBox.insertAdjacentHTML('beforeend', errorHtml);
    }
    
    chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
}


