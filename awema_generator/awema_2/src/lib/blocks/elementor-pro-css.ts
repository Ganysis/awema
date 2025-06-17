// CSS Ultra-Moderne niveau Elementor Pro avec Grid, Flexbox et animations GSAP
export class ElementorProCSS {
  
  static generateModernCSS(theme: 'electricien' | 'plombier' | 'chauffagiste' | 'multi' = 'electricien'): string {
    const colors = this.getThemeColors(theme)
    
    return `
/* ===== ELEMENTOR PRO CSS ULTRA-MODERNE ===== */

/* Variables CSS modernes */
:root {
  /* Couleurs theme */
  --primary: ${colors.primary};
  --primary-dark: ${colors.primaryDark};
  --primary-light: ${colors.primaryLight};
  --secondary: ${colors.secondary};
  --accent: ${colors.accent};
  
  /* Couleurs système */
  --white: #ffffff;
  --black: #000000;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
  
  /* Typographie */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-secondary: 'Playfair Display', Georgia, serif;
  
  /* Tailles de police */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;
  --text-7xl: 4.5rem;
  
  /* Espacements */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;
  
  /* Rayons de bordure */
  --radius-sm: 0.125rem;
  --radius: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-full: 9999px;
  
  /* Ombres */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  
  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Z-index */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal: 1040;
  --z-popover: 1050;
  --z-tooltip: 1060;
  
  /* Conteneurs */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
}

/* Reset moderne et optimisé */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}

body {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--gray-800);
  background-color: var(--white);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ===== NAVIGATION MEGA MENU ===== */
.elementor-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-fixed);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--gray-200);
  transition: all var(--transition-normal);
}

.elementor-nav.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: var(--shadow-lg);
}

.nav-container {
  max-width: var(--container-2xl);
  margin: 0 auto;
  padding: 0 var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.nav-logo img {
  height: 50px;
  width: auto;
  transition: transform var(--transition-normal);
}

.nav-logo:hover img {
  transform: scale(1.05);
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: var(--space-8);
}

.nav-list {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  list-style: none;
}

.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-2);
  color: var(--gray-700);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-normal);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--primary);
  transition: all var(--transition-normal);
  transform: translateX(-50%);
}

.nav-link:hover {
  color: var(--primary);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-arrow {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid currentColor;
  transition: transform var(--transition-normal);
}

.nav-dropdown:hover .nav-arrow {
  transform: rotate(180deg);
}

/* MEGA MENU */
.mega-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  background: var(--white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-2xl);
  padding: var(--space-8);
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-normal);
  z-index: var(--z-dropdown);
}

.nav-dropdown:hover .mega-menu {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.mega-menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
}

.mega-menu-column h3 {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--gray-800);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-2);
  border-bottom: 2px solid var(--primary-light);
}

.mega-menu-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  color: var(--gray-600);
  text-decoration: none;
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
}

.mega-menu-link:hover {
  background: var(--primary-light);
  color: var(--primary-dark);
  transform: translateX(4px);
}

.service-name {
  font-weight: 500;
  color: var(--gray-800);
}

.service-desc {
  font-size: var(--text-sm);
  color: var(--gray-500);
}

.emergency-box {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: var(--white);
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  text-align: center;
}

.emergency-phone {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: var(--white);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-full);
  text-decoration: none;
  font-weight: 600;
  margin-top: var(--space-4);
  transition: all var(--transition-normal);
}

.emergency-phone:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* NAV CTA */
.nav-cta {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.nav-phone {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  transition: color var(--transition-normal);
}

.nav-phone:hover {
  color: var(--primary-dark);
}

.nav-button {
  background: var(--primary);
  color: var(--white);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-full);
  text-decoration: none;
  font-weight: 600;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-md);
}

.nav-button:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* NAV TOGGLE (MOBILE) */
.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-2);
}

.nav-toggle-line {
  width: 25px;
  height: 3px;
  background: var(--gray-800);
  border-radius: 2px;
  transition: all var(--transition-normal);
}

.nav-toggle.active .nav-toggle-line:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.nav-toggle.active .nav-toggle-line:nth-child(2) {
  opacity: 0;
}

.nav-toggle.active .nav-toggle-line:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* ===== HERO ADVANCED ===== */
.hero-advanced {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--gray-900);
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.8) 0%, rgba(59, 130, 246, 0.6) 100%);
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--space-6);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

.hero-text h1 {
  font-size: clamp(var(--text-4xl), 6vw, var(--text-7xl));
  font-weight: 800;
  color: var(--white);
  line-height: 1.1;
  margin-bottom: var(--space-6);
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.hero-text .subtitle {
  font-size: var(--text-xl);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: var(--space-4);
  font-weight: 500;
}

.hero-text .description {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: var(--space-8);
  line-height: 1.7;
}

.hero-buttons {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.hero-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-full);
  text-decoration: none;
  font-weight: 600;
  font-size: var(--text-lg);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-lg);
}

.hero-button.primary {
  background: var(--white);
  color: var(--primary);
}

.hero-button.primary:hover {
  background: var(--gray-100);
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.hero-button.outline {
  background: rgba(255, 255, 255, 0.1);
  color: var(--white);
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.hero-button.outline:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.hero-image {
  position: relative;
}

.hero-image img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-2xl);
  transition: transform var(--transition-slow);
}

.hero-image:hover img {
  transform: scale(1.05) rotate(1deg);
}

/* ===== SERVICES PREMIUM ===== */
.services-premium {
  padding: var(--space-24) var(--space-6);
  background: linear-gradient(135deg, var(--gray-50) 0%, var(--gray-100) 100%);
}

.services-container {
  max-width: var(--container-xl);
  margin: 0 auto;
}

.services-header {
  text-align: center;
  margin-bottom: var(--space-16);
}

.services-header h2 {
  font-size: clamp(var(--text-3xl), 4vw, var(--text-5xl));
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--space-4);
}

.services-header .subtitle {
  font-size: var(--text-xl);
  color: var(--gray-600);
  margin-bottom: var(--space-6);
}

.services-header .description {
  font-size: var(--text-lg);
  color: var(--gray-700);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-8);
}

.service-card {
  background: var(--white);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
  border: 1px solid var(--gray-200);
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-2xl);
  border-color: var(--primary-light);
}

.service-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border-radius: var(--radius-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-2xl);
  color: var(--white);
  margin-bottom: var(--space-6);
  box-shadow: var(--shadow-lg);
}

.service-name {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--gray-800);
  margin-bottom: var(--space-4);
}

.service-description {
  color: var(--gray-600);
  margin-bottom: var(--space-6);
  line-height: 1.7;
}

.service-features {
  list-style: none;
  margin-bottom: var(--space-6);
}

.service-features li {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--gray-700);
  margin-bottom: var(--space-2);
}

.service-features li::before {
  content: '✓';
  color: var(--primary);
  font-weight: bold;
  background: var(--primary-light);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-sm);
}

.service-price {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--primary);
  margin-bottom: var(--space-6);
}

.service-cta {
  background: var(--primary);
  color: var(--white);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  text-decoration: none;
  font-weight: 600;
  transition: all var(--transition-normal);
  display: inline-block;
}

.service-cta:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

/* ===== ANIMATIONS GSAP ===== */
.gsap-fade-in {
  opacity: 0;
  transform: translateY(30px);
}

.gsap-slide-left {
  opacity: 0;
  transform: translateX(-50px);
}

.gsap-slide-right {
  opacity: 0;
  transform: translateX(50px);
}

.gsap-scale-up {
  opacity: 0;
  transform: scale(0.8);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .nav-menu {
    position: fixed;
    top: 80px;
    left: -100%;
    width: 100%;
    height: calc(100vh - 80px);
    background: var(--white);
    flex-direction: column;
    justify-content: flex-start;
    padding: var(--space-8);
    transition: left var(--transition-normal);
    z-index: var(--z-fixed);
  }
  
  .nav-menu.active {
    left: 0;
  }
  
  .nav-list {
    flex-direction: column;
    width: 100%;
    gap: var(--space-4);
  }
  
  .nav-item {
    width: 100%;
  }
  
  .nav-link {
    padding: var(--space-4);
    border-radius: var(--radius-lg);
    width: 100%;
    justify-content: space-between;
  }
  
  .nav-toggle {
    display: flex;
  }
  
  .mega-menu {
    position: static;
    transform: none;
    width: 100%;
    box-shadow: none;
    border: 1px solid var(--gray-200);
    margin-top: var(--space-4);
  }
  
  .mega-menu-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
  
  .hero-content {
    grid-template-columns: 1fr;
    gap: var(--space-8);
    text-align: center;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .nav-container {
    padding: 0 var(--space-4);
  }
  
  .services-premium {
    padding: var(--space-16) var(--space-4);
  }
  
  .service-card {
    padding: var(--space-6);
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-button {
    width: 100%;
    justify-content: center;
    max-width: 300px;
  }
}

/* ===== UTILITAIRES ===== */
.container {
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.font-extrabold { font-weight: 800; }

.hidden { display: none; }
.block { display: block; }
.inline-block { display: inline-block; }
.flex { display: flex; }
.grid { display: grid; }

.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }

.mt-auto { margin-top: auto; }
.mb-auto { margin-bottom: auto; }
.mx-auto { margin-left: auto; margin-right: auto; }

.w-full { width: 100%; }
.h-full { height: 100%; }

.rounded { border-radius: var(--radius); }
.rounded-lg { border-radius: var(--radius-lg); }
.rounded-xl { border-radius: var(--radius-xl); }
.rounded-2xl { border-radius: var(--radius-2xl); }
.rounded-full { border-radius: var(--radius-full); }

.shadow { box-shadow: var(--shadow); }
.shadow-lg { box-shadow: var(--shadow-lg); }
.shadow-xl { box-shadow: var(--shadow-xl); }
.shadow-2xl { box-shadow: var(--shadow-2xl); }
`
  }

  static getThemeColors(theme: string) {
    const themes = {
      electricien: {
        primary: '#1e40af',
        primaryDark: '#1e3a8a',
        primaryLight: '#dbeafe',
        secondary: '#3b82f6',
        accent: '#fbbf24'
      },
      plombier: {
        primary: '#0ea5e9',
        primaryDark: '#0284c7',
        primaryLight: '#e0f2fe',
        secondary: '#06b6d4',
        accent: '#f97316'
      },
      chauffagiste: {
        primary: '#ea580c',
        primaryDark: '#dc2626',
        primaryLight: '#fed7aa',
        secondary: '#f97316',
        accent: '#fbbf24'
      },
      multi: {
        primary: '#7c3aed',
        primaryDark: '#6d28d9',
        primaryLight: '#ede9fe',
        secondary: '#8b5cf6',
        accent: '#f59e0b'
      }
    }
    
    return themes[theme] || themes.electricien
  }
}