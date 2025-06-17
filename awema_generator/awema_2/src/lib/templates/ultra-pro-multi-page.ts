import { TemplateData } from '../template'
import { NavigationItem, SiteStructure } from '../multi-page-generator'

// Import des générateurs Ultra Pro
import { generateElectricienEliteProTemplate } from './electricien-elite-pro'
import { generateElectricienEliteProServiceTemplate } from './electricien-elite-pro-service'
import { generateElectricienEliteProContactTemplate } from './electricien-elite-pro-contact'

export interface UltraProSiteStructure extends SiteStructure {
  templateId: string
  style: string
  category: string
}

/**
 * Génère la structure complète d'un site Ultra Pro avec toutes ses pages
 */
export function generateUltraProSiteStructure(
  templateId: string,
  data: TemplateData
): UltraProSiteStructure {
  const pages = []
  const navigation = generateUltraProNavigation(data)
  
  // Page d'accueil
  pages.push({
    filename: 'index.html',
    title: `${data.companyName} - ${data.trade} Expert ${data.city}`,
    content: generateUltraProHomePage(templateId, data, navigation),
    type: 'home' as const
  })
  
  // Pages de services
  data.services.forEach(service => {
    pages.push({
      filename: `service-${service.id}.html`,
      title: `${service.name} ${data.city} | ${data.companyName}`,
      content: generateUltraProServicePage(templateId, data, navigation, service.id),
      type: 'service' as const,
      serviceId: service.id
    })
  })
  
  // Page contact
  pages.push({
    filename: 'contact.html',
    title: `Contact ${data.companyName} - ${data.trade} ${data.city}`,
    content: generateUltraProContactPage(templateId, data, navigation),
    type: 'contact' as const
  })
  
  // Page mentions légales
  pages.push({
    filename: 'mentions-legales.html',
    title: `Mentions Légales - ${data.companyName}`,
    content: generateUltraProLegalPage(templateId, data, navigation),
    type: 'legal' as const
  })
  
  return {
    pages,
    navigation,
    templateId,
    style: getTemplateStyle(templateId),
    category: getTemplateCategory(templateId)
  }
}

/**
 * Génère la navigation pour les templates Ultra Pro
 */
function generateUltraProNavigation(data: TemplateData): NavigationItem[] {
  return [
    {
      label: 'Accueil',
      href: 'index.html'
    },
    {
      label: 'Services',
      href: '#services',
      children: data.services.map(service => ({
        label: service.name,
        href: `service-${service.id}.html`
      }))
    },
    {
      label: 'Contact',
      href: 'contact.html'
    }
  ]
}

/**
 * Génère la page d'accueil selon le template Ultra Pro
 */
function generateUltraProHomePage(
  templateId: string,
  data: TemplateData,
  navigation: NavigationItem[]
): string {
  switch (templateId) {
    case 'electricien-elite-pro':
      return generateElectricienEliteProTemplate(data, navigation)
    case 'electricien-corporate-deluxe':
      // TODO: implémenter
      return generateElectricienEliteProTemplate(data, navigation)
    case 'electricien-artisan-moderne':
      // TODO: implémenter
      return generateElectricienEliteProTemplate(data, navigation)
    case 'plombier-aqua-premium':
      // TODO: implémenter
      return generateElectricienEliteProTemplate(data, navigation)
    default:
      return generateElectricienEliteProTemplate(data, navigation)
  }
}

/**
 * Génère une page service selon le template Ultra Pro
 */
function generateUltraProServicePage(
  templateId: string,
  data: TemplateData,
  navigation: NavigationItem[],
  serviceId: string
): string {
  switch (templateId) {
    case 'electricien-elite-pro':
      return generateElectricienEliteProServiceTemplate(data, navigation, serviceId)
    case 'electricien-corporate-deluxe':
      // TODO: implémenter sa propre variante service
      return generateElectricienEliteProServiceTemplate(data, navigation, serviceId)
    case 'electricien-artisan-moderne':
      // TODO: implémenter sa propre variante service
      return generateElectricienEliteProServiceTemplate(data, navigation, serviceId)
    case 'plombier-aqua-premium':
      // TODO: implémenter sa propre variante service
      return generateElectricienEliteProServiceTemplate(data, navigation, serviceId)
    default:
      return generateElectricienEliteProServiceTemplate(data, navigation, serviceId)
  }
}

/**
 * Génère la page contact selon le template Ultra Pro
 */
function generateUltraProContactPage(
  templateId: string,
  data: TemplateData,
  navigation: NavigationItem[]
): string {
  switch (templateId) {
    case 'electricien-elite-pro':
      return generateElectricienEliteProContactTemplate(data, navigation)
    case 'electricien-corporate-deluxe':
      // TODO: implémenter sa propre variante contact
      return generateElectricienEliteProContactTemplate(data, navigation)
    case 'electricien-artisan-moderne':
      // TODO: implémenter sa propre variante contact
      return generateElectricienEliteProContactTemplate(data, navigation)
    case 'plombier-aqua-premium':
      // TODO: implémenter sa propre variante contact
      return generateElectricienEliteProContactTemplate(data, navigation)
    default:
      return generateElectricienEliteProContactTemplate(data, navigation)
  }
}

