import { TemplateData } from '../template'
import { NavigationItem } from '../multi-page-generator'
import { PROFESSIONAL_IMAGES } from './ultra-pro-templates'

export function generatePlombierCorporateEliteContactTemplate(data: TemplateData, navigation: NavigationItem[]): string {
  const heroImage = PROFESSIONAL_IMAGES.plombier.hero[1]
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact ${data.companyName} - Plombier ${data.city} | Devis Gratuit | Dépannage 24h/7j</title>
    <meta name="description" content="💬 Contactez ${data.companyName}, plombier expert à ${data.city}. Devis gratuit, dépannage 24h/7j. ☎️ ${data.phone}. Intervention rapide dans +${data.serviceCities.length} villes.">
    <meta name="keywords" content="contact plombier ${data.city}, devis plomberie, dépannage urgence, ${data.phone}, plombier ${data.serviceCities.join(', plombier ')}">
    
    <!-- SEO Contact Page -->
    <meta property="og:title" content="Contact ${data.companyName} - Plombier Expert ${data.city}">
    <meta property="og:description" content="Devis gratuit, dépannage 24h/7j. Intervention rapide.">
    <meta property="og:image" content="${heroImage}">
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
        "openingHours": "${data.openingHours || 'Mo-Sa 08:00-18:00'}",
        "areaServed": [${data.serviceCities.map(city => `"${city}"`).join(', ')}]
      }
    }
    </script>
    
    <!-- Polices Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <!-- CSS Corporate Contact -->
    <style>
        :root {
            --primary: #0ea5e9;
            --primary-dark: #0284c7;
            --primary-light: #38bdf8;
            --secondary: #06b6d4;
            --accent: #f97316;
            --accent-dark: #ea580c;
            --text: #0f172a;
            --text-light: #64748b;
            --text-muted: #94a3b8;
            --bg: #ffffff;
            --bg-alt: #f8fafc;
            --bg-dark: #f1f5f9;
            --border: #e2e8f0;
            --border-light: #f1f5f9;
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
        
        /* Header */
        .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border-light);
            transition: var(--transition);
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
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
        
        .logo::before {
            content: '🔧';
            font-size: 1.75rem;
            animation: toolRotate 3s ease-in-out infinite;
        }
        
        @keyframes toolRotate {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(15deg); }
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
            padding: 0.75rem 1rem;
            border-radius: var(--radius);
            transition: var(--transition);
        }
        
        .nav-link.active,
        .nav-link:hover {
            color: var(--primary);
            background: var(--bg-alt);
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
            background: var(--bg-alt);
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
        
        /* Hero Contact */
        .hero-contact {
            background: linear-gradient(135deg, 
                rgba(14, 165, 233, 0.95) 0%, 
                rgba(6, 182, 212, 0.9) 100%
            ), url('${heroImage}');
            background-size: cover;
            background-position: center;
            color: var(--bg);
            padding: 8rem 0 4rem;
            margin-top: 80px;
            text-align: center;
        }
        
        .hero-contact h1 {
            font-family: 'Poppins', sans-serif;
            font-size: clamp(2.5rem, 6vw, 4rem);
            font-weight: 800;
            margin-bottom: 1rem;
            text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        
        .hero-contact p {
            font-size: 1.25rem;
            opacity: 0.95;
            max-width: 600px;
            margin: 0 auto;
        }
        
        /* Contact Methods */
        .contact-methods {
            padding: 6rem 0;
            background: var(--bg-alt);
        }
        
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .contact-card {
            background: var(--bg);
            padding: 2.5rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow);
            text-align: center;
            transition: var(--transition);
            border: 1px solid var(--border);
        }
        
        .contact-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-xl);
            border-color: var(--primary);
        }
        
        .contact-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 2rem;
            color: var(--bg);
            box-shadow: var(--shadow-lg);
        }
        
        .contact-card h3 {
            font-family: 'Poppins', sans-serif;
            font-size: 1.375rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--text);
        }
        
        .contact-card p {
            color: var(--text-light);
            margin-bottom: 1.5rem;
        }
        
        .contact-action {
            background: var(--primary);
            color: var(--bg);
            text-decoration: none;
            padding: 1rem 2rem;
            border-radius: var(--radius);
            font-weight: 600;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .contact-action:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
        }
        
        /* Contact Form */
        .contact-form-section {
            padding: 6rem 0;
            background: var(--bg);
        }
        
        .form-container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .contact-form {
            background: var(--bg-alt);
            padding: 3rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--border);
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--text);
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 1rem;
            border: 2px solid var(--border);
            border-radius: var(--radius);
            font-size: 1rem;
            transition: var(--transition);
            background: var(--bg);
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
        }
        
        .form-group textarea {
            resize: vertical;
            min-height: 120px;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        
        .urgence-notice {
            background: linear-gradient(135deg, var(--error), #dc2626);
            color: var(--bg);
            padding: 1.5rem;
            border-radius: var(--radius-lg);
            margin-bottom: 2rem;
            text-align: center;
        }
        
        .urgence-notice h4 {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        
        .btn-submit {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: var(--bg);
            border: none;
            padding: 1.25rem 2rem;
            border-radius: var(--radius-lg);
            font-size: 1.125rem;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            width: 100%;
            box-shadow: var(--shadow);
        }
        
        .btn-submit:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-lg);
        }
        
        /* Info Section */
        .info-section {
            padding: 6rem 0;
            background: var(--bg-alt);
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
        }
        
        .info-card {
            background: var(--bg);
            padding: 2rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow);
            border-left: 4px solid var(--primary);
        }
        
        .info-card h4 {
            font-family: 'Poppins', sans-serif;
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--text);
        }
        
        .info-card p {
            color: var(--text-light);
            line-height: 1.6;
        }
        
        /* Map Placeholder */
        .map-section {
            padding: 6rem 0;
            background: var(--bg);
        }
        
        .map-container {
            background: var(--bg-dark);
            height: 400px;
            border-radius: var(--radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-light);
            border: 2px dashed var(--border);
        }
        
        /* CTA Section */
        .cta-section {
            padding: 6rem 0;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: var(--bg);
            text-align: center;
        }
        
        .cta-content h2 {
            font-family: 'Poppins', sans-serif;
            font-size: clamp(2rem, 5vw, 3rem);
            font-weight: 800;
            margin-bottom: 1rem;
        }
        
        .cta-content p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.95;
        }
        
        .cta-phone {
            background: var(--accent);
            color: var(--text);
            text-decoration: none;
            padding: 1.25rem 2.5rem;
            border-radius: var(--radius-lg);
            font-weight: 700;
            font-size: 1.25rem;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            box-shadow: var(--shadow-lg);
        }
        
        .cta-phone:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-xl);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .nav-menu,
            .header-contact {
                display: none;
            }
            
            .mobile-menu-btn {
                display: flex;
            }
            
            .hero-contact {
                padding: 6rem 0 3rem;
            }
            
            .contact-grid {
                grid-template-columns: 1fr;
            }
            
            .form-row {
                grid-template-columns: 1fr;
            }
            
            .contact-form {
                padding: 2rem;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <a href="index.html" class="logo">
                    ${data.companyName}
                </a>
                
                <nav>
                    <ul class="nav-menu">
                        ${navigation.map(item => `
                            <li>
                                <a href="${item.href}" class="nav-link ${item.href === 'contact.html' ? 'active' : ''}">${item.label}</a>
                            </li>
                        `).join('')}
                    </ul>
                </nav>
                
                <div class="header-contact">
                    <a href="tel:${data.phone}" class="contact-phone">
                        📞 ${data.phone}
                    </a>
                    <a href="#devis" class="btn-primary">
                        Devis Gratuit
                    </a>
                </div>

                <button class="mobile-menu-btn">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>
            </div>
        </div>
    </header>

    <!-- Hero Contact -->
    <section class="hero-contact">
        <div class="container">
            <h1>Contactez Votre Plombier Expert</h1>
            <p>
                Devis gratuit sous 24h • Intervention rapide dans ${data.city} et région • 
                Dépannage d'urgence 24h/7j
            </p>
        </div>
    </section>

    <!-- Contact Methods -->
    <section class="contact-methods">
        <div class="container">
            <div style="text-align: center; margin-bottom: 3rem;">
                <h2 style="font-family: 'Poppins', sans-serif; font-size: 2.5rem; font-weight: 800; color: var(--text); margin-bottom: 1rem;">Comment Nous Contacter ?</h2>
                <p style="font-size: 1.125rem; color: var(--text-light);">Choisissez le moyen de contact qui vous convient le mieux</p>
            </div>
            
            <div class="contact-grid">
                <div class="contact-card">
                    <div class="contact-icon">📞</div>
                    <h3>Téléphone</h3>
                    <p>Appelez-nous pour un dépannage urgent ou un devis rapide</p>
                    <a href="tel:${data.phone}" class="contact-action">
                        ${data.phone}
                    </a>
                </div>
                
                <div class="contact-card">
                    <div class="contact-icon">📧</div>
                    <h3>Email</h3>
                    <p>Envoyez-nous votre demande détaillée par email</p>
                    <a href="mailto:${data.email}" class="contact-action">
                        ${data.email}
                    </a>
                </div>
                
                <div class="contact-card">
                    <div class="contact-icon">💬</div>
                    <h3>Formulaire</h3>
                    <p>Remplissez notre formulaire pour un devis personnalisé</p>
                    <a href="#devis" class="contact-action">
                        Demander un devis
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Form -->
    <section class="contact-form-section" id="devis">
        <div class="container">
            <div class="form-container">
                <div style="text-align: center; margin-bottom: 3rem;">
                    <h2 style="font-family: 'Poppins', sans-serif; font-size: 2.5rem; font-weight: 800; color: var(--text); margin-bottom: 1rem;">Demande de Devis Gratuit</h2>
                    <p style="font-size: 1.125rem; color: var(--text-light);">Remplissez ce formulaire pour recevoir votre devis personnalisé sous 24h</p>
                </div>
                
                <div class="urgence-notice">
                    <h4>🚨 Urgence Plomberie ?</h4>
                    <p>Pour un dépannage urgent, appelez directement le <strong>${data.phone}</strong></p>
                </div>
                
                <form class="contact-form" action="/api/forms/contact" method="POST">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="prenom">Prénom *</label>
                            <input type="text" id="prenom" name="prenom" required>
                        </div>
                        <div class="form-group">
                            <label for="nom">Nom *</label>
                            <input type="text" id="nom" name="nom" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telephone">Téléphone *</label>
                            <input type="tel" id="telephone" name="telephone" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email *</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="adresse">Adresse de l'intervention</label>
                        <input type="text" id="adresse" name="adresse" placeholder="Adresse complète">
                    </div>
                    
                    <div class="form-group">
                        <label for="type_intervention">Type d'intervention *</label>
                        <select id="type_intervention" name="type_intervention" required>
                            <option value="">Sélectionnez...</option>
                            <option value="depannage">Dépannage d'urgence</option>
                            <option value="installation">Installation sanitaire</option>
                            <option value="renovation">Rénovation salle de bain</option>
                            <option value="entretien">Entretien/Maintenance</option>
                            <option value="diagnostic">Diagnostic/Expertise</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="urgence">Niveau d'urgence</label>
                        <select id="urgence" name="urgence">
                            <option value="normale">Normal (sous 48h)</option>
                            <option value="rapide">Rapide (sous 24h)</option>
                            <option value="urgente">Urgent (dans la journée)</option>
                            <option value="immediate">Immédiat (dépannage)</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="description">Description du problème *</label>
                        <textarea id="description" name="description" placeholder="Décrivez votre problème de plomberie en détail..." required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="budget">Budget approximatif</label>
                        <select id="budget" name="budget">
                            <option value="">Non défini</option>
                            <option value="0-500">0 - 500 €</option>
                            <option value="500-1000">500 - 1 000 €</option>
                            <option value="1000-2500">1 000 - 2 500 €</option>
                            <option value="2500-5000">2 500 - 5 000 €</option>
                            <option value="5000+">Plus de 5 000 €</option>
                        </select>
                    </div>
                    
                    <input type="hidden" name="source" value="contact-form">
                    <input type="hidden" name="companyName" value="${data.companyName}">
                    
                    <button type="submit" class="btn-submit">
                        📤 Envoyer ma demande
                    </button>
                </form>
            </div>
        </div>
    </section>

    <!-- Informations Pratiques -->
    <section class="info-section">
        <div class="container">
            <div style="text-align: center; margin-bottom: 3rem;">
                <h2 style="font-family: 'Poppins', sans-serif; font-size: 2.5rem; font-weight: 800; color: var(--text); margin-bottom: 1rem;">Informations Pratiques</h2>
            </div>
            
            <div class="info-grid">
                <div class="info-card">
                    <h4>🕐 Horaires d'Ouverture</h4>
                    <p><strong>Lundi - Vendredi :</strong> 8h00 - 18h00<br>
                    <strong>Samedi :</strong> 9h00 - 17h00<br>
                    <strong>Dimanche :</strong> Urgences uniquement<br>
                    <strong>Urgences :</strong> 24h/7j</p>
                </div>
                
                <div class="info-card">
                    <h4>📍 Zone d'Intervention</h4>
                    <p>Nous intervenons dans ${data.city} et toute la région :<br>
                    ${data.serviceCities.slice(0, 6).join(', ')}<br>
                    ${data.serviceCities.length > 6 ? `et ${data.serviceCities.length - 6} autres villes` : ''}</p>
                </div>
                
                <div class="info-card">
                    <h4>💰 Nos Tarifs</h4>
                    <p><strong>Devis :</strong> Gratuit et sans engagement<br>
                    <strong>Déplacement :</strong> Gratuit dans un rayon de 15km<br>
                    <strong>Dépannage urgence :</strong> À partir de 89€<br>
                    <strong>Tarif horaire :</strong> 65€/h</p>
                </div>
                
                <div class="info-card">
                    <h4>🛡️ Nos Garanties</h4>
                    <p><strong>Garantie décennale :</strong> Tous travaux<br>
                    <strong>Assurance responsabilité :</strong> Complète<br>
                    <strong>Matériel :</strong> Garantie constructeur<br>
                    <strong>SAV :</strong> Suivi personnalisé</p>
                </div>
                
                <div class="info-card">
                    <h4>💳 Moyens de Paiement</h4>
                    <p><strong>Espèces</strong> • <strong>Chèque</strong> • <strong>Carte bancaire</strong><br>
                    <strong>Virement</strong> • <strong>Paiement en 3x</strong><br>
                    <strong>CESU</strong> (pour particuliers)<br>
                    Facture remise après intervention</p>
                </div>
                
                <div class="info-card">
                    <h4>📋 Nos Certifications</h4>
                    <p><strong>RGE :</strong> Reconnu Garant Environnement<br>
                    <strong>PGN :</strong> Professionnel Gaz Naturel<br>
                    <strong>Qualibat :</strong> Certification qualité<br>
                    <strong>Formation :</strong> Continue et à jour</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Map Section -->
    <section class="map-section">
        <div class="container">
            <div style="text-align: center; margin-bottom: 3rem;">
                <h2 style="font-family: 'Poppins', sans-serif; font-size: 2.5rem; font-weight: 800; color: var(--text); margin-bottom: 1rem;">Notre Zone d'Intervention</h2>
                <p style="font-size: 1.125rem; color: var(--text-light);">Basé à ${data.city}, nous intervenons dans toute la région</p>
            </div>
            
            <div class="map-container">
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🗺️</div>
                    <p style="font-size: 1.125rem; color: var(--text-muted);">
                        Carte interactive disponible<br>
                        Zone d'intervention : ${data.city} et ${data.serviceCities.length} villes environnantes
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Final -->
    <section class="cta-section">
        <div class="container">
            <div class="cta-content">
                <h2>Une Question ? Un Problème Urgent ?</h2>
                <p>Notre équipe est disponible pour vous conseiller et intervenir rapidement</p>
                <a href="tel:${data.phone}" class="cta-phone">
                    📞 ${data.phone}
                </a>
            </div>
        </div>
    </section>

    <script>
        // Form submission handling
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '⏳ Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                submitBtn.textContent = '✅ Demande envoyée !';
                submitBtn.style.background = 'linear-gradient(135deg, var(--success), #16a34a)';
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, 1500);
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Form validation enhancements
        const requiredFields = document.querySelectorAll('input[required], select[required], textarea[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.style.borderColor = 'var(--error)';
                } else {
                    this.style.borderColor = 'var(--success)';
                }
            });
        });

        // Phone number formatting
        const phoneInput = document.getElementById('telephone');
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 10) {
                value = value.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
            }
            this.value = value;
        });
    </script>
</body>
</html>`
}