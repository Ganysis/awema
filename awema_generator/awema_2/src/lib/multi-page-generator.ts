import { TemplateData } from './template'
import type { TemplateSelection } from './template-randomizer'
import { generateUltraProTemplate, getRandomUltraProTemplate, isUltraProTemplateImplemented } from './templates/ultra-pro-index'
import { ElementorProGenerator } from './blocks/elementor-pro-system'
import { ElementorProRenderer } from './blocks/elementor-pro-renderer'
import { UltraContentGenerator } from './content/ultra-content-generator'
import { UltraPerformanceOptimizer } from './performance/ultra-performance-optimizer'

export interface SiteStructure {
  pages: Array<{
    filename: string
    title: string
    content: string
    type: 'home' | 'service' | 'contact' | 'legal' | 'local-seo'
    serviceId?: string
    city?: string
  }>
  navigation: NavigationItem[]
}

export interface NavigationItem {
  label: string
  href: string
  children?: NavigationItem[]
}

// Génère la structure complète du site avec templates sélectionnés
export function generateSiteStructure(
  data: TemplateData, 
  templateSelection?: TemplateSelection
): SiteStructure {
  const pages = []
  const navigation = generateNavigation(data)
  
  // Page d'accueil avec template sélectionné
  pages.push({
    filename: 'index.html',
    title: `${data.companyName} - ${data.trade} ${data.city}`,
    content: generateHomePage(data, navigation),
    type: 'home' as const
  })
  
  // Pages de services
  data.services.forEach(service => {
    pages.push({
      filename: `service-${service.id}.html`,
      title: `${service.name} - ${data.companyName}`,
      content: generateServicePage(data, service),
      type: 'service' as const,
      serviceId: service.id
    })
  })
  
  // Page contact
  pages.push({
    filename: 'contact.html',
    title: `Contact - ${data.companyName}`,
    content: generateContactPage(data),
    type: 'contact' as const
  })
  
  // Page mentions légales
  pages.push({
    filename: 'mentions-legales.html',
    title: `Mentions Légales - ${data.companyName}`,
    content: generateLegalPage(data),
    type: 'legal' as const
  })
  
  // Pages SEO locales pour chaque ville et service
  data.serviceCities.forEach(city => {
    data.services.forEach(service => {
      pages.push({
        filename: `${service.id}-${city.toLowerCase().replace(/\s+/g, '-')}.html`,
        title: `${service.name} ${city} - ${data.companyName}`,
        content: generateLocalSeoPage(data, service, city),
        type: 'local-seo' as const,
        serviceId: service.id,
        city
      })
    })
  })
  
  return { pages, navigation }
}

// Génère la navigation du site
function generateNavigation(data: TemplateData): NavigationItem[] {
  const navigation: NavigationItem[] = [
    { label: 'Accueil', href: 'index.html' },
    {
      label: 'Services',
      href: '#',
      children: data.services.map(service => ({
        label: service.name,
        href: `service-${service.id}.html`
      }))
    },
    { label: 'Contact', href: 'contact.html' }
  ]
  
  return navigation
}

// Génère le CSS commun à toutes les pages
export function generateCommonCSS(data: TemplateData): string {
  return `
    :root {
        --primary-color: ${data.primaryColor};
        --secondary-color: ${data.secondaryColor};
        --text-dark: #1f2937;
        --text-light: #6b7280;
        --bg-light: #f9fafb;
        --white: #ffffff;
        --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        --border-radius: 8px;
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: var(--text-dark);
        background: var(--white);
    }
    
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
    }
    
    @media (min-width: 768px) {
        .container {
            padding: 0 2rem;
        }
    }
    
    /* Navigation moderne avec hamburger */
    .header {
        background: var(--white);
        box-shadow: var(--shadow);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        backdrop-filter: blur(10px);
    }
    
    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
    }
    
    .logo {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--primary-color);
        text-decoration: none;
        letter-spacing: -0.025em;
    }
    
    /* Menu desktop */
    .nav-menu {
        display: flex;
        list-style: none;
        gap: 2rem;
        align-items: center;
    }
    
    .nav-item {
        position: relative;
    }
    
    .nav-link {
        text-decoration: none;
        color: var(--text-dark);
        font-weight: 500;
        padding: 0.75rem 1rem;
        border-radius: var(--border-radius);
        transition: all 0.3s ease;
        position: relative;
    }
    
    .nav-link:hover {
        color: var(--primary-color);
        background: var(--bg-light);
        transform: translateY(-1px);
    }
    
    .nav-link.active {
        color: var(--primary-color);
        background: var(--bg-light);
    }
    
    /* Dropdown amélioré */
    .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        background: var(--white);
        box-shadow: var(--shadow-lg);
        border-radius: var(--border-radius);
        padding: 0.5rem 0;
        min-width: 220px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        border: 1px solid rgba(0,0,0,0.05);
    }
    
    .nav-item:hover .dropdown {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .dropdown-link {
        display: block;
        padding: 0.75rem 1rem;
        text-decoration: none;
        color: var(--text-dark);
        transition: all 0.3s ease;
        font-size: 0.95rem;
    }
    
    .dropdown-link:hover {
        background: var(--bg-light);
        color: var(--primary-color);
        padding-left: 1.25rem;
    }
    
    /* Menu hamburger */
    .mobile-menu-btn {
        display: none;
        flex-direction: column;
        gap: 4px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        z-index: 1001;
    }
    
    .hamburger-line {
        width: 25px;
        height: 3px;
        background: var(--text-dark);
        border-radius: 2px;
        transition: all 0.3s ease;
    }
    
    .mobile-menu-btn.active .hamburger-line:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
    }
    
    .mobile-menu-btn.active .hamburger-line:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active .hamburger-line:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
    }
    
    /* Menu mobile */
    .mobile-menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: var(--white);
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        z-index: 1000;
        padding-top: 80px;
        overflow-y: auto;
    }
    
    .mobile-menu.active {
        transform: translateX(0);
    }
    
    .mobile-nav-item {
        border-bottom: 1px solid var(--bg-light);
    }
    
    .mobile-nav-link {
        display: block;
        padding: 1rem;
        text-decoration: none;
        color: var(--text-dark);
        font-weight: 500;
        font-size: 1.1rem;
        transition: all 0.3s ease;
    }
    
    .mobile-nav-link:hover {
        background: var(--bg-light);
        color: var(--primary-color);
        padding-left: 1.5rem;
    }
    
    .mobile-dropdown {
        background: var(--bg-light);
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }
    
    .mobile-dropdown.active {
        max-height: 500px;
    }
    
    .mobile-dropdown-link {
        display: block;
        padding: 0.75rem 2rem;
        text-decoration: none;
        color: var(--text-light);
        font-size: 0.95rem;
        transition: all 0.3s ease;
    }
    
    .mobile-dropdown-link:hover {
        color: var(--primary-color);
        background: var(--white);
    }
    
    .mobile-contact {
        padding: 2rem 1rem;
        border-top: 2px solid var(--bg-light);
        margin-top: 2rem;
    }
    
    .header-contact {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .contact-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-dark);
        text-decoration: none;
        font-weight: 500;
        padding: 0.5rem;
        border-radius: var(--border-radius);
        transition: all 0.3s ease;
    }
    
    .contact-item:hover {
        color: var(--primary-color);
        background: var(--bg-light);
    }
    
    /* Boutons améliorés */
    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.875rem 1.75rem;
        background: var(--primary-color);
        color: var(--white);
        text-decoration: none;
        border-radius: var(--border-radius);
        font-weight: 600;
        font-size: 0.95rem;
        transition: all 0.3s ease;
        border: none;
        cursor: pointer;
        box-shadow: var(--shadow);
        letter-spacing: 0.025em;
    }
    
    .btn:hover {
        background: var(--secondary-color);
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }
    
    .btn-secondary {
        background: transparent;
        color: var(--primary-color);
        border: 2px solid var(--primary-color);
        box-shadow: none;
    }
    
    .btn-secondary:hover {
        background: var(--primary-color);
        color: var(--white);
        transform: translateY(-2px);
        box-shadow: var(--shadow);
    }
    
    /* Sections communes */
    .page-header {
        background: linear-gradient(135deg, var(--primary-color)15, var(--bg-light));
        padding: 8rem 0 4rem;
        text-align: center;
        position: relative;
        overflow: hidden;
    }
    
    .page-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,0,0,0.03)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>') repeat;
        opacity: 0.5;
    }
    
    .page-header > * {
        position: relative;
        z-index: 1;
    }
    
    .page-header h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        font-weight: 800;
        color: var(--primary-color);
        margin-bottom: 1rem;
        letter-spacing: -0.025em;
    }
    
    .page-header p {
        font-size: 1.2rem;
        color: var(--text-light);
        max-width: 600px;
        margin: 0 auto;
        font-weight: 400;
    }
    
    .section {
        padding: 4rem 0;
    }
    
    .section-title {
        text-align: center;
        font-size: clamp(2rem, 4vw, 2.5rem);
        color: var(--primary-color);
        margin-bottom: 3rem;
        font-weight: 700;
        letter-spacing: -0.025em;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
        .nav-menu,
        .header-contact {
            display: none;
        }
        
        .mobile-menu-btn {
            display: flex;
        }
        
        .page-header {
            padding: 6rem 0 3rem;
        }
        
        .section {
            padding: 3rem 0;
        }
        
        .btn {
            width: 100%;
            justify-content: center;
        }
    }
    
    @media (min-width: 768px) {
        .mobile-menu,
        .mobile-menu-btn {
            display: none;
        }
    }
    
    /* Animations */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .animate-on-scroll {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .animate-slide-right {
        animation: slideInRight 0.6s ease forwards;
    }
  `
}

