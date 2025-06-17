// Générateur de contenu ultra-détaillé niveau Elementor Pro (2000+ mots par page)
export class UltraContentGenerator {
  
  static generateUltraDetailedContent(companyData: any, pageType: string = 'home'): {
    heroContent: any
    aboutContent: string
    servicesContent: any[]
    faqContent: any[]
    blogContent: any[]
    additionalSections: any[]
  } {
    const trade = companyData.trade || 'Artisan'
    const city = companyData.city || 'Paris'
    
    return {
      heroContent: this.generateHeroContent(companyData, trade, city),
      aboutContent: this.generateAboutContent(companyData, trade, city),
      servicesContent: this.generateDetailedServices(companyData, trade, city),
      faqContent: this.generateComprehensiveFAQ(companyData, trade, city),
      blogContent: this.generateBlogArticles(companyData, trade, city),
      additionalSections: this.generateAdditionalSections(companyData, trade, city)
    }
  }

  private static generateHeroContent(companyData: any, trade: string, city: string): any {
    const heroVariations = {
      electricien: {
        title: `${companyData.companyName} - Électricien Expert ${city}`,
        subtitle: "Votre partenaire électrique de confiance depuis 2008",
        description: `Spécialiste en installation électrique, dépannage d'urgence et mise aux normes à ${city}. Notre équipe d'électriciens certifiés intervient 24h/7j avec un service premium et des tarifs transparents. Plus de 2000 interventions réussites, garantie décennale incluse.`,
        features: [
          "⚡ Installation électrique complète et mise aux normes NF C 15-100",
          "🔧 Dépannage d'urgence 24h/7j avec intervention sous 1h garantie",
          "🏠 Rénovation électrique complète avec diagnostic gratuit",
          "💡 Domotique et éclairage LED intelligent dernière génération",
          "🔌 Installation de bornes de recharge véhicules électriques",
          "📱 Système de surveillance et alarme connectée"
        ],
        certifications: ["RGE QualiPAC", "Qualifelec", "Assurance Décennale", "IRVE Véhicules Électriques"]
      },
      plombier: {
        title: `${companyData.companyName} - Plombier Expert ${city}`,
        subtitle: "Solutions plomberie et chauffage depuis 15 ans",
        description: `Expert en plomberie, chauffage et sanitaires à ${city}. Intervention rapide pour fuites, dépannage urgence, installation complète salle de bain et cuisine. Équipe de plombiers certifiés RGE, devis gratuit, garantie décennale. Plus de 1500 clients satisfaits.`,
        features: [
          "🚿 Installation et rénovation complète salle de bain et cuisine",
          "🔧 Dépannage urgence fuite, canalisation bouchée 24h/7j",
          "🏠 Installation chaudière, pompe à chaleur et système chauffage",
          "💧 Détection de fuite par caméra thermique et géolocalisation",
          "♻️ Solutions écologiques : chauffe-eau solaire, récupération d'eau",
          "🔍 Diagnostic complet installation avec rapport détaillé"
        ],
        certifications: ["RGE Quali'Sol", "PGN Plomberie", "Assurance Décennale", "Qualibat"]
      },
      chauffagiste: {
        title: `${companyData.companyName} - Chauffagiste Expert ${city}`,
        subtitle: "Spécialiste chauffage et énergies renouvelables",
        description: `Chauffagiste professionnel à ${city} spécialisé en pompe à chaleur, chaudière gaz condensation et énergies renouvelables. Installation, maintenance et dépannage par équipe certifiée RGE. Bénéficiez des aides MaPrimeRénov' et CEE.`,
        features: [
          "🔥 Installation pompe à chaleur air/eau et géothermie",
          "⚡ Chaudière gaz condensation haute performance énergétique",
          "🌱 Systèmes solaires thermiques et photovoltaïques",
          "🏠 Plancher chauffant et radiateurs design dernière génération",
          "🔧 Maintenance préventive et contrat d'entretien annuel",
          "💰 Accompagnement aides financières MaPrimeRénov' et CEE"
        ],
        certifications: ["RGE QualiPAC", "RGE Quali'Sol", "Qualigaz", "Assurance Décennale"]
      }
    }

    const tradeKey = trade.toLowerCase().includes('électricien') ? 'electricien' :
                     trade.toLowerCase().includes('plombier') ? 'plombier' : 'chauffagiste'
    
    return heroVariations[tradeKey] || heroVariations.electricien
  }

