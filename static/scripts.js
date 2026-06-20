// === 0. ЛОГИКА СЛАЙДЕРА (ИСПРАВЛЕННАЯ) ===
let activePanel = null; 

function setActivePanel(panel) {
    if (window.innerWidth < 1024) return;
    if (activePanel === panel) return; 

    const calc = document.getElementById('panel-calc');
    const chat = document.getElementById('panel-chat');
    const overlayCalc = document.getElementById('overlay-calc');
    const overlayChat = document.getElementById('overlay-chat');

    if (panel === 'calc') {
        calc.style.width = '85%';
        chat.style.width = '15%';
        overlayCalc.classList.add('opacity-0', 'pointer-events-none');
        overlayCalc.classList.remove('opacity-100', 'pointer-events-auto');
        overlayChat.classList.remove('opacity-0', 'pointer-events-none');
        overlayChat.classList.add('opacity-100', 'pointer-events-auto');
    } else if (panel === 'chat') {
        calc.style.width = '15%';
        chat.style.width = '85%';
        overlayChat.classList.add('opacity-0', 'pointer-events-none');
        overlayChat.classList.remove('opacity-100', 'pointer-events-auto');
        overlayCalc.classList.remove('opacity-0', 'pointer-events-none');
        overlayCalc.classList.add('opacity-100', 'pointer-events-auto');
    }
    activePanel = panel;
}

// НОВАЯ ФУНКЦИЯ: Возврат панелей в центр
function resetPanels() {
    if (window.innerWidth < 1024) return;
    
    const calc = document.getElementById('panel-calc');
    const chat = document.getElementById('panel-chat');
    const overlayCalc = document.getElementById('overlay-calc');
    const overlayChat = document.getElementById('overlay-chat');

    calc.style.width = '50%';
    chat.style.width = '50%';
    
    overlayCalc.classList.add('opacity-0', 'pointer-events-none');
    overlayCalc.classList.remove('opacity-100', 'pointer-events-auto');
    overlayChat.classList.add('opacity-0', 'pointer-events-none');
    overlayChat.classList.remove('opacity-100', 'pointer-events-auto');
    
    activePanel = null;
}


// === 1. ГЕНЕРАЦИЯ ПЛАВАЮЩЕГО ФОНА (МГНОВЕННОЕ ЗАПОЛНЕНИЕ) ===
document.addEventListener('DOMContentLoaded', function() {
    const bgContainer = document.getElementById('floating-background') || document.body; 
    
    const initialIconsCount = 15; // Сколько иконок появится сразу
    const totalDesiredCount = 25; // Максимальное количество на экране

    // Иконки АУНиГ (Звезда/Грант, Диплом, Книга)
    const svgs = [
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/></svg>',
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v12H4zm16 14H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2zm1 1l-22.3 0z"/></svg>',
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.93a3 3 0 11-2 0V13h2v3.93zM13 11h-2V7h2v4z"/></svg>'
    ];

    function createIcon(isInitial) {
        if (!bgContainer) return;

        const icon = document.createElement('div');
        icon.classList.add('floating-icon');
        icon.innerHTML = svgs[Math.floor(Math.random() * svgs.length)];

        // Корпоративные цвета
        const colors = ['rgba(30, 58, 138, 0.15)', 'rgba(217, 119, 6, 0.1)']; 
        icon.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        const scale = Math.random() * (1.3 - 0.6) + 0.6;
        const duration = Math.random() * (25 - 15) + 15;
        
        icon.style.left = `${Math.random() * 100}vw`;

        // Логика мгновенного заполнения
        if (isInitial) {
            icon.style.top = `${Math.random() * 100}vh`; 
        } else {
            icon.style.top = '110vh'; 
        }

        icon.style.animationName = 'moveUp';
        icon.style.animationDuration = `${duration}s`;
        icon.style.animationTimingFunction = 'linear';
        icon.style.animationIterationCount = 'infinite';
        icon.style.animationDelay = `${Math.random() * -duration}s`; 
        icon.style.transform = `scale(${scale})`;

        bgContainer.appendChild(icon);

        setTimeout(() => {
            icon.remove();
        }, duration * 1000 + 5000); 
    }

    // Запускаем первые иконки сразу по всему экрану
    for (let i = 0; i < initialIconsCount; i++) {
        createIcon(true);
    }

    // Добавляем новые иконки снизу каждые 3 секунды
    setInterval(() => {
        if (document.querySelectorAll('.floating-icon').length < totalDesiredCount) {
            createIcon(false);
        }
    }, 3000); 
});


