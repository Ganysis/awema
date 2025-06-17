// Test génération de 5 variations du même site avec aspects différents
const fs = require('fs').promises;
const path = require('path');

// Configuration des 5 variations
const VARIATIONS = [
  {
    id: 'modern-pro',
    name: 'Modern Pro',
    primaryColor: '#1e40af',
    secondaryColor: '#3b82f6',
    style: 'modern',
    template: 'electricien-elite-pro',
    description: 'Version moderne et professionnelle avec design épuré'
  },
  {
    id: 'classic-artisan',
    name: 'Classic Artisan', 
    primaryColor: '#059669',
    secondaryColor: '#10b981',
    style: 'classic',
    template: 'electricien-artisan-moderne',
    description: 'Version classique artisanale avec tons chaleureux'
  },
  {
    id: 'corporate-deluxe',
    name: 'Corporate Deluxe',
    primaryColor: '#7c3aed',
    secondaryColor: '#a855f7',
    style: 'corporate',
    template: 'electricien-corporate-deluxe',
    description: 'Version corporate haut de gamme'
  },
  {
    id: 'bold-energy',
    name: 'Bold Energy',
    primaryColor: '#dc2626',
    secondaryColor: '#ef4444',
    style: 'bold',
    template: 'electricien-elite-pro',
    description: 'Version audacieuse et énergique'
  },
  {
    id: 'minimal-tech',
    name: 'Minimal Tech',
    primaryColor: '#374151',
    secondaryColor: '#6b7280',
    style: 'minimal',
    template: 'electricien-artisan-moderne',
    description: 'Version minimaliste et technologique'
  }
];

// Services de base
const BASE_SERVICES = [
  {
    slug: 'installation-electrique',
    name: 'Installation Électrique Complète',
    description: 'Installation électrique neuve aux normes NF C 15-100 avec tableau dernière génération',
    fullDescription: 'Conception et réalisation d\'installations électriques complètes pour habitations et locaux professionnels. Mise aux normes, câblage, tableaux électriques modulaires avec protection différentielle, prises spécialisées, éclairage LED intelligent.',
    features: ['Devis gratuit', 'Normes NF C 15-100', 'Garantie décennale', 'Matériel Schneider/Legrand'],
    price: 'À partir de 85€/h',
    icon: '⚡'
  },
  {
    slug: 'depannage-urgence',
    name: 'Dépannage Électrique 24h/7j',
    description: 'Intervention d\'urgence pour panne électrique, disjoncteur, court-circuit',
    fullDescription: 'Service de dépannage électrique disponible 24 heures sur 24, 7 jours sur 7. Diagnostic rapide, réparation immédiate de pannes électriques, disjoncteurs qui sautent, courts-circuits, coupures de courant.',
    features: ['Intervention 24h/7j', 'Déplacement sous 1h', 'Diagnostic inclus', 'Réparation immédiate'],
    price: 'Déplacement 75€ + tarif intervention',
    icon: '🚨'
  },
  {
    slug: 'domotique-intelligente',
    name: 'Domotique & Maison Connectée',
    description: 'Installation de systèmes domotiques intelligents pour optimiser confort et économies',
    fullDescription: 'Conception et installation de systèmes domotiques sur-mesure : éclairage intelligent, volets automatisés, thermostat connecté, système d\'alarme, caméras de surveillance, contrôle à distance via smartphone.',
    features: ['Système sur-mesure', 'Compatible iOS/Android', 'Formation incluse', 'SAV 2 ans'],
    price: 'Sur devis personnalisé',
    icon: '🏠'
  },
  {
    slug: 'borne-recharge-vehicule',
    name: 'Borne de Recharge Véhicule Électrique',
    description: 'Installation de bornes de recharge pour véhicules électriques et hybrides',
    fullDescription: 'Installation complète de bornes de recharge pour véhicules électriques : bornes murales 7kW à 22kW, borne sur pied, système de gestion intelligent, compatibilité tous véhicules. Éligible crédit d\'impôt.',
    features: ['Éligible aides ADVENIR', 'Installation certifiée IRVE', 'Garantie constructeur', 'Maintenance préventive'],
    price: 'À partir de 1200€ pose incluse',
    icon: '🔌'
  },
  {
    slug: 'mise-aux-normes',
    name: 'Mise aux Normes & Rénovation',
    description: 'Mise en conformité installations électriques anciennes selon normes actuelles',
    fullDescription: 'Diagnostic complet de votre installation électrique et mise aux normes NF C 15-100. Remplacement tableaux électriques vétustes, mise à la terre, protection différentielle, adaptation aux besoins modernes.',
    features: ['Diagnostic complet offert', 'Conformité CONSUEL', 'Financement possible', 'Intervention rapide'],
    price: 'Diagnostic gratuit + devis détaillé',
    icon: '⚙️'
  },
  {
    slug: 'eclairage-led-design',
    name: 'Éclairage LED & Design',
    description: 'Conception d\'éclairages LED sur-mesure pour ambiances et économies d\'énergie',
    fullDescription: 'Étude d\'éclairage personnalisée avec solutions LED haute efficacité : spots encastrés, bandeaux LED, éclairage d\'ambiance, variation d\'intensité, programmation horaire. Jusqu\'à 80% d\'économies énergétiques.',
    features: ['Étude gratuite', 'LED garantie 5 ans', '80% économies énergie', 'Design sur-mesure'],
    price: 'Étude éclairage offerte',
    icon: '💡'
  }
];

