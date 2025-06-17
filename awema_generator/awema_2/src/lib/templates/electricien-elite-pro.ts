import { TemplateData } from '../template'
import { NavigationItem } from '../multi-page-generator'
import { PROFESSIONAL_IMAGES } from './ultra-pro-templates'

export function generateElectricienEliteProTemplate(data: TemplateData, navigation: NavigationItem[]): string {
  const heroImage = PROFESSIONAL_IMAGES.electricien.hero[0]
  const serviceImages = PROFESSIONAL_IMAGES.electricien.services
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - Électricien Expert ${data.city} | Installation & Dépannage 24h/7j</title>
    <meta name="description" content="⚡ ${data.companyName} - Électricien professionnel à ${data.city}. Installation électrique, dépannage 24h/7j, mise aux normes. Devis gratuit. ✅ +${data.serviceCities.length} villes. 🏆 Certifié RGE.">
    <meta name="keywords" content="électricien ${data.city}, installation électrique, dépannage électrique, ${data.services.map(s => s.name.toLowerCase()).join(', ')}, RGE, normes électriques">
    
    <!-- SEO Avancé -->
    <meta property="og:title" content="${data.companyName} - Électricien Expert ${data.city}">
    <meta property="og:description" content="Installation électrique, dépannage 24h/7j, mise aux normes. Devis gratuit.">
    <meta property="og:image" content="${heroImage}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://${data.domain}">
    <meta name="twitter:card" content="summary_large_image">
    
    <!-- Schema.org -->
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
      "priceRange": "€€",
      "openingHours": "${data.openingHours || 'Mo-Sa 08:00-18:00'}",
      "areaServed": [${data.serviceCities.map(city => `"${city}"`).join(', ')}],
      "serviceType": "Electrical Installation and Repair",
      "hasCredential": "RGE Certified",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127"
      }
    }
    </script>
    
    <!-- Polices Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <!-- CSS Ultra-Professionnel -->
    <style>
        :root {
            --primary: #1e40af;
            --primary-dark: #1e3a8a;
            --primary-light: #3b82f6;
            --secondary: #3b82f6;
            --accent: #fbbf24;
            --accent-dark: #f59e0b;
            --text: #1f2937;
            --text-light: #6b7280;
            --text-muted: #9ca3af;
            --bg: #ffffff;
            --bg-alt: #f9fafb;
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
            --radius: 0.75rem;
            --radius-lg: 1rem;
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
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: var(--text);
            background: var(--bg);
            overflow-x: hidden;
        }
        
        /* Container System */
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        @media (min-width: 640px) { .container { padding: 0 2rem; } }
        @media (min-width: 1024px) { .container { padding: 0 3rem; } }
        @media (min-width: 1280px) { .container { padding: 0 4rem; } }
        
        /* Typography Scale */
        .text-xs { font-size: 0.75rem; line-height: 1rem; }
        .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
        .text-base { font-size: 1rem; line-height: 1.5rem; }
        .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
        .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
        .text-2xl { font-size: 1.5rem; line-height: 2rem; }
        .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
        .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
        .text-5xl { font-size: 3rem; line-height: 1.1; }
        .text-6xl { font-size: 3.75rem; line-height: 1.1; }
        .text-7xl { font-size: 4.5rem; line-height: 1.1; }
        
        /* Header Ultra-Pro */
        .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border-light);
            transition: var(--transition);
        }
        
        .header.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: var(--shadow-md);
        }
        
        .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 0;
        }
        
        .logo {
            font-family: 'Poppins', sans-serif;
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--primary);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: var(--transition);
        }
        
        .logo:hover {
            transform: scale(1.02);
        }
        
        .logo::before {
            content: '⚡';
            font-size: 1.75rem;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        
        /* Navigation Desktop */
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
            padding: 0.75rem 1rem;
            border-radius: var(--radius);
            transition: var(--transition);
            position: relative;
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
            background: var(--bg-alt);
        }
        
        .nav-link:hover::after {
            width: 80%;
        }
        
        /* Dropdown */
        .nav-item {
            position: relative;
        }
        
        .dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            background: var(--bg);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 0.5rem 0;
            min-width: 250px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: var(--transition);
            box-shadow: var(--shadow-lg);
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
            color: var(--text);
            transition: var(--transition-fast);
            border-radius: 0.5rem;
            margin: 0 0.5rem;
        }
        
        .dropdown-link:hover {
            background: var(--primary);
            color: var(--bg);
            transform: translateX(4px);
        }
        
        /* Mobile Menu */
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
            background: var(--text);
            border-radius: 2px;
            transition: var(--transition);
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
        
        .mobile-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: var(--bg);
            transform: translateX(-100%);
            transition: var(--transition);
            z-index: 1000;
            padding-top: 80px;
            overflow-y: auto;
        }
        
        .mobile-menu.active {
            transform: translateX(0);
        }
        
        .header-contact {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .contact-phone {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--text);
            text-decoration: none;
            font-weight: 600;
            padding: 0.75rem 1rem;
            border-radius: var(--radius);
            transition: var(--transition);
            border: 2px solid var(--border);
        }
        
        .contact-phone:hover {
            color: var(--primary);
            border-color: var(--primary);
            transform: translateY(-2px);
            box-shadow: var(--shadow);
        }
        
        .btn-primary {
            background: linear-gradient(135deg, var(--primary), var(--primary-light));
            color: var(--bg);
            text-decoration: none;
            padding: 0.875rem 1.75rem;
            border-radius: var(--radius-lg);
            font-weight: 600;
            transition: var(--transition);
            box-shadow: var(--shadow);
            border: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-lg);
            background: linear-gradient(135deg, var(--primary-dark), var(--primary));
        }
        
        /* Hero Section Elite */
        .hero {
            position: relative;
            min-height: 100vh;
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, 
                rgba(30, 64, 175, 0.9) 0%, 
                rgba(59, 130, 246, 0.8) 50%, 
                rgba(30, 64, 175, 0.9) 100%
            ), url('${heroImage}');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            color: var(--bg);
            overflow: hidden;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.1) 100%);
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
            text-align: center;
            animation: heroEnter 1s ease-out;
        }
        
        @keyframes heroEnter {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            margin-bottom: 2rem;
            font-weight: 600;
            animation: fadeInUp 0.8s ease-out 0.2s both;
        }
        
        .hero h1 {
            font-family: 'Poppins', sans-serif;
            font-size: clamp(3rem, 8vw, 5rem);
            font-weight: 900;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            text-shadow: 0 4px 20px rgba(0,0,0,0.3);
            animation: fadeInUp 0.8s ease-out 0.4s both;
        }
        
        .hero-highlight {
            background: linear-gradient(135deg, var(--accent), var(--accent-dark));
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            position: relative;
        }
        
        .hero p {
            font-size: 1.25rem;
            margin-bottom: 3rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            opacity: 0.95;
            animation: fadeInUp 0.8s ease-out 0.6s both;
        }
        
        .hero-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            animation: fadeInUp 0.8s ease-out 0.8s both;
        }
        
        .btn-hero {
            background: linear-gradient(135deg, var(--accent), var(--accent-dark));
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
        
        .btn-hero:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-xl);
        }
        
        .btn-secondary {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            color: var(--bg);
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
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-2px);
            border-color: rgba(255, 255, 255, 0.5);
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Emergency Badge */
        .emergency-badge {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 100;
            background: linear-gradient(135deg, var(--error), #dc2626);
            color: var(--bg);
            padding: 1rem 1.5rem;
            border-radius: 50px;
            box-shadow: var(--shadow-lg);
            animation: emergencyPulse 2s infinite;
            text-decoration: none;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        @keyframes emergencyPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        /* Services Section */
        .services {
            padding: 6rem 0;
            background: var(--bg-alt);
            position: relative;
        }
        
        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }
        
        .section-badge {
            display: inline-block;
            background: var(--primary);
            color: var(--bg);
            padding: 0.5rem 1rem;
            border-radius: 50px;
            font-size: 0.875rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        
        .section-title {
            font-family: 'Poppins', sans-serif;
            font-size: clamp(2rem, 5vw, 3rem);
            font-weight: 800;
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
            background: var(--bg);
            border-radius: var(--radius-lg);
            padding: 2rem;
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
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border-radius: var(--radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
            color: var(--bg);
        }
        
        .service-card h3 {
            font-family: 'Poppins', sans-serif;
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 1rem;
        }
        
        .service-card p {
            color: var(--text-light);
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }
        
        .service-features {
            list-style: none;
            margin-bottom: 1.5rem;
        }
        
        .service-features li {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
            color: var(--text-light);
        }
        
        .service-features li::before {
            content: '✓';
            color: var(--success);
            font-weight: 700;
        }
        
        .service-price {
            font-size: 1.125rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 1.5rem;
        }
        
        .service-btn {
            background: var(--primary);
            color: var(--bg);
            text-decoration: none;
            padding: 0.875rem 1.5rem;
            border-radius: var(--radius);
            font-weight: 600;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            width: 100%;
            justify-content: center;
        }
        
        .service-btn:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .nav-menu,
            .header-contact {
                display: none;
            }
            
            .mobile-menu-btn {
                display: flex;
            }
            
            .hero {
                background-attachment: scroll;
                padding: 6rem 0 4rem;
            }
            
            .hero-actions {
                flex-direction: column;
                align-items: center;
            }
            
            .btn-hero,
            .btn-secondary {
                width: 100%;
                max-width: 300px;
                justify-content: center;
            }
            
            .services-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            
            .emergency-badge {
                bottom: 1rem;
                right: 1rem;
                padding: 0.75rem 1rem;
                font-size: 0.875rem;
            }
        }
        
        @media (min-width: 768px) {
            .mobile-menu,
            .mobile-menu-btn {
                display: none;
            }
        }
    </style>
</head>
<body>
    <!-- Header Ultra-Pro -->
    <header class="header" id="header">
        <div class="container">
            <div class="header-content">
                <a href="index.html" class="logo">
                    ${data.companyName}
                </a>
                
                <!-- Navigation Desktop -->
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
                
                <!-- Contact Header -->
                <div class="header-contact">
                    <a href="tel:${data.phone}" class="contact-phone">
                        📞 ${data.phone}
                    </a>
                    <a href="contact.html" class="btn-primary">
                        Devis Gratuit
                    </a>
                </div>

                <!-- Menu Mobile -->
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
                        <a href="${item.href}" class="mobile-nav-link">${item.label}</a>
                    </div>
                `).join('')}
                
                <div style="padding: 2rem 1rem;">
                    <a href="tel:${data.phone}" class="btn-primary" style="width: 100%; margin-bottom: 1rem;">
                        📞 ${data.phone}
                    </a>
                    <a href="contact.html" class="btn-secondary" style="width: 100%;">
                        Devis Gratuit
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- Hero Elite -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <div class="hero-badge">
                    🏆 Certifié RGE • +${data.serviceCities.length} villes d'intervention
                </div>
                
                <h1>
                    Électricien <span class="hero-highlight">Expert</span><br>
                    ${data.city} et Région
                </h1>
                
                <p>
                    Installation électrique, dépannage 24h/7j, mise aux normes NF C 15-100. 
                    Intervention rapide, devis gratuit, garantie 10 ans.
                </p>
                
                <div class="hero-actions">
                    <a href="tel:${data.phone}" class="btn-hero">
                        📞 Appel Gratuit
                    </a>
                    <a href="contact.html" class="btn-secondary">
                        💬 Devis en Ligne
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Elite -->
    <!-- Services Elite -->
    <section class="services" id="services">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">⚡ Nos Expertises</span>
                <h2 class="section-title">Services Électriques Professionnels</h2>
                <p class="section-description">
                    Solutions complètes en électricité pour particuliers et professionnels. 
                    Devis gratuit, intervention rapide, garantie qualité.
                </p>
            </div>
            
            <div class="services-grid">
                ${data.services.map((service, index) => `
                    <div class="service-card">
                        <div class="service-icon">
                            ${index === 0 ? '⚡' : index === 1 ? '🔧' : '🏠'}
                        </div>
                        <h3>${service.name}</h3>
                        <p>${service.description}</p>
                        <ul class="service-features">
                            <li>Devis gratuit et sans engagement</li>
                            <li>Intervention rapide 24h/7j</li>
                            <li>Garantie 10 ans</li>
                            <li>Certifié RGE</li>
                        </ul>
                        ${service.price ? `<div class="service-price">${service.price}</div>` : ''}
                        <a href="service-${service.id}.html" class="service-btn">
                            En savoir plus →
                        </a>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Pourquoi nous choisir -->
    <section class="why-choose-us" style="padding: 6rem 0; background: var(--bg);">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">🏆 Excellence</span>
                <h2 class="section-title">Pourquoi Choisir ${data.companyName} ?</h2>
                <p class="section-description">
                    Plus de 15 ans d'expérience au service de votre sérénité électrique
                </p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 3rem;">
                <div style="text-align: center; padding: 2rem;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, var(--success), #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem;">🎯</div>
                    <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; color: var(--text);">Intervention Rapide</h3>
                    <p style="color: var(--text-light);">Déplacement en moins de 30 minutes en urgence sur ${data.city}</p>
                </div>
                
                <div style="text-align: center; padding: 2rem;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem;">⚡</div>
                    <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; color: var(--text);">Expertise Certifiée</h3>
                    <p style="color: var(--text-light);">Électricien RGE certifié, formé aux dernières normes NF C 15-100</p>
                </div>
                
                <div style="text-align: center; padding: 2rem;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, var(--accent), var(--accent-dark)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem;">🛡️</div>
                    <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; color: var(--text);">Garantie 10 ans</h3>
                    <p style="color: var(--text-light);">Tous nos travaux sont garantis 10 ans pièces et main d'œuvre</p>
                </div>
                
                <div style="text-align: center; padding: 2rem;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #7c3aed, #8b5cf6); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem;">💰</div>
                    <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; color: var(--text);">Prix Transparents</h3>
                    <p style="color: var(--text-light);">Devis détaillé gratuit, pas de mauvaises surprises, paiement sécurisé</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Témoignages -->
    <section class="testimonials" style="padding: 6rem 0; background: var(--bg-alt);">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">⭐ Avis Clients</span>
                <h2 class="section-title">Ils Nous Font Confiance</h2>
                <p class="section-description">Plus de 500 clients satisfaits nous recommandent</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; margin-top: 3rem;">
                <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg); box-shadow: var(--shadow); border-left: 4px solid var(--primary);">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">MH</div>
                        <div>
                            <h4 style="font-weight: 600; color: var(--text);">Marie Hutchinson</h4>
                            <div style="color: var(--accent); font-size: 0.875rem;">⭐⭐⭐⭐⭐</div>
                        </div>
                    </div>
                    <p style="color: var(--text-light); font-style: italic;">"Intervention rapide pour un dépannage électrique. ${data.ownerName} est très professionnel et explique bien son travail. Je recommande vivement !"</p>
                </div>
                
                <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg); box-shadow: var(--shadow); border-left: 4px solid var(--success);">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, var(--success), #059669); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">JM</div>
                        <div>
                            <h4 style="font-weight: 600; color: var(--text);">Jean Moreau</h4>
                            <div style="color: var(--accent); font-size: 0.875rem;">⭐⭐⭐⭐⭐</div>
                        </div>
                    </div>
                    <p style="color: var(--text-light); font-style: italic;">"Rénovation électrique complète de mon appartement. Travail impeccable, dans les délais et au prix convenu. Parfait !"</p>
                </div>
                
                <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg); box-shadow: var(--shadow); border-left: 4px solid var(--accent);">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--accent-dark)); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">SL</div>
                        <div>
                            <h4 style="font-weight: 600; color: var(--text);">Sophie Laurent</h4>
                            <div style="color: var(--accent); font-size: 0.875rem;">⭐⭐⭐⭐⭐</div>
                        </div>
                    </div>
                    <p style="color: var(--text-light); font-style: italic;">"Service client exceptionnel. Disponible même le weekend pour les urgences. Un vrai professionnel de confiance !"</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Zone d'intervention -->
    <section class="service-area" style="padding: 6rem 0; background: var(--bg);">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">📍 Zones d'Intervention</span>
                <h2 class="section-title">Nous Intervenons Dans +${data.serviceCities.length} Villes</h2>
                <p class="section-description">
                    Service de proximité dans tout ${data.city} et sa région
                </p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 3rem;">
                ${data.serviceCities.map(city => `
                    <div style="background: var(--bg-alt); padding: 1rem; border-radius: var(--radius); text-align: center; border: 2px solid transparent; transition: var(--transition); cursor: pointer;" onmouseover="this.style.borderColor='var(--primary)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='transparent'; this.style.transform='translateY(0)'">
                        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📍</div>
                        <div style="font-weight: 600; color: var(--text);">${city}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Contact CTA -->
    <section class="contact-cta" style="padding: 6rem 0; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: var(--bg);">
        <div class="container">
            <div style="text-align: center;">
                <h2 style="font-family: 'Poppins', sans-serif; font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; margin-bottom: 1rem;">Besoin d'un Électricien ?</h2>
                <p style="font-size: 1.25rem; margin-bottom: 3rem; opacity: 0.95;">
                    Devis gratuit en 24h • Intervention rapide • Garantie 10 ans
                </p>
                
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="tel:${data.phone}" style="background: var(--accent); color: var(--text); text-decoration: none; padding: 1rem 2rem; border-radius: var(--radius-lg); font-weight: 700; font-size: 1.125rem; transition: var(--transition); display: inline-flex; align-items: center; gap: 0.75rem; box-shadow: var(--shadow-lg);" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='var(--shadow-xl)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='var(--shadow-lg)'">
                        📞 ${data.phone}
                    </a>
                    <a href="contact.html" style="background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); color: var(--bg); text-decoration: none; padding: 1rem 2rem; border-radius: var(--radius-lg); font-weight: 600; font-size: 1.125rem; transition: var(--transition); border: 2px solid rgba(255, 255, 255, 0.3); display: inline-flex; align-items: center; gap: 0.75rem;" onmouseover="this.style.background='rgba(255, 255, 255, 0.25)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(255, 255, 255, 0.15)'; this.style.transform='translateY(0)'">
                        💬 Devis en Ligne
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Badge Urgence -->
    ${data.emergencyAvailable ? `
        <a href="tel:${data.phone}" class="emergency-badge">
            🚨 Urgence 24h/7j
        </a>
    ` : ''}

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

        // Mobile Menu
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            
            mobileMenu.classList.toggle('active');
            menuBtn.classList.toggle('active');
            
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        }

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

        // Intersection Observer for Animations
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
        
        // Observe all service cards
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