// main.js (enhanced with theme toggle and 4-column support)
(function(){
  const fullName = 'Ian Tolentino';
  const initials = (fullName.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase()) || 'IT';

  // Theme management
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    // Default to light mode as requested
    if (!savedTheme) {
      document.documentElement.setAttribute('data-theme', 'light');
      updateThemeToggle('light');
    } else {
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeToggle(savedTheme);
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle(newTheme);
  }

  function updateThemeToggle(theme) {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      const icon = toggle.querySelector('.theme-icon');
      const text = toggle.querySelector('.theme-text');
      
      if (theme === 'light') {
        icon.textContent = '🌙';
        text.textContent = 'Dark Mode';
      } else {
        icon.textContent = '☀️';
        text.textContent = 'Light Mode';
      }
    }
  }

  // Initialize theme
  initTheme();

  // Add theme toggle to header
  const header = document.querySelector('.header');
  if (header) {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = `
      <span class="theme-icon">🌙</span>
      <span class="theme-text">Dark Mode</span>
    `;
    themeToggle.addEventListener('click', toggleTheme);
    
    // Add toggle to header (right side)
    header.appendChild(themeToggle);
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