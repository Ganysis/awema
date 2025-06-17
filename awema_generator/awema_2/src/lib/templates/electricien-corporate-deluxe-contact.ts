import { TemplateData } from '../template'
import { NavigationItem } from '../multi-page-generator'

export function generateElectricienCorporateDeluxeContactTemplate(data: TemplateData, navigation: NavigationItem[]): string {
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact ${data.companyName} - Électricien Corporate ${data.city} | Devis Professionnel</title>
    <meta name="description" content="Contactez ${data.companyName}, électricien corporate à ${data.city}. Devis gratuit, solutions professionnelles, équipes certifiées RGE. Appelez le ${data.phone}.">
    <meta name="keywords" content="contact électricien ${data.city}, devis électricien corporate, ${data.companyName}">
    
    <!-- SEO Avancé -->
    <meta property="og:title" content="Contact ${data.companyName} - Électricien Corporate ${data.city}">
    <meta property="og:description" content="Contactez votre électricien corporate professionnel. Devis gratuit et solutions sur-mesure.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://${data.domain}/contact.html">
    
    <!-- Schema.org Contact -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "mainEntity": {
        "@type": "ElectricalContractor",
        "name": "${data.companyName}",
        "telephone": "${data.phone}",
        "email": "${data.email}",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "${data.address}",
          "addressLocality": "${data.city}",
          "addressCountry": "FR"
        },
        "openingHours": "${data.openingHours}",
        "areaServed": [${data.serviceCities.map(city => `"${city}"`).join(', ')}]
      }
    }
    </script>
    
    <!-- Polices Corporate -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Roboto+Slab:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
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
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        @media (min-width: 640px) { .container { padding: 0 2rem; } }
        @media (min-width: 1024px) { .container { padding: 0 3rem; } }
        
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
        
        .logo::before {
            content: '🏢';
            font-size: 2rem;
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
            font-weight: 500;
            padding: 0.75rem 1.25rem;
            border-radius: var(--radius);
            transition: var(--transition);
            text-transform: uppercase;
            font-size: 0.875rem;
            letter-spacing: 0.05em;
        }
        
        .nav-link:hover {
            color: var(--primary);
            background: var(--bg);
        }
        
        .nav-link.active {
            color: var(--primary);
            background: var(--bg);
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
            background: var(--primary);
            color: var(--bg-white);
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
            background: var(--primary-dark);
        }
        
        /* Contact Hero */
        .contact-hero {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: var(--bg-white);
            padding: 8rem 0 4rem;
            text-align: center;
            margin-top: 80px;
            position: relative;
            overflow: hidden;
        }
        
        .contact-hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="corporate" width="100" height="100" patternUnits="userSpaceOnUse"><rect x="40" y="40" width="20" height="20" fill="white" opacity="0.1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23corporate)"/></svg>');
            opacity: 0.5;
        }
        
        .contact-hero-content {
            position: relative;
            z-index: 2;
        }
        
        .contact-hero h1 {
            font-family: 'Roboto Slab', serif;
            font-size: clamp(3rem, 8vw, 5rem);
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        
        .contact-hero p {
            font-size: 1.25rem;
            margin-bottom: 3rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            opacity: 0.95;
        }
        
        .hero-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .stat-item {
            text-align: center;
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: var(--radius-lg);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .stat-number {
            font-family: 'Roboto Slab', serif;
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--accent);
            margin-bottom: 0.5rem;
        }
        
        .stat-label {
            font-size: 0.875rem;
            opacity: 0.9;
        }
        
        /* Contact Main */
        .contact-main {
            padding: 6rem 0;
            background: var(--bg-white);
        }
        
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: start;
        }
        
        .contact-info {
            position: sticky;
            top: 120px;
        }
        
        .contact-info h2 {
            font-family: 'Roboto Slab', serif;
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 1.5rem;
        }
        
        .contact-info p {
            color: var(--text-light);
            font-size: 1.125rem;
            margin-bottom: 3rem;
            line-height: 1.7;
        }
        
        .contact-methods {
            display: grid;
            gap: 1.5rem;
            margin-bottom: 3rem;
        }
        
        .contact-method {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            padding: 2rem;
            background: var(--bg);
            border-radius: var(--radius-lg);
            border: 2px solid transparent;
            transition: var(--transition);
            cursor: pointer;
            box-shadow: var(--shadow-sm);
        }
        
        .contact-method:hover {
            border-color: var(--primary);
            transform: translateY(-4px);
            box-shadow: var(--shadow);
        }
        
        .contact-method-icon {
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border-radius: var(--radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.75rem;
            color: var(--bg-white);
            flex-shrink: 0;
        }
        
        .contact-method-info h3 {
            font-family: 'Roboto Slab', serif;
            font-weight: 600;
            color: var(--text);
            margin-bottom: 0.5rem;
        }
        
        .contact-method-info p {
            color: var(--text-light);
            margin: 0;
        }
        
        .contact-method-info a {
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
        }
        
        .contact-method-info a:hover {
            text-decoration: underline;
        }
        
        .opening-hours {
            background: linear-gradient(135deg, var(--success), #047857);
            color: var(--bg-white);
            padding: 2rem;
            border-radius: var(--radius-lg);
            margin-bottom: 2rem;
        }
        
        .opening-hours h3 {
            font-family: 'Roboto Slab', serif;
            font-weight: 700;
            margin-bottom: 1rem;
        }
        
        .hours-list {
            list-style: none;
        }
        
        .hours-list li {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .hours-list li:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        
        .emergency-info {
            background: linear-gradient(135deg, var(--accent), var(--accent-dark));
            color: var(--text);
            padding: 2rem;
            border-radius: var(--radius-lg);
            text-align: center;
        }
        
        .emergency-info h3 {
            font-family: 'Roboto Slab', serif;
            font-weight: 700;
            margin-bottom: 1rem;
        }
        
        .emergency-info p {
            margin-bottom: 1.5rem;
        }
        
        .emergency-phone {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            background: var(--bg-white);
            color: var(--text);
            padding: 1rem 1.5rem;
            border-radius: var(--radius-lg);
            text-decoration: none;
            font-weight: 700;
            font-size: 1.125rem;
            transition: var(--transition);
            box-shadow: var(--shadow);
        }
        
        .emergency-phone:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }
        
        /* Contact Form */
        .contact-form {
            background: var(--bg-white);
            border-radius: var(--radius-lg);
            padding: 3rem;
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--border);
        }
        
        .form-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .form-header h2 {
            font-family: 'Roboto Slab', serif;
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 0.5rem;
        }
        
        .form-header p {
            color: var(--text-light);
        }
        
        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group.full-width {
            grid-column: span 2;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: var(--text);
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 1rem 1.25rem;
            border: 2px solid var(--border);
            border-radius: var(--radius);
            font-size: 1rem;
            transition: var(--transition);
            background: var(--bg-white);
            font-family: inherit;
        }
        
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
        }
        
        .form-group textarea {
            resize: vertical;
            min-height: 120px;
        }
        
        .form-services {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .service-checkbox {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem;
            background: var(--bg);
            border-radius: var(--radius);
            border: 2px solid transparent;
            transition: var(--transition);
            cursor: pointer;
        }
        
        .service-checkbox:hover {
            border-color: var(--primary);
        }
        
        .service-checkbox input[type="checkbox"] {
            width: auto;
            margin: 0;
        }
        
        .service-checkbox.checked {
            background: var(--primary);
            color: var(--bg-white);
            border-color: var(--primary);
        }
        
        .form-submit {
            text-align: center;
            margin-top: 2rem;
        }
        
        .btn-submit {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: var(--bg-white);
            border: none;
            padding: 1.25rem 3rem;
            border-radius: var(--radius-lg);
            font-weight: 700;
            font-size: 1.125rem;
            transition: var(--transition);
            box-shadow: var(--shadow-lg);
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 1rem;
            font-family: inherit;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .btn-submit:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-xl);
            background: linear-gradient(135deg, var(--primary-dark), var(--primary));
        }
        
        .btn-submit:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
        }
        
        /* Service Areas */
        .service-areas {
            padding: 6rem 0;
            background: var(--bg);
        }
        
        .service-areas h2 {
            text-align: center;
            font-family: 'Roboto Slab', serif;
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 1rem;
        }
        
        .service-areas p {
            text-align: center;
            color: var(--text-light);
            font-size: 1.125rem;
            margin-bottom: 3rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .cities-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }
        
        .city-item {
            background: var(--bg-white);
            padding: 2rem;
            border-radius: var(--radius-lg);
            text-align: center;
            border: 2px solid transparent;
            transition: var(--transition);
            cursor: pointer;
            box-shadow: var(--shadow-sm);
        }
        
        .city-item:hover {
            border-color: var(--primary);
            transform: translateY(-4px);
            box-shadow: var(--shadow);
        }
        
        .city-item::before {
            content: '🏢';
            font-size: 2.5rem;
            display: block;
            margin-bottom: 1rem;
        }
        
        .city-item h3 {
            font-family: 'Roboto Slab', serif;
            font-weight: 600;
            color: var(--text);
            margin-bottom: 0.5rem;
        }
        
        .city-item p {
            color: var(--text-light);
            font-size: 0.875rem;
            margin: 0;
        }
        
        /* Responsive */
        @media (max-width: 1024px) {
            .contact-grid {
                grid-template-columns: 1fr;
                gap: 3rem;
            }
            
            .contact-info {
                position: static;
            }
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
            
            .contact-hero {
                padding: 6rem 0 3rem;
            }
            
            .hero-stats {
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }
            
            .form-grid {
                grid-template-columns: 1fr;
            }
            
            .form-group.full-width {
                grid-column: span 1;
            }
            
            .contact-form {
                padding: 2rem 1.5rem;
            }
            
            .cities-grid {
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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
                        <li><a href="contact.html" class="nav-link active">Contact</a></li>
                    </ul>
                </nav>
                
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <a href="tel:${data.phone}" class="contact-phone">
                        📞 ${data.phone}
                    </a>
                    <a href="#contact-form" class="btn-primary">
                        Devis Corporate
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- Contact Hero -->
    <section class="contact-hero">
        <div class="container">
            <div class="contact-hero-content">
                <h1>Solutions Corporate</h1>
                <p>
                    Votre partenaire électricien professionnel. Expertise technique, 
                    certifications RGE, solutions sur-mesure pour entreprises et particuliers exigeants.
                </p>
                
                <div class="hero-stats">
                    <div class="stat-item">
                        <div class="stat-number">< 2h</div>
                        <div class="stat-label">Délai de Réponse</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">24h/7j</div>
                        <div class="stat-label">Service Professionnel</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">15+</div>
                        <div class="stat-label">Années d'Expertise</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">98%</div>
                        <div class="stat-label">Satisfaction Client</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Main -->
    <section class="contact-main">
        <div class="container">
            <div class="contact-grid">
                <!-- Informations Contact -->
                <div class="contact-info">
                    <h2>Contactez Nos Experts</h2>
                    <p>
                        Besoin d'un électricien professionnel certifié RGE ? 
                        ${data.companyName} met son expertise au service de vos projets. 
                        Contactez-nous pour un devis professionnel personnalisé.
                    </p>
                    
                    <div class="contact-methods">
                        <div class="contact-method" onclick="window.location.href='tel:${data.phone}'">
                            <div class="contact-method-icon">📞</div>
                            <div class="contact-method-info">
                                <h3>Standard Professionnel</h3>
                                <p><a href="tel:${data.phone}">${data.phone}</a></p>
                                <p>Ligne directe - Devis immédiat</p>
                            </div>
                        </div>
                        
                        <div class="contact-method" onclick="window.location.href='mailto:${data.email}'">
                            <div class="contact-method-icon">✉️</div>
                            <div class="contact-method-info">
                                <h3>Email Corporate</h3>
                                <p><a href="mailto:${data.email}">${data.email}</a></p>
                                <p>Réponse sous 2h en moyenne</p>
                            </div>
                        </div>
                        
                        <div class="contact-method">
                            <div class="contact-method-icon">📍</div>
                            <div class="contact-method-info">
                                <h3>Zone d'Intervention</h3>
                                <p>${data.city} et région</p>
                                <p>+${data.serviceCities.length} villes couvertes</p>
                            </div>
                        </div>
                        
                        <div class="contact-method">
                            <div class="contact-method-icon">🏢</div>
                            <div class="contact-method-info">
                                <h3>Solutions Corporate</h3>
                                <p>Entreprises & Particuliers</p>
                                <p>Devis personnalisés</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Horaires -->
                    <div class="opening-hours">
                        <h3>🕐 Horaires Professionnels</h3>
                        <ul class="hours-list">
                            <li><span>Lundi - Vendredi</span><span>8h00 - 18h00</span></li>
                            <li><span>Samedi</span><span>9h00 - 17h00</span></li>
                            <li><span>Dimanche</span><span>Urgences uniquement</span></li>
                        </ul>
                    </div>
                    
                    <!-- Urgences -->
                    <div class="emergency-info">
                        <h3>🚨 Service d'Urgence 24h/7j</h3>
                        <p>Panne électrique, disjoncteur défaillant, problème de sécurité ? Nous intervenons immédiatement sur ${data.city}.</p>
                        <a href="tel:${data.phone}" class="emergency-phone">
                            📞 Urgence : ${data.phone}
                        </a>
                    </div>
                </div>
                
                <!-- Formulaire Contact -->
                <div class="contact-form" id="contact-form">
                    <div class="form-header">
                        <h2>💼 Demande de Devis Corporate</h2>
                        <p>Solutions professionnelles - Réponse sous 24h</p>
                    </div>
                    
                    <form id="contactForm">
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="firstName">Prénom *</label>
                                <input type="text" id="firstName" name="firstName" required placeholder="Votre prénom">
                            </div>
                            
                            <div class="form-group">
                                <label for="lastName">Nom *</label>
                                <input type="text" id="lastName" name="lastName" required placeholder="Votre nom">
                            </div>
                        </div>
                        
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="company">Entreprise</label>
                                <input type="text" id="company" name="company" placeholder="Nom de votre entreprise">
                            </div>
                            
                            <div class="form-group">
                                <label for="phone">Téléphone *</label>
                                <input type="tel" id="phone" name="phone" required placeholder="06 12 34 56 78">
                            </div>
                        </div>
                        
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="votre@email.fr">
                            </div>
                            
                            <div class="form-group">
                                <label for="city">Ville d'intervention *</label>
                                <select id="city" name="city" required>
                                    <option value="">Sélectionnez votre ville</option>
                                    ${data.serviceCities.map(city => `<option value="${city}">${city}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group full-width">
                            <label>Services demandés</label>
                            <div class="form-services">
                                ${data.services.map(service => `
                                    <label class="service-checkbox">
                                        <input type="checkbox" name="services" value="${service.name}">
                                        <span>${service.name}</span>
                                    </label>
                                `).join('')}
                                <label class="service-checkbox">
                                    <input type="checkbox" name="services" value="Autre">
                                    <span>Autre</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-group full-width">
                            <label for="urgency">Délai souhaité</label>
                            <select id="urgency" name="urgency">
                                <option value="normal">Dans les 2 semaines</option>
                                <option value="quick">Dans la semaine</option>
                                <option value="urgent">Urgence - Sous 48h</option>
                            </select>
                        </div>
                        
                        <div class="form-group full-width">
                            <label for="message">Description de votre projet *</label>
                            <textarea id="message" name="message" required placeholder="Décrivez votre besoin : type de travaux, surface, contraintes techniques, budget approximatif..."></textarea>
                        </div>
                        
                        <div class="form-submit">
                            <button type="submit" class="btn-submit">
                                <span>📤 Envoyer ma Demande</span>
                                <span>→</span>
                            </button>
                            <p style="margin-top: 1rem; color: var(--text-light); font-size: 0.875rem;">
                                Réponse professionnelle sous 24h • Devis gratuit • Sans engagement
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Zones d'Intervention -->
    <section class="service-areas">
        <div class="container">
            <h2>Nos Zones d'Intervention Corporate</h2>
            <p>
                ${data.companyName} intervient sur ${data.city} et dans toute la région. 
                Solutions professionnelles pour entreprises et particuliers exigeants.
            </p>
            
            <div class="cities-grid">
                ${data.serviceCities.map(city => `
                    <div class="city-item">
                        <h3>${city}</h3>
                        <p>Solutions professionnelles</p>
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

        // Service Checkbox Styling
        document.querySelectorAll('.service-checkbox input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const label = this.closest('.service-checkbox');
                if (this.checked) {
                    label.classList.add('checked');
                } else {
                    label.classList.remove('checked');
                }
            });
        });

        // Form Submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const services = [];
            formData.getAll('services').forEach(service => services.push(service));
            
            const data = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                company: formData.get('company'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                city: formData.get('city'),
                urgency: formData.get('urgency'),
                services: services.join(', '),
                message: formData.get('message')
            };
            
            // Urgence prefix
            const urgencyPrefix = data.urgency === 'urgent' ? '🚨 URGENCE - ' :
                                 data.urgency === 'quick' ? '⚡ RAPIDE - ' : '💼 ';
            
            // Création du lien mailto
            const subject = encodeURIComponent(\`\${urgencyPrefix}Demande Corporate - \${data.firstName} \${data.lastName} - \${data.city}\`);
            const body = encodeURIComponent(
                \`Nouvelle demande de devis corporate\\n\\n\` +
                \`👤 CLIENT:\\n\` +
                \`Nom: \${data.firstName} \${data.lastName}\\n\` +
                \`Entreprise: \${data.company || 'Particulier'}\\n\` +
                \`Téléphone: \${data.phone}\\n\` +
                \`Email: \${data.email || 'Non renseigné'}\\n\` +
                \`Ville: \${data.city}\\n\` +
                \`Urgence: \${data.urgency}\\n\\n\` +
                \`⚡ SERVICES DEMANDÉS:\\n\${data.services}\\n\\n\` +
                \`📝 DESCRIPTION DU PROJET:\\n\${data.message}\\n\\n\` +
                \`---\\nDemande corporate envoyée depuis \${window.location.hostname}\`
            );
            
            // Ouvrir le client email
            window.location.href = \`mailto:${data.email}?subject=\${subject}&body=\${body}\`;
            
            // Message de confirmation
            alert('✅ Merci pour votre demande corporate !\\n\\nVotre client email va s\\'ouvrir pour finaliser l\\'envoi.\\n\\nNous vous répondrons sous 24h avec une solution professionnelle.');
            
            // Réinitialiser le formulaire
            this.reset();
            document.querySelectorAll('.service-checkbox').forEach(label => {
                label.classList.remove('checked');
            });
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
    </script>
</body>
</html>`
}