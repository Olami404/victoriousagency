/* ═══════════════════════════════════════════════
   IMAGE LIBRARY
═══════════════════════════════════════════════ */
const I = {
  // Home page project images
  p1:'home-banner.png',
  p2:'./website-design.png',
  p3:'./elagarachic-banner.png',
  p4:'./kylie-cosmetics.png',
  p5:'./primepulse-banner.png',
  p6:'./feelingirl-banner.png',
  p7:'./digital-marketing.png',
  p8:'./performance.png',
  p9:'./graphics-design.png',
  p10:'./primepulse-banner2.png',
  p11:'./images.jpeg',
  p12:'./BasitShop.jpg',
  p13:'./Pink ModernPetShop-Banner.png',
  p14:'./4.png',
  p15:'./ads2.jpg',
  p16:'./Pins T.png',
  p17:'./pinterest ads.png',
  p18:'./seo3.jpg',
  p19:'./seo2.jpg',
  p20:'./seo.jpg',
  //About us images
  u1:'./codes.png',
  u2:'./codes2.png',
  u3:'./designer.png',
  // Feedback/results images
  f1:'./feedback-image.png',
  f2:'./Feedback-image2.png',
  f3:'./reviews.png',
  f4:'./underfeedback.png',
  f5:'./sales.jpeg',
  f6:'./sales2.jpeg',
  f7:'./sales1.jpeg',
  f8:'./sales3.jpeg',
  f9:'./seo.jpg',
  f10:'./seo2.jpg',
  f11:'./seo3.jpg',
  f12:'./googlemerchant.jpeg',
  f13:'./google.jpeg',
  f14:'./ads1.1.jpeg',
  f15:'./ads1.2.jpeg',
  f16:'./ads1.3.jpg',
  f17:'./ads2.jpg',
  f18:'./review.jpg',
  f19:'./review2.jpg',
  f20:'./review3.jpg',
  f21:'./review4.jpg',
  f22:'./emailautomations.png',
  f23:'./flows1.jpg',
  f24:'./popup.jpg',
  f25:'./flows3.jpg',
};

/* ═══════════════════════════════════════════════
   GENERIC CAROUSEL ENGINE
═══════════════════════════════════════════════ */
function mkCarousel(containerId, imgArr, interval, slideClass, activeClass, dotsId) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return null;
  let cur = 0;

  imgArr.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = slideClass + (i === 0 ? ' ' + activeClass : '');
    const img = document.createElement('img');
    img.src = src; img.alt = '';
    div.appendChild(img);
    wrap.insertBefore(div, wrap.firstChild);
  });

  const dotWrap = dotsId ? document.getElementById(dotsId) : wrap.querySelector('.svc-dots');
  if (dotWrap) {
    imgArr.forEach((_, i) => {
      const d = document.createElement('span');
      d.className = 'svc-dot' + (i === 0 ? ' on' : '');
      d.onclick = () => go(i);
      dotWrap.appendChild(d);
    });
  }

  function go(idx) {
    const slides = wrap.querySelectorAll('.' + slideClass);
    const dots = wrap.querySelectorAll ? wrap.querySelectorAll('.svc-dot') : [];
    slides[cur].classList.remove(activeClass);
    if (dots[cur]) dots[cur].classList.remove('on');
    cur = idx;
    slides[cur].classList.add(activeClass);
    if (dots[cur]) dots[cur].classList.add('on');
  }

  function next() { go((cur + 1) % imgArr.length); }
  function prev() { go((cur - 1 + imgArr.length) % imgArr.length); }

  const timer = setInterval(next, interval);

  // wire arrow buttons inside the container
  wrap.querySelectorAll('.svc-arr').forEach(btn => {
    btn.onclick = (e) => { e.stopPropagation(); btn.dataset.dir === 'next' ? next() : prev(); };
  });

  return { go, next, prev, stop: () => clearInterval(timer) };
}

/* ═══════════════════════════════════════════════
   HERO CAROUSEL
═══════════════════════════════════════════════ */
const heroData = [
  { img: I.p2, tag: 'Website Design & Development', hl: 'We Build Websites<br>That <em>Convert</em>', sub: 'From Shopify stores to fully custom sites, we craft digital experiences that turn visitors into loyal customers.' },
  { img: I.p7, tag: 'Digital Marketing', hl: 'Marketing That<br><em>Moves the Needle</em>', sub: 'Analytics-driven campaigns that amplify your reach, generate leads, and deliver measurable ROI for your business.' },
  { img: I.p9, tag: 'Graphic Design', hl: 'Visuals That<br><em>Command Attention</em>', sub: 'Logos, banners, social graphics and more. Every pixel crafted to elevate your brand identity and stand out.' },
  { img: I.p8, tag: 'SEO & Website Ranking', hl: 'Rank Higher.<br><em>Grow Faster.</em>', sub: 'Strategic SEO solutions that put your business in front of the right audience at exactly the right time.' },
];

let hCur = 0;
let hProgressTimer = null;

