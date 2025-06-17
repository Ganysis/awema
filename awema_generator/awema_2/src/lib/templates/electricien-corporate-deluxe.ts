import { TemplateData } from '../template'
import { NavigationItem } from '../multi-page-generator'
import { PROFESSIONAL_IMAGES } from './ultra-pro-templates'

export function generateElectricienCorporateDeluxeTemplate(data: TemplateData, navigation: NavigationItem[]): string {
  const heroImage = PROFESSIONAL_IMAGES.electricien.hero[1]
  const serviceImages = PROFESSIONAL_IMAGES.electricien.services
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - Entreprise Électrique Corporate ${data.city} | Solutions Professionnelles</title>
    <meta name="description" content="⚡ ${data.companyName} - Entreprise électrique corporate à ${data.city}. Solutions professionnelles, certifications RGE, équipes spécialisées. Devis gratuit. ✅ +${data.serviceCities.length} villes.">
    <meta name="keywords" content="entreprise électrique ${data.city}, solutions électriques, certification RGE, ${data.services.map(s => s.name.toLowerCase()).join(', ')}, électricité professionnelle">
    
    <!-- SEO Corporate -->
    <meta property="og:title" content="${data.companyName} - Entreprise Électrique Corporate ${data.city}">
    <meta property="og:description" content="Solutions électriques professionnelles, certifications RGE, équipes spécialisées.">
    <meta property="og:image" content="${heroImage}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://${data.domain}">
    <meta name="twitter:card" content="summary_large_image">
    
    <!-- Schema.org Corporate -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ElectricalContractor",
      "name": "${data.companyName}",
      "description": "${data.description}",
      "telephone": "${data.phone}",
      "email": "${data.email}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${data.address}",
        "addressLocality": "${data.city}",
        "addressCountry": "FR"
      },
      "url": "https://${data.domain}",
      "image": "${heroImage}",
      "priceRange": "€€€",
      "openingHours": "${data.openingHours || 'Mo-Fr 08:00-18:00'}",
      "areaServed": [${data.serviceCities.map(city => `"${city}"`).join(', ')}],
      "serviceType": "Professional Electrical Solutions",
      "hasCredential": ["RGE Certified", "Qualibat", "FFIE Member"],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "89"
      },
      "employee": [
        {
          "@type": "Person",
          "name": "Équipe Technique Spécialisée",
          "jobTitle": "Électriciens Certifiés"
        }
      ]
    }
    </script>
    
    <!-- Polices Corporate -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Roboto+Slab:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- CSS Corporate Deluxe -->
    <style>
        :root {
            --primary: #059669;
            --primary-dark: #047857;
            --primary-light: #10b981;
            --secondary: #10b981;
            --accent: #f59e0b;
            --accent-dark: #d97706;
            --text: #111827;
            --text-light: #4b5563;
            --text-muted: #9ca3af;
            --bg: #f9fafb;
            --bg-white: #ffffff;
            --bg-dark: #f3f4f6;
            --border: #e5e7eb;
            --border-light: #f3f4f6;
            --success: #10b981;
            --warning: #f59e0b;
            --error: #ef4444;
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            --radius: 0.5rem;
            --radius-lg: 0.75rem;
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            --transition-fast: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html {
            scroll-behavior: smooth;
            font-size: 16px;
        }
        
        body {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: var(--text);
            background: var(--bg);
            overflow-x: hidden;
        }
        
        /* Container Corporate */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        @media (min-width: 640px) { .container { padding: 0 2rem; } }
        @media (min-width: 1024px) { .container { padding: 0 3rem; } }
        
        /* Typography Corporate */
        .text-xs { font-size: 0.75rem; line-height: 1rem; }
        .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
        .text-base { font-size: 1rem; line-height: 1.5rem; }
        .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
        .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
        .text-2xl { font-size: 1.5rem; line-height: 2rem; }
        .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
        .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
        .text-5xl { font-size: 3rem; line-height: 1.1; }
        
        /* Header Corporate */
        .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: var(--bg-white);
            border-bottom: 1px solid var(--border);
            box-shadow: var(--shadow-sm);
            transition: var(--transition);
        }
        
        .header.scrolled {
            box-shadow: var(--shadow-md);
        }
        
        .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 0;
        }
        
        .logo {
            font-family: 'Roboto Slab', serif;
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--primary);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            transition: var(--transition);
        }
        
        .logo:hover {
            transform: scale(1.02);
        }
        
        .logo::before {
            content: '🏢';
            font-size: 2rem;
        }
        
        /* Navigation Corporate */
        .nav-menu {
            display: flex;
            list-style: none;
            gap: 2rem;
            align-items: center;
        }
        
        .nav-link {
            text-decoration: none;
            color: var(--text);
            font-weight: 500;
            padding: 0.75rem 1.25rem;
            border-radius: var(--radius);
            transition: var(--transition);
            position: relative;
            text-transform: uppercase;
            font-size: 0.875rem;
            letter-spacing: 0.05em;
        }
        
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background: var(--primary);
            transform: translateX(-50%);
            transition: var(--transition);
        }
        
        .nav-link:hover {
            color: var(--primary);
            background: var(--bg);
        }
        
        .nav-link:hover::after {
            width: 80%;
        }
        
        /* Certifications Badge */
        .certifications {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.75rem;
            color: var(--text-muted);
        }
        
        .cert-badge {
            background: var(--primary);
            color: var(--bg-white);
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-weight: 600;
        }
        
        /* Hero Corporate */
        .hero {
            position: relative;
            min-height: 90vh;
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, 
                rgba(5, 150, 105, 0.95) 0%, 
                rgba(16, 185, 129, 0.9) 100%
            ), url('${heroImage}');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            color: var(--bg-white);
            padding-top: 80px;
        }
        
        .hero-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
            position: relative;
            z-index: 2;
        }
        
        .hero-text h1 {
            font-family: 'Roboto Slab', serif;
            font-size: clamp(2.5rem, 6vw, 4rem);
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        
        .hero-highlight {
            color: var(--accent);
        }
        
        .hero-text p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.95;
            line-height: 1.8;
        }
        
        .hero-features {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .hero-feature {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 600;
        }
        
        .hero-feature::before {
            content: '✓';
            color: var(--accent);
            font-weight: 700;
        }
        
        .hero-actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .btn-primary {
            background: var(--accent);
            color: var(--text);
            text-decoration: none;
            padding: 1rem 2rem;
            border-radius: var(--radius-lg);
            font-weight: 700;
            font-size: 1.125rem;
            transition: var(--transition);
            box-shadow: var(--shadow-lg);
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-xl);
            background: var(--accent-dark);
        }
        
        .btn-secondary {
            background: transparent;
            color: var(--bg-white);
            text-decoration: none;
            padding: 1rem 2rem;
            border-radius: var(--radius-lg);
            font-weight: 600;
            font-size: 1.125rem;
            transition: var(--transition);
            border: 2px solid rgba(255, 255, 255, 0.3);
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateY(-2px);
        }
        
        /* Hero Stats */
        .hero-stats {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: var(--radius-lg);
            padding: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
        }
        
        .stat-item {
            text-align: center;
        }
        
        .stat-number {
            font-family: 'Roboto Slab', serif;
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--accent);
            display: block;
        }
        
        .stat-label {
            font-size: 0.875rem;
            opacity: 0.9;
            margin-top: 0.25rem;
        }
        
        /* Services Corporate */
        .services {
            padding: 6rem 0;
            background: var(--bg-white);
        }
        
        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }
        
        .section-badge {
            display: inline-block;
            background: var(--primary);
            color: var(--bg-white);
            padding: 0.5rem 1.5rem;
            border-radius: 50px;
            font-size: 0.875rem;
            font-weight: 600;
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .section-title {
            font-family: 'Roboto Slab', serif;
            font-size: clamp(2rem, 5vw, 3rem);
            font-weight: 700;
            color: var(--text);
            margin-bottom: 1rem;
            line-height: 1.2;
        }
        
        .section-description {
            font-size: 1.125rem;
            color: var(--text-light);
            max-width: 600px;
            margin: 0 auto;
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .service-card {
            background: var(--bg-white);
            border-radius: var(--radius-lg);
            padding: 2.5rem;
            box-shadow: var(--shadow);
            transition: var(--transition);
            position: relative;
            overflow: hidden;
            border: 1px solid var(--border);
        }
        
        .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
        }
        
        .service-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-xl);
            border-color: var(--primary);
        }
        
        .service-icon {
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border-radius: var(--radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            font-size: 1.75rem;
            color: var(--bg-white);
        }
        
        .service-card h3 {
            font-family: 'Roboto Slab', serif;
            font-size: 1.375rem;
            font-weight: 600;
            color: var(--text);
            margin-bottom: 1rem;
        }
        
        .service-card p {
            color: var(--text-light);
            margin-bottom: 1.5rem;
            line-height: 1.7;
        }
        
        .service-features {
            list-style: none;
            margin-bottom: 2rem;
        }
        
        .service-features li {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
            color: var(--text-light);
        }
        
        .service-features li::before {
            content: '✓';
            color: var(--success);
            font-weight: 700;
            font-size: 1.125rem;
        }
        
        .service-btn {
            background: var(--primary);
            color: var(--bg-white);
            text-decoration: none;
            padding: 1rem 1.5rem;
            border-radius: var(--radius);
            font-weight: 600;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            width: 100%;
            justify-content: center;
            text-transform: uppercase;
            font-size: 0.875rem;
            letter-spacing: 0.05em;
        }
        
        .service-btn:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
        }
        
        /* Responsive Corporate */
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
            
            .hero {
                background-attachment: scroll;
                padding: 6rem 0 4rem;
            }
            
            .hero-content {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .hero-features {
                grid-template-columns: 1fr;
            }
            
            .hero-actions {
                flex-direction: column;
                align-items: center;
            }
            
            .btn-primary,
            .btn-secondary {
                width: 100%;
                max-width: 300px;
                justify-content: center;
            }
            
            .services-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            
            .stats-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- Header Corporate -->
    <header class="header" id="header">
        <div class="container">
            <div class="header-content">
                <a href="index.html" class="logo">
                    ${data.companyName}
                </a>
                
                <!-- Navigation Corporate -->
                <nav>
                    <ul class="nav-menu">
                        ${navigation.map(item => `
                            <li class="nav-item">
                                <a href="${item.href}" class="nav-link">${item.label}</a>
                            </li>
                        `).join('')}
                    </ul>
                </nav>
                
                <!-- Certifications -->
                <div class="certifications">
                    <span class="cert-badge">RGE</span>
                    <span class="cert-badge">QUALIBAT</span>
                    <span class="cert-badge">FFIE</span>
                </div>
            </div>
        </div>
    </header>

    <!-- Hero Corporate -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <div class="hero-text">
                    <h1>
                        Solutions Électriques <span class="hero-highlight">Corporate</span><br>
                        ${data.city} & Région
                    </h1>
                    
                    <p>
                        Entreprise électrique certifiée RGE spécialisée dans les solutions professionnelles. 
                        Équipes qualifiées, technologies avancées, service client premium.
                    </p>
                    
                    <div class="hero-features">
                        <div class="hero-feature">Certifié RGE</div>
                        <div class="hero-feature">Équipes spécialisées</div>
                        <div class="hero-feature">Solutions sur-mesure</div>
                        <div class="hero-feature">Service 24h/7j</div>
                    </div>
                    
                    <div class="hero-actions">
                        <a href="tel:${data.phone}" class="btn-primary">
                            📞 Appel Direct
                        </a>
                        <a href="contact.html" class="btn-secondary">
                            📋 Devis Professionnel
                        </a>
                    </div>
                </div>
                
                <div class="hero-stats">
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-number">15+</span>
                            <span class="stat-label">Années d'expérience</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">500+</span>
                            <span class="stat-label">Projets réalisés</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">24h</span>
                            <span class="stat-label">Service d'urgence</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">100%</span>
                            <span class="stat-label">Satisfaction client</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Corporate -->
    <section class="services" id="services">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Nos Expertises</span>
                <h2 class="section-title">Solutions Électriques Professionnelles</h2>
                <p class="section-description">
                    Expertise technique reconnue et solutions innovantes pour tous vos projets électriques. 
                    De l'installation à la maintenance, nous accompagnons votre succès.
                </p>
            </div>
            
            <div class="services-grid">
                ${data.services.map((service, index) => `
                    <div class="service-card">
                        <div class="service-icon">
                            ${index === 0 ? '⚡' : index === 1 ? '🏢' : '🔧'}
                        </div>
                        <h3>${service.name}</h3>
                        <p>${service.description}</p>
                        <ul class="service-features">
                            <li>Expertise certifiée RGE</li>
                            <li>Équipes spécialisées</li>
                            <li>Matériaux premium</li>
                            <li>Garantie étendue</li>
                            <li>Service après-vente</li>
                        </ul>
                        <a href="service-${service.id}.html" class="service-btn">
                            Découvrir le service →
                        </a>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <script>
        // Header Scroll Effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Smooth Scrolling
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

        // Animation on Scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = \`opacity 0.6s ease \${index * 0.1}s, transform 0.6s ease \${index * 0.1}s\`;
            observer.observe(card);
        });
    </script>
</body>
</html>`
}