// Villes d'intervention
const CITIES = [
  'Paris 8ème', 'Paris 1er', 'Paris 2ème', 'Paris 7ème', 'Paris 16ème', 'Paris 17ème',
  'Neuilly-sur-Seine', 'Levallois-Perret', 'Boulogne-Billancourt', 'Issy-les-Moulineaux',
  'Courbevoie', 'Puteaux', 'Nanterre', 'Suresnes', 'Rueil-Malmaison', 'Saint-Cloud',
  'Versailles', 'Le Vésinet', 'Maisons-Laffitte', 'Saint-Germain-en-Laye'
];

// Données de base du site
const BASE_TEMPLATE_DATA = {
  companyName: 'Électricité Expert Pro',
  trade: 'Électricien',
  city: 'Paris 8ème',
  description: 'Spécialiste en installations électriques haute performance, domotique intelligente et solutions énergétiques durables. Expert certifié RGE avec plus de 15 ans d\'expérience.',
  phone: '01 85 76 32 18',
  email: 'contact@electricite-expert-pro.fr',
  address: '42 Avenue des Champs-Élysées',
  services: BASE_SERVICES,
  cities: CITIES,
  website: 'https://electricite-expert-pro.fr'
};

// Fonction pour générer les styles CSS adaptés à chaque variation
function generateVariationCSS(variation) {
  return `
        :root {
            --primary: ${variation.primaryColor};
            --secondary: ${variation.secondaryColor};
            --white: #ffffff;
            --gray-50: #f9fafb;
            --gray-100: #f3f4f6;
            --gray-600: #4b5563;
            --gray-700: #374151;
            --gray-800: #1f2937;
            --gray-900: #111827;
            --success: #10b981;
            --warning: #f59e0b;
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: var(--gray-800);
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        /* Navigation Ultra-Moderne avec Sous-menu */
        .elementor-nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            z-index: 1000;
            padding: 1rem 0;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .nav-logo {
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--primary);
            text-decoration: none;
        }
        
        .nav-menu {
            display: flex;
            list-style: none;
            gap: 2rem;
            position: relative;
        }
        
        .nav-item {
            position: relative;
        }
        
        .nav-link {
            color: var(--gray-800);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .nav-link:hover, .nav-link.active {
            color: var(--primary);
        }
        
        .nav-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            background: var(--white);
            min-width: 280px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            border-radius: 1rem;
            padding: 1rem 0;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        }
        
        .nav-item:hover .nav-dropdown {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .dropdown-item {
            display: block;
            padding: 0.75rem 1.5rem;
            color: var(--gray-700);
            text-decoration: none;
            transition: all 0.3s ease;
            border-left: 3px solid transparent;
        }
        
        .dropdown-item:hover {
            background: var(--gray-50);
            color: var(--primary);
            border-left-color: var(--primary);
        }
        
        .dropdown-icon {
            margin-right: 0.5rem;
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
            background: var(--gray-800);
            transition: all 0.3s ease;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
        }
        
        /* Hero Section Ultra-Avancé */
        .hero-advanced {
            min-height: 100vh;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
        }
        
        .hero-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
            color: var(--white);
        }
        
        .hero-title {
            font-size: 3.5rem;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 1.5rem;
        }
        
        .hero-subtitle {
            font-size: 1.5rem;
            font-weight: 300;
            margin-bottom: 1rem;
            opacity: 0.9;
        }
        
        .hero-description {
            font-size: 1.1rem;
            margin-bottom: 2rem;
            opacity: 0.8;
        }
        
        .hero-buttons {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .hero-button {
            display: inline-block;
            padding: 1rem 2rem;
            background: var(--white);
            color: var(--primary);
            text-decoration: none;
            border-radius: 0.5rem;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .hero-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        
        .hero-button.secondary {
            background: transparent;
            color: var(--white);
            border: 2px solid var(--white);
        }
        
        /* Services Premium */
        .services-premium {
            padding: 6rem 0;
            background: var(--gray-50);
        }
        
        .services-header {
            text-align: center;
            margin-bottom: 4rem;
        }
        
        .services-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--primary);
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }
        
        .service-card {
            background: var(--white);
            padding: 2.5rem;
            border-radius: 1.5rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            border-top: 4px solid var(--primary);
        }
        
        .service-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .service-icon {
            font-size: 3rem;
            margin-bottom: 1.5rem;
        }
        
        .service-name {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--primary);
        }
        
        .service-description {
            color: var(--gray-600);
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }
        
        .service-features {
            list-style: none;
            margin-bottom: 1.5rem;
        }
        
        .service-features li {
            padding: 0.25rem 0;
            color: var(--gray-600);
        }
        
        .service-features li:before {
            content: "✓ ";
            color: var(--primary);
            font-weight: bold;
        }
        
        .service-price {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 1rem;
        }
        
        .service-cta {
            display: flex;
            gap: 1rem;
        }
        
        .service-button {
            flex: 1;
            text-align: center;
            padding: 0.75rem 1rem;
            background: var(--primary);
            color: var(--white);
            text-decoration: none;
            border-radius: 0.5rem;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .service-button:hover {
            background: var(--secondary);
            transform: translateY(-1px);
        }
        
        .service-button.secondary {
            background: transparent;
            color: var(--primary);
            border: 2px solid var(--primary);
        }
        
        /* Contact Section */
        .contact-advanced {
            padding: 6rem 0;
            background: var(--gray-900);
            color: var(--white);
        }
        
        .contact-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
        }
        
        .contact-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }
        
        .contact-methods {
            display: grid;
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .contact-item {
            display: flex;
            gap: 1rem;
            align-items: center;
        }
        
        .contact-icon {
            font-size: 1.5rem;
            width: 3rem;
        }
        
        .contact-value {
            font-size: 1.25rem;
            font-weight: 600;
        }
        
        .contact-value a {
            color: var(--white);
            text-decoration: none;
        }
        
        /* Footer Ultra-Moderne */
        .footer-mega {
            background: var(--gray-900);
            color: var(--white);
            padding: 3rem 0 1rem;
        }
        
        .footer-content {
            text-align: center;
        }
        
        .footer-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }
        
        .footer-description {
            opacity: 0.8;
            margin-bottom: 2rem;
        }
        
        .footer-bottom {
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 2rem;
            margin-top: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .footer-copyright {
            opacity: 0.6;
        }
        
        .footer-credits a {
            color: var(--white);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 80px;
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
            
            .nav-dropdown {
                position: static;
                opacity: 1;
                visibility: visible;
                transform: none;
                box-shadow: none;
                border-radius: 0;
                background: var(--gray-50);
                margin: 0.5rem 0;
            }
            
            .nav-toggle {
                display: flex;
            }
            
            .hero-content {
                grid-template-columns: 1fr;
                text-align: center;
            }
            
            .hero-title {
                font-size: 2.5rem;
            }
            
            .services-grid {
                grid-template-columns: 1fr;
            }
            
            .contact-content {
                grid-template-columns: 1fr;
            }
            
            .footer-bottom {
                flex-direction: column;
                gap: 1rem;
            }
        }
        
        /* Loading Animation */
        .gsap-fade-in {
            opacity: 0;
            transform: translateY(30px);
        }
    `;
}

