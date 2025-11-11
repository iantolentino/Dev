// main.js (updated for fixed theme toggle position)
(function(){
  const fullName = 'Ian Tolentino';
  const initials = (fullName.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase()) || 'IT';

  // Theme management
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    // Default to light mode as requested
    if (!savedTheme) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Update switch after it's created
    setTimeout(updateThemeSwitch, 100);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeSwitch();
  }

  function updateThemeSwitch() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const switchInput = document.querySelector('.theme-switch input');
    if (switchInput) {
      switchInput.checked = currentTheme === 'dark';
    }
  }

  // Initialize theme
  initTheme();

  // Add event listener to existing theme switch
  const themeSwitch = document.querySelector('.theme-switch');
  if (themeSwitch) {
    const checkbox = themeSwitch.querySelector('input');
    checkbox.addEventListener('change', toggleTheme);
    
    // Initialize switch state immediately
    updateThemeSwitch();
  }

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
  document.querySelectorAll('.grid .card, .grid-4 .card').forEach((c,i)=> c.style.setProperty('--i', i));
})();