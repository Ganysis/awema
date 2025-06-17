// Générateur inspiré des layouts Divi Construction ultra-professionnels
const fs = require('fs').promises;
const path = require('path');

// Système de templates inspiré Divi Construction & Industry
const DIVI_CONSTRUCTION_SYSTEM = {
  
  // Page d'accueil - Hero + Services + Projets + CTA
  homepage: (data, design) => `<!DOCTYPE html>
<html lang="fr" class="no-js">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - ${data.trade} professionnel à ${data.city}</title>
    <meta name="description" content="${data.description}">
    <meta name="keywords" content="${data.trade} ${data.city}, ${data.trade.toLowerCase()} professionnel, devis gratuit ${data.trade.toLowerCase()}">
    
    <!-- Schema.org LocalBusiness -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "${data.companyName}",
      "description": "${data.description}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${data.address}",
        "addressLocality": "${data.city}",
        "addressCountry": "FR"
      },
      "telephone": "${data.phone}",
      "email": "${data.email}",
      "url": "${data.website}",
      "priceRange": "€€",
      "serviceArea": "${data.city}",
      "openingHours": "Lundi-Vendredi 8h-19h, Samedi 9h-17h, Urgences 24h/7j"
    }
    </script>
    
    <style>
    :root {
      --primary: ${design.colors.primary};
      --secondary: ${design.colors.secondary};
      --white: #ffffff;
      --gray-50: #f8fafc;
      --gray-100: #f1f5f9;
      --gray-200: #e2e8f0;
      --gray-600: #475569;
      --gray-700: #334155;
      --gray-800: #1e293b;
      --gray-900: #0f172a;
    }
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.6;
      color: var(--gray-800);
      overflow-x: hidden;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 clamp(1rem, 3vw, 2rem);
    }
    
    /* Navigation Divi-style */
    .divi-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      z-index: 1000;
      padding: 1rem 0;
      box-shadow: 0 2px 20px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }
    
    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .nav-logo {
      font-size: clamp(1.5rem, 3vw, 2rem);
      font-weight: 800;
      color: var(--primary);
      text-decoration: none;
    }
    
    .nav-menu {
      display: flex;
      list-style: none;
      gap: clamp(1.5rem, 3vw, 3rem);
    }
    
    .nav-link {
      color: var(--gray-700);
      text-decoration: none;
      font-weight: 600;
      font-size: clamp(0.9rem, 2vw, 1rem);
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
    }
    
    .nav-link:hover, .nav-link.active {
      color: var(--primary);
      background: var(--gray-50);
    }
    
    .nav-cta {
      background: var(--primary);
      color: var(--white);
      padding: clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem);
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: 700;
      font-size: clamp(0.9rem, 2vw, 1rem);
      transition: all 0.3s ease;
    }
    
    .nav-cta:hover {
      background: var(--secondary);
      transform: translateY(-2px);
    }
    
    .nav-toggle {
      display: none;
      flex-direction: column;
      gap: 4px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
    }
    
    .nav-toggle span {
      width: 25px;
      height: 3px;
      background: var(--gray-700);
      transition: all 0.3s ease;
    }
    
    /* Hero Section Divi Construction Style */
    .hero-construction {
      min-height: 100vh;
      background: linear-gradient(135deg, var(--gray-900) 0%, var(--gray-800) 100%);
      position: relative;
      display: flex;
      align-items: center;
      overflow: hidden;
    }
    
    .hero-bg-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&h=1080&fit=crop') center/cover;
      opacity: 0.2;
      z-index: 1;
    }
    
    .hero-content {
      position: relative;
      z-index: 2;
      color: var(--white);
    }
    
    .hero-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: clamp(3rem, 6vw, 6rem);
      align-items: center;
    }
    
    .hero-badge {
      background: var(--primary);
      color: var(--white);
      padding: 0.75rem 2rem;
      border-radius: 3rem;
      display: inline-block;
      font-weight: 700;
      font-size: clamp(0.9rem, 2vw, 1rem);
      margin-bottom: 2rem;
    }
    
    .hero-title {
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 2rem;
    }
    
    .hero-subtitle {
      font-size: clamp(1.2rem, 3vw, 1.8rem);
      font-weight: 300;
      margin-bottom: 1.5rem;
      opacity: 0.9;
    }
    
    .hero-description {
      font-size: clamp(1rem, 2vw, 1.2rem);
      margin-bottom: 3rem;
      opacity: 0.8;
      line-height: 1.7;
    }
    
    .hero-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin: 3rem 0;
    }
    
    .stat-item {
      text-align: center;
      padding: 1.5rem;
      background: rgba(255,255,255,0.1);
      border-radius: 1rem;
      backdrop-filter: blur(10px);
    }
    
    .stat-number {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 900;
      color: var(--primary);
      margin-bottom: 0.5rem;
    }
    
    .stat-label {
      font-size: clamp(0.9rem, 2vw, 1rem);
      opacity: 0.8;
    }
    
    .hero-cta-group {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
    }
    
    .btn-primary {
      background: var(--primary);
      color: var(--white);
      padding: clamp(1rem, 2vw, 1.5rem) clamp(2rem, 4vw, 3rem);
      border-radius: 0.75rem;
      text-decoration: none;
      font-weight: 700;
      font-size: clamp(1rem, 2vw, 1.2rem);
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .btn-primary:hover {
      background: var(--secondary);
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    
    .btn-secondary {
      background: transparent;
      color: var(--white);
      border: 2px solid var(--white);
      padding: clamp(1rem, 2vw, 1.5rem) clamp(2rem, 4vw, 3rem);
      border-radius: 0.75rem;
      text-decoration: none;
      font-weight: 700;
      font-size: clamp(1rem, 2vw, 1.2rem);
      transition: all 0.3s ease;
    }
    
    .btn-secondary:hover {
      background: var(--white);
      color: var(--primary);
    }
    
    .hero-visual {
      position: relative;
    }
    
    .hero-card {
      background: rgba(255,255,255,0.15);
      padding: clamp(2rem, 4vw, 3rem);
      border-radius: 2rem;
      backdrop-filter: blur(15px);
      border: 1px solid rgba(255,255,255,0.2);
    }
    
    .hero-card img {
      width: 100%;
      border-radius: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .hero-card h3 {
      font-size: clamp(1.3rem, 3vw, 1.8rem);
      font-weight: 700;
      margin-bottom: 1rem;
    }
    
    .hero-card p {
      opacity: 0.9;
      font-size: clamp(1rem, 2vw, 1.1rem);
    }
    
    /* Services Section */
    .services-showcase {
      padding: clamp(4rem, 8vw, 8rem) 0;
      background: var(--gray-50);
    }
    
    .section-header {
      text-align: center;
      margin-bottom: clamp(3rem, 6vw, 5rem);
    }
    
    .section-badge {
      background: var(--primary);
      color: var(--white);
      padding: 0.5rem 1.5rem;
      border-radius: 2rem;
      font-weight: 600;
      font-size: clamp(0.9rem, 2vw, 1rem);
      margin-bottom: 1rem;
      display: inline-block;
    }
    
    .section-title {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 900;
      margin-bottom: 1.5rem;
      color: var(--gray-900);
    }
    
    .section-description {
      font-size: clamp(1.1rem, 2vw, 1.3rem);
      color: var(--gray-600);
      max-width: 600px;
      margin: 0 auto;
    }
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: clamp(2rem, 4vw, 3rem);
    }
    
    .service-card {
      background: var(--white);
      border-radius: 1.5rem;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }
    
    .service-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 50px rgba(0,0,0,0.15);
    }
    
    .service-image {
      height: 250px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--white);
    }
    
    .service-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    
    .service-overlay {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(255,255,255,0.2);
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      font-weight: 600;
      backdrop-filter: blur(10px);
    }
    
    .service-content {
      padding: clamp(1.5rem, 3vw, 2.5rem);
    }
    
    .service-title {
      font-size: clamp(1.3rem, 3vw, 1.6rem);
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--gray-900);
    }
    
    .service-description {
      color: var(--gray-600);
      margin-bottom: 2rem;
      line-height: 1.7;
    }
    
    .service-features {
      margin-bottom: 2rem;
    }
    
    .feature-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
      font-size: clamp(0.9rem, 2vw, 1rem);
    }
    
    .feature-check {
      width: 20px;
      height: 20px;
      background: var(--primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--white);
      font-size: 0.75rem;
      font-weight: bold;
    }
    
    .service-price {
      background: var(--gray-50);
      padding: 1.5rem;
      border-radius: 1rem;
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .price-label {
      color: var(--gray-600);
      font-size: clamp(0.9rem, 2vw, 1rem);
    }
    
    .price-value {
      font-size: clamp(1.3rem, 3vw, 1.8rem);
      font-weight: 900;
      color: var(--primary);
    }
    
    .service-cta {
      background: var(--primary);
      color: var(--white);
      padding: 1rem 2rem;
      border-radius: 0.75rem;
      text-decoration: none;
      font-weight: 600;
      text-align: center;
      display: block;
      transition: all 0.3s ease;
    }
    
    .service-cta:hover {
      background: var(--secondary);
      transform: translateY(-2px);
    }
    
    /* Footer */
    .footer-professional {
      background: var(--gray-900);
      color: var(--white);
      padding: clamp(3rem, 6vw, 5rem) 0 clamp(1rem, 2vw, 2rem);
    }
    
    .footer-content {
      text-align: center;
    }
    
    .footer-title {
      font-size: clamp(1.5rem, 3vw, 2rem);
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--primary);
    }
    
    .footer-description {
      opacity: 0.8;
      margin-bottom: 2rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 2rem;
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .footer-copyright {
      opacity: 0.6;
    }
    
    .footer-credits a {
      color: var(--primary);
      text-decoration: none;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .nav-menu {
        position: fixed;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--white);
        flex-direction: column;
        padding: 2rem;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }
      
      .nav-menu.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }
      
      .nav-toggle {
        display: flex;
      }
      
      .hero-grid {
        grid-template-columns: 1fr;
        text-align: center;
      }
      
      .hero-stats {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      
      .hero-cta-group {
        justify-content: center;
      }
      
      .services-grid {
        grid-template-columns: 1fr;
      }
      
      .footer-bottom {
        flex-direction: column;
        text-align: center;
      }
    }
    
    @media (max-width: 480px) {
      .hero-cta-group {
        flex-direction: column;
        align-items: center;
      }
      
      .btn-primary, .btn-secondary {
        width: 100%;
        text-align: center;
      }
    }
    </style>
</head>

<body>
    <!-- Navigation -->
    <nav class="divi-nav">
        <div class="container">
            <div class="nav-container">
                <a href="index.html" class="nav-logo">${data.companyName}</a>
                <button class="nav-toggle" id="navToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="nav-menu" id="navMenu">
                    <li><a href="index.html" class="nav-link active">Accueil</a></li>
                    <li><a href="services.html" class="nav-link">Services</a></li>
                    <li><a href="a-propos.html" class="nav-link">À propos</a></li>
                    <li><a href="contact.html" class="nav-link">Contact</a></li>
                    <li><a href="tel:${data.phone}" class="nav-cta">📞 ${data.phone}</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-construction">
        <div class="hero-bg-overlay"></div>
        <div class="container">
            <div class="hero-content">
                <div class="hero-grid">
                    <div>
                        <span class="hero-badge">🏗️ ${data.trade} Expert Certifié</span>
                        <h1 class="hero-title">${data.companyName}</h1>
                        <h2 class="hero-subtitle">Excellence ${data.trade.toLowerCase()} à ${data.city}</h2>
                        <p class="hero-description">${data.description}</p>
                        
                        <div class="hero-stats">
                            <div class="stat-item">
                                <div class="stat-number">15+</div>
                                <div class="stat-label">Années d'expérience</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number">500+</div>
                                <div class="stat-label">Projets réalisés</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number">24h/7j</div>
                                <div class="stat-label">Service urgence</div>
                            </div>
                        </div>
                        
                        <div class="hero-cta-group">
                            <a href="contact.html" class="btn-primary">
                                📋 Devis gratuit
                            </a>
                            <a href="tel:${data.phone}" class="btn-secondary">
                                📞 Appeler maintenant
                            </a>
                        </div>
                    </div>
                    
                    <div class="hero-visual">
                        <div class="hero-card">
                            <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop" alt="${data.trade} professionnel">
                            <h3>Expert certifié RGE</h3>
                            <p>Qualifications professionnelles et garanties complètes pour tous vos projets ${data.trade.toLowerCase()}.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services-showcase">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">🔧 Nos Spécialités</span>
                <h2 class="section-title">Services ${data.trade} Professionnels</h2>
                <p class="section-description">
                    Solutions complètes et sur-mesure pour tous vos besoins ${data.trade.toLowerCase()} à ${data.city} et région
                </p>
            </div>
            
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-image">
                        <div>
                            <div class="service-icon">⚡</div>
                            <h3>Installation</h3>
                        </div>
                        <div class="service-overlay">Premium</div>
                    </div>
                    <div class="service-content">
                        <h3 class="service-title">Installation ${data.trade} Complète</h3>
                        <p class="service-description">
                            Installation professionnelle aux normes avec matériel de qualité et garantie décennale incluse.
                        </p>
                        <div class="service-features">
                            <div class="feature-item">
                                <span class="feature-check">✓</span>
                                <span>Devis gratuit et détaillé</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-check">✓</span>
                                <span>Normes professionnelles</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-check">✓</span>
                                <span>Garantie décennale</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-check">✓</span>
                                <span>Matériel premium</span>
                            </div>
                        </div>
                        <div class="service-price">
                            <span class="price-label">À partir de</span>
                            <span class="price-value">85€/h</span>
                        </div>
                        <a href="services.html" class="service-cta">Voir les détails</a>
                    </div>
                </div>
                
                <div class="service-card">
                    <div class="service-image">
                        <div>
                            <div class="service-icon">🚨</div>
                            <h3>Dépannage</h3>
                        </div>
                        <div class="service-overlay">24h/7j</div>
                    </div>
                    <div class="service-content">
                        <h3 class="service-title">Dépannage ${data.trade} Urgence</h3>
                        <p class="service-description">
                            Intervention d'urgence 24h/7j pour toute panne ou problème technique nécessitant une solution rapide.
                        </p>
                        <div class="service-features">
                            <div class="feature-item">
                                <span class="feature-check">✓</span>
                                <span>Intervention sous 1h</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-check">✓</span>
                                <span>Diagnostic gratuit</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-check">✓</span>
                                <span>Disponible 24h/7j</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-check">✓</span>
                                <span>Pièces détachées</span>
                            </div>
                        </div>
                        <div class="service-price">
                            <span class="price-label">Déplacement</span>
                            <span class="price-value">75€</span>
                        </div>
                        <a href="tel:${data.phone}" class="service-cta">Appeler maintenant</a>
                    </div>
                </div>
                
                <div class="service-card">
                    <div class="service-image">
                        <div>
                            <div class="service-icon">🏠</div>
                            <h3>Rénovation</h3>
                        </div>
                        <div class="service-overlay">Sur mesure</div>
                    </div>
                    <div class="service-content">
                        <h3 class="service-title">Rénovation & Mise aux Normes</h3>
                        <p class="service-description">
                            Rénovation complète et mise aux normes de vos installations avec solutions modernes et efficaces.
                        </p>
                        <div class="service-features">
                            <div class="feature-item">
                                <span class="feature-check">✓</span>
                                <span>Étude personnalisée</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-check">✓</span>
                                <span>Conformité CONSUEL</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-check">✓</span>
                                <span>Solutions modernes</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-check">✓</span>
                                <span>Financement possible</span>
                            </div>
                        </div>
                        <div class="service-price">
                            <span class="price-label">Sur devis</span>
                            <span class="price-value">Gratuit</span>
                        </div>
                        <a href="contact.html" class="service-cta">Demander un devis</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer-professional">
        <div class="container">
            <div class="footer-content">
                <h3 class="footer-title">${data.companyName}</h3>
                <p class="footer-description">
                    ${data.trade} professionnel depuis plus de 15 ans. Excellence, qualité et satisfaction client garanties.
                </p>
                
                <div class="footer-bottom">
                    <p class="footer-copyright">
                        © 2025 ${data.companyName}. Tous droits réservés.
                    </p>
                    <p class="footer-credits">
                        Design Divi Construction - <a href="https://claude.ai/code" target="_blank">Claude Code</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script>
        // Navigation mobile
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Fermer le menu au clic sur lien
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
        
        // Smooth scroll pour les ancres
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
        
        console.log('🏗️ Divi Construction Professional homepage loaded successfully!');
    </script>
</body>
</html>`,

  // Page Services détaillée
  servicesPage: (data, design) => `<!DOCTYPE html>
<html lang="fr" class="no-js">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Services ${data.trade} - ${data.companyName} ${data.city}</title>
    <meta name="description" content="Découvrez tous nos services ${data.trade.toLowerCase()} : installation, dépannage, rénovation. Devis gratuit à ${data.city}.">
    
    <!-- Schema.org Service -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Services ${data.trade}",
      "description": "Services ${data.trade.toLowerCase()} complets : installation, dépannage, rénovation",
      "provider": {
        "@type": "LocalBusiness",
        "name": "${data.companyName}",
        "telephone": "${data.phone}",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "${data.city}",
          "addressCountry": "FR"
        }
      },
      "serviceType": "${data.trade}",
      "areaServed": "${data.city}"
    }
    </script>
    
    ${DIVI_CONSTRUCTION_SYSTEM.getSharedCSS(design)}
</head>

<body>
    ${DIVI_CONSTRUCTION_SYSTEM.getNavigation(data)}
    
    <!-- Hero Services -->
    <section class="services-hero" style="padding: 8rem 0 4rem; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); color: var(--white);">
        <div class="container">
            <div class="text-center">
                <span class="hero-badge">🔧 Nos Expertises</span>
                <h1 style="font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 900; margin-bottom: 2rem;">
                    Services ${data.trade} Professionnels
                </h1>
                <p style="font-size: clamp(1.2rem, 3vw, 1.6rem); margin-bottom: 3rem; opacity: 0.9; max-width: 800px; margin-left: auto; margin-right: auto;">
                    Solutions complètes et expertise technique pour tous vos projets ${data.trade.toLowerCase()} à ${data.city}
                </p>
                <a href="contact.html" class="btn-primary">📋 Devis gratuit</a>
            </div>
        </div>
    </section>
    
    <!-- Services Détaillés -->
    <section style="padding: 6rem 0; background: var(--gray-50);">
        <div class="container">
            <div class="services-detailed-grid" style="display: grid; gap: 4rem;">
                
                <!-- Service 1: Installation -->
                <div class="service-detailed" style="background: var(--white); padding: 4rem; border-radius: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <div style="display: grid; grid-template-columns: 1fr 300px; gap: 4rem; align-items: center;">
                        <div>
                            <div style="background: var(--primary); color: var(--white); width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 2rem;">⚡</div>
                            <h2 style="font-size: 2.5rem; font-weight: 900; margin-bottom: 1.5rem; color: var(--gray-900);">Installation ${data.trade} Complète</h2>
                            <p style="font-size: 1.2rem; color: var(--gray-600); margin-bottom: 2rem; line-height: 1.7;">
                                Installation professionnelle aux normes NF avec matériel premium et garantie décennale. Étude personnalisée et respect des délais garantis.
                            </p>
                            
                            <div style="margin: 2rem 0;">
                                <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">✨ Prestations incluses</h3>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                    <div class="feature-item">
                                        <span class="feature-check">✓</span>
                                        <span>Étude technique gratuite</span>
                                    </div>
                                    <div class="feature-item">
                                        <span class="feature-check">✓</span>
                                        <span>Devis détaillé sans engagement</span>
                                    </div>
                                    <div class="feature-item">
                                        <span class="feature-check">✓</span>
                                        <span>Matériel professionnel certifié</span>
                                    </div>
                                    <div class="feature-item">
                                        <span class="feature-check">✓</span>
                                        <span>Mise en service et tests</span>
                                    </div>
                                    <div class="feature-item">
                                        <span class="feature-check">✓</span>
                                        <span>Garantie décennale</span>
                                    </div>
                                    <div class="feature-item">
                                        <span class="feature-check">✓</span>
                                        <span>SAV et maintenance</span>
                                    </div>
                                </div>
                            </div>
                            
                            <a href="contact.html" class="btn-primary">Demander un devis installation</a>
                        </div>
                        
                        <div>
                            <div style="background: linear-gradient(135deg, var(--primary), var(--secondary)); padding: 2rem; border-radius: 1.5rem; color: var(--white); text-align: center; margin-bottom: 1.5rem;">
                                <h4 style="font-size: 1.2rem; margin-bottom: 1rem;">💰 Tarification</h4>
                                <div style="font-size: 2.5rem; font-weight: 900; margin-bottom: 0.5rem;">85€/h</div>
                                <div style="opacity: 0.9;">+ matériel et fournitures</div>
                            </div>
                            
                            <div style="background: var(--gray-100); padding: 2rem; border-radius: 1.5rem;">
                                <h4 style="font-size: 1.2rem; margin-bottom: 1rem; color: var(--gray-900);">🕒 Délais moyens</h4>
                                <div style="margin-bottom: 1rem;">
                                    <strong>Petit projet :</strong> 1-2 jours<br>
                                    <strong>Projet moyen :</strong> 3-7 jours<br>
                                    <strong>Gros projet :</strong> Sur devis
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Service 2: Dépannage -->
                <div class="service-detailed" style="background: var(--white); padding: 4rem; border-radius: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <div style="display: grid; grid-template-columns: 300px 1fr; gap: 4rem; align-items: center;">
                        <div>
                            <div style="background: #dc2626; padding: 2rem; border-radius: 1.5rem; color: var(--white); text-align: center; margin-bottom: 1.5rem;">
                                <div style="font-size: 3rem; margin-bottom: 1rem;">🚨</div>
                                <h4 style="font-size: 1.3rem; margin-bottom: 1rem;">Urgence 24h/7j</h4>
                                <div style="font-size: 1.8rem; font-weight: 900;">75€</div>
                                <div style="opacity: 0.9;">Déplacement</div>
                            </div>
                            
                            <div style="text-align: center;">
                                <a href="tel:${data.phone}" style="background: #dc2626; color: var(--white); padding: 1rem 2rem; border-radius: 0.75rem; text-decoration: none; font-weight: 700; display: inline-block;">📞 Urgence ${data.phone}</a>
                            </div>
                        </div>
                        
                        <div>
                            <div style="background: #dc2626; color: var(--white); width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 2rem;">🚨</div>
                            <h2 style="font-size: 2.5rem; font-weight: 900; margin-bottom: 1.5rem; color: var(--gray-900);">Dépannage ${data.trade} 24h/7j</h2>
                            <p style="font-size: 1.2rem; color: var(--gray-600); margin-bottom: 2rem; line-height: 1.7;">
                                Service d'urgence disponible 24h/24 et 7j/7 pour toute panne ou problème technique. Intervention rapide garantie sous 1h en urgence.
                            </p>
                            
                            <div style="margin: 2rem 0;">
                                <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">⚡ Interventions d'urgence</h3>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                    <div class="feature-item">
                                        <span class="feature-check">✓</span>
                                        <span>Panne électrique totale</span>
                                    </div>
                                    <div class="feature-item">
                                        <span class="feature-check">✓</span>
                                        <span>Disjoncteur qui saute</span>
                                    </div>
                                    <div class="feature-item">
                                        <span class="feature-check">✓</span>
                                        <span>Court-circuit dangereux</span>
                                    </div>
                                    <div class="feature-item">
                                        <span class="feature-check">✓</span>
                                        <span>Problème tableau électrique</span>
                                    </div>
                                    <div class="feature-item">
                                        <span class="feature-check">✓</span>
                                        <span>Diagnostic gratuit</span>
                                    </div>
                                    <div class="feature-item">
                                        <span class="feature-check">✓</span>
                                        <span>Réparation immédiate</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Service 3: Rénovation -->
                <div class="service-detailed" style="background: var(--white); padding: 4rem; border-radius: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <div style="display: grid; grid-template-columns: 1fr 300px; gap: 4rem; align-items: center;">
                        <div>
                            <div style="background: #10b981; color: var(--white); width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 2rem;">🏠</div>
                            <h2 style="font-size: 2.5rem; font-weight: 900; margin-bottom: 1.5rem; color: var(--gray-900);">Rénovation & Mise aux Normes</h2>
                            <p style="font-size: 1.2rem; color: var(--gray-600); margin-bottom: 2rem; line-height: 1.7;">
                                Rénovation complète de vos installations avec mise aux normes CONSUEL. Solutions modernes et performantes pour optimiser votre confort et sécurité.
                            </p>
                            
                            <div style="margin: 2rem 0;">
                                <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">🔧 Services de rénovation</h3>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                    <div class="feature-item">
                                        <span class="feature-check">✓</span>
                                        <span>Audit énergétique gratuit</span>
                                    </div>
                                    <div class="feature-item">
                                        <span class="feature-check">✓</span>
                                        <span>Mise aux normes NF C 15-100</span>
                                    </div>
                                    <div class="feature-item">
                                        <span class="feature-check">✓</span>
                                        <span>Remplacement tableau électrique</span>
                                    </div>
                                    <div class="feature-item">
                                        <span class="feature-check">✓</span>
                                        <span>Installation prises et éclairage</span>
                                    </div>
                                    <div class="feature-item">
                                        <span class="feature-check">✓</span>
                                        <span>Solutions domotiques</span>
                                    </div>
                                    <div class="feature-item">
                                        <span class="feature-check">✓</span>
                                        <span>Financement possible</span>
                                    </div>
                                </div>
                            </div>
                            
                            <a href="contact.html" class="btn-primary">Demander une étude gratuite</a>
                        </div>
                        
                        <div>
                            <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 2rem; border-radius: 1.5rem; color: var(--white); text-align: center; margin-bottom: 1.5rem;">
                                <h4 style="font-size: 1.2rem; margin-bottom: 1rem;">💡 Aides disponibles</h4>
                                <div style="margin-bottom: 1rem;">
                                    <div style="font-weight: 700; margin-bottom: 0.5rem;">MaPrimeRénov'</div>
                                    <div style="opacity: 0.9; font-size: 0.9rem;">Jusqu'à 2000€</div>
                                </div>
                                <div>
                                    <div style="font-weight: 700; margin-bottom: 0.5rem;">CEE</div>
                                    <div style="opacity: 0.9; font-size: 0.9rem;">Certificats d'économie</div>
                                </div>
                            </div>
                            
                            <div style="background: var(--gray-100); padding: 2rem; border-radius: 1.5rem; text-align: center;">
                                <h4 style="font-size: 1.2rem; margin-bottom: 1rem; color: var(--gray-900);">📋 Devis gratuit</h4>
                                <div style="color: var(--gray-600);">Étude personnalisée<br>Sans engagement</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Zone d'intervention -->
            <div style="margin-top: 6rem; background: var(--primary); color: var(--white); padding: 4rem; border-radius: 2rem; text-align: center;">
                <h2 style="font-size: 2.5rem; font-weight: 900; margin-bottom: 2rem;">📍 Zone d'intervention</h2>
                <p style="font-size: 1.3rem; margin-bottom: 3rem; opacity: 0.9;">
                    Nous intervenons à ${data.city} et dans un rayon de 30km
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; max-width: 800px; margin: 0 auto;">
                    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 1rem;">
                        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">⚡</div>
                        <div style="font-weight: 600;">Intervention rapide</div>
                        <div style="opacity: 0.8; font-size: 0.9rem;">Sous 2h en journée</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 1rem;">
                        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🚗</div>
                        <div style="font-weight: 600;">Déplacement inclus</div>
                        <div style="opacity: 0.8; font-size: 0.9rem;">Dans un rayon de 15km</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 1rem;">
                        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📞</div>
                        <div style="font-weight: 600;">Urgence 24h/7j</div>
                        <div style="opacity: 0.8; font-size: 0.9rem;">${data.phone}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    ${DIVI_CONSTRUCTION_SYSTEM.getFooter(data)}
    ${DIVI_CONSTRUCTION_SYSTEM.getScripts()}
</body>
</html>`,

  // Page À propos professionnelle
  aboutPage: (data, design) => `<!DOCTYPE html>
<html lang="fr" class="no-js">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>À propos - ${data.companyName} | ${data.trade} professionnel ${data.city}</title>
    <meta name="description" content="Découvrez ${data.companyName}, ${data.trade.toLowerCase()} professionnel à ${data.city} depuis plus de 15 ans. Expertise, qualité et satisfaction client garanties.">
    
    <!-- Schema.org Organization -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "${data.companyName}",
      "description": "${data.description}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${data.address}",
        "addressLocality": "${data.city}",
        "addressCountry": "FR"
      },
      "telephone": "${data.phone}",
      "email": "${data.email}",
      "url": "${data.website}",
      "foundingDate": "2010",
      "numberOfEmployees": "5-10",
      "slogan": "Excellence ${data.trade.toLowerCase()}, satisfaction client garantie"
    }
    </script>
    
    ${DIVI_CONSTRUCTION_SYSTEM.getSharedCSS(design)}
</head>

<body>
    ${DIVI_CONSTRUCTION_SYSTEM.getNavigation(data)}
    
    <!-- Hero À propos -->
    <section style="padding: 8rem 0 4rem; background: linear-gradient(135deg, var(--gray-900) 0%, var(--primary) 100%); color: var(--white); position: relative;">
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&h=800&fit=crop') center/cover; opacity: 0.1;"></div>
        <div class="container" style="position: relative; z-index: 2;">
            <div class="text-center">
                <span class="hero-badge">👥 Notre Histoire</span>
                <h1 style="font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 900; margin-bottom: 2rem;">
                    À propos de ${data.companyName}
                </h1>
                <p style="font-size: clamp(1.2rem, 3vw, 1.6rem); margin-bottom: 3rem; opacity: 0.9; max-width: 800px; margin-left: auto; margin-right: auto;">
                    Plus de 15 ans d'expertise ${data.trade.toLowerCase()} au service de ${data.city} et sa région
                </p>
            </div>
        </div>
    </section>
    
    <!-- Notre histoire -->
    <section style="padding: 6rem 0; background: var(--white);">
        <div class="container">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center;">
                <div>
                    <h2 style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; margin-bottom: 2rem; color: var(--gray-900);">Notre histoire</h2>
                    <p style="font-size: 1.2rem; color: var(--gray-600); margin-bottom: 2rem; line-height: 1.7;">
                        Fondée en 2010, <strong>${data.companyName}</strong> est née de la passion de fournir des services ${data.trade.toLowerCase()} d'excellence. Notre équipe expérimentée s'engage à respecter les plus hauts standards de qualité et de sécurité.
                    </p>
                    <p style="font-size: 1.2rem; color: var(--gray-600); margin-bottom: 3rem; line-height: 1.7;">
                        Basés à ${data.city}, nous avons développé une expertise reconnue dans l'installation, le dépannage et la rénovation. Notre approche personnalisée nous permet de répondre précisément aux besoins de chaque client.
                    </p>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div style="text-align: center; padding: 2rem; background: var(--gray-50); border-radius: 1rem;">
                            <div style="font-size: 2.5rem; font-weight: 900; color: var(--primary); margin-bottom: 0.5rem;">2010</div>
                            <div style="color: var(--gray-600);">Année de création</div>
                        </div>
                        <div style="text-align: center; padding: 2rem; background: var(--gray-50); border-radius: 1rem;">
                            <div style="font-size: 2.5rem; font-weight: 900; color: var(--primary); margin-bottom: 0.5rem;">500+</div>
                            <div style="color: var(--gray-600);">Projets réalisés</div>
                        </div>
                    </div>
                </div>
                
                <div style="position: relative;">
                    <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=500&fit=crop" alt="Équipe ${data.companyName}" style="width: 100%; border-radius: 2rem; box-shadow: 0 20px 60px rgba(0,0,0,0.2);">
                    <div style="position: absolute; bottom: -30px; right: -30px; background: var(--primary); color: var(--white); padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                        <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem;">Expert certifié</div>
                        <div style="opacity: 0.9;">Qualifications RGE</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Nos valeurs -->
    <section style="padding: 6rem 0; background: var(--gray-50);">
        <div class="container">
            <div class="text-center" style="margin-bottom: 4rem;">
                <h2 style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; margin-bottom: 2rem; color: var(--gray-900);">Nos valeurs</h2>
                <p style="font-size: 1.2rem; color: var(--gray-600); max-width: 600px; margin: 0 auto;">
                    Ce qui nous guide au quotidien dans notre métier de ${data.trade.toLowerCase()}
                </p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem;">
                <div style="background: var(--white); padding: 3rem; border-radius: 2rem; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <div style="width: 80px; height: 80px; background: var(--primary); color: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 2rem;">🎯</div>
                    <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">Excellence</h3>
                    <p style="color: var(--gray-600); line-height: 1.7;">
                        Nous nous engageons à fournir des prestations de la plus haute qualité, en utilisant des matériaux premium et des techniques de pointe.
                    </p>
                </div>
                
                <div style="background: var(--white); padding: 3rem; border-radius: 2rem; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <div style="width: 80px; height: 80px; background: var(--primary); color: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 2rem;">🤝</div>
                    <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">Confiance</h3>
                    <p style="color: var(--gray-600); line-height: 1.7;">
                        Transparence, honnêteté et respect des engagements sont au cœur de notre relation client. Votre satisfaction est notre priorité.
                    </p>
                </div>
                
                <div style="background: var(--white); padding: 3rem; border-radius: 2rem; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <div style="width: 80px; height: 80px; background: var(--primary); color: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 2rem;">⚡</div>
                    <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">Réactivité</h3>
                    <p style="color: var(--gray-600); line-height: 1.7;">
                        Service d'urgence 24h/7j et interventions rapides. Nous comprenons l'importance de résoudre vos problèmes sans délai.
                    </p>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Équipe -->
    <section style="padding: 6rem 0; background: var(--white);">
        <div class="container">
            <div class="text-center" style="margin-bottom: 4rem;">
                <h2 style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; margin-bottom: 2rem; color: var(--gray-900);">Notre équipe</h2>
                <p style="font-size: 1.2rem; color: var(--gray-600); max-width: 600px; margin: 0 auto;">
                    Des professionnels expérimentés et certifiés à votre service
                </p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 3rem; max-width: 900px; margin: 0 auto;">
                <div style="text-align: center;">
                    <div style="width: 150px; height: 150px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 50%; margin: 0 auto 2rem; display: flex; align-items: center; justify-content: center; color: var(--white); font-size: 3rem;">👨‍🔧</div>
                    <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">Jean-Pierre Martin</h3>
                    <p style="color: var(--primary); font-weight: 600; margin-bottom: 1rem;">Fondateur & ${data.trade} expert</p>
                    <p style="color: var(--gray-600); line-height: 1.7;">
                        Plus de 20 ans d'expérience, certifié RGE. Spécialiste des installations complexes et de la mise aux normes.
                    </p>
                </div>
                
                <div style="text-align: center;">
                    <div style="width: 150px; height: 150px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 50%; margin: 0 auto 2rem; display: flex; align-items: center; justify-content: center; color: var(--white); font-size: 3rem;">👨‍💼</div>
                    <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">Marc Dubois</h3>
                    <p style="color: var(--primary); font-weight: 600; margin-bottom: 1rem;">${data.trade} confirmé</p>
                    <p style="color: var(--gray-600); line-height: 1.7;">
                        15 ans d'expérience en dépannage et rénovation. Expert en domotique et solutions connectées.
                    </p>
                </div>
                
                <div style="text-align: center;">
                    <div style="width: 150px; height: 150px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 50%; margin: 0 auto 2rem; display: flex; align-items: center; justify-content: center; color: var(--white); font-size: 3rem;">👩‍💻</div>
                    <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">Sophie Legrand</h3>
                    <p style="color: var(--primary); font-weight: 600; margin-bottom: 1rem;">Responsable clientèle</p>
                    <p style="color: var(--gray-600); line-height: 1.7;">
                        Gestion des devis et suivi client. Votre interlocutrice privilégiée pour tous vos projets.
                    </p>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Certifications -->
    <section style="padding: 6rem 0; background: var(--primary); color: var(--white);">
        <div class="container">
            <div class="text-center" style="margin-bottom: 4rem;">
                <h2 style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; margin-bottom: 2rem;">Certifications & Garanties</h2>
                <p style="font-size: 1.2rem; opacity: 0.9; max-width: 600px; margin: 0 auto;">
                    Toutes les qualifications pour votre sécurité et votre tranquillité
                </p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 3rem;">
                <div style="text-align: center; padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 1rem; backdrop-filter: blur(10px);">
                    <div style="font-size: 3rem; margin-bottom: 1.5rem;">🏆</div>
                    <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem;">Certification RGE</h3>
                    <p style="opacity: 0.9;">Reconnu Garant de l'Environnement pour les travaux d'efficacité énergétique</p>
                </div>
                
                <div style="text-align: center; padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 1rem; backdrop-filter: blur(10px);">
                    <div style="font-size: 3rem; margin-bottom: 1.5rem;">🛡️</div>
                    <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem;">Assurance Décennale</h3>
                    <p style="opacity: 0.9;">Couverture complète sur 10 ans pour tous nos travaux d'installation</p>
                </div>
                
                <div style="text-align: center; padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 1rem; backdrop-filter: blur(10px);">
                    <div style="font-size: 3rem; margin-bottom: 1.5rem;">⚡</div>
                    <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem;">Qualibat</h3>
                    <p style="opacity: 0.9;">Qualification professionnelle du bâtiment, gage de compétence et qualité</p>
                </div>
                
                <div style="text-align: center; padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 1rem; backdrop-filter: blur(10px);">
                    <div style="font-size: 3rem; margin-bottom: 1.5rem;">✅</div>
                    <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem;">CONSUEL</h3>
                    <p style="opacity: 0.9;">Conformité aux normes de sécurité électrique françaises</p>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Call to action -->
    <section style="padding: 6rem 0; background: var(--gray-900); color: var(--white);">
        <div class="container text-center">
            <h2 style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; margin-bottom: 2rem;">Prêt à commencer votre projet ?</h2>
            <p style="font-size: 1.2rem; margin-bottom: 3rem; opacity: 0.9; max-width: 600px; margin-left: auto; margin-right: auto;">
                Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé
            </p>
            <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
                <a href="contact.html" class="btn-primary">📋 Devis gratuit</a>
                <a href="tel:${data.phone}" style="background: transparent; color: var(--white); border: 2px solid var(--white); padding: clamp(1rem, 2vw, 1.5rem) clamp(2rem, 4vw, 3rem); border-radius: 0.75rem; text-decoration: none; font-weight: 700; font-size: clamp(1rem, 2vw, 1.2rem); transition: all 0.3s ease;" onmouseover="this.style.background='var(--white)'; this.style.color='var(--primary)'" onmouseout="this.style.background='transparent'; this.style.color='var(--white)'">📞 ${data.phone}</a>
            </div>
        </div>
    </section>
    
    ${DIVI_CONSTRUCTION_SYSTEM.getFooter(data)}
    ${DIVI_CONSTRUCTION_SYSTEM.getScripts()}
</body>
</html>`,

  // Page Contact professionnelle
  contactPage: (data, design) => `<!DOCTYPE html>
<html lang="fr" class="no-js">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact - ${data.companyName} | ${data.trade} ${data.city}</title>
    <meta name="description" content="Contactez ${data.companyName} pour vos travaux ${data.trade.toLowerCase()} à ${data.city}. Devis gratuit, intervention rapide. ☎️ ${data.phone}">
    
    <!-- Schema.org ContactPoint -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": "${data.companyName}",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "${data.phone}",
          "email": "${data.email}",
          "contactType": "customer service",
          "availableLanguage": "French"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "${data.address}",
          "addressLocality": "${data.city}",
          "addressCountry": "FR"
        }
      }
    }
    </script>
    
    ${DIVI_CONSTRUCTION_SYSTEM.getSharedCSS(design)}
    
    <style>
      .contact-form {
        background: var(--white);
        padding: 3rem;
        border-radius: 2rem;
        box-shadow: 0 20px 60px rgba(0,0,0,0.1);
      }
      
      .form-group {
        margin-bottom: 2rem;
      }
      
      .form-label {
        display: block;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: var(--gray-700);
      }
      
      .form-input, .form-select, .form-textarea {
        width: 100%;
        padding: 1rem 1.5rem;
        border: 2px solid var(--gray-200);
        border-radius: 0.75rem;
        font-size: 1rem;
        transition: all 0.3s ease;
        background: var(--white);
      }
      
      .form-input:focus, .form-select:focus, .form-textarea:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
      }
      
      .form-textarea {
        resize: vertical;
        min-height: 120px;
      }
      
      .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
      }
      
      .submit-btn {
        background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
        color: var(--white);
        padding: 1.25rem 3rem;
        border: none;
        border-radius: 0.75rem;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        width: 100%;
      }
      
      .submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      }
      
      .contact-card {
        background: var(--white);
        padding: 3rem;
        border-radius: 2rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        text-align: center;
        transition: all 0.3s ease;
      }
      
      .contact-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 50px rgba(0,0,0,0.15);
      }
      
      .contact-icon {
        width: 80px;
        height: 80px;
        background: var(--primary);
        color: var(--white);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        margin: 0 auto 2rem;
      }
      
      .map-container {
        background: var(--gray-100);
        border-radius: 2rem;
        overflow: hidden;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      
      @media (max-width: 768px) {
        .form-grid {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        
        .contact-grid {
          grid-template-columns: 1fr !important;
        }
        
        .contact-main-grid {
          grid-template-columns: 1fr !important;
        }
      }
    </style>
</head>

<body>
    ${DIVI_CONSTRUCTION_SYSTEM.getNavigation(data)}
    
    <!-- Hero Contact -->
    <section style="padding: 8rem 0 4rem; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); color: var(--white);">
        <div class="container">
            <div class="text-center">
                <span class="hero-badge">📞 Nous Contacter</span>
                <h1 style="font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 900; margin-bottom: 2rem;">
                    Contactez ${data.companyName}
                </h1>
                <p style="font-size: clamp(1.2rem, 3vw, 1.6rem); margin-bottom: 3rem; opacity: 0.9; max-width: 800px; margin-left: auto; margin-right: auto;">
                    Votre projet ${data.trade.toLowerCase()} nous intéresse. Devis gratuit et conseil personnalisé
                </p>
                <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
                    <a href="tel:${data.phone}" style="background: rgba(255,255,255,0.2); color: var(--white); padding: 1rem 2rem; border-radius: 0.75rem; text-decoration: none; font-weight: 700; backdrop-filter: blur(10px);">📞 Appel direct</a>
                    <a href="mailto:${data.email}" style="background: rgba(255,255,255,0.2); color: var(--white); padding: 1rem 2rem; border-radius: 0.75rem; text-decoration: none; font-weight: 700; backdrop-filter: blur(10px);">✉️ Email</a>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Informations de contact -->
    <section style="padding: 6rem 0; background: var(--gray-50);">
        <div class="container">
            <div class="contact-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem; margin-bottom: 6rem;">
                <div class="contact-card">
                    <div class="contact-icon">📞</div>
                    <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">Téléphone</h3>
                    <a href="tel:${data.phone}" style="color: var(--primary); font-size: 1.3rem; font-weight: 700; text-decoration: none; margin-bottom: 1rem; display: block;">${data.phone}</a>
                    <p style="color: var(--gray-600);">Urgences 24h/7j</p>
                    <p style="color: var(--gray-600); font-size: 0.9rem;">Intervention sous 1h</p>
                </div>
                
                <div class="contact-card">
                    <div class="contact-icon">✉️</div>
                    <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">Email</h3>
                    <a href="mailto:${data.email}" style="color: var(--primary); font-size: 1.1rem; font-weight: 600; text-decoration: none; margin-bottom: 1rem; display: block; word-break: break-all;">${data.email}</a>
                    <p style="color: var(--gray-600);">Réponse sous 24h</p>
                    <p style="color: var(--gray-600); font-size: 0.9rem;">Devis détaillé par email</p>
                </div>
                
                <div class="contact-card">
                    <div class="contact-icon">📍</div>
                    <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">Adresse</h3>
                    <p style="color: var(--gray-700); font-weight: 600; margin-bottom: 0.5rem;">${data.address}</p>
                    <p style="color: var(--gray-700); font-weight: 600; margin-bottom: 1rem;">${data.city}</p>
                    <p style="color: var(--gray-600); font-size: 0.9rem;">Déplacement gratuit<br>dans un rayon de 15km</p>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Formulaire et carte -->
    <section style="padding: 6rem 0; background: var(--white);">
        <div class="container">
            <div class="contact-main-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: start;">
                
                <!-- Formulaire de contact -->
                <div>
                    <h2 style="font-size: clamp(2rem, 5vw, 2.5rem); font-weight: 900; margin-bottom: 2rem; color: var(--gray-900);">Demande de devis gratuit</h2>
                    <p style="font-size: 1.1rem; color: var(--gray-600); margin-bottom: 3rem;">
                        Décrivez-nous votre projet, nous vous répondons rapidement avec un devis détaillé et personnalisé.
                    </p>
                    
                    <form class="contact-form" action="#" method="POST">
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label" for="name">Nom complet *</label>
                                <input type="text" id="name" name="name" class="form-input" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="email">Email *</label>
                                <input type="email" id="email" name="email" class="form-input" required>
                            </div>
                        </div>
                        
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label" for="phone">Téléphone</label>
                                <input type="tel" id="phone" name="phone" class="form-input">
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="city">Ville</label>
                                <input type="text" id="city" name="city" class="form-input" value="${data.city}">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="service">Type de service</label>
                            <select id="service" name="service" class="form-select">
                                <option value="">Choisissez un service</option>
                                <option value="installation">Installation ${data.trade}</option>
                                <option value="depannage">Dépannage d'urgence</option>
                                <option value="renovation">Rénovation / Mise aux normes</option>
                                <option value="maintenance">Maintenance préventive</option>
                                <option value="autre">Autre projet</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="urgency">Urgence</label>
                            <select id="urgency" name="urgency" class="form-select">
                                <option value="normal">Planning normal</option>
                                <option value="rapide">Sous 48h</option>
                                <option value="urgent">Urgence (même jour)</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="message">Description du projet *</label>
                            <textarea id="message" name="message" class="form-textarea" placeholder="Décrivez votre projet en détail : type de travaux, surface, contraintes particulières, budget envisagé..." required></textarea>
                        </div>
                        
                        <button type="submit" class="submit-btn">
                            🚀 Envoyer ma demande de devis
                        </button>
                        
                        <p style="font-size: 0.9rem; color: var(--gray-500); text-align: center; margin-top: 1rem;">
                            * Champs obligatoires. Vos données sont protégées et ne seront jamais partagées.
                        </p>
                    </form>
                </div>
                
                <!-- Informations et carte -->
                <div>
                    <h3 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 2rem; color: var(--gray-900);">Nos horaires</h3>
                    
                    <div style="background: var(--gray-50); padding: 2rem; border-radius: 1.5rem; margin-bottom: 3rem;">
                        <div style="display: grid; gap: 1rem;">
                            <div style="display: flex; justify-content: space-between;">
                                <span style="font-weight: 600;">Lundi - Vendredi</span>
                                <span style="color: var(--primary); font-weight: 600;">8h00 - 19h00</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span style="font-weight: 600;">Samedi</span>
                                <span style="color: var(--primary); font-weight: 600;">9h00 - 17h00</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span style="font-weight: 600;">Dimanche</span>
                                <span style="color: var(--gray-500);">Fermé</span>
                            </div>
                            <hr style="border: none; border-top: 1px solid var(--gray-200); margin: 0.5rem 0;">
                            <div style="display: flex; justify-content: space-between;">
                                <span style="font-weight: 600; color: #dc2626;">🚨 Urgences</span>
                                <span style="color: #dc2626; font-weight: 700;">24h/7j</span>
                            </div>
                        </div>
                    </div>
                    
                    <h3 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 2rem; color: var(--gray-900);">Zone d'intervention</h3>
                    
                    <div class="map-container">
                        <div style="text-align: center; color: var(--gray-600);">
                            <div style="font-size: 4rem; margin-bottom: 1rem;">🗺️</div>
                            <h4 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-700);">${data.city} et environs</h4>
                            <p style="margin-bottom: 1rem;">Rayon d'intervention : 30km</p>
                            <p style="font-size: 0.9rem;">Déplacement gratuit dans un rayon de 15km</p>
                        </div>
                    </div>
                    
                    <div style="background: var(--primary); color: var(--white); padding: 2rem; border-radius: 1.5rem; margin-top: 3rem; text-align: center;">
                        <h4 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem;">Garantie satisfaction</h4>
                        <p style="opacity: 0.9; margin-bottom: 1.5rem;">Devis gratuit et sans engagement sous 24h</p>
                        <a href="tel:${data.phone}" style="background: rgba(255,255,255,0.2); color: var(--white); padding: 1rem 2rem; border-radius: 0.5rem; text-decoration: none; font-weight: 700; backdrop-filter: blur(10px);">📞 Appeler maintenant</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- FAQ Contact -->
    <section style="padding: 6rem 0; background: var(--gray-50);">
        <div class="container">
            <div class="text-center" style="margin-bottom: 4rem;">
                <h2 style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; margin-bottom: 2rem; color: var(--gray-900);">Questions fréquentes</h2>
                <p style="font-size: 1.2rem; color: var(--gray-600); max-width: 600px; margin: 0 auto;">
                    Les réponses aux questions les plus courantes sur nos services
                </p>
            </div>
            
            <div style="max-width: 800px; margin: 0 auto; display: grid; gap: 2rem;">
                <div style="background: var(--white); padding: 2rem; border-radius: 1.5rem; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                    <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">💰 Le devis est-il vraiment gratuit ?</h3>
                    <p style="color: var(--gray-600); line-height: 1.7;">
                        Oui, absolument ! Nous nous déplaçons gratuitement dans un rayon de 15km autour de ${data.city} pour établir un devis détaillé et personnalisé. Aucun engagement de votre part.
                    </p>
                </div>
                
                <div style="background: var(--white); padding: 2rem; border-radius: 1.5rem; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                    <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">⚡ Que faire en cas d'urgence ?</h3>
                    <p style="color: var(--gray-600); line-height: 1.7;">
                        Pour toute urgence ${data.trade.toLowerCase()}, appelez directement le <strong>${data.phone}</strong>. Nous intervenons 24h/7j avec un temps de réponse moyen de 1h.
                    </p>
                </div>
                
                <div style="background: var(--white); padding: 2rem; border-radius: 1.5rem; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                    <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">🛡️ Êtes-vous assurés ?</h3>
                    <p style="color: var(--gray-600); line-height: 1.7;">
                        Oui, nous disposons d'une assurance décennale complète et de toutes les certifications requises (RGE, Qualibat). Vos travaux sont garantis 10 ans.
                    </p>
                </div>
                
                <div style="background: var(--white); padding: 2rem; border-radius: 1.5rem; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                    <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; color: var(--gray-900);">💳 Quels sont les moyens de paiement acceptés ?</h3>
                    <p style="color: var(--gray-600); line-height: 1.7;">
                        Nous acceptons tous les moyens de paiement : espèces, chèque, virement, CB. Possibilité de paiement en plusieurs fois pour les gros projets.
                    </p>
                </div>
            </div>
        </div>
    </section>
    
    ${DIVI_CONSTRUCTION_SYSTEM.getFooter(data)}
    ${DIVI_CONSTRUCTION_SYSTEM.getScripts()}
    
    <script>
        // Validation formulaire
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulation envoi
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '⏳ Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = '✅ Message envoyé !';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    this.reset();
                }, 2000);
            }, 2000);
        });
    </script>
</body>
</html>`,

  // Méthodes utilitaires partagées
  getSharedCSS: (design) => `<style>
    /* CSS partagé identique à la homepage */
    :root {
      --primary: ${design.colors.primary};
      --secondary: ${design.colors.secondary};
      --white: #ffffff;
      --gray-50: #f8fafc;
      --gray-100: #f1f5f9;
      --gray-200: #e2e8f0;
      --gray-600: #475569;
      --gray-700: #334155;
      --gray-800: #1e293b;
      --gray-900: #0f172a;
    }
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.6;
      color: var(--gray-800);
      overflow-x: hidden;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 clamp(1rem, 3vw, 2rem);
    }
    
    .text-center { text-align: center; }
    
    /* Navigation identique */
    .divi-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      z-index: 1000;
      padding: 1rem 0;
      box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    }
    
    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .nav-logo {
      font-size: clamp(1.5rem, 3vw, 2rem);
      font-weight: 800;
      color: var(--primary);
      text-decoration: none;
    }
    
    .nav-menu {
      display: flex;
      list-style: none;
      gap: clamp(1.5rem, 3vw, 3rem);
    }
    
    .nav-link {
      color: var(--gray-700);
      text-decoration: none;
      font-weight: 600;
      font-size: clamp(0.9rem, 2vw, 1rem);
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
    }
    
    .nav-link:hover, .nav-link.active {
      color: var(--primary);
      background: var(--gray-50);
    }
    
    .nav-cta {
      background: var(--primary);
      color: var(--white);
      padding: clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem);
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: 700;
      font-size: clamp(0.9rem, 2vw, 1rem);
      transition: all 0.3s ease;
    }
    
    .nav-cta:hover {
      background: var(--secondary);
      transform: translateY(-2px);
    }
    
    .nav-toggle {
      display: none;
      flex-direction: column;
      gap: 4px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
    }
    
    .nav-toggle span {
      width: 25px;
      height: 3px;
      background: var(--gray-700);
      transition: all 0.3s ease;
    }
    
    /* Boutons */
    .btn-primary {
      background: var(--primary);
      color: var(--white);
      padding: clamp(1rem, 2vw, 1.5rem) clamp(2rem, 4vw, 3rem);
      border-radius: 0.75rem;
      text-decoration: none;
      font-weight: 700;
      font-size: clamp(1rem, 2vw, 1.2rem);
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .btn-primary:hover {
      background: var(--secondary);
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    
    .hero-badge {
      background: var(--primary);
      color: var(--white);
      padding: 0.75rem 2rem;
      border-radius: 3rem;
      display: inline-block;
      font-weight: 700;
      font-size: clamp(0.9rem, 2vw, 1rem);
      margin-bottom: 2rem;
    }
    
    /* Features */
    .feature-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
      font-size: clamp(0.9rem, 2vw, 1rem);
    }
    
    .feature-check {
      width: 20px;
      height: 20px;
      background: var(--primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--white);
      font-size: 0.75rem;
      font-weight: bold;
      flex-shrink: 0;
    }
    
    /* Footer */
    .footer-professional {
      background: var(--gray-900);
      color: var(--white);
      padding: clamp(3rem, 6vw, 5rem) 0 clamp(1rem, 2vw, 2rem);
    }
    
    .footer-content {
      text-align: center;
    }
    
    .footer-title {
      font-size: clamp(1.5rem, 3vw, 2rem);
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--primary);
    }
    
    .footer-description {
      opacity: 0.8;
      margin-bottom: 2rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 2rem;
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .footer-copyright {
      opacity: 0.6;
    }
    
    .footer-credits a {
      color: var(--primary);
      text-decoration: none;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .nav-menu {
        position: fixed;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--white);
        flex-direction: column;
        padding: 2rem;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }
      
      .nav-menu.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }
      
      .nav-toggle {
        display: flex;
      }
      
      .services-detailed-grid > div > div {
        grid-template-columns: 1fr !important;
        gap: 2rem !important;
        text-align: center;
      }
      
      .footer-bottom {
        flex-direction: column;
        text-align: center;
      }
    }
  </style>`,

  getNavigation: (data) => `
    <!-- Navigation -->
    <nav class="divi-nav">
        <div class="container">
            <div class="nav-container">
                <a href="index.html" class="nav-logo">${data.companyName}</a>
                <button class="nav-toggle" id="navToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="nav-menu" id="navMenu">
                    <li><a href="index.html" class="nav-link">Accueil</a></li>
                    <li><a href="services.html" class="nav-link">Services</a></li>
                    <li><a href="a-propos.html" class="nav-link">À propos</a></li>
                    <li><a href="contact.html" class="nav-link">Contact</a></li>
                    <li><a href="tel:${data.phone}" class="nav-cta">📞 ${data.phone}</a></li>
                </ul>
            </div>
        </div>
    </nav>`,

  getFooter: (data) => `
    <!-- Footer -->
    <footer class="footer-professional">
        <div class="container">
            <div class="footer-content">
                <h3 class="footer-title">${data.companyName}</h3>
                <p class="footer-description">
                    ${data.trade} professionnel depuis plus de 15 ans. Excellence, qualité et satisfaction client garanties.
                </p>
                
                <div class="footer-bottom">
                    <p class="footer-copyright">
                        © 2025 ${data.companyName}. Tous droits réservés.
                    </p>
                    <p class="footer-credits">
                        Design Divi Construction - <a href="https://claude.ai/code" target="_blank">Claude Code</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>`,

  getScripts: () => `
    <!-- Scripts -->
    <script>
        // Navigation mobile
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Fermer le menu au clic sur lien
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
        
        // Smooth scroll pour les ancres
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
        
        console.log('🏗️ Divi Construction Professional page loaded successfully!');
    </script>`
};