// Fonction pour générer le HTML de l'index avec sous-menu services
function generateIndexHTML(templateData, variation) {
  return `<!DOCTYPE html>
<html lang="fr" class="no-js">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${templateData.companyName} - ${templateData.trade} professionnel à ${templateData.city}</title>
    <meta name="description" content="${templateData.description}">
    <meta name="keywords" content="${templateData.trade} ${templateData.city}, installation électrique ${templateData.city}, dépannage électricien urgence, domotique ${templateData.city}, borne recharge électrique, mise aux normes électrique, éclairage LED design">
    
    <!-- Ultra-Professional Elementor Pro Meta Tags -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${templateData.companyName} - ${templateData.trade} professionnel">
    <meta property="og:description" content="${templateData.description}">
    <meta property="og:url" content="${templateData.website}">
    
    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "${templateData.companyName}",
      "description": "${templateData.description}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${templateData.address}",
        "addressLocality": "${templateData.city}",
        "addressCountry": "FR"
      },
      "telephone": "${templateData.phone}",
      "email": "${templateData.email}",
      "url": "${templateData.website}",
      "priceRange": "€€",
      "openingHours": "Lundi-Vendredi 8h-19h, Samedi 9h-17h, Urgences 24h/7j",
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "48.8566",
          "longitude": "2.3522"
        },
        "geoRadius": "30000"
      }
    }
    </script>
    
    <!-- GSAP and Performance CSS -->
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"></noscript>
    
    <style>
        ${generateVariationCSS(variation)}
    </style>
</head>

<body class="elementor-pro-page">
    <!-- Navigation Ultra-Moderne avec Sous-menu -->
    <nav class="elementor-nav">
        <div class="container">
            <div class="nav-container">
                <a href="index.html" class="nav-logo">${templateData.companyName}</a>
                <button class="nav-toggle" id="navToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="nav-menu" id="navMenu">
                    <li class="nav-item"><a href="#accueil" class="nav-link">Accueil</a></li>
                    <li class="nav-item">
                        <a href="#services" class="nav-link">Services <span style="font-size: 0.8em;">▼</span></a>
                        <div class="nav-dropdown">
                            ${templateData.services.map(service => `
                            <a href="service-${service.slug}.html" class="dropdown-item">
                                <span class="dropdown-icon">${service.icon}</span>
                                ${service.name}
                            </a>`).join('')}
                        </div>
                    </li>
                    <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
                    <li class="nav-item"><a href="mentions-legales.html" class="nav-link">Mentions légales</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section Ultra-Avancé -->
    <section id="accueil" class="hero-advanced elementor-section gsap-fade-in">
        <div class="container">
            <div class="hero-content">
                <div class="hero-text">
                    <h1 class="hero-title">${templateData.companyName}</h1>
                    <p class="hero-subtitle">${templateData.trade} professionnel à ${templateData.city}</p>
                    <p class="hero-description">${templateData.description}</p>
                    
                    <div class="hero-buttons">
                        <a href="#services" class="hero-button">Nos Services</a>
                        <a href="contact.html" class="hero-button secondary">Devis Gratuit</a>
                    </div>
                </div>
                
                <div class="hero-image">
                    <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop" 
                         alt="${templateData.trade} professionnel" 
                         style="width: 100%; border-radius: 1rem;">
                </div>
            </div>
        </div>
    </section>

    <!-- Services Premium -->
    <section id="services" class="services-premium elementor-section gsap-fade-in">
        <div class="container">
            <div class="services-header">
                <h2 class="services-title">Nos Services ${templateData.trade}</h2>
                <p class="services-subtitle">Des solutions professionnelles adaptées à vos besoins</p>
            </div>
            
            <div class="services-grid">
                ${templateData.services.map(service => `
                    <div class="service-card">
                        <div class="service-icon">${service.icon}</div>
                        <h3 class="service-name">${service.name}</h3>
                        <p class="service-description">${service.description}</p>
                        <ul class="service-features">
                            ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                        <div class="service-price">${service.price}</div>
                        <div class="service-cta">
                            <a href="service-${service.slug}.html" class="service-button">Voir détails</a>
                            <a href="contact.html" class="service-button secondary">Devis gratuit</a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Contact Advanced -->
    <section id="contact" class="contact-advanced elementor-section gsap-fade-in">
        <div class="container">
            <div class="contact-content">
                <div class="contact-info">
                    <h2 class="contact-title">Contactez-nous</h2>
                    <p class="contact-subtitle">Besoin d'un ${templateData.trade.toLowerCase()} ? Nous sommes là pour vous aider</p>
                    
                    <div class="contact-methods">
                        <div class="contact-item">
                            <div class="contact-icon">📞</div>
                            <div>
                                <div class="contact-value">
                                    <a href="tel:${templateData.phone}">${templateData.phone}</a>
                                </div>
                                <p>Disponible Lundi-Vendredi 8h-19h, Samedi 9h-17h, Urgences 24h/7j</p>
                            </div>
                        </div>
                        
                        <div class="contact-item">
                            <div class="contact-icon">✉️</div>
                            <div>
                                <div class="contact-value">
                                    <a href="mailto:${templateData.email}">${templateData.email}</a>
                                </div>
                                <p>Réponse sous 24h</p>
                            </div>
                        </div>
                        
                        <div class="contact-item">
                            <div class="contact-icon">📍</div>
                            <div>
                                <div class="contact-value">${templateData.address}</div>
                                <p>${templateData.city}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="contact-form-wrapper">
                    <form class="contact-form" style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 1rem;">
                        <h3 style="margin-bottom: 1.5rem;">Demande de devis gratuit</h3>
                        <div style="display: grid; gap: 1rem;">
                            <input type="text" placeholder="Votre nom" style="padding: 1rem; border: none; border-radius: 0.5rem;">
                            <input type="email" placeholder="Votre email" style="padding: 1rem; border: none; border-radius: 0.5rem;">
                            <input type="tel" placeholder="Votre téléphone" style="padding: 1rem; border: none; border-radius: 0.5rem;">
                            <select style="padding: 1rem; border: none; border-radius: 0.5rem;">
                                <option value="">Choisissez un service</option>
                                ${templateData.services.map(service => `<option value="${service.slug}">${service.name}</option>`).join('')}
                            </select>
                            <textarea placeholder="Décrivez votre projet" rows="4" style="padding: 1rem; border: none; border-radius: 0.5rem; resize: vertical;"></textarea>
                            <button type="submit" style="padding: 1rem; background: var(--primary); color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
                                Envoyer ma demande
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer Mega -->
    <footer class="footer-mega elementor-section">
        <div class="container">
            <div class="footer-content">
                <h3 class="footer-title">${templateData.companyName}</h3>
                <p class="footer-description">
                    ${templateData.trade} professionnel depuis plus de 10 ans.<br>
                    Intervention sur ${templateData.cities.length} villes.
                </p>
                
                <div class="footer-bottom">
                    <p class="footer-copyright">
                        © 2025 ${templateData.companyName}. Tous droits réservés.
                    </p>
                    <p class="footer-credits">
                        Site créé avec <a href="https://claude.ai/code" target="_blank">Claude Code</a> - ${variation.name}
                    </p>
                </div>
            </div>
        </div>
    </footer>

    <!-- GSAP Animation Script -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    
    <script>
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate elements on page load
        gsap.timeline()
            .from('.hero-title', { opacity: 0, y: 50, duration: 1, ease: "power2.out" })
            .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" }, "-=0.6")
            .from('.hero-description', { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" }, "-=0.4")
            .from('.hero-button', { opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.3")
            .from('.hero-image', { opacity: 0, scale: 0.9, duration: 1, ease: "power2.out" }, "-=0.8");
        
        // Scroll animations
        gsap.utils.toArray('.gsap-fade-in').forEach((element, i) => {
            gsap.fromTo(element, {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });
        
        // Service cards hover animation
        gsap.utils.toArray('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { y: -5, duration: 0.3, ease: "power2.out" });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
            });
        });
        
        // Mobile navigation toggle
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: { y: target, offsetY: 80 },
                        ease: "power2.inOut"
                    });
                }
            });
        });
        
        console.log('🚀 ${variation.name} - Elementor Pro Ultra-Professional site loaded successfully!');
    </script>
