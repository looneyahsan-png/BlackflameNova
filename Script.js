/* ===== BLACKFLAME NOVA - JAVASCRIPT ===== */

// Configuration
const CONFIG = {
  ANIMATION_DURATION: 300,
  SCROLL_OFFSET: 80,
  DISCORD_INVITE: 'https://discord.gg/your-invite-code', // Replace with actual invite
  MINECRAFT_IP: 'cat.fi.freemcserver.net:41600',
  BEDROCK_IP: 'cat.fi.freemcserver.net',
  BEDROCK_PORT: '41600'
};

// Utility functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const scrollTo = (element, offset = CONFIG.SCROLL_OFFSET) => {
  const targetPosition = element.offsetTop - offset;
  window.scrollTo({ top: targetPosition, behavior: 'smooth' });
};

/* ===== NAVIGATION SYSTEM ===== */
const Navigation = {
  init() {
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupActiveLinks();
    this.setupScrollEffects();
  },

  setupMobileMenu() {
    const toggle = $('.mobile-toggle');
    const menu = $('.nav-menu');
    
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    $$('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  },

  setupSmoothScrolling() {
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        const target = $(href);
        if (target) {
          e.preventDefault();
          scrollTo(target);
        }
      });
    });
  },

  setupActiveLinks() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    
    $$('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        const linkPage = href.replace('.html', '').replace('./', '');
        if (linkPage === currentPage || (currentPage === 'index' && linkPage === '')) {
          link.classList.add('active');
        }
      }
    });
  },

  setupScrollEffects() {
    const header = $('.header');
    if (!header) return;

    const handleScroll = debounce(() => {
      if (window.scrollY > 50) {
        header.style.background = 'rgba(26, 31, 58, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
      } else {
        header.style.background = 'rgba(26, 31, 58, 0.95)';
        header.style.boxShadow = 'none';
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
  }
};

/* ===== ANIMATIONS & EFFECTS ===== */
const Animations = {
  init() {
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupParticleEffects();
    this.setupCounterAnimations();
  },

  setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.classList.add('fade-in-up');
        }
      });
    }, { 
      threshold: 0.1, 
      rootMargin: '0px 0px -50px 0px' 
    });

    // Animate elements on scroll
    $$('.card, .team-card, .stat-card, .social-card, .contact-card, .schedule-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  },

  setupHoverEffects() {
    // Enhanced card hover effects
    $$('.card, .team-card, .stat-card, .social-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-12px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Button glow effects
    $$('.btn-primary').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.boxShadow = '0 8px 30px rgba(88, 101, 242, 0.4)';
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.boxShadow = '';
      });
    });

    // Logo pulse effect
    const logoIcon = $('.logo-icon');
    if (logoIcon) {
      setInterval(() => {
        logoIcon.style.transform = 'scale(1.1)';
        setTimeout(() => {
          logoIcon.style.transform = 'scale(1)';
        }, 200);
      }, 3000);
    }
  },

  setupParticleEffects() {
    // Simple particle effect for hero sections
    const heroes = $$('.hero');
    heroes.forEach(hero => {
      this.createParticles(hero);
    });
  },

  createParticles(container) {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(52, 152, 219, 0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 2}s;
      `;
      
      container.appendChild(particle);
    }

    // Add particle animation CSS
    if (!$('#particle-styles')) {
      const style = document.createElement('style');
      style.id = 'particle-styles';
      style.textContent = `
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        .particle {
          z-index: 1;
        }
      `;
      document.head.appendChild(style);
    }
  },

  setupCounterAnimations() {
    const counters = $$('.stat-number, .cta-number');
    
    const animateCounter = (element) => {
      const target = parseInt(element.textContent.replace(/\D/g, '')) || 0;
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        
        const suffix = element.textContent.replace(/\d/g, '');
        element.textContent = Math.floor(current) + suffix;
      }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          animateCounter(entry.target);
        }
      });
    });

    counters.forEach(counter => observer.observe(counter));
  }
};

/* ===== DISCORD & SOCIAL INTEGRATION ===== */
const Social = {
  init() {
    this.setupDiscordIntegration();
    this.setupSocialButtons();
  },

  setupDiscordIntegration() {
    // Discord server widget (if available)
    this.loadDiscordWidget();
    
    // Setup Discord user redirects
    window.redirectToDiscordUser = (username) => {
      // Create Discord user profile URL
      const discordUrl = `https://discord.com/users/${username}`;
      
      // Show confirmation dialog
      const confirmed = confirm(`Open Discord profile for ${username}?\n\nThis will redirect you to Discord.`);
      
      if (confirmed) {
        window.open(discordUrl, '_blank');
      }
    };

    // Setup main Discord server redirect
    window.redirectToDiscord = () => {
      const confirmed = confirm('Join BLACKFLAME NOVA Discord Server?\n\nThis will redirect you to Discord.');
      
      if (confirmed) {
        window.open(CONFIG.DISCORD_INVITE, '_blank');
      }
    };
  },

  loadDiscordWidget() {
    // Add Discord widget if server ID is available
    const widgetContainer = $('#discord-widget');
    if (widgetContainer) {
      // Replace 'YOUR_SERVER_ID' with actual Discord server ID
      const serverId = 'YOUR_SERVER_ID';
      const widgetUrl = `https://discord.com/widget?id=${serverId}&theme=dark`;
      
      const iframe = document.createElement('iframe');
      iframe.src = widgetUrl;
      iframe.width = '350';
      iframe.height = '500';
      iframe.allowtransparency = 'true';
      iframe.frameborder = '0';
      iframe.sandbox = 'allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts';
      
      widgetContainer.appendChild(iframe);
    }
  },

  setupSocialButtons() {
    // Add click tracking for social buttons
    $$('.social-btn, .discord-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const platform = btn.textContent.toLowerCase();
        console.log(`Social click: ${platform}`);
        
        // Add click animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          btn.style.transform = '';
        }, 150);
      });
    });
  }
};

