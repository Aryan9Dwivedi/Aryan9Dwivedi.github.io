// Mobile drawer toggle
const burger = document.querySelector('.burger');
const drawer = document.querySelector('.mobile-drawer');
if (burger && drawer) burger.addEventListener('click', () => drawer.classList.toggle('open'));

// Smooth scroll for in-page #links
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (el) { e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); history.replaceState(null,'',`#${id}`); }
});

// --- Google Apps Script subscribe: hidden iframe + success modal ---
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form.gs-form');
  const modal = document.getElementById('subscribedModal');
  const closeBtn = modal ? modal.querySelector('[data-close]') : null;

  const openModal = () => { if(modal){ modal.classList.add('show'); modal.setAttribute('aria-hidden','false'); } };
  const closeModal = () => { if(modal){ modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); } };

  closeBtn && closeBtn.addEventListener('click', closeModal);
  modal && modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });

  forms.forEach(f => {
    f.addEventListener('submit', () => {
      setTimeout(openModal, 150);               // show success popup
      const email = f.querySelector('input[type="email"]');
      setTimeout(() => { if (email) email.value = ''; }, 400); // clear field
    });
  });
});

// ---------- HOME polaroid carousel (with note) ----------
(function(){
  const homePolaroid = document.querySelector('.home-polaroid');
  if (!homePolaroid) return;

  const imgEl = homePolaroid.querySelector('.frame img');
  const noteEl = homePolaroid.querySelector('.note');
  const capEl = homePolaroid.querySelector('figcaption');

  const slides = [
    { src: 'img/potd.jpg',      caption: 'Centennial Wheel — Chicago',      note: 'my camera obsession & clicks' },
    { src: 'img/court.jpg',     caption: 'Evening pickup near campus',      note: 'my camera obsession & clicks' },
    { src: 'img/cutegoat.jpg',  caption: 'New friend at the petting zoo',   note: 'my camera obsession & clicks' },
    { src: 'img/sculpture.jpg', caption: 'Gilbert & Weingartner sculpture', note: 'my camera obsession & clicks' },
    { src: 'img/van.jpg',       caption: 'Van Gogh — Self-Portrait (study)',note: 'my camera obsession & clicks' },
  ];

  let i = 0;
  function show(idx){
    const s = slides[idx];
    const testImg = new Image();
    testImg.onload = () => { imgEl.src = s.src; };
    testImg.onerror = () => { imgEl.src = ''; imgEl.alt = 'image not found'; };
    testImg.src = s.src;

    if (capEl) capEl.textContent = s.caption;
    if (noteEl) noteEl.textContent = s.note;
  }
  show(i);
  setInterval(()=>{ i = (i+1) % slides.length; show(i); }, 6000);
})();
