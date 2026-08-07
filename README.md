# 1 เดือนของเรา 🤍

เว็บเซอร์ไพรส์ครบรอบ 1 เดือน

## โครงสร้างไฟล์
```
anniversary-site/
├── index.html      <- เนื้อหา, ข้อความ, จุดใส่รูป
├── style.css        <- สี, ฟอนต์, ดีไซน์ทั้งหมด
├── script.js         <- อนิเมชัน, quiz, ปุ่มเพลง
├── server.js          <- server เล็กๆ ไว้รันตอน deploy (ไม่ต้องแก้)
├── package.json
└── assets/           <- เอารูป + เพลง มาวางที่นี่
```

## แก้ไขเนื้อหา
1. เปิดโฟลเดอร์นี้ใน VS Code
2. ใน `index.html` หา `[แก้ตรงนี้]` แล้วเปลี่ยนข้อความ
3. เอารูปคู่ FiveM ไปวางในโฟลเดอร์ `assets/` เช่น `assets/1.jpg`
4. แทนที่ `<div class="polaroid-placeholder">รูปที่ 1</div>`
   ด้วย `<img src="assets/1.jpg" class="polaroid-img" alt="">`
5. อยากใส่เพลง: เอาไฟล์ mp3 วางชื่อ `assets/music.mp3`
6. อยากเปลี่ยนโทนสี: แก้ค่าตัวแปรใน `style.css` ส่วน `:root` ด้านบนสุด

## รันดูบนเครื่องตัวเอง (ก่อน deploy)
เปิด `index.html` ด้วย browser ตรงๆ ได้เลย (ไม่ต้องใช้ server ก็ดูได้)

หรือถ้าอยากรันผ่าน server เหมือนตอน deploy จริง:
```bash
npm install
npm start
```
แล้วเปิด http://localhost:3000

## Deploy ขึ้น GitHub + Railway

### 1. ขึ้น GitHub
```bash
git init
git add .
git commit -m "first commit: anniversary site"
```
สร้าง repo ใหม่บน GitHub (เช่น `anniversary-site`) แล้ว:
```bash
git remote add origin https://github.com/<username>/anniversary-site.git
git branch -M main
git push -u origin main
```

### 2. Deploy บน Railway
1. เข้า https://railway.app → New Project
2. เลือก **Deploy from GitHub repo**
3. เลือก repo `anniversary-site` ที่เพิ่ง push ไป
4. Railway จะเจอ `package.json` แล้ว build/run ให้อัตโนมัติ (ใช้คำสั่ง `npm start`)
5. รอ deploy เสร็จ กด **Generate Domain** เพื่อได้ลิงก์ไปแชร์ให้แฟน 🎉

ไม่ต้องตั้งค่า Environment Variable อะไรเพิ่ม เพราะ server อ่าน `process.env.PORT` ที่ Railway ให้มาอัตโนมัติอยู่แล้ว
