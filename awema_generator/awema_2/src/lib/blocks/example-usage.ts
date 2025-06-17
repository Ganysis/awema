// Exemple d'utilisation du système de blocs modulaire ultra-pro
import { BlockRenderer, PageCompositionFactory, BlockRegistry } from './block-registry'
import { TemplateData } from '../template'

// Exemple de données client
const exampleData: TemplateData = {
  companyName: "ElectroPro Services",
  trade: "Électricien",
  description: "Spécialiste en installation électrique et dépannage 24h/7j",
  
  ownerName: "Jean Dupont",
  email: "contact@electropro-services.fr",
  phone: "01 23 45 67 89",
  address: "15 Avenue de la République",
  city: "Paris",
  
  primaryColor: "#1e40af",
  secondaryColor: "#3b82f6",
  logoUrl: "https://example.com/logo.png",
  
  services: [
    {
      id: "installation-electrique",
      name: "Installation Électrique",
      description: "Installation complète de systèmes électriques pour particuliers et professionnels",
      detailedDescription: "Installation complète de systèmes électriques aux normes NF C 15-100. Tableaux électriques, prises, éclairage, chauffage électrique.",
      price: "À partir de 150€",
      images: []
    },
    {
      id: "depannage-urgence",
      name: "Dépannage Urgence",
      description: "Service de dépannage électrique 24h/7j pour tous types de pannes",
      detailedDescription: "Intervention rapide en cas de panne électrique. Coupure générale, court-circuit, problème de tableau électrique.",
      price: "Devis gratuit",
      images: []
    },
    {
      id: "mise-aux-normes",
      name: "Mise aux Normes",
      description: "Mise en conformité de vos installations électriques selon la norme NF C 15-100",
      detailedDescription: "Diagnostic complet et mise en conformité de votre installation électrique selon les dernières normes en vigueur.",
      price: "À partir de 800€",
      images: []
    }
  ],
  
  serviceCities: [
    "Paris", "Boulogne-Billancourt", "Neuilly-sur-Seine", 
    "Levallois-Perret", "Courbevoie", "Nanterre"
  ],
  
  legalInfo: {
    siret: "12345678901234",
    vatNumber: "FR12345678901",
    legalForm: "SASU",
    capital: "10 000€",
    rcs: "Paris B 123 456 789",
    address: "15 Avenue de la République",
    city: "Paris",
    postalCode: "75011"
  },
  
  openingHours: "Lundi-Vendredi: 8h-18h, Samedi: 9h-17h",
  emergencyAvailable: true,
  
  domain: "electropro-services.fr",
  keywords: ["électricien", "installation électrique", "dépannage", "Paris", "urgence"]
}

// Exemple 1: Génération rapide avec Factory
export function generateUltraProHomePage(): string {
  const composition = PageCompositionFactory.createUltraProHomePage(exampleData)
  const renderer = new BlockRenderer(exampleData)
  return renderer.renderPageComposition(composition)
}

// Exemple 2: Composition personnalisée
export function generateCustomPage(): string {
  const renderer = new BlockRenderer(exampleData)
  
  // Composition manuelle avec contrôle total
  const customComposition = {
    type: 'home' as const,
    style: 'electricien' as const,
    blocks: [
      {
        id: 'hero-main',
        type: 'hero' as const,
        variant: 'ultra-pro',
        style: 'electricien' as const,
        data: exampleData,
        options: {
          animation: 'parallax',
          background: 'gradient',
          spacing: 'spacious'
        }
      },
      {
        id: 'services-showcase',
        type: 'services' as const,
        variant: 'ultra-pro',
        style: 'electricien' as const,
        data: exampleData,
        options: {
          layout: 'grid',
          animation: 'fade',
          spacing: 'normal'
        }
      }
    ],
    navigation: [
      { label: 'Accueil', href: 'index.html' },
      { 
        label: 'Services', 
        href: '#services',
        children: exampleData.services.map(service => ({
          label: service.name,
          href: `service-${service.id}.html`
        }))
      },
      { label: 'Contact', href: 'contact.html' }
    ],
    seo: {
      title: `${exampleData.companyName} - Électricien Expert ${exampleData.city}`,
      description: "Installation électrique, dépannage 24h/7j, mise aux normes. Devis gratuit.",
      keywords: exampleData.keywords,
      schema: {
        "@context": "https://schema.org",
        "@type": "ElectricalContractor",
        "name": exampleData.companyName,
        "telephone": exampleData.phone,
        "email": exampleData.email
      }
    },
    linking: {
      internal: [],
      contextual: [],
      recommendations: []
    }
  }
  
  return renderer.renderPageComposition(customComposition)
}