  private static generateAboutContent(companyData: any, trade: string, city: string): string {
    return `
    <div class="about-ultra-detailed">
      <h2>À Propos de ${companyData.companyName}</h2>
      
      <div class="about-introduction">
        <h3>Votre ${trade} de Confiance à ${city} depuis 2008</h3>
        <p>Fondée en 2008 par ${companyData.ownerName || 'notre équipe dirigeante'}, ${companyData.companyName} s'est imposée comme une référence dans le domaine du ${trade.toLowerCase()} à ${city} et dans toute l'Île-de-France. Notre entreprise familiale a su évoluer et grandir tout en conservant ses valeurs fondamentales : excellence du service, respect des délais et satisfaction client.</p>
        
        <p>Avec plus de 15 années d'expérience et plus de 2000 interventions réussies, nous maîtrisons parfaitement tous les aspects du métier de ${trade.toLowerCase()}, des installations les plus simples aux projets les plus complexes. Notre équipe de ${trade.toLowerCase()}s certifiés et qualifiés met à votre service son expertise technique et son savoir-faire pour tous vos besoins.</p>
      </div>

      <div class="about-expertise">
        <h3>Notre Expertise Technique</h3>
        <p>Chez ${companyData.companyName}, nous investissons continuellement dans la formation de notre équipe et l'acquisition des dernières technologies. Nos ${trade.toLowerCase()}s suivent régulièrement des formations pour rester à la pointe des innovations du secteur et des nouvelles réglementations.</p>
        
        <div class="expertise-areas">
          ${this.generateExpertiseByTrade(trade, city)}
        </div>
      </div>

      <div class="about-commitments">
        <h3>Nos Engagements Qualité</h3>
        <ul>
          <li><strong>Transparence totale :</strong> Devis détaillé gratuit avant toute intervention, sans surprise ni coût caché</li>
          <li><strong>Réactivité :</strong> Intervention d'urgence 24h/7j avec temps de réponse garanti sous 1h</li>
          <li><strong>Qualité :</strong> Utilisation exclusive de matériaux premium et respect des normes en vigueur</li>
          <li><strong>Garantie :</strong> Tous nos travaux sont couverts par notre assurance décennale</li>
          <li><strong>Respect :</strong> Respect de votre domicile avec protection des sols et nettoyage après intervention</li>
          <li><strong>Conseil :</strong> Accompagnement personnalisé et conseils d'experts pour optimiser vos installations</li>
        </ul>
      </div>

      <div class="about-certifications">
        <h3>Certifications et Assurances</h3>
        <p>Notre professionnalisme est reconnu par de nombreuses certifications officielles qui témoignent de notre expertise et de notre engagement qualité :</p>
        ${this.generateCertificationsByTrade(trade)}
      </div>

      <div class="about-team">
        <h3>Notre Équipe</h3>
        <p>L'équipe ${companyData.companyName} est composée de ${trade.toLowerCase()}s expérimentés, chacun spécialisé dans un domaine spécifique. Cette spécialisation nous permet d'offrir un service ultra-professionnel adapté à chaque situation :</p>
        
        <div class="team-members">
          <div class="team-member">
            <h4>${companyData.ownerName || 'Directeur'} - Fondateur et Dirigeant</h4>
            <p>15 ans d'expérience, expert en ${trade.toLowerCase()}, pilote les projets complexes et assure le suivi qualité de toutes nos interventions.</p>
          </div>
          
          <div class="team-member">
            <h4>Chef d'Équipe Terrain</h4>
            <p>10 ans d'expérience, spécialiste des interventions d'urgence et de la gestion des chantiers importants.</p>
          </div>
          
          <div class="team-member">
            <h4>Technicien Senior</h4>
            <p>8 ans d'expérience, expert en nouvelles technologies et systèmes connectés.</p>
          </div>
        </div>
      </div>

      <div class="about-values">
        <h3>Nos Valeurs</h3>
        <p>Depuis notre création, ${companyData.companyName} s'appuie sur des valeurs fortes qui guident chacune de nos actions :</p>
        
        <div class="values-grid">
          <div class="value">
            <h4>🏆 Excellence</h4>
            <p>Nous visons l'excellence dans chaque intervention, du diagnostic initial à la finition des travaux.</p>
          </div>
          
          <div class="value">
            <h4>🤝 Confiance</h4>
            <p>Nous construisons des relations durables basées sur la transparence et le respect de nos engagements.</p>
          </div>
          
          <div class="value">
            <h4>🚀 Innovation</h4>
            <p>Nous restons à la pointe de la technologie pour offrir les meilleures solutions à nos clients.</p>
          </div>
          
          <div class="value">
            <h4>🌱 Responsabilité</h4>
            <p>Nous privilégions les solutions écologiques et durables pour préserver l'environnement.</p>
          </div>
        </div>
      </div>
    </div>
    `
  }

