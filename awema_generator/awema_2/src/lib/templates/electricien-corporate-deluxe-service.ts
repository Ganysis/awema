import { TemplateData } from '../template'
import { NavigationItem } from '../multi-page-generator'
import { PROFESSIONAL_IMAGES } from './ultra-pro-templates'

export function generateElectricienCorporateDeluxeServiceTemplate(data: TemplateData, navigation: NavigationItem[], serviceId: string): string {
  const service = data.services.find(s => s.id === serviceId) || data.services[0]
  const heroImage = PROFESSIONAL_IMAGES.electricien.services[0]
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${service.name} ${data.city} | ${data.companyName} - Solutions Corporate</title>
    <meta name="description" content="${service.name} à ${data.city} par ${data.companyName}. ${service.description} Solutions professionnelles, équipes certifiées RGE, devis gratuit.">
    <meta name="keywords" content="${service.name.toLowerCase()}, électricien corporate ${data.city}, solutions professionnelles, certification RGE">
    
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
        "@type": "ElectricalContractor",
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
        
        .btn-primary {
            background: var(--primary);
            color: var(--bg-white);
            text-decoration: none;
            padding: 0.75rem 1.5rem;
            border-radius: var(--radius);
            font-weight: 600;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .btn-primary:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
        }
        
        /* Service Hero */
        .service-hero {
            position: relative;
            min-height: 70vh;
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, 
                rgba(5, 150, 105, 0.95) 0%, 
                rgba(16, 185, 129, 0.9) 100%
            ), url('${heroImage}');
            background-size: cover;
            background-position: center;
            color: var(--bg-white);
            margin-top: 80px;
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
            color: var(--accent);
        }
        
        .service-hero h1 {
            font-family: 'Roboto Slab', serif;
            font-size: clamp(2.5rem, 6vw, 4rem);
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        
        .service-hero p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            max-width: 600px;
            opacity: 0.95;
        }
        
        .service-badges {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            margin-bottom: 2rem;
        }
        
        .service-badge {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            padding: 0.5rem 1rem;
            border-radius: 50px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            font-weight: 600;
            font-size: 0.875rem;
        }
        
        .cta-buttons {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .btn-hero {
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
        
        .btn-hero:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-xl);
        }
        
        .btn-secondary {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
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
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-2px);
        }
        
        /* Service Content */
        .service-content {
            padding: 6rem 0;
            background: var(--bg-white);
        }
        
        .content-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 4rem;
            align-items: start;
        }
        
        .main-content h2 {
            font-family: 'Roboto Slab', serif;
            font-size: 2rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 1.5rem;
        }
        
        .main-content p {
            color: var(--text-light);
            margin-bottom: 1.5rem;
            font-size: 1.125rem;
            line-height: 1.7;
        }
        
        .features-list {
            list-style: none;
            margin: 2rem 0;
        }
        
        .features-list li {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 1.5rem;
            padding: 1.5rem;
            background: var(--bg);
            border-radius: var(--radius-lg);
            border: 1px solid var(--border);
            transition: var(--transition);
        }
        
        .features-list li:hover {
            transform: translateX(8px);
            box-shadow: var(--shadow);
        }
        
        .features-list li::before {
            content: '✓';
            color: var(--success);
            font-weight: 700;
            font-size: 1.25rem;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: rgba(16, 185, 129, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        
        .features-list li strong {
            color: var(--text);
            display: block;
            margin-bottom: 0.25rem;
        }
        
        .process-section {
            background: var(--bg);
            padding: 4rem 0;
            margin: 4rem 0;
            border-radius: var(--radius-lg);
            border: 1px solid var(--border);
        }
        
        .process-steps {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .process-step {
            text-align: center;
            position: relative;
        }
        
        .process-step::after {
            content: '';
            position: absolute;
            top: 30px;
            right: -1rem;
            width: 2rem;
            height: 2px;
            background: var(--primary);
            opacity: 0.3;
        }
        
        .process-step:last-child::after {
            display: none;
        }
        
        .step-number {
            width: 60px;
            height: 60px;
            background: var(--primary);
            color: var(--bg-white);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.25rem;
            margin: 0 auto 1rem;
        }
        
        .step-title {
            font-weight: 600;
            color: var(--text);
            margin-bottom: 0.5rem;
        }
        
        .step-description {
            color: var(--text-light);
            font-size: 0.875rem;
        }
        
        /* Sidebar */
        .sidebar {
            position: sticky;
            top: 120px;
        }
        
        .quote-card {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: var(--bg-white);
            padding: 2rem;
            border-radius: var(--radius-lg);
            text-align: center;
            box-shadow: var(--shadow-lg);
            margin-bottom: 2rem;
        }
        
        .quote-card h3 {
            font-family: 'Roboto Slab', serif;
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }
        
        .quote-card p {
            margin-bottom: 1.5rem;
            opacity: 0.9;
        }
        
        .price-info {
            background: var(--bg-white);
            border-radius: var(--radius-lg);
            padding: 2rem;
            margin-bottom: 2rem;
            border: 1px solid var(--border);
            box-shadow: var(--shadow);
        }
        
        .price-info h4 {
            color: var(--primary);
            font-weight: 700;
            margin-bottom: 1rem;
            font-family: 'Roboto Slab', serif;
        }
        
        .price-range {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 0.5rem;
        }
        
        .price-note {
            font-size: 0.875rem;
            color: var(--text-light);
        }
        
        .certifications-sidebar {
            background: var(--bg-white);
            border-radius: var(--radius-lg);
            padding: 2rem;
            border: 1px solid var(--border);
            box-shadow: var(--shadow);
        }
        
        .certifications-sidebar h4 {
            color: var(--text);
            font-weight: 700;
            margin-bottom: 1rem;
            font-family: 'Roboto Slab', serif;
        }
        
        .cert-list {
            list-style: none;
        }
        
        .cert-list li {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.75rem;
            color: var(--text-light);
        }
        
        .cert-list li::before {
            content: '🏆';
            font-size: 1rem;
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
                min-height: 60vh;
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
            
            .process-steps {
                grid-template-columns: 1fr;
            }
            
            .process-step::after {
                display: none;
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
                    Devis Gratuit
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
                
                <h1>${service.name} ${data.city}</h1>
                <p>${service.detailedDescription}</p>
                
                <div class="service-badges">
                    <span class="service-badge">🏆 Certifié RGE</span>
                    <span class="service-badge">⚡ Intervention Rapide</span>
                    <span class="service-badge">🛡️ Garantie Décennale</span>
                    <span class="service-badge">💰 Devis Gratuit</span>
                </div>
                
                <div class="cta-buttons">
                    <a href="tel:${data.phone}" class="btn-hero">
                        📞 Appel Immédiat
                    </a>
                    <a href="#devis" class="btn-secondary">
                        💼 Devis Corporate
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
                    <h2>Expert en ${service.name} à ${data.city}</h2>
                    <p>
                        ${data.companyName} est votre partenaire privilégié pour ${service.name.toLowerCase()} à ${data.city}. 
                        Notre expertise reconnue et nos solutions innovantes garantissent des résultats exceptionnels 
                        pour tous vos projets électriques professionnels.
                    </p>
                    
                    <p>
                        Équipe certifiée RGE, matériaux premium, respect des normes NF C 15-100, 
                        nous mettons notre savoir-faire technique au service de votre réussite.
                    </p>
                    
                    <h2>Nos Prestations ${service.name}</h2>
                    <ul class="features-list">
                        <li>
                            <div>
                                <strong>Diagnostic Professionnel Complet</strong><br>
                                Analyse technique approfondie de vos besoins avec rapport détaillé et recommandations personnalisées.
                            </div>
                        </li>
                        <li>
                            <div>
                                <strong>Solution Sur-Mesure</strong><br>
                                Conception et réalisation adaptées à votre environnement et vos contraintes spécifiques.
                            </div>
                        </li>
                        <li>
                            <div>
                                <strong>Installation Premium</strong><br>
                                Mise en œuvre selon les standards les plus élevés avec matériaux certifiés et équipes spécialisées.
                            </div>
                        </li>
                        <li>
                            <div>
                                <strong>Contrôle Qualité Rigoureux</strong><br>
                                Vérifications complètes et tests de performance pour garantir la conformité et la sécurité.
                            </div>
                        </li>
                        <li>
                            <div>
                                <strong>Suivi et Maintenance</strong><br>
                                Service après-vente réactif et contrats de maintenance préventive pour optimiser la durabilité.
                            </div>
                        </li>
                    </ul>
                    
                    <div class="process-section">
                        <div class="container">
                            <h2 style="text-align: center; margin-bottom: 1rem;">Notre Processus d'Excellence</h2>
                            <p style="text-align: center; color: var(--text-light); margin-bottom: 2rem;">
                                Méthode éprouvée pour garantir votre satisfaction à chaque étape
                            </p>
                            
                            <div class="process-steps">
                                <div class="process-step">
                                    <div class="step-number">1</div>
                                    <h4 class="step-title">Évaluation</h4>
                                    <p class="step-description">Analyse technique et étude de faisabilité</p>
                                </div>
                                <div class="process-step">
                                    <div class="step-number">2</div>
                                    <h4 class="step-title">Conception</h4>
                                    <p class="step-description">Plans détaillés et solutions optimisées</p>
                                </div>
                                <div class="process-step">
                                    <div class="step-number">3</div>
                                    <h4 class="step-title">Réalisation</h4>
                                    <p class="step-description">Installation par équipes certifiées</p>
                                </div>
                                <div class="process-step">
                                    <div class="step-number">4</div>
                                    <h4 class="step-title">Validation</h4>
                                    <p class="step-description">Tests et mise en service complète</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <h2>Pourquoi Choisir ${data.companyName} ?</h2>
                    <p>
                        Entreprise certifiée RGE avec plus de 15 ans d'expérience dans le domaine électrique. 
                        Nous intervenons sur ${data.serviceCities.join(', ')} avec des équipes spécialisées 
                        et un service client d'exception.
                    </p>
                    
                    <p>
                        Nos certifications (RGE, Qualibat, FFIE) et notre approche corporate garantissent 
                        des prestations conformes aux exigences les plus strictes. Devis gratuit et sans engagement.
                    </p>
                </div>
                
                <div class="sidebar">
                    <!-- Carte Devis -->
                    <div class="quote-card">
                        <h3>Devis Corporate</h3>
                        <p>Solution personnalisée sous 24h</p>
                        <a href="tel:${data.phone}" class="btn-hero" style="background: var(--bg-white); color: var(--primary);">
                            📞 ${data.phone}
                        </a>
                    </div>
                    
                    <!-- Info Prix -->
                    <div class="price-info">
                        <h4>💰 Tarification</h4>
                        <div class="price-range">${service.price}</div>
                        <div class="price-note">
                            Tarif indicatif - Devis personnalisé gratuit selon vos besoins spécifiques
                        </div>
                    </div>
                    
                    <!-- Certifications -->
                    <div class="certifications-sidebar">
                        <h4>🏆 Nos Certifications</h4>
                        <ul class="cert-list">
                            <li>Certification RGE</li>
                            <li>Label Qualibat</li>
                            <li>Membre FFIE</li>
                            <li>Garantie Décennale</li>
                            <li>Assurance RC Pro</li>
                        </ul>
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
            item.style.transform = 'translateY(30px)';
            item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(item);
        });
    </script>
</body>
</html>`
}