</body>
</html>`;
}

// Fonction pour générer une page service + ville
function generateServiceCityHTML(service, city, templateData, variation) {
  const title = `${service.name} ${city} - ${templateData.companyName}`;
  const description = `${service.name} à ${city}. ${service.description} Intervention rapide et devis gratuit.`;
  
  return `<!DOCTYPE html>
<html lang="fr" class="no-js">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="${service.name}, ${city}, ${templateData.trade} ${city}, devis gratuit ${city}">
    
    <!-- Schema.org Service Local -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "${service.name}",
      "description": "${service.fullDescription}",
      "provider": {
        "@type": "LocalBusiness",
        "name": "${templateData.companyName}",
        "telephone": "${templateData.phone}",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "${city}",
          "addressCountry": "FR"
        }
      },
      "areaServed": "${city}",
      "serviceType": "${templateData.trade}",
      "offers": {
        "@type": "Offer",
        "description": "${service.price}"
      }
    }
    </script>
    
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"></noscript>
    
    <style>
        ${generateVariationCSS(variation)}
        
        .breadcrumb {
            background: var(--gray-50);
            padding: 2rem 0;
            margin-top: 80px;
        }
        
        .breadcrumb-nav {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--gray-600);
        }
        
        .breadcrumb-nav a {
            color: var(--primary);
            text-decoration: none;
        }
        
        .hero-service {
            padding: 6rem 0;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: var(--white);
            text-align: center;
        }
        
        .hero-service h1 {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1.5rem;
        }
        
        .content-section {
            padding: 6rem 0;
            background: var(--gray-50);
        }
        
        .content-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 4rem;
        }
        
        .content-main {
            background: var(--white);
            padding: 3rem;
            border-radius: 2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .content-sidebar {
            background: var(--white);
            padding: 2rem;
            border-radius: 2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            height: fit-content;
        }
        
        .cta-section {
            padding: 4rem 0;
            background: var(--gray-900);
            color: var(--white);
            text-align: center;
        }
        
        .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 2rem;
        }
        
        .cta-button {
            padding: 1rem 2rem;
            background: var(--primary);
            color: var(--white);
            text-decoration: none;
            border-radius: 0.75rem;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        
        @media (max-width: 768px) {
            .content-grid {
                grid-template-columns: 1fr;
            }
            .hero-service h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>

<body class="elementor-pro-page">
    <!-- Navigation -->
    <nav class="elementor-nav">
        <div class="container">
            <div class="nav-container">
                <a href="index.html" class="nav-logo">${templateData.companyName}</a>
                <button class="nav-toggle" id="navToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="nav-menu" id="navMenu">
                    <li class="nav-item"><a href="index.html" class="nav-link">Accueil</a></li>
                    <li class="nav-item"><a href="index.html#services" class="nav-link">Services</a></li>
                    <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Breadcrumb -->
    <section class="breadcrumb">
        <div class="container">
            <nav class="breadcrumb-nav">
                <a href="index.html">Accueil</a>
                <span>></span>
                <a href="service-${service.slug}.html">${service.name}</a>
                <span>></span>
                <span>${city}</span>
            </nav>
        </div>
    </section>

    <!-- Hero Service -->
    <section class="hero-service">
        <div class="container">
            <h1>${service.name} ${city}</h1>
            <p class="subtitle">${service.description}</p>
            <p style="margin-top: 1rem; opacity: 0.9;">Intervention rapide à ${city} - ${service.price}</p>
        </div>
    </section>

    <!-- Content Section -->
    <section class="content-section">
        <div class="container">
            <div class="content-grid">
                <div class="content-main">
                    <h2>Service ${service.name} à ${city}</h2>
                    <p>${service.fullDescription}</p>
                    
                    <h3 style="margin: 2rem 0 1rem;">Pourquoi choisir ${templateData.companyName} à ${city} ?</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${service.features.map(feature => `<li style="padding: 0.5rem 0; position: relative; padding-left: 2rem;"><span style="position: absolute; left: 0; color: var(--primary);">✓</span> ${feature}</li>`).join('')}
                    </ul>
                    
                    <h3 style="margin: 2rem 0 1rem;">Zone d'intervention à ${city}</h3>
                    <p>Nous intervenons rapidement dans toute la ville de ${city} et ses environs. Notre équipe se déplace gratuitement pour établir un devis personnalisé.</p>
                    
                    <div style="background: var(--gray-50); padding: 2rem; border-radius: 1rem; margin: 2rem 0;">
                        <h4 style="color: var(--primary); margin-bottom: 1rem;">💰 Tarification transparente</h4>
                        <p><strong>${service.price}</strong></p>
                        <p>Devis gratuit et sans engagement. Facturation transparente sans surprise.</p>
                    </div>
                </div>
                
                <div class="content-sidebar">
                    <h3 style="color: var(--primary); margin-bottom: 1.5rem;">📞 Contact direct</h3>
                    <div style="text-align: center;">
                        <p style="margin-bottom: 1rem;">Intervention à ${city}</p>
                        <a href="tel:${templateData.phone}" style="display: block; padding: 1rem; background: var(--primary); color: var(--white); text-decoration: none; border-radius: 0.5rem; margin-bottom: 1rem; font-weight: 600;">
                            ${templateData.phone}
                        </a>
                        <p style="font-size: 0.9rem; color: var(--gray-600);">Urgences 24h/7j</p>
                    </div>
                    
                    <hr style="margin: 2rem 0; border: none; border-top: 1px solid var(--gray-200);">
                    
                    <h4 style="color: var(--primary); margin-bottom: 1rem;">🏙️ Autres villes</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${templateData.cities.slice(0, 6).map(c => c !== city ? 
                            `<a href="${service.slug}-${c.toLowerCase().replace(/\s+/g, '-').replace(/[àáâãäå]/g, 'a').replace(/[èéêë]/g, 'e').replace(/[ìíîï]/g, 'i').replace(/[òóôõö]/g, 'o').replace(/[ùúûü]/g, 'u').replace(/[ç]/g, 'c').replace(/[^a-z0-9-]/g, '')}.html" style="background: var(--gray-100); padding: 0.25rem 0.5rem; border-radius: 0.25rem; text-decoration: none; color: var(--gray-700); font-size: 0.8rem;">${c}</a>` : ''
                        ).join('')}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <div class="container">
            <h2>Besoin de ${service.name} à ${city} ?</h2>
            <p>Contactez-nous maintenant pour un devis gratuit</p>
            
            <div class="cta-buttons">
                <a href="tel:${templateData.phone}" class="cta-button">
                    📞 Appeler maintenant
                </a>
                <a href="contact.html" class="cta-button" style="background: transparent; border: 2px solid var(--white);">
                    📧 Devis en ligne
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer-mega">
        <div class="container">
            <div class="footer-content">
                <h3 class="footer-title">${templateData.companyName}</h3>
                <p class="footer-description">
                    ${templateData.trade} professionnel à ${city}<br>
                    ${service.name} - Intervention rapide
                </p>
                
                <div class="footer-bottom">
                    <p class="footer-copyright">
                        © 2025 ${templateData.companyName}. Tous droits réservés.
                    </p>
                    <p class="footer-credits">
                        ${variation.name} - <a href="https://claude.ai/code" target="_blank">Claude Code</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Mobile navigation
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
        
        console.log('🚀 ${service.name} ${city} - ${variation.name} loaded!');
    </script>
</body>
</html>`;
}

// Fonction principale pour générer toutes les variations
async function generateAllVariations() {
  console.log('🚀 DÉBUT DE LA GÉNÉRATION DE 5 VARIATIONS COMPLÈTES');
  console.log('============================================================');
  
  for (let i = 0; i < VARIATIONS.length; i++) {
    const variation = VARIATIONS[i];
    const siteId = `site-variation-${variation.id}`;
    const outputDir = path.join(__dirname, 'public', 'generated-sites', siteId);
    
    console.log(`\n📊 ${i + 1}/5 - Génération: ${variation.name}`);
    console.log(`🎨 Style: ${variation.style}`);
    console.log(`🎨 Couleurs: ${variation.primaryColor} / ${variation.secondaryColor}`);
    console.log(`📁 Dossier: ${siteId}`);
    
    try {
      // Créer le dossier de sortie
      await fs.mkdir(outputDir, { recursive: true });
      
      // Générer la page d'accueil
      const indexHTML = generateIndexHTML(BASE_TEMPLATE_DATA, variation);
      await fs.writeFile(path.join(outputDir, 'index.html'), indexHTML);
      console.log('  ✅ index.html généré');
      
      // Générer les pages services individuelles
      for (const service of BASE_TEMPLATE_DATA.services) {
        const serviceHTML = generateServiceHTML(service, BASE_TEMPLATE_DATA, variation);
        await fs.writeFile(path.join(outputDir, `service-${service.slug}.html`), serviceHTML);
        console.log(`  ✅ service-${service.slug}.html généré`);
      }
      
      // Générer les pages services × ville (SEO local)
      let servicesCityGenerated = 0;
      for (const service of BASE_TEMPLATE_DATA.services.slice(0, 3)) { // Limiter à 3 services pour éviter trop de pages
        for (const city of BASE_TEMPLATE_DATA.cities.slice(0, 5)) { // Limiter à 5 villes principales
          if (city !== BASE_TEMPLATE_DATA.city) { // Éviter la ville principale
            const serviceCityHTML = generateServiceCityHTML(service, city, BASE_TEMPLATE_DATA, variation);
            const filename = `${service.slug}-${city.toLowerCase().replace(/\s+/g, '-').replace(/[àáâãäå]/g, 'a').replace(/[èéêë]/g, 'e').replace(/[ìíîï]/g, 'i').replace(/[òóôõö]/g, 'o').replace(/[ùúûü]/g, 'u').replace(/[ç]/g, 'c').replace(/[^a-z0-9-]/g, '')}.html`;
            await fs.writeFile(path.join(outputDir, filename), serviceCityHTML);
            servicesCityGenerated++;
          }
        }
      }
      console.log(`  ✅ ${servicesCityGenerated} pages services × ville générées`);
      
      // Générer page contact simple (adaptée à la variation)
      const contactHTML = generateContactHTML(BASE_TEMPLATE_DATA, variation);
      await fs.writeFile(path.join(outputDir, 'contact.html'), contactHTML);
      console.log('  ✅ contact.html généré');
      
      // Générer page mentions légales simple
      const legalHTML = generateLegalHTML(BASE_TEMPLATE_DATA, variation);
      await fs.writeFile(path.join(outputDir, 'mentions-legales.html'), legalHTML);
      console.log('  ✅ mentions-legales.html généré');
      
      // Compter les fichiers générés
      const files = await fs.readdir(outputDir);
      console.log(`  📊 Total: ${files.length} pages générées`);
      
    } catch (error) {
      console.error(`❌ Erreur lors de la génération de ${variation.name}:`, error.message);
    }
  }
  
  console.log('\n🎉 GÉNÉRATION TERMINÉE AVEC SUCCÈS !');
  console.log('============================================================');
  console.log('📊 Résumé:');
  console.log(`🌟 5 variations complètes générées`);
  console.log(`📄 ~${6 + BASE_TEMPLATE_DATA.services.length + (3 * 4)} pages par variation`);
  console.log(`🎨 5 styles différents: ${VARIATIONS.map(v => v.style).join(', ')}`);
  console.log(`🔗 Sous-menu services intégré sur chaque site`);
  console.log(`🌍 Pages SEO locales (service × ville) générées`);
  console.log(`📁 Sites disponibles dans: public/generated-sites/site-variation-*`);
}

// Fonctions utilitaires pour les pages secondaires
function generateServiceHTML(service, templateData, variation) {
  // Version simplifiée de la page service individuelle
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${service.name} - ${templateData.companyName}</title>
    <style>${generateVariationCSS(variation)}</style>
</head>
<body class="elementor-pro-page">
    <nav class="elementor-nav">
        <div class="container">
            <div class="nav-container">
                <a href="index.html" class="nav-logo">${templateData.companyName}</a>
                <ul class="nav-menu">
                    <li><a href="index.html" class="nav-link">Accueil</a></li>
                    <li><a href="index.html#services" class="nav-link">Services</a></li>
                    <li><a href="contact.html" class="nav-link">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <section style="padding: 8rem 0 4rem; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); color: var(--white); text-align: center;">
        <div class="container">
            <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">${service.name}</h1>
            <p style="font-size: 1.25rem; opacity: 0.9;">${service.description}</p>
            <div style="background: rgba(255,255,255,0.2); display: inline-block; padding: 1rem 2rem; border-radius: 2rem; margin-top: 2rem; font-size: 1.25rem; font-weight: 700;">
                💰 ${service.price}
            </div>
        </div>
    </section>

    <section style="padding: 6rem 0; background: var(--gray-50);">
        <div class="container">
            <div style="max-width: 800px; margin: 0 auto; background: var(--white); padding: 3rem; border-radius: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <h2 style="color: var(--primary); margin-bottom: 2rem;">Détails du service</h2>
                <p style="line-height: 1.7; margin-bottom: 2rem;">${service.fullDescription}</p>
                
                <h3 style="color: var(--primary); margin: 2rem 0 1rem;">Ce qui est inclus :</h3>
                <ul style="list-style: none; padding: 0;">
                    ${service.features.map(feature => `<li style="padding: 0.5rem 0; position: relative; padding-left: 2rem;"><span style="position: absolute; left: 0; color: var(--primary); font-weight: bold;">✓</span> ${feature}</li>`).join('')}
                </ul>
                
                <div style="text-align: center; margin-top: 3rem;">
                    <a href="contact.html" style="display: inline-block; padding: 1.25rem 2.5rem; background: var(--primary); color: var(--white); text-decoration: none; border-radius: 0.75rem; font-weight: 600; margin-right: 1rem;">
                        📧 Devis gratuit
                    </a>
                    <a href="tel:${templateData.phone}" style="display: inline-block; padding: 1.25rem 2.5rem; background: transparent; color: var(--primary); border: 2px solid var(--primary); text-decoration: none; border-radius: 0.75rem; font-weight: 600;">
                        📞 ${templateData.phone}
                    </a>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer-mega">
        <div class="container">
            <div class="footer-content">
                <h3 class="footer-title">${templateData.companyName}</h3>
                <p class="footer-description">${templateData.trade} professionnel - ${service.name}</p>
                <div class="footer-bottom">
                    <p class="footer-copyright">© 2025 ${templateData.companyName}. Tous droits réservés.</p>
                    <p class="footer-credits">${variation.name} - <a href="https://claude.ai/code" target="_blank">Claude Code</a></p>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>`;
}

function generateContactHTML(templateData, variation) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact - ${templateData.companyName}</title>
    <style>${generateVariationCSS(variation)}</style>
</head>
<body class="elementor-pro-page">
    <nav class="elementor-nav">
        <div class="container">
            <div class="nav-container">
                <a href="index.html" class="nav-logo">${templateData.companyName}</a>
                <ul class="nav-menu">
                    <li><a href="index.html" class="nav-link">Accueil</a></li>
                    <li><a href="index.html#services" class="nav-link">Services</a></li>
                    <li><a href="contact.html" class="nav-link active">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <section style="padding: 8rem 0 6rem; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); color: var(--white); text-align: center;">
        <div class="container">
            <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Contactez ${templateData.companyName}</h1>
            <p style="font-size: 1.25rem; opacity: 0.9;">Devis gratuit et intervention rapide</p>
        </div>
    </section>

    <section style="padding: 6rem 0; background: var(--gray-50);">
        <div class="container">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start;">
                <div style="background: var(--white); padding: 3rem; border-radius: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <h2 style="color: var(--primary); margin-bottom: 2rem;">Nos coordonnées</h2>
                    <div style="display: grid; gap: 2rem;">
                        <div style="display: flex; gap: 1rem; align-items: center; padding: 1.5rem; background: var(--gray-50); border-radius: 1rem;">
                            <div style="font-size: 2rem;">📞</div>
                            <div>
                                <h3 style="margin-bottom: 0.5rem;">Téléphone</h3>
                                <a href="tel:${templateData.phone}" style="color: var(--primary); font-weight: 600; text-decoration: none; font-size: 1.1rem;">${templateData.phone}</a>
                                <p style="color: var(--gray-600); font-size: 0.9rem;">Urgences 24h/7j</p>
                            </div>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: center; padding: 1.5rem; background: var(--gray-50); border-radius: 1rem;">
                            <div style="font-size: 2rem;">✉️</div>
                            <div>
                                <h3 style="margin-bottom: 0.5rem;">Email</h3>
                                <a href="mailto:${templateData.email}" style="color: var(--primary); font-weight: 600; text-decoration: none;">${templateData.email}</a>
                                <p style="color: var(--gray-600); font-size: 0.9rem;">Réponse sous 24h</p>
                            </div>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: center; padding: 1.5rem; background: var(--gray-50); border-radius: 1rem;">
                            <div style="font-size: 2rem;">📍</div>
                            <div>
                                <h3 style="margin-bottom: 0.5rem;">Adresse</h3>
                                <p style="color: var(--primary); font-weight: 600;">${templateData.address}</p>
                                <p style="color: var(--gray-600); font-size: 0.9rem;">${templateData.city}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="background: var(--white); padding: 3rem; border-radius: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <h2 style="color: var(--primary); margin-bottom: 1rem;">Demande de devis</h2>
                    <p style="color: var(--gray-600); margin-bottom: 2rem;">Remplissez ce formulaire pour recevoir votre devis gratuit</p>
                    
                    <form style="display: grid; gap: 1.5rem;">
                        <input type="text" placeholder="Votre nom complet" style="padding: 1rem; border: 2px solid var(--gray-200); border-radius: 0.75rem; font-size: 1rem;">
                        <input type="email" placeholder="Votre email" style="padding: 1rem; border: 2px solid var(--gray-200); border-radius: 0.75rem; font-size: 1rem;">
                        <input type="tel" placeholder="Votre téléphone" style="padding: 1rem; border: 2px solid var(--gray-200); border-radius: 0.75rem; font-size: 1rem;">
                        <select style="padding: 1rem; border: 2px solid var(--gray-200); border-radius: 0.75rem; font-size: 1rem; background: var(--white);">
                            <option value="">Choisissez un service</option>
                            ${templateData.services.map(service => `<option value="${service.slug}">${service.name}</option>`).join('')}
                        </select>
                        <textarea placeholder="Décrivez votre projet en détail..." rows="4" style="padding: 1rem; border: 2px solid var(--gray-200); border-radius: 0.75rem; font-size: 1rem; resize: vertical;"></textarea>
                        <button type="submit" style="padding: 1.25rem; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); color: var(--white); border: none; border-radius: 0.75rem; font-size: 1.1rem; font-weight: 600; cursor: pointer;">
                            📧 Envoyer ma demande
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer-mega">
        <div class="container">
            <div class="footer-content">
                <h3 class="footer-title">${templateData.companyName}</h3>
                <p class="footer-description">${templateData.trade} professionnel - Contact direct</p>
                <div class="footer-bottom">
                    <p class="footer-copyright">© 2025 ${templateData.companyName}. Tous droits réservés.</p>
                    <p class="footer-credits">${variation.name} - <a href="https://claude.ai/code" target="_blank">Claude Code</a></p>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>`;
}

function generateLegalHTML(templateData, variation) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mentions légales - ${templateData.companyName}</title>
    <style>${generateVariationCSS(variation)}</style>
</head>
<body class="elementor-pro-page">
    <nav class="elementor-nav">
        <div class="container">
            <div class="nav-container">
                <a href="index.html" class="nav-logo">${templateData.companyName}</a>
                <ul class="nav-menu">
                    <li><a href="index.html" class="nav-link">Accueil</a></li>
                    <li><a href="index.html#services" class="nav-link">Services</a></li>
                    <li><a href="contact.html" class="nav-link">Contact</a></li>
                    <li><a href="mentions-legales.html" class="nav-link active">Mentions légales</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <section style="padding: 8rem 0 6rem; background: var(--gray-50);">
        <div class="container">
            <div style="max-width: 800px; margin: 0 auto; background: var(--white); padding: 3rem; border-radius: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <h1 style="color: var(--primary); font-size: 2.5rem; margin-bottom: 2rem;">Mentions légales</h1>
                
                <h2 style="color: var(--primary); margin: 2rem 0 1rem;">1. Informations légales</h2>
                <p><strong>Raison sociale :</strong> ${templateData.companyName}</p>
                <p><strong>Adresse :</strong> ${templateData.address}, ${templateData.city}</p>
                <p><strong>Téléphone :</strong> ${templateData.phone}</p>
                <p><strong>Email :</strong> ${templateData.email}</p>
                
                <h2 style="color: var(--primary); margin: 2rem 0 1rem;">2. Activité</h2>
                <p>Entreprise de ${templateData.trade.toLowerCase()} spécialisée dans l'installation, la réparation et la maintenance d'équipements électriques pour particuliers et professionnels.</p>
                
                <h2 style="color: var(--primary); margin: 2rem 0 1rem;">3. Responsabilité</h2>
                <p>Les informations contenues sur ce site sont données à titre indicatif et peuvent être modifiées sans préavis. ${templateData.companyName} ne peut être tenue responsable d'erreurs ou d'omissions dans ces informations.</p>
                
                <h2 style="color: var(--primary); margin: 2rem 0 1rem;">4. Protection des données</h2>
                <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Pour exercer ce droit, contactez-nous à ${templateData.email}.</p>
                
                <div style="text-align: center; margin-top: 3rem;">
                    <a href="index.html" style="display: inline-block; padding: 1rem 2rem; background: var(--primary); color: var(--white); text-decoration: none; border-radius: 0.75rem; font-weight: 600;">
                        ← Retour à l'accueil
                    </a>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer-mega">
        <div class="container">
            <div class="footer-content">
                <h3 class="footer-title">${templateData.companyName}</h3>
                <p class="footer-description">${templateData.trade} professionnel - Mentions légales</p>
                <div class="footer-bottom">
                    <p class="footer-copyright">© 2025 ${templateData.companyName}. Tous droits réservés.</p>
                    <p class="footer-credits">${variation.name} - <a href="https://claude.ai/code" target="_blank">Claude Code</a></p>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>`;
}

// Lancer la génération
generateAllVariations().catch(console.error);