  private static generateExpertiseByTrade(trade: string, city: string): string {
    const expertiseByTrade = {
      'Électricien': `
        <div class="expertise-item">
          <h4>🏠 Installation Électrique Résidentielle</h4>
          <p>Conception et réalisation d'installations électriques complètes pour maisons individuelles et appartements. Mise aux normes NF C 15-100, création de tableaux électriques modulaires, installation prises et éclairages.</p>
        </div>
        
        <div class="expertise-item">
          <h4>🏢 Électricité Tertiaire et Industrielle</h4>
          <p>Installations électriques pour bureaux, commerces et industries. Éclairage professionnel, câblage informatique, systèmes de sécurité et contrôle d'accès.</p>
        </div>
        
        <div class="expertise-item">
          <h4>💡 Domotique et Maison Connectée</h4>
          <p>Installation de systèmes domotiques intelligents : éclairage connecté, volets automatisés, thermostats intelligents, systèmes de sécurité connectés.</p>
        </div>
        
        <div class="expertise-item">
          <h4>🔌 Bornes de Recharge Véhicules Électriques</h4>
          <p>Installation de bornes de recharge IRVE (Infrastructure de Recharge pour Véhicules Électriques) pour particuliers et entreprises, avec gestion intelligente de la charge.</p>
        </div>
      `,
      'Plombier': `
        <div class="expertise-item">
          <h4>🚿 Sanitaires et Salle de Bain</h4>
          <p>Conception et installation complète de salles de bain : douche à l'italienne, baignoire îlot, robinetterie design, carrelage et faïence.</p>
        </div>
        
        <div class="expertise-item">
          <h4>🏠 Chauffage et Eau Chaude Sanitaire</h4>
          <p>Installation de chaudières gaz condensation, chauffe-eau thermodynamiques, systèmes de chauffage central et plancher chauffant hydraulique.</p>
        </div>
        
        <div class="expertise-item">
          <h4>🔧 Dépannage et Maintenance</h4>
          <p>Intervention d'urgence pour fuites, canalisations bouchées, panne de chauffage. Contrats de maintenance préventive pour optimiser la durée de vie des installations.</p>
        </div>
        
        <div class="expertise-item">
          <h4>💧 Solutions Écologiques</h4>
          <p>Installation de systèmes économes en eau : récupération d'eau de pluie, chauffe-eau solaires, robinetterie économique, systèmes de filtration d'eau.</p>
        </div>
      `,
      'Chauffagiste': `
        <div class="expertise-item">
          <h4>🔥 Pompes à Chaleur</h4>
          <p>Installation de pompes à chaleur air/eau, géothermique et hybrides. Dimensionnement précis, installation et mise en service par techniciens certifiés RGE.</p>
        </div>
        
        <div class="expertise-item">
          <h4>⚡ Chaudières Haute Performance</h4>
          <p>Installation de chaudières gaz condensation, chaudières biomasse et systèmes hybrides. Optimisation du rendement énergétique et réduction des consommations.</p>
        </div>
        
        <div class="expertise-item">
          <h4>🌞 Énergies Renouvelables</h4>
          <p>Systèmes solaires thermiques et photovoltaïques, chauffe-eau solaires, poêles à granulés et insert. Solutions durables et écologiques.</p>
        </div>
        
        <div class="expertise-item">
          <h4>🏠 Rénovation Énergétique</h4>
          <p>Audit énergétique complet, isolation, ventilation VMC double flux, programmation et régulation intelligente. Accompagnement pour les aides financières.</p>
        </div>
      `
    }

    return expertiseByTrade[trade] || expertiseByTrade['Électricien']
  }

