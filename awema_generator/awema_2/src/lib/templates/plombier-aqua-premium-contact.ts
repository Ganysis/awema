import { TemplateData } from '../template'
import { NavigationItem } from '../multi-page-generator'

export function generatePlombierAquaPremiumContactTemplate(data: TemplateData, navigation: NavigationItem[]): string {
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact ${data.companyName} - Plombier Premium ${data.city} | Consultation Aqua Luxe</title>
    <meta name="description" content="Contactez ${data.companyName}, plombier premium à ${data.city}. Consultation aqua luxe, solutions premium, service d'exception 24h/7j. Appelez le ${data.phone}.">
    <meta name="keywords" content="contact plombier premium ${data.city}, consultation aqua luxe, ${data.companyName}, service premium">
    
    <!-- SEO Avancé -->
    <meta property="og:title" content="Contact ${data.companyName} - Plombier Premium ${data.city}">
    <meta property="og:description" content="Contactez votre plombier premium. Consultation aqua luxe et solutions sur-mesure d'exception.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://${data.domain}/contact.html">
    
    <!-- Schema.org Contact -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "mainEntity": {
        "@type": "Plumber",
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
        
        .nav-link.active {
            color: var(--primary);
            background: var(--bg-aqua);
        }
        
        .nav-link:hover {
            color: var(--primary);
            background: var(--bg-aqua);
        }
        
        .contact-phone {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            color: var(--text);
            text-decoration: none;
            font-weight: 700;
            padding: 1rem 1.5rem;
            border-radius: var(--radius);
            transition: var(--transition);
            border: 2px solid var(--border-aqua);
        }
        
        .contact-phone:hover {
            color: var(--primary);
            border-color: var(--primary);
            transform: translateY(-3px);
            box-shadow: var(--shadow);
        }
        
        .btn-primary {
            background: linear-gradient(135deg, var(--accent), var(--aqua));
            color: var(--bg-white);
            text-decoration: none;
            padding: 1rem 2rem;
            border-radius: var(--radius-lg);
            font-weight: 700;
            transition: var(--transition);
            box-shadow: var(--shadow);
            border: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .btn-primary:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-xl);
        }
        
        /* Contact Hero */
        .contact-hero {
            background: linear-gradient(135deg, 
                rgba(8, 145, 178, 0.95) 0%, 
                rgba(6, 182, 212, 0.9) 35%, 
                rgba(34, 211, 238, 0.85) 65%,
                rgba(103, 232, 249, 0.8) 100%
            );
            color: var(--bg-white);
            padding: 10rem 0 5rem;
            text-align: center;
            margin-top: 90px;
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
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="luxury" width="80" height="80" patternUnits="userSpaceOnUse"><circle cx="40" cy="40" r="2" fill="white" opacity="0.1"/><circle cx="20" cy="20" r="1" fill="white" opacity="0.1"/><circle cx="60" cy="60" r="1.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23luxury)"/></svg>');
            opacity: 0.5;
        }
        
        .contact-hero-content {
            position: relative;
            z-index: 2;
        }
        
        .contact-hero h1 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(3.5rem, 10vw, 6rem);
            font-weight: 900;
            line-height: 1.1;
            margin-bottom: 2rem;
            text-shadow: 0 8px 30px rgba(0,0,0,0.4);
        }
        
        .contact-hero p {
            font-size: 1.375rem;
            margin-bottom: 3.5rem;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            opacity: 0.95;
            line-height: 1.8;
        }
        
        .hero-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2.5rem;
            margin-top: 4rem;
        }
        
        .stat-item {
            text-align: center;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-radius: var(--radius-lg);
            border: 2px solid rgba(255, 255, 255, 0.2);
            transition: var(--transition);
        }
        
        .stat-item:hover {
            transform: translateY(-5px);
            border-color: rgba(255, 255, 255, 0.4);
        }
        
        .stat-number {
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            font-weight: 900;
            color: var(--aqua-light);
            margin-bottom: 0.75rem;
        }
        
        .stat-label {
            font-size: 1rem;
            opacity: 0.9;
            font-weight: 600;
        }
        
        /* Contact Main */
        .contact-main {
            padding: 8rem 0;
            background: var(--bg-white);
        }
        
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5rem;
            align-items: start;
        }
        
        .contact-info {
            position: sticky;
            top: 140px;
        }
        
        .contact-info h2 {
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            font-weight: 800;
            color: var(--text);
            margin-bottom: 2rem;
            line-height: 1.2;
        }
        
        .contact-info p {
            color: var(--text-light);
            font-size: 1.125rem;
            margin-bottom: 3rem;
            line-height: 1.8;
        }
        
        .aqua-quote {
            background: linear-gradient(135deg, var(--bg-aqua), var(--bg-premium));
            border-left: 6px solid var(--primary);
            padding: 2.5rem;
            margin: 2.5rem 0;
            border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
            position: relative;
            overflow: hidden;
        }
        
        .aqua-quote::before {
            content: '💧';
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 4rem;
            opacity: 0.2;
        }
        
        .aqua-quote p {
            font-style: italic;
            color: var(--deep);
            font-size: 1.125rem;
            margin-bottom: 1rem;
            font-weight: 500;
        }
        
        .aqua-quote cite {
            display: block;
            font-weight: 700;
            color: var(--primary);
            font-style: normal;
        }
        
        .contact-methods {
            display: grid;
            gap: 2rem;
            margin-bottom: 3rem;
        }
        
        .contact-method {
            display: flex;
            align-items: center;
            gap: 2rem;
            padding: 2.5rem;
            background: var(--bg-aqua);
            border-radius: var(--radius-lg);
            border: 3px solid transparent;
            transition: var(--transition);
            cursor: pointer;
            box-shadow: var(--shadow-sm);
        }
        
        .contact-method:hover {
            border-color: var(--aqua-light);
            transform: translateY(-5px);
            box-shadow: var(--shadow);
        }
        
        .contact-method-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border-radius: var(--radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: var(--bg-white);
            flex-shrink: 0;
            box-shadow: var(--shadow);
        }
        
        .contact-method-info h3 {
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 0.75rem;
            font-size: 1.25rem;
        }
        
        .contact-method-info p {
            color: var(--text-light);
            margin: 0;
            line-height: 1.6;
        }
        
        .contact-method-info a {
            color: var(--primary);
            text-decoration: none;
            font-weight: 700;
        }
        
        .contact-method-info a:hover {
            text-decoration: underline;
        }
        
        .opening-hours {
            background: linear-gradient(135deg, var(--success), #047857);
            color: var(--bg-white);
            padding: 2.5rem;
            border-radius: var(--radius-lg);
            margin-bottom: 2rem;
            position: relative;
            overflow: hidden;
        }
        
        .opening-hours::before {
            content: '⏰';
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 3rem;
            opacity: 0.3;
        }
        
        .opening-hours h3 {
            font-family: 'Playfair Display', serif;
            font-weight: 800;
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
        }
        
        .hours-list {
            list-style: none;
        }
        
        .hours-list li {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.75rem;
            padding-bottom: 0.75rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            font-weight: 500;
        }
        
        .hours-list li:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        
        .premium-service {
            background: linear-gradient(135deg, var(--accent), var(--aqua));
            color: var(--bg-white);
            padding: 2.5rem;
            border-radius: var(--radius-lg);
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .premium-service::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></svg>');
            background-size: 20px 20px;
            animation: float 15s linear infinite;
        }
        
        @keyframes float {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        .premium-service h3 {
            font-family: 'Playfair Display', serif;
            font-weight: 800;
            margin-bottom: 1rem;
            font-size: 1.5rem;
            position: relative;
            z-index: 2;
        }
        
        .premium-service p {
            margin-bottom: 1.5rem;
            position: relative;
            z-index: 2;
        }
        
        .premium-phone {
            display: inline-flex;
            align-items: center;
            gap: 1rem;
            background: var(--bg-white);
            color: var(--primary);
            padding: 1.25rem 2rem;
            border-radius: var(--radius-lg);
            text-decoration: none;
            font-weight: 800;
            font-size: 1.125rem;
            transition: var(--transition);
            box-shadow: var(--shadow);
            position: relative;
            z-index: 2;
        }
        
        .premium-phone:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-lg);
        }
        
        /* Contact Form */
        .contact-form {
            background: var(--bg-white);
            border-radius: var(--radius-lg);
            padding: 3.5rem;
            box-shadow: var(--shadow-xl);
            border: 3px solid var(--aqua-light);
            position: relative;
            overflow: hidden;
        }
        
        .contact-form::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(135deg, var(--primary), var(--aqua));
        }
        
        .form-header {
            text-align: center;
            margin-bottom: 3rem;
        }
        
        .form-header h2 {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--primary);
            margin-bottom: 1rem;
        }
        
        .form-header p {
            color: var(--text-light);
            font-size: 1.125rem;
        }
        
        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .form-group {
            margin-bottom: 2rem;
        }
        
        .form-group.full-width {
            grid-column: span 2;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.75rem;
            font-weight: 700;
            color: var(--text);
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 1.25rem 1.5rem;
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
            box-shadow: 0 0 0 4px rgba(8, 145, 178, 0.1);
        }
        
        .form-group textarea {
            resize: vertical;
            min-height: 140px;
        }
        
        .form-services {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .service-checkbox {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.25rem;
            background: var(--bg-aqua);
            border-radius: var(--radius);
            border: 3px solid transparent;
            transition: var(--transition);
            cursor: pointer;
        }
        
        .service-checkbox:hover {
            border-color: var(--aqua-light);
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
            margin-top: 3rem;
        }
        
        .btn-submit {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: var(--bg-white);
            border: none;
            padding: 1.5rem 4rem;
            border-radius: var(--radius-lg);
            font-weight: 800;
            font-size: 1.125rem;
            transition: var(--transition);
            box-shadow: var(--shadow-xl);
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 1rem;
            font-family: inherit;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .btn-submit:hover {
            transform: translateY(-4px);
            box-shadow: 0 30px 60px -10px rgba(8, 145, 178, 0.4);
        }
        
        .btn-submit:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
        }
        
        /* Service Areas */
        .service-areas {
            padding: 8rem 0;
            background: var(--bg-aqua);
        }
        
        .service-areas h2 {
            text-align: center;
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            font-weight: 800;
            color: var(--text);
            margin-bottom: 1.5rem;
        }
        
        .service-areas p {
            text-align: center;
            color: var(--text-light);
            font-size: 1.125rem;
            margin-bottom: 4rem;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.8;
        }
        
        .cities-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
        }
        
        .city-item {
            background: var(--bg-white);
            padding: 2.5rem;
            border-radius: var(--radius-lg);
            text-align: center;
            border: 3px solid transparent;
            transition: var(--transition);
            cursor: pointer;
            box-shadow: var(--shadow-sm);
            position: relative;
            overflow: hidden;
        }
        
        .city-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(135deg, var(--primary), var(--aqua));
            transform: scaleX(0);
            transition: var(--transition);
        }
        
        .city-item:hover {
            border-color: var(--aqua-light);
            transform: translateY(-5px);
            box-shadow: var(--shadow);
        }
        
        .city-item:hover::before {
            transform: scaleX(1);
        }
        
        .city-item::after {
            content: '💧';
            font-size: 3rem;
            display: block;
            margin-bottom: 1rem;
        }
        
        .city-item h3 {
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 0.75rem;
            font-size: 1.25rem;
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
                gap: 4rem;
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
                padding: 8rem 0 4rem;
            }
            
            .hero-stats {
                grid-template-columns: 1fr 1fr;
                gap: 1.5rem;
            }
            
            .form-grid {
                grid-template-columns: 1fr;
            }
            
            .form-group.full-width {
                grid-column: span 1;
            }
            
            .contact-form {
                padding: 2.5rem 2rem;
            }
            
            .cities-grid {
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
                        💧 ${data.phone}
                    </a>
                    <a href="#contact-form" class="btn-primary">
                        Consultation Premium
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- Contact Hero -->
    <section class="contact-hero">
        <div class="container">
            <div class="contact-hero-content">
                <h1>Consultation Aqua Premium</h1>
                <p>
                    Votre expert en solutions aquatiques d'exception. Consultation personnalisée, 
                    technologies de pointe et service premium 24h/7j pour sublimer votre expérience aquatique.
                </p>
                
                <div class="hero-stats">
                    <div class="stat-item">
                        <div class="stat-number">< 1h</div>
                        <div class="stat-label">Réponse Premium</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">24h/7j</div>
                        <div class="stat-label">Service d'Exception</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">10+</div>
                        <div class="stat-label">Années d'Excellence</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">100%</div>
                        <div class="stat-label">Satisfaction Premium</div>
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
                    <h2>Votre Expert Aqua Premium</h2>
                    <p>
                        Besoin d'un spécialiste en solutions aquatiques premium ? 
                        ${data.companyName} transforme vos projets en expériences d'exception. 
                        Contactez-nous pour une consultation personnalisée et découvrez l'excellence aquatique.
                    </p>
                    
                    <div class="aqua-quote">
                        <p>
                            "Chaque projet aquatique est unique et mérite une approche sur-mesure. 
                            Nous créons des solutions d'exception qui dépassent vos attentes."
                        </p>
                        <cite>— ${data.ownerName}, Expert Aqua Premium</cite>
                    </div>
                    
                    <div class="contact-methods">
                        <div class="contact-method" onclick="window.location.href='tel:${data.phone}'">
                            <div class="contact-method-icon">💧</div>
                            <div class="contact-method-info">
                                <h3>Ligne Premium Directe</h3>
                                <p><a href="tel:${data.phone}">${data.phone}</a></p>
                                <p>Consultation immédiate avec l'expert</p>
                            </div>
                        </div>
                        
                        <div class="contact-method" onclick="window.location.href='mailto:${data.email}'">
                            <div class="contact-method-icon">📧</div>
                            <div class="contact-method-info">
                                <h3>Email Premium</h3>
                                <p><a href="mailto:${data.email}">${data.email}</a></p>
                                <p>Réponse personnalisée sous 1h</p>
                            </div>
                        </div>
                        
                        <div class="contact-method">
                            <div class="contact-method-icon">🌍</div>
                            <div class="contact-method-info">
                                <h3>Zone Premium</h3>
                                <p>${data.city} et région étendue</p>
                                <p>+${data.serviceCities.length} villes couvertes</p>
                            </div>
                        </div>
                        
                        <div class="contact-method">
                            <div class="contact-method-icon">⭐</div>
                            <div class="contact-method-info">
                                <h3>Service d'Exception</h3>
                                <p>Solutions premium sur-mesure</p>
                                <p>Consultation personnalisée incluse</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Horaires -->
                    <div class="opening-hours">
                        <h3>Horaires Premium</h3>
                        <ul class="hours-list">
                            <li><span>Lundi - Vendredi</span><span>7h00 - 20h00</span></li>
                            <li><span>Samedi</span><span>8h00 - 19h00</span></li>
                            <li><span>Dimanche</span><span>Service premium disponible</span></li>
                        </ul>
                    </div>
                    
                    <!-- Service Premium -->
                    <div class="premium-service">
                        <h3>🚨 Service Premium 24h/7j</h3>
                        <p>Urgence aquatique, panne critique, projet express ? Notre équipe premium intervient immédiatement sur ${data.city} et région.</p>
                        <a href="tel:${data.phone}" class="premium-phone">
                            💧 Urgence Premium : ${data.phone}
                        </a>
                    </div>
                </div>
                
                <!-- Formulaire Contact -->
                <div class="contact-form" id="contact-form">
                    <div class="form-header">
                        <h2>🌊 Consultation Aqua Premium</h2>
                        <p>Solutions sur-mesure - Réponse sous 1h</p>
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
                                <label for="city">Zone d'intervention *</label>
                                <select id="city" name="city" required>
                                    <option value="">Sélectionnez votre zone</option>
                                    ${data.serviceCities.map(city => `<option value="${city}">${city}</option>`).join('')}
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="urgency">Délai souhaité</label>
                                <select id="urgency" name="urgency">
                                    <option value="normal">Dans le mois</option>
                                    <option value="quick">Dans la semaine</option>
                                    <option value="urgent">Express - Sous 48h</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group full-width">
                            <label>Solutions souhaitées</label>
                            <div class="form-services">
                                ${data.services.map(service => `
                                    <label class="service-checkbox">
                                        <input type="checkbox" name="services" value="${service.name}">
                                        <span>${service.name}</span>
                                    </label>
                                `).join('')}
                                <label class="service-checkbox">
                                    <input type="checkbox" name="services" value="Consultation premium">
                                    <span>Consultation premium</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-group full-width">
                            <label for="message">Décrivez votre projet premium *</label>
                            <textarea id="message" name="message" required placeholder="Décrivez votre vision : objectifs, contraintes, inspirations... Notre expert vous accompagnera pour créer une solution d'exception parfaitement adaptée."></textarea>
                        </div>
                        
                        <div class="form-submit">
                            <button type="submit" class="btn-submit">
                                <span>🌊 Envoyer ma Demande Premium</span>
                                <span>💧</span>
                            </button>
                            <p style="margin-top: 1.5rem; color: var(--text-light); font-size: 0.875rem;">
                                Consultation personnalisée avec l'expert • Devis premium gratuit • Solutions sur-mesure
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
            <h2>Nos Zones Premium</h2>
            <p>
                ${data.companyName} étend son expertise aqua premium sur ${data.city} et toute la région. 
                Solutions d'exception, service premium et excellence technique pour tous vos projets aquatiques.
            </p>
            
            <div class="cities-grid">
                ${data.serviceCities.map(city => `
                    <div class="city-item">
                        <h3>${city}</h3>
                        <p>Solutions aqua premium</p>
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
            const urgencyPrefix = data.urgency === 'urgent' ? '🚨 EXPRESS - ' :
                                 data.urgency === 'quick' ? '⚡ RAPIDE - ' : '💧 ';
            
            // Création du lien mailto
            const subject = encodeURIComponent(\`\${urgencyPrefix}Consultation Premium - \${data.firstName} \${data.lastName} - \${data.city}\`);
            const body = encodeURIComponent(
                \`Nouvelle demande de consultation aqua premium\\n\\n\` +
                \`👤 CLIENT PREMIUM:\\n\` +
                \`Nom: \${data.firstName} \${data.lastName}\\n\` +
                \`Téléphone: \${data.phone}\\n\` +
                \`Email: \${data.email || 'Non renseigné'}\\n\` +
                \`Zone: \${data.city}\\n\` +
                \`Urgence: \${data.urgency}\\n\\n\` +
                \`🌊 SOLUTIONS DEMANDÉES:\\n\${data.services}\\n\\n\` +
                \`📝 PROJET PREMIUM:\\n\${data.message}\\n\\n\` +
                \`---\\nConsultation premium envoyée depuis \${window.location.hostname}\`
            );
            
            // Ouvrir le client email
            window.location.href = \`mailto:${data.email}?subject=\${subject}&body=\${body}\`;
            
            // Message de confirmation
            alert('✅ Merci pour votre confiance premium !\\n\\nVotre client email va s\\'ouvrir pour finaliser l\\'envoi.\\n\\nNotre expert vous contactera sous 1h pour votre consultation personnalisée.');
            
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
        
        document.querySelectorAll('.contact-method, .city-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = \`opacity 0.6s ease \${index * 0.1}s, transform 0.6s ease \${index * 0.1}s\`;
            observer.observe(item);
        });
    </script>
</body>
</html>`
}