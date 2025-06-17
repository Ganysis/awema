import { TemplateData } from '../template'
import { NavigationItem } from '../multi-page-generator'
import { PROFESSIONAL_IMAGES } from './ultra-pro-templates'

export function generatePlombierAquaPremiumServiceTemplate(data: TemplateData, navigation: NavigationItem[], serviceId: string): string {
  const service = data.services.find(s => s.id === serviceId) || data.services[0]
  const heroImage = PROFESSIONAL_IMAGES.plombier.services[0]
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${service.name} ${data.city} | ${data.companyName} - Solutions Aqua Premium</title>
    <meta name="description" content="${service.name} à ${data.city} par ${data.companyName}. ${service.description} Solutions aquatiques premium, technologies de pointe, service d'exception.">
    <meta name="keywords" content="${service.name.toLowerCase()}, plombier premium ${data.city}, solutions aquatiques, technologies de pointe">
    
    <!-- SEO Avancé -->
    <meta property="og:title" content="${service.name} ${data.city} | ${data.companyName}">
    <meta property="og:description" content="${service.description}">
    <meta property="og:image" content="${heroImage}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://${data.domain}/service-${service.id}.html">
    
    <!-- Schema.org Service -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "${service.name}",
      "description": "${service.description}",
      "provider": {
        "@type": "Plumber",
        "name": "${data.companyName}",
        "telephone": "${data.phone}",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "${data.city}",
          "addressCountry": "FR"
        }
      },
      "areaServed": [${data.serviceCities.map(city => `"${city}"`).join(', ')}],
      "offers": {
        "@type": "Offer",
        "price": "${service.price || 'Sur devis'}",
        "priceCurrency": "EUR"
      }
    }
    </script>
    
    <!-- Polices Premium -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --primary: #0891b2;
            --primary-dark: #0e7490;
            --primary-light: #06b6d4;
            --secondary: #06b6d4;
            --accent: #0ea5e9;
            --accent-dark: #0284c7;
            --aqua: #22d3ee;
            --aqua-light: #67e8f9;
            --deep: #0c4a6e;
            --text: #0f172a;
            --text-light: #334155;
            --text-muted: #64748b;
            --bg: #f8fafc;
            --bg-white: #ffffff;
            --bg-aqua: #f0f9ff;
            --bg-premium: #e0f2fe;
            --border: #e2e8f0;
            --border-aqua: #0891b2;
            --success: #10b981;
            --warning: #f59e0b;
            --error: #ef4444;
            --shadow-sm: 0 1px 2px 0 rgba(8, 145, 178, 0.05);
            --shadow: 0 4px 6px -1px rgba(8, 145, 178, 0.1);
            --shadow-md: 0 10px 15px -3px rgba(8, 145, 178, 0.1);
            --shadow-lg: 0 20px 25px -5px rgba(8, 145, 178, 0.1);
            --shadow-xl: 0 25px 50px -12px rgba(8, 145, 178, 0.25);
            --radius: 1rem;
            --radius-lg: 1.5rem;
            --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            --transition-fast: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
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
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.7;
            color: var(--text);
            background: var(--bg);
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        @media (min-width: 640px) { .container { padding: 0 2rem; } }
        @media (min-width: 1024px) { .container { padding: 0 3rem; } }
        
        /* Header Premium */
        .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: linear-gradient(to right, rgba(248, 250, 252, 0.95), rgba(240, 249, 255, 0.95));
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(8, 145, 178, 0.1);
            box-shadow: var(--shadow);
            transition: var(--transition);
        }
        
        .header.scrolled {
            background: rgba(248, 250, 252, 0.98);
            box-shadow: var(--shadow-lg);
        }
        
        .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.25rem 0;
        }
        
        .logo {
            font-family: 'Playfair Display', serif;
            font-size: 2.25rem;
            font-weight: 800;
            color: var(--primary);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 1rem;
            transition: var(--transition);
        }
        
        .logo::before {
            content: '💧';
            font-size: 2.5rem;
            filter: drop-shadow(2px 2px 8px rgba(8, 145, 178, 0.3));
        }
        
        .nav-menu {
            display: flex;
            list-style: none;
            gap: 2rem;
            align-items: center;
        }
        
        .nav-link {
            text-decoration: none;
            color: var(--text);
            font-weight: 600;
            padding: 1rem 1.75rem;
            border-radius: var(--radius);
            transition: var(--transition);
            text-transform: uppercase;
            font-size: 0.875rem;
            letter-spacing: 0.05em;
        }
        
        .nav-link:hover {
            color: var(--primary);
            background: var(--bg-aqua);
        }
        
        .btn-primary {
            background: linear-gradient(135deg, var(--accent), var(--aqua));
            color: var(--bg-white);
            text-decoration: none;
            padding: 0.875rem 1.75rem;
            border-radius: var(--radius-lg);
            font-weight: 600;
            transition: var(--transition);
            box-shadow: var(--shadow);
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }
        
        /* Service Hero */
        .service-hero {
            position: relative;
            min-height: 80vh;
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, 
                rgba(8, 145, 178, 0.95) 0%, 
                rgba(6, 182, 212, 0.9) 35%, 
                rgba(34, 211, 238, 0.85) 65%,
                rgba(103, 232, 249, 0.8) 100%
            ), url('${heroImage}');
            background-size: cover;
            background-position: center;
            color: var(--bg-white);
            margin-top: 90px;
            overflow: hidden;
        }
        
        .service-hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="waves" width="100" height="20" patternUnits="userSpaceOnUse"><path d="M0,10 Q25,0 50,10 T100,10" stroke="white" stroke-width="0.5" fill="none" opacity="0.1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23waves)"/></svg>');
            opacity: 0.4;
        }
        
        .service-hero-content {
            position: relative;
            z-index: 2;
        }
        
        .breadcrumb {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 2rem;
            font-size: 0.875rem;
            opacity: 0.9;
        }
        
        .breadcrumb a {
            color: var(--bg-white);
            text-decoration: none;
            transition: var(--transition);
        }
        
        .breadcrumb a:hover {
            color: var(--aqua-light);
        }
        
        .service-hero h1 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(3rem, 8vw, 5rem);
            font-weight: 900;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            text-shadow: 0 8px 30px rgba(0,0,0,0.4);
        }
        
        .service-hero p {
            font-size: 1.375rem;
            margin-bottom: 2.5rem;
            max-width: 700px;
            opacity: 0.95;
            line-height: 1.8;
        }
        
        .service-badges {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            margin-bottom: 2.5rem;
        }
        
        .service-badge {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(15px);
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            border: 2px solid rgba(255, 255, 255, 0.2);
            font-weight: 600;
            font-size: 0.875rem;
        }
        
        .cta-buttons {
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
        }
        
        .btn-hero {
            background: linear-gradient(135deg, var(--aqua), var(--aqua-light));
            color: var(--text);
            text-decoration: none;
            padding: 1.25rem 2.5rem;
            border-radius: var(--radius-lg);
            font-weight: 700;
            font-size: 1.125rem;
            transition: var(--transition);
            box-shadow: var(--shadow-xl);
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            border: 3px solid rgba(255, 255, 255, 0.2);
        }
        
        .btn-hero:hover {
            transform: translateY(-4px);
            box-shadow: 0 30px 60px -10px rgba(8, 145, 178, 0.4);
        }
        
        .btn-secondary {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(15px);
            color: var(--bg-white);
            text-decoration: none;
            padding: 1.25rem 2.5rem;
            border-radius: var(--radius-lg);
            font-weight: 600;
            font-size: 1.125rem;
            transition: var(--transition);
            border: 3px solid rgba(255, 255, 255, 0.3);
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-3px);
        }
        
        /* Service Content */
        .service-content {
            padding: 8rem 0;
            background: var(--bg-white);
        }
        
        .content-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 5rem;
            align-items: start;
        }
        
        .main-content h2 {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--text);
            margin-bottom: 2rem;
            line-height: 1.2;
        }
        
        .main-content p {
            color: var(--text-light);
            margin-bottom: 2rem;
            font-size: 1.125rem;
            line-height: 1.8;
        }
        
        .aqua-quote {
            background: linear-gradient(135deg, var(--bg-aqua), var(--bg-premium));
            border-left: 6px solid var(--primary);
            padding: 2.5rem;
            margin: 3rem 0;
            border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
            position: relative;
            overflow: hidden;
        }
        
        .aqua-quote::before {
            content: '💧';
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 3rem;
            opacity: 0.3;
        }
        
        .aqua-quote p {
            font-style: italic;
            color: var(--deep);
            font-size: 1.25rem;
            margin-bottom: 1rem;
            font-weight: 500;
        }
        
        .aqua-quote cite {
            display: block;
            font-weight: 700;
            color: var(--primary);
            font-style: normal;
        }
        
        .features-list {
            list-style: none;
            margin: 3rem 0;
        }
        
        .features-list li {
            display: flex;
            align-items: flex-start;
            gap: 1.5rem;
            margin-bottom: 2rem;
            padding: 2rem;
            background: var(--bg-aqua);
            border-radius: var(--radius-lg);
            border: 2px solid transparent;
            transition: var(--transition);
        }
        
        .features-list li:hover {
            border-color: var(--aqua-light);
            transform: translateX(10px);
            box-shadow: var(--shadow);
        }
        
        .features-list li::before {
            content: '🌊';
            font-size: 2rem;
            flex-shrink: 0;
        }
        
        .features-list li strong {
            color: var(--text);
            display: block;
            margin-bottom: 0.5rem;
            font-size: 1.125rem;
        }
        
        .premium-section {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: var(--bg-white);
            padding: 4rem;
            border-radius: var(--radius-lg);
            margin: 4rem 0;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .premium-section::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></svg>');
            background-size: 30px 30px;
            animation: float 20s linear infinite;
        }
        
        @keyframes float {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        .premium-section h3 {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            margin-bottom: 1.5rem;
            position: relative;
            z-index: 2;
        }
        
        .premium-section p {
            font-size: 1.125rem;
            margin-bottom: 2rem;
            opacity: 0.95;
            position: relative;
            z-index: 2;
        }
        
        .premium-features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            position: relative;
            z-index: 2;
        }
        
        .premium-feature {
            background: rgba(255, 255, 255, 0.1);
            padding: 1.5rem;
            border-radius: var(--radius);
            text-align: center;
            border: 2px solid rgba(255, 255, 255, 0.2);
        }
        
        .premium-feature-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            display: block;
        }
        
        .premium-feature-text {
            font-weight: 600;
            font-size: 0.875rem;
        }
        
        /* Sidebar */
        .sidebar {
            position: sticky;
            top: 140px;
        }
        
        .quote-card {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: var(--bg-white);
            padding: 2.5rem;
            border-radius: var(--radius-lg);
            text-align: center;
            box-shadow: var(--shadow-xl);
            margin-bottom: 2rem;
            position: relative;
            overflow: hidden;
        }
        
        .quote-card::before {
            content: '💧';
            position: absolute;
            top: -10px;
            right: -10px;
            font-size: 4rem;
            opacity: 0.2;
        }
        
        .quote-card h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.75rem;
            font-weight: 700;
            margin-bottom: 1rem;
            position: relative;
            z-index: 2;
        }
        
        .quote-card p {
            margin-bottom: 1.5rem;
            opacity: 0.9;
            position: relative;
            z-index: 2;
        }
        
        .premium-info {
            background: var(--bg-white);
            border-radius: var(--radius-lg);
            padding: 2.5rem;
            margin-bottom: 2rem;
            border: 3px solid var(--aqua-light);
            box-shadow: var(--shadow);
        }
        
        .premium-info h4 {
            color: var(--primary);
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            margin-bottom: 1.5rem;
            font-size: 1.25rem;
        }
        
        .premium-features-sidebar {
            list-style: none;
        }
        
        .premium-features-sidebar li {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
            color: var(--text-light);
            font-weight: 500;
        }
        
        .premium-features-sidebar li::before {
            content: '⭐';
            font-size: 1.25rem;
            color: var(--accent);
        }
        
        .price-info {
            background: var(--bg-aqua);
            border-radius: var(--radius-lg);
            padding: 2.5rem;
            border: 2px solid var(--border-aqua);
            box-shadow: var(--shadow);
        }
        
        .price-info h4 {
            color: var(--primary);
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            margin-bottom: 1.5rem;
            font-size: 1.25rem;
        }
        
        .price-range {
            font-size: 1.75rem;
            font-weight: 800;
            color: var(--text);
            margin-bottom: 1rem;
        }
        
        .price-note {
            font-size: 0.875rem;
            color: var(--text-light);
            line-height: 1.6;
        }
        
        /* Responsive */
        @media (max-width: 1024px) {
            .content-grid {
                grid-template-columns: 1fr;
                gap: 3rem;
            }
            
            .sidebar {
                position: static;
            }
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
            
            .service-hero {
                min-height: 70vh;
                padding: 4rem 0;
            }
            
            .cta-buttons {
                flex-direction: column;
            }
            
            .btn-hero,
            .btn-secondary {
                width: 100%;
                justify-content: center;
            }
            
            .premium-features {
                grid-template-columns: 1fr 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header" id="header">
        <div class="container">
            <div class="header-content">
                <a href="index.html" class="logo">
                    ${data.companyName}
                </a>
                
                <nav>
                    <ul class="nav-menu">
                        <li><a href="index.html" class="nav-link">Accueil</a></li>
                        <li><a href="index.html#services" class="nav-link">Services</a></li>
                        <li><a href="contact.html" class="nav-link">Contact</a></li>
                    </ul>
                </nav>
                
                <a href="contact.html" class="btn-primary">
                    Devis Premium
                </a>
            </div>
        </div>
    </header>

    <!-- Service Hero -->
    <section class="service-hero">
        <div class="container">
            <div class="service-hero-content">
                <nav class="breadcrumb">
                    <a href="index.html">Accueil</a>
                    <span>›</span>
                    <a href="index.html#services">Services</a>
                    <span>›</span>
                    <span>${service.name}</span>
                </nav>
                
                <h1>${service.name} Premium ${data.city}</h1>
                <p>${service.detailedDescription}</p>
                
                <div class="service-badges">
                    <span class="service-badge">💧 Technologies de Pointe</span>
                    <span class="service-badge">⚡ Intervention Express</span>
                    <span class="service-badge">🏆 Premium Certifié</span>
                    <span class="service-badge">💎 Matériaux Nobles</span>
                </div>
                
                <div class="cta-buttons">
                    <a href="tel:${data.phone}" class="btn-hero">
                        💧 Consultation Premium
                    </a>
                    <a href="#devis" class="btn-secondary">
                        ⭐ Devis Luxe
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Service Content -->
    <section class="service-content">
        <div class="container">
            <div class="content-grid">
                <div class="main-content">
                    <h2>Solutions Aqua Premium ${service.name} à ${data.city}</h2>
                    <p>
                        ${data.companyName} redéfinit l'excellence en plomberie avec notre service premium ${service.name.toLowerCase()}. 
                        Nous combinons savoir-faire traditionnel et technologies de pointe pour créer des solutions aquatiques 
                        sur-mesure d'exception.
                    </p>
                    
                    <div class="aqua-quote">
                        <p>
                            "Chaque goutte d'eau mérite une installation parfaite. Notre approche premium transforme 
                            vos projets aquatiques en véritables œuvres d'art fonctionnelles."
                        </p>
                        <cite>— ${data.ownerName}, Expert Aqua Premium</cite>
                    </div>
                    
                    <h2>Notre Expertise Premium</h2>
                    <ul class="features-list">
                        <li>
                            <div>
                                <strong>Diagnostic Aquatique Approfondi</strong><br>
                                Analyse complète de votre système avec technologies de détection avancées et rapport détaillé premium.
                            </div>
                        </li>
                        <li>
                            <div>
                                <strong>Solutions Sur-Mesure Exclusives</strong><br>
                                Conception personnalisée selon vos besoins avec matériaux nobles et finitions d'exception.
                            </div>
                        </li>
                        <li>
                            <div>
                                <strong>Installation Premium Certifiée</strong><br>
                                Mise en œuvre par nos experts certifiés avec garantie étendue et suivi personnalisé.
                            </div>
                        </li>
                        <li>
                            <div>
                                <strong>Technologies de Pointe</strong><br>
                                Équipements haut de gamme et innovations aquatiques pour performances optimales et durabilité.
                            </div>
                        </li>
                        <li>
                            <div>
                                <strong>Service Après-Vente d'Exception</strong><br>
                                Maintenance préventive premium et intervention prioritaire 24h/7j pour votre tranquillité.
                            </div>
                        </li>
                    </ul>
                    
                    <div class="premium-section">
                        <h3>🌊 Excellence Aquatique Premium</h3>
                        <p>
                            Notre engagement premium se traduit par une approche globale alliant innovation, 
                            qualité et service d'exception pour sublimer votre expérience aquatique.
                        </p>
                        
                        <div class="premium-features">
                            <div class="premium-feature">
                                <span class="premium-feature-icon">💎</span>
                                <div class="premium-feature-text">Matériaux Nobles</div>
                            </div>
                            <div class="premium-feature">
                                <span class="premium-feature-icon">🔬</span>
                                <div class="premium-feature-text">Technologies Avancées</div>
                            </div>
                            <div class="premium-feature">
                                <span class="premium-feature-icon">🏆</span>
                                <div class="premium-feature-text">Certifications Premium</div>
                            </div>
                            <div class="premium-feature">
                                <span class="premium-feature-icon">⚡</span>
                                <div class="premium-feature-text">Service Express</div>
                            </div>
                        </div>
                    </div>
                    
                    <h2>Pourquoi Choisir ${data.companyName} Premium ?</h2>
                    <p>
                        Leader en solutions aquatiques premium depuis plus de 10 ans. Nous intervenons sur 
                        ${data.serviceCities.join(', ')} avec une équipe d'experts passionnés par l'excellence aquatique.
                    </p>
                    
                    <p>
                        Nos certifications premium et notre approche innovante garantissent des réalisations 
                        exceptionnelles qui dépassent vos attentes. Chaque projet est unique et mérite notre attention la plus raffinée.
                    </p>
                </div>
                
                <div class="sidebar">
                    <!-- Carte Devis -->
                    <div class="quote-card">
                        <h3>Consultation Premium</h3>
                        <p>Expertise personnalisée et devis sur-mesure</p>
                        <a href="tel:${data.phone}" class="btn-hero" style="background: var(--bg-white); color: var(--primary);">
                            💧 ${data.phone}
                        </a>
                    </div>
                    
                    <!-- Info Premium -->
                    <div class="premium-info">
                        <h4>⭐ Service Premium</h4>
                        <ul class="premium-features-sidebar">
                            <li>Matériaux nobles exclusifs</li>
                            <li>Technologies de pointe</li>
                            <li>Intervention prioritaire 24h/7j</li>
                            <li>Garantie étendue premium</li>
                            <li>Suivi personnalisé inclus</li>
                        </ul>
                    </div>
                    
                    <!-- Info Prix -->
                    <div class="price-info">
                        <h4>💎 Tarification Premium</h4>
                        <div class="price-range">${service.price}</div>
                        <div class="price-note">
                            Tarification premium transparente - Devis personnalisé gratuit avec solutions sur-mesure exclusives
                        </div>
                    </div>
                </div>
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

        // Animation on scroll
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
        
        document.querySelectorAll('.features-list li').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(40px)';
            item.style.transition = \`opacity 0.8s ease \${index * 0.15}s, transform 0.8s ease \${index * 0.15}s\`;
            observer.observe(item);
        });

        // Parallax Effect
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.service-hero');
            const rate = scrolled * -0.3;
            
            if (hero) {
                hero.style.backgroundPosition = \`center \${rate}px\`;
            }
        });
    </script>
</body>
</html>`
}