/**
 * Génère la page mentions légales
 */
function generateUltraProLegalPage(
  templateId: string,
  data: TemplateData,
  navigation: NavigationItem[]
): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mentions Légales - ${data.companyName}</title>
    <meta name="description" content="Mentions légales de ${data.companyName}, ${data.trade} à ${data.city}.">
    <meta name="robots" content="noindex, nofollow">
    
    <style>
        :root {
            --primary: #1e40af;
            --text: #1f2937;
            --text-light: #6b7280;
            --bg: #ffffff;
            --bg-alt: #f9fafb;
            --border: #e5e7eb;
            --radius: 0.75rem;
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: var(--text);
            background: var(--bg);
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem 1rem;
        }
        
        .header {
            text-align: center;
            margin-bottom: 3rem;
            padding-bottom: 2rem;
            border-bottom: 2px solid var(--border);
        }
        
        .header h1 {
            color: var(--primary);
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        
        .header p {
            color: var(--text-light);
            font-size: 1.125rem;
        }
        
        .content h2 {
            color: var(--primary);
            font-size: 1.5rem;
            margin: 2rem 0 1rem 0;
        }
        
        .content p {
            margin-bottom: 1rem;
            color: var(--text-light);
        }
        
        .contact-info {
            background: var(--bg-alt);
            padding: 2rem;
            border-radius: var(--radius);
            margin: 2rem 0;
        }
        
        .back-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
            margin-top: 3rem;
            padding: 1rem 2rem;
            background: var(--bg-alt);
            border-radius: var(--radius);
            transition: all 0.3s ease;
        }
        
        .back-link:hover {
            background: var(--primary);
            color: white;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Mentions Légales</h1>
            <p>${data.companyName} - ${data.trade} ${data.city}</p>
        </div>
        
        <div class="content">
            <div class="contact-info">
                <h2>Informations sur l'entreprise</h2>
                <p><strong>Raison sociale :</strong> ${data.companyName}</p>
                <p><strong>Activité :</strong> ${data.trade}</p>
                <p><strong>Adresse :</strong> ${data.address}</p>
                <p><strong>Ville :</strong> ${data.city}</p>
                <p><strong>Téléphone :</strong> ${data.phone}</p>
                <p><strong>Email :</strong> ${data.email}</p>
                ${data.legalInfo?.siret ? `<p><strong>SIRET :</strong> ${data.legalInfo.siret}</p>` : ''}
                ${data.legalInfo?.vatNumber ? `<p><strong>TVA :</strong> ${data.legalInfo.vatNumber}</p>` : ''}
            </div>
            
            <h2>Responsable de la publication</h2>
            <p>Le responsable de la publication de ce site internet est ${data.ownerName}, dirigeant de ${data.companyName}.</p>
            
            <h2>Hébergement</h2>
            <p>Ce site est hébergé par nos services partenaires conformément à la réglementation française en vigueur.</p>
            
            <h2>Propriété intellectuelle</h2>
            <p>L'ensemble des contenus présents sur ce site (textes, images, logos) sont la propriété exclusive de ${data.companyName} ou font l'objet d'une autorisation d'utilisation.</p>
            
            <h2>Protection des données personnelles</h2>
            <p>Conformément à la loi "Informatique et Libertés" et au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Pour exercer ce droit, contactez-nous à ${data.email}.</p>
            
            <h2>Utilisation du site</h2>
            <p>L'utilisation de ce site implique l'acceptation pleine et entière des conditions générales d'utilisation décrites ci-après. ${data.companyName} se réserve le droit de modifier ces conditions à tout moment.</p>
            
            <h2>Limitation de responsabilité</h2>
            <p>${data.companyName} s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Cependant, des erreurs ou omissions peuvent survenir. L'internaute devra s'assurer de l'exactitude des informations et signaler toute erreur.</p>
        </div>
        
        <a href="index.html" class="back-link">
            ← Retour à l'accueil
        </a>
    </div>
</body>
</html>`
}

/**
 * Retourne le style du template
 */
function getTemplateStyle(templateId: string): string {
  const styleMap: Record<string, string> = {
    'electricien-elite-pro': 'premium',
    'electricien-corporate-deluxe': 'corporate',
    'electricien-artisan-moderne': 'artisanal',
    'plombier-aqua-premium': 'premium'
  }
  return styleMap[templateId] || 'modern'
}

/**
 * Retourne la catégorie du template
 */
function getTemplateCategory(templateId: string): string {
  if (templateId.startsWith('electricien')) return 'electricien'
  if (templateId.startsWith('plombier')) return 'plombier'
  if (templateId.startsWith('chauffagiste')) return 'chauffagiste'
  return 'multi-metiers'
}

export default {
  generateUltraProSiteStructure,
  generateUltraProNavigation,
  generateUltraProHomePage,
  generateUltraProServicePage,
  generateUltraProContactPage,
  generateUltraProLegalPage
}