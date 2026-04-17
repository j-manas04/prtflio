
// Custom cursor
const cur = document.getElementById('cur');
const ring = document.getElementById('ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px'; });
function animRing() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animRing); }
animRing();
document.querySelectorAll('a,button,.srv-card,.proj-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.style.width = '20px'; cur.style.height = '20px'; ring.style.width = '52px'; ring.style.height = '52px'; });
    el.addEventListener('mouseleave', () => { cur.style.width = '12px'; cur.style.height = '12px'; ring.style.width = '36px'; ring.style.height = '36px'; });
});

// Scroll reveal
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Nav scroll shadow
window.addEventListener('scroll', () => {
    document.querySelector('nav').style.boxShadow = window.scrollY > 60 ? '0 4px 30px rgba(0,0,0,0.08)' : 'none';
});

// Back to top
const btt = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    btt.classList.toggle('visible', window.scrollY > 400);
});
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Hamburger / mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
// Close menu on link click
document.querySelectorAll('.m-nav-link, .m-github').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// Active nav link highlight (desktop + mobile)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const mobileLinks = document.querySelectorAll('.m-nav-link');
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
            mobileLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
        }
    });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

//emailjs initialization
(function(){
  emailjs.init("VdDspB8txv8Ky8okE"); // paste here
})();

document.getElementById("contact-form").addEventListener("submit", function(e){
  e.preventDefault();

  emailjs.sendForm(
    "service_9p25lp2",
    "template_gysp2i9",
    this
  ).then(function(){
      alert("Message Sent Successfully ✅");
  }, function(error){
      alert("Failed ❌ " + JSON.stringify(error));
  });
});
