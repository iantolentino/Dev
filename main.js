// main.js (simplified - no hamburger)
(function(){
  const fullName = 'Ian Tolentino';
  const initials = (fullName.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase()) || 'IT';

  // set avatar initials
  document.querySelectorAll('.avatar-initials').forEach(el=>{
    el.textContent = initials;
    el.setAttribute('aria-label', fullName);
  });

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