// Génère les breadcrumbs
function generateBreadcrumbs(items: Array<{label: string, href?: string}>): string {
  return `
    <div class="breadcrumbs">
        <div class="container">
            <nav style="padding: 1rem 0; font-size: 0.9rem;">
                ${items.map((item, index) => `
                    ${index > 0 ? '<span style="margin: 0 0.5rem; color: var(--text-light);">></span>' : ''}
                    ${item.href ? 
                        `<a href="${item.href}" style="color: var(--primary-color); text-decoration: none;">${item.label}</a>` : 
                        `<span style="color: var(--text-light);">${item.label}</span>`
                    }
                `).join('')}
            </nav>
        </div>
    </div>
  `
}

// Génère le header commun
export function generateHeader(data: TemplateData, navigation: NavigationItem[]): string {
  return `
    <header class="header">
        <div class="container">
            <div class="header-content">
                <a href="index.html" class="logo">
                    ${data.logoUrl ? `<img src="${data.logoUrl}" alt="${data.companyName}" style="height: 40px;">` : data.companyName}
                </a>
                
                <!-- Menu Desktop -->
                <nav>
                    <ul class="nav-menu">
                        ${navigation.map(item => `
                            <li class="nav-item">
                                <a href="${item.href}" class="nav-link">${item.label}</a>
                                ${item.children ? `
                                    <div class="dropdown">
                                        ${item.children.map(child => `
                                            <a href="${child.href}" class="dropdown-link">${child.label}</a>
                                        `).join('')}
                                    </div>
                                ` : ''}
                            </li>
                        `).join('')}
                    </ul>
                </nav>
                
                <!-- Contact Desktop -->
                <div class="header-contact">
                    <a href="tel:${data.phone}" class="contact-item">
                        <span>📞</span>
                        <span>${data.phone}</span>
                    </a>
                    <a href="contact.html" class="btn">Devis Gratuit</a>
                </div>

                <!-- Bouton Menu Mobile -->
                <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>
            </div>
        </div>

        <!-- Menu Mobile -->
        <div class="mobile-menu" id="mobileMenu">
            <div class="container">
                ${navigation.map(item => `
                    <div class="mobile-nav-item">
                        <a href="${item.href}" class="mobile-nav-link" ${item.children ? `onclick="toggleMobileDropdown(event, '${item.label}')"` : ''}>${item.label}</a>
                        ${item.children ? `
                            <div class="mobile-dropdown" id="mobile-dropdown-${item.label}">
                                ${item.children.map(child => `
                                    <a href="${child.href}" class="mobile-dropdown-link">${child.label}</a>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
                
                <div class="mobile-contact">
                    <a href="tel:${data.phone}" class="btn" style="width: 100%; margin-bottom: 1rem;">
                        📞 ${data.phone}
                    </a>
                    <a href="contact.html" class="btn btn-secondary" style="width: 100%;">
                        Devis Gratuit
                    </a>
                </div>
            </div>
        </div>
    </header>

    <script>
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            
            mobileMenu.classList.toggle('active');
            menuBtn.classList.toggle('active');
            
            // Empêche le scroll du body quand le menu est ouvert
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        }

        function toggleMobileDropdown(event, label) {
            if (window.innerWidth <= 768) {
                event.preventDefault();
                const dropdown = document.getElementById('mobile-dropdown-' + label);
                dropdown.classList.toggle('active');
            }
        }

        // Ferme le menu mobile si on clique à l'extérieur
        document.addEventListener('click', function(event) {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            
            if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
                mobileMenu.classList.remove('active');
                menuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Ferme le menu mobile au redimensionnement
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                const mobileMenu = document.getElementById('mobileMenu');
                const menuBtn = document.querySelector('.mobile-menu-btn');
                
                mobileMenu.classList.remove('active');
                menuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    </script>
  `
}

// Génère le footer commun
export function generateFooter(data: TemplateData): string {
  return `
    <footer class="footer">
        <div class="container">
            <div class="footer-main">
                <div class="footer-grid">
                    <!-- Colonne 1: À propos -->
                    <div class="footer-column">
                        <h3 class="footer-title">${data.companyName}</h3>
                        <p class="footer-description">
                            ${data.description || `${data.trade} professionnel à ${data.city} depuis plusieurs années. 
                            Nous mettons notre expertise au service de vos projets avec sérieux et professionnalisme.`}
                        </p>
                        <div class="footer-rating">
                            <div class="stars">⭐⭐⭐⭐⭐</div>
                            <span>4.9/5 - Clients satisfaits</span>
                        </div>
                    </div>

                    <!-- Colonne 2: Services -->
                    <div class="footer-column">
                        <h4 class="footer-subtitle">Nos Services</h4>
                        <ul class="footer-list">
                            ${data.services.slice(0, 5).map(service => `
                                <li><a href="service-${service.id}.html" class="footer-link">${service.name}</a></li>
                            `).join('')}
                            ${data.services.length > 5 ? '<li><a href="index.html#services" class="footer-link">Voir tous les services</a></li>' : ''}
                        </ul>
                    </div>

                    <!-- Colonne 3: Zones d'intervention -->
                    <div class="footer-column">
                        <h4 class="footer-subtitle">Zones d'intervention</h4>
                        <ul class="footer-list">
                            ${data.serviceCities.slice(0, 6).map(city => `
                                <li><span class="footer-city">📍 ${city}</span></li>
                            `).join('')}
                            ${data.serviceCities.length > 6 ? `<li><span class="footer-more">+${data.serviceCities.length - 6} autres villes</span></li>` : ''}
                        </ul>
                    </div>

                    <!-- Colonne 4: Contact -->
                    <div class="footer-column">
                        <h4 class="footer-subtitle">Contact</h4>
                        <div class="footer-contact">
                            <div class="contact-info">
                                <div class="contact-row">
                                    <span class="contact-icon">📞</span>
                                    <a href="tel:${data.phone}" class="footer-link">${data.phone}</a>
                                </div>
                                <div class="contact-row">
                                    <span class="contact-icon">✉️</span>
                                    <a href="mailto:${data.email}" class="footer-link">${data.email}</a>
                                </div>
                                <div class="contact-row">
                                    <span class="contact-icon">📍</span>
                                    <span>${data.address}, ${data.city}</span>
                                </div>
                                ${data.openingHours ? `
                                <div class="contact-row">
                                    <span class="contact-icon">⏰</span>
                                    <span>${data.openingHours}</span>
                                </div>
                                ` : ''}
                            </div>
                            <div class="footer-cta">
                                <a href="contact.html" class="footer-btn">Devis Gratuit</a>
                                ${data.emergencyAvailable ? '<span class="emergency-badge">🚨 Urgences 24h/7j</span>' : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="footer-bottom-content">
                    <div class="footer-legal">
                        <p>&copy; ${new Date().getFullYear()} ${data.companyName}. Tous droits réservés.</p>
                        <div class="footer-links">
                            <a href="mentions-legales.html" class="footer-link">Mentions légales</a>
                            <a href="contact.html" class="footer-link">Contact</a>
                        </div>
                    </div>
                    <div class="footer-social">
                        <span>Suivez-nous :</span>
                        <div class="social-links">
                            <a href="#" class="social-link" title="Facebook">📘</a>
                            <a href="#" class="social-link" title="Instagram">📷</a>
                            <a href="https://www.google.com/search?q=${encodeURIComponent(data.companyName + ' ' + data.city)}" target="_blank" class="social-link" title="Google">🔍</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style>
            .footer {
                background: linear-gradient(135deg, var(--text-dark) 0%, #111827 100%);
                color: var(--white);
                padding: 0;
                margin-top: 4rem;
            }

            .footer-main {
                padding: 4rem 0 2rem;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }

            .footer-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 2rem;
            }

            @media (min-width: 768px) {
                .footer-grid {
                    grid-template-columns: 1fr 1fr;
                }
            }

            @media (min-width: 1024px) {
                .footer-grid {
                    grid-template-columns: 2fr 1fr 1fr 1.5fr;
                }
            }

            .footer-column {
                padding: 0;
            }

            .footer-title {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--white);
                margin-bottom: 1rem;
                letter-spacing: -0.025em;
            }

            .footer-subtitle {
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--white);
                margin-bottom: 1rem;
                position: relative;
                padding-bottom: 0.5rem;
            }

            .footer-subtitle::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 2rem;
                height: 2px;
                background: var(--primary-color);
                border-radius: 1px;
            }

            .footer-description {
                color: rgba(255,255,255,0.8);
                line-height: 1.6;
                margin-bottom: 1.5rem;
                font-size: 0.95rem;
            }

            .footer-rating {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-top: 1rem;
            }

            .stars {
                color: #fbbf24;
                font-size: 0.9rem;
            }

            .footer-rating span {
                color: rgba(255,255,255,0.7);
                font-size: 0.85rem;
            }

            .footer-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .footer-list li {
                margin-bottom: 0.5rem;
            }

            .footer-link {
                color: rgba(255,255,255,0.8);
                text-decoration: none;
                transition: all 0.3s ease;
                font-size: 0.9rem;
                padding: 0.25rem 0;
                display: inline-block;
            }

            .footer-link:hover {
                color: var(--primary-color);
                transform: translateX(4px);
            }

            .footer-city {
                color: rgba(255,255,255,0.7);
                font-size: 0.85rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .footer-more {
                color: rgba(255,255,255,0.6);
                font-size: 0.8rem;
                font-style: italic;
            }

            .footer-contact {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }

            .contact-info {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }

            .contact-row {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                font-size: 0.9rem;
            }

            .contact-icon {
                font-size: 1rem;
                width: 1.5rem;
                flex-shrink: 0;
            }

            .footer-cta {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .footer-btn {
                background: var(--primary-color);
                color: var(--white);
                padding: 0.75rem 1.5rem;
                border-radius: var(--border-radius);
                text-decoration: none;
                font-weight: 600;
                text-align: center;
                transition: all 0.3s ease;
                box-shadow: var(--shadow);
            }

            .footer-btn:hover {
                background: var(--secondary-color);
                transform: translateY(-2px);
                box-shadow: var(--shadow-lg);
            }

            .emergency-badge {
                background: linear-gradient(135deg, #ef4444, #dc2626);
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 600;
                text-align: center;
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.8; }
            }

            .footer-bottom {
                padding: 2rem 0;
                background: rgba(0,0,0,0.3);
            }

            .footer-bottom-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 1rem;
            }

            .footer-legal {
                display: flex;
                align-items: center;
                gap: 1rem;
                flex-wrap: wrap;
            }

            .footer-legal p {
                color: rgba(255,255,255,0.7);
                font-size: 0.85rem;
                margin: 0;
            }

            .footer-links {
                display: flex;
                gap: 1rem;
            }

            .footer-social {
                display: flex;
                align-items: center;
                gap: 1rem;
                color: rgba(255,255,255,0.7);
                font-size: 0.85rem;
            }

            .social-links {
                display: flex;
                gap: 0.5rem;
            }

            .social-link {
                color: rgba(255,255,255,0.6);
                text-decoration: none;
                font-size: 1.2rem;
                transition: all 0.3s ease;
                padding: 0.25rem;
                border-radius: 4px;
            }

            .social-link:hover {
                color: var(--primary-color);
                transform: translateY(-2px);
            }

            @media (max-width: 768px) {
                .footer-main {
                    padding: 3rem 0 1.5rem;
                }

                .footer-grid {
                    gap: 2.5rem;
                }

                .footer-bottom-content {
                    flex-direction: column;
                    text-align: center;
                    gap: 1.5rem;
                }

                .footer-legal {
                    flex-direction: column;
                    gap: 1rem;
                }

                .contact-row {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.5rem;
                }

                .contact-row .footer-link,
                .contact-row span {
                    margin-left: 2rem;
                }
            }
        </style>
    </footer>
  `
}

// Page d'accueil avec template ultra-professionnel Elementor Pro
function generateHomePage(data: TemplateData, navigation: NavigationItem[]): string {
  try {
    // Utiliser le nouveau système ultra-professionnel Elementor Pro
    const elementorGenerator = new ElementorProGenerator(data)
    
    // Déterminer le theme selon le métier
    const tradeToTheme: Record<string, 'electricien' | 'plombier' | 'chauffagiste' | 'multi'> = {
      'Électricien': 'electricien',
      'Plombier': 'plombier',
      'Chauffagiste': 'chauffagiste',
      'Artisan': 'multi'
    }
    
    const theme = tradeToTheme[data.trade] || 'electricien'
    
    // Générer le contenu ultra-détaillé
    const ultraContent = UltraContentGenerator.generateUltraDetailedContent(data, 'home')
    
    // Générer la structure complète avec le système Elementor Pro
    const pageData = elementorGenerator.generateUltraProPage('home', {
      includeAdvancedSections: true,
      seoLevel: 'ultra'
    })
    
    // Optimiser pour les performances (95+ PageSpeed)
    const performanceOptimized = UltraPerformanceOptimizer.optimizeForPerformance(
      ElementorProRenderer.renderCompletePage(
        pageData.sections, 
        pageData.metadata, 
        pageData.assets, 
        theme,
        data,
        'home'
      ),
      pageData.assets
    )
    
    console.log(`✅ Generated ultra-professional Elementor Pro homepage for ${data.trade}`)
    return performanceOptimized.optimizedHTML
    
  } catch (error) {
    console.error('❌ Error generating Elementor Pro template, falling back to basic:', error)
    // Fallback vers le template basique en cas d'erreur
    return generateBasicHomePage(data, navigation)
  }
}

// Template basique de fallback
function generateBasicHomePage(data: TemplateData, navigation: NavigationItem[]): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - ${data.trade} ${data.city}</title>
    <meta name="description" content="${data.description}. ${data.trade} professionnel à ${data.city}. Contactez ${data.ownerName} au ${data.phone}">
    <meta name="keywords" content="${data.keywords ? data.keywords.join(', ') : ''}">
    
    <!-- SEO -->
    <meta property="og:title" content="${data.companyName} - ${data.trade} ${data.city}">
    <meta property="og:description" content="${data.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://${data.domain}">
    
    <!-- Police Poppins -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <style>
        ${generateCommonCSS(data)}
        
        /* Styles spécifiques à la page d'accueil */
        .hero {
            background: linear-gradient(135deg, var(--primary-color)15, var(--bg-light));
            padding: 8rem 0 4rem;
            text-align: center;
        }
        
        .hero h1 {
            font-size: clamp(2rem, 5vw, 3.5rem);
            font-weight: 800;
            color: var(--primary-color);
            margin-bottom: 1rem;
        }
        
        .hero p {
            font-size: 1.2rem;
            color: var(--text-light);
            margin-bottom: 2rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .hero-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .service-card {
            background: var(--white);
            padding: 2rem;
            border-radius: 12px;
            box-shadow: var(--shadow);
            text-align: center;
            transition: transform 0.3s;
        }
        
        .service-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }
        
        .service-card h3 {
            color: var(--primary-color);
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }
        
        .service-card p {
            color: var(--text-light);
            margin-bottom: 1rem;
        }
        
        .service-price {
            font-weight: 600;
            color: var(--secondary-color);
            font-size: 1.1rem;
            margin-bottom: 1rem;
        }
        
        .zone-intervention {
            background: var(--bg-light);
            padding: 4rem 0;
        }
        
        .zones-list {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
        }
        
        .zone-tag {
            background: var(--primary-color);
            color: var(--white);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: 500;
        }
    </style>
</head>
<body>
    ${generateHeader(data, navigation)}
    
    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h1>${data.companyName}</h1>
            <p>${data.description}</p>
            <div class="hero-actions">
                <a href="tel:${data.phone}" class="btn">📞 Appeler maintenant</a>
                <a href="contact.html" class="btn btn-secondary">Demander un devis</a>
            </div>
            ${data.emergencyAvailable ? '<p style="margin-top: 1rem; font-weight: bold; color: var(--primary-color);">🚨 Service d\'urgence 24h/7j</p>' : ''}
        </div>
    </section>
    
    <!-- Services Section -->
    <section class="section" id="services">
        <div class="container">
            <h2 class="section-title">Nos Services</h2>
            <div class="services-grid">
                ${data.services.map(service => `
                    <div class="service-card">
                        <h3>${service.name}</h3>
                        <p>${service.description}</p>
                        ${service.price ? `<div class="service-price">${service.price}</div>` : ''}
                        <a href="service-${service.id}.html" class="btn">En savoir plus</a>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    
    <!-- Zone d'intervention -->
    <section class="zone-intervention">
        <div class="container">
            <h2 class="section-title">Zones d'intervention</h2>
            <p style="text-align: center; margin-bottom: 2rem; color: var(--text-light);">
                Nous intervenons dans les villes suivantes :
            </p>
            <div class="zones-list">
                ${data.serviceCities.map(city => `
                    <span class="zone-tag">${city}</span>
                `).join('')}
            </div>
        </div>
    </section>
    
    ${generateFooter(data)}
    
    <script>
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    </script>
</body>
</html>`
}

// Page de service individuelle avec système Elementor Pro
function generateServicePage(data: TemplateData, service: TemplateData['services'][0]): string {
  const navigation = generateNavigation(data)
  
  try {
    // Utiliser le système Elementor Pro pour les pages services
    const elementorGenerator = new ElementorProGenerator(data)
    const theme = data.trade.toLowerCase().includes('électricien') ? 'electricien' :
                  data.trade.toLowerCase().includes('plombier') ? 'plombier' : 'chauffagiste'
    
    // Générer la page service avec le système ultra-professionnel
    const pageData = elementorGenerator.generateUltraProPage('services', {
      includeAdvancedSections: true,
      seoLevel: 'advanced'
    })
    
    // Optimiser pour les performances
    const performanceOptimized = UltraPerformanceOptimizer.optimizeForPerformance(
      ElementorProRenderer.renderCompletePage(
        pageData.sections,
        pageData.metadata,
        pageData.assets,
        theme as any,
        data,
        'services'
      ),
      pageData.assets
    )
    
    console.log(`✅ Generated ultra-professional service page for ${service.name}`)
    return performanceOptimized.optimizedHTML
    
  } catch (error) {
    console.error('❌ Error generating Elementor Pro service page, falling back to basic:', error)
    // Fallback vers le template basique
    return generateBasicServicePage(data, service, navigation)
  }
}

// Template basique de service (fallback)
function generateBasicServicePage(data: TemplateData, service: TemplateData['services'][0], navigation: NavigationItem[]): string {
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${service.name} - ${data.companyName}</title>
    <meta name="description" content="${service.detailedDescription || service.description}. Service de ${data.trade} à ${data.city} par ${data.companyName}">
    <meta name="keywords" content="${service.name}, ${data.trade}, ${data.city}, ${data.companyName}">
    
    <!-- Police Poppins -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <style>
        ${generateCommonCSS(data)}
        
        .service-hero {
            background: linear-gradient(135deg, var(--primary-color)15, var(--bg-light));
            padding: 8rem 0 4rem;
        }
        
        .service-content {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 3rem;
            align-items: start;
        }
        
        .service-images {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin: 2rem 0;
        }
        
        .service-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
        }
        
        .service-sidebar {
            background: var(--bg-light);
            padding: 2rem;
            border-radius: 12px;
            position: sticky;
            top: 100px;
        }
        
        .cta-box {
            background: var(--primary-color);
            color: var(--white);
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .related-services {
            margin-top: 2rem;
        }
        
        .related-service {
            display: block;
            padding: 1rem;
            background: var(--white);
            margin-bottom: 1rem;
            border-radius: 8px;
            text-decoration: none;
            color: var(--text-dark);
            transition: all 0.3s;
        }
        
        .related-service:hover {
            background: var(--primary-color);
            color: var(--white);
        }
    </style>
</head>
<body>
    ${generateHeader(data, navigation)}
    
    ${generateBreadcrumbs([
      {label: 'Accueil', href: 'index.html'},
      {label: 'Services', href: 'index.html#services'},
      {label: service.name}
    ])}
    
    <section class="service-hero">
        <div class="container">
            <div class="page-header">
                <h1>${service.name}</h1>
                <p>${service.description}</p>
            </div>
        </div>
    </section>
    
    <section class="section">
        <div class="container">
            <div class="service-content">
                <div class="service-main">
                    <div class="service-description">
                        <h2>Description détaillée</h2>
                        <p>${service.detailedDescription || service.description}</p>
                        
                        ${service.images && service.images.length > 0 ? `
                            <div class="service-images">
                                ${service.images.map((image: string) => `
                                    <img src="${image}" alt="${service.name}" class="service-image">
                                `).join('')}
                            </div>
                        ` : ''}
                        
                        <h3>Pourquoi choisir ${data.companyName} ?</h3>
                        <ul>
                            <li>Professionnel qualifié et expérimenté</li>
                            <li>Devis gratuit et sans engagement</li>
                            <li>Intervention rapide</li>
                            <li>Garantie qualité</li>
                            ${data.emergencyAvailable ? '<li>Service d\'urgence 24h/7j</li>' : ''}
                        </ul>
                        
                        <h3>Zones d'intervention pour ${service.name}</h3>
                        <p>Nous proposons le service ${service.name} dans les villes suivantes :</p>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0;">
                            ${data.serviceCities.map(city => `
                                <a href="${service.id}-${city.toLowerCase().replace(/\\s+/g, '-')}.html" 
                                   style="background: var(--primary-color); color: white; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.9rem; text-decoration: none; transition: all 0.3s;"
                                   onmouseover="this.style.background='var(--secondary-color)'"
                                   onmouseout="this.style.background='var(--primary-color)'">
                                   ${service.name} ${city}
                                </a>
                            `).join('')}
                        </div>
                        <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-light);">
                            💡 Cliquez sur une ville pour voir notre page dédiée au ${service.name} dans cette zone
                        </p>
                    </div>
                </div>
                
                <div class="service-sidebar">
                    <div class="cta-box">
                        <h3>Besoin de ce service ?</h3>
                        <p>Contactez-nous pour un devis gratuit</p>
                        ${service.price ? `<div style="font-size: 1.2rem; font-weight: bold; margin: 1rem 0;">${service.price}</div>` : ''}
                        <a href="tel:${data.phone}" class="btn" style="background: var(--white); color: var(--primary-color); width: 100%; margin-bottom: 1rem;">📞 ${data.phone}</a>
                        <a href="contact.html" class="btn" style="background: var(--secondary-color); width: 100%;">Demander un devis</a>
                    </div>
                    
                    <div class="related-services">
                        <h4>Nos autres services</h4>
                        ${data.services.filter(s => s.id !== service.id).map(s => `
                            <a href="service-${s.id}.html" class="related-service">
                                <strong>${s.name}</strong><br>
                                <small>${s.description}</small>
                            </a>
                        `).join('')}
                    </div>
                    
                    <div class="local-services" style="margin-top: 2rem;">
                        <h4>${service.name} dans vos villes</h4>
                        <p style="font-size: 0.9rem; color: var(--text-light); margin-bottom: 1rem;">
                            Découvrez notre service ${service.name} près de chez vous
                        </p>
                        ${data.serviceCities.slice(0, 5).map(city => `
                            <a href="${service.id}-${city.toLowerCase().replace(/\s+/g, '-')}.html" 
                               style="display: block; padding: 0.8rem; background: var(--bg-light); margin-bottom: 0.5rem; border-radius: 6px; text-decoration: none; color: var(--text-dark); font-size: 0.9rem; transition: all 0.3s;"
                               onmouseover="this.style.background='var(--primary-color)'; this.style.color='white'"
                               onmouseout="this.style.background='var(--bg-light)'; this.style.color='var(--text-dark)'">
                                📍 ${service.name} ${city}
                            </a>
                        `).join('')}
                        ${data.serviceCities.length > 5 ? `
                            <p style="font-size: 0.8rem; color: var(--text-light); text-align: center; margin-top: 1rem;">
                                Et ${data.serviceCities.length - 5} autres villes...
                            </p>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    ${generateFooter(data)}
</body>
</html>`
}

// Page contact avec système Elementor Pro
function generateContactPage(data: TemplateData): string {
  const navigation = generateNavigation(data)
  
  try {
    // Utiliser le système Elementor Pro pour la page contact
    const elementorGenerator = new ElementorProGenerator(data)
    const theme = data.trade.toLowerCase().includes('électricien') ? 'electricien' :
                  data.trade.toLowerCase().includes('plombier') ? 'plombier' : 'chauffagiste'
    
    // Générer la page contact avec le système ultra-professionnel
    const pageData = elementorGenerator.generateUltraProPage('contact', {
      includeAdvancedSections: true,
      seoLevel: 'advanced'
    })
    
    // Optimiser pour les performances
    const performanceOptimized = UltraPerformanceOptimizer.optimizeForPerformance(
      ElementorProRenderer.renderCompletePage(
        pageData.sections,
        pageData.metadata,
        pageData.assets,
        theme as any,
        data,
        'contact'
      ),
      pageData.assets
    )
    
    console.log(`✅ Generated ultra-professional contact page`)
    return performanceOptimized.optimizedHTML
    
  } catch (error) {
    console.error('❌ Error generating Elementor Pro contact page, falling back to basic:', error)
    // Fallback vers le template basique
    return generateBasicContactPage(data, navigation)
  }
}

// Template basique de contact (fallback)
function generateBasicContactPage(data: TemplateData, navigation: NavigationItem[]): string {
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact - ${data.companyName}</title>
    <meta name="description" content="Contactez ${data.companyName} pour vos besoins en ${data.trade}. Devis gratuit au ${data.phone}">
    
    <!-- Police Poppins -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <style>
        ${generateCommonCSS(data)}
        
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
        }
        
        .contact-form {
            background: var(--bg-light);
            padding: 2rem;
            border-radius: 12px;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: var(--text-dark);
        }
        
        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 1rem;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 1rem;
            transition: border-color 0.3s;
        }
        
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
            outline: none;
            border-color: var(--primary-color);
        }
        
        .contact-info {
            space-y: 2rem;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
            padding: 1rem;
            background: var(--bg-light);
            border-radius: 8px;
        }
        
        .contact-icon {
            background: var(--primary-color);
            color: var(--white);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
    </style>
</head>
<body>
    ${generateHeader(data, navigation)}
    
    ${generateBreadcrumbs([
      {label: 'Accueil', href: 'index.html'},
      {label: 'Contact'}
    ])}
    
    <section class="page-header">
        <div class="container">
            <h1>Contactez-nous</h1>
            <p>Demandez votre devis gratuit et sans engagement</p>
        </div>
    </section>
    
    <section class="section">
        <div class="container">
            <div class="contact-grid">
                <div class="contact-form">
                    <h3>Demande de devis gratuit</h3>
                    <form id="contactForm">
                        <div class="form-group">
                            <label for="name">Nom complet *</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email *</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Téléphone</label>
                            <input type="tel" id="phone" name="phone">
                        </div>
                        <div class="form-group">
                            <label for="service">Service souhaité</label>
                            <select id="service" name="service">
                                <option value="">Choisir un service</option>
                                ${data.services.map(service => `
                                    <option value="${service.name}">${service.name}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="city">Ville d'intervention</label>
                            <select id="city" name="city">
                                <option value="">Choisir une ville</option>
                                ${data.serviceCities.map(city => `
                                    <option value="${city}">${city}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="message">Description de votre projet *</label>
                            <textarea id="message" name="message" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="btn" style="width: 100%;">Envoyer ma demande</button>
                    </form>
                </div>
                
                <div class="contact-info">
                    <h3>Informations de contact</h3>
                    
                    <div class="contact-item">
                        <div class="contact-icon">📞</div>
                        <div>
                            <strong>Téléphone</strong><br>
                            <a href="tel:${data.phone}" style="color: inherit;">${data.phone}</a>
                        </div>
                    </div>
                    
                    <div class="contact-item">
                        <div class="contact-icon">✉️</div>
                        <div>
                            <strong>Email</strong><br>
                            <a href="mailto:${data.email}" style="color: inherit;">${data.email}</a>
                        </div>
                    </div>
                    
                    <div class="contact-item">
                        <div class="contact-icon">📍</div>
                        <div>
                            <strong>Adresse</strong><br>
                            ${data.address}<br>
                            ${data.city}
                        </div>
                    </div>
                    
                    ${data.openingHours ? `
                    <div class="contact-item">
                        <div class="contact-icon">⏰</div>
                        <div>
                            <strong>Horaires</strong><br>
                            ${data.openingHours}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="contact-item" style="background: var(--primary-color); color: var(--white);">
                        <div class="contact-icon" style="background: var(--white); color: var(--primary-color);">🏢</div>
                        <div>
                            <strong>Zones d'intervention</strong><br>
                            ${data.serviceCities.join(', ')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    ${generateFooter(data)}
    
    <script>
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                service: formData.get('service'),
                city: formData.get('city'),
                message: formData.get('message'),
                company: '${data.companyName}',
                contactEmail: '${data.email}'
            };
            
            const subject = encodeURIComponent('Demande de devis - ' + data.name);
            const body = encodeURIComponent(
                'Nom: ' + data.name + '\\n' +
                'Email: ' + data.email + '\\n' +
                'Téléphone: ' + (data.phone || 'Non renseigné') + '\\n' +
                'Service: ' + (data.service || 'Non spécifié') + '\\n' +
                'Ville: ' + (data.city || 'Non spécifiée') + '\\n\\n' +
                'Message: ' + data.message
            );
            
            window.location.href = 'mailto:${data.email}?subject=' + subject + '&body=' + body;
            alert('Merci pour votre demande ! Votre client email va s\'ouvrir pour finaliser l\'envoi.');
            this.reset();
        });
    </script>
</body>
</html>`
}

// Page mentions légales
function generateLegalPage(data: TemplateData): string {
  const navigation = generateNavigation(data)
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mentions Légales - ${data.companyName}</title>
    <meta name="description" content="Mentions légales de ${data.companyName}">
    <meta name="robots" content="noindex, nofollow">
    
    <!-- Police Poppins -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <style>
        ${generateCommonCSS(data)}
        
        .legal-content {
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.8;
        }
        
        .legal-content h2 {
            color: var(--primary-color);
            margin: 2rem 0 1rem 0;
            border-bottom: 2px solid var(--primary-color);
            padding-bottom: 0.5rem;
        }
        
        .legal-content h3 {
            color: var(--secondary-color);
            margin: 1.5rem 0 1rem 0;
        }
        
        .legal-content p {
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    ${generateHeader(data, navigation)}
    
    ${generateBreadcrumbs([
      {label: 'Accueil', href: 'index.html'},
      {label: 'Mentions Légales'}
    ])}
    
    <section class="page-header">
        <div class="container">
            <h1>Mentions Légales</h1>
            <p>Informations légales concernant ${data.companyName}</p>
        </div>
    </section>
    
    <section class="section">
        <div class="container">
            <div class="legal-content">
                <h2>1. Informations légales</h2>
                <p><strong>Raison sociale :</strong> ${data.companyName}</p>
                <p><strong>Forme juridique :</strong> ${data.legalInfo.legalForm || 'À compléter'}</p>
                ${data.legalInfo.siret ? `<p><strong>SIRET :</strong> ${data.legalInfo.siret}</p>` : ''}
                ${data.legalInfo.rcs ? `<p><strong>RCS :</strong> ${data.legalInfo.rcs}</p>` : ''}
                ${data.legalInfo.vatNumber ? `<p><strong>N° TVA intracommunautaire :</strong> ${data.legalInfo.vatNumber}</p>` : ''}
                ${data.legalInfo.capital ? `<p><strong>Capital social :</strong> ${data.legalInfo.capital}</p>` : ''}
                
                <h3>Siège social</h3>
                <p>
                    ${data.legalInfo.address}<br>
                    ${data.legalInfo.postalCode} ${data.legalInfo.city}
                </p>
                
                <h3>Contact</h3>
                <p>
                    <strong>Téléphone :</strong> <a href="tel:${data.phone}">${data.phone}</a><br>
                    <strong>Email :</strong> <a href="mailto:${data.email}">${data.email}</a>
                </p>
                
                <h2>2. Hébergement du site</h2>
                <p>
                    Ce site est hébergé par :<br>
                    <strong>O2Switch</strong><br>
                    Chem. des Pardiaux, 63000 Clermont-Ferrand<br>
                    Téléphone : 04 44 44 60 40<br>
                    Site web : <a href="https://www.o2switch.fr" target="_blank">www.o2switch.fr</a>
                </p>
                
                <h2>3. Propriété intellectuelle</h2>
                <p>
                    L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
                    Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
                
                <h2>4. Données personnelles</h2>
                <p>
                    Les informations recueillies sur ce site sont enregistrées dans un fichier informatisé par ${data.companyName} pour la gestion des demandes de devis et de contact.
                </p>
                <p>
                    Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d'accès aux données vous concernant et les faire rectifier en contactant :
                </p>
                <p>
                    ${data.companyName}<br>
                    ${data.legalInfo.address}<br>
                    ${data.legalInfo.postalCode} ${data.legalInfo.city}<br>
                    Email : <a href="mailto:${data.email}">${data.email}</a>
                </p>
                
                <h2>5. Cookies</h2>
                <p>
                    Ce site n'utilise pas de cookies de tracking. Seuls les cookies techniques nécessaires au bon fonctionnement du site peuvent être utilisés.
                </p>
                
                <h2>6. Responsabilité</h2>
                <p>
                    Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à différentes périodes de l'année, 
                    mais peut toutefois contenir des inexactitudes ou des omissions.
                </p>
                <p>
                    Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email, 
                    à l'adresse <a href="mailto:${data.email}">${data.email}</a>, en décrivant le problème de la façon la plus précise possible.
                </p>
                
                <h2>7. Liens hypertextes</h2>
                <p>
                    Les liens hypertextes mis en place dans le cadre du présent site web en direction d'autres ressources présentes sur le réseau Internet 
                    ne sauraient engager la responsabilité de ${data.companyName}.
                </p>
                
                <h2>8. Droit applicable</h2>
                <p>
                    Tant le présent site que les modalités et conditions de son utilisation sont régis par le droit français, 
                    quel que soit le lieu d'utilisation. En cas de contestation éventuelle, et après l'échec de toute tentative de recherche d'une solution amiable, 
                    les tribunaux français seront seuls compétents pour connaître de ce litige.
                </p>
                
                <p style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e5e7eb; font-style: italic; color: var(--text-light);">
                    Dernière mise à jour : ${new Date().toLocaleDateString('fr-FR')}
                </p>
            </div>
        </div>
    </section>
    
    ${generateFooter(data)}
</body>
</html>`
}

// Page SEO locale
function generateLocalSeoPage(data: TemplateData, service: TemplateData['services'][0], city: string): string {
  const navigation = generateNavigation(data)
  const variations = [
    "spécialisé", "expert", "professionnel", "qualifié"
  ]
  const variation = variations[Math.floor(Math.random() * variations.length)]
  
  const localizedContent = {
    title: `${service.name} ${city} - ${variation} en ${data.trade}`,
    description: `${variation} en ${service.name} à ${city}. ${data.companyName} intervient rapidement pour tous vos besoins en ${data.trade}.`,
    h1: `${service.name} à ${city}`,
    subtitle: `${data.companyName}, votre ${variation} en ${service.name} à ${city} et ses environs`
  }
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${localizedContent.title}</title>
    <meta name="description" content="${localizedContent.description}">
    <meta name="keywords" content="${service.name}, ${city}, ${data.trade}, ${data.companyName}, ${variation}">
    
    <!-- Schema.org local -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "${service.name}",
      "provider": {
        "@type": "LocalBusiness",
        "name": "${data.companyName}",
        "telephone": "${data.phone}",
        "email": "${data.email}",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "${city}",
          "addressCountry": "FR"
        }
      },
      "areaServed": "${city}",
      "description": "${localizedContent.description}"
    }
    </script>
    
    <!-- Police Poppins -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <style>
        ${generateCommonCSS(data)}
        
        .local-hero {
            background: linear-gradient(135deg, var(--primary-color)15, var(--bg-light));
            padding: 8rem 0 4rem;
        }
        
        .local-content {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 3rem;
        }
        
        .local-advantages {
            background: var(--bg-light);
            padding: 2rem;
            border-radius: 12px;
            margin: 2rem 0;
        }
        
        .advantages-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .advantage-item {
            background: var(--white);
            padding: 1rem;
            border-radius: 8px;
            border-left: 4px solid var(--primary-color);
        }
        
        .local-sidebar {
            background: var(--bg-light);
            padding: 2rem;
            border-radius: 12px;
            position: sticky;
            top: 100px;
        }
        
        .urgence-box {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            padding: 1.5rem;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 2rem;
        }
    </style>
