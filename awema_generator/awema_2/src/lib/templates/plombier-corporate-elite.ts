import { TemplateData } from '../template'
import { NavigationItem } from '../multi-page-generator'
import { PROFESSIONAL_IMAGES } from './ultra-pro-templates'

export function generatePlombierCorporateEliteTemplate(data: TemplateData, navigation: NavigationItem[]): string {
  const heroImage = PROFESSIONAL_IMAGES.plombier.hero[0]
  const serviceImages = PROFESSIONAL_IMAGES.plombier.services
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - Plombier Expert ${data.city} | Dépannage 24h/7j | Installation & Rénovation</title>
    <meta name="description" content="🔧 ${data.companyName} - Plombier professionnel à ${data.city}. Dépannage urgence 24h/7j, installation, rénovation sanitaire. Devis gratuit. ✅ +${data.serviceCities.length} villes. 🏆 Certifié RGE.">
    <meta name="keywords" content="plombier ${data.city}, dépannage plomberie, installation sanitaire, ${data.services.map(s => s.name.toLowerCase()).join(', ')}, urgence plombier, rénovation salle de bain">
    
    <!-- SEO Avancé -->
    <meta property="og:title" content="${data.companyName} - Plombier Expert ${data.city}">
    <meta property="og:description" content="Dépannage plomberie 24h/7j, installation sanitaire, rénovation. Devis gratuit.">
    <meta property="og:image" content="${heroImage}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://${data.domain}">
    <meta name="twitter:card" content="summary_large_image">
    
    <!-- Schema.org -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Plumber",
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
      "image": "${heroImage}",
      "priceRange": "€€",
      "openingHours": "${data.openingHours || 'Mo-Sa 08:00-18:00'}",
      "areaServed": [${data.serviceCities.map(city => `"${city}"`).join(', ')}],
      "serviceType": "Plumbing Installation and Repair",
      "hasCredential": "RGE Certified",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "247"
      }
    }
    </script>
    
    <!-- Polices Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <!-- CSS Ultra-Professionnel Corporate -->
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
        
        /* Typography Scale */
        .text-xs { font-size: 0.75rem; line-height: 1rem; }
        .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
        .text-base { font-size: 1rem; line-height: 1.5rem; }
        .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
        .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
        .text-2xl { font-size: 1.5rem; line-height: 2rem; }
        .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
        .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
        .text-5xl { font-size: 3rem; line-height: 1.1; }
        .text-6xl { font-size: 3.75rem; line-height: 1.1; }
        
        /* Header Corporate Elite */
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
        
        .header.scrolled {
            background: rgba(255, 255, 255, 0.99);
            box-shadow: var(--shadow-md);
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
        
        .logo:hover {
            transform: scale(1.02);
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
        
        /* Navigation Corporate */
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
            position: relative;
        }
        
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background: var(--primary);
            transform: translateX(-50%);
            transition: var(--transition);
        }
        
        .nav-link:hover {
            color: var(--primary);
            background: var(--bg-alt);
        }
        
        .nav-link:hover::after {
            width: 80%;
        }
        
        /* Dropdown Navigation */
        .nav-item {
            position: relative;
        }
        
        .dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            background: var(--bg);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 0.5rem 0;
            min-width: 280px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: var(--transition);
            box-shadow: var(--shadow-lg);
        }
        
        .nav-item:hover .dropdown {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .dropdown-link {
            display: block;
            padding: 0.875rem 1.25rem;
            text-decoration: none;
            color: var(--text);
            transition: var(--transition-fast);
            border-radius: 0.5rem;
            margin: 0 0.5rem;
            font-weight: 500;
        }
        
        .dropdown-link:hover {
            background: var(--primary);
            color: var(--bg);
            transform: translateX(4px);
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
        
        .mobile-menu-btn.active .hamburger-line:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        
        .mobile-menu-btn.active .hamburger-line:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active .hamburger-line:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
        
        .mobile-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: var(--bg);
            transform: translateX(-100%);
            transition: var(--transition);
            z-index: 1000;
            padding-top: 80px;
            overflow-y: auto;
        }
        
        .mobile-menu.active {
            transform: translateX(0);
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
        
        /* Hero Section Corporate Elite */
        .hero {
            position: relative;
            min-height: 100vh;
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, 
                rgba(14, 165, 233, 0.95) 0%, 
                rgba(6, 182, 212, 0.9) 50%, 
                rgba(14, 165, 233, 0.95) 100%
            ), url('${heroImage}');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            color: var(--bg);
            overflow: hidden;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.1) 100%);
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
            text-align: center;
            animation: heroEnter 1s ease-out;
        }
        
        @keyframes heroEnter {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            margin-bottom: 2rem;
            font-weight: 600;
            animation: fadeInUp 0.8s ease-out 0.2s both;
        }
        
        .hero h1 {
            font-family: 'Poppins', sans-serif;
            font-size: clamp(3rem, 8vw, 5rem);
            font-weight: 900;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            text-shadow: 0 4px 20px rgba(0,0,0,0.3);
            animation: fadeInUp 0.8s ease-out 0.4s both;
        }
        
        .hero-highlight {
            background: linear-gradient(135deg, var(--accent), var(--accent-dark));
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            position: relative;
        }
        
        .hero p {
            font-size: 1.25rem;
            margin-bottom: 3rem;
            max-width: 650px;
            margin-left: auto;
            margin-right: auto;
            opacity: 0.95;
            animation: fadeInUp 0.8s ease-out 0.6s both;
        }
        
        .hero-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            animation: fadeInUp 0.8s ease-out 0.8s both;
        }
        
        .btn-hero {
            background: linear-gradient(135deg, var(--accent), var(--accent-dark));
            color: var(--bg);
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
            transform: translateY(-4px);
            box-shadow: var(--shadow-xl);
        }
        
        .btn-secondary {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            color: var(--bg);
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
            border-color: rgba(255, 255, 255, 0.5);
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Emergency Badge */
        .emergency-badge {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 100;
            background: linear-gradient(135deg, var(--error), #dc2626);
            color: var(--bg);
            padding: 1rem 1.5rem;
            border-radius: 50px;
            box-shadow: var(--shadow-lg);
            animation: emergencyPulse 2s infinite;
            text-decoration: none;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        @keyframes emergencyPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        /* Services Section Corporate */
        .services {
            padding: 6rem 0;
            background: var(--bg-alt);
            position: relative;
        }
        
        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }
        
        .section-badge {
            display: inline-block;
            background: var(--primary);
            color: var(--bg);
            padding: 0.5rem 1rem;
            border-radius: 50px;
            font-size: 0.875rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        
        .section-title {
            font-family: 'Poppins', sans-serif;
            font-size: clamp(2rem, 5vw, 3rem);
            font-weight: 800;
            color: var(--text);
            margin-bottom: 1rem;
            line-height: 1.2;
        }
        
        .section-description {
            font-size: 1.125rem;
            color: var(--text-light);
            max-width: 650px;
            margin: 0 auto;
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .service-card {
            background: var(--bg);
            border-radius: var(--radius-lg);
            padding: 2.5rem;
            box-shadow: var(--shadow);
            transition: var(--transition);
            position: relative;
            overflow: hidden;
            border: 1px solid var(--border);
        }
        
        .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
        }
        
        .service-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-xl);
            border-color: var(--primary);
        }
        
        .service-icon {
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border-radius: var(--radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            font-size: 1.75rem;
            color: var(--bg);
            position: relative;
        }
        
        .service-icon::after {
            content: '';
            position: absolute;
            inset: -2px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border-radius: var(--radius-lg);
            z-index: -1;
            opacity: 0.2;
        }
        
        .service-card h3 {
            font-family: 'Poppins', sans-serif;
            font-size: 1.375rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 1rem;
        }
        
        .service-card p {
            color: var(--text-light);
            margin-bottom: 1.5rem;
            line-height: 1.7;
        }
        
        .service-features {
            list-style: none;
            margin-bottom: 1.5rem;
        }
        
        .service-features li {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
            color: var(--text-light);
            font-size: 0.95rem;
        }
        
        .service-features li::before {
            content: '✓';
            color: var(--success);
            font-weight: 700;
            font-size: 1.1rem;
        }
        
        .service-price {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 1.5rem;
        }
        
        .service-btn {
            background: var(--primary);
            color: var(--bg);
            text-decoration: none;
            padding: 1rem 1.75rem;
            border-radius: var(--radius);
            font-weight: 600;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            width: 100%;
            justify-content: center;
        }
        
        .service-btn:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
        }
        
        /* Stats Section */
        .stats {
            padding: 6rem 0;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: var(--bg);
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 3rem;
            text-align: center;
        }
        
        .stat-item {
            animation: statCount 2s ease-out;
        }
        
        .stat-number {
            font-family: 'Poppins', sans-serif;
            font-size: 3rem;
            font-weight: 900;
            margin-bottom: 0.5rem;
            text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        
        .stat-label {
            font-size: 1.125rem;
            font-weight: 600;
            opacity: 0.95;
        }
        
        @keyframes statCount {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Expertise Section */
        .expertise {
            padding: 6rem 0;
            background: var(--bg);
        }
        
        .expertise-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .expertise-card {
            text-align: center;
            padding: 2rem;
            border-radius: var(--radius-lg);
            transition: var(--transition);
        }
        
        .expertise-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }
        
        .expertise-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 1.5rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: var(--bg);
            position: relative;
        }
        
        .expertise-card:nth-child(1) .expertise-icon {
            background: linear-gradient(135deg, var(--success), #059669);
        }
        
        .expertise-card:nth-child(2) .expertise-icon {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
        }
        
        .expertise-card:nth-child(3) .expertise-icon {
            background: linear-gradient(135deg, var(--accent), var(--accent-dark));
        }
        
        .expertise-card:nth-child(4) .expertise-icon {
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        }
        
        .expertise-card h3 {
            font-family: 'Poppins', sans-serif;
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--text);
        }
        
        .expertise-card p {
            color: var(--text-light);
            line-height: 1.6;
        }
        
        /* Testimonials Section */
        .testimonials {
            padding: 6rem 0;
            background: var(--bg-alt);
        }
        
        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .testimonial-card {
            background: var(--bg);
            padding: 2rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow);
            position: relative;
            transition: var(--transition);
        }
        
        .testimonial-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }
        
        .testimonial-card::before {
            content: '"';
            position: absolute;
            top: -10px;
            left: 20px;
            font-size: 4rem;
            color: var(--primary);
            font-family: serif;
            opacity: 0.3;
        }
        
        .testimonial-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .testimonial-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }
        
        .testimonial-info h4 {
            font-weight: 600;
            color: var(--text);
        }
        
        .testimonial-rating {
            color: var(--accent);
            font-size: 0.875rem;
        }
        
        .testimonial-text {
            color: var(--text-light);
            font-style: italic;
            line-height: 1.6;
        }
        
        /* Service Area Section */
        .service-area {
            padding: 6rem 0;
            background: var(--bg);
        }
        
        .cities-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin-top: 3rem;
        }
        
        .city-card {
            background: var(--bg-alt);
            padding: 1rem;
            border-radius: var(--radius);
            text-align: center;
            border: 2px solid transparent;
            transition: var(--transition);
            cursor: pointer;
        }
        
        .city-card:hover {
            border-color: var(--primary);
            transform: translateY(-2px);
            box-shadow: var(--shadow);
        }
        
        .city-icon {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        
        .city-name {
            font-weight: 600;
            color: var(--text);
        }
        
        /* Contact CTA */
        .contact-cta {
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
            margin-bottom: 3rem;
            opacity: 0.95;
        }
        
        .cta-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .btn-cta-primary {
            background: var(--accent);
            color: var(--text);
            text-decoration: none;
            padding: 1rem 2rem;
            border-radius: var(--radius-lg);
            font-weight: 700;
            font-size: 1.125rem;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            box-shadow: var(--shadow-lg);
        }
        
        .btn-cta-primary:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-xl);
        }
        
        .btn-cta-secondary {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            color: var(--bg);
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
        
        .btn-cta-secondary:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-2px);
            border-color: rgba(255, 255, 255, 0.5);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .nav-menu,
            .header-contact {
                display: none;
            }
            
            .mobile-menu-btn {
                display: flex;
            }
            
            .hero {
                background-attachment: scroll;
                padding: 6rem 0 4rem;
            }
            
            .hero-actions {
                flex-direction: column;
                align-items: center;
            }
            
            .btn-hero,
            .btn-secondary {
                width: 100%;
                max-width: 300px;
                justify-content: center;
            }
            
            .services-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 2rem;
            }
            
            .expertise-grid {
                grid-template-columns: 1fr;
            }
            
            .emergency-badge {
                bottom: 1rem;
                right: 1rem;
                padding: 0.75rem 1rem;
                font-size: 0.875rem;
            }
            
            .cta-actions {
                flex-direction: column;
                align-items: center;
            }
            
            .btn-cta-primary,
            .btn-cta-secondary {
                width: 100%;
                max-width: 300px;
                justify-content: center;
            }
        }
        
        @media (min-width: 768px) {
            .mobile-menu,
            .mobile-menu-btn {
                display: none;
            }
        }
    </style>