/* ===== MINECRAFT SERVER FEATURES ===== */
const Minecraft = {
  init() {
    this.setupServerStatus();
    this.setupCopyButtons();
    this.setupServerPing();
  },

  setupServerStatus() {
    const statusIndicator = $('.status-dot');
    if (statusIndicator) {
      // Simulate server status check
      this.checkServerStatus();
      
      // Check status every 5 minutes
      setInterval(() => {
        this.checkServerStatus();
      }, 300000);
    }
  },

  async checkServerStatus() {
    try {
      // Simulate server ping (replace with actual server ping API)
      const isOnline = Math.random() > 0.2; // 80% chance online
      
      const statusDot = $('.status-dot');
      const statusText = $('.status-text');
      
      if (statusDot && statusText) {
        if (isOnline) {
          statusDot.className = 'status-dot online';
          statusText.textContent = 'SERVER IS ONLINE!';
          statusText.style.color = '#22c55e';
        } else {
          statusDot.className = 'status-dot offline';
          statusText.textContent = 'SERVER IS OFFLINE';
          statusText.style.color = '#ef4444';
        }
      }
    } catch (error) {
      console.log('Server status check failed:', error);
    }
  },

  setupCopyButtons() {
    window.copyToClipboard = async (elementId) => {
      const element = $(`#${elementId}`);
      if (!element) return;
      
      const text = element.textContent;
      
      try {
        await navigator.clipboard.writeText(text);
        
        // Show success feedback
        const btn = element.parentNode.querySelector('.copy-btn');
        if (btn) {
          const originalText = btn.textContent;
          btn.textContent = '✅ Copied!';
          btn.style.background = '#22c55e';
          
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
          }, 2000);
        }
        
        // Show toast notification
        this.showToast('Server IP copied to clipboard!', 'success');
        
      } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        this.showToast('Server IP copied to clipboard!', 'success');
      }
    };
  },

  setupServerPing() {
    // Add server ping display (simulated)
    const serverInfo = $('.server-info-content');
    if (serverInfo && window.location.pathname.includes('minecraft')) {
      const pingElement = document.createElement('div');
      pingElement.className = 'server-ping';
      pingElement.innerHTML = `
        <div style="text-align: center; margin-top: 1rem; padding: 1rem; background: rgba(52, 152, 219, 0.1); border-radius: 8px;">
          <span style="color: var(--accent-blue); font-family: var(--font-pixel);">
            🏓 Server Ping: <span id="ping-value">...</span>ms
          </span>
        </div>
      `;
      
      serverInfo.appendChild(pingElement);
      
      // Simulate ping updates
      this.updatePing();
      setInterval(() => this.updatePing(), 10000);
    }
  },

  updatePing() {
    const pingValue = $('#ping-value');
    if (pingValue) {
      // Simulate realistic ping values
      const ping = Math.floor(Math.random() * 100) + 20;
      pingValue.textContent = ping;
      
      // Color code ping
      if (ping < 50) {
        pingValue.style.color = '#22c55e'; // Green
      } else if (ping < 100) {
        pingValue.style.color = '#eab308'; // Yellow
      } else {
        pingValue.style.color = '#ef4444'; // Red
      }
    }
  },

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === 'success' ? '#22c55e' : '#3498db'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      font-family: var(--font-pixel);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
    
    // Add toast animations
    if (!$('#toast-styles')) {
      const style = document.createElement('style');
      style.id = 'toast-styles';
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }
};