</head>
<body>
    ${generateHeader(data, navigation)}
    
    ${generateBreadcrumbs([
      {label: 'Accueil', href: 'index.html'},
      {label: 'Services', href: 'index.html#services'},
      {label: service.name, href: `service-${service.id}.html`},
      {label: city}
    ])}
    
    <section class="local-hero">
        <div class="container">
            <div class="page-header">
                <h1>${localizedContent.h1}</h1>
                <p>${localizedContent.subtitle}</p>
                <div style="margin-top: 2rem;">
                    <a href="tel:${data.phone}" class="btn">📞 Appeler ${data.phone}</a>
                    <a href="contact.html" class="btn btn-secondary">Devis gratuit</a>
                </div>
            </div>
        </div>
    </section>
    
    <section class="section">
        <div class="container">
            <div class="local-content">
                <div class="local-main">
                    <h2>${service.name} à ${city} : Notre expertise à votre service</h2>
                    <p>
                        Vous recherchez un ${variation} en ${service.name} à ${city} ? ${data.companyName} met son expertise 
                        à votre disposition pour tous vos besoins en ${data.trade}. Nos équipes interviennent rapidement 
                        sur ${city} et ses environs pour vous garantir un service de qualité.
                    </p>
                    
                    <h3>Pourquoi choisir ${data.companyName} à ${city} ?</h3>
                    <div class="local-advantages">
                        <div class="advantages-list">
                            <div class="advantage-item">
                                <h4>🏆 Expertise locale</h4>
                                <p>Parfaite connaissance de ${city} et de ses spécificités</p>
                            </div>
                            <div class="advantage-item">
                                <h4>⚡ Intervention rapide</h4>
                                <p>Déplacement rapide sur ${city} et alentours</p>
                            </div>
                            <div class="advantage-item">
                                <h4>💰 Devis gratuit</h4>
                                <p>Estimation gratuite et sans engagement à ${city}</p>
                            </div>
                            <div class="advantage-item">
                                <h4>✅ Qualité garantie</h4>
                                <p>Travaux réalisés selon les normes en vigueur</p>
                            </div>
                        </div>
                    </div>
                    
                    <h3>Notre service ${service.name} à ${city}</h3>
                    <p>${service.detailedDescription || service.description}</p>
                    
                    <p>
                        ${data.companyName} intervient sur ${city} pour offrir un service de ${service.name} adapté à vos besoins. 
                        Notre équipe de professionnels ${data.trade.toLowerCase()} est formée aux dernières techniques et 
                        utilise des équipements de pointe pour garantir la qualité de nos interventions.
                    </p>
                    
                    <h3>Zone d'intervention autour de ${city}</h3>
                    <p>
                        En plus de ${city}, nous intervenons également dans les communes suivantes :
                    </p>
                    <ul style="columns: 2; margin: 1rem 0;">
                        ${data.serviceCities.filter(c => c !== city).map(c => `<li>${c}</li>`).join('')}
                    </ul>
                    
                    ${service.price ? `
                        <h3>Tarifs pour ${service.name} à ${city}</h3>
                        <p>Le tarif pour ${service.name} à ${city} commence à partir de <strong>${service.price}</strong>.</p>
                        <p>
                            Nous vous proposons un devis personnalisé et gratuit pour votre projet à ${city}. 
                            N'hésitez pas à nous contacter pour obtenir une estimation précise.
                        </p>
                    ` : ''}
                </div>
                
                <div class="local-sidebar">
                    ${data.emergencyAvailable ? `
                        <div class="urgence-box">
                            <h3>🚨 Urgence ${city}</h3>
                            <p>Service d'urgence 24h/7j sur ${city}</p>
                            <a href="tel:${data.phone}" class="btn" style="background: white; color: #ef4444; margin-top: 1rem;">
                                Appeler maintenant
                            </a>
                        </div>
                    ` : ''}
                    
                    <h4>Contact ${city}</h4>
                    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;">
                        <p><strong>📞 Téléphone :</strong><br><a href="tel:${data.phone}">${data.phone}</a></p>
                        <p><strong>✉️ Email :</strong><br><a href="mailto:${data.email}">${data.email}</a></p>
                        ${data.openingHours ? `<p><strong>⏰ Horaires :</strong><br>${data.openingHours}</p>` : ''}
                    </div>
                    
                    <a href="contact.html" class="btn" style="width: 100%; margin-bottom: 1rem;">Devis gratuit ${city}</a>
                    <a href="service-${service.id}.html" class="btn btn-secondary" style="width: 100%;">Plus d'infos sur ${service.name}</a>
                    
                    <h4 style="margin-top: 2rem;">Autres services à ${city}</h4>
                    ${data.services.filter(s => s.id !== service.id).slice(0, 3).map(s => `
                        <a href="${s.id}-${city.toLowerCase().replace(/\s+/g, '-')}.html" 
                           style="display: block; padding: 0.8rem; background: white; margin-bottom: 0.5rem; border-radius: 6px; text-decoration: none; color: var(--text-dark); font-size: 0.9rem;">
                            ${s.name} ${city}
                        </a>
                    `).join('')}
                    
                    <h4 style="margin-top: 2rem;">${service.name} dans d'autres villes</h4>
                    ${data.serviceCities.filter(c => c !== city).slice(0, 4).map(c => `
                        <a href="${service.id}-${c.toLowerCase().replace(/\s+/g, '-')}.html" 
                           style="display: block; padding: 0.8rem; background: white; margin-bottom: 0.5rem; border-radius: 6px; text-decoration: none; color: var(--text-dark); font-size: 0.9rem;">
                            📍 ${service.name} ${c}
                        </a>
                    `).join('')}
                    
                    <div style="background: var(--bg-light); padding: 1rem; border-radius: 6px; margin-top: 2rem; text-align: center;">
                        <p style="font-size: 0.9rem; margin-bottom: 1rem;">🏠 Retour aux pages principales</p>
                        <a href="index.html" class="btn" style="width: 100%; margin-bottom: 0.5rem; font-size: 0.9rem;">Accueil</a>
                        <a href="service-${service.id}.html" class="btn btn-secondary" style="width: 100%; font-size: 0.9rem;">Page ${service.name}</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    ${generateFooter(data)}
</body>
</html>`
}