  private static generateCertificationsByTrade(trade: string): string {
    const certifications = {
      'Électricien': `
        <ul class="certifications-list">
          <li><strong>Qualifelec :</strong> Certification professionnelle électricité attestant de notre expertise technique</li>
          <li><strong>RGE (Reconnu Garant Environnement) :</strong> Pour les installations d'énergies renouvelables</li>
          <li><strong>IRVE (Infrastructure de Recharge Véhicules Électriques) :</strong> Habilitation pour les bornes de recharge</li>
          <li><strong>Assurance Décennale MAAF :</strong> Couverture complète de tous nos travaux pendant 10 ans</li>
          <li><strong>Certification NF C 15-100 :</strong> Mise aux normes électriques résidentielles et tertiaires</li>
        </ul>
      `,
      'Plombier': `
        <ul class="certifications-list">
          <li><strong>PGN (Professionnel Gaz Naturel) :</strong> Habilitation pour les installations gaz</li>
          <li><strong>RGE Quali'Sol :</strong> Pour les installations solaires thermiques</li>
          <li><strong>Qualibat :</strong> Certification bâtiment attestant de notre qualification professionnelle</li>
          <li><strong>Assurance Décennale MAAF :</strong> Garantie 10 ans sur tous nos travaux de plomberie</li>
          <li><strong>Formation continue :</strong> Mise à jour régulière des compétences et nouvelles technologies</li>
        </ul>
      `,
      'Chauffagiste': `
        <ul class="certifications-list">
          <li><strong>RGE QualiPAC :</strong> Certification pour les pompes à chaleur et systèmes thermodynamiques</li>
          <li><strong>RGE Quali'Sol :</strong> Pour les installations solaires thermiques et photovoltaïques</li>
          <li><strong>Qualigaz :</strong> Habilitation pour les installations et maintenance gaz</li>
          <li><strong>Assurance Décennale MAAF :</strong> Couverture complète 10 ans sur toutes nos installations</li>
          <li><strong>Formation fabricants :</strong> Agréments Daikin, Atlantic, Bosch, Viessmann</li>
        </ul>
      `
    }

    return certifications[trade] || certifications['Électricien']
  }

