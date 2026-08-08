// ============================================================
// 1) LOADING SCREEN
// ============================================================
const loadBarFill = document.querySelector('.load-bar-fill');
setTimeout(() => { if (loadBarFill) loadBarFill.style.width = '100%'; }, 150);
setTimeout(() => {
    const loading = document.getElementById('loading');
    if (loading) loading.classList.add('hide');
}, 1400);

// ============================================================
// 2) แบคกราวด์อิโมจิลอย
// ============================================================
const bgEmojis = ['💗', '🐷', '🐱', '🎀', '✨', '🤍', '💟', '💝', '💖', '💕'];

function spawnBackgroundElement() {
    const heartBg = document.getElementById('heart-bg');
    if (!heartBg) return;
    const el = document.createElement('div');
    el.className = 'floating-heart';
    el.textContent = bgEmojis[Math.floor(Math.random() * bgEmojis.length)];
    el.style.left = Math.random() * 90 + 5 + '%';
    el.style.fontSize = (24 + Math.random() * 16) + 'px';
    const duration = 6 + Math.random() * 4;
    el.style.animationDuration = duration + 's';
    heartBg.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000);
}
setInterval(spawnBackgroundElement, 700);

// ============================================================
// 3) ปุ่มเปิด/ปิดเพลง
// ============================================================
const musicBtn = document.getElementById('music-toggle');
const music = document.getElementById('bg-music');
let isPlaying = false;

function playMusic() {
    if (!isPlaying) {
        music.volume = 0.15;
        music.play().then(() => {
            musicBtn.textContent = '⏸️';
            musicBtn.classList.add('playing');
            isPlaying = true;
        }).catch(() => { /* เบราว์เซอร์บล็อก autoplay ไว้ก่อนก็ไม่เป็นไร */ });
    }
}

if (musicBtn) {
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isPlaying) {
            playMusic();
        } else {
            music.pause();
            musicBtn.textContent = '🎵';
            musicBtn.classList.remove('playing');
            isPlaying = false;
        }
    });
}
// กดที่ไหนก็ได้ในหน้าเว็บครั้งแรก ช่วยปลดล็อก autoplay เพลง
document.body.addEventListener('click', playMusic, { once: true });

// ============================================================
// 4) ระบบเปลี่ยนหน้า (Navigation)
// ============================================================
function goToPage(hideId, showId) {
    const hideEl = document.getElementById(hideId);
    const showEl = document.getElementById(showId);
    if (hideEl) hideEl.classList.add('hidden-page');
    if (showEl) showEl.classList.remove('hidden-page');
    window.scrollTo(0, 0);
}

