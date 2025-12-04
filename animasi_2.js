// Buat spots acak di area sekitar tengah dan beri animasi muncul/hilang
document.addEventListener('DOMContentLoaded', () => {
  // buat container (jika belum ada)
  let container = document.querySelector('.spots-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'spots-container';
    document.body.appendChild(container);
  }

  const root = getComputedStyle(document.documentElement);
  const centerSize = parseFloat(root.getPropertyValue('--center-size')) || 400;
  let spotScale = root.getPropertyValue('--spot-scale').trim();

  // normalisasi --spot-scale: bisa 0.68 atau "68%" => jadi fraction
  if (spotScale.endsWith('%')) {
    spotScale = parseFloat(spotScale) / 100;
  } else {
    spotScale = parseFloat(spotScale) || 0.68;
  }
  const baseSpotSize = Math.max(8, centerSize * spotScale);

  const cx = () => window.innerWidth / 2;
  const cy = () => window.innerHeight / 2;
  const radiusMax = centerSize * 1.6; // radius sebar spots

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function createSpot() {
    const s = document.createElement('span');
    s.className = 'spot';
    // variasi ukuran sedikit
    const size = Math.round(baseSpotSize * rand(0.75, 1.05));
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;

    // posisi acak di sekitar centre
    const angle = rand(0, Math.PI * 2);
    const r = rand(0, radiusMax);
    s.style.left = `${cx() + r * Math.cos(angle) - size / 2}px`;
    s.style.top  = `${cy() + r * Math.sin(angle) - size / 2}px`;

    // animasi: durasi dan delay acak
    const duration = rand(3.5, 7); // detik
    const delay = rand(0, 5);
    s.style.animation = `float-fade ${duration}s ${delay}s ease-in-out infinite`;

    container.appendChild(s);

    // ubah posisi secara periodik agar efek lebih acak
    const moveInterval = setInterval(() => {
      if (!document.body.contains(s)) {
        clearInterval(moveInterval);
        return;
      }
      const angle2 = rand(0, Math.PI * 2);
      const r2 = rand(0, radiusMax);
      s.style.left = `${cx() + r2 * Math.cos(angle2) - size / 2}px`;
      s.style.top  = `${cy() + r2 * Math.sin(angle2) - size / 2}px`;
      // opsi: ubah durasi lagi
      const newDur = rand(3, 7);
      const newDelay = rand(0, 5);
      s.style.animation = `float-fade ${newDur}s ${newDelay}s ease-in-out infinite`;
    }, rand(3500, 9000));

    return s;
  }

  // jumlah spot
  const COUNT = 8;
  for (let i = 0; i < COUNT; i++) {
    setTimeout(createSpot, i * 250 + Math.random() * 600);
  }

  // responsive reposition saat resize
  window.addEventListener('resize', () => {
    const all = container.querySelectorAll('.spot');
    all.forEach(sp => {
      const sizePx = parseFloat(getComputedStyle(sp).width);
      const angle = rand(0, Math.PI * 2);
      const r = rand(0, radiusMax);
      sp.style.left = `${cx() + r * Math.cos(angle) - sizePx / 2}px`;
      sp.style.top = `${cy() + r * Math.sin(angle) - sizePx / 2}px`;
    });
  });
});