// Exemple 3: Génération de page service locale SEO
export function generateLocalSeoPage(serviceId: string, city: string): string {
  const service = exampleData.services.find(s => s.id === serviceId)
  if (!service) {
    throw new Error(`Service ${serviceId} not found`)
  }
  
  const renderer = new BlockRenderer(exampleData)
  
  const localComposition = {
    type: 'local-seo' as const,
    style: 'electricien' as const,
    blocks: [
      {
        id: 'hero-local',
        type: 'hero' as const,
        variant: 'split',
        style: 'electricien' as const,
        data: {
          ...exampleData,
          // Adaptation locale
          companyName: `${exampleData.companyName} ${city}`,
          description: `${service.name} à ${city} - ${exampleData.description}`
        },
        options: {
          localCity: city,
          localService: service
        }
      },
      {
        id: 'services-local',
        type: 'services' as const,
        variant: 'featured',
        style: 'electricien' as const,
        data: {
          ...exampleData,
          services: [service, ...exampleData.services.filter(s => s.id !== serviceId).slice(0, 2)]
        },
        options: {
          featuredService: service,
          localCity: city
        }
      }
    ],
    navigation: [
      { label: 'Accueil', href: 'index.html' },
      { label: 'Services', href: 'index.html#services' },
      { label: service.name, href: `service-${service.id}.html` },
      { label: city, href: '#' }
    ],
    seo: {
      title: `${service.name} ${city} - ${exampleData.companyName}`,
      description: `${service.name} à ${city}. ${exampleData.companyName} intervient rapidement pour tous vos besoins.`,
      keywords: [service.name.toLowerCase(), city.toLowerCase(), ...exampleData.keywords],
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.name,
        "provider": {
          "@type": "LocalBusiness",
          "name": exampleData.companyName,
          "areaServed": city
        }
      }
    },
    linking: {
      internal: [
        {
          anchor: `${service.name} dans d'autres villes`,
          href: `service-${service.id}.html`,
          context: `Découvrez notre service ${service.name} dans toutes nos zones d'intervention`,
          priority: 'high' as const
        }
      ],
      contextual: [
        {
          keywords: [city, service.name.toLowerCase()],
          href: `contact.html`,
          anchor: `Devis ${service.name} ${city}`,
          placement: 'content' as const
        }
      ],
      recommendations: exampleData.serviceCities
        .filter(c => c !== city)
        .slice(0, 3)
        .map(c => ({
          title: `${service.name} ${c}`,
          href: `${service.id}-${c.toLowerCase().replace(/\s+/g, '-')}.html`,
          description: `Découvrez notre service ${service.name} à ${c}`,
          type: 'city' as const
        }))
    }
  }
  
  return renderer.renderPageComposition(localComposition)
}

// Exemple 4: Test des variants disponibles
export function testAllVariants(): Record<string, string[]> {
  const availableBlocks = BlockRegistry.getAvailableTypes()
  const variants: Record<string, string[]> = {}
  
  availableBlocks.forEach(blockType => {
    variants[blockType] = BlockRegistry.getBlockVariants(blockType)
  })
  
  return variants
}

// Exemple 5: Rendu d'un bloc isolé pour prévisualisation
export function renderSingleBlock(blockType: string, variant: string): string {
  const renderer = new BlockRenderer(exampleData)
  
  const blockConfig = {
    id: `preview-${blockType}`,
    type: blockType as any,
    variant: variant,
    style: 'electricien' as const,
    data: exampleData,
    options: {
      preview: true
    }
  }
  
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Prévisualisation ${blockType} - ${variant}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <style>
          body { margin: 0; font-family: 'Inter', sans-serif; }
          .preview-container { min-height: 100vh; }
        </style>
    </head>
    <body>
        <div class="preview-container">
            ${renderer.renderBlock(blockConfig)}
        </div>
    </body>
    </html>
  `
}

// Exemple 6: Génération en lot pour plusieurs métiers
export function generateMultiTradeExamples(): Record<string, string> {
  const trades = [
    {
      trade: "Électricien",
      companyName: "ElectroPro Services",
      primaryColor: "#1e40af",
      secondaryColor: "#3b82f6"
    },
    {
      trade: "Plombier", 
      companyName: "AquaPro Solutions",
      primaryColor: "#0ea5e9",
      secondaryColor: "#06b6d4"
    },
    {
      trade: "Chauffagiste",
      companyName: "ThermoExpert Plus",
      primaryColor: "#ea580c", 
      secondaryColor: "#dc2626"
    }
  ]
  
  const results: Record<string, string> = {}
  
  trades.forEach(trade => {
    const tradeData = {
      ...exampleData,
      ...trade
    }
    
    const composition = PageCompositionFactory.createUltraProHomePage(tradeData)
    const renderer = new BlockRenderer(tradeData)
    results[trade.trade] = renderer.renderPageComposition(composition)
  })
  
  return results
}

// Export des fonctions d'exemple
export {
  exampleData,
  generateUltraProHomePage,
  generateCustomPage,
  generateLocalSeoPage,
  testAllVariants,
  renderSingleBlock,
  generateMultiTradeExamples
}