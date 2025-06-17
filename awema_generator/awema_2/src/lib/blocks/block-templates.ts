// Templates de blocs pour l'éditeur CMS
export interface BlockTemplate {
  id: string
  name: string
  category: string
  description: string
  icon: string
  config: Record<string, any>
  template: string
  styles: string
  editableFields: string[]
}

export const BLOCK_TEMPLATES: BlockTemplate[] = [
  // HERO BLOCKS
  {
    id: 'hero-standard',
    name: 'Hero Standard',
    category: 'hero',
    description: 'Section héro avec titre, description et boutons',
    icon: '🏠',
    config: {
      title: 'Votre Titre Principal',
      subtitle: 'Description de votre activité',
      backgroundImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080',
      buttonPrimary: {
        text: 'Devis Gratuit',
        href: 'contact.html',
        style: 'primary'
      },
      buttonSecondary: {
        text: 'Nos Services',
        href: '#services',
        style: 'secondary'
      },
      textColor: '#ffffff',
      overlayOpacity: 0.7
    },
    template: `
      <section class="hero-block relative min-h-screen flex items-center justify-center bg-cover bg-center" style="background-image: url('{{backgroundImage}}')">
        <div class="absolute inset-0 bg-black" style="opacity: {{overlayOpacity}}"></div>
        <div class="container mx-auto px-4 text-center relative z-10">
          <h1 class="text-5xl md:text-6xl font-bold mb-6" style="color: {{textColor}}" data-editable="title">{{title}}</h1>
          <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" style="color: {{textColor}}" data-editable="subtitle">{{subtitle}}</p>
          <div class="space-x-4">
            <a href="{{buttonPrimary.href}}" class="btn-{{buttonPrimary.style}} inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-all" data-editable="buttonPrimary.text">{{buttonPrimary.text}}</a>
            <a href="{{buttonSecondary.href}}" class="btn-{{buttonSecondary.style}} inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-all" data-editable="buttonSecondary.text">{{buttonSecondary.text}}</a>
          </div>
        </div>
      </section>
    `,
    styles: `
      .hero-block .btn-primary {
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        color: white;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
      }
      .hero-block .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(59, 130, 246, 0.6);
      }
      .hero-block .btn-secondary {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
      }
      .hero-block .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.5);
      }
    `,
    editableFields: ['title', 'subtitle', 'buttonPrimary.text', 'buttonPrimary.href', 'buttonSecondary.text', 'buttonSecondary.href', 'backgroundImage', 'textColor', 'overlayOpacity']
  },

  // SERVICES BLOCKS  
  {
    id: 'services-grid-3',
    name: 'Services Grille 3 colonnes',
    category: 'services',
    description: 'Grille de services avec icônes et descriptions',
    icon: '⚙️',
    config: {
      title: 'Nos Services',
      subtitle: 'Des solutions professionnelles adaptées à vos besoins',
      services: [
        {
          icon: '🔧',
          title: 'Dépannage',
          description: 'Intervention rapide 24h/7j pour tous vos problèmes urgents',
          href: 'service-depannage.html'
        },
        {
          icon: '🏠',
          title: 'Installation',
          description: 'Installation complète avec garantie et suivi qualité',
          href: 'service-installation.html'
        },
        {
          icon: '⚡',
          title: 'Maintenance',
          description: 'Contrats de maintenance préventive pour vos équipements',
          href: 'service-maintenance.html'
        }
      ]
    },
    template: `
      <section class="services-block py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4" data-editable="title">{{title}}</h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto" data-editable="subtitle">{{subtitle}}</p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            {{#each services}}
            <div class="service-card bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div class="text-4xl mb-4" data-editable="services.{{@index}}.icon">{{icon}}</div>
              <h3 class="text-xl font-bold text-gray-900 mb-4" data-editable="services.{{@index}}.title">{{title}}</h3>
              <p class="text-gray-600 mb-6" data-editable="services.{{@index}}.description">{{description}}</p>
              <a href="{{href}}" class="text-blue-600 font-semibold hover:text-blue-800 transition-colors">En savoir plus →</a>
            </div>
            {{/each}}
          </div>
        </div>
      </section>
    `,
    styles: `
      .services-block .service-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      }
    `,
    editableFields: ['title', 'subtitle', 'services.*.icon', 'services.*.title', 'services.*.description', 'services.*.href']
  },

  // TEXT BLOCKS
  {
    id: 'text-content',
    name: 'Contenu Texte',
    category: 'content',
    description: 'Bloc de contenu avec titre et texte riche',
    icon: '📝',
    config: {
      title: 'À Propos de Nous',
      content: `<p>Nous sommes une entreprise professionnelle avec plus de 15 ans d'expérience dans notre domaine.</p>
                <p>Notre équipe qualifiée vous accompagne pour tous vos projets avec expertise et passion.</p>
                <ul>
                  <li>✅ Service de qualité</li>
                  <li>✅ Devis gratuit</li>
                  <li>✅ Intervention rapide</li>
                </ul>`,
      backgroundColor: '#ffffff',
      textColor: '#374151'
    },
    template: `
      <section class="text-block py-16" style="background-color: {{backgroundColor}}">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl font-bold mb-8" style="color: {{textColor}}" data-editable="title">{{title}}</h2>
            <div class="prose prose-lg max-w-none" style="color: {{textColor}}" data-editable="content" data-editor="rich">
              {{{content}}}
            </div>
          </div>
        </div>
      </section>
    `,
    styles: `
      .text-block .prose ul {
        list-style: none;
        padding-left: 0;
      }
      .text-block .prose li {
        margin-bottom: 0.5rem;
      }
    `,
    editableFields: ['title', 'content', 'backgroundColor', 'textColor']
  },

  // CONTACT BLOCKS
  {
    id: 'contact-form',
    name: 'Formulaire de Contact',
    category: 'contact',
    description: 'Formulaire de contact avec informations',
    icon: '📞',
    config: {
      title: 'Contactez-nous',
      subtitle: 'Demandez votre devis gratuit',
      phone: '01 23 45 67 89',
      email: 'contact@entreprise.fr',
      address: '123 Rue de la République, 75001 Paris',
      formAction: '/api/contact',
      backgroundColor: '#f8fafc'
    },
    template: `
      <section class="contact-block py-16" style="background-color: {{backgroundColor}}">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4" data-editable="title">{{title}}</h2>
            <p class="text-xl text-gray-600" data-editable="subtitle">{{subtitle}}</p>
          </div>
          <div class="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Nos Coordonnées</h3>
              <div class="space-y-4">
                <div class="flex items-center">
                  <span class="text-2xl mr-4">📞</span>
                  <span class="text-lg" data-editable="phone">{{phone}}</span>
                </div>
                <div class="flex items-center">
                  <span class="text-2xl mr-4">✉️</span>
                  <span class="text-lg" data-editable="email">{{email}}</span>
                </div>
                <div class="flex items-center">
                  <span class="text-2xl mr-4">📍</span>
                  <span class="text-lg" data-editable="address">{{address}}</span>
                </div>
              </div>
            </div>
            <div>
              <form action="{{formAction}}" method="POST" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                  <input type="text" name="name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input type="email" name="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input type="tel" name="phone" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea name="message" rows="4" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    `,
    styles: `
      .contact-block form input:focus,
      .contact-block form textarea:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    `,
    editableFields: ['title', 'subtitle', 'phone', 'email', 'address', 'backgroundColor']
  },

  // TESTIMONIALS BLOCKS
  {
    id: 'testimonials-grid',
    name: 'Témoignages',
    category: 'testimonials',
    description: 'Grille de témoignages clients',
    icon: '⭐',
    config: {
      title: 'Ils nous font confiance',
      subtitle: 'Découvrez les avis de nos clients satisfaits',
      testimonials: [
        {
          name: 'Marie Dupont',
          company: 'Particulier',
          content: 'Service excellent, intervention rapide et travail de qualité. Je recommande vivement !',
          rating: 5,
          avatar: 'MD'
        },
        {
          name: 'Jean Martin',
          company: 'Entreprise',
          content: 'Professionnalisme exemplaire et respect des délais. Très satisfait de la prestation.',
          rating: 5,
          avatar: 'JM'
        }
      ]
    },
    template: `
      <section class="testimonials-block py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4" data-editable="title">{{title}}</h2>
            <p class="text-xl text-gray-600" data-editable="subtitle">{{subtitle}}</p>
          </div>
          <div class="grid md:grid-cols-2 gap-8">
            {{#each testimonials}}
            <div class="testimonial-card bg-gray-50 rounded-lg p-8">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {{avatar}}
                </div>
                <div>
                  <h4 class="font-bold text-gray-900" data-editable="testimonials.{{@index}}.name">{{name}}</h4>
                  <p class="text-gray-600 text-sm" data-editable="testimonials.{{@index}}.company">{{company}}</p>
                </div>
                <div class="ml-auto text-yellow-400">
                  {{#repeat rating}}⭐{{/repeat}}
                </div>
              </div>
              <p class="text-gray-700 italic" data-editable="testimonials.{{@index}}.content">"{{content}}"</p>
            </div>
            {{/each}}
          </div>
        </div>
      </section>
    `,
    styles: `
      .testimonials-block .testimonial-card {
        border-left: 4px solid #3b82f6;
      }
    `,
    editableFields: ['title', 'subtitle', 'testimonials.*.name', 'testimonials.*.company', 'testimonials.*.content', 'testimonials.*.rating']
  },

  // CTA BLOCKS
  {
    id: 'cta-banner',
    name: 'Bannière CTA',
    category: 'cta',
    description: 'Bannière d\'appel à l\'action',
    icon: '🎯',
    config: {
      title: 'Prêt à commencer votre projet ?',
      subtitle: 'Contactez-nous dès maintenant pour un devis gratuit',
      buttonText: 'Demander un devis',
      buttonHref: 'contact.html',
      backgroundColor: '#1e40af',
      textColor: '#ffffff'
    },
    template: `
      <section class="cta-block py-16" style="background-color: {{backgroundColor}}">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-4xl font-bold mb-4" style="color: {{textColor}}" data-editable="title">{{title}}</h2>
          <p class="text-xl mb-8" style="color: {{textColor}}" data-editable="subtitle">{{subtitle}}</p>
          <a href="{{buttonHref}}" class="cta-button inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors" data-editable="buttonText">{{buttonText}}</a>
        </div>
      </section>
    `,
    styles: `
      .cta-block .cta-button {
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transform: translateY(0);
        transition: all 0.3s ease;
      }
      .cta-block .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }
    `,
    editableFields: ['title', 'subtitle', 'buttonText', 'buttonHref', 'backgroundColor', 'textColor']
  }
]

// Fonction pour obtenir les templates par catégorie
export function getBlockTemplatesByCategory(category: string): BlockTemplate[] {
  return BLOCK_TEMPLATES.filter(template => template.category === category)
}

// Fonction pour obtenir un template par ID
export function getBlockTemplate(id: string): BlockTemplate | undefined {
  return BLOCK_TEMPLATES.find(template => template.id === id)
}

// Catégories disponibles
export const BLOCK_CATEGORIES = [
  { id: 'hero', name: 'Héros', icon: '🏠' },
  { id: 'services', name: 'Services', icon: '⚙️' },
  { id: 'content', name: 'Contenu', icon: '📝' },
  { id: 'contact', name: 'Contact', icon: '📞' },
  { id: 'testimonials', name: 'Témoignages', icon: '⭐' },
  { id: 'cta', name: 'Appel à l\'action', icon: '🎯' }
]