// Données de test pour électricien
const TEST_ELECTRICIAN_DATA = {
  companyName: 'ÉlectroMax Pro',
  trade: 'Électricien',
  city: 'Toulouse',
  description: 'Électricien expert à Toulouse, spécialisé dans l\'installation, dépannage et rénovation électrique avec plus de 15 ans d\'expérience.',
  phone: '05 61 23 45 67',
  email: 'contact@electromax-pro.fr',
  address: '25 Avenue Jean Jaurès',
  website: 'https://electromax-pro.fr'
};

// Système de designs Divi Construction
const DIVI_CONSTRUCTION_DESIGNS = [
  {
    id: 'professional-blue',
    name: 'Professional Blue',
    colors: { 
      primary: '#1e40af', 
      secondary: '#3b82f6' 
    }
  },
  {
    id: 'industrial-orange',
    name: 'Industrial Orange',
    colors: { 
      primary: '#ea580c', 
      secondary: '#f97316' 
    }
  },
  {
    id: 'modern-green',
    name: 'Modern Green',
    colors: { 
      primary: '#059669', 
      secondary: '#10b981' 
    }
  }
];

// Fonction pour générer les 4 pages complètes
async function generateDiviConstructionSite(formData, designSystem) {
  const siteId = `divi-construction-${designSystem.id}`;
  const outputDir = path.join(__dirname, 'public', 'generated-sites', siteId);
  
  console.log(`🏗️ Génération Divi Construction: ${designSystem.name}`);
  console.log(`   Couleurs: ${designSystem.colors.primary} / ${designSystem.colors.secondary}`);
  
  try {
    await fs.mkdir(outputDir, { recursive: true });
    
    // Page d'accueil
    const homepageHTML = DIVI_CONSTRUCTION_SYSTEM.homepage(formData, designSystem);
    await fs.writeFile(path.join(outputDir, 'index.html'), homepageHTML);
    
    // Page services
    const servicesHTML = DIVI_CONSTRUCTION_SYSTEM.servicesPage(formData, designSystem);
    await fs.writeFile(path.join(outputDir, 'services.html'), servicesHTML);
    
      // Page à propos
    const aboutHTML = DIVI_CONSTRUCTION_SYSTEM.aboutPage(formData, designSystem);
    await fs.writeFile(path.join(outputDir, 'a-propos.html'), aboutHTML);
    
    // Page contact
    const contactHTML = DIVI_CONSTRUCTION_SYSTEM.contactPage(formData, designSystem);
    await fs.writeFile(path.join(outputDir, 'contact.html'), contactHTML);
    
    console.log(`   ✅ Site Divi Construction généré: ${siteId}`);
    
  } catch (error) {
    console.error(`   ❌ Erreur: ${error.message}`);
  }
}

