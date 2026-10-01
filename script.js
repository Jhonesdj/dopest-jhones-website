
  // Sticky header background on scroll
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
    });
  });

  // Build waveform bars
  const waveform = document.getElementById('waveform');
  const barCount = 60;
  const heights = [];
  for (let i = 0; i < barCount; i++) {
    const h = 8 + Math.round(Math.abs(Math.sin(i * 0.4)) * 28 + Math.random() * 8);
    heights.push(h);
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = h + 'px';
    waveform.appendChild(bar);
  }

  // Fake play/pause + progress
  const playBtn = document.getElementById('playBtn');
  const timeNow = document.getElementById('timeNow');
  const bars = waveform.querySelectorAll('.bar');
  const totalSeconds = 58 * 60 + 12;
  let playing = false;
  let elapsed = 0;
  let timer = null;

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = String(Math.floor(s % 60)).padStart(2, '0');
    return `${m}:${sec}`;
  }

  function updateProgress() {
    const pct = elapsed / totalSeconds;
    const filled = Math.floor(pct * bars.length);
    bars.forEach((b, i) => b.classList.toggle('played', i < filled));
    timeNow.textContent = formatTime(elapsed);
  }

  function togglePlay() {
    playing = !playing;
    playBtn.textContent = playing ? '❚❚' : '▶';
    playBtn.setAttribute('aria-label', playing ? 'Pause mix' : 'Play latest mix');
    if (playing) {
      timer = setInterval(() => {
        elapsed += 1;
        if (elapsed >= totalSeconds) {
          elapsed = 0;
          togglePlay();
        }
        updateProgress();
      }, 1000);
    } else {
      clearInterval(timer);
    }
  }
  playBtn.addEventListener('click', togglePlay);

  waveform.addEventListener('click', (e) => {
    const rect = waveform.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    elapsed = Math.max(0, Math.min(totalSeconds, pct * totalSeconds));
    updateProgress();
  });

  // Contact form (static demo — no backend wired up)
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const original = btn.textContent;
    btn.textContent = 'Message Sent';
    form.reset();
    setTimeout(() => { btn.textContent = original; }, 2400);
  });