/* ===== VOICE CHAT FEATURES ===== */
const VoiceChat = {
  init() {
    this.setupEventSchedule();
    this.setupVoiceChannelStatus();
  },

  setupEventSchedule() {
    if (!window.location.pathname.includes('voice-chat')) return;
    
    // Highlight current day's events
    const today = new Date().getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[today];
    
    $$('.schedule-card').forEach(card => {
      const dayElement = card.querySelector('.schedule-day');
      if (dayElement && dayElement.textContent === currentDay) {
        card.style.border = '2px solid #22c55e';
        card.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.3)';
        
        // Add "Today" badge
        const badge = document.createElement('div');
        badge.textContent = 'TODAY';
        badge.style.cssText = `
          position: absolute;
          top: -10px;
          right: -10px;
          background: #22c55e;
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: bold;
          font-family: var(--font-pixel);
        `;
        card.style.position = 'relative';
        card.appendChild(badge);
      }
    });
  },

  setupVoiceChannelStatus() {
    // Simulate voice channel activity
    $$('.channel-info').forEach(info => {
      const capacity = info.querySelector('.channel-capacity');
      if (capacity) {
        const maxUsers = parseInt(capacity.textContent.match(/\d+/)[0]);
        const currentUsers = Math.floor(Math.random() * maxUsers);
        
        const statusElement = document.createElement('div');
        statusElement.style.cssText = `
          margin-top: 0.5rem;
          color: ${currentUsers > maxUsers * 0.7 ? '#ef4444' : '#22c55e'};
          font-size: 0.8rem;
          font-family: var(--font-pixel);
        `;
        statusElement.textContent = `🔊 ${currentUsers}/${maxUsers} users online`;
        
        info.appendChild(statusElement);
      }
    });
  }
};

/* ===== ACCESSIBILITY FEATURES ===== */
const Accessibility = {
  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupScreenReaderSupport();
    this.setupReducedMotion();
  },

  setupKeyboardNavigation() {
    // Add keyboard navigation for interactive elements
    $$('.card, .team-card, .stat-card, .social-card').forEach((el, index) => {
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const link = el.querySelector('a') || el.querySelector('.btn');
          if (link) {
            link.click();
          }
        }
      });
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K for Discord
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        window.redirectToDiscord();
      }
      
      // Ctrl/Cmd + M for Minecraft
      if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault();
        window.location.href = 'minecraft.html';
      }
    });
  },

  setupFocusManagement() {
    // Improve focus visibility
    const style = document.createElement('style');
    style.textContent = `
      *:focus {
        outline: 3px solid var(--accent-blue) !important;
        outline-offset: 2px !important;
      }
      .nav-link:focus,
      .btn:focus {
        outline: 3px solid var(--accent-blue) !important;
        outline-offset: 2px !important;
      }
    `;
    document.head.appendChild(style);
  },

  setupScreenReaderSupport() {
    // Add ARIA labels where needed
    $$('.card').forEach(card => {
      const title = card.querySelector('h3');
      if (title) {
        card.setAttribute('aria-label', `${title.textContent} - Click to learn more`);
      }
    });

    // Add skip navigation
    const skipNav = document.createElement('a');
    skipNav.href = '#main-content';
    skipNav.textContent = 'Skip to main content';
    skipNav.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--accent-blue);
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10001;
      transition: top 0.3s;
      font-family: var(--font-pixel);
    `;
    
    skipNav.addEventListener('focus', () => {
      skipNav.style.top = '6px';
    });
    
    skipNav.addEventListener('blur', () => {
      skipNav.style.top = '-40px';
    });
    
    document.body.insertBefore(skipNav, document.body.firstChild);
  },

  setupReducedMotion() {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `;
      document.head.appendChild(style);
    }
  }
};

