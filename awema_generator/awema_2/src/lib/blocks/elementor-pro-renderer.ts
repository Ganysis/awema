// Générateur HTML ultra-professionnel niveau Elementor Pro
import { ElementorSection, PageMetadata, AssetBundle } from './elementor-pro-system'
import { ElementorProCSS } from './elementor-pro-css'
import { ElementorProJS } from './elementor-pro-js'
import { UltraSEOEngine } from '../seo/ultra-seo-engine'

export class ElementorProRenderer {
  
  static renderCompletePage(
    sections: ElementorSection[], 
    metadata: PageMetadata, 
    assets: AssetBundle,
    theme: 'electricien' | 'plombier' | 'chauffagiste' | 'multi' = 'electricien',
    companyData?: any,
    pageType: string = 'home'
  ): string {
    
    // Générer le SEO ultra-avancé si les données de l'entreprise sont disponibles
    const ultraSEO = companyData ? UltraSEOEngine.generateCompleteSEO(companyData, pageType, sections) : null
    
    return `<!DOCTYPE html>
<html lang="fr" class="no-js">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    ${ultraSEO ? ultraSEO.metaTags : `
    <!-- SEO Meta Tags Basiques -->
    <title>${metadata.title}</title>
    <meta name="description" content="${metadata.description}">
    <meta name="keywords" content="${metadata.keywords.join(', ')}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${metadata.canonical}">
    `}
    
    ${ultraSEO ? ultraSEO.openGraph : `
    <!-- Open Graph -->
    <meta property="og:type" content="${metadata.openGraph.type}">
    <meta property="og:title" content="${metadata.openGraph.title}">
    <meta property="og:description" content="${metadata.openGraph.description}">
    <meta property="og:image" content="${metadata.openGraph.image}">
    <meta property="og:url" content="${metadata.openGraph.url}">
    <meta property="og:site_name" content="${metadata.openGraph.title}">
    <meta property="og:locale" content="fr_FR">
    `}
    
    ${ultraSEO ? ultraSEO.twitterCard : `
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${metadata.openGraph.title}">
    <meta name="twitter:description" content="${metadata.openGraph.description}">
    <meta name="twitter:image" content="${metadata.openGraph.image}">
    `}
    
    ${ultraSEO ? ultraSEO.additionalSEO : `
    <!-- Favicons -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    
    <!-- DNS Prefetch -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//images.unsplash.com">
    <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
    `}
    
    <!-- Preload Critical Resources -->
    ${assets.fonts.map(font => `<link rel="preload" href="${font}" as="style" onload="this.onload=null;this.rel='stylesheet'">`).join('\\n    ')}
    <noscript>${assets.fonts.map(font => `<link rel="stylesheet" href="${font}">`).join('')}</noscript>
    
    <!-- Critical CSS Inline -->
    <style>
        ${assets.critical_css}
        
        /* Loading Spinner */
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--primary, #1e40af) 0%, var(--secondary, #3b82f6) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .loader-text {
            color: white;
            font-size: 1.5rem;
            font-weight: 600;
            opacity: 0;
            transform: translateY(20px);
        }
        
        body.loading {
            overflow: hidden;
        }
        
        .no-js .page-loader {
            display: none;
        }
    </style>
    
    <!-- Schema.org Structured Data Ultra-Avancé -->
    ${metadata.structuredData.map(schema => `
    <script type="application/ld+json">
        ${JSON.stringify(schema, null, 2)}
    </script>`).join('')}
    
    <!-- Additional SEO Meta Tags -->
    <meta name="author" content="${metadata.author || 'Claude Code Generator'}">
    <meta name="generator" content="Claude Code - Ultra-Professional Website Generator">
    <meta name="theme-color" content="#1e40af">
    <meta name="msapplication-TileColor" content="#1e40af">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=yes">
    <meta name="geo.region" content="FR">
    <meta name="geo.placename" content="${metadata.city || 'Paris'}">
    <meta name="ICBM" content="${metadata.coordinates || '48.8566, 2.3522'}">
    <meta name="distribution" content="global">
    <meta name="rating" content="general">
    <meta name="revisit-after" content="7 days">
    
    <!-- Advanced Open Graph -->
    <meta property="og:locale:alternate" content="en_US">
    <meta property="og:updated_time" content="${new Date().toISOString()}">
    <meta property="article:author" content="${metadata.author || 'Claude Code'}">
    <meta property="article:publisher" content="${metadata.openGraph.url}">
    <meta property="article:modified_time" content="${new Date().toISOString()}">
    
    <!-- Business Schema Rich Snippets -->
    <meta property="business:contact_data:street_address" content="${metadata.address || ''}">
    <meta property="business:contact_data:locality" content="${metadata.city || 'Paris'}">
    <meta property="business:contact_data:region" content="Île-de-France">
    <meta property="business:contact_data:postal_code" content="${metadata.postalCode || '75000'}">
    <meta property="business:contact_data:country_name" content="France">
    <meta property="business:contact_data:phone_number" content="${metadata.phone || ''}">
    <meta property="business:contact_data:website" content="${metadata.openGraph.url}">
    
    <!-- Preload Critical Resources Performance -->
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" as="style">
    <link rel="preload" href="/css/critical.css" as="style">
    <link rel="modulepreload" href="/js/app.js">
    
    <!-- Resource Hints -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//images.unsplash.com">
    <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Security Headers -->
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
    <meta http-equiv="X-XSS-Protection" content="1; mode=block">
    <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
    
    <!-- Performance Hints -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Main CSS (Non-blocking) with Performance Optimization -->
    <link rel="preload" href="/css/elementor-pro-main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="/css/elementor-pro-main.css"></noscript>
    
    <!-- Performance Monitoring -->
    <script>
        // Web Vitals Tracking
        if ('performance' in window && 'PerformanceObserver' in window) {
            // Core Web Vitals Observer
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime);
                    }
                    if (entry.entryType === 'first-input') {
                        console.log('FID:', entry.processingStart - entry.startTime);
                    }
                    if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                        console.log('CLS:', entry.value);
                    }
                }
            }).observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
            
            // Performance Navigation Timing
            window.addEventListener('load', () => {
                const perfData = performance.timing;
                const networkLatency = perfData.responseEnd - perfData.fetchStart;
                const pageProcessing = perfData.loadEventStart - perfData.domLoading;
                const pageLoad = perfData.loadEventEnd - perfData.navigationStart;
                
                console.log('Network Latency:', networkLatency + 'ms');
                console.log('Page Processing:', pageProcessing + 'ms');
                console.log('Total Page Load:', pageLoad + 'ms');
                
                // Send to analytics if available
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'page_load_time', {
                        event_category: 'Performance',
                        event_label: 'Page Load Time',
                        value: Math.round(pageLoad)
                    });
                }
            });
        }
    </script>
</head>

<body class="loading elementor-pro-page ${theme}-theme">
    <!-- Page Loader -->
    <div class="page-loader">
        <div class="loader-text">Chargement...</div>
    </div>
    
    <!-- Skip Links for Accessibility -->
    <a href="#main-content" class="skip-link">Aller au contenu principal</a>
    
    <!-- Reading Progress Bar -->
    <div class="reading-progress" role="progressbar" aria-label="Progression de lecture"></div>
    
    ${this.renderAllSections(sections)}
    
    <!-- Back to Top Button -->
    <button class="back-to-top" aria-label="Retour en haut" title="Retour en haut">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18,15 12,9 6,15"></polyline>
        </svg>
    </button>
    
    <!-- GSAP and Main JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" integrity="sha512-16esztaSRplJROstbIIdwX3N97V1+pZvV33ABoG1H2OyTttBxEGkTsoIVsiP1iaTtM8b3+hu2kB6pQ4Clr5yug==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" integrity="sha512-Ic9xkERjyZ1xgJ5svx3y0u3xrvfT/uPkV99LBwe68xjy/mGtO+4eURHZBW2xW4SZbFrF1Tf090XqB+EVgXnVjw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js" integrity="sha512-LQQDtPAueBcmGXKdOBcMBPS6JEOagsWXeQPFrFw5ZQiCxMzSGHNfbeHdnisVXHNQfTI3xzSWhhtwJiyOx9lINA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    
    <!-- Inline Critical JavaScript -->
    <script>
        // Remove no-js class immediately
        document.documentElement.classList.remove('no-js');
        
        // Performance monitoring
        if ('performance' in window) {
            window.addEventListener('load', function() {
                const perfData = performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log('Page Load Time:', pageLoadTime + 'ms');
            });
        }
        
        // Critical path CSS loading
        function loadCSS(href) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        }
        
        // Load non-critical CSS after page load
        window.addEventListener('load', function() {
            loadCSS('/css/animations.css');
            loadCSS('/css/components.css');
        });
    </script>
    
    <!-- Main Application JavaScript -->
    <script>
        ${ElementorProJS.generateModernJS()}
    </script>
    
    <!-- Service Worker Registration -->
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                        console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    </script>
    
    <!-- Analytics (if needed) -->
    <!-- Google Analytics, GTM, etc. would go here -->
    
</body>
</html>`
  }

