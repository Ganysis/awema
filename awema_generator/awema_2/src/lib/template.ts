// Template multi-pages pour AWEMA_2
export interface TemplateData {
  // Données entreprise
  companyName: string
  trade: string
  description: string
  
  // Contact
  ownerName: string
  email: string
  phone: string
  address: string
  city: string
  
  // Design
  primaryColor: string
  secondaryColor: string
  logoUrl?: string
  
  // Services détaillés (illimité)
  services: Array<{
    id: string
    name: string
    description: string
    detailedDescription: string
    price?: string
    images?: string[]
  }>
  
  // Zones d'intervention
  serviceCities: string[]
  
  // Informations légales
  legalInfo: {
    siret?: string
    vatNumber?: string
    legalForm?: string
    capital?: string
    rcs?: string
    address: string
    city: string
    postalCode: string
  }
  
  // Horaires
  openingHours?: string
  emergencyAvailable?: boolean
  
  // SEO
  domain: string
  keywords: string[]
}

export function generateHTML(data: TemplateData): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - ${data.trade} ${data.city}</title>
    <meta name="description" content="${data.description}. ${data.trade} professionnel à ${data.city}. Contactez ${data.ownerName} au ${data.phone}">
    <meta name="keywords" content="${data.keywords.join(', ')}">
    
    <!-- SEO -->
    <meta property="og:title" content="${data.companyName} - ${data.trade} ${data.city}">
    <meta property="og:description" content="${data.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://${data.domain}">
    
    <!-- Schema.org -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "${data.companyName}",
      "description": "${data.description}",
      "telephone": "${data.phone}",
      "email": "${data.email}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${data.address}",
        "addressLocality": "${data.city}",
        "addressCountry": "FR"
      },
      "url": "https://${data.domain}",
      "priceRange": "€€",
      "openingHours": "${data.openingHours || 'Mo-Fr 09:00-18:00'}"
    }
    </script>
    
    <style>
        ${generateCSS(data)}
    </style>
</head>
<body>
    ${generateHeader(data)}
    ${generateHero(data)}
    ${generateServices(data)}
    ${generateAbout(data)}
    ${generateContact(data)}
    ${generateFooter(data)}
    
    <script>
        ${generateJS(data)}
    </script>
