// ============================================================
// 1) LOADING & BACKGROUND & MUSIC
// ============================================================
window.addEventListener('load', () => {
  document.getElementById('loading').classList.add('hide');
});

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
setInterval(spawnBackgroundElement, 500);

const musicBtn = document.getElementById('music-toggle');
const music = document.getElementById('bg-music');
let isPlaying = false;
function playMusic() {
  if (!isPlaying) {
    music.volume = 0.15;
    music.play().then(() => {
      musicBtn.textContent = '⏸️'; musicBtn.classList.add('playing'); isPlaying = true;
    }).catch(() => { });
  }
}
musicBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (!isPlaying) playMusic();
  else { music.pause(); musicBtn.textContent = '🎵'; musicBtn.classList.remove('playing'); isPlaying = false; }
});
document.body.addEventListener('click', playMusic, { once: true });

// ============================================================
// 2) ระบบเปลี่ยนหน้า (Navigation)
// ============================================================
function goToPage(hideId, showId) {
  document.getElementById(hideId).classList.add('hidden-page');
  document.getElementById(showId).classList.remove('hidden-page');
  window.scrollTo(0, 0);
}

// ============================================================
// 3) ระบบนับเวลาคบกัน (Timer)
// ============================================================
const timerEl = document.getElementById('love-timer');
if (timerEl) {
  const startDate = new Date(timerEl.getAttribute('data-startdate')).getTime();

  setInterval(() => {
    const now = new Date().getTime();
    const distance = now - startDate;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60จัดโครงสร้างเว็บแอปพลิเคชันแบบหน้าเดียว(Single Page Application) น่ารักๆ สำหรับโปรเจกต์นี้ให้เรียบร้อยครับ โดยแบ่งเป็นหน้าต่างๆ ตามที่บรีฟมา และเขียนแยกส่วนเพื่อให้เอาไปปรับแก้หรือใส่เนื้อหาต่อได้ง่ายๆ ครับ

สามารถคัดลอกโค้ดด้านล่างนี้ไปเซฟเป็นไฟล์`index.html` แล้วเปิดดูในเบราว์เซอร์ได้เลยครับ

      ```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>For Jin 💕</title>
    <link href="[https://fonts.googleapis.com/css2?family=Mali:wght@400;600&display=swap](https://fonts.googleapis.com/css2?family=Mali:wght@400;600&display=swap)" rel="stylesheet">
    <style>
        body {
            font-family: 'Mali', cursive;
            background-color: #ffe6ea;
            color: #d81b60;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            text-align: center;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 10px 20px rgba(255, 182, 193, 0.5);
            max-width: 400px;
            width: 90%;
            position: relative;
        }
        .screen {
            display: none;
            animation: fadeIn 0.5s ease-in-out;
        }
        .active {
            display: block;
        }
        h1, h2 {
            margin-bottom: 20px;
        }
        button {
            font-family: 'Mali', cursive;
            background-color: #ff8fa3;
            color: white;
            border: none;
            padding: 12px 20px;
            margin: 10px 0;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            width: 100%;
            transition: 0.3s;
            box-shadow: 0 4px 6px rgba(255, 143, 163, 0.3);
        }
        button:hover {
            background-color: #ff4d6d;
            transform: translateY(-2px);
        }
        .btn-back {
            background-color: #ffc2d1;
            margin-top: 20px;
        }
        .btn-back:hover {
            background-color: #ffb3c6;
        }
        .image-placeholder {
            width: 150px;
            height: 150px;
            background-color: #ffc2d1;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
            border: 4px dashed #ff8fa3;
        }
        .quiz-container {
            text-align: left;
            margin-bottom: 20px;
        }
        .choice-label {
            display: block;
            background: #fff0f3;
            padding: 10px;
            border-radius: 10px;
            margin-bottom: 8px;
            cursor: pointer;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
    </style>
</head>
<body>

<div class="container">
    <!-- หน้า 1: โหลด / ถามว่าพร้อมไหม -->
    <div id="screen-loading" class="screen active">
        <h1>พร้อมอ้ะยังง? 👀💕</h1>
        <button onclick="goToScreen('screen-flower')">พร้อมแล้ว!</button>
    </div>

    <!-- หน้า 2: หน้าดอกไม้ -->
    <div id="screen-flower" class="screen">
        <!-- เปลี่ยน src รูปภาพตรงนี้ -->
        <div class="image-placeholder">
            (ใส่รูปหน้าดอกไม้ตรงนี้)
        </div>
        <h2>เอาไปเลยปีศาจหมูสำหรับคนน่ารัก 🐷</h2>
        <button onclick="goToScreen('screen-menu')">ไปต่อหยอกเล่นน 😆</button>
    </div>

    <!-- หน้า 3: เมนูหลัก -->
    <div id="screen-menu" class="screen">
        <h2>เลือกเลยยย ✨</h2>
        <button onclick="goToScreen('screen-months')">1. เราคบกันมากี่เดือนแล้ว</button>
        <button onclick="goToScreen('screen-memories')">2. ความทรงจำของเรา</button>
        <button onclick="startQuiz()">3. จินรู้ใจหมูแค่ไหน</button>
        <button onclick="goToScreen('screen-letter')">4. จดหมายให้จิน</button>
    </div>

    <!-- ซับเมนู 1: คบกันกี่เดือน -->
    <div id="screen-months" class="screen">
        <h2>เราคบกันมา... 🗓️</h2>
        <p>(เดี๋ยวมาเขียนโค้ดนับวัน/เดือนทีหลัง)</p>
        <button class="btn-back" onclick="goToScreen('screen-menu')">กลับไปหน้าเมนู</button>
    </div>

    <!-- ซับเมนู 2: ความทรงจำ -->
    <div id="screen-memories" class="screen">
        <h2>ความทรงจำของเรา 📸</h2>
        <p>(เดี๋ยวมาใส่รูปหรือสไลด์โชว์ทีหลัง)</p>
        <button class="btn-back" onclick="goToScreen('screen-menu')">กลับไปหน้าเมนู</button>
    </div>

    <!-- ซับเมนู 3: ควิซ -->
    <div id="screen-quiz" class="screen">
        <h2 id="quiz-title">จินรู้ใจหมูแค่ไหน? 🤔</h2>
        <div id="quiz-content" class="quiz-container">
            <!-- คำถามจะถูกสร้างด้วย JavaScript ตรงนี้ -->
        </div>
        <button id="next-quiz-btn" onclick="nextQuestion()">ข้อต่อไป</button>
        <button class="btn-back" onclick="goToScreen('screen-menu')">หนีกลับหน้าเมนู</button>
    </div>

    <!-- หน้าสรุปคะแนนควิซ -->
    <div id="screen-result" class="screen">
        <h2>เย้! ทำแบบทดสอบเสร็จแล้ว 🎉</h2>
        <h1 id="score-text">ได้คะแนน 0/5</h1>
        <p id="score-message"></p>
        <button class="btn-back" onclick="goToScreen('screen-menu')">กลับไปหน้าเมนู</button>
    </div>

    <!-- ซับเมนู 4: จดหมาย -->
    <div id="screen-letter" class="screen">
        <h2>จดหมายให้จิน 💌</h2>
        <p>(พิมพ์ความในใจใส่ตรงนี้ได้เลย)</p>
        <button class="btn-back" onclick="goToScreen('screen-menu')">กลับไปหน้าเมนู</button>
    </div>
</div>

<script>
    // ฟังก์ชันเปลี่ยนหน้า
    function goToScreen(screenId) {
        document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    }

    // --- ส่วนของ Quiz ---
    // สามารถมาแก้คำถาม คำตอบ และตั้งเฉลยได้ตรงนี้
    const questions = [
        {
            question: "1. หมูชอบกินอะไรที่สุด?",
            choices: ["ชาบู", "หมูกระทะ", "ขนมหวาน", "ส้มตำ"],
            correctIndex: 1 // อิงจาก index (0, 1, 2, 3) หมูกระทะ = 1
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
        goToScreen('screen-quiz');
        showQuestion();
    }

    function showQuestion() {
        const qContent = document.getElementById('quiz-content');
        qContent.innerHTML = ''; 
        
        const qData = questions[currentQuestionIndex];
        
        // ใส่คำถาม
        const qTitle = document.createElement('h3');
        qTitle.textContent = qData.question;
        qContent.appendChild(qTitle);

        // ใส่ตัวเลือก
        qData.choices.forEach((choice, index) => {
            const label = document.createElement('label');
            label.className = 'choice-label';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'quiz-choice';
            radio.value = index;

            label.appendChild(radio);
            label.appendChild(document.createTextNode(' ' + choice));
            qContent.appendChild(label);
        });

        // เปลี่ยนข้อความปุ่มถ้าเป็นข้อสุดท้าย
        if (currentQuestionIndex === questions.length - 1) {
            document.getElementById('next-quiz-btn').textContent = "ดูผลคะแนน!";
        } else {
            document.getElementById('next-quiz-btn').textContent = "ข้อต่อไป";
        }
    }

    function nextQuestion() {
        const selectedOption = document.querySelector('input[name="quiz-choice"]:checked');
        if (!selectedOption) {
            alert("เลือกคำตอบก่อนนะ!");
            return;
        }

        // ตรวจคำตอบ
        if (parseInt(selectedOption.value) === questions[currentQuestionIndex].correctIndex) {
            score++;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        goToScreen('screen-result');
        document.getElementById('score-text').textContent = `ได้คะแนน ${ score } / ${ questions.length }`;
        
        const msg = document.getElementById('score-message');
        if (score === 5) {
            msg.textContent = "เก่งมากก รู้ใจหมูที่สุดเลย! 🥰";
        } else if (score >= 3) {
            msg.textContent = "ถือว่าผ่านน เกือบรู้ใจหมดละนะ 😆";
        } else {
            msg.textContent = "โดนตีแน่ จำไม่ได้หรอ! 😤";
        }
    }
</script>

</body>
</html>