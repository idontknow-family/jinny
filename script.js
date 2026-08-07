// ============================================================
// 1) LOADING SCREEN
// ============================================================
const loadingScreen = document.getElementById('loading');
const loadBarFill = document.querySelector('.load-bar-fill');
const images = document.querySelectorAll('img');
let loadedCount = 0;
const totalImages = images.length;

function hideLoadingScreen() {
  setTimeout(() => { loadingScreen.classList.add('hide'); }, 600);
}
function incrementLoad() {
  loadedCount++;
  loadBarFill.style.width = ((loadedCount / totalImages) * 100) + '%';
  if (loadedCount >= totalImages) hideLoadingScreen();
}
if (totalImages === 0) {
  loadBarFill.style.width = '100%';
  window.addEventListener('load', hideLoadingScreen);
} else {
  images.forEach((img) => {
    if (img.complete) incrementLoad();
    else { img.addEventListener('load', incrementLoad); img.addEventListener('error', incrementLoad); }
  });
}
window.addEventListener('load', () => {
  loadBarFill.style.width = '100%';
  hideLoadingScreen();
});

// ============================================================
// 2) แบคกราวด์ลอยขึ้น (หัวใจ หมู แมว โบว์ + แสงฟุ้งๆ สีชมพู)
// ============================================================
const heartBg = document.getElementById('heart-bg');
const bgEmojis = ['💗', '🐷', '🐱', '🎀', '✨', '🤍'];

function spawnBackgroundElement() {
  if (!heartBg) return;

  const isGlowingDust = Math.random() > 0.40; // ออกเป็นแสงฟุ้งๆ 60%
  const el = document.createElement('div');

  if (isGlowingDust) {
    el.className = 'glow-particle';
    const size = 30 + Math.random() * 60; // ปรับแสงให้ดวงใหญ่ขึ้นจะได้เห็นชัด
    el.style.width = size + 'px';
    el.style.height = size + 'px';
  } else {
    el.className = 'floating-heart';
    el.textContent = bgEmojis[Math.floor(Math.random() * bgEmojis.length)];
    el.style.fontSize = (16 + Math.random() * 24) + 'px';
  }

  el.style.left = Math.random() * 100 + 'vw';
  const duration = 7 + Math.random() * 8;
  el.style.animationDuration = duration + 's';
  el.style.opacity = Math.random() * 0.4 + 0.3;

  heartBg.appendChild(el);
  setTimeout(() => el.remove(), duration * 1000);
}

setInterval(spawnBackgroundElement, 600);
for (let i = 0; i < 6; i++) setTimeout(spawnBackgroundElement, i * 250);

// ============================================================
// 3) Scroll reveal (fade + float up)
// ============================================================
document.querySelectorAll('.polaroid, .quiz-section, .scrapbook h2, .finale')
  .forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((items) => {
  items.forEach((item, i) => {
    if (item.isIntersecting) {
      item.target.style.transitionDelay = (i % 4) * 0.08 + 's';
      item.target.classList.add('visible');
      io.unobserve(item.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ============================================================
// 4) ปุ่มเปิด/ปิดเพลง & Autoplay (เริ่มมาเบาๆ 15%)
// ============================================================
const musicBtn = document.getElementById('music-toggle');
const music = document.getElementById('bg-music');
let isPlaying = false;

function playMusic() {
  if (!isPlaying) {
    music.volume = 0.10; // ปรับเสียงเหลือ 15% จะได้เบาๆ ไม่ตกใจ
    music.play().then(() => {
      musicBtn.textContent = '⏸️';
      musicBtn.classList.add('playing');
      isPlaying = true;
    }).catch(() => { });
  }
}

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

// แตะหน้าจอครั้งแรกให้เล่นเพลง
document.body.addEventListener('click', playMusic, { once: true });
document.body.addEventListener('touchstart', playMusic, { once: true });

// ============================================================
// 5) Quiz คำตอบขี้อาย (หนีเมาส์)
// ============================================================
const quizContainer = document.getElementById('quizContainer');
const wrongButtons = quizContainer.querySelectorAll('.quiz-btn.wrong');
const correctBtn = document.getElementById('correctBtn');
const quizResult = document.getElementById('quizResult');
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function relocateButton(btn) {
  const containerRect = quizContainer.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();
  btn.style.left = (Math.random() * Math.max(containerRect.width - btnRect.width, 0)) + 'px';
  btn.style.top = (Math.random() * Math.max(containerRect.height - btnRect.height, 0)) + 'px';
}

if (canHover) {
  quizContainer.addEventListener('mousemove', (e) => {
    wrongButtons.forEach((btn) => {
      const rect = btn.getBoundingClientRect();
      const dist = Math.hypot((rect.left + rect.width / 2) - e.clientX, (rect.top + rect.height / 2) - e.clientY);
      if (dist < 95) relocateButton(btn);
    });
  });
} else {
  wrongButtons.forEach((btn) => {
    btn.addEventListener('touchstart', (e) => { e.preventDefault(); relocateButton(btn); });
  });
}

correctBtn.addEventListener('click', () => {
  quizResult.textContent = 'ถูกต้อง! ครบ 1 เดือนพอดีเป๊ะ 🎉';
  launchHeartConfetti();
});

// ============================================================
// 6) การ์ดจดหมายปิดท้าย
// ============================================================
const letterCard = document.getElementById('letterCard');
let letterOpened = false;

letterCard.addEventListener('click', () => {
  letterCard.classList.toggle('opened');
  if (!letterOpened && letterCard.classList.contains('opened')) {
    letterOpened = true;
    launchHeartConfetti();
  }
});

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