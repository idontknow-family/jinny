// ============================================================
// 1) LOADING SCREEN
// ============================================================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading').classList.add('hide');
  }, 1900);
});

// ============================================================
// 2) แบคกราวด์หัวใจลอยขึ้นเบาๆ
// ============================================================
const heartBg = document.getElementById('heart-bg');
const heartEmojis = ['💗', '🩷', '💕'];

function spawnBackgroundHeart() {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * 100 + 'vw';
  const size = 14 + Math.random() * 18;
  heart.style.fontSize = size + 'px';
  const duration = 8 + Math.random() * 6;
  heart.style.animationDuration = duration + 's';
  heartBg.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}
setInterval(spawnBackgroundHeart, 900);
for (let i = 0; i < 5; i++) setTimeout(spawnBackgroundHeart, i * 300);

// ============================================================
// 3) Scroll reveal (fade + float up) สำหรับทุกอย่างที่มี class .reveal
//    -> ใส่ class reveal ให้ section/การ์ดอัตโนมัติตรงนี้
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
// 4) ปุ่มเปิด/ปิดเพลง
// ============================================================
const musicBtn = document.getElementById('music-toggle');
const music = document.getElementById('bg-music');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
  if (!isPlaying) {
    music.play().catch(() => {
      // ยังไม่มีไฟล์เพลง หรือ browser บล็อก autoplay - ไม่เป็นไร แค่เงียบไว้
    });
    musicBtn.textContent = '⏸️';
    musicBtn.classList.add('playing');
  } else {
    music.pause();
    musicBtn.textContent = '🎵';
    musicBtn.classList.remove('playing');
  }
  isPlaying = !isPlaying;
});

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
  const maxX = Math.max(containerRect.width - btnRect.width, 0);
  const maxY = Math.max(containerRect.height - btnRect.height, 0);
  const newX = Math.random() * maxX;
  const newY = Math.random() * maxY;
  btn.style.left = newX + 'px';
  btn.style.top = newY + 'px';
}

if (canHover) {
  // เดสก์ท็อป: เมาส์เข้าใกล้ปุ่มผิด -> ปุ่มหนี
  quizContainer.addEventListener('mousemove', (e) => {
    wrongButtons.forEach((btn) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(centerX - e.clientX, centerY - e.clientY);
      if (dist < 95) relocateButton(btn);
    });
  });
} else {
  // มือถือ: แตะปุ่มผิด -> ปุ่มกระโดดหนีแทน (กันกดโดน)
  wrongButtons.forEach((btn) => {
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      relocateButton(btn);
    });
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

// ============================================================
// confetti หัวใจ (ใช้ร่วมกันทั้ง quiz และการ์ดจดหมาย)
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