// Fonction principale de test
async function testDiviConstructionSystem() {
  console.log('🏗️ TEST SYSTÈME DIVI CONSTRUCTION PROFESSIONNEL');
  console.log('============================================================');
  console.log('📋 Formulaire électricien:', TEST_ELECTRICIAN_DATA.companyName, TEST_ELECTRICIAN_DATA.city);
  console.log('🎨 Génération de 3 designs Divi Construction ultra-pro');
  console.log('📄 Pages: Accueil + Services + À propos + Contact');
  console.log('============================================================\\n');
  
  for (let i = 0; i < DIVI_CONSTRUCTION_DESIGNS.length; i++) {
    const design = DIVI_CONSTRUCTION_DESIGNS[i];
    await generateDiviConstructionSite(TEST_ELECTRICIAN_DATA, design);
  }
  
  console.log('\\n🎉 GÉNÉRATION DIVI CONSTRUCTION TERMINÉE !');
  console.log('============================================================');
  console.log('✅ 3 sites Divi Construction générés avec qualité professionnelle');
  console.log('📱 100% responsive avec navigation cohérente');
  console.log('🔍 SEO optimisé avec Schema.org spécialisé');
  console.log('📁 Sites: public/generated-sites/divi-construction-*');
}

// Lancer le test
testDiviConstructionSystem().catch(console.error);