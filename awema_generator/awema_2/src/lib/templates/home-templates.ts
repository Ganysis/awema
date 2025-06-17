import { TemplateData } from '../template'
import { generateCommonCSS, generateHeader, generateFooter, NavigationItem } from '../multi-page-generator'

// Interface pour la configuration d'un template d'accueil
interface HomeTemplateConfig {
  templateId: string
  data: TemplateData
  navigation: NavigationItem[]
}

// CSS commun mobile-first pour tous les templates d'accueil
const getCommonHomeMobileCSS = (data: TemplateData) => `
  /* Mobile-first base styles */
  :root {
    --primary-color: ${data.primaryColor};
    --secondary-color: ${data.secondaryColor};
    --text-dark: #1f2937;
    --text-light: #6b7280;
    --bg-light: #f9fafb;
    --white: #ffffff;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: var(--text-dark);
    background: var(--white);
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* Mobile typography */
  h1 { font-size: 2rem; font-weight: 800; line-height: 1.2; }
  h2 { font-size: 1.75rem; font-weight: 700; line-height: 1.3; }
  h3 { font-size: 1.5rem; font-weight: 600; line-height: 1.4; }
  p { font-size: 1rem; line-height: 1.6; }

  /* Tablet styles */
  @media (min-width: 768px) {
    .container { padding: 0 2rem; }
    h1 { font-size: 2.5rem; }
    h2 { font-size: 2rem; }
    h3 { font-size: 1.75rem; }
  }

  /* Desktop styles */
  @media (min-width: 1024px) {
    .container { padding: 0 2rem; }
    h1 { font-size: 3rem; }
    h2 { font-size: 2.25rem; }
    h3 { font-size: 1.875rem; }
  }

  /* Buttons mobile-first */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    min-height: 44px; /* Touch target accessibility */
  }

  .btn-primary {
    background: var(--primary-color);
    color: var(--white);
    box-shadow: var(--shadow);
  }

  .btn-primary:hover {
    background: var(--secondary-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .btn-secondary {
    background: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
  }

  .btn-secondary:hover {
    background: var(--primary-color);
    color: var(--white);
  }

  /* Grid responsive */
  .grid {
    display: grid;
    gap: 1.5rem;
  }

  .grid-1 { grid-template-columns: 1fr; }
  
  @media (min-width: 768px) {
    .grid-2 { grid-template-columns: repeat(2, 1fr); }
    .grid-3 { grid-template-columns: repeat(3, 1fr); }
  }

  @media (min-width: 1024px) {
    .grid-4 { grid-template-columns: repeat(4, 1fr); }
  }

  /* Sections */
  .section {
    padding: 3rem 0;
  }

  @media (min-width: 768px) {
    .section { padding: 4rem 0; }
  }

  @media (min-width: 1024px) {
    .section { padding: 5rem 0; }
  }
`

