/**
 * backend-demo-floating.js - Interactive backend API demo as floating button
 * Author: Ian Tolentino
 * Version: 1.2.0
 */

// ============================================
// Backend API Endpoints Configuration
// ============================================
const BACKEND_ENDPOINTS = [
  {
    method: 'GET',
    path: '/api/projects',
    description: 'Fetch all projects with metadata',
    responseTime: '42ms',
    statusCode: 200,
    requestHeaders: {
      'Authorization': 'Bearer ••••••••',
      'Accept': 'application/json'
    },
    response: {
      status: 200,
      data: {
        projects: 63,
        total_stars: 142,
        languages: ['Python', 'JavaScript', 'TypeScript'],
        updated_at: new Date().toISOString()
      }
    }
  },
  {
    method: 'POST',
    path: '/api/auth/login',
    description: 'Authenticate user with credentials',
    responseTime: '156ms',
    statusCode: 200,
    requestHeaders: {
      'Content-Type': 'application/json',
      'User-Agent': 'Portfolio Demo'
    },
    request: {
      email: 'user@example.com',
      password: '••••••••'
    },
    response: {
      status: 200,
      data: {
        token: 'demo-token-123456',
        expires_in: '3600s',
        user: { 
          id: 1, 
          name: 'Ian Tolentino', 
          role: 'developer',
          permissions: ['read:projects', 'write:projects']
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/skills',
    description: 'Get developer skills and proficiency levels',
    responseTime: '28ms',
    statusCode: 200,
    requestHeaders: { 'Accept': 'application/json' },
    response: {
      status: 200,
      data: {
        primary: [
          { name: 'Python', level: 95, years: 3 },
          { name: 'JavaScript', level: 90, years: 2.5 },
          { name: 'Flask/FastAPI', level: 85, years: 2 }
        ],
        secondary: [
          { name: 'TypeScript', level: 75 },
          { name: 'React', level: 70 },
          { name: 'Docker', level: 65 }
        ],
        tools: ['Git', 'Linux', 'AWS', 'Postman']
      }
    }
  },
  {
    method: 'GET',
    path: '/api/health',
    description: 'Backend health check and uptime',
    responseTime: '12ms',
    statusCode: 200,
    requestHeaders: { 'Accept': 'application/json' },
    response: {
      status: 200,
      data: { 
        status: 'healthy', 
        uptime: '99.9%', 
        response_time: '12ms',
        active_connections: 128,
        memory_usage: '42%',
        cpu_usage: '18%'
      }
    }
  }
];

// ============================================
// BackendDemoFloating Class
// ============================================
class BackendDemoFloating {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentEndpoint = 0;
    this.isOpen = false;
    this.isAutoPlaying = false;
    this.autoPlayInterval = null;

    this.togglePanel = this.togglePanel.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.toggleAutoPlay = this.toggleAutoPlay.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  render() {
    if (!this.container) return;

    const html = `
      <div class="backend-demo-floating">
        <button class="backend-demo-toggle" id="backendDemoToggle">
          <i class="fas fa-code toggle-icon"></i>
          <span class="toggle-text">Try Live API</span>
        </button>

        <div class="backend-demo-panel" id="backendDemoPanel">
          <div class="demo-panel-header">
            <div>
              <h3>Backend API Demo</h3>
              <div class="subtitle">Interactive REST API Patterns</div>
            </div>
            <button class="close-btn" id="closePanelBtn"><i class="fas fa-times"></i></button>
          </div>

          <div class="demo-panel-content" id="demoPanelContent">
            ${this.renderEndpointContent()}
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.addEventListeners();
  }

  renderEndpointContent() {
    const endpoint = BACKEND_ENDPOINTS[this.currentEndpoint];
    return `
      <div class="endpoint-nav">
        <button class="nav-btn-small" id="prevEndpoint"><i class="fas fa-arrow-left"></i> Prev</button>
        <span class="endpoint-counter">${this.currentEndpoint + 1} / ${BACKEND_ENDPOINTS.length}</span>
        <button class="nav-btn-small" id="nextEndpoint">Next <i class="fas fa-arrow-right"></i></button>
      </div>

      <div class="endpoint-details">
        <span class="method-badge-small ${endpoint.method.toLowerCase()}">${endpoint.method}</span>
        <div class="endpoint-path">${endpoint.path}</div>
        <p class="endpoint-desc">${endpoint.description}</p>

        <span class="section-label">Request Headers:</span>
        <pre class="code-block-small">${JSON.stringify(endpoint.requestHeaders, null, 2)}</pre>

        ${endpoint.request ? `<span class="section-label">Request Body:</span>
        <pre class="code-block-small">${JSON.stringify(endpoint.request, null, 2)}</pre>` : ''}

        <span class="section-label">Response:</span>
        <div class="status-badge-small status-${endpoint.statusCode}">
          ${endpoint.statusCode} ${this.getStatusText(endpoint.statusCode)} • ${endpoint.responseTime}
        </div>
        <pre class="code-block-small">${JSON.stringify(endpoint.response.data, null, 2)}</pre>

        <div class="auto-play-controls">
          <button class="auto-play-btn-small ${this.isAutoPlaying ? 'active' : ''}" id="autoPlayBtn">
            <i class="fas fa-${this.isAutoPlaying ? 'pause' : 'play'}"></i>
            ${this.isAutoPlaying ? 'Pause' : 'Auto Play'}
          </button>
          <div class="progress-bar-small">
            <div class="progress-fill-small" style="width: ${((this.currentEndpoint + 1) / BACKEND_ENDPOINTS.length) * 100}%"></div>
          </div>
        </div>

        <div class="demo-footer">
          <i class="fas fa-info-circle"></i> Demonstrates REST API patterns, auth, and live metrics
        </div>
      </div>
    `;
  }

  addEventListeners() {
    const toggleBtn = document.getElementById('backendDemoToggle');
    const closeBtn = document.getElementById('closePanelBtn');
    const panel = document.getElementById('backendDemoPanel');
    const prevBtn = document.getElementById('prevEndpoint');
    const nextBtn = document.getElementById('nextEndpoint');
    const autoPlayBtn = document.getElementById('autoPlayBtn');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        this.togglePanel(); 
      });
    }
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => { 
        this.isOpen = false; 
        panel.classList.remove('active'); 
        this.updateToggleIcon(); 
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        this.prev(); 
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        this.next(); 
      });
    }
    
    if (autoPlayBtn) {
      autoPlayBtn.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        this.toggleAutoPlay(); 
      });
    }

    document.addEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(event) {
    const panel = document.getElementById('backendDemoPanel');
    const toggle = document.getElementById('backendDemoToggle');
    if (this.isOpen && panel && !panel.contains(event.target) && !toggle.contains(event.target)) {
      this.isOpen = false;
      panel.classList.remove('active');
      this.updateToggleIcon();
    }
  }

  togglePanel() {
    this.isOpen = !this.isOpen;
    const panel = document.getElementById('backendDemoPanel');
    if (panel) panel.classList.toggle('active', this.isOpen);
    this.updateToggleIcon();
  }

  updateToggleIcon() {
    const toggleIcon = document.getElementById('toggleIcon');
    if (toggleIcon) toggleIcon.className = this.isOpen ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
  }

  next() { 
    this.currentEndpoint = (this.currentEndpoint + 1) % BACKEND_ENDPOINTS.length; 
    this.updateContent(); 
  }
  
  prev() { 
    this.currentEndpoint = (this.currentEndpoint - 1 + BACKEND_ENDPOINTS.length) % BACKEND_ENDPOINTS.length; 
    this.updateContent(); 
  }

  updateContent() {
    const contentDiv = document.getElementById('demoPanelContent');
    if (contentDiv) { 
      contentDiv.innerHTML = this.renderEndpointContent(); 
      this.addEventListeners(); 
    }
  }

  toggleAutoPlay() {
    this.isAutoPlaying = !this.isAutoPlaying;
    if (this.isAutoPlaying) {
      this.autoPlayInterval = setInterval(() => this.next(), 3000);
    } else {
      clearInterval(this.autoPlayInterval);
    }
    this.updateContent();
  }

  getStatusText(status) {
    const map = { 
      200: 'OK', 
      201: 'Created', 
      204: 'No Content', 
      400: 'Bad Request', 
      401: 'Unauthorized', 
      403: 'Forbidden', 
      404: 'Not Found', 
      500: 'Internal Server Error' 
    };
    return map[status] || 'Unknown';
  }

  destroy() {
    if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
    document.removeEventListener('click', this.handleClickOutside);
  }
}

// ============================================
// Initialize on page load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const containerId = 'backend-demo-floating';
  let demoContainer = document.getElementById(containerId);
  if (!demoContainer) {
    demoContainer = document.createElement('div');
    demoContainer.id = containerId;
    document.body.appendChild(demoContainer);
  }

  const backendDemo = new BackendDemoFloating(containerId);
  backendDemo.render();
  window.backendDemo = backendDemo;
});