  private static generateDetailedServices(companyData: any, trade: string, city: string): any[] {
    const servicesByTrade = {
      'Électricien': [
        {
          name: "Installation Électrique Complète",
          description: "Installation électrique complète pour logements neufs et rénovations. Conception sur-mesure, mise aux normes NF C 15-100, tableau électrique modulaire, prises et éclairages. Diagnostic gratuit et devis détaillé.",
          detailedDescription: `Notre service d'installation électrique complète comprend :
            
            <h4>🔍 Diagnostic et Étude Préalable</h4>
            <ul>
              <li>Analyse des besoins électriques selon surface et usage</li>
              <li>Étude de faisabilité et contraintes techniques</li>
              <li>Calcul de puissance et dimensionnement du compteur</li>
              <li>Plan électrique détaillé avec implantation des équipements</li>
            </ul>
            
            <h4>⚡ Installation du Tableau Électrique</h4>
            <ul>
              <li>Tableau électrique modulaire dernière génération</li>
              <li>Disjoncteurs différentiels haute sensibilité</li>
              <li>Parafoudre pour protection des équipements sensibles</li>
              <li>Compteur divisionnaire pour suivi consommation</li>
            </ul>
            
            <h4>🏠 Câblage et Distribution</h4>
            <ul>
              <li>Câblage en gaines ICTA ou moulures selon configuration</li>
              <li>Prises 16A et 32A selon besoins (électroménager, véhicule électrique)</li>
              <li>Éclairage LED intérieur et extérieur</li>
              <li>Interrupteurs et variateurs design</li>
            </ul>`,
          price: "À partir de 2500€",
          duration: "3-5 jours",
          warranty: "Garantie décennale",
          features: ["Devis gratuit", "Mise aux normes", "Matériaux premium", "Garantie 10 ans"]
        },
        {
          name: "Dépannage Électrique Urgence 24h/7j",
          description: "Service d'urgence électrique 24h/7j. Intervention rapide sous 1h pour pannes électriques, disjoncteurs qui sautent, prises défaillantes, éclairage en panne. Diagnostic immédiat et réparation sur place.",
          detailedDescription: `Notre service de dépannage d'urgence inclut :
            
            <h4>🚨 Interventions d'Urgence</h4>
            <ul>
              <li>Panne électrique totale ou partielle</li>
              <li>Disjoncteur différentiel qui saute répétitivement</li>
              <li>Court-circuit et recherche de défaut</li>
              <li>Prises électriques défaillantes ou dangereuses</li>
            </ul>
            
            <h4>🔧 Diagnostic Professionnel</h4>
            <ul>
              <li>Multimètre et appareils de mesure professionnels</li>
              <li>Recherche de défaut par thermographie infrarouge</li>
              <li>Test d'isolement et continuité des circuits</li>
              <li>Rapport de diagnostic avec photos</li>
            </ul>`,
          price: "90€/h + déplacement",
          duration: "Intervention immédiate",
          warranty: "6 mois pièces et main d'œuvre",
          features: ["24h/7j", "Sous 1h", "Diagnostic inclus", "Devis immédiat"]
        },
        {
          name: "Mise aux Normes NF C 15-100",
          description: "Mise en conformité installation électrique selon norme NF C 15-100. Diagnostic complet, remplacement tableau électrique, ajout prises terre et différentiels. Attestation Consuel incluse.",
          detailedDescription: `La mise aux normes NF C 15-100 comprend :
            
            <h4>📋 Diagnostic de Conformité</h4>
            <ul>
              <li>Contrôle tableau électrique et protection différentielle</li>
              <li>Vérification mise à la terre et liaisons équipotentielles</li>
              <li>Test isolement et continuité des circuits électriques</li>
              <li>Rapport détaillé avec liste des non-conformités</li>
            </ul>
            
            <h4>🔄 Travaux de Mise en Conformité</h4>
            <ul>
              <li>Remplacement tableau électrique par modèle aux normes</li>
              <li>Installation disjoncteurs différentiels 30mA</li>
              <li>Création ou refection liaison équipotentielle salle de bain</li>
              <li>Ajout prises terre manquantes et protection circuits</li>
            </ul>`,
          price: "1800-3500€",
          duration: "2-3 jours",
          warranty: "Garantie décennale + Consuel",
          features: ["Diagnostic inclus", "Attestation Consuel", "Financement possible", "Devis gratuit"]
        }
      ],
      'Plombier': [
        {
          name: "Rénovation Salle de Bain Complète",
          description: "Rénovation complète salle de bain clé en main. Conception 3D, démolition, plomberie, carrelage, électricité, peinture. Douche italienne, baignoire îlot, robinetterie design. Devis gratuit avec visite technique.",
          detailedDescription: `Notre prestation complète inclut :
            
            <h4>🎨 Conception et Design</h4>
            <ul>
              <li>Visite technique et prise de mesures précises</li>
              <li>Plan 3D personnalisé avec différentes options</li>
              <li>Sélection matériaux : carrelage, faïence, sanitaires</li>
              <li>Optimisation espace et ergonomie</li>
            </ul>
            
            <h4>🔧 Travaux de Plomberie</h4>
            <ul>
              <li>Modification ou création arrivées eau chaude/froide</li>
              <li>Installation évacuations douche, baignoire, lavabo</li>
              <li>Pose sanitaires : WC suspendu, vasque, robinetterie</li>
              <li>Test étanchéité et mise en pression</li>
            </ul>`,
          price: "8000-15000€",
          duration: "7-10 jours",
          warranty: "Garantie décennale",
          features: ["Plan 3D inclus", "Clé en main", "Matériaux premium", "Suivi de chantier"]
        }
      ],
      'Chauffagiste': [
        {
          name: "Installation Pompe à Chaleur",
          description: "Installation pompe à chaleur air/eau haute performance. Étude thermique gratuite, dimensionnement précis, installation par technicien RGE. Économies jusqu'à 70% sur facture chauffage. Aides MaPrimeRénov'.",
          detailedDescription: `Notre service d'installation PAC comprend :
            
            <h4>🏠 Étude Thermique Personnalisée</h4>
            <ul>
              <li>Bilan thermique complet du logement</li>
              <li>Calcul déperditions et besoins en chauffage</li>
              <li>Dimensionnement précis puissance PAC</li>
              <li>Étude faisabilité et contraintes techniques</li>
            </ul>
            
            <h4>⚡ Installation Professionnelle</h4>
            <ul>
              <li>Pose unité extérieure avec isolations phoniques</li>
              <li>Raccordement hydraulique et électrique</li>
              <li>Programmation et mise en service</li>
              <li>Formation utilisation et optimisation</li>
            </ul>`,
          price: "8000-15000€",
          duration: "2-3 jours",
          warranty: "Garantie 5 ans constructeur + décennale",
          features: ["Étude gratuite", "RGE", "Aides financières", "SAV inclus"]
        }
      ]
    }

    return servicesByTrade[trade] || servicesByTrade['Électricien']
  }