// Template 1: Pro Moderne
export function generateHomeModernPro(config: HomeTemplateConfig): string {
  const { data, navigation } = config
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - ${data.trade} ${data.city} | ${data.description}</title>
    <meta name="description" content="${data.description}. ${data.trade} professionnel à ${data.city}. Contactez ${data.ownerName} au ${data.phone}">
    <meta name="keywords" content="${data.keywords.join(', ')}">
    
    <!-- SEO Mobile-First -->
    <meta name="format-detection" content="telephone=yes">
    <meta name="theme-color" content="${data.primaryColor}">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${data.companyName} - ${data.trade} ${data.city}">
    <meta property="og:description" content="${data.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://${data.domain}">
    <meta property="og:image" content="${data.logoUrl || 'https://' + data.domain + '/og-image.jpg'}">
    
    <!-- Schema.org BTP -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://${data.domain}",
      "name": "${data.companyName}",
      "alternateName": "${data.trade} ${data.city}",
      "description": "${data.description}",
      "url": "https://${data.domain}",
      "telephone": "${data.phone}",
      "email": "${data.email}",
      "image": "${data.logoUrl || 'https://' + data.domain + '/logo.jpg'}",
      "priceRange": "€€",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services ${data.trade}",
        "itemListElement": [
          ${data.services.map((service, index) => `{
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "${service.name}",
              "description": "${service.description}"
            }
          }`).join(',')}
        ]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${data.address}",
        "addressLocality": "${data.city}",
        "addressCountry": "FR",
        "postalCode": "${data.legalInfo.postalCode || ''}"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "48.8566",
        "longitude": "2.3522"
      },
      "openingHours": "${data.openingHours || 'Mo-Fr 08:00-18:00'}",
      "areaServed": [${data.serviceCities.map(city => `"${city}"`).join(', ')}],
      "serviceType": "${data.trade}",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127"
      }
    }
    </script>
    
    <style>
        ${getCommonHomeMobileCSS(data)}
        
        /* Template Pro Moderne - Mobile First */
        .hero-modern {
            background: linear-gradient(135deg, ${data.primaryColor}15 0%, var(--bg-light) 100%);
            padding: 6rem 0 4rem;
            position: relative;
            overflow: hidden;
        }
        
        .hero-modern::before {
            content: '';
            position: absolute;
            top: 0;
            right: -50%;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent 30%, ${data.primaryColor}08 50%, transparent 70%);
            z-index: 1;
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
            text-align: center;
        }
        
        .hero-badge {
            display: inline-block;
            background: ${data.primaryColor};
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 2rem;
            font-size: 0.875rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            animation: fadeInUp 0.6s ease-out;
        }
        
        .hero-title {
            color: var(--text-dark);
            margin-bottom: 1rem;
            animation: fadeInUp 0.6s ease-out 0.2s both;
        }
        
        .hero-subtitle {
            font-size: 1.125rem;
            color: var(--text-light);
            margin-bottom: 2rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            animation: fadeInUp 0.6s ease-out 0.4s both;
        }
        
        .hero-actions {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
            animation: fadeInUp 0.6s ease-out 0.6s both;
        }
        
        @media (min-width: 640px) {
            .hero-actions {
                flex-direction: row;
                justify-content: center;
            }
        }
        
        .hero-phone {
            background: ${data.emergencyAvailable ? '#ef4444' : data.primaryColor};
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.75rem;
            font-size: 1.125rem;
            font-weight: 700;
            text-decoration: none;
            box-shadow: var(--shadow-lg);
            transition: all 0.3s ease;
        }
        
        .hero-phone:hover {
            transform: translateY(-3px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        .emergency-badge {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            margin-top: 1rem;
            display: inline-block;
            animation: pulse 2s infinite;
        }
        
        /* Services Grid Modern */
        .services-modern {
            background: var(--white);
            padding: 4rem 0;
        }
        
        .services-grid {
            display: grid;
            gap: 2rem;
            grid-template-columns: 1fr;
        }
        
        @media (min-width: 640px) {
            .services-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (min-width: 1024px) {
            .services-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        
        .service-card {
            background: var(--white);
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: var(--shadow);
            transition: all 0.3s ease;
            border: 1px solid #f3f4f6;
            position: relative;
            overflow: hidden;
        }
        
        .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, ${data.primaryColor}, ${data.secondaryColor});
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }
        
        .service-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-lg);
        }
        
        .service-card:hover::before {
            transform: scaleX(1);
        }
        
        .service-icon {
            width: 3rem;
            height: 3rem;
            background: linear-gradient(135deg, ${data.primaryColor}20, ${data.secondaryColor}20);
            border-radius: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
        }
        
        .service-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--text-dark);
            margin-bottom: 1rem;
        }
        
        .service-description {
            color: var(--text-light);
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }
        
        .service-price {
            font-weight: 700;
            color: ${data.primaryColor};
            font-size: 1.125rem;
            margin-bottom: 1rem;
        }
        
        .service-link {
            color: ${data.primaryColor};
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
        }
        
        .service-link:hover {
            gap: 0.75rem;
        }
        
        /* Zones d'intervention */
        .zones-section {
            background: var(--bg-light);
            padding: 4rem 0;
        }
        
        .zones-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
        }
        
        .zone-tag {
            background: ${data.primaryColor};
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 2rem;
            font-weight: 600;
            font-size: 0.875rem;
            transition: all 0.3s ease;
        }
        
        .zone-tag:hover {
            background: ${data.secondaryColor};
            transform: translateY(-2px);
        }
        
        /* Contact CTA */
        .cta-section {
            background: linear-gradient(135deg, ${data.primaryColor}, ${data.secondaryColor});
            color: white;
            padding: 4rem 0;
            text-align: center;
        }
        
        .cta-content h2 {
            color: white;
            margin-bottom: 1rem;
        }
        
        .cta-content p {
            font-size: 1.125rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        
        .cta-actions {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
        }
        
        @media (min-width: 640px) {
            .cta-actions {
                flex-direction: row;
                justify-content: center;
            }
        }
        
        .cta-btn {
            background: white;
            color: ${data.primaryColor};
            padding: 1rem 2rem;
            border-radius: 0.75rem;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .cta-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(255, 255, 255, 0.2);
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
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        /* Scroll animations */
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
</head>
<body>
    ${generateHeader(data, navigation)}
    
    <!-- Hero Section -->
    <section class="hero-modern">
        <div class="container">
            <div class="hero-content">
                <div class="hero-badge">${data.trade} Professionnel</div>
                <h1 class="hero-title">${data.companyName}</h1>
                <p class="hero-subtitle">${data.description}</p>
                <div class="hero-actions">
                    <a href="tel:${data.phone}" class="hero-phone">
                        📞 ${data.phone}
                    </a>
                    <a href="contact.html" class="btn btn-secondary">
                        📋 Devis Gratuit
                    </a>
                </div>
                ${data.emergencyAvailable ? '<div class="emergency-badge">🚨 Urgence 24h/7j</div>' : ''}
            </div>
        </div>
    </section>
    
    <!-- Services Section -->
    <section class="services-modern">
        <div class="container">
            <div class="text-center animate-on-scroll">
                <h2 style="color: ${data.primaryColor}; margin-bottom: 1rem;">Nos Services ${data.trade}</h2>
                <p style="color: var(--text-light); font-size: 1.125rem; max-width: 600px; margin: 0 auto 3rem;">
                    Des solutions professionnelles pour tous vos besoins en ${data.trade.toLowerCase()}
                </p>
            </div>
            
            <div class="services-grid">
                ${data.services.map((service, index) => `
                    <div class="service-card animate-on-scroll" style="animation-delay: ${index * 0.1}s">
                        <div class="service-icon">⚙️</div>
                        <h3 class="service-title">${service.name}</h3>
                        <p class="service-description">${service.description}</p>
                        ${service.price ? `<div class="service-price">${service.price}</div>` : ''}
                        <a href="service-${service.id}.html" class="service-link">
                            En savoir plus →
                        </a>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    
    <!-- Zones d'intervention -->
    <section class="zones-section">
        <div class="container">
            <div class="text-center animate-on-scroll">
                <h2 style="color: ${data.primaryColor}; margin-bottom: 1rem;">Zones d'Intervention</h2>
                <p style="color: var(--text-light); margin-bottom: 2rem;">
                    Nous intervenons rapidement dans toute la région
                </p>
                <div class="zones-grid">
                    ${data.serviceCities.map(city => `
                        <span class="zone-tag">${city}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    </section>
    
    <!-- CTA Final -->
    <section class="cta-section">
        <div class="container">
            <div class="cta-content animate-on-scroll">
                <h2>Besoin d'un ${data.trade.toLowerCase()} de confiance ?</h2>
                <p>Contactez-nous dès maintenant pour un devis gratuit et personnalisé</p>
                <div class="cta-actions">
                    <a href="tel:${data.phone}" class="cta-btn">
                        📞 Appeler Maintenant
                    </a>
                    <a href="contact.html" class="cta-btn">
                        📧 Demander un Devis
                    </a>
                </div>
            </div>
        </div>
    </section>
    
    ${generateFooter(data)}
    
    <script>
        // Animations au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
        
        // Click to call analytics
        document.querySelectorAll('a[href^="tel:"]').forEach(link => {
            link.addEventListener('click', () => {
                // Analytics tracking pour appels
                console.log('Call button clicked');
            });
        });
    </script>
</body>
</html>`
}

// Template 2: Artisan Classique  
export function generateHomeClassicArtisan(config: HomeTemplateConfig): string {
  const { data, navigation } = config
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - Artisan ${data.trade} ${data.city} depuis 1985</title>
    <meta name="description" content="Artisan ${data.trade} traditionnel à ${data.city}. ${data.description}. Savoir-faire familial transmis de génération en génération.">
    <meta name="keywords" content="${data.keywords.join(', ')}, artisan, traditionnel, savoir-faire">
    
    <!-- SEO Schema Artisan -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://${data.domain}",
      "name": "${data.companyName}",
      "description": "Artisan ${data.trade} traditionnel à ${data.city}",
      "url": "https://${data.domain}",
      "telephone": "${data.phone}",
      "email": "${data.email}",
      "foundingDate": "1985",
      "knowsAbout": ["Artisanat traditionnel", "${data.trade}", "Savoir-faire"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${data.address}",
        "addressLocality": "${data.city}",
        "addressCountry": "FR"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "89"
      }
    }
    </script>
    
    <style>
        ${getCommonHomeMobileCSS(data)}
        
        /* Template Artisan Classique */
        body {
            font-family: 'Georgia', 'Times New Roman', serif;
        }
        
        .hero-classic {
            background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), 
                        url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect fill="${data.primaryColor}20" width="1200" height="600"/></svg>');
            background-size: cover;
            background-position: center;
            padding: 8rem 0 6rem;
            text-align: center;
            color: white;
            position: relative;
        }
        
        .heritage-badge {
            background: rgba(255,255,255,0.9);
            color: ${data.primaryColor};
            padding: 0.75rem 2rem;
            border-radius: 0.25rem;
            font-weight: 700;
            font-size: 0.875rem;
            margin-bottom: 2rem;
            display: inline-block;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .hero-classic h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        @media (min-width: 768px) {
            .hero-classic h1 { font-size: 3.5rem; }
        }
        
        .hero-classic .subtitle {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            font-style: italic;
            opacity: 0.9;
        }
        
        .trust-indicators {
            background: var(--white);
            padding: 3rem 0;
            border-top: 4px solid ${data.primaryColor};
        }
        
        .trust-grid {
            display: grid;
            gap: 2rem;
            grid-template-columns: 1fr;
            text-align: center;
        }
        
        @media (min-width: 768px) {
            .trust-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        
        .trust-item {
            padding: 1.5rem;
        }
        
        .trust-item .icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: ${data.primaryColor};
        }
        
        .trust-item h3 {
            color: var(--text-dark);
            margin-bottom: 0.5rem;
            font-size: 1.25rem;
        }
        
        .services-classic {
            background: var(--bg-light);
            padding: 4rem 0;
        }
        
        .service-classic {
            background: var(--white);
            border-radius: 0.5rem;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: var(--shadow);
            border-left: 4px solid ${data.primaryColor};
        }
        
        .testimonial-section {
            background: ${data.primaryColor};
            color: white;
            padding: 4rem 0;
            text-align: center;
        }
        
        .testimonial {
            max-width: 800px;
            margin: 0 auto;
            font-size: 1.25rem;
            font-style: italic;
            line-height: 1.6;
        }
        
        .testimonial-author {
            margin-top: 2rem;
            font-weight: 600;
            opacity: 0.9;
        }
    </style>
</head>
<body>
    ${generateHeader(data, navigation)}
    
    <!-- Hero Classique -->
    <section class="hero-classic">
        <div class="container">
            <div class="heritage-badge">Artisan depuis 1985</div>
            <h1>${data.companyName}</h1>
            <p class="subtitle">Tradition et savoir-faire au service de votre habitat</p>
            <div class="hero-actions">
                <a href="tel:${data.phone}" class="btn btn-primary">
                    📞 ${data.phone}
                </a>
                <a href="contact.html" class="btn btn-secondary">
                    📋 Devis Gratuit
                </a>
            </div>
        </div>
    </section>
    
    <!-- Indicateurs de confiance -->
    <section class="trust-indicators">
        <div class="container">
            <div class="trust-grid">
                <div class="trust-item">
                    <div class="icon">🏆</div>
                    <h3>35+ ans d'expérience</h3>
                    <p>Savoir-faire transmis de père en fils</p>
                </div>
                <div class="trust-item">
                    <div class="icon">🛡️</div>
                    <h3>Garantie décennale</h3>
                    <p>Tous nos travaux sont assurés</p>
                </div>
                <div class="trust-item">
                    <div class="icon">⭐</div>
                    <h3>4.9/5 avis clients</h3>
                    <p>89 avis clients vérifiés</p>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Services -->
    <section class="services-classic">
        <div class="container">
            <h2 style="text-align: center; color: ${data.primaryColor}; margin-bottom: 3rem;">
                Nos Spécialités Artisanales
            </h2>
            ${data.services.map(service => `
                <div class="service-classic">
                    <h3 style="color: ${data.primaryColor}; margin-bottom: 1rem;">${service.name}</h3>
                    <p style="color: var(--text-light); margin-bottom: 1rem;">${service.description}</p>
                    ${service.price ? `<p style="font-weight: 700; color: ${data.primaryColor};">${service.price}</p>` : ''}
                    <a href="service-${service.id}.html" style="color: ${data.primaryColor}; font-weight: 600;">
                        Découvrir ce service →
                    </a>
                </div>
            `).join('')}
        </div>
    </section>
    
    <!-- Témoignage -->
    <section class="testimonial-section">
        <div class="container">
            <div class="testimonial">
                "Un travail remarquable ! ${data.ownerName} et son équipe ont rénové notre ${data.trade.toLowerCase()} 
                avec un soin et une attention aux détails exceptionnels. 
                Un vrai professionnel de l'artisanat traditionnel."
            </div>
            <div class="testimonial-author">
                - Marie D., ${data.serviceCities[0]}
            </div>
        </div>
    </section>
    
    ${generateFooter(data)}
</body>
</html>`
}

// Template 3: Impact Dynamique
export function generateHomeBoldImpact(config: HomeTemplateConfig): string {
  const { data, navigation } = config
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - ${data.trade} ${data.city} | Transformez votre espace</title>
    <meta name="description" content="Transformez votre espace avec ${data.companyName}. ${data.description}. Spécialiste ${data.trade} à ${data.city}. Résultats spectaculaires garantis !">
    <meta name="keywords" content="${data.keywords.join(', ')}, transformation, spectaculaire, impact">
    
    <style>
        ${getCommonHomeMobileCSS(data)}
        
        /* Template Bold Impact */
        .hero-bold {
            background: linear-gradient(135deg, ${data.primaryColor} 0%, ${data.secondaryColor} 100%);
            padding: 8rem 0 6rem;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
        }
        
        .impact-badge {
            background: rgba(255,255,255,0.2);
            color: white;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-weight: 800;
            font-size: 1rem;
            margin-bottom: 2rem;
            display: inline-block;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .hero-bold h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .cta-explosive {
            display: inline-flex;
            align-items: center;
            gap: 1rem;
            background: white;
            color: ${data.primaryColor};
            padding: 1.5rem 3rem;
            border-radius: 60px;
            font-size: 1.25rem;
            font-weight: 800;
            text-decoration: none;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        }
        
        .stats-grid {
            display: grid;
            gap: 2rem;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            margin-top: 3rem;
        }
        
        .stat-number {
            font-size: 3rem;
            font-weight: 900;
            color: white;
        }
    </style>
</head>
<body>
    ${generateHeader(data, navigation)}
    
    <section class="hero-bold">
        <div class="container">
            <div class="impact-badge">⚡ Impact Garanti</div>
            <h1>Transformez Votre Espace</h1>
            <p style="font-size: 1.5rem; margin-bottom: 2rem;">Des résultats spectaculaires qui dépassent vos attentes</p>
            <a href="tel:${data.phone}" class="cta-explosive">
                🚀 ${data.phone}
            </a>
        </div>
    </section>
    
    <section style="background: ${data.primaryColor}; color: white; padding: 4rem 0; text-align: center;">
        <div class="container">
            <h2 style="color: white; margin-bottom: 2rem;">Des Résultats qui Parlent</h2>
            <div class="stats-grid">
                <div><div class="stat-number">500+</div><p>Projets Réalisés</p></div>
                <div><div class="stat-number">48h</div><p>Délai Moyen</p></div>
                <div><div class="stat-number">100%</div><p>Clients Satisfaits</p></div>
            </div>
        </div>
    </section>
    
    ${generateFooter(data)}
</body>
</html>`
}

// Template 4: Épuré Minimal
export function generateHomeMinimalClean(config: HomeTemplateConfig): string {
  const { data, navigation } = config
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - ${data.trade} ${data.city} | Simplicité & Performance</title>
    <meta name="description" content="${data.companyName}: ${data.description}. Solutions ${data.trade} épurées et performantes à ${data.city}.">
    
    <style>
        ${getCommonHomeMobileCSS(data)}
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
            background: #fafafa;
        }
        
        .hero-minimal {
            background: var(--white);
            padding: 8rem 0 6rem;
            text-align: center;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .minimal-badge {
            background: ${data.primaryColor}10;
            color: ${data.primaryColor};
            padding: 0.5rem 1.5rem;
            border-radius: 100px;
            font-size: 0.875rem;
            font-weight: 600;
            margin-bottom: 2rem;
            display: inline-block;
        }
        
        .hero-minimal h1 {
            font-size: 3rem;
            font-weight: 300;
            color: var(--text-dark);
            margin-bottom: 1.5rem;
        }
        
        .cta-minimal {
            background: ${data.primaryColor};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 500;
            text-decoration: none;
        }
        
        .services-grid-minimal {
            display: grid;
            gap: 1px;
            grid-template-columns: 1fr;
            background: #e5e7eb;
            border-radius: 12px;
            overflow: hidden;
            margin-top: 3rem;
        }
        
        @media (min-width: 768px) {
            .services-grid-minimal {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        .service-minimal {
            background: var(--white);
            padding: 3rem 2rem;
            text-align: center;
        }
    </style>
</head>
<body>
    ${generateHeader(data, navigation)}
    
    <section class="hero-minimal">
        <div class="container">
            <div class="minimal-badge">${data.trade} Professionnel</div>
            <h1>${data.companyName}</h1>
            <p style="font-size: 1.25rem; color: var(--text-light); margin-bottom: 3rem;">Solutions simples, résultats durables</p>
            <a href="contact.html" class="cta-minimal">Démarrer un projet</a>
        </div>
    </section>
    
    <section style="background: var(--white); padding: 4rem 0;">
        <div class="container">
            <h2 style="text-align: center; margin-bottom: 2rem;">Nos Services</h2>
            <div class="services-grid-minimal">
                ${data.services.map(service => `
                    <div class="service-minimal">
                        <h3 style="margin-bottom: 1rem;">${service.name}</h3>
                        <p style="color: var(--text-light);">${service.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    
    ${generateFooter(data)}
</body>
</html>`
}

// Template 5: Premium Luxe
export function generateHomePremiumLuxury(config: HomeTemplateConfig): string {
  const { data, navigation } = config
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - ${data.trade} Haut de Gamme ${data.city} | Excellence</title>
    <meta name="description" content="${data.companyName}: ${data.description}. Prestations haut de gamme ${data.trade} à ${data.city}. Excellence et luxe.">
    
    <style>
        ${getCommonHomeMobileCSS(data)}
        
        body {
            font-family: 'Playfair Display', Georgia, serif;
            background: #faf9f7;
        }
        
        .hero-luxury {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            padding: 10rem 0 8rem;
            text-align: center;
            color: white;
            position: relative;
        }
        
        .luxury-badge {
            background: linear-gradient(135deg, #d4af37, #ffd700);
            color: #1a1a1a;
            padding: 0.75rem 2rem;
            border-radius: 0;
            font-weight: 700;
            font-size: 0.875rem;
            margin-bottom: 2rem;
            display: inline-block;
            text-transform: uppercase;
            letter-spacing: 3px;
        }
        
        .hero-luxury h1 {
            font-size: 4rem;
            margin-bottom: 2rem;
            font-weight: 300;
            letter-spacing: -2px;
        }
        
        .luxury-subtitle {
            font-size: 1.5rem;
            margin-bottom: 3rem;
            font-style: italic;
            opacity: 0.9;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .cta-luxury {
            background: linear-gradient(135deg, #d4af37, #ffd700);
            color: #1a1a1a;
            padding: 1.5rem 3rem;
            border-radius: 0;
            font-weight: 700;
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 2px;
            transition: all 0.3s ease;
        }
        
        .services-luxury {
            background: white;
            padding: 6rem 0;
        }
        
        .service-luxury {
            background: #faf9f7;
            border: 1px solid #e8e5e0;
            padding: 3rem;
            margin-bottom: 2rem;
            transition: all 0.3s ease;
        }
        
        .service-luxury:hover {
            background: white;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    ${generateHeader(data, navigation)}
    
    <section class="hero-luxury">
        <div class="container">
            <div class="luxury-badge">Excellence</div>
            <h1>${data.companyName}</h1>
            <p class="luxury-subtitle">"${data.description}"</p>
            <a href="contact.html" class="cta-luxury">Consultation Privée</a>
        </div>
    </section>
    
    <section class="services-luxury">
        <div class="container">
            <h2 style="text-align: center; font-size: 3rem; margin-bottom: 4rem; color: #1a1a1a;">Nos Créations d'Exception</h2>
            ${data.services.map(service => `
                <div class="service-luxury">
                    <h3 style="font-size: 2rem; margin-bottom: 1.5rem; color: #1a1a1a;">${service.name}</h3>
                    <p style="font-size: 1.125rem; line-height: 1.8; color: #666;">${service.description}</p>
                    ${service.price ? `<p style="font-weight: 700; color: #d4af37; font-size: 1.25rem; margin-top: 1.5rem;">${service.price}</p>` : ''}
                </div>
            `).join('')}
        </div>
    </section>
    
    ${generateFooter(data)}
</body>
</html>`
}

// Template 6: Urgence 24h/7j
export function generateHomeUrgence24h(config: HomeTemplateConfig): string {
  const { data, navigation } = config
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🚨 URGENCE ${data.trade.toUpperCase()} ${data.city} - ${data.companyName} 24h/7j</title>
    <meta name="description" content="URGENCE ${data.trade} ${data.city}! ${data.companyName} intervient 24h/7j. ${data.description}. Appelez maintenant: ${data.phone}">
    
    <style>
        ${getCommonHomeMobileCSS(data)}
        
        .hero-urgence {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            padding: 6rem 0 4rem;
            text-align: center;
            color: white;
            position: relative;
            animation: urgentPulse 2s infinite;
        }
        
        @keyframes urgentPulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
            50% { box-shadow: 0 0 0 20px rgba(239, 68, 68, 0); }
        }
        
        .urgence-badge {
            background: #fbbf24;
            color: #1f2937;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-weight: 900;
            font-size: 1.125rem;
            margin-bottom: 2rem;
            display: inline-block;
            text-transform: uppercase;
            letter-spacing: 2px;
            animation: flash 1.5s infinite;
        }
        
        @keyframes flash {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0.5; }
        }
        
        .hero-urgence h1 {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        .phone-urgence {
            background: #fbbf24;
            color: #1f2937;
            padding: 2rem 3rem;
            border-radius: 20px;
            font-size: 2rem;
            font-weight: 900;
            text-decoration: none;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
        
        .garanties-urgence {
            background: #1f2937;
            color: white;
            padding: 4rem 0;
            text-align: center;
        }
        
        .garantie-grid {
            display: grid;
            gap: 2rem;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            margin-top: 3rem;
        }
        
        .garantie-item {
            background: rgba(255,255,255,0.1);
            padding: 2rem;
            border-radius: 12px;
            backdrop-filter: blur(10px);
        }
    </style>
</head>
<body>
    ${generateHeader(data, navigation)}
    
    <section class="hero-urgence">
        <div class="container">
            <div class="urgence-badge">🚨 Urgence 24h/7j</div>
            <h1>INTERVENTION IMMÉDIATE</h1>
            <p style="font-size: 1.5rem; margin-bottom: 3rem; font-weight: 600;">Nous intervenons en moins de 30 minutes</p>
            <a href="tel:${data.phone}" class="phone-urgence">
                📞 ${data.phone}
            </a>
            <p style="margin-top: 2rem; font-size: 1.125rem;">Appelez maintenant - Disponible 24h/24 et 7j/7</p>
        </div>
    </section>
    
    <section class="garanties-urgence">
        <div class="container">
            <h2 style="color: white; font-size: 2.5rem; margin-bottom: 2rem;">Nos Garanties d'Intervention</h2>
            <div class="garantie-grid">
                <div class="garantie-item">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚡</div>
                    <h3>Intervention < 30min</h3>
                    <p>Temps de réponse garanti</p>
                </div>
                <div class="garantie-item">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🛠️</div>
                    <h3>Équipe Mobile</h3>
                    <p>Véhicules équipés 24h/7j</p>
                </div>
                <div class="garantie-item">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">💯</div>
                    <h3>Satisfaction Garantie</h3>
                    <p>Intervention jusqu'à résolution</p>
                </div>
            </div>
        </div>
    </section>
    
    ${generateFooter(data)}
</body>
</html>`
}

// Template 7: Proximité Locale
export function generateHomeLocalProximity(config: HomeTemplateConfig): string {
  const { data, navigation } = config
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - Votre ${data.trade} de proximité à ${data.city}</title>
    <meta name="description" content="${data.companyName}, votre ${data.trade} de proximité à ${data.city}. ${data.description}. Service local, réactivité garantie.">
    
    <style>
        ${getCommonHomeMobileCSS(data)}
        
        .hero-local {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            padding: 8rem 0 6rem;
            text-align: center;
            color: white;
        }
        
        .local-badge {
            background: rgba(255,255,255,0.2);
            color: white;
            padding: 0.75rem 2rem;
            border-radius: 25px;
            font-weight: 700;
            margin-bottom: 2rem;
            display: inline-block;
        }
        
        .hero-local h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .zones-locales {
            background: #f0fdf4;
            padding: 4rem 0;
        }
        
        .zone-locale {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 1.5rem;
            border-left: 4px solid #10b981;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .avantages-proximite {
            background: white;
            padding: 4rem 0;
        }
        
        .avantage-grid {
            display: grid;
            gap: 2rem;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            margin-top: 3rem;
        }
        
        .avantage-item {
            text-align: center;
            padding: 2rem;
            border-radius: 12px;
            background: #f0fdf4;
        }
        
        .avantage-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: #10b981;
        }
    </style>
</head>
<body>
    ${generateHeader(data, navigation)}
    
    <section class="hero-local">
        <div class="container">
            <div class="local-badge">🏠 Service Local</div>
            <h1>Votre ${data.trade} de Quartier</h1>
            <p style="font-size: 1.25rem; margin-bottom: 2rem;">À ${data.city} et dans toute la région</p>
            <a href="tel:${data.phone}" style="background: white; color: #10b981; padding: 1.5rem 3rem; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 1.25rem;">
                📞 ${data.phone}
            </a>
        </div>
    </section>
    
    <section class="zones-locales">
        <div class="container">
            <h2 style="text-align: center; color: #059669; margin-bottom: 3rem;">Nos Zones d'Intervention</h2>
            ${data.serviceCities.map(city => `
                <div class="zone-locale">
                    <h3 style="color: #059669; margin-bottom: 1rem;">📍 ${city}</h3>
                    <p style="color: #6b7280;">Intervention rapide dans toute la commune et ses environs</p>
                    <p style="color: #059669; font-weight: 600; margin-top: 0.5rem;">Temps moyen: 15-20 minutes</p>
                </div>
            `).join('')}
        </div>
    </section>
    
    <section class="avantages-proximite">
        <div class="container">
            <h2 style="text-align: center; color: #059669; margin-bottom: 2rem;">Les Avantages du Service Local</h2>
            <div class="avantage-grid">
                <div class="avantage-item">
                    <div class="avantage-icon">⚡</div>
                    <h3 style="color: #059669;">Réactivité</h3>
                    <p>Intervention rapide grâce à notre proximité</p>
                </div>
                <div class="avantage-item">
                    <div class="avantage-icon">🤝</div>
                    <h3 style="color: #059669;">Confiance</h3>
                    <p>Nous connaissons la région et ses spécificités</p>
                </div>
                <div class="avantage-item">
                    <div class="avantage-icon">💰</div>
                    <h3 style="color: #059669;">Tarifs</h3>
                    <p>Prix justes sans frais de déplacement excessifs</p>
                </div>
            </div>
        </div>
    </section>
    
    ${generateFooter(data)}
</body>
</html>`
}

// Template 8: Éco-Responsable
export function generateHomeEcoGreen(config: HomeTemplateConfig): string {
  const { data, navigation } = config
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - ${data.trade} Éco-Responsable ${data.city} | Développement Durable</title>
    <meta name="description" content="${data.companyName}: ${data.description}. Solutions ${data.trade} éco-responsables à ${data.city}. Respect de l'environnement.">
    
    <style>
        ${getCommonHomeMobileCSS(data)}
        
        .hero-eco {
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            padding: 8rem 0 6rem;
            text-align: center;
            color: white;
        }
        
        .eco-badge {
            background: rgba(255,255,255,0.9);
            color: #16a34a;
            padding: 0.75rem 2rem;
            border-radius: 25px;
            font-weight: 700;
            margin-bottom: 2rem;
            display: inline-block;
        }
        
        .hero-eco h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .engagements-eco {
            background: #f0fdf4;
            padding: 4rem 0;
        }
        
        .engagement-grid {
            display: grid;
            gap: 2rem;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            margin-top: 3rem;
        }
        
        .engagement-item {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border-top: 4px solid #22c55e;
        }
        
        .eco-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: #22c55e;
        }
        
        .certifications-eco {
            background: white;
            padding: 4rem 0;
            text-align: center;
        }
        
        .certification-grid {
            display: grid;
            gap: 2rem;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            margin-top: 3rem;
        }
        
        .certification-item {
            background: #f0fdf4;
            padding: 2rem;
            border-radius: 12px;
        }
    </style>
</head>
<body>
    ${generateHeader(data, navigation)}
    
    <section class="hero-eco">
        <div class="container">
            <div class="eco-badge">🌱 Éco-Responsable</div>
            <h1>Solutions Durables</h1>
            <p style="font-size: 1.25rem; margin-bottom: 2rem;">Pour un avenir plus vert</p>
            <a href="contact.html" style="background: white; color: #16a34a; padding: 1.5rem 3rem; border-radius: 12px; text-decoration: none; font-weight: 700;">
                Découvrir nos Solutions
            </a>
        </div>
    </section>
    
    <section class="engagements-eco">
        <div class="container">
            <h2 style="text-align: center; color: #16a34a; margin-bottom: 2rem;">Nos Engagements Environnementaux</h2>
            <div class="engagement-grid">
                <div class="engagement-item">
                    <div class="eco-icon">♾️</div>
                    <h3 style="color: #16a34a;">Matériaux Durables</h3>
                    <p>Sélection rigoureuse de matériaux éco-responsables et certifiés</p>
                </div>
                <div class="engagement-item">
                    <div class="eco-icon">⚙️</div>
                    <h3 style="color: #16a34a;">Techniques Vertes</h3>
                    <p>Méthodes de travail respectueuses de l'environnement</p>
                </div>
                <div class="engagement-item">
                    <div class="eco-icon">♿</div>
                    <h3 style="color: #16a34a;">Gestion des Déchets</h3>
                    <p>Tri sélectif et recyclage systématique sur tous nos chantiers</p>
                </div>
            </div>
        </div>
    </section>
    
    <section class="certifications-eco">
        <div class="container">
            <h2 style="color: #16a34a; margin-bottom: 2rem;">Certifications & Labels</h2>
            <div class="certification-grid">
                <div class="certification-item">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">🏆</div>
                    <h3 style="color: #16a34a;">RGE Qualibat</h3>
                    <p>Reconnu Garant Environnement</p>
                </div>
                <div class="certification-item">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">🌿</div>
                    <h3 style="color: #16a34a;">Eco-Artisan</h3>
                    <p>Label de référence</p>
                </div>
                <div class="certification-item">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">⚖️</div>
                    <h3 style="color: #16a34a;">ISO 14001</h3>
                    <p>Management environnemental</p>
                </div>
            </div>
        </div>
    </section>
    
    ${generateFooter(data)}
</body>
</html>`
}

// Template 9: Confiance Familiale
export function generateHomeFamilyTrust(config: HomeTemplateConfig): string {
  const { data, navigation } = config
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - Entreprise Familiale ${data.trade} ${data.city} depuis 3 générations</title>
    <meta name="description" content="${data.companyName}, entreprise familiale ${data.trade} à ${data.city}. ${data.description}. Tradition et confiance depuis 3 générations.">
    
    <style>
        ${getCommonHomeMobileCSS(data)}
        
        body {
            font-family: 'Georgia', 'Times New Roman', serif;
        }
        
        .hero-family {
            background: linear-gradient(135deg, #8b5a3c 0%, #6b4423 100%);
            padding: 8rem 0 6rem;
            text-align: center;
            color: white;
        }
        
        .family-badge {
            background: rgba(255,255,255,0.9);
            color: #8b5a3c;
            padding: 0.75rem 2rem;
            border-radius: 25px;
            font-weight: 700;
            margin-bottom: 2rem;
            display: inline-block;
        }
        
        .hero-family h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            font-family: 'Georgia', serif;
        }
        
        .heritage-section {
            background: #fef7ed;
            padding: 4rem 0;
        }
        
        .heritage-story {
            background: white;
            padding: 3rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border-left: 6px solid #8b5a3c;
            margin-bottom: 2rem;
        }
        
        .valeurs-familiales {
            background: white;
            padding: 4rem 0;
        }
        
        .valeur-grid {
            display: grid;
            gap: 2rem;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            margin-top: 3rem;
        }
        
        .valeur-item {
            text-align: center;
            padding: 2rem;
            background: #fef7ed;
            border-radius: 12px;
        }
        
        .valeur-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: #8b5a3c;
        }
        
        .equipe-familiale {
            background: #8b5a3c;
            color: white;
            padding: 4rem 0;
            text-align: center;
        }
    </style>
</head>
<body>
    ${generateHeader(data, navigation)}
    
    <section class="hero-family">
        <div class="container">
            <div class="family-badge">🏠 Entreprise Familiale</div>
            <h1>${data.companyName}</h1>
            <p style="font-size: 1.25rem; margin-bottom: 2rem; font-style: italic;">"Trois générations au service de votre habitat"</p>
            <a href="tel:${data.phone}" style="background: white; color: #8b5a3c; padding: 1.5rem 3rem; border-radius: 12px; text-decoration: none; font-weight: 700;">
                📞 ${data.phone}
            </a>
        </div>
    </section>
    
    <section class="heritage-section">
        <div class="container">
            <h2 style="text-align: center; color: #8b5a3c; margin-bottom: 3rem;">Notre Histoire Familiale</h2>
            <div class="heritage-story">
                <h3 style="color: #8b5a3c; margin-bottom: 1.5rem;">1960 - Les Débuts</h3>
                <p style="line-height: 1.8; color: #6b7280; margin-bottom: 2rem;">
                    Tout a commencé avec ${data.ownerName?.split(' ')[0] || 'Jean'}, qui a créé l'entreprise avec pour seules armes 
                    sa passion du métier et sa détermination à bien faire.
                </p>
                <h3 style="color: #8b5a3c; margin-bottom: 1.5rem;">1985 - La Transmission</h3>
                <p style="line-height: 1.8; color: #6b7280; margin-bottom: 2rem;">
                    Son fils reprend le flambeau, modernise l'entreprise tout en conservant 
                    les valeurs familiales de qualité et de proximité.
                </p>
                <h3 style="color: #8b5a3c; margin-bottom: 1.5rem;">Aujourd'hui - La Continuité</h3>
                <p style="line-height: 1.8; color: #6b7280;">
                    La troisième génération perpétue la tradition d'excellence, 
                    allîant savoir-faire traditionnel et techniques modernes.
                </p>
            </div>
        </div>
    </section>
    
    <section class="valeurs-familiales">
        <div class="container">
            <h2 style="text-align: center; color: #8b5a3c; margin-bottom: 2rem;">Nos Valeurs</h2>
            <div class="valeur-grid">
                <div class="valeur-item">
                    <div class="valeur-icon">🤝</div>
                    <h3 style="color: #8b5a3c;">Confiance</h3>
                    <p>Relation durable basée sur la transparence</p>
                </div>
                <div class="valeur-item">
                    <div class="valeur-icon">🏆</div>
                    <h3 style="color: #8b5a3c;">Excellence</h3>
                    <p>Savoir-faire transmis de père en fils</p>
                </div>
                <div class="valeur-item">
                    <div class="valeur-icon">❤️</div>
                    <h3 style="color: #8b5a3c;">Passion</h3>
                    <p>L'amour du métier guide chacune de nos actions</p>
                </div>
            </div>
        </div>
    </section>
    
    <section class="equipe-familiale">
        <div class="container">
            <h2 style="color: white; margin-bottom: 2rem;">Une Équipe Soudée</h2>
            <p style="font-size: 1.125rem; max-width: 600px; margin: 0 auto;">
                Aujourd'hui, c'est toute une équipe familiale qui travaille ensemble, 
                partageant les mêmes valeurs et la même exigence de qualité.
            </p>
        </div>
    </section>
    
    ${generateFooter(data)}
</body>
</html>`
}

// Template 10: Tech Innovation
export function generateHomeTechInnovation(config: HomeTemplateConfig): string {
  const { data, navigation } = config
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - ${data.trade} Innovant ${data.city} | Technologies Avancées</title>
    <meta name="description" content="${data.companyName}: ${data.description}. Solutions ${data.trade} innovantes à ${data.city}. Technologies de pointe.">
    
    <style>
        ${getCommonHomeMobileCSS(data)}
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
            background: #0f172a;
            color: white;
        }
        
        .hero-tech {
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            padding: 8rem 0 6rem;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .hero-tech::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23334155" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
        }
        
        .tech-badge {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 0.75rem 2rem;
            border-radius: 25px;
            font-weight: 700;
            margin-bottom: 2rem;
            display: inline-block;
            position: relative;
            z-index: 2;
        }
        
        .hero-tech h1 {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #60a5fa, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            position: relative;
            z-index: 2;
        }
        
        .tech-subtitle {
            font-size: 1.25rem;
            margin-bottom: 3rem;
            color: #cbd5e1;
            position: relative;
            z-index: 2;
        }
        
        .cta-tech {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 1.5rem 3rem;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 700;
            box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
            position: relative;
            z-index: 2;
            transition: all 0.3s ease;
        }
        
        .cta-tech:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 40px rgba(59, 130, 246, 0.4);
        }
        
        .innovations-tech {
            background: #1e293b;
            padding: 4rem 0;
        }
        
        .innovation-grid {
            display: grid;
            gap: 2rem;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            margin-top: 3rem;
        }
        
        .innovation-item {
            background: #334155;
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid #475569;
            transition: all 0.3s ease;
        }
        
        .innovation-item:hover {
            background: #475569;
            transform: translateY(-5px);
        }
        
        .tech-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: #3b82f6;
        }
        
        .footer {
            background: #0f172a;
            color: #cbd5e1;
        }
    </style>
</head>
<body>
    ${generateHeader(data, navigation)}
    
    <section class="hero-tech">
        <div class="container">
            <div class="tech-badge">🚀 Innovation</div>
            <h1>Technologie Avancée</h1>
            <p class="tech-subtitle">L'avenir du ${data.trade.toLowerCase()} est déjà là</p>
            <a href="contact.html" class="cta-tech">
                Découvrir nos Innovations
            </a>
        </div>
    </section>
    
    <section class="innovations-tech">
        <div class="container">
            <h2 style="text-align: center; color: #3b82f6; margin-bottom: 2rem; font-size: 2.5rem;">Nos Technologies</h2>
            <div class="innovation-grid">
                <div class="innovation-item">
                    <div class="tech-icon">🤖</div>
                    <h3 style="color: #3b82f6; margin-bottom: 1rem;">IA & Automatisation</h3>
                    <p style="color: #cbd5e1;">Intelligence artificielle pour optimiser nos interventions</p>
                </div>
                <div class="innovation-item">
                    <div class="tech-icon">📱</div>
                    <h3 style="color: #3b82f6; margin-bottom: 1rem;">App Mobile</h3>
                    <p style="color: #cbd5e1;">Suivi en temps réel de vos projets</p>
                </div>
                <div class="innovation-item">
                    <div class="tech-icon">🌐</div>
                    <h3 style="color: #3b82f6; margin-bottom: 1rem;">IoT Connecté</h3>
                    <p style="color: #cbd5e1;">Capteurs intelligents pour un service préventif</p>
                </div>
            </div>
        </div>
    </section>
    
    <section style="background: #0f172a; padding: 4rem 0; text-align: center;">
        <div class="container">
            <h2 style="color: #3b82f6; margin-bottom: 2rem;">Pourquoi Choisir l'Innovation ?</h2>
            <div style="display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); margin-top: 2rem;">
                <div style="padding: 2rem;">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">⚡</div>
                    <h3 style="color: white;">Plus Rapide</h3>
                    <p style="color: #cbd5e1;">Gain de temps grâce à nos outils</p>
                </div>
                <div style="padding: 2rem;">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">🎯</div>
                    <h3 style="color: white;">Plus Précis</h3>
                    <p style="color: #cbd5e1;">Diagnostic ultra-précis</p>
                </div>
                <div style="padding: 2rem;">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">📈</div>
                    <h3 style="color: white;">Plus Efficace</h3>
                    <p style="color: #cbd5e1;">Résultats optimisés</p>
                </div>
            </div>
        </div>
    </section>
    
    ${generateFooter(data)}
</body>
</html>`
}

// Fonction principale pour générer un template d'accueil
export function generateHomeTemplate(templateId: string, data: TemplateData, navigation: NavigationItem[]): string {
  const config: HomeTemplateConfig = { templateId, data, navigation }
  
  switch (templateId) {
    case 'home-modern-pro':
      return generateHomeModernPro(config)
    case 'home-classic-artisan':
      return generateHomeClassicArtisan(config)
    case 'home-bold-impact':
      return generateHomeBoldImpact(config)
    case 'home-minimal-clean':
      return generateHomeMinimalClean(config)
    case 'home-premium-luxury':
      return generateHomePremiumLuxury(config)
    case 'home-urgence-24h':
      return generateHomeUrgence24h(config)
    case 'home-local-proximity':
      return generateHomeLocalProximity(config)
    case 'home-eco-green':
      return generateHomeEcoGreen(config)
    case 'home-family-trust':
      return generateHomeFamilyTrust(config)
    case 'home-tech-innovation':
      return generateHomeTechInnovation(config)
    default:
      return generateHomeModernPro(config) // Fallback
  }
}