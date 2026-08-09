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
// 2) แบคกราวด์หัวใจลอยจางๆ (เอาแค่หัวใจ ไม่เอาอิโมจิอื่น)
// ============================================================
const bgEmojis = ['💗', '💝', '💕', '🤍'];

function spawnBackgroundElement() {
    const heartBg = document.getElementById('heart-bg');
    if (!heartBg) return;
    const el = document.createElement('div');
    el.className = 'floating-heart';
    el.textContent = bgEmojis[Math.floor(Math.random() * bgEmojis.length)];
    el.style.left = Math.random() * 90 + 5 + '%';
    el.style.fontSize = (14 + Math.random() * 10) + 'px'; // เล็กลง จางลง
    const duration = 8 + Math.random() * 5;
    el.style.animationDuration = duration + 's';
    heartBg.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000);
}
setInterval(spawnBackgroundElement, 1200); // ช้าลง ไม่รกตา

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
// 4) ควิซทายเดือน (ปุ่มหนีเมาส์) + เปิดเผยตัวนับเวลา
// ============================================================
const monthsQuizContainer = document.getElementById('monthsQuizContainer');
const monthsQuizResult = document.getElementById('monthsQuizResult');
const monthsCorrectBtn = document.getElementById('monthsCorrectBtn');
const loveTimerWrap = document.getElementById('love-timer-wrap');
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (monthsQuizContainer) {
    const monthsWrongButtons = monthsQuizContainer.querySelectorAll('.months-quiz-btn.wrong');

    function relocateMonthsButton(btn) {
        const containerRect = monthsQuizContainer.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        const maxX = Math.max(containerRect.width - btnRect.width, 0);
        const maxY = Math.max(containerRect.height - btnRect.height, 0);
        btn.style.left = Math.random() * maxX + 'px';
        btn.style.top = Math.random() * maxY + 'px';
    }

    if (canHover) {
        monthsQuizContainer.addEventListener('mousemove', (e) => {
            monthsWrongButtons.forEach((btn) => {
                const rect = btn.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const dist = Math.hypot(centerX - e.clientX, centerY - e.clientY);
                if (dist < 90) relocateMonthsButton(btn);
            });
        });
    } else {
        monthsWrongButtons.forEach((btn) => {
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                relocateMonthsButton(btn);
            });
        });
    }

    if (monthsCorrectBtn) {
        monthsCorrectBtn.addEventListener('click', () => {
            if (monthsQuizResult) monthsQuizResult.textContent = 'เย้ เก่งจังเลยยยย 🎉';
            if (loveTimerWrap) loveTimerWrap.classList.remove('hidden-page');
            launchHeartConfetti();
        });
    }
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
// correctIndex: 'any' หมายถึงตอบข้อไหนก็ถือว่าถูกหมด
const questions = [
    {
        question: "1. ให้ทายวันนี้เค้าถืออะไรในมือ",
        choices: ["แมว", "หมู", "หมา", "กระต่าย"],
        correctIndex: 'any'
    },
    {
        question: "2. ประเทศแรกที่เราเจอกันคือประเทศไหน",
        choices: ["GoodTown", "BoostBoost", "WipTown", "BearCity"],
        correctIndex: 0
    },
    {
        question: "3. เค้าเกิดวันอะไร",
        choices: ["เสาร์", "จันทร์", "ศุกร์", "อาทิตย์", "พุธ"],
        correctIndex: 0
    },
    {
        question: "4. แมวที่เค้าอยากขโมยที่สุดชื่ออะไรรร",
        choices: ["เบอร์ 2", "ยัยเนี๊ยะะ", "มีตัง", "ปุ้กลุ้ก", "เบอร์ 3"],
        correctIndex: 1
    },
    {
        question: "5. เค้ารักจินมากแค่ไหน",
        choices: ["รักนิดเดียว", "รักหน่อยนึง", "รักมากก", "รักมากที่สุดในสามโลกกกกก"],
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
    if (nextBtn) nextBtn.classList.add('hidden-page');

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

    const isAnyCorrect = qData.correctIndex === 'any';
    const buttons = choicesEl.querySelectorAll('.choice-btn');

    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (isAnyCorrect) {
            btn.classList.add('correct');
        } else {
            if (index === qData.correctIndex) btn.classList.add('correct');
            if (index === selectedIndex && selectedIndex !== qData.correctIndex) btn.classList.add('wrong');
        }
    });

    if (isAnyCorrect || selectedIndex === qData.correctIndex) score++;

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
            feedbackEl.textContent = 'เก่งที่สุดดเลยยย 🥰';
        } else {
            feedbackEl.textContent = 'ต่อให้ไม่ได้คะแนนเต็มเค้าก็รักจินที่สุดดด 💗';
        }
    }

    launchHeartConfetti();
}

