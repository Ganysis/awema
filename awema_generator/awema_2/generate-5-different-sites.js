// Générateur de 5 sites complètement différents avec même formulaire
const fs = require('fs').promises;
const path = require('path');

// Formulaire unique pour les 5 sites
const SAME_FORM_DATA = {
  companyName: 'ÉlectroMax Pro',
  trade: 'Électricien',
  city: 'Toulouse',
  description: 'Électricien expert à Toulouse, spécialisé dans l\'installation, dépannage et rénovation électrique avec plus de 15 ans d\'expérience.',
  phone: '05 61 23 45 67',
  email: 'contact@electromax-pro.fr',
  address: '25 Avenue Jean Jaurès',
  website: 'https://electromax-pro.fr'
};

// 5 DESIGNS COMPLÈTEMENT DIFFÉRENTS
const FIVE_UNIQUE_DESIGNS = {
  
  // SITE 1: MAGAZINE ÉDITORIAL MODERNE
  design1_magazine: {
    name: "Magazine Éditorial",
    description: "Layout magazine avec typographie élégante et grilles asymétriques",
    generateHTML: (data) => `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - ${data.trade} Toulouse</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; line-height: 1.7; color: #1a1a1a; }
        
        /* Navigation Magazine Style */
        nav { background: #fff; padding: 2rem 0; border-bottom: 1px solid #e5e5e5; }
        .nav-container { max-width: 1400px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 900; color: #1a1a1a; text-decoration: none; }
        .nav-menu { display: flex; gap: 3rem; list-style: none; }
        .nav-link { color: #666; text-decoration: none; font-weight: 400; letter-spacing: 0.5px; }
        .nav-cta { background: #1a1a1a; color: white; padding: 0.75rem 2rem; text-decoration: none; font-weight: 500; }
        
        /* Hero Magazine Editorial */
        .hero-magazine { min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; align-items: center; max-width: 1400px; margin: 0 auto; padding: 0 2rem; }
        .hero-content { padding-right: 4rem; }
        .hero-tag { background: #f5f5f5; padding: 0.5rem 1rem; font-size: 0.9rem; font-weight: 500; margin-bottom: 2rem; display: inline-block; }
        .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(3rem, 6vw, 5rem); font-weight: 900; line-height: 1.1; margin-bottom: 1.5rem; }
        .hero-subtitle { font-size: clamp(1.2rem, 3vw, 1.6rem); color: #666; margin-bottom: 2rem; font-weight: 300; }
        .hero-description { font-size: 1.1rem; color: #555; margin-bottom: 3rem; }
        .hero-cta { background: #1a1a1a; color: white; padding: 1.2rem 2.5rem; text-decoration: none; font-weight: 500; display: inline-block; }
        
        .hero-visual { position: relative; }
        .hero-image { width: 100%; height: 70vh; object-fit: cover; }
        .hero-overlay { position: absolute; bottom: 2rem; left: 2rem; background: rgba(255,255,255,0.95); padding: 2rem; max-width: 300px; }
        
        /* Services Magazine Grid */
        .services-magazine { padding: 8rem 0; background: #fafafa; }
        .services-container { max-width: 1400px; margin: 0 auto; padding: 0 2rem; }
        .services-header { text-align: center; margin-bottom: 6rem; }
        .services-title { font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; margin-bottom: 1rem; }
        .services-subtitle { font-size: 1.2rem; color: #666; }
        
        .services-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; grid-template-rows: auto auto; gap: 2rem; }
        .service-card { background: white; padding: 3rem; }
        .service-card.featured { grid-row: 1 / 3; }
        .service-icon { font-size: 3rem; margin-bottom: 1.5rem; }
        .service-title { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; margin-bottom: 1rem; }
        .service-desc { color: #666; margin-bottom: 2rem; }
        .service-price { font-size: 1.4rem; font-weight: 600; color: #1a1a1a; }
        
        /* Footer Magazine */
        footer { background: #1a1a1a; color: white; padding: 4rem 0 2rem; }
        .footer-content { max-width: 1400px; margin: 0 auto; padding: 0 2rem; text-align: center; }
        .footer-title { font-family: 'Playfair Display', serif; font-size: 2rem; margin-bottom: 1rem; }
        
        @media (max-width: 768px) {
            .hero-magazine { grid-template-columns: 1fr; gap: 2rem; }
            .services-grid { grid-template-columns: 1fr; }
            .service-card.featured { grid-row: auto; }
        }
    </style>
</head>
<body>
    <nav>
        <div class="nav-container">
            <a href="#" class="logo">${data.companyName}</a>
            <ul class="nav-menu">
                <li><a href="#" class="nav-link">Accueil</a></li>
                <li><a href="#" class="nav-link">Services</a></li>
                <li><a href="#" class="nav-link">Portfolio</a></li>
                <li><a href="#" class="nav-link">Contact</a></li>
            </ul>
            <a href="tel:${data.phone}" class="nav-cta">${data.phone}</a>
        </div>
    </nav>

    <section class="hero-magazine">
        <div class="hero-content">
            <span class="hero-tag">ÉLECTRICIEN CERTIFIÉ</span>
            <h1 class="hero-title">Excellence & Expertise</h1>
            <h2 class="hero-subtitle">${data.trade} d'exception à ${data.city}</h2>
            <p class="hero-description">${data.description}</p>
            <a href="#services" class="hero-cta">Découvrir nos services</a>
        </div>
        <div class="hero-visual">
            <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=700&h=800&fit=crop" alt="Électricien professionnel" class="hero-image">
            <div class="hero-overlay">
                <h3>15+ années d'expérience</h3>
                <p>Certifications RGE et garanties professionnelles</p>
            </div>
        </div>
    </section>

    <section class="services-magazine" id="services">
        <div class="services-container">
            <div class="services-header">
                <h2 class="services-title">Nos Spécialités</h2>
                <p class="services-subtitle">Excellence technique et service personnalisé</p>
            </div>
            
            <div class="services-grid">
                <div class="service-card featured">
                    <div class="service-icon">⚡</div>
                    <h3 class="service-title">Installation Électrique Premium</h3>
                    <p class="service-desc">Installation complète aux normes NF C 15-100 avec matériel haut de gamme et garantie décennale. Étude personnalisée et conseil technique inclus.</p>
                    <div class="service-price">À partir de 85€/h</div>
                </div>
                
                <div class="service-card">
                    <div class="service-icon">🚨</div>
                    <h3 class="service-title">Dépannage Express</h3>
                    <p class="service-desc">Intervention d'urgence 24h/7j pour toute panne électrique.</p>
                    <div class="service-price">Déplacement 75€</div>
                </div>
                
                <div class="service-card">
                    <div class="service-icon">🏠</div>
                    <h3 class="service-title">Domotique</h3>
                    <p class="service-desc">Maison intelligente et connectée sur mesure.</p>
                    <div class="service-price">Devis gratuit</div>
                </div>
                
                <div class="service-card">
                    <div class="service-icon">🔧</div>
                    <h3 class="service-title">Rénovation</h3>
                    <p class="service-desc">Mise aux normes et modernisation complète.</p>
                    <div class="service-price">Sur devis</div>
                </div>
                
                <div class="service-card">
                    <div class="service-icon">⚙️</div>
                    <h3 class="service-title">Maintenance</h3>
                    <p class="service-desc">Contrat d'entretien préventif annuel.</p>
                    <div class="service-price">Forfait 200€/an</div>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="footer-content">
            <h3 class="footer-title">${data.companyName}</h3>
            <p>Design Magazine Éditorial - Excellence & Expertise</p>
            <p style="margin-top: 2rem; opacity: 0.7;">© 2025 ${data.companyName} - Design: Magazine Éditorial</p>
        </div>
    </footer>
</body>
</html>`
  },

  // SITE 2: TIMELINE INDUSTRIEL
  design2_timeline: {
    name: "Timeline Industriel",
    description: "Design industriel avec timeline horizontale et processus étapes",
    generateHTML: (data) => `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - Processus Industriel</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&family=Roboto:wght@300;400;500;700;900&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Roboto', sans-serif; background: #0a0a0a; color: #ffffff; }
        
        /* Navigation Industrielle */
        nav { background: rgba(20,20,20,0.95); backdrop-filter: blur(10px); padding: 1rem 0; position: fixed; width: 100%; top: 0; z-index: 1000; }
        .nav-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-family: 'Roboto Mono', monospace; font-size: 1.8rem; font-weight: 700; color: #00ff88; text-decoration: none; }
        .nav-menu { display: flex; gap: 2rem; list-style: none; }
        .nav-link { color: #ccc; text-decoration: none; font-weight: 400; transition: color 0.3s; }
        .nav-link:hover { color: #00ff88; }
        .nav-cta { background: #00ff88; color: #000; padding: 0.75rem 1.5rem; text-decoration: none; font-weight: 700; }
        
        /* Hero Timeline */
        .hero-timeline { min-height: 100vh; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); display: flex; align-items: center; position: relative; overflow: hidden; }
        .hero-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.1; background: url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&h=1080&fit=crop') center/cover; }
        .hero-content { max-width: 1200px; margin: 0 auto; padding: 0 2rem; position: relative; z-index: 2; }
        
        .hero-badge { background: rgba(0,255,136,0.2); color: #00ff88; padding: 0.75rem 2rem; border: 1px solid #00ff88; margin-bottom: 2rem; display: inline-block; font-family: 'Roboto Mono', monospace; }
        .hero-title { font-size: clamp(3rem, 8vw, 6rem); font-weight: 900; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 2px; }
        .hero-subtitle { font-size: 1.5rem; color: #00ff88; margin-bottom: 2rem; font-family: 'Roboto Mono', monospace; }
        .hero-desc { font-size: 1.2rem; color: #ccc; margin-bottom: 4rem; max-width: 600px; }
        
        /* Timeline Process */
        .timeline-container { margin: 4rem 0; }
        .timeline-track { position: relative; height: 4px; background: #333; margin: 2rem 0; }
        .timeline-progress { height: 100%; background: linear-gradient(90deg, #00ff88, #00ccaa); width: 100%; }
        
        .timeline-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; margin-top: 3rem; }
        .timeline-step { text-align: center; position: relative; }
        .step-number { width: 60px; height: 60px; background: linear-gradient(135deg, #00ff88, #00ccaa); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 900; color: #000; margin: 0 auto 1rem; }
        .step-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem; color: #00ff88; }
        .step-desc { color: #ccc; font-size: 0.9rem; }
        
        /* Services Industriels */
        .services-industrial { padding: 8rem 0; background: #111; }
        .services-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        .services-header { text-align: center; margin-bottom: 6rem; }
        .services-title { font-size: 3rem; font-weight: 900; margin-bottom: 1rem; text-transform: uppercase; }
        .services-subtitle { color: #00ff88; font-family: 'Roboto Mono', monospace; }
        
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .service-card { background: linear-gradient(135deg, #1a1a1a, #2d2d2d); border: 1px solid #333; padding: 2rem; position: relative; overflow: hidden; }
        .service-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #00ff88, #00ccaa); }
        .service-icon { font-size: 3rem; margin-bottom: 1rem; }
        .service-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 1rem; color: #00ff88; }
        .service-desc { color: #ccc; margin-bottom: 2rem; line-height: 1.6; }
        .service-specs { background: rgba(0,255,136,0.1); padding: 1rem; margin-bottom: 2rem; border-left: 3px solid #00ff88; }
        .service-price { font-family: 'Roboto Mono', monospace; font-size: 1.2rem; font-weight: 700; color: #00ff88; }
        
        /* Footer Industriel */
        footer { background: #000; padding: 3rem 0 1rem; border-top: 1px solid #333; }
        .footer-content { max-width: 1200px; margin: 0 auto; padding: 0 2rem; text-align: center; }
        .footer-title { font-family: 'Roboto Mono', monospace; font-size: 1.8rem; color: #00ff88; margin-bottom: 1rem; }
        
        @media (max-width: 768px) {
            .timeline-steps { grid-template-columns: repeat(2, 1fr); }
            .services-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <nav>
        <div class="nav-container">
            <a href="#" class="logo">${data.companyName}</a>
            <ul class="nav-menu">
                <li><a href="#" class="nav-link">ACCUEIL</a></li>
                <li><a href="#" class="nav-link">PROCESSUS</a></li>
                <li><a href="#" class="nav-link">SERVICES</a></li>
                <li><a href="#" class="nav-link">CONTACT</a></li>
            </ul>
            <a href="tel:${data.phone}" class="nav-cta">${data.phone}</a>
        </div>
    </nav>

    <section class="hero-timeline">
        <div class="hero-bg"></div>
        <div class="hero-content">
            <span class="hero-badge">SYSTÈME ÉLECTRIQUE AVANCÉ</span>
            <h1 class="hero-title">${data.companyName}</h1>
            <h2 class="hero-subtitle">PROCESSUS INDUSTRIEL - ${data.city.toUpperCase()}</h2>
            <p class="hero-desc">${data.description}</p>
            
            <div class="timeline-container">
                <div class="timeline-track">
                    <div class="timeline-progress"></div>
                </div>
                
                <div class="timeline-steps">
                    <div class="timeline-step">
                        <div class="step-number">01</div>
                        <h3 class="step-title">ANALYSE</h3>
                        <p class="step-desc">Diagnostic technique complet</p>
                    </div>
                    <div class="timeline-step">
                        <div class="step-number">02</div>
                        <h3 class="step-title">PLANIFICATION</h3>
                        <p class="step-desc">Schémas et devis détaillés</p>
                    </div>
                    <div class="timeline-step">
                        <div class="step-number">03</div>
                        <h3 class="step-title">EXÉCUTION</h3>
                        <p class="step-desc">Installation professionnelle</p>
                    </div>
                    <div class="timeline-step">
                        <div class="step-number">04</div>
                        <h3 class="step-title">VALIDATION</h3>
                        <p class="step-desc">Tests et certification</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="services-industrial">
        <div class="services-container">
            <div class="services-header">
                <h2 class="services-title">Systèmes Électriques</h2>
                <p class="services-subtitle">TECHNOLOGIES AVANCÉES</p>
            </div>
            
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">⚡</div>
                    <h3 class="service-title">INSTALLATION PREMIUM</h3>
                    <p class="service-desc">Système électrique complet avec technologies avancées et matériel industriel certifié.</p>
                    <div class="service-specs">
                        <strong>SPECS:</strong> Normes NF C 15-100 • Garantie 10 ans • Matériel premium
                    </div>
                    <div class="service-price">85€/H + MATÉRIEL</div>
                </div>
                
                <div class="service-card">
                    <div class="service-icon">🚨</div>
                    <h3 class="service-title">URGENCE 24/7</h3>
                    <p class="service-desc">Intervention d'urgence avec équipe spécialisée et matériel de dépannage avancé.</p>
                    <div class="service-specs">
                        <strong>RESPONSE:</strong> &lt; 60 min • Diagnostic inclus • Équipe certifiée
                    </div>
                    <div class="service-price">DÉPLACEMENT 75€</div>
                </div>
                
                <div class="service-card">
                    <div class="service-icon">🏭</div>
                    <h3 class="service-title">INDUSTRIEL</h3>
                    <p class="service-desc">Solutions électriques pour environnements industriels et commerciaux complexes.</p>
                    <div class="service-specs">
                        <strong>EXPERTISE:</strong> Haute tension • Automatisme • Supervision
                    </div>
                    <div class="service-price">DEVIS PERSONNALISÉ</div>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="footer-content">
            <h3 class="footer-title">${data.companyName}</h3>
            <p>Design Timeline Industriel - Processus Avancé</p>
            <p style="margin-top: 2rem; opacity: 0.7; font-family: 'Roboto Mono', monospace;">© 2025 ${data.companyName} - INDUSTRIAL DESIGN</p>
        </div>
    </footer>
</body>
</html>`
  },

  // SITE 3: SLIDER SHOWCASE CRÉATIF
  design3_slider: {
    name: "Slider Showcase",
    description: "Design créatif avec slider interactif et animations modernes",
    generateHTML: (data) => `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - Showcase Créatif</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Poppins', sans-serif; overflow-x: hidden; }
        
        /* Navigation Creative */
        nav { position: fixed; top: 0; width: 100%; background: rgba(255,255,255,0.1); backdrop-filter: blur(20px); z-index: 1000; padding: 1rem 0; }
        .nav-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 2rem; font-weight: 800; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-decoration: none; }
        .nav-menu { display: flex; gap: 2rem; list-style: none; }
        .nav-link { color: #333; text-decoration: none; font-weight: 500; transition: all 0.3s; }
        .nav-link:hover { color: #667eea; }
        .nav-cta { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 0.75rem 2rem; border-radius: 50px; text-decoration: none; font-weight: 600; }
        
        /* Hero Slider Showcase */
        .hero-slider { height: 100vh; position: relative; overflow: hidden; }
        .slider-container { height: 100%; position: relative; }
        .slide { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; opacity: 0; transition: all 1s ease; }
        .slide.active { opacity: 1; }
        .slide:nth-child(1) { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .slide:nth-child(2) { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
        .slide:nth-child(3) { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
        
        .slide-content { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; color: white; }
        .slide-text h1 { font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 900; margin-bottom: 1rem; }
        .slide-text h2 { font-size: 1.5rem; font-weight: 300; margin-bottom: 2rem; opacity: 0.9; }
        .slide-text p { font-size: 1.1rem; margin-bottom: 3rem; opacity: 0.8; line-height: 1.7; }
        .slide-cta { background: rgba(255,255,255,0.2); color: white; padding: 1rem 2rem; border-radius: 50px; text-decoration: none; font-weight: 600; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.3); }
        
        .slide-visual { text-align: center; }
        .slide-image { width: 100%; max-width: 400px; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        
        /* Navigation Dots */
        .slider-nav { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); display: flex; gap: 1rem; }
        .nav-dot { width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .nav-dot.active { background: white; transform: scale(1.3); }
        
        /* Services Carousel */
        .services-carousel { padding: 8rem 0; background: #f8f9fa; }
        .services-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        .services-header { text-align: center; margin-bottom: 6rem; }
        .services-title { font-size: 3rem; font-weight: 800; margin-bottom: 1rem; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .services-subtitle { font-size: 1.2rem; color: #666; }
        
        .carousel-container { position: relative; overflow: hidden; }
        .carousel-track { display: flex; transition: transform 0.5s ease; }
        .service-slide { min-width: 350px; margin-right: 2rem; background: white; border-radius: 20px; padding: 3rem; box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
        .service-icon { font-size: 4rem; margin-bottom: 2rem; }
        .service-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #333; }
        .service-desc { color: #666; margin-bottom: 2rem; line-height: 1.6; }
        .service-price { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 1rem; border-radius: 10px; text-align: center; font-weight: 700; }
        
        .carousel-controls { text-align: center; margin-top: 3rem; }
        .carousel-btn { background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; padding: 1rem 2rem; border-radius: 50px; margin: 0 0.5rem; cursor: pointer; font-weight: 600; }
        
        /* Footer Creative */
        footer { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4rem 0 2rem; }
        .footer-content { max-width: 1200px; margin: 0 auto; padding: 0 2rem; text-align: center; }
        .footer-title { font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; }
        
        @media (max-width: 768px) {
            .slide-content { grid-template-columns: 1fr; text-align: center; }
            .service-slide { min-width: 280px; }
        }
    </style>
</head>
<body>
    <nav>
        <div class="nav-container">
            <a href="#" class="logo">${data.companyName}</a>
            <ul class="nav-menu">
                <li><a href="#" class="nav-link">Accueil</a></li>
                <li><a href="#" class="nav-link">Showcase</a></li>
                <li><a href="#" class="nav-link">Services</a></li>
                <li><a href="#" class="nav-link">Contact</a></li>
            </ul>
            <a href="tel:${data.phone}" class="nav-cta">${data.phone}</a>
        </div>
    </nav>

    <section class="hero-slider">
        <div class="slider-container">
            <div class="slide active">
                <div class="slide-content">
                    <div class="slide-text">
                        <h1>Excellence Électrique</h1>
                        <h2>${data.trade} Premium à ${data.city}</h2>
                        <p>${data.description}</p>
                        <a href="#services" class="slide-cta">Découvrir nos services</a>
                    </div>
                    <div class="slide-visual">
                        <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=500&fit=crop" alt="Installation électrique" class="slide-image">
                    </div>
                </div>
            </div>
            
            <div class="slide">
                <div class="slide-content">
                    <div class="slide-text">
                        <h1>Innovation & Technologie</h1>
                        <h2>Solutions Électriques Avancées</h2>
                        <p>Domotique, automatisation et systèmes intelligents pour votre confort et sécurité.</p>
                        <a href="#" class="slide-cta">En savoir plus</a>
                    </div>
                    <div class="slide-visual">
                        <img src="https://images.unsplash.com/photo-1558618047-3c8c76ca7815?w=400&h=500&fit=crop" alt="Domotique" class="slide-image">
                    </div>
                </div>
            </div>
            
            <div class="slide">
                <div class="slide-content">
                    <div class="slide-text">
                        <h1>Service d'Urgence</h1>
                        <h2>Disponible 24h/7j</h2>
                        <p>Intervention rapide pour toute urgence électrique. Équipe qualifiée et matériel professionnel.</p>
                        <a href="tel:${data.phone}" class="slide-cta">Appeler maintenant</a>
                    </div>
                    <div class="slide-visual">
                        <img src="https://images.unsplash.com/photo-1609839777870-91eeaec93bb8?w=400&h=500&fit=crop" alt="Urgence électrique" class="slide-image">
                    </div>
                </div>
            </div>
        </div>
        
        <div class="slider-nav">
            <div class="nav-dot active" onclick="currentSlide(1)"></div>
            <div class="nav-dot" onclick="currentSlide(2)"></div>
            <div class="nav-dot" onclick="currentSlide(3)"></div>
        </div>
    </section>

    <section class="services-carousel" id="services">
        <div class="services-container">
            <div class="services-header">
                <h2 class="services-title">Services Premium</h2>
                <p class="services-subtitle">Solutions électriques complètes et personnalisées</p>
            </div>
            
            <div class="carousel-container">
                <div class="carousel-track" id="carouselTrack">
                    <div class="service-slide">
                        <div class="service-icon">⚡</div>
                        <h3 class="service-title">Installation Premium</h3>
                        <p class="service-desc">Installation électrique complète avec matériel haut de gamme et garantie décennale.</p>
                        <div class="service-price">À partir de 85€/h</div>
                    </div>
                    
                    <div class="service-slide">
                        <div class="service-icon">🚨</div>
                        <h3 class="service-title">Urgence Express</h3>
                        <p class="service-desc">Intervention d'urgence 24h/7j avec équipe spécialisée et diagnostic gratuit.</p>
                        <div class="service-price">Déplacement 75€</div>
                    </div>
                    
                    <div class="service-slide">
                        <div class="service-icon">🏠</div>
                        <h3 class="service-title">Domotique Sur-Mesure</h3>
                        <p class="service-desc">Maison intelligente avec systèmes connectés et automation personnalisée.</p>
                        <div class="service-price">Devis gratuit</div>
                    </div>
                    
                    <div class="service-slide">
                        <div class="service-icon">🔧</div>
                        <h3 class="service-title">Rénovation Complète</h3>
                        <p class="service-desc">Mise aux normes et modernisation avec solutions énergétiques optimisées.</p>
                        <div class="service-price">Étude personnalisée</div>
                    </div>
                </div>
            </div>
            
            <div class="carousel-controls">
                <button class="carousel-btn" onclick="moveCarousel(-1)">← Précédent</button>
                <button class="carousel-btn" onclick="moveCarousel(1)">Suivant →</button>
            </div>
        </div>
    </section>

    <footer>
        <div class="footer-content">
            <h3 class="footer-title">${data.companyName}</h3>
            <p>Design Slider Showcase - Créativité & Innovation</p>
            <p style="margin-top: 2rem; opacity: 0.8;">© 2025 ${data.companyName} - Design: Slider Showcase</p>
        </div>
    </footer>

    <script>
        // Slider functionality
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.nav-dot');
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }
        
        function currentSlide(index) {
            currentSlideIndex = index - 1;
            showSlide(currentSlideIndex);
        }
        
        function nextSlide() {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            showSlide(currentSlideIndex);
        }
        
        // Auto slider
        setInterval(nextSlide, 5000);
        
        // Carousel functionality
        let carouselPosition = 0;
        const track = document.getElementById('carouselTrack');
        const slideWidth = 370;
        
        function moveCarousel(direction) {
            carouselPosition += direction * slideWidth;
            const maxPosition = -(slideWidth * 2);
            
            if (carouselPosition > 0) carouselPosition = maxPosition;
            if (carouselPosition < maxPosition) carouselPosition = 0;
            
            track.style.transform = \`translateX(\${carouselPosition}px)\`;
        }
    </script>
</body>
</html>`
  },

  // SITE 4: MINIMAL CORPORATE
  design4_minimal: {
    name: "Minimal Corporate",
    description: "Design épuré et professionnel avec mise en page minimaliste",
    generateHTML: (data) => `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - Corporate Minimal</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700;900&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Source Sans Pro', sans-serif; line-height: 1.8; color: #2c3e50; }
        
        /* Navigation Minimal */
        nav { background: #fff; padding: 2rem 0; border-bottom: 1px solid #ecf0f1; position: sticky; top: 0; z-index: 100; }
        .nav-container { max-width: 1000px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.8rem; font-weight: 700; color: #2c3e50; text-decoration: none; letter-spacing: -0.5px; }
        .nav-menu { display: flex; gap: 3rem; list-style: none; }
        .nav-link { color: #7f8c8d; text-decoration: none; font-weight: 400; transition: color 0.3s; }
        .nav-link:hover { color: #2c3e50; }
        .nav-cta { background: #2c3e50; color: white; padding: 0.75rem 2rem; text-decoration: none; font-weight: 600; }
        
        /* Hero Minimal */
        .hero-minimal { padding: 8rem 0; background: #fff; }
        .hero-container { max-width: 1000px; margin: 0 auto; padding: 0 2rem; }
        .hero-content { display: grid; grid-template-columns: 2fr 1fr; gap: 6rem; align-items: center; }
        .hero-text { }
        .hero-tag { color: #7f8c8d; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 2rem; }
        .hero-title { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 900; line-height: 1.2; margin-bottom: 2rem; }
        .hero-subtitle { font-size: 1.4rem; color: #7f8c8d; margin-bottom: 3rem; font-weight: 300; }
        .hero-desc { font-size: 1.1rem; color: #7f8c8d; margin-bottom: 4rem; }
        .hero-cta { background: #2c3e50; color: white; padding: 1.25rem 3rem; text-decoration: none; font-weight: 600; font-size: 1rem; display: inline-block; }
        
        .hero-visual { }
        .hero-stats { }
        .stat-item { text-align: center; padding: 2rem 0; border-top: 1px solid #ecf0f1; }
        .stat-item:first-child { border-top: none; }
        .stat-number { font-size: 2.5rem; font-weight: 900; color: #2c3e50; margin-bottom: 0.5rem; }
        .stat-label { color: #7f8c8d; font-size: 0.9rem; }
        
        /* Services Minimal */
        .services-minimal { padding: 8rem 0; background: #f8f9fa; }
        .services-container { max-width: 1000px; margin: 0 auto; padding: 0 2rem; }
        .services-header { text-align: center; margin-bottom: 6rem; }
        .services-tag { color: #7f8c8d; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1rem; }
        .services-title { font-size: 2.5rem; font-weight: 900; margin-bottom: 2rem; }
        .services-desc { font-size: 1.2rem; color: #7f8c8d; max-width: 600px; margin: 0 auto; }
        
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 0; }
        .service-item { background: white; padding: 4rem 2rem; border: 1px solid #ecf0f1; border-top: 4px solid #2c3e50; }
        .service-number { font-size: 1rem; color: #7f8c8d; font-weight: 600; margin-bottom: 1rem; }
        .service-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 1.5rem; }
        .service-desc { color: #7f8c8d; margin-bottom: 2rem; }
        .service-list { list-style: none; margin-bottom: 2rem; }
        .service-list li { padding: 0.5rem 0; color: #7f8c8d; position: relative; padding-left: 2rem; }
        .service-list li::before { content: '✓'; position: absolute; left: 0; color: #2c3e50; font-weight: bold; }
        .service-price { font-size: 1.3rem; font-weight: 700; color: #2c3e50; }
        
        /* Contact Minimal */
        .contact-minimal { padding: 8rem 0; background: #2c3e50; color: white; }
        .contact-container { max-width: 1000px; margin: 0 auto; padding: 0 2rem; text-align: center; }
        .contact-title { font-size: 2.5rem; font-weight: 900; margin-bottom: 2rem; }
        .contact-desc { font-size: 1.2rem; opacity: 0.8; margin-bottom: 4rem; max-width: 600px; margin-left: auto; margin-right: auto; }
        .contact-cta { background: white; color: #2c3e50; padding: 1.25rem 3rem; text-decoration: none; font-weight: 600; font-size: 1.1rem; margin: 0 1rem; display: inline-block; margin-bottom: 1rem; }
        
        /* Footer Minimal */
        footer { background: #fff; padding: 4rem 0 2rem; border-top: 1px solid #ecf0f1; }
        .footer-content { max-width: 1000px; margin: 0 auto; padding: 0 2rem; text-align: center; }
        .footer-title { font-size: 1.8rem; font-weight: 700; margin-bottom: 1rem; }
        .footer-desc { color: #7f8c8d; margin-bottom: 3rem; }
        .footer-bottom { border-top: 1px solid #ecf0f1; padding-top: 2rem; color: #7f8c8d; font-size: 0.9rem; }
        
        @media (max-width: 768px) {
            .hero-content { grid-template-columns: 1fr; gap: 3rem; }
            .services-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <nav>
        <div class="nav-container">
            <a href="#" class="logo">${data.companyName}</a>
            <ul class="nav-menu">
                <li><a href="#" class="nav-link">Accueil</a></li>
                <li><a href="#" class="nav-link">Services</a></li>
                <li><a href="#" class="nav-link">À propos</a></li>
                <li><a href="#" class="nav-link">Contact</a></li>
            </ul>
            <a href="tel:${data.phone}" class="nav-cta">${data.phone}</a>
        </div>
    </nav>

    <section class="hero-minimal">
        <div class="hero-container">
            <div class="hero-content">
                <div class="hero-text">
                    <div class="hero-tag">Électricien Certifié</div>
                    <h1 class="hero-title">${data.companyName}</h1>
                    <h2 class="hero-subtitle">Excellence & simplicité à ${data.city}</h2>
                    <p class="hero-desc">${data.description}</p>
                    <a href="#services" class="hero-cta">Nos services</a>
                </div>
                <div class="hero-visual">
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
                            <div class="stat-number">24h</div>
                            <div class="stat-label">Service d'urgence</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">100%</div>
                            <div class="stat-label">Satisfaction client</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="services-minimal" id="services">
        <div class="services-container">
            <div class="services-header">
                <div class="services-tag">Nos spécialités</div>
                <h2 class="services-title">Services Professionnels</h2>
                <p class="services-desc">Solutions électriques complètes avec approche personnalisée et qualité garantie.</p>
            </div>
            
            <div class="services-grid">
                <div class="service-item">
                    <div class="service-number">01</div>
                    <h3 class="service-title">Installation Électrique</h3>
                    <p class="service-desc">Installation complète aux normes avec matériel professionnel et garantie décennale.</p>
                    <ul class="service-list">
                        <li>Devis gratuit et détaillé</li>
                        <li>Normes NF C 15-100</li>
                        <li>Garantie décennale</li>
                        <li>Matériel certifié</li>
                    </ul>
                    <div class="service-price">85€/heure</div>
                </div>
                
                <div class="service-item">
                    <div class="service-number">02</div>
                    <h3 class="service-title">Dépannage d'Urgence</h3>
                    <p class="service-desc">Intervention rapide 24h/7j pour toute urgence électrique avec diagnostic gratuit.</p>
                    <ul class="service-list">
                        <li>Intervention sous 1 heure</li>
                        <li>Diagnostic gratuit</li>
                        <li>Disponible 24h/7j</li>
                        <li>Équipe qualifiée</li>
                    </ul>
                    <div class="service-price">Déplacement 75€</div>
                </div>
                
                <div class="service-item">
                    <div class="service-number">03</div>
                    <h3 class="service-title">Rénovation & Mise aux Normes</h3>
                    <p class="service-desc">Modernisation complète de vos installations avec solutions optimisées.</p>
                    <ul class="service-list">
                        <li>Étude personnalisée</li>
                        <li>Conformité CONSUEL</li>
                        <li>Solutions modernes</li>
                        <li>Financement possible</li>
                    </ul>
                    <div class="service-price">Devis gratuit</div>
                </div>
            </div>
        </div>
    </section>

    <section class="contact-minimal">
        <div class="contact-container">
            <h2 class="contact-title">Contactez-nous</h2>
            <p class="contact-desc">${data.description}</p>
            <div>
                <a href="tel:${data.phone}" class="contact-cta">Appeler maintenant</a>
                <a href="mailto:${data.email}" class="contact-cta">Envoyer un email</a>
            </div>
        </div>
    </section>

    <footer>
        <div class="footer-content">
            <h3 class="footer-title">${data.companyName}</h3>
            <p class="footer-desc">Design Minimal Corporate - Simplicité & Efficacité</p>
            <div class="footer-bottom">
                © 2025 ${data.companyName} - Design: Minimal Corporate
            </div>
        </div>
    </footer>
</body>
</html>`
  },

  // SITE 5: AVANT/APRÈS PORTFOLIO
  design5_portfolio: {
    name: "Avant/Après Portfolio",
    description: "Design portfolio avec comparaisons avant/après et galerie projets",
    generateHTML: (data) => `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - Portfolio Transformations</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Montserrat', sans-serif; background: #1a1a1a; color: #fff; }
        
        /* Navigation Portfolio */
        nav { background: rgba(0,0,0,0.9); backdrop-filter: blur(10px); padding: 1.5rem 0; position: fixed; width: 100%; top: 0; z-index: 1000; }
        .nav-container { max-width: 1400px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 2rem; font-weight: 800; color: #ff6b35; text-decoration: none; }
        .nav-menu { display: flex; gap: 2.5rem; list-style: none; }
        .nav-link { color: #ccc; text-decoration: none; font-weight: 500; transition: color 0.3s; }
        .nav-link:hover { color: #ff6b35; }
        .nav-cta { background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 0.75rem 2rem; border-radius: 25px; text-decoration: none; font-weight: 600; }
        
        /* Hero Portfolio */
        .hero-portfolio { min-height: 100vh; background: linear-gradient(rgba(26,26,26,0.7), rgba(26,26,26,0.7)), url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&h=1080&fit=crop') center/cover; display: flex; align-items: center; }
        .hero-container { max-width: 1400px; margin: 0 auto; padding: 0 2rem; }
        .hero-content { text-align: center; max-width: 800px; margin: 0 auto; }
        .hero-badge { background: rgba(255,107,53,0.2); color: #ff6b35; padding: 1rem 2rem; border: 1px solid #ff6b35; border-radius: 50px; margin-bottom: 2rem; display: inline-block; font-weight: 600; }
        .hero-title { font-size: clamp(3rem, 8vw, 6rem); font-weight: 900; margin-bottom: 1.5rem; }
        .hero-subtitle { font-size: 1.8rem; color: #ff6b35; margin-bottom: 2rem; font-weight: 300; }
        .hero-desc { font-size: 1.3rem; margin-bottom: 4rem; opacity: 0.9; line-height: 1.7; }
        .hero-cta { background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 1.5rem 3rem; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 1.1rem; }
        
        /* Portfolio Gallery */
        .portfolio-gallery { padding: 8rem 0; }
        .gallery-container { max-width: 1400px; margin: 0 auto; padding: 0 2rem; }
        .gallery-header { text-align: center; margin-bottom: 6rem; }
        .gallery-title { font-size: 3.5rem; font-weight: 800; margin-bottom: 2rem; }
        .gallery-subtitle { font-size: 1.3rem; color: #ff6b35; margin-bottom: 1rem; }
        .gallery-desc { font-size: 1.1rem; color: #ccc; max-width: 600px; margin: 0 auto; }
        
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 3rem; }
        .project-card { background: #262626; border-radius: 20px; overflow: hidden; position: relative; }
        .project-images { position: relative; height: 300px; overflow: hidden; }
        .before-after { position: relative; width: 100%; height: 100%; }
        .image-before, .image-after { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: all 0.5s ease; }
        .image-after { opacity: 0; }
        .project-card:hover .image-after { opacity: 1; }
        .project-card:hover .image-before { opacity: 0; }
        
        .project-overlay { position: absolute; top: 1rem; left: 1rem; background: rgba(255,107,53,0.9); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600; font-size: 0.9rem; }
        
        .project-content { padding: 2rem; }
        .project-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 1rem; }
        .project-desc { color: #ccc; margin-bottom: 1.5rem; line-height: 1.6; }
        .project-details { display: flex; justify-content: space-between; align-items: center; }
        .project-type { color: #ff6b35; font-weight: 600; font-size: 0.9rem; }
        .project-duration { color: #999; font-size: 0.9rem; }
        
        /* Services Portfolio */
        .services-portfolio { padding: 8rem 0; background: #262626; }
        .services-container { max-width: 1400px; margin: 0 auto; padding: 0 2rem; }
        .services-header { text-align: center; margin-bottom: 6rem; }
        .services-title { font-size: 3rem; font-weight: 800; margin-bottom: 2rem; }
        .services-subtitle { color: #ff6b35; font-size: 1.2rem; }
        
        .services-showcase { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; }
        .service-portfolio { background: linear-gradient(135deg, #333, #1a1a1a); padding: 3rem; border-radius: 20px; text-align: center; position: relative; overflow: hidden; }
        .service-portfolio::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #ff6b35, #f7931e); }
        .service-icon { font-size: 4rem; margin-bottom: 2rem; }
        .service-title { font-size: 1.6rem; font-weight: 700; margin-bottom: 1rem; }
        .service-desc { color: #ccc; margin-bottom: 2rem; line-height: 1.6; }
        .service-features { text-align: left; margin-bottom: 2rem; }
        .feature-item { color: #ccc; margin-bottom: 0.5rem; position: relative; padding-left: 1.5rem; }
        .feature-item::before { content: '●'; position: absolute; left: 0; color: #ff6b35; }
        .service-price { background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 1rem; border-radius: 10px; font-weight: 700; font-size: 1.1rem; }
        
        /* Contact Portfolio */
        .contact-portfolio { padding: 8rem 0; background: linear-gradient(135deg, #ff6b35, #f7931e); }
        .contact-container { max-width: 1400px; margin: 0 auto; padding: 0 2rem; text-align: center; }
        .contact-title { font-size: 3rem; font-weight: 800; margin-bottom: 2rem; color: white; }
        .contact-desc { font-size: 1.3rem; margin-bottom: 4rem; color: white; opacity: 0.9; max-width: 600px; margin-left: auto; margin-right: auto; }
        .contact-cta { background: white; color: #ff6b35; padding: 1.5rem 3rem; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 1.1rem; margin: 0 1rem; display: inline-block; margin-bottom: 1rem; }
        
        /* Footer Portfolio */
        footer { background: #0a0a0a; padding: 4rem 0 2rem; }
        .footer-content { max-width: 1400px; margin: 0 auto; padding: 0 2rem; text-align: center; }
        .footer-title { font-size: 2.5rem; font-weight: 800; color: #ff6b35; margin-bottom: 1rem; }
        .footer-desc { color: #666; margin-bottom: 3rem; }
        .footer-bottom { border-top: 1px solid #333; padding-top: 2rem; color: #666; }
        
        @media (max-width: 768px) {
            .projects-grid { grid-template-columns: 1fr; }
            .services-showcase { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <nav>
        <div class="nav-container">
            <a href="#" class="logo">${data.companyName}</a>
            <ul class="nav-menu">
                <li><a href="#" class="nav-link">Accueil</a></li>
                <li><a href="#" class="nav-link">Portfolio</a></li>
                <li><a href="#" class="nav-link">Services</a></li>
                <li><a href="#" class="nav-link">Contact</a></li>
            </ul>
            <a href="tel:${data.phone}" class="nav-cta">${data.phone}</a>
        </div>
    </nav>

    <section class="hero-portfolio">
        <div class="hero-container">
            <div class="hero-content">
                <span class="hero-badge">PORTFOLIO TRANSFORMATIONS</span>
                <h1 class="hero-title">${data.companyName}</h1>
                <h2 class="hero-subtitle">Avant/Après Spectaculaires</h2>
                <p class="hero-desc">${data.description}</p>
                <a href="#portfolio" class="hero-cta">Voir nos réalisations</a>
            </div>
        </div>
    </section>

    <section class="portfolio-gallery" id="portfolio">
        <div class="gallery-container">
            <div class="gallery-header">
                <h2 class="gallery-title">Nos Transformations</h2>
                <p class="gallery-subtitle">Découvrez nos réalisations</p>
                <p class="gallery-desc">Passez votre souris sur les images pour voir la transformation avant/après de nos projets électriques.</p>
            </div>
            
            <div class="projects-grid">
                <div class="project-card">
                    <div class="project-images">
                        <div class="before-after">
                            <img src="https://images.unsplash.com/photo-1558618047-3c8c76ca7815?w=500&h=300&fit=crop" alt="Avant" class="image-before">
                            <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&h=300&fit=crop" alt="Après" class="image-after">
                        </div>
                        <div class="project-overlay">AVANT → APRÈS</div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Rénovation Électrique Complète</h3>
                        <p class="project-desc">Modernisation totale de l'installation électrique d'une maison de 120m² avec mise aux normes et domotique.</p>
                        <div class="project-details">
                            <span class="project-type">Installation Premium</span>
                            <span class="project-duration">3 semaines</span>
                        </div>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-images">
                        <div class="before-after">
                            <img src="https://images.unsplash.com/photo-1609839777870-91eeaec93bb8?w=500&h=300&fit=crop" alt="Avant" class="image-before">
                            <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&h=300&fit=crop" alt="Après" class="image-after">
                        </div>
                        <div class="project-overlay">TRANSFORMATION</div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Tableau Électrique Moderne</h3>
                        <p class="project-desc">Remplacement complet d'un ancien tableau électrique par une solution moderne et sécurisée.</p>
                        <div class="project-details">
                            <span class="project-type">Mise aux Normes</span>
                            <span class="project-duration">2 jours</span>
                        </div>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-images">
                        <div class="before-after">
                            <img src="https://images.unsplash.com/photo-1558618047-3c8c76ca7815?w=500&h=300&fit=crop&sat=-100" alt="Avant" class="image-before">
                            <img src="https://images.unsplash.com/photo-1558618047-3c8c76ca7815?w=500&h=300&fit=crop" alt="Après" class="image-after">
                        </div>
                        <div class="project-overlay">INNOVATION</div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Maison Connectée</h3>
                        <p class="project-desc">Installation complète de domotique avec contrôle intelligent de l'éclairage et des prises.</p>
                        <div class="project-details">
                            <span class="project-type">Domotique</span>
                            <span class="project-duration">1 semaine</span>
                        </div>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-images">
                        <div class="before-after">
                            <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&h=300&fit=crop&brightness=0.5" alt="Avant" class="image-before">
                            <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&h=300&fit=crop" alt="Après" class="image-after">
                        </div>
                        <div class="project-overlay">RÉNOVATION</div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Éclairage Design</h3>
                        <p class="project-desc">Création d'un éclairage architectural moderne avec spots LED et variateurs intelligents.</p>
                        <div class="project-details">
                            <span class="project-type">Éclairage</span>
                            <span class="project-duration">4 jours</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="services-portfolio">
        <div class="services-container">
            <div class="services-header">
                <h2 class="services-title">Expertise & Savoir-faire</h2>
                <p class="services-subtitle">Services professionnels de transformation électrique</p>
            </div>
            
            <div class="services-showcase">
                <div class="service-portfolio">
                    <div class="service-icon">⚡</div>
                    <h3 class="service-title">Installation Transformation</h3>
                    <p class="service-desc">Installation électrique complète avec transformation visuelle spectaculaire de vos espaces.</p>
                    <div class="service-features">
                        <div class="feature-item">Analyse avant/après détaillée</div>
                        <div class="feature-item">Matériel design premium</div>
                        <div class="feature-item">Finitions soignées</div>
                        <div class="feature-item">Photos documentation</div>
                    </div>
                    <div class="service-price">À partir de 85€/h</div>
                </div>
                
                <div class="service-portfolio">
                    <div class="service-icon">🎨</div>
                    <h3 class="service-title">Rénovation Design</h3>
                    <p class="service-desc">Modernisation complète avec focus sur l'esthétique et l'impact visuel de la transformation.</p>
                    <div class="service-features">
                        <div class="feature-item">Conseil design inclus</div>
                        <div class="feature-item">Solutions esthétiques</div>
                        <div class="feature-item">Éclairage d'ambiance</div>
                        <div class="feature-item">Cachage des câbles</div>
                    </div>
                    <div class="service-price">Devis sur mesure</div>
                </div>
                
                <div class="service-portfolio">
                    <div class="service-icon">📸</div>
                    <h3 class="service-title">Documentation Projet</h3>
                    <p class="service-desc">Suivi photo complet de votre projet avec documentation avant/après professionnelle.</p>
                    <div class="service-features">
                        <div class="feature-item">Photos avant intervention</div>
                        <div class="feature-item">Suivi étapes travaux</div>
                        <div class="feature-item">Photos finales HD</div>
                        <div class="feature-item">Dossier digital complet</div>
                    </div>
                    <div class="service-price">Inclus avec projet</div>
                </div>
            </div>
        </div>
    </section>

    <section class="contact-portfolio">
        <div class="contact-container">
            <h2 class="contact-title">Transformons Votre Projet</h2>
            <p class="contact-desc">${data.description}</p>
            <div>
                <a href="tel:${data.phone}" class="contact-cta">Appeler maintenant</a>
                <a href="mailto:${data.email}" class="contact-cta">Demander un devis</a>
            </div>
        </div>
    </section>

    <footer>
        <div class="footer-content">
            <h3 class="footer-title">${data.companyName}</h3>
            <p class="footer-desc">Design Portfolio Avant/Après - Transformations Spectaculaires</p>
            <div class="footer-bottom">
                © 2025 ${data.companyName} - Design: Avant/Après Portfolio
            </div>
        </div>
    </footer>
</body>
</html>`
  }
};

