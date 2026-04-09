/* ===== Toast ===== */
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 2200);
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
  const url = BG[lang][mode];
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
updateBackground();

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