  private static renderAllSections(sections: ElementorSection[]): string {
    return sections.map(section => this.renderSection(section)).join('')
  }

  private static renderSection(section: ElementorSection): string {
    const sectionHTML = this.getSectionRenderer(section.type)(section)
    
    return `
    <!-- SECTION: ${section.type.toUpperCase()} -->
    <section 
        id="${section.id}"
        class="elementor-section ${section.type} ${section.layout} gsap-fade-in"
        data-animation="${section.animations.entrance.type}"
        data-delay="${section.animations.entrance.delay}"
        style="${this.generateSectionStyles(section)}"
        ${this.generateSectionAttributes(section)}
    >
        ${this.renderSectionBackground(section)}
        <div class="section-container">
            ${sectionHTML}
        </div>
    </section>`
  }

  private static getSectionRenderer(type: string): (section: ElementorSection) => string {
    const renderers = {
      'navigation-mega': this.renderNavigation,
      'hero-advanced': this.renderHeroAdvanced,
      'services-premium': this.renderServicesPremium,
      'about-detailed': this.renderAboutDetailed,
      'stats-animated': this.renderStatsAnimated,
      'testimonials-carousel': this.renderTestimonialsCarousel,
      'portfolio-gallery': this.renderPortfolioGallery,
      'faq-accordion': this.renderFAQAccordion,
      'blog-grid': this.renderBlogGrid,
      'partners-logos': this.renderPartnersLogos,
      'cta-multiple': this.renderMultipleCTA,
      'contact-advanced': this.renderContactAdvanced,
      'footer-mega': this.renderMegaFooter
    }
    
    return renderers[type] || (() => `<p>Section type ${type} not implemented yet</p>`)
  }

