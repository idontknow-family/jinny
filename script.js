// ============================================================
// 1) LOADING SCREEN (โหลดจริงๆ ตามจำนวนรูปภาพ)
// ============================================================
const loadingScreen = document.getElementById('loading');
const loadBarFill = document.querySelector('.load-bar-fill');

// ดึงรูปภาพทั้งหมดในหน้าเว็บ
const images = document.querySelectorAll('img');
let loadedCount = 0;
const totalImages = images.length;

function hideLoadingScreen() {
  setTimeout(() => {
    loadingScreen.classList.add('hide');
  }, 600); // ดีเลย์นิดนึงให้แฟนเห็นตอนหลอดเต็ม 100% แล้วค่อยซ่อน
}

function incrementLoad() {
  loadedCount++;
  const percentage = (loadedCount / totalImages) * 100;
  loadBarFill.style.width = percentage + '%'; // อัปเดตหลอดโหลดตามจริง

  if (loadedCount >= totalImages) {
    hideLoadingScreen();
  }
}

if (totalImages === 0) {
  // ถ้าไม่มีรูปเลย
  loadBarFill.style.width = '100%';
  window.addEventListener('load', hideLoadingScreen);
} else {
  // ตรวจสอบรูปภาพทีละรูป
  images.forEach((img) => {
    if (img.complete) {
      incrementLoad(); // ถ้ารูปโหลดเสร็จแล้ว (เช่น โหลดจากแคช)
    } else {
      img.addEventListener('load', incrementLoad);
      img.addEventListener('error', incrementLoad); // กันบั๊กรูปพังแล้วโหลดค้าง
    }
  });
}

// เผื่อเหนียว: ถ้าเว็บโหลดเสร็จสมบูรณ์แล้ว ให้บังคับหลอดเต็มและซ่อนทันที
window.addEventListener('load', () => {
  loadBarFill.style.width = '100%';
  hideLoadingScreen();
});

// ============================================================
// 2) แบคกราวด์ลอยขึ้นเบาๆ (หัวใจ หมู แมว โบว์)
// ============================================================
const heartBg = document.getElementById('heart-bg');
const bgEmojis = ['💗', '🐷', '🐱', '🎀', '✨', '🤍']; // เพิ่มน้องหมู น้องแมว ตามรีเควส

function spawnBackgroundElement() {
  if (!heartBg) return;
  const el = document.createElement('div');
  el.className = 'floating-heart';
  el.textContent = bgEmojis[Math.floor(Math.random() * bgEmojis.length)];

  // สุ่มตำแหน่งแกน X
  el.style.left = Math.random() * 100 + 'vw';

  // สุ่มขนาดให้ดูมีมิติ (เล็ก-ใหญ่สลับกัน)
  const size = 16 + Math.random() * 20;
  el.style.fontSize = size + 'px';

  // สุ่มความเร็วให้ลอยช้าๆ นุ่มๆ (8-14 วินาที)
  const duration = 8 + Math.random() * 6;
  el.style.animationDuration = duration + 's';

  // ปรับความจางให้ฟุ้งๆ (opacity 0.15 - 0.45) ไม่กวนข้อความหลัก
  el.style.opacity = Math.random() * 0.3 + 0.15;

  heartBg.appendChild(el);

  // ลบทิ้งเมื่อลอยพ้นจอเพื่อไม่ให้เว็บกระตุก
  setTimeout(() => el.remove(), duration * 1000);
}

setInterval(spawnBackgroundElement, 800);
for (let i = 0; i < 5; i++) setTimeout(spawnBackgroundElement, i * 300);

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