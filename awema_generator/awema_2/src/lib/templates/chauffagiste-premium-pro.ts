import { TemplateData } from '../template'
import { NavigationItem } from '../multi-page-generator'
import { PROFESSIONAL_IMAGES } from './ultra-pro-templates'

export function generateChauffagistePremiumProTemplate(data: TemplateData, navigation: NavigationItem[]): string {
  const heroImage = PROFESSIONAL_IMAGES.chauffagiste.hero[0]
  const serviceImages = PROFESSIONAL_IMAGES.chauffagiste.services
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - Chauffagiste Expert ${data.city} | Installation Pompe à Chaleur | Rénovation Énergétique</title>
    <meta name="description" content="🔥 ${data.companyName} - Chauffagiste professionnel à ${data.city}. Installation pompe à chaleur, chaudière, climatisation. Rénovation énergétique. Devis gratuit. ✅ +${data.serviceCities.length} villes. 🏆 RGE QualiPAC.">
    <meta name="keywords" content="chauffagiste ${data.city}, pompe à chaleur, installation chaudière, ${data.services.map(s => s.name.toLowerCase()).join(', ')}, rénovation énergétique, climatisation, RGE">
    
    <!-- SEO Avancé -->
    <meta property="og:title" content="${data.companyName} - Chauffagiste Expert ${data.city}">
    <meta property="og:description" content="Installation pompe à chaleur, chaudière, climatisation. Rénovation énergétique. Devis gratuit.">
    <meta property="og:image" content="${heroImage}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://${data.domain}">
    <meta name="twitter:card" content="summary_large_image">
    
    <!-- Schema.org -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "HeatingContractor",
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
      "priceRange": "€€€",
      "openingHours": "${data.openingHours || 'Mo-Sa 08:00-18:00'}",
      "areaServed": [${data.serviceCities.map(city => `"${city}"`).join(', ')}],
      "serviceType": "Heating Installation and Repair",
      "hasCredential": ["RGE QualiPAC", "QualiSol", "Qualibois"],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "342"
      },
      "offers": {
        "@type": "Offer",
        "description": "Installation pompe à chaleur avec aides financières",
        "eligibleRegion": "France"
      }
    }
    </script>
    
    <!-- Polices Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <!-- CSS Ultra-Premium -->
    <style>
        :root {
            --primary: #ea580c;
            --primary-dark: #c2410c;
            --primary-light: #fb923c;
            --secondary: #dc2626;
            --accent: #fbbf24;
            --accent-dark: #f59e0b;
            --text: #0c0a09;
            --text-light: #57534e;
            --text-muted: #a8a29e;
            --bg: #fefefe;
            --bg-alt: #fafaf9;
            --bg-dark: #f5f5f4;
            --border: #e7e5e4;
            --border-light: #f5f5f4;
            --success: #16a34a;
            --warning: #f59e0b;
            --error: #dc2626;
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            --radius: 0.875rem;
            --radius-lg: 1.25rem;
            --radius-xl: 1.5rem;
            --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            --transition-fast: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            --gradient-warm: linear-gradient(135deg, #ea580c 0%, #dc2626 50%, #b91c1c 100%);
            --gradient-gold: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
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
            line-height: 1.7;
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
        
        /* Typography Premium */
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
        .text-7xl { font-size: 4.5rem; line-height: 1.1; }
        
        /* Header Premium */
        .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: rgba(254, 254, 254, 0.95);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border-light);
            transition: var(--transition);
        }
        
        .header.scrolled {
            background: rgba(254, 254, 254, 0.98);
            box-shadow: var(--shadow-lg);
            border-bottom-color: var(--border);
        }
        
        .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.25rem 0;
        }
        
        .logo {
            font-family: 'Playfair Display', serif;
            font-size: 1.75rem;
            font-weight: 800;
            color: var(--primary);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            transition: var(--transition);
            position: relative;
        }
        
        .logo:hover {
            transform: scale(1.02);
        }
        
        .logo::before {
            content: '🔥';
            font-size: 2rem;
            animation: flameFlicker 2s ease-in-out infinite alternate;
            filter: drop-shadow(0 0 8px rgba(234, 88, 12, 0.3));
        }
        
        @keyframes flameFlicker {
            0% { transform: scale(1) rotate(-2deg); opacity: 0.9; }
            50% { transform: scale(1.1) rotate(1deg); opacity: 1; }
            100% { transform: scale(0.95) rotate(-1deg); opacity: 0.95; }
        }
        
        /* Navigation Premium */
        .nav-menu {
            display: flex;
            list-style: none;
            gap: 2.5rem;
            align-items: center;
        }
        
        .nav-link {
            text-decoration: none;
            color: var(--text);
            font-weight: 500;
            padding: 0.875rem 1.25rem;
            border-radius: var(--radius);
            transition: var(--transition);
            position: relative;
            overflow: hidden;
        }
        
        .nav-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: var(--gradient-warm);
            transition: var(--transition);
            z-index: -1;
            border-radius: var(--radius);
        }
        
        .nav-link:hover {
            color: var(--bg);
            transform: translateY(-2px);
        }
        
        .nav-link:hover::before {
            left: 0;
        }
        
        /* Dropdown Premium */
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
            padding: 0.75rem 0;
            min-width: 320px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-15px) scale(0.95);
            transition: var(--transition);
            box-shadow: var(--shadow-xl);
            backdrop-filter: blur(20px);
        }
        
        .nav-item:hover .dropdown {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
        }
        
        .dropdown-link {
            display: block;
            padding: 1rem 1.5rem;
            text-decoration: none;
            color: var(--text);
            transition: var(--transition-fast);
            border-radius: 0.75rem;
            margin: 0 0.75rem;
            font-weight: 500;
            position: relative;
        }
        
        .dropdown-link:hover {
            background: var(--gradient-warm);
            color: var(--bg);
            transform: translateX(8px);
            box-shadow: var(--shadow);
        }
        
        /* Mobile Menu */
        .mobile-menu-btn {
            display: none;
            flex-direction: column;
            gap: 5px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.75rem;
            z-index: 1001;
            border-radius: var(--radius);
            transition: var(--transition);
        }
        
        .mobile-menu-btn:hover {
            background: var(--bg-alt);
        }
        
        .hamburger-line {
            width: 28px;
            height: 3px;
            background: var(--text);
            border-radius: 2px;
            transition: var(--transition);
        }
        
        .mobile-menu-btn.active .hamburger-line:nth-child(1) {
            transform: rotate(45deg) translate(7px, 7px);
        }
        
        .mobile-menu-btn.active .hamburger-line:nth-child(2) {
            opacity: 0;
            transform: scale(0);
        }
        
        .mobile-menu-btn.active .hamburger-line:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
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
            padding-top: 100px;
            overflow-y: auto;
        }
        
        .mobile-menu.active {
            transform: translateX(0);
        }
        
        .header-contact {
            display: flex;
            align-items: center;
            gap: 1.25rem;
        }
        
        .contact-phone {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            color: var(--text);
            text-decoration: none;
            font-weight: 600;
            padding: 0.875rem 1.25rem;
            border-radius: var(--radius-lg);
            transition: var(--transition);
            border: 2px solid var(--border);
            background: var(--bg-alt);
        }
        
        .contact-phone:hover {
            color: var(--primary);
            border-color: var(--primary);
            transform: translateY(-3px);
            box-shadow: var(--shadow-lg);
        }
        
        .btn-primary {
            background: var(--gradient-warm);
            color: var(--bg);
            text-decoration: none;
            padding: 1rem 2rem;
            border-radius: var(--radius-lg);
            font-weight: 600;
            transition: var(--transition);
            box-shadow: var(--shadow-lg);
            border: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            position: relative;
            overflow: hidden;
        }
        
        .btn-primary::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            transition: var(--transition);
            z-index: -1;
        }
        
        .btn-primary:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-xl);
        }
        
        .btn-primary:hover::before {
            left: 0;
        }
        
        /* Hero Section Premium */
        .hero {
            position: relative;
            min-height: 100vh;
            display: flex;
            align-items: center;
            background: 
                linear-gradient(135deg, 
                    rgba(234, 88, 12, 0.9) 0%, 
                    rgba(220, 38, 38, 0.8) 30%,
                    rgba(185, 28, 28, 0.9) 70%,
                    rgba(234, 88, 12, 0.9) 100%
                ), 
                url('${heroImage}');
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
            background: 
                radial-gradient(ellipse at 30% 20%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 80%, rgba(234, 88, 12, 0.1) 0%, transparent 50%);
            animation: heroGlow 8s ease-in-out infinite alternate;
        }
        
        @keyframes heroGlow {
            0% { opacity: 0.8; }
            100% { opacity: 1; }
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
            text-align: center;
            animation: heroEnter 1.2s ease-out;
        }
        
        @keyframes heroEnter {
            from { opacity: 0; transform: translateY(60px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px);
            padding: 1rem 2rem;
            border-radius: 50px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            margin-bottom: 2.5rem;
            font-weight: 600;
            font-size: 1.05rem;
            animation: fadeInUp 1s ease-out 0.3s both;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .hero h1 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(3.5rem, 10vw, 6rem);
            font-weight: 900;
            line-height: 1.1;
            margin-bottom: 2rem;
            text-shadow: 0 4px 30px rgba(0,0,0,0.4);
            animation: fadeInUp 1s ease-out 0.5s both;
        }
        
        .hero-highlight {
            background: var(--gradient-gold);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            position: relative;
            text-shadow: none;
        }
        
        .hero-highlight::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            right: 0;
            height: 3px;
            background: var(--gradient-gold);
            border-radius: 2px;
            animation: underlineGrow 1s ease-out 1.5s both;
        }
        
        @keyframes underlineGrow {
            from { width: 0; left: 50%; }
            to { width: 100%; left: 0; }
        }
        
        .hero p {
            font-size: 1.375rem;
            margin-bottom: 3.5rem;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            opacity: 0.95;
            animation: fadeInUp 1s ease-out 0.7s both;
            text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        
        .hero-actions {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
            animation: fadeInUp 1s ease-out 0.9s both;
        }
        
        .btn-hero {
            background: var(--gradient-gold);
            color: var(--text);
            text-decoration: none;
            padding: 1.25rem 2.5rem;
            border-radius: var(--radius-lg);
            font-weight: 700;
            font-size: 1.25rem;
            transition: var(--transition);
            box-shadow: var(--shadow-xl);
            display: inline-flex;
            align-items: center;
            gap: 1rem;
            position: relative;
            overflow: hidden;
        }
        
        .btn-hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            transition: var(--transition);
            z-index: -1;
        }
        
        .btn-hero:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(251, 191, 36, 0.4);
        }
        
        .btn-hero:hover::before {
            left: 0;
        }
        
        .btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px);
            color: var(--bg);
            text-decoration: none;
            padding: 1.25rem 2.5rem;
            border-radius: var(--radius-lg);
            font-weight: 600;
            font-size: 1.25rem;
            transition: var(--transition);
            border: 2px solid rgba(255, 255, 255, 0.3);
            display: inline-flex;
            align-items: center;
            gap: 1rem;
        }
        
        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-3px);
            border-color: rgba(255, 255, 255, 0.6);
            box-shadow: var(--shadow-xl);
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Emergency Badge Premium */
        .emergency-badge {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 100;
            background: var(--gradient-warm);
            color: var(--bg);
            padding: 1.25rem 2rem;
            border-radius: 50px;
            box-shadow: var(--shadow-xl);
            animation: emergencyFloat 3s ease-in-out infinite;
            text-decoration: none;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1.05rem;
        }
        
        @keyframes emergencyFloat {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-8px) scale(1.02); }
        }
        
        /* Services Premium */
        .services {
            padding: 8rem 0;
            background: var(--bg-alt);
            position: relative;
        }
        
        .services::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 200px;
            background: linear-gradient(180deg, var(--bg) 0%, var(--bg-alt) 100%);
        }
        
        .section-header {
            text-align: center;
            margin-bottom: 5rem;
            position: relative;
            z-index: 2;
        }
        
        .section-badge {
            display: inline-block;
            background: var(--gradient-warm);
            color: var(--bg);
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            font-size: 0.95rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            box-shadow: var(--shadow);
        }
        
        .section-title {
            font-family: 'Playfair Display', serif;
            font-size: clamp(2.5rem, 6vw, 4rem);
            font-weight: 800;
            color: var(--text);
            margin-bottom: 1.5rem;
            line-height: 1.2;
        }
        
        .section-description {
            font-size: 1.25rem;
            color: var(--text-light);
            max-width: 700px;
            margin: 0 auto;
            line-height: 1.7;
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2.5rem;
            margin-top: 4rem;
            position: relative;
            z-index: 2;
        }
        
        .service-card {
            background: var(--bg);
            border-radius: var(--radius-xl);
            padding: 3rem;
            box-shadow: var(--shadow-lg);
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
            height: 6px;
            background: var(--gradient-warm);
        }
        
        .service-card::after {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(234, 88, 12, 0.1) 0%, transparent 70%);
            transition: var(--transition);
            border-radius: 50%;
        }
        
        .service-card:hover {
            transform: translateY(-12px);
            box-shadow: var(--shadow-xl);
            border-color: var(--primary);
        }
        
        .service-card:hover::after {
            top: -30%;
            right: -30%;
            width: 300px;
            height: 300px;
        }
        
        .service-icon {
            width: 80px;
            height: 80px;
            background: var(--gradient-warm);
            border-radius: var(--radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
            font-size: 2rem;
            color: var(--bg);
            position: relative;
            z-index: 2;
            box-shadow: var(--shadow-lg);
        }
        
        .service-card h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 1.25rem;
            position: relative;
            z-index: 2;
        }
        
        .service-card p {
            color: var(--text-light);
            margin-bottom: 2rem;
            line-height: 1.7;
            position: relative;
            z-index: 2;
        }
        
        .service-features {
            list-style: none;
            margin-bottom: 2rem;
            position: relative;
            z-index: 2;
        }
        
        .service-features li {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
            color: var(--text-light);
            font-size: 1rem;
        }
        
        .service-features li::before {
            content: '✓';
            color: var(--success);
            font-weight: 700;
            font-size: 1.2rem;
            background: rgba(22, 163, 74, 0.1);
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .service-price {
            font-size: 1.375rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 2rem;
            position: relative;
            z-index: 2;
        }
        
        .service-btn {
            background: var(--primary);
            color: var(--bg);
            text-decoration: none;
            padding: 1.125rem 2rem;
            border-radius: var(--radius-lg);
            font-weight: 600;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            width: 100%;
            justify-content: center;
            position: relative;
            z-index: 2;
            box-shadow: var(--shadow);
        }
        
        .service-btn:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }
        
        /* Innovation Section */
        .innovation {
            padding: 8rem 0;
            background: var(--bg);
            position: relative;
        }
        
        .innovation-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 3rem;
            margin-top: 4rem;
        }
        
        .innovation-card {
            text-align: center;
            padding: 3rem 2rem;
            border-radius: var(--radius-xl);
            transition: var(--transition);
            position: relative;
            overflow: hidden;
        }
        
        .innovation-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, var(--bg-alt) 0%, var(--bg-dark) 100%);
            opacity: 0;
            transition: var(--transition);
            border-radius: var(--radius-xl);
        }
        
        .innovation-card:hover::before {
            opacity: 1;
        }
        
        .innovation-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-xl);
        }
        
        .innovation-icon {
            width: 100px;
            height: 100px;
            margin: 0 auto 2rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            color: var(--bg);
            position: relative;
            z-index: 2;
        }
        
        .innovation-card:nth-child(1) .innovation-icon {
            background: var(--gradient-warm);
        }
        
        .innovation-card:nth-child(2) .innovation-icon {
            background: var(--gradient-gold);
        }
        
        .innovation-card:nth-child(3) .innovation-icon {
            background: linear-gradient(135deg, var(--success), #16a34a);
        }
        
        .innovation-card:nth-child(4) .innovation-icon {
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        }
        
        .innovation-card h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.375rem;
            font-weight: 700;
            margin-bottom: 1.25rem;
            color: var(--text);
            position: relative;
            z-index: 2;
        }
        
        .innovation-card p {
            color: var(--text-light);
            line-height: 1.7;
            position: relative;
            z-index: 2;
        }
        
        /* Aides Section */
        .aides {
            padding: 8rem 0;
            background: var(--gradient-warm);
            color: var(--bg);
            position: relative;
        }
        
        .aides::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(ellipse at 20% 50%, rgba(251, 191, 36, 0.2) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(251, 191, 36, 0.1) 0%, transparent 50%);
            animation: aidesGlow 10s ease-in-out infinite alternate;
        }
        
        @keyframes aidesGlow {
            0% { opacity: 0.7; }
            100% { opacity: 1; }
        }
        
        .aides-content {
            text-align: center;
            position: relative;
            z-index: 2;
        }
        
        .aides h2 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(2.5rem, 6vw, 4rem);
            font-weight: 800;
            margin-bottom: 2rem;
            text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        
        .aides p {
            font-size: 1.375rem;
            margin-bottom: 3rem;
            opacity: 0.95;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .aides-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin-top: 4rem;
        }
        
        .aide-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px);
            padding: 2.5rem;
            border-radius: var(--radius-xl);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: var(--transition);
            text-align: center;
        }
        
        .aide-card:hover {
            transform: translateY(-8px);
            background: rgba(255, 255, 255, 0.15);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .aide-amount {
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            font-weight: 900;
            margin-bottom: 1rem;
            color: var(--accent);
            text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        
        .aide-title {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }
        
        .aide-description {
            opacity: 0.9;
            line-height: 1.6;
        }
        
        /* Testimonials Premium */
        .testimonials {
            padding: 8rem 0;
            background: var(--bg-alt);
        }
        
        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
            gap: 2.5rem;
            margin-top: 4rem;
        }
        
        .testimonial-card {
            background: var(--bg);
            padding: 3rem;
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-lg);
            position: relative;
            transition: var(--transition);
            border: 1px solid var(--border);
        }
        
        .testimonial-card::before {
            content: '"';
            position: absolute;
            top: -15px;
            left: 30px;
            font-size: 5rem;
            color: var(--primary);
            font-family: 'Playfair Display', serif;
            opacity: 0.3;
            line-height: 1;
        }
        
        .testimonial-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-xl);
            border-color: var(--primary);
        }
        
        .testimonial-header {
            display: flex;
            align-items: center;
            gap: 1.25rem;
            margin-bottom: 1.5rem;
        }
        
        .testimonial-avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: var(--gradient-warm);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 1.25rem;
            box-shadow: var(--shadow);
        }
        
        .testimonial-info h4 {
            font-weight: 700;
            color: var(--text);
            font-size: 1.125rem;
        }
        
        .testimonial-rating {
            color: var(--accent);
            font-size: 1rem;
        }
        
        .testimonial-text {
            color: var(--text-light);
            font-style: italic;
            line-height: 1.7;
            font-size: 1.05rem;
        }
        
        /* CTA Premium */
        .contact-cta {
            padding: 8rem 0;
            background: var(--gradient-warm);
            color: var(--bg);
            text-align: center;
            position: relative;
        }
        
        .contact-cta::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(ellipse at 30% 80%, rgba(251, 191, 36, 0.2) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 20%, rgba(251, 191, 36, 0.1) 0%, transparent 50%);
            animation: ctaGlow 12s ease-in-out infinite alternate;
        }
        
        @keyframes ctaGlow {
            0% { opacity: 0.8; }
            100% { opacity: 1; }
        }
        
        .cta-content {
            position: relative;
            z-index: 2;
        }
        
        .cta-content h2 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(2.5rem, 6vw, 4rem);
            font-weight: 800;
            margin-bottom: 1.5rem;
            text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        
        .cta-content p {
            font-size: 1.375rem;
            margin-bottom: 4rem;
            opacity: 0.95;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .cta-actions {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .btn-cta-primary {
            background: var(--gradient-gold);
            color: var(--text);
            text-decoration: none;
            padding: 1.25rem 2.5rem;
            border-radius: var(--radius-lg);
            font-weight: 700;
            font-size: 1.25rem;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
            gap: 1rem;
            box-shadow: var(--shadow-xl);
        }
        
        .btn-cta-primary:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(251, 191, 36, 0.4);
        }
        
        .btn-cta-secondary {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px);
            color: var(--bg);
            text-decoration: none;
            padding: 1.25rem 2.5rem;
            border-radius: var(--radius-lg);
            font-weight: 600;
            font-size: 1.25rem;
            transition: var(--transition);
            border: 2px solid rgba(255, 255, 255, 0.3);
            display: inline-flex;
            align-items: center;
            gap: 1rem;
        }
        
        .btn-cta-secondary:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-3px);
            border-color: rgba(255, 255, 255, 0.6);
            box-shadow: var(--shadow-xl);
        }
        
        /* Responsive Premium */
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
            
            .hero-actions,
            .cta-actions {
                flex-direction: column;
                align-items: center;
            }
            
            .btn-hero,
            .btn-secondary,
            .btn-cta-primary,
            .btn-cta-secondary {
                width: 100%;
                max-width: 350px;
                justify-content: center;
            }
            
            .services-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .innovation-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .aides-grid {
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
            }
            
            .testimonials-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .emergency-badge {
                bottom: 1rem;
                right: 1rem;
                padding: 1rem 1.5rem;
                font-size: 0.95rem;
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
    <!-- Header Premium -->
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

    <!-- Hero Premium -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <div class="hero-badge">
                    🏆 Certifié RGE QualiPAC • Aides jusqu'à 11 000€ • +${data.serviceCities.length} villes
                </div>
                
                <h1>
                    Chauffagiste <span class="hero-highlight">Premium</span><br>
                    ${data.city} et Région
                </h1>
                
                <p>
                    Installation pompe à chaleur, chaudière haute performance, climatisation. 
                    Rénovation énergétique avec aides financières. Économisez jusqu'à 75% sur vos factures.
                </p>
                
                <div class="hero-actions">
                    <a href="tel:${data.phone}" class="btn-hero">
                        📞 Étude Gratuite
                    </a>
                    <a href="contact.html" class="btn-secondary">
                        💰 Calculer mes Aides
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Premium -->
    <section class="services" id="services">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">🔥 Nos Expertises Premium</span>
                <h2 class="section-title">Solutions Chauffage & Énergétique</h2>
                <p class="section-description">
                    Spécialistes des solutions énergétiques durables et performantes. 
                    Installation, maintenance, rénovation. Bénéficiez des aides de l'État.
                </p>
            </div>
            
            <div class="services-grid">
                ${data.services.map((service, index) => `
                    <div class="service-card">
                        <div class="service-icon">
                            ${index === 0 ? '🔥' : index === 1 ? '❄️' : '⚡'}
                        </div>
                        <h3>${service.name}</h3>
                        <p>${service.description}</p>
                        <ul class="service-features">
                            <li>Étude thermique gratuite</li>
                            <li>Installation certifiée RGE</li>
                            <li>Aides financières maximisées</li>
                            <li>Garantie 15 ans constructeur</li>
                            <li>Maintenance préventive incluse</li>
                            <li>SAV 24h/7j</li>
                        </ul>
                        ${service.price ? `<div class="service-price">${service.price}</div>` : ''}
                        <a href="service-${service.id}.html" class="service-btn">
                            Découvrir →
                        </a>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Innovation -->
    <section class="innovation">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">🚀 Innovation</span>
                <h2 class="section-title">Technologies de Pointe</h2>
                <p class="section-description">
                    À la pointe de l'innovation énergétique pour votre confort et vos économies
                </p>
            </div>
            
            <div class="innovation-grid">
                <div class="innovation-card">
                    <div class="innovation-icon">🌡️</div>
                    <h3>Régulation Intelligente</h3>
                    <p>Système de régulation connecté qui s'adapte automatiquement à vos habitudes pour optimiser votre confort et vos économies.</p>
                </div>
                
                <div class="innovation-card">
                    <div class="innovation-icon">📱</div>
                    <h3>Application Mobile</h3>
                    <p>Pilotez votre installation à distance, suivez votre consommation en temps réel et recevez des alertes de maintenance.</p>
                </div>
                
                <div class="innovation-card">
                    <div class="innovation-icon">🌱</div>
                    <h3>Solutions Écologiques</h3>
                    <p>Pompes à chaleur haute performance, chaudières biomasse et solutions hybrides pour réduire votre empreinte carbone.</p>
                </div>
                
                <div class="innovation-card">
                    <div class="innovation-icon">💎</div>
                    <h3>Garantie Premium</h3>
                    <p>Extension de garantie jusqu'à 15 ans, maintenance préventive incluse et pièces d'origine constructeur garanties.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Aides Financières -->
    <section class="aides">
        <div class="container">
            <div class="aides-content">
                <h2>Aides Financières 2024</h2>
                <p>
                    Bénéficiez des aides exceptionnelles de l'État pour votre rénovation énergétique.
                    Nous nous occupons de toutes vos démarches administratives.
                </p>
                
                <div class="aides-grid">
                    <div class="aide-card">
                        <div class="aide-amount">11 000€</div>
                        <div class="aide-title">MaPrimeRénov'</div>
                        <div class="aide-description">Aide de l'État pour installation pompe à chaleur</div>
                    </div>
                    
                    <div class="aide-card">
                        <div class="aide-amount">4 000€</div>
                        <div class="aide-title">Prime CEE</div>
                        <div class="aide-description">Certificats d'Économies d'Énergie cumulables</div>
                    </div>
                    
                    <div class="aide-card">
                        <div class="aide-amount">0%</div>
                        <div class="aide-title">Éco-PTZ</div>
                        <div class="aide-description">Prêt à taux zéro jusqu'à 50 000€</div>
                    </div>
                    
                    <div class="aide-card">
                        <div class="aide-amount">5.5%</div>
                        <div class="aide-title">TVA Réduite</div>
                        <div class="aide-description">Taux préférentiel pour travaux éligibles</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Témoignages Premium -->
    <section class="testimonials">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">⭐ Témoignages</span>
                <h2 class="section-title">Ils Nous Font Confiance</h2>
                <p class="section-description">Plus de 1000 installations réalisées avec succès</p>
            </div>
            
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div class="testimonial-header">
                        <div class="testimonial-avatar">CD</div>
                        <div class="testimonial-info">
                            <h4>Claire Dubois</h4>
                            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
                        </div>
                    </div>
                    <p class="testimonial-text">Installation pompe à chaleur parfaite ! ${data.ownerName} a géré toutes les aides, nous avons économisé 11 000€. Facture chauffage divisée par 3. Équipe très professionnelle.</p>
                </div>
                
                <div class="testimonial-card">
                    <div class="testimonial-header">
                        <div class="testimonial-avatar">MR</div>
                        <div class="testimonial-info">
                            <h4>Michel Robert</h4>
                            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
                        </div>
                    </div>
                    <p class="testimonial-text">Rénovation énergétique complète de notre maison. Résultat exceptionnel : classe G à classe B. Confort incomparable et économies immédiates. Je recommande vivement !</p>
                </div>
                
                <div class="testimonial-card">
                    <div class="testimonial-header">
                        <div class="testimonial-avatar">SL</div>
                        <div class="testimonial-info">
                            <h4>Sylvie Laurent</h4>
                            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
                        </div>
                    </div>
                    <p class="testimonial-text">Service premium de A à Z. Étude personnalisée, financement optimal, installation soignée. L'application mobile est géniale pour suivre nos économies. Parfait !</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact CTA Premium -->
    <section class="contact-cta">
        <div class="container">
            <div class="cta-content">
                <h2>Prêt pour Votre Transition Énergétique ?</h2>
                <p>
                    Étude personnalisée gratuite • Installation certifiée RGE • Aides maximisées
                </p>
                
                <div class="cta-actions">
                    <a href="tel:${data.phone}" class="btn-cta-primary">
                        📞 ${data.phone}
                    </a>
                    <a href="contact.html" class="btn-cta-secondary">
                        💰 Calculer mes Économies
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Badge Urgence Premium -->
    ${data.emergencyAvailable ? `
        <a href="tel:${data.phone}" class="emergency-badge">
            🚨 Dépannage 24h/7j
        </a>
    ` : ''}

    <script>
        // Header Scroll Effect Premium
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

        // Smooth Scrolling Enhanced
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

        // Advanced Intersection Observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            });
        }, observerOptions);
        
        // Observe service cards with stagger
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px) scale(0.95)';
            card.style.transition = \`all 0.8s cubic-bezier(0.4, 0, 0.2, 1) \${index * 0.1}s\`;
            observer.observe(card);
        });

        // Observe innovation cards
        document.querySelectorAll('.innovation-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            card.style.transition = \`opacity 0.8s ease \${index * 0.15}s, transform 0.8s ease \${index * 0.15}s\`;
            observer.observe(card);
        });

        // Observe aide cards
        document.querySelectorAll('.aide-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = \`opacity 0.6s ease \${index * 0.1}s, transform 0.6s ease \${index * 0.1}s\`;
            observer.observe(card);
        });

        // Animate aide amounts on scroll
        const aideAmounts = document.querySelectorAll('.aide-amount');
        const aideObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    
                    if (finalValue.includes('€')) {
                        const num = parseInt(finalValue.replace(/[^\d]/g, ''));
                        if (num > 0) {
                            animateNumber(target, 0, num, 2000, '€');
                        }
                    } else if (finalValue.includes('%')) {
                        const num = parseFloat(finalValue);
                        if (num === 0) {
                            target.textContent = '0%';
                        } else {
                            animateNumber(target, 0, num, 1500, '%');
                        }
                    }
                }
            });
        }, { threshold: 0.5 });

        aideAmounts.forEach(amount => {
            aideObserver.observe(amount);
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
                
                if (suffix === '€' && value >= 1000) {
                    element.textContent = (value / 1000).toFixed(0) + ' 000€';
                } else {
                    element.textContent = value + suffix;
                }
                
                if (value !== end) {
                    requestAnimationFrame(run);
                }
            }
            
            run();
        }

        // Premium parallax effect for hero
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                const rate = scrolled * -0.5;
                hero.style.transform = \`translateY(\${rate}px)\`;
            }
        });

        // Service card hover effects
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-12px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-12px) scale(1)';
            });
        });
    </script>
</body>
</html>`
}