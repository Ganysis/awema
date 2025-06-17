import { TemplateData } from '../template'
import { NavigationItem } from '../multi-page-generator'
import { PROFESSIONAL_IMAGES } from './ultra-pro-templates'

export function generateElectricienArtisanModerneServiceTemplate(data: TemplateData, navigation: NavigationItem[], serviceId: string): string {
  const service = data.services.find(s => s.id === serviceId) || data.services[0]
  const heroImage = PROFESSIONAL_IMAGES.electricien.services[0]
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${service.name} ${data.city} | ${data.companyName} - Artisan Électricien</title>
    <meta name="description" content="${service.name} à ${data.city} par ${data.companyName}. ${service.description} Savoir-faire artisanal, entreprise familiale, devis gratuit.">
    <meta name="keywords" content="${service.name.toLowerCase()}, électricien artisan ${data.city}, savoir-faire familial, tradition">
    
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
        
        .nav-link:hover::after {
            width: 80%;
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
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
            background: linear-gradient(135deg, var(--primary-dark), var(--primary));
        }
        
        /* Service Hero */
        .service-hero {
            position: relative;
            min-height: 70vh;
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, 
                rgba(139, 90, 60, 0.9) 0%, 
                rgba(212, 151, 76, 0.8) 100%
            ), url('${heroImage}');
            background-size: cover;
            background-position: center;
            color: var(--bg-white);
            margin-top: 83px;
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
            font-family: 'Merriweather', serif;
            font-size: clamp(2.5rem, 6vw, 4rem);
            font-weight: 900;
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
            border: 2px solid rgba(255, 255, 255, 0.2);
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
            font-family: 'Merriweather', serif;
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
            background: var(--bg-warm);
            border-radius: var(--radius-lg);
            border: 2px solid transparent;
            transition: var(--transition);
        }
        
        .features-list li:hover {
            border-color: var(--accent);
            transform: translateX(8px);
            box-shadow: var(--shadow);
        }
        
        .features-list li::before {
            content: '🔨';
            font-size: 1.5rem;
            flex-shrink: 0;
        }
        
        .features-list li strong {
            color: var(--text);
            display: block;
            margin-bottom: 0.25rem;
        }
        
        .tradition-section {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: var(--bg-white);
            padding: 3rem;
            border-radius: var(--radius-lg);
            margin: 3rem 0;
            text-align: center;
        }
        
        .tradition-section h3 {
            font-family: 'Merriweather', serif;
            font-size: 1.75rem;
            margin-bottom: 1rem;
        }
        
        .tradition-section p {
            margin-bottom: 2rem;
            opacity: 0.95;
        }
        
        .tradition-features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
        }
        
        .tradition-feature {
            background: rgba(255, 255, 255, 0.1);
            padding: 1rem;
            border-radius: var(--radius);
            text-align: center;
        }
        
        .tradition-feature-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            display: block;
        }
        
        .tradition-feature-text {
            font-size: 0.875rem;
            font-weight: 600;
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
            position: relative;
            overflow: hidden;
        }
        
        .quote-card::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 100%;
            height: 100%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="white" opacity="0.1"/></svg>');
            background-size: 20px 20px;
        }
        
        .quote-card h3 {
            font-family: 'Merriweather', serif;
            font-size: 1.5rem;
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
        
        .artisan-info {
            background: var(--bg-white);
            border-radius: var(--radius-lg);
            padding: 2rem;
            margin-bottom: 2rem;
            border: 3px solid var(--accent);
            box-shadow: var(--shadow);
        }
        
        .artisan-info h4 {
            color: var(--primary);
            font-family: 'Merriweather', serif;
            font-weight: 700;
            margin-bottom: 1rem;
        }
        
        .artisan-features {
            list-style: none;
        }
        
        .artisan-features li {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
            color: var(--text-light);
        }
        
        .artisan-features li::before {
            content: '🏠';
            font-size: 1rem;
        }
        
        .price-info {
            background: var(--bg-warm);
            border-radius: var(--radius-lg);
            padding: 2rem;
            border: 2px solid var(--border);
            box-shadow: var(--shadow-sm);
        }
        
        .price-info h4 {
            color: var(--primary);
            font-family: 'Merriweather', serif;
            font-weight: 700;
            margin-bottom: 1rem;
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
            
            .tradition-features {
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
                    <span class="service-badge">🏠 Savoir-Faire Artisanal</span>
                    <span class="service-badge">⚡ Intervention Rapide</span>
                    <span class="service-badge">🔨 Tradition Familiale</span>
                    <span class="service-badge">💰 Devis Gratuit</span>
                </div>
                
                <div class="cta-buttons">
                    <a href="tel:${data.phone}" class="btn-hero">
                        📞 Appel Direct
                    </a>
                    <a href="#devis" class="btn-secondary">
                        🏠 Devis Artisan
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
                    <h2>Votre Artisan Électricien à ${data.city}</h2>
                    <p>
                        ${data.companyName} perpétue une tradition familiale dans le domaine électrique depuis plusieurs générations. 
                        Notre savoir-faire artisanal et notre proximité avec nos clients font de nous le partenaire idéal 
                        pour tous vos projets en ${service.name.toLowerCase()}.
                    </p>
                    
                    <div class="artisan-quote">
                        "Chaque installation est unique, comme chaque client. C'est cette approche personnalisée 
                        qui fait la différence entre un travail industriel et un véritable savoir-faire artisanal."
                        <cite>— ${data.ownerName}, Artisan Électricien</cite>
                    </div>
                    
                    <h2>Notre Approche Artisanale</h2>
                    <ul class="features-list">
                        <li>
                            <div>
                                <strong>Écoute et Conseil Personnalisé</strong><br>
                                Prise en compte de vos besoins spécifiques avec des conseils adaptés à votre situation et votre budget.
                            </div>
                        </li>
                        <li>
                            <div>
                                <strong>Savoir-Faire Traditionnel</strong><br>
                                Techniques éprouvées transmises de génération en génération, alliant tradition et innovations modernes.
                            </div>
                        </li>
                        <li>
                            <div>
                                <strong>Matériaux de Qualité</strong><br>
                                Sélection rigoureuse de composants durables et fiables pour garantir la longévité de votre installation.
                            </div>
                        </li>
                        <li>
                            <div>
                                <strong>Finitions Soignées</strong><br>
                                Attention portée aux détails et aux finitions pour un résultat esthétique et professionnel.
                            </div>
                        </li>
                        <li>
                            <div>
                                <strong>Suivi Personnalisé</strong><br>
                                Relation de confiance durable avec un suivi personnalisé et des conseils d'entretien.
                            </div>
                        </li>
                    </ul>
                    
                    <div class="tradition-section">
                        <h3>🏠 Tradition & Modernité</h3>
                        <p>
                            Notre entreprise familiale allie les valeurs traditionnelles de l'artisanat aux 
                            technologies modernes pour vous offrir le meilleur des deux mondes.
                        </p>
                        
                        <div class="tradition-features">
                            <div class="tradition-feature">
                                <span class="tradition-feature-icon">👨‍👦‍👦</span>
                                <div class="tradition-feature-text">Entreprise Familiale</div>
                            </div>
                            <div class="tradition-feature">
                                <span class="tradition-feature-icon">🤝</span>
                                <div class="tradition-feature-text">Relation de Confiance</div>
                            </div>
                            <div class="tradition-feature">
                                <span class="tradition-feature-icon">🏆</span>
                                <div class="tradition-feature-text">Qualité Garantie</div>
                            </div>
                            <div class="tradition-feature">
                                <span class="tradition-feature-icon">📍</span>
                                <div class="tradition-feature-text">Proximité Locale</div>
                            </div>
                        </div>
                    </div>
                    
                    <h2>Pourquoi Choisir ${data.companyName} ?</h2>
                    <p>
                        En choisissant notre entreprise familiale, vous bénéficiez d'une approche artisanale authentique. 
                        Nous intervenons sur ${data.serviceCities.join(', ')} avec la même exigence de qualité 
                        et le même souci du détail qui caractérisent notre métier depuis des générations.
                    </p>
                    
                    <p>
                        Notre réputation s'est construite sur la satisfaction de nos clients et le bouche-à-oreille. 
                        Chaque chantier est pour nous l'occasion de confirmer notre expertise et votre confiance.
                    </p>
                </div>
                
                <div class="sidebar">
                    <!-- Carte Devis -->
                    <div class="quote-card">
                        <h3>Devis Artisan</h3>
                        <p>Conseil personnalisé et devis gratuit</p>
                        <a href="tel:${data.phone}" class="btn-hero" style="background: var(--bg-white); color: var(--primary);">
                            📞 ${data.phone}
                        </a>
                    </div>
                    
                    <!-- Info Artisan -->
                    <div class="artisan-info">
                        <h4>🏠 Votre Artisan Local</h4>
                        <ul class="artisan-features">
                            <li>Entreprise familiale</li>
                            <li>Savoir-faire traditionnel</li>
                            <li>Proximité et confiance</li>
                            <li>Finitions soignées</li>
                            <li>Conseil personnalisé</li>
                        </ul>
                    </div>
                    
                    <!-- Info Prix -->
                    <div class="price-info">
                        <h4>💰 Tarification</h4>
                        <div class="price-range">${service.price}</div>
                        <div class="price-note">
                            Tarif artisan transparent - Devis détaillé gratuit selon vos besoins
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
            item.style.transform = 'translateY(30px)';
            item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(item);
        });
    </script>
</body>
</html>`
}