// ============================================================
// 5) ระบบนับเวลาคบกัน (Timer)
// ============================================================
const timerEl = document.getElementById('love-timer');
if (timerEl) {
    const startDate = new Date(timerEl.getAttribute('data-startdate')).getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const distance = Math.max(now - startDate, 0);

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('timer-days');
        const hoursEl = document.getElementById('timer-hours');
        const minutesEl = document.getElementById('timer-minutes');
        const secondsEl = document.getElementById('timer-seconds');

        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// ============================================================
// 6) ระบบเกมควิซ "จินรู้ใจหมูแค่ไหน"
// ============================================================
// แก้คำถาม/ตัวเลือก/เฉลยได้ตรงนี้เลย (correctIndex อิงจาก 0)
const questions = [
    {
        question: "1. หมูชอบกินอะไรที่สุด?",
        choices: ["ชาบู", "หมูกระทะ", "ขนมหวาน", "ส้มตำ"],
        correctIndex: 1
    },
    {
        question: "2. สถานที่ที่หมูชอบไป?",
        choices: ["ทะเล", "ภูเขา", "คาเฟ่", "นอนอยู่ห้อง"],
        correctIndex: 3
    },
    {
        question: "3. คำถามที่ 3 ใส่ตรงนี้?",
        choices: ["ก", "ข", "ค", "ง"],
        correctIndex: 0
    },
    {
        question: "4. คำถามที่ 4 ใส่ตรงนี้?",
        choices: ["ก", "ข", "ค", "ง"],
        correctIndex: 2
    },
    {
        question: "5. รักจินไหม?",
        choices: ["รัก", "รักมาก", "รักที่สุด", "ทั้งหมดนั่นแหละ!"],
        correctIndex: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    const questionContainer = document.getElementById('quiz-question-container');
    const resultContainer = document.getElementById('quiz-result-container');
    if (questionContainer) questionContainer.classList.remove('hidden-page');
    if (resultContainer) resultContainer.classList.add('hidden-page');

    showQuestion();
}

function showQuestion() {
    const qData = questions[currentQuestionIndex];

    const stepEl = document.getElementById('quiz-step');
    const questionEl = document.getElementById('quiz-question');
    const choicesEl = document.getElementById('quiz-choices');
    const nextBtn = document.getElementById('quiz-next-btn');

    if (stepEl) stepEl.textContent = `ข้อ ${currentQuestionIndex + 1}/${questions.length}`;
    if (questionEl) questionEl.textContent = qData.question;
    if (nextBtn) nextBtn.classList.add('hidden-page'); // ซ่อนปุ่มถัดไปจนกว่าจะเลือกคำตอบ

    if (choicesEl) {
        choicesEl.innerHTML = '';
        qData.choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice;
            btn.addEventListener('click', () => selectAnswer(index));
            choicesEl.appendChild(btn);
        });
    }
}

function selectAnswer(selectedIndex) {
    const qData = questions[currentQuestionIndex];
    const choicesEl = document.getElementById('quiz-choices');
    const nextBtn = document.getElementById('quiz-next-btn');
    if (!choicesEl) return;

    const buttons = choicesEl.querySelectorAll('.choice-btn');
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === qData.correctIndex) btn.classList.add('correct');
        if (index === selectedIndex && selectedIndex !== qData.correctIndex) btn.classList.add('wrong');
    });

    if (selectedIndex === qData.correctIndex) score++;

    if (nextBtn) {
        nextBtn.classList.remove('hidden-page');
        nextBtn.textContent = (currentQuestionIndex === questions.length - 1) ? 'ดูผลคะแนน! 🎉' : 'ข้อต่อไป ➡';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const questionContainer = document.getElementById('quiz-question-container');
    const resultContainer = document.getElementById('quiz-result-container');
    if (questionContainer) questionContainer.classList.add('hidden-page');
    if (resultContainer) resultContainer.classList.remove('hidden-page');

    const scoreEl = document.getElementById('quiz-score');
    const feedbackEl = document.getElementById('quiz-feedback-text');
    if (scoreEl) scoreEl.textContent = score;

    if (feedbackEl) {
        if (score === questions.length) {
            feedbackEl.textContent = 'เก่งมากก รู้ใจหมูที่สุดเลย! 🥰';
        } else if (score >= 3) {
            feedbackEl.textContent = 'ถือว่าผ่านน เกือบรู้ใจหมดละนะ 😆';
        } else {
            feedbackEl.textContent = 'โดนตีแน่ จำไม่ได้หรอ! 😤';
        }
    }

    launchHeartConfetti();
}

// ============================================================
// 7) การ์ดจดหมาย 3D
// ============================================================
const letterCard = document.getElementById('letterCard');
let letterOpened = false;

if (letterCard) {
    letterCard.addEventListener('click', () => {
        letterCard.classList.toggle('opened');
        if (!letterOpened && letterCard.classList.contains('opened')) {
            letterOpened = true;
            launchHeartConfetti();
        }
    });
}

// ============================================================
// confetti หัวใจ (ใช้ร่วมกันทั้งควิซและจดหมาย)
// ============================================================
function launchHeartConfetti() {
    const emojis = ['💗', '🩷', '💕', '✨'];
    for (let i = 0; i < 40; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-heart';
        piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.animationDuration = (2.2 + Math.random() * 2) + 's';
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 4500);
    }
}