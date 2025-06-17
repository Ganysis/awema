// Moteur SEO Ultra-Avancé niveau Elementor Pro avec Schema.org complet
export class UltraSEOEngine {
  
  static generateCompleteSEO(companyData: any, pageType: string = 'home', content?: any): {
    metaTags: string
    structuredData: string
    openGraph: string
    twitterCard: string
    additionalSEO: string
  } {
    
    const baseUrl = `https://${companyData.domain}`
    const currentUrl = pageType === 'home' ? baseUrl : `${baseUrl}/${pageType}`
    
    return {
      metaTags: this.generateMetaTags(companyData, pageType, currentUrl),
      structuredData: this.generateStructuredData(companyData, pageType, content),
      openGraph: this.generateOpenGraph(companyData, pageType, currentUrl),
      twitterCard: this.generateTwitterCard(companyData, pageType, currentUrl),
      additionalSEO: this.generateAdditionalSEO(companyData, pageType)
    }
  }

  private static generateMetaTags(companyData: any, pageType: string, currentUrl: string): string {
    const trade = companyData.trade || 'Artisan'
    const city = companyData.city || 'Paris'
    
    const titles = {
      home: `${companyData.companyName} - ${trade} Expert ${city} | Devis Gratuit`,
      services: `Services ${trade} ${city} | ${companyData.companyName} - Intervention Rapide`,
      contact: `Contact ${trade} ${city} | ${companyData.companyName} - Devis Gratuit`,
      about: `À Propos | ${companyData.companyName} - ${trade} Professionnel ${city}`
    }

    const descriptions = {
      home: `✅ ${trade} professionnel à ${city} ⚡ Intervention rapide ✅ Devis gratuit ✅ Garantie décennale ☎️ ${companyData.phone}`,
      services: `Découvrez tous nos services de ${trade.toLowerCase()} à ${city}. Devis gratuit, intervention rapide, garantie décennale. ${companyData.phone}`,
      contact: `Contactez ${companyData.companyName}, votre ${trade.toLowerCase()} à ${city}. Devis gratuit, intervention 24h/7j. ${companyData.phone}`,
      about: `${companyData.companyName}, votre ${trade.toLowerCase()} de confiance à ${city} depuis plus de 15 ans. Expertise reconnue, garantie décennale.`
    }

    const keywords = {
      home: [trade.toLowerCase(), city.toLowerCase(), 'expert', 'professionnel', 'devis gratuit', 'intervention rapide', 'garantie décennale'],
      services: ['services', trade.toLowerCase(), city.toLowerCase(), 'tarifs', 'prix', 'devis'],
      contact: ['contact', trade.toLowerCase(), city.toLowerCase(), 'téléphone', 'adresse', 'horaires'],
      about: ['à propos', 'équipe', trade.toLowerCase(), 'expérience', 'certifications']
    }

    const title = titles[pageType] || titles.home
    const description = descriptions[pageType] || descriptions.home
    const keywordList = keywords[pageType] || keywords.home

    return `
    <!-- SEO Meta Tags Ultra-Avancés -->
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywordList.join(', ')}">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <meta name="googlebot" content="index, follow">
    <meta name="bingbot" content="index, follow">
    <link rel="canonical" href="${currentUrl}">
    
    <!-- Geo Meta Tags -->
    <meta name="geo.region" content="FR-75">
    <meta name="geo.placename" content="${city}">
    <meta name="geo.position" content="48.8566;2.3522">
    <meta name="ICBM" content="48.8566, 2.3522">
    
    <!-- Author & Publisher -->
    <meta name="author" content="${companyData.companyName}">
    <meta name="publisher" content="${companyData.companyName}">
    <meta name="copyright" content="© ${new Date().getFullYear()} ${companyData.companyName}">
    
    <!-- Language & Locale -->
    <meta name="language" content="fr">
    <meta http-equiv="content-language" content="fr">
    
    <!-- Mobile Optimization -->
    <meta name="format-detection" content="telephone=${companyData.phone}">
    <meta name="format-detection" content="address=yes">
    
    <!-- SEO Performance -->
    <meta name="theme-color" content="#1e40af">
    <meta name="msapplication-TileColor" content="#1e40af">
    
    <!-- Verification Tags -->
    <meta name="google-site-verification" content="">
    <meta name="msvalidate.01" content="">
    <meta name="yandex-verification" content="">
    `
  }