(function initHero() {
  const wrap = document.getElementById('heroSlides');
  heroData.forEach((d, i) => {
    const div = document.createElement('div');
    div.className = 'hero-bg-slide' + (i === 0 ? ' active' : '');
    div.style.backgroundImage = `url("${d.img}")`;
    wrap.appendChild(div);
  });
  startHeroProgress();
  document.getElementById('heroPrevBtn').onclick = heroPrev;
  document.getElementById('heroNextBtn').onclick = heroNext;
})();

function goHero(idx) {
  const slides = document.querySelectorAll('.hero-bg-slide');
  slides[hCur].classList.remove('active');
  hCur = idx;
  slides[hCur].classList.add('active');
  const d = heroData[hCur];
  document.getElementById('heroTag').textContent = d.tag;
  document.getElementById('heroHL').innerHTML = d.hl;
  document.getElementById('heroSub').textContent = d.sub;
  document.getElementById('heroNum').textContent = String(hCur + 1).padStart(2, '0');
  resetHeroProgress();
}
function heroNext() { goHero((hCur + 1) % heroData.length); }
function heroPrev() { goHero((hCur - 1 + heroData.length) % heroData.length); }

function startHeroProgress() {
  const fill = document.getElementById('heroFill');
  let pct = 0;
  if (hProgressTimer) clearInterval(hProgressTimer);
  fill.style.transition = 'none'; fill.style.width = '0%';
  setTimeout(() => {
    fill.style.transition = 'width 0.2s linear';
    hProgressTimer = setInterval(() => {
      pct += 100 / 55;
      fill.style.width = Math.min(pct, 100) + '%';
      if (pct >= 100) { clearInterval(hProgressTimer); heroNext(); }
    }, 100);
  }, 20);
}
function resetHeroProgress() { startHeroProgress(); }

/* ═══════════════════════════════════════════════
   TICKER
═══════════════════════════════════════════════ */
(function initTicker() {
  const items = ['Website Design', 'Digital Marketing', 'Graphic Design', 'SEO & Rankings', 'Shopify Stores', 'Branding', 'PPC Campaigns', 'Social Media'];
  const track = document.getElementById('tickerTrack');
  const repeated = [...items, ...items];
  repeated.forEach(t => {
    const el = document.createElement('div');
    el.className = 'tick-item';
    el.innerHTML = `${t} <span class="tick-dot">●</span>`;
    track.appendChild(el);
  });
})();

/* ═══════════════════════════════════════════════
   SERVICE CARD CAROUSELS (4 cards x 3-4 images)
═══════════════════════════════════════════════ */
mkCarousel('sc-webdev',   [I.p6, I.p10, I.p11, I.p2], 3800, 'svc-slide', 'active', 'sd-webdev');
mkCarousel('sc-graphics', [I.p12, I.p13, I.p14, I.p9], 4200, 'svc-slide', 'active', 'sd-graphics');
mkCarousel('sc-marketing',[I.p15, I.p16, I.p17, I.p7], 3500, 'svc-slide', 'active', 'sd-marketing');
mkCarousel('sc-ranking',  [I.p18, I.p19, I.p20, I.p8], 4600, 'svc-slide', 'active', 'sd-ranking');
mkCarousel('sc-flows',   [I.f22, I.f23, I.f24, I.f25], 4400, 'fb-img-slide', 'active', 'sd-flows');
mkCarousel('sc-review',   [I.f18, I.f19, I.f20, I.f21], 4400, 'svc-slide', 'active', 'sd-review');

/* ═══════════════════════════════════════════════
   FEATURED WORKS CAROUSEL
═══════════════════════════════════════════════ */
const featImgs = [
  { img: I.p5, cap: 'Shopify <em>Design</em>' },
  { img: I.p6, cap: 'E-Commerce <em>Development</em>' },
  { img: I.p3, cap: 'Custom <em>Web Build</em>' },
  { img: I.p4, cap: 'Brand <em>Revamp</em>' },
];
let fCur = 0;
(function initFeat() {
  const wrap = document.getElementById('featCarousel');
  featImgs.forEach((d, i) => {
    const div = document.createElement('div');
    div.className = 'feat-slide' + (i === 0 ? ' active' : '');
    const img = document.createElement('img');
    img.src = d.img; img.alt = '';
    div.appendChild(img);
    wrap.insertBefore(div, wrap.firstChild);
  });
  const dotsWrap = document.getElementById('featDots');
  featImgs.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'feat-dot' + (i === 0 ? ' on' : '');
    d.onclick = () => goFeat(i);
    dotsWrap.appendChild(d);
  });
  setInterval(() => goFeat((fCur + 1) % featImgs.length), 5000);
})();
function goFeat(idx) {
  const slides = document.querySelectorAll('.feat-slide');
  const dots = document.querySelectorAll('.feat-dot');
  slides[fCur].classList.remove('active');
  dots[fCur].classList.remove('on');
  fCur = idx;
  slides[fCur].classList.add('active');
  dots[fCur].classList.add('on');
  document.getElementById('featCaption').innerHTML = featImgs[fCur].cap;
}

