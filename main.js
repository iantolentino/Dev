/* Main script used across pages: sets avatar initials, mobile nav, active nav link, favicon (initials) */
(function(){
  const fullName = 'Ian Tolentino'; // <-- change this to update name across the site
  const initials = (fullName.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase()) || 'IT';

  // 1) Set avatar initials where present
  document.querySelectorAll('.avatar-initials').forEach(el=>{
    // if you want to use an image avatar instead, uncomment the <img> in HTML and remove this block
    el.textContent = initials;
    el.setAttribute('aria-label', fullName);
  });

  // 2) Set document title dynamically if placeholder exists
  const titleEl = document.querySelector('meta[name="author-name"]');
  if(titleEl) document.title = `${fullName} — Professional Portfolio`;

  // 3) Set favicon to initials (SVG data URL)
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><rect width='100%' height='100%' fill='%230d1117'/><text x='50%' y='55%' font-size='32' text-anchor='middle' fill='%23ffffff' font-family='Inter, Arial' font-weight='700'>${initials}</text></svg>`;
  const url = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  let link = document.querySelector("link[rel~='icon']");
  if(!link){ link = document.createElement('link'); link.rel='icon'; document.head.appendChild(link) }
  link.href = url;

  // 4) Mobile nav toggle and blur effect
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const container = document.querySelector('.container');
  function openMobile(){ mobileNav.classList.add('show'); container.style.filter = 'blur(6px)'; document.body.style.overflow='hidden' }
  function closeMobile(){ mobileNav.classList.remove('show'); container.style.filter = ''; document.body.style.overflow='' }
  if(hamburger && mobileNav){
    hamburger.addEventListener('click', ()=> {
      if(mobileNav.classList.contains('show')) closeMobile(); else openMobile();
    });
    // close when clicking links
    mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=> closeMobile()));
    mobileNav.addEventListener('click', (e)=> { if(e.target === mobileNav) closeMobile(); });
  }

  // 5) Highlight active nav link
  const navLinks = document.querySelectorAll('nav.primary a');
  navLinks.forEach(a=>{
    try{
      const href = a.getAttribute('href');
      if(window.location.pathname.endsWith(href) || window.location.href.includes(href.replace('#',''))){
        a.classList.add('active');
      }
    }catch(e){}
  });

  // 6) Simple stagger assign for grid cards so CSS variable --i works
  document.querySelectorAll('.grid .card').forEach((c,i)=> c.style.setProperty('--i', i));

  // 7) Smooth anchor behavior for intra-page links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
    });
  });
})();