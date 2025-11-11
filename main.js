// main.js (enhanced with room-style theme switch)
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
      updateThemeSwitch('light');
    } else {
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeSwitch(savedTheme);
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeSwitch(newTheme);
  }

  function updateThemeSwitch(theme) {
    const switchInput = document.querySelector('.theme-switch input');
    if (switchInput) {
      switchInput.checked = theme === 'dark';
    }
  }

  // Initialize theme
  initTheme();

  // Add theme switch to header
  const header = document.querySelector('.header');
  if (header) {
    const themeSwitchContainer = document.createElement('div');
    themeSwitchContainer.className = 'theme-switch-container';
    themeSwitchContainer.style.display = 'flex';
    themeSwitchContainer.style.alignItems = 'center';
    themeSwitchContainer.style.gap = '10px';
    
    const themeSwitch = document.createElement('label');
    themeSwitch.className = 'theme-switch';
    themeSwitch.innerHTML = `
      <input type="checkbox">
      <span class="slider"></span>
    `;
    
    const switchLabel = document.createElement('span');
    switchLabel.className = 'switch-label';
    switchLabel.textContent = 'Dark Mode';
    switchLabel.style.color = 'var(--text)';
    switchLabel.style.fontSize = '0.9rem';
    switchLabel.style.fontWeight = '600';
    
    themeSwitchContainer.appendChild(themeSwitch);
    themeSwitchContainer.appendChild(switchLabel);
    
    // Add event listener to the checkbox
    const checkbox = themeSwitch.querySelector('input');
    checkbox.addEventListener('change', toggleTheme);
    
    // Initialize switch state
    updateThemeSwitch(document.documentElement.getAttribute('data-theme'));
    
    header.appendChild(themeSwitchContainer);
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