  private static generateComprehensiveFAQ(companyData: any, trade: string, city: string): any[] {
    return [
      {
        question: `Quels sont vos tarifs pour une intervention de ${trade.toLowerCase()} à ${city} ?`,
        answer: `Nos tarifs varient selon la complexité de l'intervention et sont toujours transparents. Pour un dépannage standard, comptez 90€/h + déplacement (gratuit dans un rayon de 10km autour de ${city}). Pour les installations, nous établissons systématiquement un devis gratuit et détaillé. Nos prix incluent toujours la TVA, la garantie et le nettoyage après intervention. Contactez-nous au ${companyData.phone} pour un devis personnalisé adapté à vos besoins spécifiques.`,
        category: "Tarifs"
      },
      {
        question: "Intervenez-vous vraiment en urgence 24h/7j ?",
        answer: `Absolument ! Notre service d'urgence fonctionne 24h/7j, 365 jours par an. Nous disposons d'une équipe de ${trade.toLowerCase()}s d'astreinte qui peut intervenir dans l'heure qui suit votre appel, même le week-end et les jours fériés. Pour les urgences (panne électrique totale, fuite importante, panne de chauffage en hiver), nous garantissons une intervention sous 1h dans un rayon de 30km autour de ${city}. Un supplément urgence de 50€ s'applique pour les interventions de nuit (20h-8h) et week-end.`,
        category: "Urgence"
      },
      {
        question: "Êtes-vous certifiés et assurés ? Puis-je avoir confiance ?",
        answer: `Bien sûr ! ${companyData.companyName} possède toutes les certifications professionnelles : ${trade === 'Électricien' ? 'Qualifelec, RGE, IRVE' : trade === 'Plombier' ? 'PGN, RGE Quali\'Sol, Qualibat' : 'RGE QualiPAC, Quali\'Sol, Qualigaz'}. Nous sommes couverts par une assurance décennale MAAF qui garantit tous nos travaux pendant 10 ans. Nos techniciens suivent une formation continue pour rester à jour des dernières normes et technologies. Vous pouvez consulter nos certifications et assurances sur demande. Plus de 500 clients nous font confiance avec une note moyenne de 4.9/5.`,
        category: "Confiance"
      },
      {
        question: "Proposez-vous vraiment des devis gratuits ? Y a-t-il des frais cachés ?",
        answer: `Oui, nous établissons systématiquement un devis gratuit et sans engagement avant toute intervention (hors dépannage d'urgence). Notre technicien se déplace gratuitement à votre domicile dans un rayon de 20km autour de ${city} pour évaluer précisément vos besoins. Le devis détaille chaque poste : main d'œuvre, matériaux, déplacements, TVA. Aucun frais caché ! Le prix annoncé est le prix final. En cas d'acceptation, le déplacement pour devis est déduit de la facture finale.`,
        category: "Devis"
      },
      {
        question: `Dans quelles zones intervenez-vous autour de ${city} ?`,
        answer: `Nous intervenons principalement à ${city} et dans toute l'Île-de-France dans un rayon de 50km : Boulogne-Billancourt, Neuilly-sur-Seine, Levallois-Perret, Courbevoie, Nanterre, Versailles, Saint-Denis, Créteil, et de nombreuses autres communes. Pour les interventions d'urgence, nous nous déplaçons jusqu'à 30km. Au-delà, des frais de déplacement peuvent s'appliquer selon la distance. Contactez-nous pour vérifier si nous couvrons votre secteur et connaître les conditions d'intervention.`,
        category: "Zone"
      },
      {
        question: "Combien de temps prennent vos interventions ?",
        answer: `La durée varie selon le type d'intervention : un dépannage simple prend 1-2h, une mise aux normes électriques 2-3 jours, une rénovation de salle de bain 7-10 jours, une installation de pompe à chaleur 2-3 jours. Nous établissons toujours un planning précis lors du devis avec dates de début et fin d'intervention. Nous respectons scrupuleusement les délais annoncés et vous informons en temps réel de l'avancement des travaux.`,
        category: "Délais"
      }
    ]
  }

  private static generateBlogArticles(companyData: any, trade: string, city: string): any[] {
    const articles = {
      'Électricien': [
        {
          title: "Guide Complet : Mise aux Normes Électriques 2024 - Tout ce qu'il faut savoir",
          excerpt: "La norme NF C 15-100 évolue constamment. Découvrez les dernières exigences 2024 pour votre installation électrique : nouvelles obligations, prises, protection différentielle, et coûts.",
          content: `La mise aux normes électriques est cruciale pour la sécurité de votre logement...`,
          category: "Réglementation",
          readTime: "8 min",
          tags: ["norme", "sécurité", "réglementation"]
        },
        {
          title: "Bornes de Recharge Électrique : Installation et Choix du Modèle Optimal",
          excerpt: "Véhicule électrique ? Guide complet pour choisir et installer votre borne de recharge à domicile. Types de bornes, puissance, coûts, aides financières et conseils d'expert.",
          content: "L'électromobilité se développe rapidement...",
          category: "Innovation",
          readTime: "6 min",
          tags: ["borne recharge", "véhicule électrique", "IRVE"]
        }
      ],
      'Plombier': [
        {
          title: "Rénovation Salle de Bain 2024 : Tendances, Coûts et Guide Complet",
          excerpt: "Projet de rénovation salle de bain ? Découvrez les tendances 2024, budgets selon surface, étapes de chantier, et conseils pour éviter les pièges courants.",
          content: "La salle de bain est devenue une pièce à vivre...",
          category: "Rénovation",
          readTime: "10 min",
          tags: ["salle de bain", "rénovation", "tendances"]
        }
      ],
      'Chauffagiste': [
        {
          title: "Pompe à Chaleur Air/Eau 2024 : Guide d'Achat et Installation",
          excerpt: "Tout savoir sur les pompes à chaleur air/eau : fonctionnement, performance, coûts, aides MaPrimeRénov' 2024, et conseils pour bien choisir son installateur RGE.",
          content: "La pompe à chaleur air/eau révolutionne le chauffage...",
          category: "Chauffage",
          readTime: "12 min",
          tags: ["pompe à chaleur", "chauffage", "économies"]
        }
      ]
    }

    return articles[trade] || articles['Électricien']
  }

