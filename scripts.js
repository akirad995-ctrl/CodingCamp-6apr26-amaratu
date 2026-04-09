/* ===== Toast ===== */
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ===== Dark Mode ===== */
function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.getElementById('themeBtn').textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
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
        modalTitle:"What's your name?" },
  id: { morning:'Selamat Pagi', afternoon:'Selamat Siang', evening:'Selamat Malam',
        timer:'🎯 Timer Fokus', todo:'📝 Daftar Tugas', links:'🔗 Tautan Cepat',
        start:'Mulai', stop:'Berhenti', reset:'Reset', add:'Tambah', addLink:'Tambah',
        taskPh:'Tambah tugas...', namePh:'Label', urlPh:'https://...', minutes:'Menit:',
        modalTitle:'Siapa namamu?' },
  jp: { morning:'おはようございます', afternoon:'こんにちは', evening:'こんばんは',
        timer:'🎯 フォーカスタイマー', todo:'📝 やることリスト', links:'🔗 クイックリンク',
        start:'開始', stop:'停止', reset:'リセット', add:'追加', addLink:'追加',
        taskPh:'タスクを追加...', namePh:'ラベル', urlPh:'https://...', minutes:'分:',
        modalTitle:'お名前は？' },
  th: { morning:'สวัสดีตอนเช้า', afternoon:'สวัสดีตอนบ่าย', evening:'สวัสดีตอนเย็น',
        timer:'🎯 จับเวลาโฟกัส', todo:'📝 รายการสิ่งที่ต้องทำ', links:'🔗 ลิงก์ด่วน',
        start:'เริ่ม', stop:'หยุด', reset:'รีเซ็ต', add:'เพิ่ม', addLink:'เพิ่ม',
        taskPh:'เพิ่มงาน...', namePh:'ชื่อ', urlPh:'https://...', minutes:'นาที:',
        modalTitle:'ชื่อของคุณคืออะไร?' }
};

let lang = localStorage.getItem('lang') || 'en';

function changeLanguage() {
  lang = document.getElementById('language').value;
  localStorage.setItem('lang', lang);
  applyLang();
  updateTime();
}

function applyLang() {
  const t = T[lang];
  document.getElementById('timerTitle').textContent   = t.timer;
  document.getElementById('todoTitle').textContent    = t.todo;
  document.getElementById('linksTitle').textContent   = t.links;
  document.getElementById('startBtn').textContent     = t.start;
  document.getElementById('addTaskBtn').textContent   = t.add;
  document.getElementById('addLinkBtn').textContent   = t.addLink;
  document.getElementById('taskInput').placeholder    = t.taskPh;
  document.getElementById('linkName').placeholder     = t.namePh;
  document.getElementById('linkURL').placeholder      = t.urlPh;
  document.getElementById('minutesLabel').childNodes[0].textContent = t.minutes + ' ';
  document.getElementById('modalTitle').textContent   = t.modalTitle;
  document.getElementById('language').value = lang;
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

function saveTasks() { localStorage.setItem('tasks', JSON.stringify(tasks)); }

function renderTasks() {
  const ul = document.getElementById('taskList');
  ul.innerHTML = '';
  tasks.forEach((task, i) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.done ? ' done' : '');
    li.innerHTML = `
      <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTask(${i})" />
      <span>${escHtml(task.text)}</span>
      <button onclick="deleteTask(${i})">✕</button>`;
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

/* ===== Init ===== */
applyLang();
updateTime();
