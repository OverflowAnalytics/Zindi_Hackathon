// ==========================================
// Slides & Demo Integration: Multi-Step Dialogue
// ==========================================
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

const startBtn = document.getElementById('startDemo');
const resetBtn = document.getElementById('resetDemo');
const listeningIndicator = document.getElementById('listeningIndicator');
const aiResponse = document.getElementById('aiResponse');
const aiResponseText = document.getElementById('aiResponseText');
const userInput = document.getElementById('userInput');
const userInputText = document.getElementById('userInputText');
const followUpQuestion = document.getElementById('followUpQuestion');
const progressBar = document.getElementById('progressBar');

let demoRunning = false;
let demoStep = 0;

// ===== Slide Navigation =====
function goToSlide(index) {
    slides[index].scrollIntoView({ behavior: 'smooth', inline: 'start' });
    currentSlide = index;
    updateDots();
}

function updateDots() {
    document.querySelectorAll('.nav-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// ===== Reset Demo =====
function resetDemo() {
    demoRunning = false;
    demoStep = 0;
    listeningIndicator.style.display = 'none';
    aiResponse.style.display = 'none';
    aiResponseText.textContent = '';
    userInput.style.display = 'none';
    userInputText.textContent = '';
    followUpQuestion.style.display = 'none';
    followUpQuestion.textContent = '';
    startBtn.style.display = 'inline-block';
    startBtn.textContent = '🎤 Start Demo';
    startBtn.disabled = false;
    resetBtn.style.display = 'none';
    progressBar.style.width = '0%';
}

// ===== Typing Animation =====
function showTypingDots() {
    aiResponse.style.display = 'block';
    aiResponseText.innerHTML = `<span class="dot">●</span><span class="dot">●</span><span class="dot">●</span>`;
}

// ===== Progress Bar =====
function animateProgress(percent, duration) {
    progressBar.style.transition = `width ${duration}ms linear`;
    progressBar.style.width = percent + '%';
}

// ===== Demo Steps =====
function runDemoStep() {
    switch (demoStep) {
        case 0:
            demoRunning = true;
            startBtn.textContent = '🎙️ Listening…';
            listeningIndicator.style.display = 'block';
            startBtn.disabled = true;

            // AI greeting
            setTimeout(() => {
                listeningIndicator.style.display = 'none';
                showTypingDots();
                animateProgress(15, 1500);

                setTimeout(() => {
                    aiResponseText.textContent = 'Good day! I am CariVoice. What is your full name?';
                    animateProgress(25, 2000);
                    userInput.style.display = 'block';
                    startBtn.textContent = '🎙️ Listen';
                    startBtn.disabled = false;
                }, 1500);

            }, 1000);
            break;

        case 1:
            userInputText.textContent = 'Fazeeia Mohammed';
            followUpQuestion.style.display = 'block';
            followUpQuestion.textContent = '🤖 CariVoice: Nice to meet you, Fazeeia! How old are you?';
            animateProgress(50, 1500);
            break;

        case 2:
            userInputText.textContent = '28';
            followUpQuestion.textContent = '🤖 CariVoice: Got it. Where are you located?';
            animateProgress(75, 1500);
            break;

        case 3:
            userInputText.textContent = 'Trinidad';
            followUpQuestion.textContent = '🤖 CariVoice: Processing your license renewal request...';
            startBtn.style.display = 'none';

            setTimeout(() => {
                aiResponseText.textContent = '✅ All done! Your license renewal request has been submitted.';
                animateProgress(100, 1000);
            }, 2000);
            break;
    }

    demoStep++;
}

// ===== Event Listeners =====
startBtn.addEventListener('click', () => {
    if (!demoRunning) demoRunning = true;
    runDemoStep();
});

resetBtn.addEventListener('click', resetDemo);

document.querySelectorAll('.nav-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
});

// Disable slide navigation keys during demo
document.addEventListener('keydown', (e) => {
    if (demoRunning && ['ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown'].includes(e.key)) {
        e.preventDefault();
    }
});