  // ===== SECTION RENDERERS =====

  private static renderNavigation = (section: ElementorSection): string => {
    return section.content.custom_html || ''
  }

  private static renderHeroAdvanced = (section: ElementorSection): string => {
    const content = section.content
    
    return `
    <div class="hero-content" id="main-content">
        <div class="hero-text">
            <h1 class="hero-title">${content.title}</h1>
            <p class="hero-subtitle subtitle">${content.subtitle}</p>
            <p class="hero-description description">${content.description}</p>
            
            <div class="hero-buttons">
                ${(content.buttons || []).map(button => `
                    <a href="${button.url}" class="hero-button ${button.style} magnetic" aria-label="${button.text}">
                        ${button.icon ? `<span class="button-icon">${button.icon}</span>` : ''}
                        ${button.text}
                    </a>
                `).join('')}
            </div>
        </div>
        
        <div class="hero-image">
            ${(content.images || []).map(image => `
                <img 
                    src="${image.src}" 
                    alt="${image.alt}"
                    title="${image.title || ''}"
                    ${image.lazy ? 'loading="lazy"' : ''}
                    sizes="${image.responsive?.sizes || '100vw'}"
                    srcset="${image.responsive?.srcset || ''}"
                    class="hero-img"
                >
            `).join('')}
        </div>
    </div>`
  }

