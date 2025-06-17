// Test génération de sites avec designs complètement différents (blocs Elementor variés)
const fs = require('fs').promises;
const path = require('path');

// Système de blocs héros (20+ variations)
const HERO_BLOCKS = {
  'hero-split-image': {
    layout: 'split',
    generateHTML: (data) => `
      <section class="hero-split-image" style="min-height: 100vh; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); display: flex; align-items: center; color: var(--white);">
        <div class="container">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
            <div style="padding-right: 2rem;">
              <h1 style="font-size: 3.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem;">${data.companyName}</h1>
              <p style="font-size: 1.5rem; margin-bottom: 1rem; opacity: 0.9;">${data.trade} professionnel à ${data.city}</p>
              <p style="font-size: 1.1rem; margin-bottom: 2rem; opacity: 0.8;">${data.description}</p>
              <div style="display: flex; gap: 1rem;">
                <a href="#services" style="display: inline-block; padding: 1rem 2rem; background: var(--white); color: var(--primary); text-decoration: none; border-radius: 0.5rem; font-weight: 600;">Nos Services</a>
                <a href="contact.html" style="display: inline-block; padding: 1rem 2rem; background: transparent; color: var(--white); border: 2px solid var(--white); text-decoration: none; border-radius: 0.5rem; font-weight: 600;">Devis Gratuit</a>
              </div>
            </div>
            <div style="position: relative;">
              <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop" alt="${data.trade} professionnel" style="width: 100%; border-radius: 2rem; box-shadow: 0 20px 40px rgba(0,0,0,0.15);">
            </div>
          </div>
        </div>
      </section>
    `
  },

  'hero-centered-stats': {
    layout: 'centered',
    generateHTML: (data) => `
      <section class="hero-centered-stats" style="min-height: 100vh; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); display: flex; align-items: center; color: var(--white); text-align: center;">
        <div class="container">
          <div style="max-width: 800px; margin: 0 auto;">
            <h1 style="font-size: 4rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem;">${data.companyName}</h1>
            <p style="font-size: 1.5rem; margin-bottom: 1rem; opacity: 0.9;">${data.trade} d'excellence à ${data.city}</p>
            <p style="font-size: 1.2rem; margin-bottom: 3rem; opacity: 0.8;">${data.description}</p>
            
            <!-- Stats animées -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; margin: 4rem 0;">
              <div>
                <div style="font-size: 3.5rem; font-weight: 800; color: var(--white);">15+</div>
                <div style="opacity: 0.8; margin-top: 0.5rem;">Années d'expérience</div>
              </div>
              <div>
                <div style="font-size: 3.5rem; font-weight: 800; color: var(--white);">500+</div>
                <div style="opacity: 0.8; margin-top: 0.5rem;">Clients satisfaits</div>
              </div>
              <div>
                <div style="font-size: 3.5rem; font-weight: 800; color: var(--white);">24h/7j</div>
                <div style="opacity: 0.8; margin-top: 0.5rem;">Service d'urgence</div>
              </div>
            </div>
            
            <div style="margin-top: 3rem;">
              <a href="contact.html" style="display: inline-block; padding: 1.25rem 3rem; background: var(--white); color: var(--primary); text-decoration: none; border-radius: 3rem; font-weight: 600; font-size: 1.1rem; margin-right: 1rem;">📞 Appelez maintenant</a>
              <a href="#services" style="display: inline-block; padding: 1.25rem 3rem; background: transparent; color: var(--white); border: 2px solid var(--white); text-decoration: none; border-radius: 3rem; font-weight: 600; font-size: 1.1rem;">🔧 Nos services</a>
            </div>
          </div>
        </div>
      </section>
    `
  },

  'hero-diagonal-creative': {
    layout: 'diagonal',
    generateHTML: (data) => `
      <section class="hero-diagonal-creative" style="min-height: 100vh; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); position: relative; overflow: hidden; display: flex; align-items: center;">
        <!-- Formes géométriques -->
        <div style="position: absolute; top: -50%; right: -20%; width: 80%; height: 200%; background: rgba(255,255,255,0.1); transform: rotate(15deg); border-radius: 2rem;"></div>
        <div style="position: absolute; bottom: -30%; left: -10%; width: 60%; height: 120%; background: rgba(255,255,255,0.05); transform: rotate(-10deg); border-radius: 2rem;"></div>
        
        <div class="container" style="position: relative; z-index: 2;">
          <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 4rem; align-items: center; color: var(--white);">
            <div>
              <div style="background: rgba(255,255,255,0.1); display: inline-block; padding: 0.5rem 1.5rem; border-radius: 2rem; margin-bottom: 1rem; font-size: 0.9rem; font-weight: 600;">⚡ ${data.trade} Expert</div>
              <h1 style="font-size: 3.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem;">${data.companyName}</h1>
              <p style="font-size: 1.3rem; margin-bottom: 2rem; opacity: 0.9;">Solutions ${data.trade.toLowerCase()} innovantes à ${data.city}</p>
              
              <!-- Features en cartes -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 2rem 0;">
                <div style="background: rgba(255,255,255,0.15); padding: 1.5rem; border-radius: 1rem; backdrop-filter: blur(10px);">
                  <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🚀</div>
                  <div style="font-weight: 600;">Intervention rapide</div>
                  <div style="font-size: 0.9rem; opacity: 0.8;">Sous 1h en urgence</div>
                </div>
                <div style="background: rgba(255,255,255,0.15); padding: 1.5rem; border-radius: 1rem; backdrop-filter: blur(10px);">
                  <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🎯</div>
                  <div style="font-weight: 600;">Devis gratuit</div>
                  <div style="font-size: 0.9rem; opacity: 0.8;">Sans engagement</div>
                </div>
              </div>
              
              <a href="contact.html" style="display: inline-block; padding: 1rem 2.5rem; background: var(--white); color: var(--primary); text-decoration: none; border-radius: 0.75rem; font-weight: 600; font-size: 1.1rem;">Demander un devis</a>
            </div>
            
            <div style="text-align: center;">
              <div style="background: rgba(255,255,255,0.1); padding: 3rem; border-radius: 2rem; backdrop-filter: blur(10px);">
                <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&h=300&fit=crop" alt="${data.trade}" style="width: 100%; border-radius: 1rem; margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem;">Expert certifié</h3>
                <p style="opacity: 0.8;">Plus de 10 ans d'expérience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  },

  'hero-timeline-process': {
    layout: 'timeline',
    generateHTML: (data) => `
      <section class="hero-timeline-process" style="min-height: 100vh; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); display: flex; align-items: center; color: var(--white);">
        <div class="container">
          <div style="text-align: center; margin-bottom: 4rem;">
            <h1 style="font-size: 3.5rem; font-weight: 800; margin-bottom: 1rem;">${data.companyName}</h1>
            <p style="font-size: 1.5rem; opacity: 0.9; margin-bottom: 0.5rem;">${data.trade} professionnel à ${data.city}</p>
            <p style="font-size: 1.1rem; opacity: 0.8; max-width: 600px; margin: 0 auto;">${data.description}</p>
          </div>
          
          <!-- Timeline horizontale -->
          <div style="position: relative; margin: 4rem 0;">
            <div style="position: absolute; top: 50%; left: 10%; right: 10%; height: 4px; background: rgba(255,255,255,0.3); transform: translateY(-50%);"></div>
            
            <div style="display: flex; justify-content: space-between; padding: 0 10%; position: relative; z-index: 2;">
              <div style="background: rgba(255,255,255,0.15); padding: 2rem; border-radius: 1rem; width: 200px; text-align: center; backdrop-filter: blur(10px); position: relative;">
                <div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); width: 40px; height: 40px; background: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary); font-weight: bold;">1</div>
                <div style="font-size: 2rem; margin-bottom: 1rem;">📞</div>
                <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Contact</h3>
                <p style="font-size: 0.9rem; opacity: 0.8;">Appelez-nous ou remplissez le formulaire</p>
              </div>
              
              <div style="background: rgba(255,255,255,0.15); padding: 2rem; border-radius: 1rem; width: 200px; text-align: center; backdrop-filter: blur(10px); position: relative;">
                <div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); width: 40px; height: 40px; background: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary); font-weight: bold;">2</div>
                <div style="font-size: 2rem; margin-bottom: 1rem;">📋</div>
                <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Devis</h3>
                <p style="font-size: 0.9rem; opacity: 0.8;">Évaluation gratuite et devis détaillé</p>
              </div>
              
              <div style="background: rgba(255,255,255,0.15); padding: 2rem; border-radius: 1rem; width: 200px; text-align: center; backdrop-filter: blur(10px); position: relative;">
                <div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); width: 40px; height: 40px; background: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary); font-weight: bold;">3</div>
                <div style="font-size: 2rem; margin-bottom: 1rem;">🔧</div>
                <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Intervention</h3>
                <p style="font-size: 0.9rem; opacity: 0.8;">Réalisation professionnelle</p>
              </div>
              
              <div style="background: rgba(255,255,255,0.15); padding: 2rem; border-radius: 1rem; width: 200px; text-align: center; backdrop-filter: blur(10px); position: relative;">
                <div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); width: 40px; height: 40px; background: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary); font-weight: bold;">4</div>
                <div style="font-size: 2rem; margin-bottom: 1rem;">✅</div>
                <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Garantie</h3>
                <p style="font-size: 0.9rem; opacity: 0.8;">Suivi et service après-vente</p>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 4rem;">
            <a href="contact.html" style="display: inline-block; padding: 1.25rem 3rem; background: var(--white); color: var(--primary); text-decoration: none; border-radius: 3rem; font-weight: 600; font-size: 1.1rem;">🚀 Commencer maintenant</a>
          </div>
        </div>
      </section>
    `
  },

  'hero-floating-cards': {
    layout: 'floating',
    generateHTML: (data) => `
      <section class="hero-floating-cards" style="min-height: 100vh; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); display: flex; align-items: center; color: var(--white); position: relative; overflow: hidden;">
        <!-- Éléments flottants -->
        <div style="position: absolute; top: 20%; right: 10%; background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 1rem; backdrop-filter: blur(10px); animation: float 6s ease-in-out infinite;">
          <div style="font-size: 1.5rem;">⚡</div>
          <div style="font-size: 0.9rem; font-weight: 600;">Installation rapide</div>
        </div>
        <div style="position: absolute; bottom: 30%; left: 5%; background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 1rem; backdrop-filter: blur(10px); animation: float 8s ease-in-out infinite reverse;">
          <div style="font-size: 1.5rem;">🎯</div>
          <div style="font-size: 0.9rem; font-weight: 600;">Devis gratuit</div>
        </div>
        <div style="position: absolute; top: 60%; right: 30%; background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 1rem; backdrop-filter: blur(10px); animation: float 7s ease-in-out infinite;">
          <div style="font-size: 1.5rem;">🏆</div>
          <div style="font-size: 0.9rem; font-weight: 600;">Expert certifié</div>
        </div>
        
        <div class="container" style="text-align: center; position: relative; z-index: 2;">
          <div style="max-width: 700px; margin: 0 auto;">
            <div style="background: rgba(255,255,255,0.1); display: inline-block; padding: 0.75rem 2rem; border-radius: 3rem; margin-bottom: 2rem; font-weight: 600;">
              🌟 ${data.trade} d'exception
            </div>
            <h1 style="font-size: 4rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem;">${data.companyName}</h1>
            <p style="font-size: 1.5rem; margin-bottom: 1rem; opacity: 0.9;">Innovation et excellence à ${data.city}</p>
            <p style="font-size: 1.2rem; margin-bottom: 3rem; opacity: 0.8; line-height: 1.6;">${data.description}</p>
            
            <!-- CTA buttons -->
            <div style="display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap;">
              <a href="tel:${data.phone}" style="display: inline-block; padding: 1.25rem 2.5rem; background: var(--white); color: var(--primary); text-decoration: none; border-radius: 3rem; font-weight: 600; font-size: 1.1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                📞 ${data.phone}
              </a>
              <a href="contact.html" style="display: inline-block; padding: 1.25rem 2.5rem; background: transparent; color: var(--white); border: 2px solid var(--white); text-decoration: none; border-radius: 3rem; font-weight: 600; font-size: 1.1rem;">
                📧 Demander un devis
              </a>
            </div>
          </div>
        </div>
        
        <style>
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
        </style>
      </section>
    `
  }
};

// Système de blocs services (15+ variations)
const SERVICE_BLOCKS = {
  'services-masonry': {
    layout: 'masonry',
    generateHTML: (data) => `
      <section class="services-masonry" style="padding: 6rem 0; background: var(--gray-50);">
        <div class="container">
          <div style="text-align: center; margin-bottom: 4rem;">
            <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--primary);">Nos Services ${data.trade}</h2>
            <p style="font-size: 1.2rem; color: var(--gray-600); max-width: 600px; margin: 0 auto;">Solutions professionnelles adaptées à tous vos besoins</p>
          </div>
          
          <div style="columns: 3; column-gap: 2rem; break-inside: avoid;">
            ${data.services?.map((service, index) => `
              <div style="break-inside: avoid; margin-bottom: 2rem; background: var(--white); padding: 2.5rem; border-radius: 1.5rem; box-shadow: 0 5px 15px rgba(0,0,0,0.08); transition: transform 0.3s ease; ${index % 2 === 0 ? 'margin-top: 2rem;' : ''}">
                <div style="font-size: 3rem; margin-bottom: 1.5rem;">${service.icon}</div>
                <h3 style="font-size: 1.4rem; font-weight: 600; margin-bottom: 1rem; color: var(--primary);">${service.name}</h3>
                <p style="color: var(--gray-600); margin-bottom: 1.5rem; line-height: 1.6;">${service.description}</p>
                <div style="background: var(--gray-50); padding: 1rem; border-radius: 0.75rem; margin-bottom: 1.5rem;">
                  <div style="font-weight: 600; color: var(--primary); margin-bottom: 0.5rem;">✨ Inclus:</div>
                  ${service.features ? `<ul style="list-style: none; padding: 0; margin: 0;">
                    ${service.features.map(feature => `<li style="padding: 0.25rem 0; color: var(--gray-600); position: relative; padding-left: 1.5rem;"><span style="position: absolute; left: 0; color: var(--primary);">•</span> ${feature}</li>`).join('')}
                  </ul>` : ''}
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                  <div style="font-size: 1.2rem; font-weight: 700; color: var(--primary);">${service.price}</div>
                </div>
                <div style="display: flex; gap: 0.75rem;">
                  <a href="service-${service.slug}.html" style="flex: 1; text-align: center; padding: 0.75rem; background: var(--primary); color: var(--white); text-decoration: none; border-radius: 0.5rem; font-weight: 600; font-size: 0.9rem;">Détails</a>
                  <a href="contact.html" style="flex: 1; text-align: center; padding: 0.75rem; background: transparent; color: var(--primary); border: 2px solid var(--primary); text-decoration: none; border-radius: 0.5rem; font-weight: 600; font-size: 0.9rem;">Devis</a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <style>
          @media (max-width: 768px) {
            .services-masonry [style*="columns: 3"] {
              columns: 1 !important;
            }
          }
        </style>
      </section>
    `
  },

  'services-tabs-interactive': {
    layout: 'tabs',
    generateHTML: (data) => `
      <section class="services-tabs-interactive" style="padding: 6rem 0; background: var(--white);">
        <div class="container">
          <div style="text-align: center; margin-bottom: 4rem;">
            <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--primary);">Services ${data.trade} Expert</h2>
            <p style="font-size: 1.2rem; color: var(--gray-600);">Choisissez votre domaine d'intervention</p>
          </div>
          
          <!-- Onglets -->
          <div style="display: flex; justify-content: center; margin-bottom: 3rem; flex-wrap: wrap; gap: 1rem;">
            ${data.services?.map((service, index) => `
              <button onclick="showTab('${service.slug}')" class="tab-button" id="tab-${service.slug}" style="padding: 1rem 1.5rem; background: ${index === 0 ? 'var(--primary)' : 'transparent'}; border: 2px solid var(--primary); color: ${index === 0 ? 'var(--white)' : 'var(--primary)'}; border-radius: 2rem; cursor: pointer; transition: all 0.3s ease; font-weight: 600;">
                ${service.icon} ${service.name}
              </button>
            `).join('')}
          </div>
          
          <!-- Contenu des onglets -->
          ${data.services?.map((service, index) => `
            <div id="content-${service.slug}" class="tab-content" style="display: ${index === 0 ? 'block' : 'none'}; background: var(--gray-50); padding: 4rem; border-radius: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
                <div>
                  <h3 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1.5rem; color: var(--primary);">${service.name}</h3>
                  <p style="font-size: 1.2rem; color: var(--gray-700); margin-bottom: 2rem; line-height: 1.6;">${service.description}</p>
                  
                  ${service.features ? `
                    <div style="background: var(--white); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem;">
                      <h4 style="font-weight: 600; color: var(--primary); margin-bottom: 1rem;">🎯 Points forts:</h4>
                      <ul style="list-style: none; padding: 0; margin: 0;">
                        ${service.features.map(feature => `<li style="padding: 0.5rem 0; color: var(--gray-700); position: relative; padding-left: 2rem;"><span style="position: absolute; left: 0; color: var(--primary); font-weight: bold;">✓</span> ${feature}</li>`).join('')}
                      </ul>
                    </div>
                  ` : ''}
                  
                  <div style="display: flex; align-items: center; gap: 2rem; margin-bottom: 2rem;">
                    <div style="background: var(--primary); color: var(--white); padding: 1rem 2rem; border-radius: 3rem; font-size: 1.2rem; font-weight: 700;">
                      💰 ${service.price}
                    </div>
                  </div>
                  
                  <div style="display: flex; gap: 1rem;">
                    <a href="contact.html" style="display: inline-block; padding: 1.25rem 2rem; background: var(--primary); color: var(--white); text-decoration: none; border-radius: 0.75rem; font-weight: 600;">📧 Demander un devis</a>
                    <a href="tel:${data.phone}" style="display: inline-block; padding: 1.25rem 2rem; background: transparent; color: var(--primary); border: 2px solid var(--primary); text-decoration: none; border-radius: 0.75rem; font-weight: 600;">📞 Appeler</a>
                  </div>
                </div>
                
                <div style="text-align: center;">
                  <div style="background: linear-gradient(135deg, var(--primary), var(--secondary)); padding: 3rem; border-radius: 2rem; color: var(--white);">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">${service.icon}</div>
                    <h4 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Service premium</h4>
                    <p style="opacity: 0.9;">Intervention professionnelle garantie</p>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <script>
          function showTab(serviceSlug) {
            // Masquer tous les contenus
            document.querySelectorAll('.tab-content').forEach(content => {
              content.style.display = 'none';
            });
            
            // Désactiver tous les onglets
            document.querySelectorAll('.tab-button').forEach(button => {
              button.style.background = 'transparent';
              button.style.color = 'var(--primary)';
            });
            
            // Afficher le contenu sélectionné
            document.getElementById('content-' + serviceSlug).style.display = 'block';
            
            // Activer l'onglet sélectionné
            const activeTab = document.getElementById('tab-' + serviceSlug);
            activeTab.style.background = 'var(--primary)';
            activeTab.style.color = 'var(--white)';
          }
        </script>
        
        <style>
          @media (max-width: 768px) {
            .services-tabs-interactive [style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        </style>
      </section>
    `
  },

  'services-hexagon-creative': {
    layout: 'hexagon',
    generateHTML: (data) => `
      <section class="services-hexagon-creative" style="padding: 6rem 0; background: var(--gray-900); color: var(--white); position: relative; overflow: hidden;">
        <!-- Motif de fond -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.1; background-image: repeating-linear-gradient(60deg, transparent, transparent 35px, var(--primary) 35px, var(--primary) 70px); z-index: 1;"></div>
        
        <div class="container" style="position: relative; z-index: 2;">
          <div style="text-align: center; margin-bottom: 4rem;">
            <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;">Expertise ${data.trade}</h2>
            <p style="font-size: 1.2rem; opacity: 0.8; max-width: 600px; margin: 0 auto;">Solutions innovantes et technologies de pointe</p>
          </div>
          
          <!-- Grille hexagonale -->
          <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; max-width: 900px; margin: 0 auto;">
            ${data.services?.map((service, index) => `
              <div style="width: 250px; height: 216px; position: relative; margin: 108px 0;">
                <!-- Hexagone -->
                <div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--primary), var(--secondary)); position: relative; transform: rotate(30deg); border-radius: 1rem; transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='rotate(30deg) scale(1.05)'" onmouseout="this.style.transform='rotate(30deg) scale(1)'">
                  <!-- Contenu de l'hexagone -->
                  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); text-align: center; color: var(--white); width: 80%;">
                    <div style="font-size: 2.5rem; margin-bottom: 1rem;">${service.icon}</div>
                    <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; line-height: 1.2;">${service.name}</h3>
                    <p style="font-size: 0.8rem; opacity: 0.9; line-height: 1.3;">${service.price}</p>
                  </div>
                </div>
                
                <!-- Tooltip au hover -->
                <div style="position: absolute; top: -80px; left: 50%; transform: translateX(-50%); background: var(--white); color: var(--gray-800); padding: 1rem; border-radius: 0.5rem; box-shadow: 0 5px 15px rgba(0,0,0,0.2); opacity: 0; pointer-events: none; transition: opacity 0.3s ease; width: 200px; text-align: center;" onmouseenter="this.style.opacity='1'" onmouseleave="this.style.opacity='0'">
                  <h4 style="font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem;">${service.name}</h4>
                  <p style="font-size: 0.8rem; color: var(--gray-600);">${service.description}</p>
                  <a href="service-${service.slug}.html" style="display: inline-block; margin-top: 0.5rem; padding: 0.5rem 1rem; background: var(--primary); color: var(--white); text-decoration: none; border-radius: 0.25rem; font-size: 0.8rem;">Voir détails</a>
                </div>
              </div>
            `).join('')}
          </div>
          
          <div style="text-align: center; margin-top: 4rem;">
            <p style="font-size: 1.1rem; margin-bottom: 2rem; opacity: 0.8;">Besoin d'un service personnalisé ?</p>
            <a href="contact.html" style="display: inline-block; padding: 1.25rem 3rem; background: var(--primary); color: var(--white); text-decoration: none; border-radius: 3rem; font-weight: 600; font-size: 1.1rem;">💬 Contactez-nous</a>
          </div>
        </div>
        
        <style>
          @media (max-width: 768px) {
            .services-hexagon-creative [style*="width: 250px"] {
              width: 200px !important;
              height: 173px !important;
              margin: 86px 0 !important;
            }
          }
        </style>
      </section>
    `
  },

  'services-accordion': {
    layout: 'accordion',
    generateHTML: (data) => `
      <section class="services-accordion" style="padding: 6rem 0; background: var(--gray-50);">
        <div class="container">
          <div style="text-align: center; margin-bottom: 4rem;">
            <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--primary);">Services ${data.trade} Détaillés</h2>
            <p style="font-size: 1.2rem; color: var(--gray-600);">Cliquez pour découvrir nos prestations</p>
          </div>
          
          <div style="max-width: 900px; margin: 0 auto;">
            ${data.services?.map((service, index) => `
              <div style="border: 1px solid var(--gray-200); margin-bottom: 1rem; border-radius: 1rem; overflow: hidden; background: var(--white); box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <!-- En-tête accordéon -->
                <div onclick="toggleAccordion('${service.slug}')" style="padding: 2rem; background: ${index === 0 ? 'var(--primary)' : 'var(--gray-50)'}; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: all 0.3s ease;" onmouseover="this.style.background='var(--primary)'; this.style.color='var(--white)'" onmouseout="this.style.background='${index === 0 ? 'var(--primary)' : 'var(--gray-50)'}'; this.style.color='${index === 0 ? 'var(--white)' : 'var(--gray-800)'}'">
                  <div style="display: flex; align-items: center; gap: 1.5rem;">
                    <div style="font-size: 2rem;">${service.icon}</div>
                    <div>
                      <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem; color: ${index === 0 ? 'var(--white)' : 'var(--primary)'};">${service.name}</h3>
                      <p style="color: ${index === 0 ? 'rgba(255,255,255,0.8)' : 'var(--gray-600)'}; margin: 0; font-weight: 600;">${service.price}</p>
                    </div>
                  </div>
                  <div id="arrow-${service.slug}" style="font-size: 1.5rem; transform: ${index === 0 ? 'rotate(180deg)' : 'rotate(0deg)'}; transition: transform 0.3s ease;">▼</div>
                </div>
                
                <!-- Contenu accordéon -->
                <div id="content-${service.slug}" style="display: ${index === 0 ? 'block' : 'none'}; padding: 0 2rem 2rem; background: var(--white);">
                  <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; align-items: start;">
                    <div>
                      <p style="font-size: 1.1rem; color: var(--gray-700); margin-bottom: 2rem; line-height: 1.6;">${service.description}</p>
                      
                      ${service.features ? `
                        <div style="background: var(--gray-50); padding: 2rem; border-radius: 1rem;">
                          <h4 style="font-weight: 600; color: var(--primary); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <span>✨</span> Ce qui est inclus
                          </h4>
                          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                            ${service.features.map(feature => `
                              <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0;">
                                <div style="width: 20px; height: 20px; background: var(--primary); color: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: bold; flex-shrink: 0;">✓</div>
                                <span style="color: var(--gray-700); font-size: 0.95rem;">${feature}</span>
                              </div>
                            `).join('')}
                          </div>
                        </div>
                      ` : ''}
                    </div>
                    
                    <div style="text-align: center;">
                      <div style="background: linear-gradient(135deg, var(--primary), var(--secondary)); padding: 2rem; border-radius: 1rem; color: var(--white); margin-bottom: 1.5rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">${service.icon}</div>
                        <h4 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Service professionnel</h4>
                        <p style="opacity: 0.9; font-size: 0.9rem;">Garantie et expertise</p>
                      </div>
                      
                      <div style="display: grid; gap: 0.75rem;">
                        <a href="service-${service.slug}.html" style="padding: 0.75rem 1rem; background: var(--primary); color: var(--white); text-decoration: none; border-radius: 0.5rem; font-weight: 600; font-size: 0.9rem;">📄 Voir détails</a>
                        <a href="contact.html" style="padding: 0.75rem 1rem; background: transparent; color: var(--primary); border: 2px solid var(--primary); text-decoration: none; border-radius: 0.5rem; font-weight: 600; font-size: 0.9rem;">📧 Devis gratuit</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <script>
          function toggleAccordion(serviceSlug) {
            const content = document.getElementById('content-' + serviceSlug);
            const arrow = document.getElementById('arrow-' + serviceSlug);
            
            if (content.style.display === 'none') {
              // Fermer tous les autres
              document.querySelectorAll('[id^="content-"]').forEach(el => {
                if (el.id !== 'content-' + serviceSlug) {
                  el.style.display = 'none';
                  const otherArrow = document.getElementById(el.id.replace('content-', 'arrow-'));
                  if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
                }
              });
              
              content.style.display = 'block';
              arrow.style.transform = 'rotate(180deg)';
            } else {
              content.style.display = 'none';
              arrow.style.transform = 'rotate(0deg)';
            }
          }
        </script>
        
        <style>
          @media (max-width: 768px) {
            .services-accordion [style*="grid-template-columns: 2fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
            .services-accordion [style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        </style>
      </section>
    `
  }
};

// Système de blocs contact (10+ variations)
const CONTACT_BLOCKS = {
  'contact-floating-form': {
    layout: 'floating',
    generateHTML: (data) => `
      <section class="contact-floating-form" style="padding: 6rem 0; background: linear-gradient(135deg, var(--gray-900) 0%, var(--primary) 100%); color: var(--white); position: relative;">
        <div class="container">
          <div style="text-align: center; margin-bottom: 4rem;">
            <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;">Contactez ${data.companyName}</h2>
            <p style="font-size: 1.2rem; opacity: 0.9;">Votre projet nous intéresse</p>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin: 4rem 0;">
            <!-- Carte téléphone -->
            <div style="background: rgba(255,255,255,0.1); padding: 3rem; border-radius: 2rem; text-align: center; backdrop-filter: blur(10px); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-10px) rotate(2deg)'" onmouseout="this.style.transform='translateY(0) rotate(0deg)'">
              <div style="font-size: 3rem; margin-bottom: 1.5rem;">📞</div>
              <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Appelez-nous</h3>
              <a href="tel:${data.phone}" style="color: var(--white); font-size: 1.2rem; font-weight: 600; text-decoration: none;">${data.phone}</a>
              <p style="opacity: 0.8; margin-top: 0.5rem; font-size: 0.9rem;">Urgences 24h/7j</p>
            </div>
            
            <!-- Carte email -->
            <div style="background: rgba(255,255,255,0.1); padding: 3rem; border-radius: 2rem; text-align: center; backdrop-filter: blur(10px); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-10px) rotate(-2deg)'" onmouseout="this.style.transform='translateY(0) rotate(0deg)'">
              <div style="font-size: 3rem; margin-bottom: 1.5rem;">✉️</div>
              <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Écrivez-nous</h3>
              <a href="mailto:${data.email}" style="color: var(--white); font-size: 1.1rem; font-weight: 600; text-decoration: none; word-break: break-all;">${data.email}</a>
              <p style="opacity: 0.8; margin-top: 0.5rem; font-size: 0.9rem;">Réponse sous 24h</p>
            </div>
            
            <!-- Carte localisation -->
            <div style="background: rgba(255,255,255,0.1); padding: 3rem; border-radius: 2rem; text-align: center; backdrop-filter: blur(10px); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-10px) rotate(1deg)'" onmouseout="this.style.transform='translateY(0) rotate(0deg)'">
              <div style="font-size: 3rem; margin-bottom: 1.5rem;">📍</div>
              <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Rendez-vous</h3>
              <p style="font-weight: 600; margin-bottom: 0.5rem;">${data.address}</p>
              <p style="opacity: 0.8; font-size: 0.9rem;">${data.city}</p>
            </div>
          </div>
          
          <!-- Formulaire central flottant -->
          <div style="max-width: 600px; margin: 4rem auto 0; background: var(--white); padding: 3rem; border-radius: 3rem; box-shadow: 0 20px 60px rgba(0,0,0,0.3); transform: translateY(-50px);">
            <h3 style="color: var(--primary); font-size: 2rem; font-weight: 700; text-align: center; margin-bottom: 2rem;">Demande de devis gratuit</h3>
            
            <form style="display: grid; gap: 1.5rem;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <input type="text" placeholder="Votre nom" style="padding: 1rem; border: 2px solid var(--gray-200); border-radius: 1rem; font-size: 1rem; transition: border-color 0.3s ease;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--gray-200)'">
                <input type="email" placeholder="Votre email" style="padding: 1rem; border: 2px solid var(--gray-200); border-radius: 1rem; font-size: 1rem; transition: border-color 0.3s ease;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--gray-200)'">
              </div>
              <input type="tel" placeholder="Votre téléphone" style="padding: 1rem; border: 2px solid var(--gray-200); border-radius: 1rem; font-size: 1rem; transition: border-color 0.3s ease;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--gray-200)'">
              <select style="padding: 1rem; border: 2px solid var(--gray-200); border-radius: 1rem; font-size: 1rem; background: var(--white); cursor: pointer;">
                <option value="">Choisissez un service</option>
                ${data.services?.map(service => `<option value="${service.slug}">${service.name}</option>`).join('')}
              </select>
              <textarea placeholder="Décrivez votre projet en détail..." rows="4" style="padding: 1rem; border: 2px solid var(--gray-200); border-radius: 1rem; font-size: 1rem; resize: vertical; transition: border-color 0.3s ease;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--gray-200)'"></textarea>
              <button type="submit" style="padding: 1.5rem; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); color: var(--white); border: none; border-radius: 1rem; font-size: 1.2rem; font-weight: 600; cursor: pointer; transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                🚀 Envoyer ma demande
              </button>
            </form>
          </div>
        </div>
        
        <style>
          @media (max-width: 768px) {
            .contact-floating-form [style*="grid-template-columns: repeat(3, 1fr)"] {
              grid-template-columns: 1fr !important;
            }
            .contact-floating-form [style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        </style>
      </section>
    `
  },

  'contact-split-modern': {
    layout: 'split',
    generateHTML: (data) => `
      <section class="contact-split-modern" style="padding: 6rem 0; background: var(--gray-50);">
        <div class="container">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start;">
            <!-- Informations contact -->
            <div style="background: var(--gray-900); color: var(--white); padding: 4rem; border-radius: 3rem; position: relative; overflow: hidden;">
              <!-- Motif décoratif -->
              <div style="position: absolute; top: -50%; right: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 20px 20px; opacity: 0.3;"></div>
              
              <div style="position: relative; z-index: 2;">
                <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;">Parlons de votre projet</h2>
                <p style="font-size: 1.2rem; opacity: 0.9; margin-bottom: 3rem; line-height: 1.6;">Notre équipe d'experts ${data.trade.toLowerCase()} est à votre écoute pour vous accompagner dans la réalisation de vos projets.</p>
                
                <!-- Méthodes de contact -->
                <div style="display: grid; gap: 2rem;">
                  <div style="display: flex; gap: 1.5rem; align-items: center; padding: 1.5rem; background: rgba(255,255,255,0.1); border-radius: 1rem; backdrop-filter: blur(10px);">
                    <div style="width: 60px; height: 60px; background: var(--primary); color: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">📞</div>
                    <div>
                      <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Téléphone</h3>
                      <a href="tel:${data.phone}" style="color: var(--white); font-size: 1.1rem; font-weight: 600; text-decoration: none;">${data.phone}</a>
                      <p style="opacity: 0.8; font-size: 0.9rem; margin-top: 0.25rem;">Lundi-Vendredi 8h-19h • Urgences 24h/7j</p>
                    </div>
                  </div>
                  
                  <div style="display: flex; gap: 1.5rem; align-items: center; padding: 1.5rem; background: rgba(255,255,255,0.1); border-radius: 1rem; backdrop-filter: blur(10px);">
                    <div style="width: 60px; height: 60px; background: var(--primary); color: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">✉️</div>
                    <div>
                      <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Email</h3>
                      <a href="mailto:${data.email}" style="color: var(--white); font-size: 1rem; font-weight: 600; text-decoration: none; word-break: break-all;">${data.email}</a>
                      <p style="opacity: 0.8; font-size: 0.9rem; margin-top: 0.25rem;">Réponse garantie sous 24h</p>
                    </div>
                  </div>
                  
                  <div style="display: flex; gap: 1.5rem; align-items: center; padding: 1.5rem; background: rgba(255,255,255,0.1); border-radius: 1rem; backdrop-filter: blur(10px);">
                    <div style="width: 60px; height: 60px; background: var(--primary); color: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">📍</div>
                    <div>
                      <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Adresse</h3>
                      <p style="font-weight: 600; margin-bottom: 0.25rem;">${data.address}</p>
                      <p style="opacity: 0.8; font-size: 0.9rem;">${data.city}</p>
                    </div>
                  </div>
                  
                  <div style="display: flex; gap: 1.5rem; align-items: center; padding: 1.5rem; background: rgba(255,255,255,0.1); border-radius: 1rem; backdrop-filter: blur(10px);">
                    <div style="width: 60px; height: 60px; background: var(--primary); color: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">🏙️</div>
                    <div>
                      <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Zone d'intervention</h3>
                      <p style="font-weight: 600; margin-bottom: 0.25rem;">${data.cities?.length || 20} villes</p>
                      <p style="opacity: 0.8; font-size: 0.9rem;">Déplacement gratuit pour devis</p>
                    </div>
                  </div>
                </div>
                
                <!-- Call-to-action d'urgence -->
                <div style="margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, #f59e0b, #f97316); border-radius: 1rem; text-align: center;">
                  <h4 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem;">🚨 Urgence 24h/7j</h4>
                  <p style="opacity: 0.9; margin-bottom: 1rem;">Panne ou problème urgent ? Nous intervenons immédiatement !</p>
                  <a href="tel:${data.phone}" style="display: inline-block; padding: 1rem 2rem; background: var(--white); color: #f59e0b; text-decoration: none; border-radius: 0.5rem; font-weight: 600;">Appel d'urgence</a>
                </div>
              </div>
            </div>
            
            <!-- Formulaire -->
            <div style="background: var(--white); padding: 4rem; border-radius: 3rem; box-shadow: 0 20px 60px rgba(0,0,0,0.1);">
              <h2 style="color: var(--primary); font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;">Demande de devis</h2>
              <p style="color: var(--gray-600); font-size: 1.1rem; margin-bottom: 3rem; line-height: 1.6;">Remplissez ce formulaire détaillé pour recevoir un devis personnalisé adapté à vos besoins.</p>
              
              <form style="display: grid; gap: 2rem;">
                <div>
                  <label style="display: block; font-weight: 600; color: var(--gray-700); margin-bottom: 0.5rem;">Nom complet *</label>
                  <input type="text" placeholder="Votre nom et prénom" style="width: 100%; padding: 1.25rem; border: 2px solid var(--gray-200); border-radius: 1rem; font-size: 1rem; transition: all 0.3s ease;" onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(30, 64, 175, 0.1)'" onblur="this.style.borderColor='var(--gray-200)'; this.style.boxShadow='none'">
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <div>
                    <label style="display: block; font-weight: 600; color: var(--gray-700); margin-bottom: 0.5rem;">Email *</label>
                    <input type="email" placeholder="votre@email.fr" style="width: 100%; padding: 1.25rem; border: 2px solid var(--gray-200); border-radius: 1rem; font-size: 1rem; transition: all 0.3s ease;" onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(30, 64, 175, 0.1)'" onblur="this.style.borderColor='var(--gray-200)'; this.style.boxShadow='none'">
                  </div>
                  <div>
                    <label style="display: block; font-weight: 600; color: var(--gray-700); margin-bottom: 0.5rem;">Téléphone *</label>
                    <input type="tel" placeholder="01 23 45 67 89" style="width: 100%; padding: 1.25rem; border: 2px solid var(--gray-200); border-radius: 1rem; font-size: 1rem; transition: all 0.3s ease;" onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(30, 64, 175, 0.1)'" onblur="this.style.borderColor='var(--gray-200)'; this.style.boxShadow='none'">
                  </div>
                </div>
                
                <div>
                  <label style="display: block; font-weight: 600; color: var(--gray-700); margin-bottom: 0.5rem;">Type de service</label>
                  <select style="width: 100%; padding: 1.25rem; border: 2px solid var(--gray-200); border-radius: 1rem; font-size: 1rem; background: var(--white); cursor: pointer;">
                    <option value="">Choisissez un service</option>
                    ${data.services?.map(service => `<option value="${service.slug}">${service.name}</option>`).join('')}
                  </select>
                </div>
                
                <div>
                  <label style="display: block; font-weight: 600; color: var(--gray-700); margin-bottom: 0.5rem;">Urgence</label>
                  <select style="width: 100%; padding: 1.25rem; border: 2px solid var(--gray-200); border-radius: 1rem; font-size: 1rem; background: var(--white); cursor: pointer;">
                    <option value="normal">Intervention normale</option>
                    <option value="urgent">Urgent (sous 24h)</option>
                    <option value="emergency">Urgence (immédiat)</option>
                  </select>
                </div>
                
                <div>
                  <label style="display: block; font-weight: 600; color: var(--gray-700); margin-bottom: 0.5rem;">Description du projet *</label>
                  <textarea placeholder="Décrivez votre projet en détail : type de travaux, contraintes, délais souhaités..." rows="5" style="width: 100%; padding: 1.25rem; border: 2px solid var(--gray-200); border-radius: 1rem; font-size: 1rem; resize: vertical; transition: all 0.3s ease;" onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(30, 64, 175, 0.1)'" onblur="this.style.borderColor='var(--gray-200)'; this.style.boxShadow='none'"></textarea>
                </div>
                
                <button type="submit" style="padding: 1.5rem; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); color: var(--white); border: none; border-radius: 1rem; font-size: 1.2rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 25px rgba(30, 64, 175, 0.3)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                  📧 Envoyer ma demande de devis
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <style>
          @media (max-width: 768px) {
            .contact-split-modern [style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        </style>
      </section>
    `
  }
};

// Configuration des 5 variations avec designs complètement différents
const DESIGN_VARIATIONS = [
  {
    id: 'modern-creative',
    name: 'Modern Creative',
    primaryColor: '#1e40af',
    secondaryColor: '#3b82f6',
    style: 'modern',
    hero: 'hero-floating-cards',
    services: 'services-tabs-interactive',
    contact: 'contact-floating-form',
    description: 'Design moderne créatif avec éléments flottants'
  },
  {
    id: 'corporate-professional', 
    name: 'Corporate Professional',
    primaryColor: '#059669',
    secondaryColor: '#10b981',
    style: 'corporate',
    hero: 'hero-timeline-process',
    services: 'services-accordion',
    contact: 'contact-split-modern',
    description: 'Design corporate professionnel avec processus'
  },
  {
    id: 'creative-hexagon',
    name: 'Creative Hexagon',
    primaryColor: '#7c3aed',
    secondaryColor: '#a855f7',
    style: 'creative',
    hero: 'hero-diagonal-creative',
    services: 'services-hexagon-creative',
    contact: 'contact-floating-form',
    description: 'Design créatif avec formes hexagonales'
  },
  {
    id: 'minimal-stats',
    name: 'Minimal Stats',
    primaryColor: '#dc2626',
    secondaryColor: '#ef4444', 
    style: 'minimal',
    hero: 'hero-centered-stats',
    services: 'services-masonry',
    contact: 'contact-split-modern',
    description: 'Design minimaliste axé sur les statistiques'
  },
  {
    id: 'modern-split',
    name: 'Modern Split',
    primaryColor: '#374151',
    secondaryColor: '#6b7280',
    style: 'modern',
    hero: 'hero-split-image',
    services: 'services-masonry',
    contact: 'contact-floating-form',
    description: 'Design moderne avec mise en page divisée'
  }
];

// Données de base
const BASE_TEMPLATE_DATA = {
  companyName: 'Électricité Expert Pro',
  trade: 'Électricien',
  city: 'Paris 8ème',
  description: 'Spécialiste en installations électriques haute performance, domotique intelligente et solutions énergétiques durables. Expert certifié RGE avec plus de 15 ans d\'expérience.',
  phone: '01 85 76 32 18',
  email: 'contact@electricite-expert-pro.fr',
  address: '42 Avenue des Champs-Élysées',
  services: [
    {
      slug: 'installation-electrique',
      name: 'Installation Électrique Complète',
      description: 'Installation électrique neuve aux normes NF C 15-100 avec tableau dernière génération',
      features: ['Devis gratuit', 'Normes NF C 15-100', 'Garantie décennale', 'Matériel Schneider/Legrand'],
      price: 'À partir de 85€/h',
      icon: '⚡'
    },
    {
      slug: 'depannage-urgence',
      name: 'Dépannage Électrique 24h/7j',
      description: 'Intervention d\'urgence pour panne électrique, disjoncteur, court-circuit',
      features: ['Intervention 24h/7j', 'Déplacement sous 1h', 'Diagnostic inclus', 'Réparation immédiate'],
      price: 'Déplacement 75€ + tarif intervention',
      icon: '🚨'
    },
    {
      slug: 'domotique-intelligente',
      name: 'Domotique & Maison Connectée',
      description: 'Installation de systèmes domotiques intelligents pour optimiser confort et économies',
      features: ['Système sur-mesure', 'Compatible iOS/Android', 'Formation incluse', 'SAV 2 ans'],
      price: 'Sur devis personnalisé',
      icon: '🏠'
    },
    {
      slug: 'borne-recharge-vehicule',
      name: 'Borne de Recharge Véhicule Électrique',
      description: 'Installation de bornes de recharge pour véhicules électriques et hybrides',
      features: ['Éligible aides ADVENIR', 'Installation certifiée IRVE', 'Garantie constructeur', 'Maintenance préventive'],
      price: 'À partir de 1200€ pose incluse',
      icon: '🔌'
    }
  ],
  cities: ['Paris 8ème', 'Paris 1er', 'Paris 2ème', 'Paris 7ème', 'Paris 16ème', 'Paris 17ème', 'Neuilly-sur-Seine', 'Levallois-Perret'],
  website: 'https://electricite-expert-pro.fr'
};

// Fonction pour générer les CSS variables selon la variation
function generateVariationCSS(variation) {
  return `
    :root {
      --primary: ${variation.primaryColor};
      --secondary: ${variation.secondaryColor};
      --white: #ffffff;
      --gray-50: #f9fafb;
      --gray-100: #f3f4f6;
      --gray-200: #e5e7eb;
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
    
    /* Navigation responsive */
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
    }
    
    .nav-link {
      color: var(--gray-800);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    .nav-link:hover, .nav-link.active {
      color: var(--primary);
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
    
    /* Footer */
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
      
      .nav-toggle {
        display: flex;
      }
      
      .footer-bottom {
        flex-direction: column;
        gap: 1rem;
      }
    }
  `;
}

// Fonction pour générer la page index complète
function generateUniqueIndexHTML(templateData, variation) {
  const heroHTML = HERO_BLOCKS[variation.hero]?.generateHTML(templateData) || '';
  const servicesHTML = SERVICE_BLOCKS[variation.services]?.generateHTML(templateData) || '';
  const contactHTML = CONTACT_BLOCKS[variation.contact]?.generateHTML(templateData) || '';
  
  return `<!DOCTYPE html>
<html lang="fr" class="no-js">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${templateData.companyName} - ${templateData.trade} professionnel à ${templateData.city}</title>
    <meta name="description" content="${templateData.description}">
    <meta name="keywords" content="${templateData.trade} ${templateData.city}, installation électrique, dépannage électricien urgence, devis gratuit">
    
    <!-- Meta tags OpenGraph -->
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
      "openingHours": "Lundi-Vendredi 8h-19h, Samedi 9h-17h, Urgences 24h/7j"
    }
    </script>
    
    <!-- Fonts et CSS -->
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"></noscript>
    
    <style>
        ${generateVariationCSS(variation)}
    </style>
</head>

<body class="elementor-pro-page ${variation.style}">
    <!-- Navigation responsive -->
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
                    <li><a href="#accueil" class="nav-link">Accueil</a></li>
                    <li><a href="#services" class="nav-link">Services</a></li>
                    <li><a href="#contact" class="nav-link">Contact</a></li>
                    <li><a href="mentions-legales.html" class="nav-link">Mentions légales</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Section Hero unique -->
    ${heroHTML}

    <!-- Section Services unique -->
    ${servicesHTML}

    <!-- Section Contact unique -->
    ${contactHTML}

    <!-- Footer -->
    <footer class="footer-mega">
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
                        ${variation.name} - <a href="https://claude.ai/code" target="_blank">Claude Code</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    
    <script>
        // Navigation mobile
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Fermer le menu au clic sur lien
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
        
        // Animations GSAP si disponible
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Animation des éléments au scroll
            gsap.utils.toArray('[style*="opacity: 0"]').forEach(element => {
                gsap.fromTo(element, {
                    opacity: 0,
                    y: 30
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            });
        }
        
        // Smooth scroll pour les ancres
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
        
        console.log('🚀 ${variation.name} (${variation.description}) loaded successfully!');
    </script>
</body>
</html>`;
}

// Fonction principale pour générer les 5 variations uniques
async function generateUniqueDesigns() {
  console.log('🚀 GÉNÉRATION DE 5 DESIGNS COMPLÈTEMENT DIFFÉRENTS');
  console.log('============================================================');
  
  let totalPagesGenerated = 0;
  
  for (let i = 0; i < DESIGN_VARIATIONS.length; i++) {
    const variation = DESIGN_VARIATIONS[i];
    const siteId = `site-unique-${variation.id}`;
    const outputDir = path.join(__dirname, 'public', 'generated-sites', siteId);
    
    console.log(`\n🎨 ${i + 1}/5 - Génération: ${variation.name}`);
    console.log(`🎯 Style: ${variation.style}`);
    console.log(`🎨 Couleurs: ${variation.primaryColor} / ${variation.secondaryColor}`);
    console.log(`🧩 Blocs: Hero(${variation.hero}) + Services(${variation.services}) + Contact(${variation.contact})`);
    console.log(`📝 Description: ${variation.description}`);
    console.log(`📁 Dossier: ${siteId}`);
    
    try {
      // Créer le dossier de sortie
      await fs.mkdir(outputDir, { recursive: true });
      
      // Générer la page index unique
      const indexHTML = generateUniqueIndexHTML(BASE_TEMPLATE_DATA, variation);
      await fs.writeFile(path.join(outputDir, 'index.html'), indexHTML);
      console.log('  ✅ index.html généré avec design unique');
      
      // Générer page contact simple
      const contactHTML = generateSimpleContactHTML(BASE_TEMPLATE_DATA, variation);
      await fs.writeFile(path.join(outputDir, 'contact.html'), contactHTML);
      console.log('  ✅ contact.html généré');
      
      // Générer page mentions légales
      const legalHTML = generateSimpleLegalHTML(BASE_TEMPLATE_DATA, variation);
      await fs.writeFile(path.join(outputDir, 'mentions-legales.html'), legalHTML);
      console.log('  ✅ mentions-legales.html généré');
      
      // Compter les fichiers
      const files = await fs.readdir(outputDir);
      totalPagesGenerated += files.length;
      console.log(`  📊 ${files.length} pages générées pour ${variation.name}`);
      
    } catch (error) {
      console.error(`❌ Erreur lors de la génération de ${variation.name}:`, error.message);
    }
  }
  
  console.log('\n🎉 GÉNÉRATION TERMINÉE AVEC SUCCÈS !');
  console.log('============================================================');
  console.log('📊 Résumé final:');
  console.log(`🌟 5 designs complètement uniques générés`);
  console.log(`📄 Total: ${totalPagesGenerated} pages`);
  console.log('🎨 Variabilité des designs:');
  console.log(`   • ${Object.keys(HERO_BLOCKS).length} types de héros différents`);
  console.log(`   • ${Object.keys(SERVICE_BLOCKS).length} types de sections services`);
  console.log(`   • ${Object.keys(CONTACT_BLOCKS).length} types de sections contact`);
  console.log(`   • ${Object.keys(HERO_BLOCKS).length * Object.keys(SERVICE_BLOCKS).length * Object.keys(CONTACT_BLOCKS).length} combinaisons uniques possibles`);
  console.log('📁 Sites disponibles dans: public/generated-sites/site-unique-*');
  console.log('\n💡 Chaque site a maintenant un design structurellement différent !');
}

// Fonctions utilitaires pour pages secondaires
function generateSimpleContactHTML(templateData, variation) {
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

    <section style="padding: 8rem 0 4rem; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); color: var(--white); text-align: center;">
        <div class="container">
            <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Contactez ${templateData.companyName}</h1>
            <p style="font-size: 1.25rem; opacity: 0.9;">Votre projet nous intéresse</p>
        </div>
    </section>

    <section style="padding: 6rem 0; background: var(--gray-50);">
        <div class="container">
            <div style="max-width: 800px; margin: 0 auto; background: var(--white); padding: 3rem; border-radius: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <h2 style="color: var(--primary); margin-bottom: 2rem;">Contactez-nous</h2>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 3rem;">
                    <div>
                        <h3 style="color: var(--primary); margin-bottom: 1rem;">📞 Téléphone</h3>
                        <a href="tel:${templateData.phone}" style="color: var(--primary); font-weight: 600; text-decoration: none; font-size: 1.1rem;">${templateData.phone}</a>
                        <p style="color: var(--gray-600); margin-top: 0.5rem;">Urgences 24h/7j</p>
                    </div>
                    <div>
                        <h3 style="color: var(--primary); margin-bottom: 1rem;">✉️ Email</h3>
                        <a href="mailto:${templateData.email}" style="color: var(--primary); font-weight: 600; text-decoration: none;">${templateData.email}</a>
                        <p style="color: var(--gray-600); margin-top: 0.5rem;">Réponse sous 24h</p>
                    </div>
                </div>
                
                <form style="display: grid; gap: 1.5rem;">
                    <input type="text" placeholder="Votre nom" style="padding: 1rem; border: 2px solid var(--gray-200); border-radius: 0.5rem;">
                    <input type="email" placeholder="Votre email" style="padding: 1rem; border: 2px solid var(--gray-200); border-radius: 0.5rem;">
                    <textarea placeholder="Votre message" rows="4" style="padding: 1rem; border: 2px solid var(--gray-200); border-radius: 0.5rem; resize: vertical;"></textarea>
                    <button type="submit" style="padding: 1rem; background: var(--primary); color: var(--white); border: none; border-radius: 0.5rem; font-weight: 600;">Envoyer</button>
                </form>
            </div>
        </div>
    </section>

    <footer class="footer-mega">
        <div class="container">
            <div class="footer-content">
                <h3 class="footer-title">${templateData.companyName}</h3>
                <p class="footer-description">${templateData.trade} professionnel - Contact</p>
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

function generateSimpleLegalHTML(templateData, variation) {
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
                
                <h2 style="color: var(--primary); margin: 2rem 0 1rem;">Informations légales</h2>
                <p><strong>Raison sociale :</strong> ${templateData.companyName}</p>
                <p><strong>Adresse :</strong> ${templateData.address}, ${templateData.city}</p>
                <p><strong>Téléphone :</strong> ${templateData.phone}</p>
                <p><strong>Email :</strong> ${templateData.email}</p>
                
                <h2 style="color: var(--primary); margin: 2rem 0 1rem;">Activité</h2>
                <p>Entreprise de ${templateData.trade.toLowerCase()} spécialisée dans l'installation, la réparation et la maintenance.</p>
                
                <div style="text-align: center; margin-top: 3rem;">
                    <a href="index.html" style="display: inline-block; padding: 1rem 2rem; background: var(--primary); color: var(--white); text-decoration: none; border-radius: 0.5rem; font-weight: 600;">← Retour à l'accueil</a>
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
generateUniqueDesigns().catch(console.error);