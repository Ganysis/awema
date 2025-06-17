import { TemplateData } from '../template'
import { NavigationItem } from '../multi-page-generator'

export function generateElectricienArtisanModerneContactTemplate(data: TemplateData, navigation: NavigationItem[]): string {
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact ${data.companyName} - Électricien Artisan ${data.city} | Devis Gratuit</title>
    <meta name="description" content="Contactez ${data.companyName}, électricien artisan à ${data.city}. Savoir-faire familial, proximité, devis gratuit. Appelez le ${data.phone}.">
    <meta name="keywords" content="contact électricien artisan ${data.city}, devis électricien, ${data.companyName}, proximité">
    
    <!-- SEO Avancé -->
    <meta property="og:title" content="Contact ${data.companyName} - Électricien Artisan ${data.city}">
    <meta property="og:description" content="Contactez votre électricien artisan de confiance. Proximité, savoir-faire et devis gratuit.">
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
    
    <!-- Polices Artisan -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&family=Source+Sans+Pro:wght@300;400;600;700;900&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --primary: #8b5a3c;
            --primary-dark: #7a4a2c;
            --primary-light: #a16749;
            --secondary: #d4974c;
            --accent: #e6a663;
            --accent-dark: #cc9555;
            --earth: #8b5a3c;
            --warm: #d4974c;
            --text: #2d1b0f;
            --text-light: #5a4037;
            --text-muted: #8d6e63;
            --bg: #faf8f5;
            --bg-white: #ffffff;
            --bg-warm: #f5f2ed;
            --border: #e0d4c8;
            --border-light: #efebe4;
            --success: #6a8b4f;
            --warning: #d4974c;
            --error: #c5584a;
            --shadow-sm: 0 1px 2px 0 rgba(45, 27, 15, 0.05);
            --shadow: 0 4px 6px -1px rgba(45, 27, 15, 0.1);
            --shadow-md: 0 10px 15px -3px rgba(45, 27, 15, 0.1);
            --shadow-lg: 0 20px 25px -5px rgba(45, 27, 15, 0.1);
            --shadow-xl: 0 25px 50px -12px rgba(45, 27, 15, 0.25);
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
            font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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
        
        /* Header Artisan */
        .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: var(--bg-white);
            border-bottom: 3px solid var(--primary);
            box-shadow: var(--shadow);
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
            font-family: 'Merriweather', serif;
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
            content: '🏠';
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
            font-weight: 600;
            padding: 0.75rem 1.25rem;
            border-radius: var(--radius);
            transition: var(--transition);
            position: relative;
        }
        
        .nav-link.active {
            color: var(--primary);
            background: var(--bg-warm);
        }
        
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 50%;
            width: 0;
            height: 3px;
            background: var(--accent);
            transform: translateX(-50%);
            transition: var(--transition);
        }
        
        .nav-link:hover {
            color: var(--primary);
            background: var(--bg-warm);
        }
        
        .nav-link:hover::after,
        .nav-link.active::after {
            width: 80%;
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
            background: linear-gradient(135deg, var(--primary-dark), var(--primary));
        }
        
        /* Contact Hero */
        .contact-hero {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: var(--bg-white);
            padding: 8rem 0 4rem;
            text-align: center;
            margin-top: 83px;
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
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="wood" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M10,10 L70,10 M20,30 L60,30 M15,50 L65,50 M25,70 L55,70" stroke="white" stroke-width="2" opacity="0.1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23wood)"/></svg>');
            opacity: 0.3;
        }
        
        .contact-hero-content {
            position: relative;
            z-index: 2;
        }
        
        .contact-hero h1 {
            font-family: 'Merriweather', serif;
            font-size: clamp(3rem, 8vw, 5rem);
            font-weight: 900;
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
            border: 2px solid rgba(255, 255, 255, 0.2);
        }
        
        .stat-number {
            font-family: 'Merriweather', serif;
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
            font-family: 'Merriweather', serif;
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
        
        .artisan-quote {
            background: var(--bg-warm);
            border-left: 5px solid var(--primary);
            padding: 2rem;
            margin: 2rem 0;
            border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
            font-style: italic;
            color: var(--text-light);
            position: relative;
        }
        
        .artisan-quote::before {
            content: '"';
            position: absolute;
            top: 0;
            left: 1rem;
            font-size: 4rem;
            color: var(--primary);
            line-height: 1;
            font-family: 'Merriweather', serif;
        }
        
        .artisan-quote cite {
            display: block;
            margin-top: 1rem;
            font-weight: 600;
            color: var(--primary);
            font-style: normal;
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
            background: var(--bg-warm);
            border-radius: var(--radius-lg);
            border: 3px solid transparent;
            transition: var(--transition);
            cursor: pointer;
            box-shadow: var(--shadow-sm);
        }
        
        .contact-method:hover {
            border-color: var(--accent);
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
            font-family: 'Merriweather', serif;
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
            background: linear-gradient(135deg, var(--success), #5a7a42);
            color: var(--bg-white);
            padding: 2rem;
            border-radius: var(--radius-lg);
            margin-bottom: 2rem;
        }
        
        .opening-hours h3 {
            font-family: 'Merriweather', serif;
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
        
        .local-info {
            background: var(--bg-warm);
            border: 3px solid var(--accent);
            padding: 2rem;
            border-radius: var(--radius-lg);
            text-align: center;
        }
        
        .local-info h3 {
            font-family: 'Merriweather', serif;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 1rem;
        }
        
        .local-info p {
            color: var(--text-light);
            margin-bottom: 1.5rem;
        }
        
        .local-phone {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            background: var(--primary);
            color: var(--bg-white);
            padding: 1rem 1.5rem;
            border-radius: var(--radius-lg);
            text-decoration: none;
            font-weight: 700;
            font-size: 1.125rem;
            transition: var(--transition);
            box-shadow: var(--shadow);
        }
        
        .local-phone:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
            background: var(--primary-dark);
        }
        
        /* Contact Form */
        .contact-form {
            background: var(--bg-white);
            border-radius: var(--radius-lg);
            padding: 3rem;
            box-shadow: var(--shadow-lg);
            border: 3px solid var(--accent);
        }
        
        .form-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .form-header h2 {
            font-family: 'Merriweather', serif;
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
        }
        
        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 1rem 1.25rem;
            border: 3px solid var(--border);
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
            box-shadow: 0 0 0 3px rgba(139, 90, 60, 0.1);
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
            background: var(--bg-warm);
            border-radius: var(--radius);
            border: 3px solid transparent;
            transition: var(--transition);
            cursor: pointer;
        }
        
        .service-checkbox:hover {
            border-color: var(--accent);
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
            background: var(--bg-warm);
        }
        
        .service-areas h2 {
            text-align: center;
            font-family: 'Merriweather', serif;
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
            border: 3px solid transparent;
            transition: var(--transition);
            cursor: pointer;
            box-shadow: var(--shadow-sm);
        }
        
        .city-item:hover {
            border-color: var(--accent);
            transform: translateY(-4px);
            box-shadow: var(--shadow);
        }
        
        .city-item::before {
            content: '🏠';
            font-size: 2.5rem;
            display: block;
            margin-bottom: 1rem;
        }
        
        .city-item h3 {
            font-family: 'Merriweather', serif;
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
                        Devis Artisan
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- Contact Hero -->
    <section class="contact-hero">
        <div class="container">
            <div class="contact-hero-content">
                <h1>Contact Artisan</h1>
                <p>
                    Votre électricien de proximité. Savoir-faire traditionnel, entreprise familiale, 
                    relation de confiance pour tous vos projets électriques.
                </p>
                
                <div class="hero-stats">
                    <div class="stat-item">
                        <div class="stat-number">3</div>
                        <div class="stat-label">Générations</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">100%</div>
                        <div class="stat-label">Savoir-Faire Local</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">15+</div>
                        <div class="stat-label">Années d'Expérience</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">24h</div>
                        <div class="stat-label">Délai de Réponse</div>
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
                    <h2>Parlons de Votre Projet</h2>
                    <p>
                        En tant qu'artisan électricien de ${data.city}, nous privilégions la proximité et 
                        la confiance. Chaque projet est unique et mérite une approche personnalisée. 
                        Contactez-nous pour un échange direct et des conseils adaptés.
                    </p>
                    
                    <div class="artisan-quote">
                        "Être artisan, c'est avant tout être à l'écoute de ses clients. 
                        Chaque chantier est l'occasion de tisser une relation de confiance durable."
                        <cite>— ${data.ownerName}, Artisan Électricien</cite>
                    </div>
                    
                    <div class="contact-methods">
                        <div class="contact-method" onclick="window.location.href='tel:${data.phone}'">
                            <div class="contact-method-icon">📞</div>
                            <div class="contact-method-info">
                                <h3>Ligne Directe</h3>
                                <p><a href="tel:${data.phone}">${data.phone}</a></p>
                                <p>Appelez directement l'artisan</p>
                            </div>
                        </div>
                        
                        <div class="contact-method" onclick="window.location.href='mailto:${data.email}'">
                            <div class="contact-method-icon">✉️</div>
                            <div class="contact-method-info">
                                <h3>Email Personnel</h3>
                                <p><a href="mailto:${data.email}">${data.email}</a></p>
                                <p>Réponse personnalisée assurée</p>
                            </div>
                        </div>
                        
                        <div class="contact-method">
                            <div class="contact-method-icon">🏠</div>
                            <div class="contact-method-info">
                                <h3>Proximité Locale</h3>
                                <p>${data.city} et environs</p>
                                <p>Votre artisan de quartier</p>
                            </div>
                        </div>
                        
                        <div class="contact-method">
                            <div class="contact-method-icon">🤝</div>
                            <div class="contact-method-info">
                                <h3>Conseil Gratuit</h3>
                                <p>Déplacement pour devis</p>
                                <p>Sans engagement</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Horaires -->
                    <div class="opening-hours">
                        <h3>🕐 Horaires d'Ouverture</h3>
                        <ul class="hours-list">
                            <li><span>Lundi - Vendredi</span><span>7h00 - 19h00</span></li>
                            <li><span>Samedi</span><span>8h00 - 18h00</span></li>
                            <li><span>Dimanche</span><span>Sur rendez-vous</span></li>
                        </ul>
                    </div>
                    
                    <!-- Info Locale -->
                    <div class="local-info">
                        <h3>🏠 Votre Artisan Local</h3>
                        <p>Électricien de ${data.city} depuis ${new Date().getFullYear() - 2008} ans. Entreprise familiale, savoir-faire traditionnel et proximité garantie.</p>
                        <a href="tel:${data.phone}" class="local-phone">
                            📞 Appelez ${data.ownerName}
                        </a>
                    </div>
                </div>
                
                <!-- Formulaire Contact -->
                <div class="contact-form" id="contact-form">
                    <div class="form-header">
                        <h2>🏠 Demande de Devis Artisan</h2>
                        <p>Échange personnalisé avec votre artisan électricien</p>
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
                                <label for="phone">Téléphone *</label>
                                <input type="tel" id="phone" name="phone" required placeholder="06 12 34 56 78">
                            </div>
                            
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="votre@email.fr">
                            </div>
                        </div>
                        
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="city">Ville d'intervention *</label>
                                <select id="city" name="city" required>
                                    <option value="">Sélectionnez votre ville</option>
                                    ${data.serviceCities.map(city => `<option value="${city}">${city}</option>`).join('')}
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="urgency">Délai souhaité</label>
                                <select id="urgency" name="urgency">
                                    <option value="normal">Dans le mois</option>
                                    <option value="quick">Dans la semaine</option>
                                    <option value="urgent">Urgent - Sous 48h</option>
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
                                    <input type="checkbox" name="services" value="Conseil gratuit">
                                    <span>Conseil gratuit</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-group full-width">
                            <label for="message">Décrivez votre projet *</label>
                            <textarea id="message" name="message" required placeholder="Expliquez-nous votre besoin : type de travaux, contexte, contraintes... Notre artisan vous conseillera personnellement."></textarea>
                        </div>
                        
                        <div class="form-submit">
                            <button type="submit" class="btn-submit">
                                <span>📤 Envoyer ma Demande</span>
                                <span>🏠</span>
                            </button>
                            <p style="margin-top: 1rem; color: var(--text-light); font-size: 0.875rem;">
                                Réponse personnalisée de l'artisan • Devis gratuit • Déplacement sans engagement
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
            <h2>Nos Zones d'Intervention Artisanales</h2>
            <p>
                ${data.companyName} intervient sur ${data.city} et les communes environnantes. 
                Proximité, réactivité et savoir-faire local pour tous vos projets électriques.
            </p>
            
            <div class="cities-grid">
                ${data.serviceCities.map(city => `
                    <div class="city-item">
                        <h3>${city}</h3>
                        <p>Artisan de proximité</p>
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
                phone: formData.get('phone'),
                email: formData.get('email'),
                city: formData.get('city'),
                urgency: formData.get('urgency'),
                services: services.join(', '),
                message: formData.get('message')
            };
            
            // Urgence prefix
            const urgencyPrefix = data.urgency === 'urgent' ? '🚨 URGENT - ' :
                                 data.urgency === 'quick' ? '⚡ RAPIDE - ' : '🏠 ';
            
            // Création du lien mailto
            const subject = encodeURIComponent(\`\${urgencyPrefix}Demande Artisan - \${data.firstName} \${data.lastName} - \${data.city}\`);
            const body = encodeURIComponent(
                \`Nouvelle demande de devis artisan\\n\\n\` +
                \`👤 CLIENT:\\n\` +
                \`Nom: \${data.firstName} \${data.lastName}\\n\` +
                \`Téléphone: \${data.phone}\\n\` +
                \`Email: \${data.email || 'Non renseigné'}\\n\` +
                \`Ville: \${data.city}\\n\` +
                \`Urgence: \${data.urgency}\\n\\n\` +
                \`🏠 SERVICES DEMANDÉS:\\n\${data.services}\\n\\n\` +
                \`📝 DESCRIPTION DU PROJET:\\n\${data.message}\\n\\n\` +
                \`---\\nDemande artisan envoyée depuis \${window.location.hostname}\`
            );
            
            // Ouvrir le client email
            window.location.href = \`mailto:${data.email}?subject=\${subject}&body=\${body}\`;
            
            // Message de confirmation
            alert('✅ Merci pour votre confiance !\\n\\nVotre client email va s\\'ouvrir pour finaliser l\\'envoi.\\n\\nNous vous répondrons personnellement sous 24h.');
            
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