// Fonction principale pour générer les 5 sites
async function generateFiveDifferentSites() {
  console.log('🚀 GÉNÉRATION DE 5 SITES COMPLÈTEMENT DIFFÉRENTS');
  console.log('================================================');
  console.log(`📋 Formulaire unique utilisé: ${SAME_FORM_DATA.companyName} - ${SAME_FORM_DATA.trade} à ${SAME_FORM_DATA.city}`);
  console.log('================================================\n');

  const designs = Object.keys(FIVE_UNIQUE_DESIGNS);
  
  for (let i = 0; i < designs.length; i++) {
    const designKey = designs[i];
    const design = FIVE_UNIQUE_DESIGNS[designKey];
    
    console.log(`🎨 ${i + 1}/5 - Génération: ${design.name}`);
    console.log(`   📝 Description: ${design.description}`);
    
    try {
      const outputDir = path.join(__dirname, 'public', 'generated-sites', `site-${designKey}`);
      await fs.mkdir(outputDir, { recursive: true });
      
      const pageHTML = design.generateHTML(SAME_FORM_DATA);
      await fs.writeFile(path.join(outputDir, 'index.html'), pageHTML);
      
      console.log(`   ✅ Généré: site-${designKey}/index.html`);
      console.log(`   🌐 Structure: ${getDesignStructure(designKey)}`);
      
    } catch (error) {
      console.error(`   ❌ Erreur: ${error.message}`);
    }
    
    console.log('');
  }
  
  console.log('🎉 GÉNÉRATION TERMINÉE !');
  console.log('========================');
  console.log('✅ 5 sites complètement différents générés');
  console.log('📱 Tous responsive et optimisés');
  console.log('🎨 Designs uniques avec structures distinctes');
  console.log('📁 Dossier: public/generated-sites/site-design*');
  
  console.log('\n💡 RÉSUMÉ DES DESIGNS CRÉÉS:');
  console.log('1. Magazine Éditorial - Layout magazine avec grilles asymétriques');
  console.log('2. Timeline Industriel - Design industriel avec processus étapes');
  console.log('3. Slider Showcase - Créatif avec slider interactif et animations');
  console.log('4. Minimal Corporate - Épuré et professionnel');
  console.log('5. Avant/Après Portfolio - Portfolio avec transformations visuelles');
}

// Fonction helper pour décrire la structure
function getDesignStructure(designKey) {
  const structures = {
    'design1_magazine': 'Magazine: Hero grid + Services asymétriques + Typo élégante',
    'design2_timeline': 'Industriel: Timeline horizontale + Processus 4 étapes + Tech UI',
    'design3_slider': 'Créatif: Slider 3 slides + Carousel services + Animations',
    'design4_minimal': 'Minimal: Layout épuré + Stats verticales + Typography focus',
    'design5_portfolio': 'Portfolio: Avant/après hover + Galerie projets + Transformations'
  };
  return structures[designKey] || 'Structure personnalisée';
}

// Exécuter la génération
generateFiveDifferentSites().catch(console.error);