/* ===== PERFORMANCE OPTIMIZATION ===== */
const Performance = {
  init() {
    this.setupLazyLoading();
    this.optimizeImages();
    this.setupServiceWorker();
  },

  setupLazyLoading() {
    // Lazy load images if any exist
    const images = $$('img[data-src]');
    
    if ('IntersectionObserver' in window && images.length > 0) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
  },

  optimizeImages() {
    // Add loading="lazy" to images
    $$('img').forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
    });
  },

  setupServiceWorker() {
    // Register service worker for offline functionality
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }
};

/* ===== MAIN APPLICATION ===== */
const BlackflameNova = {
  init() {
    try {
      // Initialize all modules
      Navigation.init();
      Animations.init();
      Social.init();
      Minecraft.init();
      VoiceChat.init();
      Accessibility.init();
      Performance.init();
      
      // Add loaded class to body
      document.body.classList.add('loaded');
      
      // Show welcome message in console
      console.log(`
        ⚡ BLACKFLAME NOVA ⚡
        Website loaded successfully!
        
        🎮 Minecraft IP: ${CONFIG.MINECRAFT_IP}
        📱 Bedrock: ${CONFIG.BEDROCK_IP}:${CONFIG.BEDROCK_PORT}
        
        Created by Ahsan 🎨 | Owned by Tannej 👑
        Made in Pakistan 🇵🇰
      `);
      
    } catch (error) {
      console.error('Error initializing BLACKFLAME NOVA:', error);
    }
  }
};

/* ===== UTILITY FUNCTIONS ===== */

// Smooth scroll to top
window.scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Print current page
window.printPage = () => {
  window.print();
};

// Share current page
window.sharePage = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: 'Check out BLACKFLAME NOVA Discord Server!',
        url: window.location.href
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  } else {
    try {
      await navigator.clipboard.writeText(window.location.href);
      Minecraft.prototype.showToast('URL copied to clipboard!', 'success');
    } catch (error) {
      console.log('Could not copy URL');
    }
  }
};

// Get server info
window.getServerInfo = () => {
  return {
    minecraft: {
      java: CONFIG.MINECRAFT_IP,
      bedrock: {
        ip: CONFIG.BEDROCK_IP,
        port: CONFIG.BEDROCK_PORT
      }
    },
    discord: CONFIG.DISCORD_INVITE,
    team: {
      creator: 'Ahsan (purple.prime)',
      owner: 'Tannej (unknown001010)'
    }
  };
};

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.keyCode);
  
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    // Easter egg activated!
    document.body.style.animation = 'rainbow 2s infinite';
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
      document.body.style.animation = '';
      style.remove();
    }, 10000);
    
    console.log('🌈 BLACKFLAME NOVA RAINBOW MODE ACTIVATED! 🌈');
  }
});

/* ===== INITIALIZATION ===== */
document.addEventListener('DOMContentLoaded', () => {
  BlackflameNova.init();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.title = '💤 Come back to BLACKFLAME NOVA!';
  } else {
    // Restore original title
    const pageTitles = {
      'index': 'Top❶𝐁𝐋𝐀𝐂𝐊𝐅𝐋𝐀𝐌𝐄 𝐍𝐎𝐕𝐀 - Discord Server',
      'minecraft': 'Minecraft Server - BLACKFLAME NOVA',
      'voice-chat': 'Voice Chat Events - BLACKFLAME NOVA',
      'social-media': 'Social Media & Team - BLACKFLAME NOVA'
    };
    
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    document.title = pageTitles[currentPage] || 'BLACKFLAME NOVA';
  }
});

// Export for external use
window.BlackflameNova = {
  Navigation,
  Animations,
  Social,
  Minecraft,
  VoiceChat,
  Accessibility,
  Performance,
  CONFIG
};

console.log('⚡ BLACKFLAME NOVA JavaScript loaded successfully! ⚡');