/* ═══════════════════════════════════════════════
   PROJECTS PAGE HERO CAROUSEL
═══════════════════════════════════════════════ */
(function initProjHero() {
  const imgs = [I.p1, I.p2, I.p4, I.p3];
  const wrap = document.getElementById('projHeroSlides');
  let c = 0;
  imgs.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'proj-bg' + (i === 0 ? ' active' : '');
    div.style.backgroundImage = `url(${src})`;
    wrap.appendChild(div);
  });
  setInterval(() => {
    const slides = wrap.querySelectorAll('.proj-bg');
    slides[c].classList.remove('active');
    c = (c + 1) % imgs.length;
    slides[c].classList.add('active');
  }, 4500);
})();

/* ═══════════════════════════════════════════════
   FEEDBACK PAGE HERO CAROUSEL
═══════════════════════════════════════════════ */
(function initFbHero() {
  const imgs = [I.f1, I.f2, I.f3, I.f4];
  const wrap = document.getElementById('fbHeroSlides');
  let c = 0;
  imgs.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'fb-bg' + (i === 0 ? ' active' : '');
    div.style.backgroundImage = `url(${src})`;
    wrap.appendChild(div);
  });
  setInterval(() => {
    const slides = wrap.querySelectorAll('.fb-bg');
    slides[c].classList.remove('active');
    c = (c + 1) % imgs.length;
    slides[c].classList.add('active');
  }, 4200);
})();

/* ═══════════════════════════════════════════════
   FEEDBACK CARD CAROUSELS
═══════════════════════════════════════════════ */
mkCarousel('fc-traffic',  [I.f14, I.f15, I.f16, I.f17], 3600, 'fb-img-slide', 'active', 'sd-traffic');
mkCarousel('fc-seo',      [I.f9, I.f10, I.f11], 4000, 'fb-img-slide', 'active', 'sd-seo');
mkCarousel('fc-merchant', [I.f12, I.f13], 3800, 'fb-img-slide', 'active', 'sd-merchant');
mkCarousel('fc-ux',       [I.f5, I.f6, I.f7, I.f8], 4400, 'fb-img-slide', 'active', 'sd-ux');
mkCarousel('fc-flows',   [I.f22, I.f23, I.f24, I.f25], 4400, 'fb-img-slide', 'active', 'sd-flows');
mkCarousel('fc-review',   [I.f18, I.f19, I.f20, I.f21], 4400, 'fb-img-slide', 'active', 'sd-review');

/* ═══════════════════════════════════════════════
   ABOUT PAGE IMAGE CAROUSEL
═══════════════════════════════════════════════ */
(function initAboutImg() {
  const imgs = [I.p1, I.u1, I.u2, I.u3];
  const wrap = document.getElementById('aboutImgCarousel');
  let c = 0;
  imgs.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'about-img-slide' + (i === 0 ? ' active' : '');
    const img = document.createElement('img');
    img.src = src; img.alt = '';
    div.appendChild(img);
    wrap.appendChild(div);
  });
  setInterval(() => {
    const slides = wrap.querySelectorAll('.about-img-slide');
    slides[c].classList.remove('active');
    c = (c + 1) % imgs.length;
    slides[c].classList.add('active');
  }, 4800);
})();

/* ═══════════════════════════════════════════════
   PAGE NAVIGATION
═══════════════════════════════════════════════ */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.dataset.page === name));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('navLinks').classList.remove('open');
}

function toggleBurger() {
  document.getElementById('navLinks').classList.toggle('open');
}

/* Scroll shrink nav */
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 40);
});

/* ═══════════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════════ */
function submitEnquiry() {
  const n = document.getElementById('fName').value.trim();
  const l = document.getElementById('lName').value.trim();
  const e = document.getElementById('fEmail').value.trim();
  const p = document.getElementById('fPhone').value.trim();
  const s = document.getElementById('fService').value;
  const u = document.getElementById('fUrl') ? document.getElementById('fUrl').value.trim() : '';
  const m = document.getElementById('fMsg') ? document.getElementById('fMsg').value.trim() : '';
  if (!n || !e || !s || !m) {
    alert('Please fill in your name, email, service, and message.');
    return;
  }

  const templateParams = {
    first_name: n,
    last_name: l,
    email: e,
    phone: p,
    service: s,
    website: u,
    message: m
  };

  emailjs.send('service_ewerwse', 'template_tfu8mhj', templateParams)
    .then(() => {
      document.getElementById('fOk').style.display = 'block';
      document.getElementById('cForm').reset();
      // instead clear fields automatically after submission:
      // document.querySelectorAll('#cForm input, #cForm textarea').forEach(el => el.value = '');
      // hide success message after 5 seconds
      setTimeout(() => {
        document.getElementById('fOk').style.display = 'none';
      }, 5000);
    }, (error) => {
      console.error('Failed...', error);
      alert('Something went wrong. Please try again later.');
    });
}