</head>
<body>
    <!-- Header Corporate Elite -->
    <header class="header" id="header">
        <div class="container">
            <div class="header-content">
                <a href="index.html" class="logo">
                    ${data.companyName}
                </a>
                
                <!-- Navigation Desktop -->
                <nav>
                    <ul class="nav-menu">
                        ${navigation.map(item => `
                            <li class="nav-item">
                                <a href="${item.href}" class="nav-link">${item.label}</a>
                                ${item.children ? `
                                    <div class="dropdown">
                                        ${item.children.map(child => `
                                            <a href="${child.href}" class="dropdown-link">${child.label}</a>
                                        `).join('')}
                                    </div>
                                ` : ''}
                            </li>
                        `).join('')}
                    </ul>
                </nav>
                
                <!-- Contact Header -->
                <div class="header-contact">
                    <a href="tel:${data.phone}" class="contact-phone">
                        📞 ${data.phone}
                    </a>
                    <a href="contact.html" class="btn-primary">
                        Devis Gratuit
                    </a>
                </div>

                <!-- Menu Mobile -->
                <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>
            </div>
        </div>

        <!-- Menu Mobile -->
        <div class="mobile-menu" id="mobileMenu">
            <div class="container">
                ${navigation.map(item => `
                    <div class="mobile-nav-item">
                        <a href="${item.href}" class="mobile-nav-link">${item.label}</a>
                    </div>
                `).join('')}
                
                <div style="padding: 2rem 1rem;">
                    <a href="tel:${data.phone}" class="btn-primary" style="width: 100%; margin-bottom: 1rem;">
                        📞 ${data.phone}
                    </a>
                    <a href="contact.html" class="btn-secondary" style="width: 100%;">
                        Devis Gratuit
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- Hero Corporate Elite -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <div class="hero-badge">
                    🏆 Plombier Certifié RGE • +${data.serviceCities.length} villes d'intervention
                </div>
                
                <h1>
                    Plombier <span class="hero-highlight">Expert</span><br>
                    ${data.city} et Région
                </h1>
                
                <p>
                    Dépannage plomberie 24h/7j, installation sanitaire, rénovation salle de bain. 
                    Intervention rapide, devis gratuit, garantie 10 ans travaux.
                </p>
                
                <div class="hero-actions">
                    <a href="tel:${data.phone}" class="btn-hero">
                        📞 Urgence 24h/7j
                    </a>
                    <a href="contact.html" class="btn-secondary">
                        💬 Devis Gratuit
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Corporate -->
    <section class="services" id="services">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">🔧 Nos Expertises</span>
                <h2 class="section-title">Services Plomberie Professionnels</h2>
                <p class="section-description">
                    Solutions complètes en plomberie pour particuliers et professionnels. 
                    Dépannage d'urgence, installation, rénovation. Devis gratuit sous 24h.
                </p>
            </div>
            
            <div class="services-grid">
                ${data.services.map((service, index) => `
                    <div class="service-card">
                        <div class="service-icon">
                            ${index === 0 ? '🚰' : index === 1 ? '🔧' : '🛁'}
                        </div>
                        <h3>${service.name}</h3>
                        <p>${service.description}</p>
                        <ul class="service-features">
                            <li>Devis gratuit et sans engagement</li>
                            <li>Intervention rapide 24h/7j</li>
                            <li>Garantie décennale</li>
                            <li>Certifié RGE et PGN</li>
                            <li>Matériel professionnel</li>
                        </ul>
                        ${service.price ? `<div class="service-price">${service.price}</div>` : ''}
                        <a href="service-${service.id}.html" class="service-btn">
                            En savoir plus →
                        </a>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Statistiques Corporate -->
    <section class="stats">
        <div class="container">
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-number">15+</div>
                    <div class="stat-label">Années d'Expérience</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">500+</div>
                    <div class="stat-label">Clients Satisfaits</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">24h</div>
                    <div class="stat-label">Service Urgence</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">10ans</div>
                    <div class="stat-label">Garantie Travaux</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Pourquoi nous choisir -->
    <section class="expertise">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">🏆 Excellence</span>
                <h2 class="section-title">Pourquoi Choisir ${data.companyName} ?</h2>
                <p class="section-description">
                    Votre partenaire de confiance pour tous vos travaux de plomberie
                </p>
            </div>
            
            <div class="expertise-grid">
                <div class="expertise-card">
                    <div class="expertise-icon">🎯</div>
                    <h3>Intervention Rapide</h3>
                    <p>Déplacement en moins de 30 minutes en urgence sur ${data.city} et sa région</p>
                </div>
                
                <div class="expertise-card">
                    <div class="expertise-icon">🔧</div>
                    <h3>Expertise Certifiée</h3>
                    <p>Plombier RGE certifié, formé aux dernières normes et techniques</p>
                </div>
                
                <div class="expertise-card">
                    <div class="expertise-icon">🛡️</div>
                    <h3>Garantie Décennale</h3>
                    <p>Tous nos travaux sont garantis 10 ans pièces et main d'œuvre</p>
                </div>
                
                <div class="expertise-card">
                    <div class="expertise-icon">💰</div>
                    <h3>Prix Transparents</h3>
                    <p>Devis détaillé gratuit, pas de mauvaises surprises, tarifs clairs</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Témoignages -->
    <section class="testimonials">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">⭐ Avis Clients</span>
                <h2 class="section-title">Ils Nous Font Confiance</h2>
                <p class="section-description">Plus de 500 clients satisfaits témoignent</p>
            </div>
            
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div class="testimonial-header">
                        <div class="testimonial-avatar">PB</div>
                        <div class="testimonial-info">
                            <h4>Pierre Bonnet</h4>
                            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
                        </div>
                    </div>
                    <p class="testimonial-text">Fuite d'eau urgente réparée en 20 minutes ! ${data.ownerName} est très professionnel et explique bien son intervention. Service exemplaire.</p>
                </div>
                
                <div class="testimonial-card">
                    <div class="testimonial-header">
                        <div class="testimonial-avatar">ML</div>
                        <div class="testimonial-info">
                            <h4>Marie Lefebvre</h4>
                            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
                        </div>
                    </div>
                    <p class="testimonial-text">Rénovation complète de ma salle de bain. Travail impeccable, respectueux des délais et du budget. Je recommande vivement !</p>
                </div>
                
                <div class="testimonial-card">
                    <div class="testimonial-header">
                        <div class="testimonial-avatar">JD</div>
                        <div class="testimonial-info">
                            <h4>Jacques Dubois</h4>
                            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
                        </div>
                    </div>
                    <p class="testimonial-text">Installation chaudière parfaite. Service après-vente excellent. Un vrai professionnel sur qui on peut compter.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Zone d'intervention -->
    <section class="service-area">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">📍 Zones d'Intervention</span>
                <h2 class="section-title">Nous Intervenons Dans +${data.serviceCities.length} Villes</h2>
                <p class="section-description">
                    Service de proximité dans tout ${data.city} et sa région
                </p>
            </div>
            
            <div class="cities-grid">
                ${data.serviceCities.map(city => `
                    <div class="city-card">
                        <div class="city-icon">📍</div>
                        <div class="city-name">${city}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Contact CTA -->
    <section class="contact-cta">
        <div class="container">
            <div class="cta-content">
                <h2>Besoin d'un Plombier ?</h2>
                <p>
                    Devis gratuit en 24h • Intervention rapide • Garantie décennale
                </p>
                
                <div class="cta-actions">
                    <a href="tel:${data.phone}" class="btn-cta-primary">
                        📞 ${data.phone}
                    </a>
                    <a href="contact.html" class="btn-cta-secondary">
                        💬 Devis en Ligne
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Badge Urgence -->
    ${data.emergencyAvailable ? `
        <a href="tel:${data.phone}" class="emergency-badge">
            🚨 Urgence 24h/7j
        </a>
    ` : ''}

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

        // Mobile Menu
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            
            mobileMenu.classList.toggle('active');
            menuBtn.classList.toggle('active');
            
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        }

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

        // Intersection Observer for Animations
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
        
        // Observe all service cards
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = \`opacity 0.6s ease \${index * 0.1}s, transform 0.6s ease \${index * 0.1}s\`;
            observer.observe(card);
        });

        // Observe expertise cards
        document.querySelectorAll('.expertise-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = \`opacity 0.6s ease \${index * 0.15}s, transform 0.6s ease \${index * 0.15}s\`;
            observer.observe(card);
        });

        // Animate statistics on scroll
        const statNumbers = document.querySelectorAll('.stat-number');
        const statObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    
                    if (finalValue.includes('+')) {
                        const num = parseInt(finalValue);
                        animateNumber(target, 0, num, 2000, '+');
                    } else if (finalValue.includes('h')) {
                        target.textContent = '24h';
                    } else if (finalValue.includes('ans')) {
                        const num = parseInt(finalValue);
                        animateNumber(target, 0, num, 2000, 'ans');
                    }
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            statObserver.observe(stat);
        });

        function animateNumber(element, start, end, duration, suffix = '') {
            const range = end - start;
            const stepTime = Math.abs(Math.floor(duration / range));
            const startTime = new Date().getTime();
            const endTime = startTime + duration;
            
            function run() {
                const now = new Date().getTime();
                const remaining = Math.max((endTime - now) / duration, 0);
                const value = Math.round(end - (remaining * range));
                element.textContent = value + suffix;
                
                if (value !== end) {
                    requestAnimationFrame(run);
                }
            }
            
            run();
        }
    </script>
</body>
</html>`
}