  private static generateAdditionalSections(companyData: any, trade: string, city: string): any[] {
    return [
      {
        type: "testimonials-detailed",
        title: "Témoignages Clients Détaillés",
        content: this.generateDetailedTestimonials(trade, city)
      },
      {
        type: "process-steps",
        title: "Notre Processus d'Intervention",
        content: this.generateProcessSteps(trade)
      },
      {
        type: "emergency-guide",
        title: "Guide d'Urgence",
        content: this.generateEmergencyGuide(trade)
      },
      {
        type: "maintenance-tips",
        title: "Conseils d'Entretien",
        content: this.generateMaintenanceTips(trade)
      }
    ]
  }

  private static generateDetailedTestimonials(trade: string, city: string): any[] {
    return [
      {
        name: "Marie Dubois",
        location: city,
        project: `Rénovation électrique complète`,
        rating: 5,
        date: "2024-12-15",
        text: `Après 25 ans dans notre maison, nous devions absolument remettre l'électricité aux normes. L'équipe de ${trade.toLowerCase()}s a été fantastique : diagnostic gratuit très détaillé, devis transparent, travaux réalisés en 3 jours avec un respect total de notre domicile. Le nouveau tableau électrique est magnifique et nous avons maintenant toutes les prises modernes nécessaires. Je recommande à 100% !`,
        verified: true,
        photos: ["avant", "après"]
      },
      {
        name: "Jean-Pierre Martin", 
        location: "Boulogne-Billancourt",
        project: "Dépannage urgence week-end",
        rating: 5,
        date: "2024-12-10",
        text: `Panne électrique totale un dimanche soir avec deux enfants en bas âge. J'ai appelé le numéro d'urgence et un technicien est arrivé en 45 minutes ! Problème résolu rapidement, tarif honnête même pour un week-end. Service exceptionnel, je garde précieusement leur numéro.`,
        verified: true,
        emergency: true
      }
    ]
  }

  private static generateProcessSteps(trade: string): any[] {
    const processes = {
      'Électricien': [
        {
          step: 1,
          title: "Diagnostic Gratuit",
          description: "Visite technique gratuite, analyse de vos besoins, état des lieux de l'installation existante",
          duration: "1h"
        },
        {
          step: 2,
          title: "Devis Détaillé",
          description: "Proposition technique et commerciale détaillée, planning d'intervention, garanties",
          duration: "24-48h"
        },
        {
          step: 3,
          title: "Planification",
          description: "Validation du devis, commande matériaux, planification intervention selon vos disponibilités",
          duration: "1-2 semaines"
        },
        {
          step: 4,
          title: "Intervention",
          description: "Réalisation des travaux par équipe qualifiée, respect des délais, nettoyage quotidien",
          duration: "Selon projet"
        },
        {
          step: 5,
          title: "Contrôle Qualité",
          description: "Test et vérification installation, remise certificats conformité, formation utilisation",
          duration: "30 min"
        }
      ],
      'Plombier': [
        {
          step: 1,
          title: "Visite Technique",
          description: "Diagnostic gratuit, prise de mesures, analyse faisabilité, conseil personnalisé",
          duration: "1h"
        },
        {
          step: 2,
          title: "Conception 3D",
          description: "Plan 3D personnalisé, sélection matériaux, devis détaillé avec variantes",
          duration: "2-3 jours"
        },
        {
          step: 3,
          title: "Préparation",
          description: "Commande matériaux, coordination corps d'état, planning détaillé travaux",
          duration: "1-2 semaines"
        },
        {
          step: 4,
          title: "Réalisation",
          description: "Démolition, plomberie, carrelage, finitions, nettoyage quotidien chantier",
          duration: "7-10 jours"
        },
        {
          step: 5,
          title: "Livraison",
          description: "Contrôle final, test étanchéité, remise garanties, formation équipements",
          duration: "1h"
        }
      ]
    }

    return processes[trade] || processes['Électricien']
  }

