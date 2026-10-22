// SunShineGirls Cleaning — bespoke redesign
document.addEventListener('DOMContentLoaded', function () {
  // Footer year
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  // Reveal on scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.svc, .gal-item, .rev, .trust-item').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    io.observe(el);
  });

  // Sticky header shadow
  var head = document.querySelector('.site-head');
  window.addEventListener('scroll', function () {
    if (!head) return;
    if (window.scrollY > 10) head.style.boxShadow = '0 12px 30px -24px rgba(0,0,0,.6)';
    else head.style.boxShadow = 'none';
  });
});

// Quote form handler (demo — no backend; falls back to WhatsApp handoff)
function handleQuote(e) {
  e.preventDefault();
  var form = e.target;
  var note = document.getElementById('formNote');
  var name = (form.name && form.name.value || '').trim();
  var contact = (form.contact && form.contact.value || '').trim();
  var msg = (form.msg && form.msg.value || '').trim();
  if (note) {
    note.textContent = 'Thanks ' + (name || 'there') + '! Opening WhatsApp so Amanda can reply fast…';
  }
  var text = encodeURIComponent(
    'Hi Amanda, quote request from ' + (name || 'a website visitor') +
    '. Contact: ' + (contact || '-') +
    '. Job: ' + (msg || '-')
  );
  setTimeout(function () {
    window.open('https://wa.me/27823225268?text=' + text, '_blank');
  }, 700);
  form.reset();
  return false;
}
