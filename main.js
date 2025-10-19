// main.js (updated for new navigation)
(function(){
  const fullName = 'Ian Tolentino';
  const initials = (fullName.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase()) || 'IT';

  // set avatar initials
  document.querySelectorAll('.avatar-initials').forEach(el=>{
    el.textContent = initials;
    el.setAttribute('aria-label', fullName);
  });

  // favicon as initials SVG
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><rect width='100%' height='100%' fill='%230d1117'/><text x='50%' y='55%' font-size='32' text-anchor='middle' fill='%23ffffff' font-family='Inter, Arial' font-weight='700'>${initials}</text></svg>`;
  const url = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  let link = document.querySelector("link[rel~='icon']");
  if(!link){ link = document.createElement('link'); link.rel='icon'; document.head.appendChild(link); }
  link.href = url;

  const hamburger = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const container = document.querySelector('.container');

  function isMobileView(){ return window.matchMedia('(max-width:980px)').matches; }

  function openMobile(){
    if(!isMobileView()) return;
    mobileNav.classList.add('show');
    container.style.filter = 'blur(8px)';
    document.body.style.overflow = 'hidden';
  }
  function closeMobile(){
    mobileNav.classList.remove('show');
    container.style.filter = '';
    document.body.style.overflow = '';
  }
  function toggleMobile(){
    if(mobileNav.classList.contains('show')) closeMobile(); else openMobile();
  }

  if(hamburger){
    hamburger.addEventListener('click', (e)=>{ e.preventDefault(); toggleMobile(); });
  }
  if(mobileNav){
    mobileNav.addEventListener('click', (e)=>{ if(e.target === mobileNav) closeMobile(); });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=> closeMobile()));
  }

  // close mobile nav when resizing up
  window.addEventListener('resize', ()=>{ if(!isMobileView()) closeMobile(); });

  // smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
    });
  });

  // stagger variable for cards
  document.querySelectorAll('.grid .card').forEach((c,i)=> c.style.setProperty('--i', i));
})();