  private static generateEmergencyGuide(trade: string): string {
    const guides = {
      'Électricien': `
        <div class="emergency-guide">
          <h3>🚨 Que faire en cas de panne électrique ?</h3>
          
          <div class="emergency-step">
            <h4>1. Sécurisez la zone</h4>
            <ul>
              <li>Ne touchez jamais un fil électrique dénudé</li>
              <li>Coupez l'électricité au compteur si possible</li>
              <li>Évacuez si vous sentez une odeur de brûlé</li>
            </ul>
          </div>
          
          <div class="emergency-step">
            <h4>2. Diagnostic rapide</h4>
            <ul>
              <li>Vérifiez si les voisins ont aussi une panne</li>
              <li>Contrôlez l'état du disjoncteur général</li>
              <li>Regardez si un disjoncteur différentiel a sauté</li>
            </ul>
          </div>
          
          <div class="emergency-step">
            <h4>3. Appelez-nous immédiatement</h4>
            <p>Service d'urgence 24h/7j : <strong>${this.phone || '01 23 45 67 89'}</strong></p>
            <p>Intervention garantie sous 1h</p>
          </div>
        </div>
      `,
      'Plombier': `
        <div class="emergency-guide">
          <h3>🚨 Que faire en cas de fuite d'eau ?</h3>
          
          <div class="emergency-step">
            <h4>1. Coupez l'eau immédiatement</h4>
            <ul>
              <li>Fermez le robinet d'arrêt général</li>
              <li>Si introuvable, contactez le syndic</li>
              <li>Coupez l'électricité si l'eau menace des équipements</li>
            </ul>
          </div>
          
          <div class="emergency-step">
            <h4>2. Limitez les dégâts</h4>
            <ul>
              <li>Récupérez l'eau avec bassines et serpillères</li>
              <li>Protégez meubles et appareils électriques</li>
              <li>Prenez photos pour assurance</li>
            </ul>
          </div>
          
          <div class="emergency-step">
            <h4>3. Appelez-nous en urgence</h4>
            <p>Service d'urgence 24h/7j : <strong>${this.phone || '01 23 45 67 89'}</strong></p>
            <p>Intervention garantie sous 1h</p>
          </div>
        </div>
      `
    }

    return guides[trade] || guides['Électricien']
  }

  private static generateMaintenanceTips(trade: string): string {
    const tips = {
      'Électricien': `
        <div class="maintenance-tips">
          <h3>💡 Conseils d'Entretien Électrique</h3>
          
          <div class="tip-section">
            <h4>Contrôles Mensuels</h4>
            <ul>
              <li>Testez les disjoncteurs différentiels (bouton TEST)</li>
              <li>Vérifiez l'état des prises et interrupteurs</li>
              <li>Contrôlez l'éclairage extérieur</li>
            </ul>
          </div>
          
          <div class="tip-section">
            <h4>Contrôles Annuels</h4>
            <ul>
              <li>Faites vérifier le tableau électrique</li>
              <li>Contrôlez la mise à la terre</li>
              <li>Vérifiez l'isolement des circuits</li>
            </ul>
          </div>
          
          <div class="tip-section">
            <h4>Signes d'Alerte</h4>
            <ul>
              <li>Disjoncteur qui saute régulièrement</li>
              <li>Prises qui chauffent</li>
              <li>Éclairage qui vacille</li>
              <li>Odeur de brûlé</li>
            </ul>
          </div>
        </div>
      `,
      'Plombier': `
        <div class="maintenance-tips">
          <h3>🔧 Conseils d'Entretien Plomberie</h3>
          
          <div class="tip-section">
            <h4>Entretien Mensuel</h4>
            <ul>
              <li>Nettoyez les siphons d'évacuation</li>
              <li>Vérifiez l'état des joints robinetterie</li>
              <li>Contrôlez la pression d'eau</li>
            </ul>
          </div>
          
          <div class="tip-section">
            <h4>Entretien Annuel</h4>
            <ul>
              <li>Vidange et détartrage chauffe-eau</li>
              <li>Contrôle chaudière par professionnel</li>
              <li>Vérification étanchéité toiture</li>
            </ul>
          </div>
          
          <div class="tip-section">
            <h4>Prévention Hiver</h4>
            <ul>
              <li>Protégez les canalisations du gel</li>
              <li>Vidangez robinets extérieurs</li>
              <li>Isolez compteur d'eau</li>
            </ul>
          </div>
        </div>
      `
    }

    return tips[trade] || tips['Électricien']
  }
}