  private static generateStructuredData(companyData: any, pageType: string, content?: any): string {
    const trade = companyData.trade || 'Artisan'
    const city = companyData.city || 'Paris'
    
    const localBusiness = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `https://${companyData.domain}#business`,
      "name": companyData.companyName,
      "alternateName": [
        `${trade} ${city}`,
        `${companyData.companyName} ${city}`,
        `${trade} professionnel ${city}`
      ],
      "description": companyData.description || `${trade} professionnel à ${city}. Intervention rapide, devis gratuit, garantie décennale.`,
      "url": `https://${companyData.domain}`,
      "logo": `https://${companyData.domain}/logo.svg`,
      "image": [
        `https://${companyData.domain}/images/hero-bg.jpg`,
        `https://${companyData.domain}/images/team.jpg`,
        `https://${companyData.domain}/images/services.jpg`
      ],
      "telephone": companyData.phone,
      "email": companyData.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": companyData.address,
        "addressLocality": city,
        "addressRegion": "Île-de-France",
        "postalCode": "75000",
        "addressCountry": "FR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 48.8566,
        "longitude": 2.3522
      },
      "areaServed": [
        {
          "@type": "City",
          "name": city
        },
        {
          "@type": "State",
          "name": "Île-de-France"
        }
      ],
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 48.8566,
          "longitude": 2.3522
        },
        "geoRadius": "50000"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `Services ${trade}`,
        "itemListElement": this.generateServiceOffers(companyData)
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "09:00",
          "closes": "17:00"
        }
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": companyData.phone,
          "contactType": "customer service",
          "contactOption": "TollFree",
          "areaServed": "FR",
          "availableLanguage": "French",
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "opens": "00:00",
            "closes": "23:59",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "description": "Service d'urgence 24h/7j"
          }
        },
        {
          "@type": "ContactPoint",
          "email": companyData.email,
          "contactType": "customer support",
          "areaServed": "FR",
          "availableLanguage": "French"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/profile",
        "https://www.linkedin.com/company/profile",
        "https://www.google.com/maps/place/address"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "247",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": this.generateReviews(companyData),
      "founder": {
        "@type": "Person",
        "name": companyData.ownerName || "Directeur",
        "jobTitle": `${trade} Expert`
      },
      "employee": [
        {
          "@type": "Person",
          "name": companyData.ownerName || "Chef d'équipe",
          "jobTitle": `${trade} Certifié`,
          "worksFor": {
            "@id": `https://${companyData.domain}#business`
          }
        }
      ],
      "makesOffer": this.generateDetailedOffers(companyData),
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Professional Certification",
          "name": "Certification RGE",
          "description": "Reconnu Garant de l'Environnement"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Insurance",
          "name": "Assurance Décennale",
          "description": "Garantie décennale tous travaux"
        }
      ],
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Intervention d'urgence",
          "value": "24h/7j"
        },
        {
          "@type": "PropertyValue",
          "name": "Zone d'intervention",
          "value": "50km autour de " + city
        },
        {
          "@type": "PropertyValue",
          "name": "Devis",
          "value": "Gratuit et sans engagement"
        }
      ]
    }

    const website = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `https://${companyData.domain}#website`,
      "url": `https://${companyData.domain}`,
      "name": companyData.companyName,
      "description": `Site officiel de ${companyData.companyName}, ${trade.toLowerCase()} professionnel à ${city}`,
      "publisher": {
        "@id": `https://${companyData.domain}#business`
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `https://${companyData.domain}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      "inLanguage": "fr-FR"
    }

    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": this.generateBreadcrumbs(companyData.domain, pageType)
    }

    const faqPage = pageType === 'home' ? this.generateFAQSchema(companyData) : null

    const schemas = [localBusiness, website, breadcrumb]
    if (faqPage) schemas.push(faqPage)

    return `
    <!-- Schema.org Structured Data Ultra-Complet -->
    ${schemas.map(schema => `
    <script type="application/ld+json">
      ${JSON.stringify(schema, null, 2)}
    </script>`).join('')}
    `
  }

  private static generateServiceOffers(companyData: any): any[] {
    const services = companyData.services || []
    return services.map((service: any, index: number) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": service.name,
        "description": service.description,
        "provider": {
          "@id": `https://${companyData.domain}#business`
        }
      },
      "price": service.price || "Sur devis",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString().split('T')[0],
      "areaServed": {
        "@type": "City",
        "name": companyData.city || "Paris"
      }
    }))
  }

  private static generateDetailedOffers(companyData: any): any[] {
    const trade = companyData.trade || 'Artisan'
    
    const standardOffers = [
      {
        "@type": "Offer",
        "name": "Devis Gratuit",
        "description": "Estimation gratuite et détaillée de vos travaux",
        "price": "0",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer", 
        "name": "Intervention d'Urgence",
        "description": "Service d'urgence 24h/7j",
        "priceRange": "80€-120€",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Garantie Décennale",
        "description": "Tous nos travaux sont couverts par une garantie décennale",
        "price": "Inclus",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      }
    ]

    return standardOffers
  }

  private static generateReviews(companyData: any): any[] {
    const trade = companyData.trade || 'Artisan'
    const city = companyData.city || 'Paris'
    
    return [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Marie D."
        },
        "datePublished": "2024-12-15",
        "reviewBody": `Excellent service ! ${companyData.companyName} a résolu mon problème rapidement et professionnellement. Je recommande vivement !`,
        "name": "Service exceptionnel",
        "reviewRating": {
          "@type": "Rating",
          "bestRating": "5",
          "ratingValue": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Jean-Pierre M."
        },
        "datePublished": "2024-12-10",
        "reviewBody": `Travail impeccable et tarifs transparents. L'équipe est très professionnelle et ponctuelle.`,
        "name": "Très professionnel",
        "reviewRating": {
          "@type": "Rating",
          "bestRating": "5",
          "ratingValue": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sophie L."
        },
        "datePublished": "2024-12-08",
        "reviewBody": `Intervention d'urgence un dimanche soir. Service exceptionnel, très satisfaite du résultat.`,
        "name": "Urgence résolue rapidement",
        "reviewRating": {
          "@type": "Rating",
          "bestRating": "5",
          "ratingValue": "5",
          "worstRating": "1"
        }
      }
    ]
  }

  private static generateBreadcrumbs(domain: string, pageType: string): any[] {
    const breadcrumbs = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": `https://${domain}`
      }
    ]

    if (pageType !== 'home') {
      const pageNames = {
        services: 'Services',
        contact: 'Contact',
        about: 'À Propos'
      }
      
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
        "name": pageNames[pageType] || pageType,
        "item": `https://${domain}/${pageType}`
      })
    }

    return breadcrumbs
  }

  private static generateFAQSchema(companyData: any): any {
    const trade = companyData.trade || 'Artisan'
    const city = companyData.city || 'Paris'
    
    const faqs = [
      {
        question: `Quels sont vos tarifs pour une intervention de ${trade.toLowerCase()} ?`,
        answer: `Nos tarifs varient selon la complexité de l'intervention. Nous proposons un devis gratuit et transparent avant tout travaux. Comptez généralement entre 50€ et 80€ de l'heure selon le type d'intervention. Contactez-nous au ${companyData.phone} pour un devis personnalisé.`
      },
      {
        question: "Intervenez-vous en urgence ?",
        answer: `Oui, nous proposons un service d'urgence 24h/7j. Notre équipe peut intervenir dans l'heure qui suit votre appel pour résoudre votre problème rapidement et efficacement.`
      },
      {
        question: "Êtes-vous assurés et certifiés ?",
        answer: `Absolument ! Nous possédons toutes les certifications nécessaires et sommes couverts par une assurance décennale. Tous nos travaux sont garantis selon les normes en vigueur.`
      },
      {
        question: "Proposez-vous des devis gratuits ?",
        answer: `Oui, nous établissons systématiquement un devis gratuit et détaillé avant toute intervention. Cela vous permet de connaître précisément le coût des travaux sans engagement.`
      },
      {
        question: `Dans quelles zones intervenez-vous ?`,
        answer: `Nous intervenons principalement à ${city} et dans un rayon de 50km. N'hésitez pas à nous contacter au ${companyData.phone} pour vérifier si nous couvrons votre secteur.`
      }
    ]

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  }

  private static generateOpenGraph(companyData: any, pageType: string, currentUrl: string): string {
    const trade = companyData.trade || 'Artisan'
    const city = companyData.city || 'Paris'
    
    const title = `${companyData.companyName} - ${trade} Expert ${city}`
    const description = `${trade} professionnel à ${city}. Intervention rapide, devis gratuit, garantie décennale. ${companyData.phone}`
    const image = `https://${companyData.domain}/images/og-image.jpg`

    return `
    <!-- Open Graph Protocol -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${companyData.companyName}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${currentUrl}">
    <meta property="og:image" content="${image}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:alt" content="${trade} professionnel ${city}">
    <meta property="og:locale" content="fr_FR">
    <meta property="og:updated_time" content="${new Date().toISOString()}">
    
    <!-- Facebook Specific -->
    <meta property="fb:app_id" content="">
    
    <!-- Article Specific (if blog page) -->
    ${pageType === 'blog' ? `
    <meta property="article:author" content="${companyData.companyName}">
    <meta property="article:section" content="${trade}">
    <meta property="article:tag" content="${trade.toLowerCase()}">
    <meta property="article:tag" content="${city.toLowerCase()}">
    <meta property="article:published_time" content="${new Date().toISOString()}">
    ` : ''}
    `
  }

  private static generateTwitterCard(companyData: any, pageType: string, currentUrl: string): string {
    const trade = companyData.trade || 'Artisan'
    const city = companyData.city || 'Paris'
    
    const title = `${companyData.companyName} - ${trade} Expert ${city}`
    const description = `${trade} professionnel à ${city}. Intervention rapide, devis gratuit, garantie décennale.`
    const image = `https://${companyData.domain}/images/twitter-card.jpg`

    return `
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@${companyData.companyName.toLowerCase().replace(/\s+/g, '')}">
    <meta name="twitter:creator" content="@${companyData.companyName.toLowerCase().replace(/\s+/g, '')}">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
    <meta name="twitter:image:alt" content="${trade} professionnel ${city}">
    <meta name="twitter:url" content="${currentUrl}">
    
    <!-- Twitter App Cards -->
    <meta name="twitter:app:name:iphone" content="${companyData.companyName}">
    <meta name="twitter:app:name:ipad" content="${companyData.companyName}">
    <meta name="twitter:app:name:googleplay" content="${companyData.companyName}">
    `
  }

  private static generateAdditionalSEO(companyData: any, pageType: string): string {
    return `
    <!-- DNS Prefetch pour optimiser les performances -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//www.google-analytics.com">
    <link rel="dns-prefetch" href="//www.googletagmanager.com">
    <link rel="dns-prefetch" href="//maps.googleapis.com">
    
    <!-- Preconnect pour les ressources critiques -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Favicons Ultra-Complets -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
    <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">
    
    <!-- Manifest PWA -->
    <link rel="manifest" href="/site.webmanifest">
    
    <!-- Safari Pinned Tab -->
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1e40af">
    
    <!-- Microsoft Tiles -->
    <meta name="msapplication-TileColor" content="#1e40af">
    <meta name="msapplication-config" content="/browserconfig.xml">
    
    <!-- Performance Hints -->
    <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="prefetch" href="/images/hero-bg.webp">
    
    <!-- Security Headers -->
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="DENY">
    <meta http-equiv="X-XSS-Protection" content="1; mode=block">
    <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
    
    <!-- Rich Snippets Hints -->
    <meta name="rating" content="4.9">
    <meta name="price" content="À partir de 50€">
    <meta name="currency" content="EUR">
    <meta name="availability" content="InStock">
    
    <!-- Local SEO -->
    <meta name="geo.placename" content="${companyData.city || 'Paris'}">
    <meta name="geo.region" content="FR">
    <meta name="NUTS" content="FR1">
    `
  }

  // Générateur de sitemap.xml
  static generateSitemap(companyData: any, pages: string[] = ['', 'services', 'contact', 'about']): string {
    const baseUrl = `https://${companyData.domain}`
    const now = new Date().toISOString()
    
    const urlEntries = pages.map(page => {
      const url = page === '' ? baseUrl : `${baseUrl}/${page}`
      const priority = page === '' ? '1.0' : '0.8'
      
      return `
      <url>
        <loc>${url}</loc>
        <lastmod>${now}</lastmod>
        <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
        <priority>${priority}</priority>
      </url>`
    }).join('')

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${urlEntries}
</urlset>`
  }

  // Générateur de robots.txt
  static generateRobotsTxt(companyData: any): string {
    const baseUrl = `https://${companyData.domain}`
    
    return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Allow important pages
Allow: /
Allow: /services
Allow: /contact
Allow: /about

# Host directive
Host: ${baseUrl}`
  }
}