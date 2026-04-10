/* ===== Toast ===== */
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ===== Background Picker ===== */
const BG_PRESETS = {
  scenery: [
    { url: 'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?w=800&q=80', label: 'Kyoto' },
    { url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80', label: 'Bali' },
    { url: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80', label: 'Thailand' },
    { url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80', label: 'London' },
    { url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80', label: 'Tokyo Night' },
    { url: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800&q=80', label: 'Raja Ampat' },
    { url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80', label: 'Kyoto Night' },
    { url: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80', label: 'Bangkok' },
    { url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80', label: 'Sakura' },
  ],
  food: [
    { url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80', label: 'Sushi' },
    { url: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80', label: 'Ramen' },
    { url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80', label: 'Nasi Goreng' },
    { url: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80', label: 'Pad Thai' },
    { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', label: 'Fish & Chips' },
    { url: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80', label: 'Thai Food' },
    { url: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=800&q=80', label: 'Sate' },
    { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', label: 'Pub Food' },
    { url: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=800&q=80', label: 'Dessert' },
  ],
  flowers: [
    { url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc5e?w=800&q=80', label: 'Flower Field' },
    { url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80', label: 'Sakura' },
    { url: 'https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?w=800&q=80', label: 'Lavender' },
    { url: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80', label: 'Rose' },
    { url: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=800&q=80', label: 'Sunflower' },
    { url: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=800&q=80', label: 'Tulip' },
    { url: 'https://images.unsplash.com/photo-1455582916367-25f75bfc6710?w=800&q=80', label: 'Daisy' },
    { url: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&q=80', label: 'Cherry Blossom' },
    { url: 'https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?w=800&q=80', label: 'Wildflowers' },
  ],
  anime: [
    { url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80', label: 'Matcha Latte' },
    { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', label: 'Boba Tea' },
    { url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80', label: 'Cocktail' },
    { url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80', label: 'Lemonade' },
    { url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80', label: 'Espresso' },
    { url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80', label: 'Smoothie' },
    { url: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=800&q=80', label: 'Juice' },
    { url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80', label: 'Iced Coffee' },
  ]
};

let customBg = JSON.parse(localStorage.getItem('customBgV2') || '{}');
let editingMode = 'light';

function openBgModal() {
  editingMode = document.body.classList.contains('dark') ? 'dark' : 'light';
  document.getElementById('modeLight').classList.toggle('active', editingMode === 'light');
  document.getElementById('modeDark').classList.toggle('active', editingMode === 'dark');
  document.getElementById('bgModal').classList.remove('hidden');
  switchBgTab('scenery', document.querySelector('.bg-tab'));
}
function closeBgModal() { document.getElementById('bgModal').classList.add('hidden'); }

function switchBgMode(mode, btn) {
  editingMode = mode;
  document.querySelectorAll('.bg-mode-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const activeTab = document.querySelector('.bg-tab.active');
  if (activeTab) activeTab.click();
}

function switchBgTab(tab, btn) {
  document.querySelectorAll('.bg-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const grid = document.getElementById('bgGrid');
  const upload = document.getElementById('bgUpload');
  if (tab === 'upload') {
    grid.classList.add('hidden');
    upload.classList.remove('hidden');
    return;
  }
  upload.classList.add('hidden');
  grid.classList.remove('hidden');
  grid.innerHTML = '';
  const currentUrl = customBg[editingMode];
  BG_PRESETS[tab].forEach(item => {
    const img = document.createElement('img');
    img.src = item.url;
    img.alt = item.label;
    img.className = 'bg-thumb' + (currentUrl === item.url ? ' selected' : '');
    img.title = item.label;
    img.onclick = () => applyCustomBg(item.url, img);
    grid.appendChild(img);
  });
}

function applyCustomBg(url, imgEl) {
  customBg[editingMode] = url;
  localStorage.setItem('customBgV2', JSON.stringify(customBg));
  document.querySelectorAll('.bg-thumb').forEach(i => i.classList.remove('selected'));
  if (imgEl) imgEl.classList.add('selected');
  updateBackground();
  showToast(editingMode === 'light' ? '☀️ Light background updated!' : '🌙 Dark background updated!');
}

function handleBgUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    customBg[editingMode] = ev.target.result;
    localStorage.setItem('customBgV2', JSON.stringify(customBg));
    updateBackground();
    closeBgModal();
    showToast('Background updated!');
  };
  reader.readAsDataURL(file);
}

function resetBg() {
  delete customBg[editingMode];
  localStorage.setItem('customBgV2', JSON.stringify(customBg));
  updateBackground();
  const activeTab = document.querySelector('.bg-tab.active');
  if (activeTab) activeTab.click();
  showToast(editingMode === 'light' ? '☀️ Reset to default!' : '🌙 Reset to default!');
}

/* ===== Background per Language ===== */
const BG = {
  en: {
    light: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1920&q=80', // London siang
    dark:  'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1920&q=80'  // London malam
  },
  id: {
    light: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=80', // Bali siang
    dark:  'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1920&q=80'  // Raja Ampat
  },
  jp: {
    light: 'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?auto=format&fit=crop&w=1920&q=80', // Kyoto siang
    dark:  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1920&q=80'  // Kyoto malam
  },
  th: {
    light: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1920&q=80', // Thailand siang
    dark:  'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1920&q=80'  // Bangkok malam
  }
};

function updateBackground() {
  const isDark = document.body.classList.contains('dark');
  const mode = isDark ? 'dark' : 'light';
  const overlay = isDark
    ? 'linear-gradient(to bottom, rgba(0,0,10,0.35) 0%, rgba(0,0,10,0.6) 100%)'
    : 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)';
  const url = customBg[mode] || BG[lang][mode];
  document.body.style.background = `${overlay}, url("${url}") center/cover no-repeat fixed`;
}

/* ===== Dark Mode ===== */
function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.getElementById('themeBtn').textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  updateBackground();
}
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  document.getElementById('themeBtn').textContent = '☀️ Light Mode';
}

/* ===== Language ===== */
const T = {
  en: { morning:'Good Morning', afternoon:'Good Afternoon', evening:'Good Evening',
        timer:'🎯 Focus Timer', todo:'📝 To-Do List', links:'🔗 Quick Links',
        start:'Start', stop:'Stop', reset:'Reset', add:'Add', addLink:'Add',
        taskPh:'Add a task...', namePh:'Label', urlPh:'https://...', minutes:'Minutes:',
        modalTitle:"What's your name?", weather:'🌤️ Weather',
        humidity:'Humidity', wind:'Wind', locating:'📍 Detecting location...',
        weatherErr:'Could not load weather.' },
  id: { morning:'Selamat Pagi', afternoon:'Selamat Siang', evening:'Selamat Malam',
        timer:'🎯 Timer Fokus', todo:'📝 Daftar Tugas', links:'🔗 Tautan Cepat',
        start:'Mulai', stop:'Berhenti', reset:'Reset', add:'Tambah', addLink:'Tambah',
        taskPh:'Tambah tugas...', namePh:'Label', urlPh:'https://...', minutes:'Menit:',
        modalTitle:'Siapa namamu?', weather:'🌤️ Cuaca',
        humidity:'Kelembapan', wind:'Angin', locating:'📍 Mendeteksi lokasi...',
        weatherErr:'Gagal memuat cuaca.' },
  jp: { morning:'おはようございます', afternoon:'こんにちは', evening:'こんばんは',
        timer:'🎯 フォーカスタイマー', todo:'📝 やることリスト', links:'🔗 クイックリンク',
        start:'開始', stop:'停止', reset:'リセット', add:'追加', addLink:'追加',
        taskPh:'タスクを追加...', namePh:'ラベル', urlPh:'https://...', minutes:'分:',
        modalTitle:'お名前は？', weather:'🌤️ 天気',
        humidity:'湿度', wind:'風速', locating:'📍 位置を検出中...',
        weatherErr:'天気を読み込めませんでした。' },
  th: { morning:'สวัสดีตอนเช้า', afternoon:'สวัสดีตอนบ่าย', evening:'สวัสดีตอนเย็น',
        timer:'🎯 จับเวลาโฟกัส', todo:'📝 รายการสิ่งที่ต้องทำ', links:'🔗 ลิงก์ด่วน',
        start:'เริ่ม', stop:'หยุด', reset:'รีเซ็ต', add:'เพิ่ม', addLink:'เพิ่ม',
        taskPh:'เพิ่มงาน...', namePh:'ชื่อ', urlPh:'https://...', minutes:'นาที:',
        modalTitle:'ชื่อของคุณคืออะไร?', weather:'🌤️ สภาพอากาศ',
        humidity:'ความชื้น', wind:'ลม', locating:'📍 กำลังตรวจหาตำแหน่ง...',
        weatherErr:'ไม่สามารถโหลดสภาพอากาศได้' }
};

let lang = localStorage.getItem('lang') || 'en';

function changeLanguage() {
  lang = document.getElementById('language').value;
  localStorage.setItem('lang', lang);
  applyLang();
  updateTime();
  updateBackground();
}

function applyLang() {
  const t = T[lang];
  document.getElementById('timerTitle').textContent   = t.timer;
  document.getElementById('todoTitle').textContent    = t.todo;
  document.getElementById('linksTitle').textContent   = t.links;
  document.getElementById('weatherTitle').textContent = t.weather;
  document.getElementById('startBtn').textContent     = t.start;
  document.getElementById('addTaskBtn').textContent   = t.add;
  document.getElementById('addLinkBtn').textContent   = t.addLink;
  document.getElementById('taskInput').placeholder    = t.taskPh;
  document.getElementById('linkName').placeholder     = t.namePh;
  document.getElementById('linkURL').placeholder      = t.urlPh;
  document.getElementById('minutesLabel').childNodes[0].textContent = t.minutes + ' ';
  document.getElementById('modalTitle').textContent   = t.modalTitle;
  document.getElementById('language').value = lang;
  updateQuote();
}

/* ===== Greeting & Time ===== */
function updateTime() {
  const now = new Date();
  const h = now.getHours();
  const t = T[lang];
  const name = localStorage.getItem('userName');
  const greet = h < 12 ? t.morning : h < 18 ? t.afternoon : t.evening;
  document.getElementById('greeting').textContent = greet + (name ? ', ' + name : '') + '!';
  document.getElementById('datetime').textContent = now.toLocaleString();
  document.getElementById('displayName').textContent = '';
}
setInterval(updateTime, 1000);

/* ===== Custom Name ===== */
function openNameModal() {
  document.getElementById('nameInput').value = localStorage.getItem('userName') || '';
  document.getElementById('nameModal').classList.remove('hidden');
  document.getElementById('nameInput').focus();
}
function closeNameModal() { document.getElementById('nameModal').classList.add('hidden'); }
function saveName() {
  const name = document.getElementById('nameInput').value.trim();
  localStorage.setItem('userName', name);
  closeNameModal();
  updateTime();
}
document.getElementById('nameModal').addEventListener('click', e => {
  if (e.target === document.getElementById('nameModal')) closeNameModal();
});

/* ===== Focus Timer ===== */
let timerSec = 25 * 60, timerInterval = null, running = false;

function fmt(s) {
  return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
}
function resetTimer() {
  clearInterval(timerInterval); running = false;
  timerSec = (parseInt(document.getElementById('timerMinutes').value) || 25) * 60;
  document.getElementById('timerDisplay').textContent = fmt(timerSec);
}
function startTimer() {
  if (running) return;
  if (timerSec <= 0) resetTimer();
  running = true;
  timerInterval = setInterval(() => {
    timerSec--;
    document.getElementById('timerDisplay').textContent = fmt(timerSec);
    if (timerSec <= 0) { clearInterval(timerInterval); running = false; showToast('Focus session complete! 🎉'); }
  }, 1000);
}
function stopTimer() { clearInterval(timerInterval); running = false; }
document.getElementById('timerMinutes').addEventListener('change', () => { if (!running) resetTimer(); });
resetTimer();

/* ===== To-Do ===== */
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
let currentSort = 'none';

function saveTasks() { localStorage.setItem('tasks', JSON.stringify(tasks)); }

function getSortedTasks() {
  const copy = [...tasks.map((t, i) => ({ ...t, _i: i }))];
  if (currentSort === 'az')     return copy.sort((a, b) => a.text.localeCompare(b.text));
  if (currentSort === 'undone') return copy.sort((a, b) => a.done - b.done);
  if (currentSort === 'done')   return copy.sort((a, b) => b.done - a.done);
  return copy;
}

function sortTasks(mode) {
  currentSort = mode;
  ['sortNone','sortAZ','sortUndone','sortDone'].forEach(id => {
    document.getElementById(id).classList.remove('active');
  });
  const map = { none:'sortNone', az:'sortAZ', undone:'sortUndone', done:'sortDone' };
  document.getElementById(map[mode]).classList.add('active');
  renderTasks();
}

function renderTasks() {
  const ul = document.getElementById('taskList');
  ul.innerHTML = '';
  getSortedTasks().forEach((task, i) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.done ? ' done' : '');
    li.innerHTML = `
      <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTask(${task._i})" />
      <span>${escHtml(task.text)}</span>
      <button onclick="deleteTask(${task._i})">✕</button>`;
    ul.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;
  if (tasks.some(t => t.text.toLowerCase() === text.toLowerCase())) {
    showToast('Task already exists!'); return;
  }
  tasks.push({ text, done: false });
  saveTasks(); renderTasks();
  input.value = '';
}
function toggleTask(i) { tasks[i].done = !tasks[i].done; saveTasks(); renderTasks(); }
function deleteTask(i) { tasks.splice(i, 1); saveTasks(); renderTasks(); }

document.getElementById('taskInput').addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });
renderTasks();

/* ===== Quick Links ===== */
let links = JSON.parse(localStorage.getItem('links') || '[]');

function saveLinks() { localStorage.setItem('links', JSON.stringify(links)); }

function renderLinks() {
  const div = document.getElementById('linkList');
  div.innerHTML = '';
  links.forEach((l, i) => {
    const chip = document.createElement('div');
    chip.className = 'link-chip';
    chip.innerHTML = `<a href="${escHtml(l.url)}" target="_blank" rel="noopener">${escHtml(l.name)}</a>
      <button onclick="deleteLink(${i})">✕</button>`;
    div.appendChild(chip);
  });
}
function addLink() {
  const name = document.getElementById('linkName').value.trim();
  const url  = document.getElementById('linkURL').value.trim();
  if (!name || !url) { showToast('Enter both label and URL.'); return; }
  links.push({ name, url });
  saveLinks(); renderLinks();
  document.getElementById('linkName').value = '';
  document.getElementById('linkURL').value  = '';
}
function deleteLink(i) { links.splice(i, 1); saveLinks(); renderLinks(); }
renderLinks();

/* ===== Helpers ===== */
function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ===== Daily Quote ===== */
const QUOTES = {
  en: [
    "The secret of getting ahead is getting started.",
    "Focus on being productive instead of busy.",
    "Small steps every day lead to big results.",
    "You don't have to be great to start, but you have to start to be great.",
    "Discipline is choosing between what you want now and what you want most.",
    "Done is better than perfect.",
    "One task at a time. One day at a time.",
    "Your future is created by what you do today.",
    "Stay focused and never give up.",
    "Progress, not perfection."
  ],
  id: [
    "Rahasia maju adalah dengan memulai.",
    "Fokus pada produktivitas, bukan kesibukan.",
    "Langkah kecil setiap hari menghasilkan perubahan besar.",
    "Kamu tidak harus hebat untuk memulai, tapi harus memulai untuk menjadi hebat.",
    "Disiplin adalah memilih antara yang kamu inginkan sekarang dan yang paling kamu inginkan.",
    "Selesai lebih baik daripada sempurna.",
    "Satu tugas sekaligus. Satu hari sekaligus.",
    "Masa depanmu dibentuk oleh apa yang kamu lakukan hari ini.",
    "Tetap fokus dan jangan menyerah.",
    "Kemajuan, bukan kesempurnaan."
  ],
  jp: [
    "前進の秘訣は、始めることだ。",
    "忙しさではなく、生産性に集中しよう。",
    "毎日の小さな一歩が大きな結果につながる。",
    "偉大でなくても始められる。でも始めなければ偉大にはなれない。",
    "規律とは、今欲しいものと最も欲しいものを選ぶことだ。",
    "完璧よりも完了が大切。",
    "一度に一つのタスク。一日一日を大切に。",
    "あなたの未来は今日の行動で作られる。",
    "集中して、諦めないで。",
    "完璧ではなく、進歩を目指そう。"
  ],
  th: [
    "ความลับของการก้าวหน้าคือการเริ่มต้น",
    "มุ่งเน้นที่ประสิทธิภาพ ไม่ใช่ความยุ่งวุ่นวาย",
    "ก้าวเล็กๆ ทุกวันนำไปสู่ผลลัพธ์ที่ยิ่งใหญ่",
    "คุณไม่ต้องเก่งเพื่อเริ่มต้น แต่ต้องเริ่มต้นเพื่อเป็นคนเก่ง",
    "วินัยคือการเลือกระหว่างสิ่งที่ต้องการตอนนี้กับสิ่งที่ต้องการมากที่สุด",
    "เสร็จดีกว่าสมบูรณ์แบบ",
    "ทีละงาน ทีละวัน",
    "อนาคตของคุณถูกสร้างโดยสิ่งที่คุณทำวันนี้",
    "มีสมาธิและอย่ายอมแพ้",
    "ความก้าวหน้า ไม่ใช่ความสมบูรณ์แบบ"
  ]
};

function updateQuote() {
  const dayIndex = new Date().getDate() % QUOTES[lang].length;
  document.getElementById('dailyQuote').textContent = `"${QUOTES[lang][dayIndex]}"`;
}

/* ===== Init ===== */
applyLang();
updateTime();
updateBackground();

/* ===== Analog Clock ===== */
function drawClock() {
  const canvas = document.getElementById('analogClock');
  const ctx = canvas.getContext('2d');
  const cx = canvas.width / 2, cy = canvas.height / 2, r = cx - 8;
  const now = new Date();
  const sec = now.getSeconds();
  const min = now.getMinutes();
  const hr  = now.getHours() % 12;
  const isDark = document.body.classList.contains('dark');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Face
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.fillStyle = isDark ? 'rgba(0,20,50,0.6)' : 'rgba(255,255,255,0.2)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Hour marks
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + Math.cos(angle) * (r - 6);
    const y1 = cy + Math.sin(angle) * (r - 6);
    const x2 = cx + Math.cos(angle) * (r - 14);
    const y2 = cy + Math.sin(angle) * (r - 14);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Hour hand
  const hrAngle = ((hr + min / 60) / 12) * 2 * Math.PI - Math.PI / 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(hrAngle) * r * 0.5, cy + Math.sin(hrAngle) * r * 0.5);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Minute hand
  const minAngle = ((min + sec / 60) / 60) * 2 * Math.PI - Math.PI / 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(minAngle) * r * 0.72, cy + Math.sin(minAngle) * r * 0.72);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Second hand
  const secAngle = (sec / 60) * 2 * Math.PI - Math.PI / 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(secAngle) * r * 0.82, cy + Math.sin(secAngle) * r * 0.82);
  ctx.strokeStyle = '#ff6b6b';
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Center dot
  ctx.beginPath();
  ctx.arc(cx, cy, 4, 0, 2 * Math.PI);
  ctx.fillStyle = '#ff6b6b';
  ctx.fill();
}
setInterval(drawClock, 1000);
drawClock();

/* ===== Weather ===== */
const WMO = {
  0:'☀️ Clear sky', 1:'🌤️ Mainly clear', 2:'⛅ Partly cloudy', 3:'☁️ Overcast',
  45:'🌫️ Foggy', 48:'🌫️ Icy fog',
  51:'🌦️ Light drizzle', 53:'🌦️ Drizzle', 55:'🌧️ Heavy drizzle',
  61:'🌧️ Light rain', 63:'🌧️ Rain', 65:'🌧️ Heavy rain',
  71:'🌨️ Light snow', 73:'🌨️ Snow', 75:'❄️ Heavy snow',
  80:'🌦️ Light showers', 81:'🌧️ Showers', 82:'⛈️ Heavy showers',
  95:'⛈️ Thunderstorm', 96:'⛈️ Thunderstorm w/ hail', 99:'⛈️ Severe thunderstorm'
};

function getWeatherIcon(code) {
  if (code === 0) return '☀️';
  if (code <= 2) return '🌤️';
  if (code === 3) return '☁️';
  if (code <= 48) return '🌫️';
  if (code <= 55) return '🌦️';
  if (code <= 65) return '🌧️';
  if (code <= 75) return '❄️';
  if (code <= 82) return '🌧️';
  return '⛈️';
}

async function fetchWeatherByCoords(lat, lon, cityName, countryCode) {
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&wind_speed_unit=kmh`
  );
  const weatherJson = await weatherRes.json();
  const cur = weatherJson.current;
  const code = cur.weather_code;
  const desc = WMO[code] || '🌡️ Unknown';

  document.getElementById('weatherIcon').textContent = getWeatherIcon(code);
  document.getElementById('weatherTemp').textContent = `${Math.round(cur.temperature_2m)}°C`;
  document.getElementById('weatherDesc').textContent = desc.replace(/^[^\s]+\s/, '');
  document.getElementById('weatherHumidity').textContent = `💧 ${cur.relative_humidity_2m}%`;
  document.getElementById('weatherWind').textContent = `💨 ${Math.round(cur.wind_speed_10m)} km/h`;
  document.getElementById('weatherLocation').textContent = [cityName, countryCode].filter(Boolean).join(', ');

  document.getElementById('weatherLoading').classList.add('hidden');
  document.getElementById('weatherData').classList.remove('hidden');
}

async function loadWeatherByIP() {
  // Fallback: detect location via IP
  const res = await fetch('https://ip-api.com/json/?fields=lat,lon,city,countryCode');
  const data = await res.json();
  await fetchWeatherByCoords(data.lat, data.lon, data.city, data.countryCode);
}

async function loadWeather() {
  const t = T[lang];
  document.getElementById('weatherLoading').textContent = t.locating;
  document.getElementById('weatherLoading').classList.remove('hidden');
  document.getElementById('weatherData').classList.add('hidden');
  document.getElementById('weatherError').classList.add('hidden');

  // Try GPS first, fallback to IP-based location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async pos => {
        try {
          const { latitude: lat, longitude: lon } = pos.coords;
          // Reverse geocode
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
          );
          const geoJson = await geoRes.json();
          const city = geoJson.address?.city || geoJson.address?.town || geoJson.address?.village || '';
          const country = geoJson.address?.country_code?.toUpperCase() || '';
          await fetchWeatherByCoords(lat, lon, city, country);
        } catch (e) {
          // GPS worked but something else failed, try IP fallback
          try { await loadWeatherByIP(); } catch { showWeatherError(T[lang].weatherErr); }
        }
      },
      async () => {
        // GPS denied or unavailable, use IP fallback
        try { await loadWeatherByIP(); } catch { showWeatherError(T[lang].weatherErr); }
      },
      { timeout: 8000 }
    );
  } else {
    try { await loadWeatherByIP(); } catch { showWeatherError(T[lang].weatherErr); }
  }
}

function showWeatherError(msg) {
  document.getElementById('weatherLoading').classList.add('hidden');
  document.getElementById('weatherErrorMsg').textContent = msg;
  document.getElementById('weatherError').classList.remove('hidden');
}

loadWeather();
// Refresh every 10 minutes
setInterval(loadWeather, 10 * 60 * 1000);