// === 2. ТАЙМЕР ОБРАТНОГО ОТСЧЕТА ===
function updateTimer() {
    const endDate = new Date("August 15, 2026 23:59:59").getTime();
    const now = new Date().getTime();
    const diff = endDate - now;

    if (diff < 0) {
        document.getElementById('countdown-timer').innerText = "Прием завершен";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const hStr = hours < 10 ? '0' + hours : hours;
    const mStr = mins < 10 ? '0' + mins : mins;
    const sStr = secs < 10 ? '0' + secs : secs;

    document.getElementById('countdown-timer').innerText = `${days} дн ${hStr} ч ${mStr} мин ${sStr} сек`;
}
setInterval(updateTimer, 1000);
updateTimer(); 


// === 3. ТЕСТ НА ПРОФОРИЕНТАЦИЮ ===
function openCareerTest() {
    const modal = document.getElementById('career-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.getElementById('test-question').classList.remove('hidden');
    document.getElementById('test-result').classList.add('hidden');
}

function closeCareerTest() {
    const modal = document.getElementById('career-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function showTestResult(specialty) {
    document.getElementById('test-question').classList.add('hidden');
    document.getElementById('test-result').classList.remove('hidden');
    document.getElementById('result-spec').innerText = specialty;
}


// === 4. ЛОГИКА КАЛЬКУЛЯТОРА ЕНТ (ВНУТРИ ПАНЕЛИ) ===
function calculateResults(event) {
    if(event) { event.preventDefault(); event.stopPropagation(); }
    
    const hist = parseInt(document.getElementById('hist').value) || 0;
    const math = parseInt(document.getElementById('math_lit').value) || 0;
    const read = parseInt(document.getElementById('read').value) || 0;
    const prof1 = parseInt(document.getElementById('prof1').value) || 0;
    const prof2 = parseInt(document.getElementById('prof2').value) || 0;
    
    const total = hist + math + read + prof1 + prof2;
    
    // Скрываем заглушку и показываем результаты СБОКУ
    document.getElementById('resultsPlaceholder').classList.add('hidden');
    document.getElementById('inlineResults').classList.remove('hidden');
    document.getElementById('inlineResults').classList.add('flex');
    
    document.getElementById('total-score-display').innerText = total;
    
    let chance1 = total > 90 ? 95 : (total > 70 ? 60 : 10);
    let chance2 = total > 100 ? 90 : (total > 80 ? 50 : 5);
    
    setTimeout(() => {
        document.getElementById('chance-1').innerText = chance1 + '%';
        document.getElementById('bar-1').style.width = chance1 + '%';
        document.getElementById('chance-2').innerText = chance2 + '%';
        document.getElementById('bar-2').style.width = chance2 + '%';
    }, 100);
}

// НОВАЯ ФУНКЦИЯ: Возврат к форме ввода баллов
function resetCalculator(event) {
    if(event) { event.preventDefault(); event.stopPropagation(); }
    document.getElementById('inlineResults').classList.add('hidden');
    document.getElementById('calculatorForm').classList.remove('hidden');
    
    // Сбрасываем полоски
    document.getElementById('bar-1').style.width = '0%';
    document.getElementById('bar-2').style.width = '0%';
}

// === 5. ЛОГИКА ЧАТ-БОТА ===
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const messageText = inputField.value.trim();
    
    if (messageText === '') return;
    
    const chatBox = document.getElementById('chat-box');
    
    const userHtml = `
        <div class="flex gap-3 justify-end">
            <div class="bg-blue-600 p-4 rounded-2xl rounded-tr-none shadow-md text-white font-medium max-w-[80%]">
                ${messageText}
            </div>
        </div>
    `;
    chatBox.insertAdjacentHTML('beforeend', userHtml);
    inputField.value = ''; 
    chatBox.scrollTop = chatBox.scrollHeight; 
    
    setTimeout(() => {
        let botResponse = "Я ИИ-помощник приемной комиссии АУНиГ. Уточни свой вопрос, пожалуйста.";
        
        if(messageText.toLowerCase().includes("общежити")) {
            botResponse = "Да, в АУНиГ есть комфортабельные Дома Студентов. Места в первую очередь предоставляются обладателям грантов и иногородним.";
        } else if (messageText.toLowerCase().includes("военн")) {
            botResponse = "При АУНиГ действует военная кафедра! Отбор проходит после 1 курса на основе успеваемости.";
        }
        
        const botHtml = `
            <div class="flex gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-1 shadow-md">AI</div>
                <div class="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-md text-slate-700 font-medium max-w-[80%] leading-relaxed">
                    ${botResponse}
                </div>
            </div>
        `;
        chatBox.insertAdjacentHTML('beforeend', botHtml);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
}