  private static renderServicesPremium = (section: ElementorSection): string => {
    const content = section.content
    
    return `
    <div class="services-header">
        <h2 class="services-title">${content.title}</h2>
        <p class="services-subtitle subtitle">${content.subtitle}</p>
        <p class="services-description description">${content.description}</p>
    </div>
    
    <div class="services-grid">
        ${(content.items || []).map(item => `
            <div class="service-card magnetic" data-service="${item.id}">
                <div class="service-icon">${item.data.icon}</div>
                <h3 class="service-name">${item.data.name}</h3>
                <p class="service-description">${item.data.description}</p>
                
                ${item.data.features ? `
                    <ul class="service-features">
                        ${item.data.features.map((feature: string) => `<li>${feature}</li>`).join('')}
                    </ul>
                ` : ''}
                
                <div class="service-price">${item.data.price}</div>
                
                ${item.data.cta ? `
                    <a href="${item.data.cta.url}" class="service-cta">
                        ${item.data.cta.text}
                    </a>
                ` : ''}
            </div>
        `).join('')}
    </div>`
  }

  private static renderAboutDetailed = (section: ElementorSection): string => {
    const content = section.content
    
    return `
    <div class="about-content">
        <div class="about-text">
            <h2 class="about-title">${content.title}</h2>
            <p class="about-subtitle subtitle">${content.subtitle}</p>
            <p class="about-description description">${content.description}</p>
            
            <div class="about-features">
                ${(content.items || []).map(item => `
                    <div class="feature-item">
                        <div class="feature-icon">${item.data.icon}</div>
                        <div class="feature-content">
                            <h3 class="feature-title">${item.data.title}</h3>
                            <p class="feature-description">${item.data.description}</p>
                            <span class="feature-stats">${item.data.stats}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="about-images">
            ${(content.images || []).map(image => `
                <img 
                    src="${image.src}" 
                    alt="${image.alt}"
                    title="${image.title || ''}"
                    ${image.lazy ? 'loading="lazy"' : ''}
                    class="about-img"
                >
            `).join('')}
        </div>
    </div>`
  }

  private static renderStatsAnimated = (section: ElementorSection): string => {
    const content = section.content
    
    return `
    <div class="stats-content">
        <div class="stats-header">
            <h2 class="stats-title">${content.title}</h2>
            <p class="stats-subtitle subtitle">${content.subtitle}</p>
        </div>
        
        <div class="stats-grid">
            ${(content.items || []).map(item => `
                <div class="stat-item">
                    <div class="stat-icon">${item.data.icon}</div>
                    <div class="stat-number">
                        <span class="counter" data-count="${item.data.number}">${item.data.number}</span>
                        <span class="stat-suffix">${item.data.suffix || ''}</span>
                    </div>
                    <h3 class="stat-label">${item.data.label}</h3>
                    <p class="stat-description">${item.data.description}</p>
                </div>
            `).join('')}
        </div>
    </div>`
  }

  private static renderTestimonialsCarousel = (section: ElementorSection): string => {
    const content = section.content
    
    return `
    <div class="testimonials-header">
        <h2 class="testimonials-title">${content.title}</h2>
        <p class="testimonials-subtitle subtitle">${content.subtitle}</p>
        <p class="testimonials-description description">${content.description}</p>
    </div>
    
    <div class="testimonials-grid">
        ${(content.items || []).map(item => `
            <div class="testimonial-card">
                <div class="testimonial-rating">
                    ${Array(item.data.rating).fill('⭐').join('')}
                </div>
                <blockquote class="testimonial-text">"${item.data.text}"</blockquote>
                <div class="testimonial-author">
                    <img src="${item.data.image}" alt="${item.data.name}" class="author-image">
                    <div class="author-info">
                        <h4 class="author-name">${item.data.name}</h4>
                        <p class="author-location">${item.data.location}</p>
                        <p class="author-service">${item.data.service}</p>
                    </div>
                </div>
            </div>
        `).join('')}
    </div>`
  }

  private static renderPortfolioGallery = (section: ElementorSection): string => {
    const content = section.content
    
    return `
    <div class="portfolio-header">
        <h2 class="portfolio-title">${content.title}</h2>
        <p class="portfolio-subtitle subtitle">${content.subtitle}</p>
        <p class="portfolio-description description">${content.description}</p>
    </div>
    
    <div class="portfolio-grid">
        ${(content.items || []).map(item => `
            <div class="portfolio-item" data-category="${item.data.category}">
                <div class="portfolio-image">
                    <img src="${item.data.image}" alt="${item.data.title}" loading="lazy">
                    <div class="portfolio-overlay">
                        <h3 class="portfolio-title">${item.data.title}</h3>
                        <p class="portfolio-description">${item.data.description}</p>
                        <div class="portfolio-meta">
                            <span class="portfolio-location">${item.data.location}</span>
                            <span class="portfolio-date">${item.data.date}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('')}
    </div>`
  }

  private static renderFAQAccordion = (section: ElementorSection): string => {
    const content = section.content
    
    return `
    <div class="faq-header">
        <h2 class="faq-title">${content.title}</h2>
        <p class="faq-subtitle subtitle">${content.subtitle}</p>
        <p class="faq-description description">${content.description}</p>
    </div>
    
    <div class="faq-accordion">
        ${(content.items || []).map((item, index) => `
            <div class="faq-item" data-faq="${index}">
                <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${index}">
                    <span>${item.data.question}</span>
                    <svg class="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                </button>
                <div class="faq-answer" id="faq-answer-${index}">
                    <p>${item.data.answer}</p>
                </div>
            </div>
        `).join('')}
    </div>`
  }

  private static renderBlogGrid = (section: ElementorSection): string => {
    const content = section.content
    
    return `
    <div class="blog-header">
        <h2 class="blog-title">${content.title}</h2>
        <p class="blog-subtitle subtitle">${content.subtitle}</p>
        <p class="blog-description description">${content.description}</p>
    </div>
    
    <div class="blog-grid">
        ${(content.items || []).map(item => `
            <article class="blog-card">
                <div class="blog-image">
                    <img src="${item.data.image}" alt="${item.data.title}" loading="lazy">
                    <div class="blog-category">${item.data.category}</div>
                </div>
                <div class="blog-content">
                    <h3 class="blog-title">${item.data.title}</h3>
                    <p class="blog-excerpt">${item.data.excerpt}</p>
                    <div class="blog-meta">
                        <span class="blog-author">${item.data.author}</span>
                        <span class="blog-date">${item.data.date}</span>
                        <span class="blog-read-time">${item.data.readTime}</span>
                    </div>
                </div>
            </article>
        `).join('')}
    </div>`
  }

  private static renderPartnersLogos = (section: ElementorSection): string => {
    const content = section.content
    
    return `
    <div class="partners-header">
        <h3 class="partners-title">${content.title}</h3>
        <p class="partners-subtitle subtitle">${content.subtitle}</p>
    </div>
    
    <div class="partners-grid">
        ${(content.items || []).map(item => `
            <div class="partner-item">
                <img 
                    src="${item.data.logo}" 
                    alt="${item.data.name}"
                    title="${item.data.description}"
                    loading="lazy"
                    class="partner-logo"
                >
            </div>
        `).join('')}
    </div>`
  }

  private static renderMultipleCTA = (section: ElementorSection): string => {
    const content = section.content
    
    return `
    <div class="cta-content">
        <div class="cta-header">
            <h2 class="cta-title">${content.title}</h2>
            <p class="cta-subtitle subtitle">${content.subtitle}</p>
        </div>
        
        <div class="cta-grid">
            ${(content.items || []).map(item => `
                <div class="cta-card">
                    <div class="cta-icon">${item.data.icon}</div>
                    <h3 class="cta-card-title">${item.data.title}</h3>
                    <p class="cta-card-description">${item.data.description}</p>
                    <a href="${item.data.button.url}" class="cta-button ${item.data.button.style}">
                        ${item.data.button.text}
                    </a>
                </div>
            `).join('')}
        </div>
    </div>`
  }

  private static renderContactAdvanced = (section: ElementorSection): string => {
    const content = section.content
    
    return `
    <div class="contact-content">
        <div class="contact-info">
            <h2 class="contact-title">${content.title}</h2>
            <p class="contact-subtitle subtitle">${content.subtitle}</p>
            <p class="contact-description description">${content.description}</p>
            
            <div class="contact-methods">
                ${(content.items || []).map(item => `
                    <div class="contact-item">
                        <div class="contact-icon">${item.data.icon}</div>
                        <div class="contact-details">
                            <h3 class="contact-method-title">${item.data.title}</h3>
                            <p class="contact-value">
                                ${item.data.link ? `<a href="${item.data.link}">${item.data.value}</a>` : item.data.value}
                            </p>
                            <p class="contact-description">${item.data.description}</p>
                            <span class="contact-available">${item.data.available}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="contact-form-wrapper">
            ${this.renderContactForm(content.form)}
        </div>
    </div>`
  }

  private static renderContactForm = (form: any): string => {
    if (!form) return ''
    
    return `
    <form class="contact-form" id="${form.id}" novalidate>
        <div class="form-grid">
            ${form.fields.map((field: any) => `
                <div class="form-field ${field.type === 'textarea' ? 'form-field-full' : ''}">
                    <label for="${field.name}" class="form-label">
                        ${field.label}${field.required ? ' *' : ''}
                    </label>
                    ${this.renderFormField(field)}
                </div>
            `).join('')}
        </div>
        
        <button type="submit" class="form-submit">
            Envoyer le message
        </button>
    </form>`
  }

  private static renderFormField = (field: any): string => {
    const baseAttributes = `
        id="${field.name}"
        name="${field.name}"
        placeholder="${field.placeholder || ''}"
        ${field.required ? 'required' : ''}
        class="form-input"
    `
    
    switch (field.type) {
      case 'textarea':
        return `<textarea ${baseAttributes} rows="4"></textarea>`
      
      case 'select':
        return `
          <select ${baseAttributes}>
            <option value="">Choisissez...</option>
            <option value="installation">Installation</option>
            <option value="depannage">Dépannage</option>
            <option value="maintenance">Maintenance</option>
            <option value="renovation">Rénovation</option>
            <option value="autre">Autre</option>
          </select>`
      
      case 'radio':
        return `
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" name="${field.name}" value="normal" required>
              <span>Normal</span>
            </label>
            <label class="radio-label">
              <input type="radio" name="${field.name}" value="urgent" required>
              <span>Urgent</span>
            </label>
            <label class="radio-label">
              <input type="radio" name="${field.name}" value="emergency" required>
              <span>Urgence 24h</span>
            </label>
          </div>`
      
      case 'checkbox':
        return `
          <label class="checkbox-label">
            <input type="checkbox" name="${field.name}" ${field.required ? 'required' : ''}>
            <span class="checkbox-text">${field.label}</span>
          </label>`
      
      default:
        return `<input type="${field.type}" ${baseAttributes}>`
    }
  }

  private static renderMegaFooter = (section: ElementorSection): string => {
    const content = section.content
    
    return `
    <div class="footer-content">
        <div class="footer-grid">
            ${(content.items || []).map(item => `
                <div class="footer-column">
                    <h3 class="footer-title">${item.data.title}</h3>
                    ${item.data.content ? `<p class="footer-description">${item.data.content}</p>` : ''}
                    
                    ${item.data.items ? `
                        <ul class="footer-links">
                            ${item.data.items.map((link: any) => `
                                <li>
                                    <a href="${link.link}" class="footer-link">
                                        ${link.icon ? `<span class="link-icon">${link.icon}</span>` : ''}
                                        ${link.text}
                                    </a>
                                </li>
                            `).join('')}
                        </ul>
                    ` : ''}
                </div>
            `).join('')}
        </div>
        
        <div class="footer-bottom">
            <p class="footer-copyright">
                © ${new Date().getFullYear()} ${section.seo.heading.text}. Tous droits réservés.
            </p>
            <p class="footer-credits">
                Site créé avec <a href="https://claude.ai/code" target="_blank">Claude Code</a>
            </p>
        </div>
    </div>`
  }

  // ===== UTILITY METHODS =====

  private static generateSectionStyles(section: ElementorSection): string {
    const styles = []
    
    // Background styles
    if (section.background.type === 'color') {
      styles.push(`background-color: ${section.background.value}`)
    } else if (section.background.type === 'gradient') {
      styles.push(`background: ${section.background.value}`)
    } else if (section.background.type === 'image') {
      styles.push(`background-image: url('${section.background.value}')`)
      styles.push(`background-size: cover`)
      styles.push(`background-position: center`)
      styles.push(`background-attachment: fixed`)
    }
    
    // Spacing styles
    const { padding, margin } = section.spacing
    styles.push(`padding: ${padding.top} ${padding.right} ${padding.bottom} ${padding.left}`)
    styles.push(`margin: ${margin.top} ${margin.right} ${margin.bottom} ${margin.left}`)
    
    return styles.join('; ')
  }

  private static generateSectionAttributes(section: ElementorSection): string {
    const attributes = []
    
    // ARIA attributes
    if (section.seo.aria_labels.section) {
      attributes.push(`aria-label="${section.seo.aria_labels.section}"`)
    }
    
    // Data attributes for JavaScript
    attributes.push(`data-section-type="${section.type}"`)
    if (section.animations.scroll?.parallax) {
      attributes.push(`data-parallax="true"`)
      attributes.push(`data-parallax-speed="${section.animations.scroll.speed}"`)
    }
    
    return attributes.join(' ')
  }

  private static renderSectionBackground(section: ElementorSection): string {
    if (section.background.type === 'video' && section.background.video) {
      return `
        <video 
          class="hero-video section-bg-video" 
          autoplay 
          ${section.background.video.muted ? 'muted' : ''} 
          ${section.background.video.loop ? 'loop' : ''} 
          playsinline
          poster="${section.background.video.mobile_fallback}"
        >
          <source src="${section.background.video.url}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        
        ${section.background.overlay ? `
          <div class="hero-overlay section-overlay" style="
            background: ${section.background.overlay.color};
            opacity: ${section.background.overlay.opacity};
            mix-blend-mode: ${section.background.overlay.blend};
          "></div>
        ` : ''}`
    }
    
    if (section.background.overlay && section.background.type === 'image') {
      return `
        <div class="section-overlay" style="
          background: ${section.background.overlay.color};
          opacity: ${section.background.overlay.opacity};
          mix-blend-mode: ${section.background.overlay.blend};
        "></div>`
    }
    
    return ''
  }

  // Generate complete CSS file
  static generateMainCSS(theme: string): string {
    return `
${ElementorProCSS.generateModernCSS(theme as any)}

/* ===== ADDITIONAL SECTION STYLES ===== */

/* About Section */
.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-20);
  align-items: center;
}

.about-features {
  display: grid;
  gap: var(--space-8);
  margin-top: var(--space-8);
}

.feature-item {
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
}

.feature-icon {
  font-size: var(--text-2xl);
  background: var(--primary-light);
  width: 60px;
  height: 60px;
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--gray-800);
  margin-bottom: var(--space-2);
}

.feature-description {
  color: var(--gray-600);
  margin-bottom: var(--space-2);
}

.feature-stats {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--primary);
}

/* Stats Section */
.stats-content {
  text-align: center;
}

.stats-header {
  margin-bottom: var(--space-12);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-8);
}

.stat-item {
  text-align: center;
  color: var(--white);
}

.stat-icon {
  font-size: var(--text-4xl);
  margin-bottom: var(--space-4);
}

.stat-number {
  font-size: var(--text-5xl);
  font-weight: 800;
  line-height: 1;
  margin-bottom: var(--space-2);
}

.stat-label {
  font-size: var(--text-xl);
  font-weight: 600;
  margin-bottom: var(--space-2);
}

.stat-description {
  opacity: 0.9;
}

/* Testimonials */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-8);
}

.testimonial-card {
  background: var(--white);
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-normal);
}

.testimonial-card:hover {
  transform: translateY(-5px);
}

.testimonial-rating {
  font-size: var(--text-lg);
  margin-bottom: var(--space-4);
}

.testimonial-text {
  font-size: var(--text-lg);
  line-height: 1.7;
  margin-bottom: var(--space-6);
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.author-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-weight: 600;
  color: var(--gray-800);
}

.author-location,
.author-service {
  font-size: var(--text-sm);
  color: var(--gray-500);
}

/* Portfolio */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
}

.portfolio-item {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: pointer;
}

.portfolio-image {
  position: relative;
  overflow: hidden;
}

.portfolio-image img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.portfolio-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--space-6);
  color: var(--white);
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.portfolio-item:hover .portfolio-overlay {
  opacity: 1;
}

.portfolio-item:hover .portfolio-image img {
  transform: scale(1.1);
}

/* FAQ Accordion */
.faq-accordion {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid var(--gray-200);
}

.faq-question {
  width: 100%;
  padding: var(--space-6);
  text-align: left;
  background: none;
  border: none;
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--gray-800);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: color var(--transition-normal);
}

.faq-question:hover {
  color: var(--primary);
}

.faq-icon {
  transition: transform var(--transition-normal);
}

.faq-question[aria-expanded="true"] .faq-icon {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition-normal);
}

.faq-question[aria-expanded="true"] + .faq-answer {
  max-height: 500px;
}

.faq-answer p {
  padding: 0 var(--space-6) var(--space-6);
  color: var(--gray-600);
  line-height: 1.7;
}

/* Blog Grid */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-8);
}

.blog-card {
  background: var(--white);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-normal);
}

.blog-card:hover {
  transform: translateY(-5px);
}

.blog-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-category {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  background: var(--primary);
  color: var(--white);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
}

.blog-content {
  padding: var(--space-6);
}

.blog-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--gray-800);
  margin-bottom: var(--space-4);
}

.blog-excerpt {
  color: var(--gray-600);
  line-height: 1.6;
  margin-bottom: var(--space-4);
}

.blog-meta {
  display: flex;
  gap: var(--space-4);
  font-size: var(--text-sm);
  color: var(--gray-500);
}

/* Partners */
.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--space-8);
  align-items: center;
}

.partner-item {
  display: flex;
  justify-content: center;
  opacity: 0.7;
  transition: opacity var(--transition-normal);
}

.partner-item:hover {
  opacity: 1;
}

.partner-logo {
  max-width: 120px;
  max-height: 60px;
  width: auto;
  height: auto;
  filter: grayscale(100%);
  transition: filter var(--transition-normal);
}

.partner-item:hover .partner-logo {
  filter: grayscale(0%);
}

/* Contact Form */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
}

.contact-methods {
  display: grid;
  gap: var(--space-6);
  margin-top: var(--space-8);
}

.contact-item {
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
}

.contact-icon {
  font-size: var(--text-2xl);
  width: 50px;
  flex-shrink: 0;
}

.contact-method-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--gray-800);
  margin-bottom: var(--space-2);
}

.contact-value a {
  color: var(--primary);
  text-decoration: none;
}

.contact-value a:hover {
  text-decoration: underline;
}

.contact-available {
  font-size: var(--text-sm);
  color: var(--gray-500);
  font-style: italic;
}

.contact-form {
  background: var(--white);
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.form-field-full {
  grid-column: 1 / -1;
}

.form-label {
  display: block;
  font-weight: 600;
  color: var(--gray-700);
  margin-bottom: var(--space-2);
}

.form-input {
  width: 100%;
  padding: var(--space-4);
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  transition: border-color var(--transition-normal);
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
}

.radio-group {
  display: flex;
  gap: var(--space-4);
}

.radio-label,
.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
}

.form-submit {
  background: var(--primary);
  color: var(--white);
  padding: var(--space-4) var(--space-8);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--text-lg);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  width: 100%;
}

.form-submit:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

/* Footer */
.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-12);
  margin-bottom: var(--space-12);
}

.footer-title {
  color: var(--white);
  font-size: var(--text-xl);
  font-weight: 600;
  margin-bottom: var(--space-6);
}

.footer-description {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: var(--space-6);
  line-height: 1.6;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: var(--space-3);
}

.footer-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  transition: color var(--transition-normal);
}

.footer-link:hover {
  color: var(--white);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: var(--space-8);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-copyright,
.footer-credits {
  color: rgba(255, 255, 255, 0.6);
  font-size: var(--text-sm);
}

.footer-credits a {
  color: var(--white);
  text-decoration: none;
}

.footer-credits a:hover {
  text-decoration: underline;
}

/* Back to Top */
.back-to-top {
  position: fixed;
  bottom: var(--space-8);
  right: var(--space-8);
  width: 50px;
  height: 50px;
  background: var(--primary);
  color: var(--white);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-normal);
  z-index: var(--z-fixed);
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
}

.back-to-top:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

/* Reading Progress */
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--primary);
  transform-origin: left center;
  transform: scaleX(0);
  z-index: var(--z-fixed);
}

/* Skip Link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary);
  color: var(--white);
  padding: 8px;
  text-decoration: none;
  z-index: 100;
  border-radius: var(--radius);
}

.skip-link:focus {
  top: 6px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .about-content,
  .contact-content {
    grid-template-columns: 1fr;
    gap: var(--space-12);
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: var(--space-4);
    text-align: center;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .testimonials-grid,
  .portfolio-grid,
  .blog-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .partners-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}`
  }
}