// ============================================================
// 7) Tilt hover สำหรับรูปโพลารอยด์ในแกลเลอรี่
// ============================================================
const polaroidCards = document.querySelectorAll('.polaroid');
const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (hasHover && polaroidCards.length) {
    const maxTilt = 12; // องศาที่เอียงได้มากสุด

    polaroidCards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * maxTilt;
            const rotateX = -((y - centerY) / centerY) * maxTilt;

            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`;
            card.style.boxShadow = '0 22px 36px rgba(107, 84, 87, 0.22)';
            card.style.zIndex = '5';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
            card.style.zIndex = '';
        });
    });
}

// ============================================================
// 8) การ์ดจดหมาย 3D
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
    const emojis = ['💗', '💝', '💕', '✨'];
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

// ============================================================
// 9) Easter Egg: แมวลับ (หนีได้ 10 ครั้ง จากนั้นหยุดนิ่งยอมให้จับ) + บัตรตามใจ
// ============================================================
const eggCatBtn = document.getElementById('easter-egg-cat');
const eggModal = document.getElementById('egg-modal');
const eggModalClose = document.getElementById('egg-modal-close');

if (eggCatBtn) {
    let catDodgeCount = 0;
    const maxDodges = 10;
    const dodgeTriggerDistance = 70;

    function relocateCat() {
        const margin = 50;
        const maxX = window.innerWidth - margin;
        const maxY = window.innerHeight - margin;
        const newX = margin + Math.random() * Math.max(maxX - margin, 1);
        const newY = margin + Math.random() * Math.max(maxY - margin, 1);
        eggCatBtn.style.left = newX + 'px';
        eggCatBtn.style.top = newY + 'px';
        eggCatBtn.style.bottom = 'auto';
        eggCatBtn.style.right = 'auto';
    }

    if (hasHover) {
        document.addEventListener('mousemove', (e) => {
            if (catDodgeCount >= maxDodges) return;
            const rect = eggCatBtn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dist = Math.hypot(centerX - e.clientX, centerY - e.clientY);
            if (dist < dodgeTriggerDistance) {
                relocateCat();
                catDodgeCount++;
            }
        });
    } else {
        eggCatBtn.addEventListener('touchstart', (e) => {
            if (catDodgeCount >= maxDodges) return;
            e.preventDefault();
            relocateCat();
            catDodgeCount++;
        });
    }
}

if (eggCatBtn && eggModal) {
    eggCatBtn.addEventListener('click', () => {
        eggModal.classList.remove('hidden-page');
        launchHeartConfetti();
    });
}

if (eggModalClose && eggModal) {
    eggModalClose.addEventListener('click', () => {
        eggModal.classList.add('hidden-page');
    });
}

if (eggModal) {
    eggModal.addEventListener('click', (e) => {
        if (e.target === eggModal) eggModal.classList.add('hidden-page');
    });
}

// ============================================================
// 10) Lightbox: คลิกรูปโพลารอยด์แล้วขยายเต็มจอ
// ============================================================
const lightbox = document.getElementById('photo-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

if (lightbox && lightboxImg) {
    document.querySelectorAll('.polaroid-img').forEach((img) => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            const captionEl = img.closest('.polaroid')?.querySelector('.polaroid-caption');
            if (lightboxCaption) lightboxCaption.textContent = captionEl ? captionEl.textContent : '';
            lightbox.classList.remove('hidden-page');
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.add('hidden-page');
        });
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.add('hidden-page');
    });
}