</body>
</html>`
}

function generateCSS(data: TemplateData): string {
  return `
    :root {
        --primary-color: ${data.primaryColor};
        --secondary-color: ${data.secondaryColor};
        --text-dark: #1f2937;
        --text-light: #6b7280;
        --bg-light: #f9fafb;
        --white: #ffffff;
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: var(--text-dark);
        background: var(--white);
    }
    
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }
    
    /* Header */
    .header {
        background: var(--white);
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
    }
    
    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
    }
    
    .logo {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--primary-color);
    }
    
    .header-contact {
        display: flex;
        align-items: center;
        gap: 2rem;
    }
    
    .contact-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-dark);
        text-decoration: none;
        font-weight: 500;
    }
    
    .contact-item:hover {
        color: var(--primary-color);
    }
    
    .btn {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background: var(--primary-color);
        color: var(--white);
        text-decoration: none;
        border-radius: 6px;
        font-weight: 600;
        transition: all 0.3s;
        border: none;
        cursor: pointer;
    }
    
    .btn:hover {
        background: var(--secondary-color);
        transform: translateY(-2px);
    }
    
    .btn-secondary {
        background: transparent;
        color: var(--primary-color);
        border: 2px solid var(--primary-color);
    }
    
    /* Hero */
    .hero {
        background: linear-gradient(135deg, var(--primary-color)15, var(--bg-light));
        padding: 8rem 0 4rem;
        text-align: center;
    }
    
    .hero h1 {
        font-size: 3rem;
        font-weight: 800;
        color: var(--primary-color);
        margin-bottom: 1rem;
    }
    
    .hero p {
        font-size: 1.2rem;
        color: var(--text-light);
        margin-bottom: 2rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
    
    .hero-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    /* Services */
    .services {
        padding: 4rem 0;
        background: var(--white);
    }
    
    .section-title {
        text-align: center;
        font-size: 2.5rem;
        color: var(--primary-color);
        margin-bottom: 3rem;
    }
    
    .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }
    
    .service-card {
        background: var(--white);
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        text-align: center;
        transition: transform 0.3s;
    }
    
    .service-card:hover {
        transform: translateY(-5px);
    }
    
    .service-card h3 {
        color: var(--primary-color);
        margin-bottom: 1rem;
        font-size: 1.3rem;
    }
    
    .service-card p {
        color: var(--text-light);
        margin-bottom: 1rem;
    }
    
    .service-price {
        font-weight: 600;
        color: var(--secondary-color);
        font-size: 1.1rem;
    }
    
    /* About */
    .about {
        padding: 4rem 0;
        background: var(--bg-light);
    }
    
    .about-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: center;
    }
    
    .about-text h2 {
        color: var(--primary-color);
        margin-bottom: 1.5rem;
        font-size: 2rem;
    }
    
    .about-text p {
        color: var(--text-light);
        margin-bottom: 1.5rem;
        font-size: 1.1rem;
    }
    
    .about-features {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-top: 2rem;
    }
    
    .feature {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-dark);
        font-weight: 500;
    }
    
    .feature::before {
        content: "✓";
        color: var(--primary-color);
        font-weight: bold;
    }
    
    /* Contact */
    .contact {
        padding: 4rem 0;
        background: var(--white);
    }
    
    .contact-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
    }
    
    .contact-form {
        background: var(--bg-light);
        padding: 2rem;
        border-radius: 12px;
    }
    
    .form-group {
        margin-bottom: 1.5rem;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: var(--text-dark);
    }
    
    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 1rem;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 1rem;
        transition: border-color 0.3s;
    }
    
    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--primary-color);
    }
    
    .contact-info h3 {
        color: var(--primary-color);
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
    }
    
    .contact-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: var(--bg-light);
        border-radius: 8px;
    }
    
    .contact-icon {
        background: var(--primary-color);
        color: var(--white);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }
    
    /* Footer */
    .footer {
        background: var(--primary-color);
        color: var(--white);
        padding: 3rem 0 1rem;
        text-align: center;
    }
    
    .footer-content {
        margin-bottom: 2rem;
    }
    
    .footer h3 {
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }
    
    .footer p {
        opacity: 0.9;
        margin-bottom: 0.5rem;
    }
    
    .footer-bottom {
        border-top: 1px solid rgba(255,255,255,0.2);
        padding-top: 1rem;
        opacity: 0.8;
        font-size: 0.9rem;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
        .hero h1 {
            font-size: 2rem;
        }
        
        .header-contact {
            display: none;
        }
        
        .about-content,
        .contact-content {
            grid-template-columns: 1fr;
        }
        
        .hero-actions {
            flex-direction: column;
            align-items: center;
        }
        
        .about-features {
            grid-template-columns: 1fr;
        }
    }
    
    /* Animations */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-on-scroll {
        animation: fadeInUp 0.6s ease forwards;
    }
  `
}

function generateHeader(data: TemplateData): string {
  return `
    <header class="header">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    ${data.logoUrl ? `<img src="${data.logoUrl}" alt="${data.companyName}" style="height: 40px;">` : data.companyName}
                </div>
                <div class="header-contact">
                    <a href="tel:${data.phone}" class="contact-item">
                        <span>📞</span>
                        <span>${data.phone}</span>
                    </a>
                    <a href="mailto:${data.email}" class="contact-item">
                        <span>✉️</span>
                        <span>${data.email}</span>
                    </a>
                    <a href="#contact" class="btn">Devis Gratuit</a>
                </div>
            </div>
        </div>
    </header>
  `
}

function generateHero(data: TemplateData): string {
  return `
    <section class="hero">
        <div class="container">
            <h1>${data.companyName}</h1>
            <p>${data.description}</p>
            <div class="hero-actions">
                <a href="tel:${data.phone}" class="btn">📞 Appeler maintenant</a>
                <a href="#contact" class="btn btn-secondary">Demander un devis</a>
            </div>
            ${data.emergencyAvailable ? '<p style="margin-top: 1rem; font-weight: bold; color: var(--primary-color);">🚨 Service d\'urgence 24h/7j</p>' : ''}
        </div>
    </section>
  `
}

function generateServices(data: TemplateData): string {
  const servicesHTML = data.services.map(service => `
    <div class="service-card">
        <h3>${service.name}</h3>
        <p>${service.description}</p>
        ${service.price ? `<div class="service-price">${service.price}</div>` : ''}
    </div>
  `).join('')

  return `
    <section class="services" id="services">
        <div class="container">
            <h2 class="section-title">Nos Services</h2>
            <div class="services-grid">
                ${servicesHTML}
            </div>
        </div>
    </section>
  `
}

function generateAbout(data: TemplateData): string {
  return `
    <section class="about" id="about">
        <div class="container">
            <div class="about-content">
                <div class="about-text">
                    <h2>À propos de ${data.companyName}</h2>
                    <p>${data.description}</p>
                    <p>Contactez ${data.ownerName} pour tous vos besoins en ${data.trade.toLowerCase()} à ${data.city} et ses environs.</p>
                    <div class="about-features">
                        <div class="feature">Professionnel certifié</div>
                        <div class="feature">Devis gratuit</div>
                        <div class="feature">Intervention rapide</div>
                        <div class="feature">Garantie qualité</div>
                    </div>
                </div>
                <div class="about-image">
                    <div style="background: var(--primary-color); height: 300px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 4rem;">
                        🏢
                    </div>
                </div>
            </div>
        </div>
    </section>
  `
}

function generateContact(data: TemplateData): string {
  return `
    <section class="contact" id="contact">
        <div class="container">
            <h2 class="section-title">Nous Contacter</h2>
            <div class="contact-content">
                <div class="contact-form">
                    <h3>Demande de devis gratuit</h3>
                    <form id="contactForm">
                        <div class="form-group">
                            <label for="name">Nom complet</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Téléphone</label>
                            <input type="tel" id="phone" name="phone">
                        </div>
                        <div class="form-group">
                            <label for="message">Description de votre projet</label>
                            <textarea id="message" name="message" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="btn" style="width: 100%;">Envoyer ma demande</button>
                    </form>
                </div>
                <div class="contact-info">
                    <h3>Informations</h3>
                    <div class="contact-item">
                        <div class="contact-icon">📞</div>
                        <div>
                            <strong>Téléphone</strong><br>
                            <a href="tel:${data.phone}" style="color: inherit;">${data.phone}</a>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon">✉️</div>
                        <div>
                            <strong>Email</strong><br>
                            <a href="mailto:${data.email}" style="color: inherit;">${data.email}</a>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon">📍</div>
                        <div>
                            <strong>Zone d'intervention</strong><br>
                            ${data.city} et environs
                        </div>
                    </div>
                    ${data.openingHours ? `
                    <div class="contact-item">
                        <div class="contact-icon">⏰</div>
                        <div>
                            <strong>Horaires</strong><br>
                            ${data.openingHours}
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
    </section>
  `
}

function generateFooter(data: TemplateData): string {
  return `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <h3>${data.companyName}</h3>
                <p>${data.trade} professionnel à ${data.city}</p>
                <p>📞 ${data.phone} • ✉️ ${data.email}</p>
                <p>📍 ${data.address}, ${data.city}</p>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} ${data.companyName}. Tous droits réservés.</p>
                <p>Site créé par <a href="https://awema.fr" style="color: inherit;">AWEMA</a></p>
            </div>
        </div>
    </footer>
  `
}

function generateJS(data: TemplateData): string {
  return `
    // Gestion du formulaire de contact
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
            company: '${data.companyName}',
            contactEmail: '${data.email}'
        };
        
        // Création du lien mailto
        const subject = encodeURIComponent('Demande de devis - ' + data.name);
        const body = encodeURIComponent(
            'Nom: ' + data.name + '\\n' +
            'Email: ' + data.email + '\\n' +
            'Téléphone: ' + (data.phone || 'Non renseigné') + '\\n\\n' +
            'Message: ' + data.message
        );
        
        // Ouvrir le client email
        window.location.href = 'mailto:${data.email}?subject=' + subject + '&body=' + body;
        
        // Message de confirmation
        alert('Merci pour votre demande ! Votre client email va s\'ouvrir pour finaliser l\'envoi.');
        
        // Réinitialiser le formulaire
        this.reset();
    });
    
    // Smooth scrolling
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
    
    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
    
    console.log('Site ${data.companyName} chargé avec succès !');
  `
}