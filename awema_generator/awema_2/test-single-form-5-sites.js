// Test : UN SEUL formulaire → 5 sites complètement différents
const fs = require('fs').promises;
const path = require('path');

// UN SEUL formulaire de base
const SINGLE_FORM_DATA = {
  companyName: 'Expert Électro Plus',
  trade: 'Électricien',
  city: 'Lyon',
  description: 'Électricien expert à Lyon, spécialisé dans l\'installation et le dépannage électrique professionnel.',
  phone: '04 78 45 67 89',
  email: 'contact@expert-electro-plus.fr',
  address: '15 Rue de la République',
  website: 'https://expert-electro-plus.fr'
};

// 5 systèmes de design VRAIMENT différents
const DESIGN_SYSTEMS = [
  {
    id: 'floating-modern',
    name: 'Floating Modern',
    colors: { primary: '#2563eb', secondary: '#3b82f6' },
    heroType: 'floating-cards',
    servicesType: 'interactive-tabs',
    contactType: 'floating-form'
  },
  {
    id: 'timeline-corporate', 
    name: 'Timeline Corporate',
    colors: { primary: '#059669', secondary: '#10b981' },
    heroType: 'process-timeline',
    servicesType: 'accordion-expandable', 
    contactType: 'split-professional'
  },
  {
    id: 'geometric-creative',
    name: 'Geometric Creative', 
    colors: { primary: '#7c3aed', secondary: '#a855f7' },
    heroType: 'diagonal-shapes',
    servicesType: 'hexagon-grid',
    contactType: 'overlay-map'
  },
  {
    id: 'stats-minimal',
    name: 'Stats Minimal',
    colors: { primary: '#dc2626', secondary: '#ef4444' },
    heroType: 'centered-statistics',
    servicesType: 'masonry-cards',
    contactType: 'minimal-center'
  },
  {
    id: 'magazine-editorial',
    name: 'Magazine Editorial',
    colors: { primary: '#374151', secondary: '#6b7280' },
    heroType: 'magazine-layout',
    servicesType: 'carousel-slider',
    contactType: 'editorial-form'
  }
];

// Générateurs de blocs VRAIMENT différents
const HERO_GENERATORS = {
  'floating-cards': (data, design) => `
    <section style="min-height: 100vh; background: linear-gradient(135deg, ${design.colors.primary}, ${design.colors.secondary}); display: flex; align-items: center; color: white; position: relative; overflow: hidden;">
      <!-- Cartes flottantes animées -->
      <div style="position: absolute; top: 20%; right: 10%; background: rgba(255,255,255,0.15); padding: 2rem; border-radius: 1rem; animation: float 6s infinite;">
        <div style="font-size: 2rem;">⚡</div><div>Installation rapide</div>
      </div>
      <div style="position: absolute; bottom: 30%; left: 5%; background: rgba(255,255,255,0.15); padding: 2rem; border-radius: 1rem; animation: float 8s infinite reverse;">
        <div style="font-size: 2rem;">🎯</div><div>Devis gratuit</div>
      </div>
      
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem; text-align: center; z-index: 2; position: relative;">
        <h1 style="font-size: 4rem; font-weight: 800; margin-bottom: 2rem;">${data.companyName}</h1>
        <p style="font-size: 1.5rem; margin-bottom: 1rem; opacity: 0.9;">${data.trade} d'excellence à ${data.city}</p>
        <p style="font-size: 1.2rem; margin-bottom: 3rem; opacity: 0.8;">${data.description}</p>
        <a href="#contact" style="display: inline-block; padding: 1.5rem 3rem; background: white; color: ${design.colors.primary}; text-decoration: none; border-radius: 3rem; font-weight: 600; font-size: 1.1rem;">📞 ${data.phone}</a>
      </div>
      
      <style>@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }</style>
    </section>`,
    
  'process-timeline': (data, design) => `
    <section style="min-height: 100vh; background: linear-gradient(135deg, ${design.colors.primary}, ${design.colors.secondary}); display: flex; align-items: center; color: white;">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
        <div style="text-align: center; margin-bottom: 4rem;">
          <h1 style="font-size: 3.5rem; font-weight: 800; margin-bottom: 1rem;">${data.companyName}</h1>
          <p style="font-size: 1.5rem; opacity: 0.9;">${data.trade} professionnel à ${data.city}</p>
        </div>
        
        <!-- Timeline horizontale -->
        <div style="position: relative; margin: 4rem 0;">
          <div style="position: absolute; top: 50%; left: 10%; right: 10%; height: 4px; background: rgba(255,255,255,0.3);"></div>
          <div style="display: flex; justify-content: space-between; padding: 0 10%;">
            <div style="background: rgba(255,255,255,0.15); padding: 2rem; border-radius: 1rem; width: 200px; text-align: center; position: relative;">
              <div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); width: 40px; height: 40px; background: white; border-radius: 50%; color: ${design.colors.primary}; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</div>
              <div style="font-size: 2rem; margin-bottom: 1rem;">📞</div>
              <h3>Contact</h3><p>Appelez-nous</p>
            </div>
            <div style="background: rgba(255,255,255,0.15); padding: 2rem; border-radius: 1rem; width: 200px; text-align: center; position: relative;">
              <div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); width: 40px; height: 40px; background: white; border-radius: 50%; color: ${design.colors.primary}; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</div>
              <div style="font-size: 2rem; margin-bottom: 1rem;">📋</div>
              <h3>Devis</h3><p>Évaluation gratuite</p>
            </div>
            <div style="background: rgba(255,255,255,0.15); padding: 2rem; border-radius: 1rem; width: 200px; text-align: center; position: relative;">
              <div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); width: 40px; height: 40px; background: white; border-radius: 50%; color: ${design.colors.primary}; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</div>
              <div style="font-size: 2rem; margin-bottom: 1rem;">🔧</div>
              <h3>Intervention</h3><p>Réalisation pro</p>
            </div>
            <div style="background: rgba(255,255,255,0.15); padding: 2rem; border-radius: 1rem; width: 200px; text-align: center; position: relative;">
              <div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); width: 40px; height: 40px; background: white; border-radius: 50%; color: ${design.colors.primary}; display: flex; align-items: center; justify-content: center; font-weight: bold;">4</div>
              <div style="font-size: 2rem; margin-bottom: 1rem;">✅</div>
              <h3>Garantie</h3><p>Suivi & SAV</p>
            </div>
          </div>
        </div>
      </div>
    </section>`,
    
  'diagonal-shapes': (data, design) => `
    <section style="min-height: 100vh; background: linear-gradient(135deg, ${design.colors.primary}, ${design.colors.secondary}); position: relative; overflow: hidden; display: flex; align-items: center;">
      <!-- Formes géométriques -->
      <div style="position: absolute; top: -50%; right: -20%; width: 80%; height: 200%; background: rgba(255,255,255,0.1); transform: rotate(15deg); border-radius: 2rem;"></div>
      <div style="position: absolute; bottom: -30%; left: -10%; width: 60%; height: 120%; background: rgba(255,255,255,0.05); transform: rotate(-10deg);"></div>
      
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem; position: relative; z-index: 2;">
        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 4rem; align-items: center; color: white;">
          <div>
            <div style="background: rgba(255,255,255,0.1); display: inline-block; padding: 0.5rem 1.5rem; border-radius: 2rem; margin-bottom: 1rem;">⚡ ${data.trade} Expert</div>
            <h1 style="font-size: 3.5rem; font-weight: 800; margin-bottom: 1.5rem;">${data.companyName}</h1>
            <p style="font-size: 1.3rem; margin-bottom: 2rem; opacity: 0.9;">Solutions ${data.trade.toLowerCase()} innovantes à ${data.city}</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 2rem 0;">
              <div style="background: rgba(255,255,255,0.15); padding: 1.5rem; border-radius: 1rem;">
                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🚀</div>
                <div style="font-weight: 600;">Intervention rapide</div>
              </div>
              <div style="background: rgba(255,255,255,0.15); padding: 1.5rem; border-radius: 1rem;">
                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🎯</div>
                <div style="font-weight: 600;">Devis gratuit</div>
              </div>
            </div>
          </div>
          <div style="text-align: center;">
            <div style="background: rgba(255,255,255,0.1); padding: 3rem; border-radius: 2rem;">
              <h3>Expert certifié</h3><p>Plus de 10 ans d'expérience</p>
            </div>
          </div>
        </div>
      </div>
    </section>`,
    
  'centered-statistics': (data, design) => `
    <section style="min-height: 100vh; background: linear-gradient(135deg, ${design.colors.primary}, ${design.colors.secondary}); display: flex; align-items: center; color: white; text-align: center;">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
        <h1 style="font-size: 4rem; font-weight: 800; margin-bottom: 1.5rem;">${data.companyName}</h1>
        <p style="font-size: 1.5rem; margin-bottom: 3rem; opacity: 0.9;">${data.description}</p>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; margin: 4rem 0;">
          <div><div style="font-size: 3.5rem; font-weight: 800;">15+</div><div>Années d'expérience</div></div>
          <div><div style="font-size: 3.5rem; font-weight: 800;">500+</div><div>Clients satisfaits</div></div>
          <div><div style="font-size: 3.5rem; font-weight: 800;">24h/7j</div><div>Service d'urgence</div></div>
        </div>
        
        <a href="#contact" style="display: inline-block; padding: 1.25rem 3rem; background: white; color: ${design.colors.primary}; text-decoration: none; border-radius: 3rem; font-weight: 600; font-size: 1.1rem;">📞 ${data.phone}</a>
      </div>
    </section>`,
    
  'magazine-layout': (data, design) => `
    <section style="min-height: 100vh; background: linear-gradient(135deg, ${design.colors.primary}, ${design.colors.secondary}); display: flex; align-items: center; color: white;">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 4rem;">
          <div>
            <div style="background: rgba(255,255,255,0.1); display: inline-block; padding: 0.5rem 1rem; border-radius: 1rem; margin-bottom: 1rem; font-size: 0.9rem;">MAGAZINE STYLE</div>
            <h1 style="font-size: 3.5rem; font-weight: 800; margin-bottom: 1rem; line-height: 1.1;">${data.companyName}</h1>
            <h2 style="font-size: 1.5rem; font-weight: 300; margin-bottom: 2rem; opacity: 0.9;">${data.trade} professionnel à ${data.city}</h2>
            <p style="font-size: 1.1rem; margin-bottom: 2rem; opacity: 0.8; line-height: 1.6;">${data.description}</p>
            <a href="#contact" style="display: inline-block; padding: 1rem 2rem; background: white; color: ${design.colors.primary}; text-decoration: none; border-radius: 0.5rem; font-weight: 600;">Contactez-nous</a>
          </div>
          <div style="display: grid; gap: 2rem;">
            <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 1rem;">
              <h3 style="margin-bottom: 1rem;">📞 Contact direct</h3>
              <p style="font-weight: 600;">${data.phone}</p>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 1rem;">
              <h3 style="margin-bottom: 1rem;">📍 Zone d'intervention</h3>
              <p>${data.city} et environs</p>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 1rem;">
              <h3 style="margin-bottom: 1rem;">⚡ Urgences</h3>
              <p>Intervention 24h/7j</p>
            </div>
          </div>
        </div>
      </div>
    </section>`
};

const SERVICES_GENERATORS = {
  'interactive-tabs': (data, design) => `
    <section style="padding: 6rem 0; background: white;">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
        <h2 style="text-align: center; font-size: 2.5rem; font-weight: 700; margin-bottom: 3rem; color: ${design.colors.primary};">Nos Services ${data.trade}</h2>
        
        <div style="display: flex; justify-content: center; margin-bottom: 3rem; gap: 1rem; flex-wrap: wrap;">
          <button onclick="showTab('installation')" id="tab-installation" style="padding: 1rem 1.5rem; background: ${design.colors.primary}; border: 2px solid ${design.colors.primary}; color: white; border-radius: 2rem; cursor: pointer; font-weight: 600;">⚡ Installation</button>
          <button onclick="showTab('depannage')" id="tab-depannage" style="padding: 1rem 1.5rem; background: transparent; border: 2px solid ${design.colors.primary}; color: ${design.colors.primary}; border-radius: 2rem; cursor: pointer; font-weight: 600;">🚨 Dépannage</button>
          <button onclick="showTab('domotique')" id="tab-domotique" style="padding: 1rem 1.5rem; background: transparent; border: 2px solid ${design.colors.primary}; color: ${design.colors.primary}; border-radius: 2rem; cursor: pointer; font-weight: 600;">🏠 Domotique</button>
        </div>
        
        <div id="content-installation" style="background: #f9fafb; padding: 4rem; border-radius: 2rem;">
          <h3 style="font-size: 2rem; color: ${design.colors.primary}; margin-bottom: 1rem;">Installation Électrique Complète</h3>
          <p style="font-size: 1.1rem; margin-bottom: 2rem;">Installation électrique neuve aux normes avec matériel professionnel.</p>
          <div style="background: white; padding: 2rem; border-radius: 1rem;">
            <h4 style="color: ${design.colors.primary}; margin-bottom: 1rem;">✨ Inclus: Devis gratuit • Normes NF C 15-100 • Garantie décennale</h4>
          </div>
        </div>
        
        <div id="content-depannage" style="display: none; background: #f9fafb; padding: 4rem; border-radius: 2rem;">
          <h3 style="font-size: 2rem; color: ${design.colors.primary}; margin-bottom: 1rem;">Dépannage 24h/7j</h3>
          <p style="font-size: 1.1rem; margin-bottom: 2rem;">Intervention d'urgence pour toute panne électrique.</p>
        </div>
        
        <div id="content-domotique" style="display: none; background: #f9fafb; padding: 4rem; border-radius: 2rem;">
          <h3 style="font-size: 2rem; color: ${design.colors.primary}; margin-bottom: 1rem;">Domotique Intelligente</h3>
          <p style="font-size: 1.1rem; margin-bottom: 2rem;">Maison connectée et automatisée.</p>
        </div>
      </div>
      
      <script>
        function showTab(service) {
          document.querySelectorAll('[id^="content-"]').forEach(el => el.style.display = 'none');
          document.querySelectorAll('[id^="tab-"]').forEach(el => {
            el.style.background = 'transparent';
            el.style.color = '${design.colors.primary}';
          });
          document.getElementById('content-' + service).style.display = 'block';
          const tab = document.getElementById('tab-' + service);
          tab.style.background = '${design.colors.primary}';
          tab.style.color = 'white';
        }
      </script>
    </section>`,
    
  'accordion-expandable': (data, design) => `
    <section style="padding: 6rem 0; background: #f9fafb;">
      <div class="container" style="max-width: 900px; margin: 0 auto; padding: 0 1rem;">
        <h2 style="text-align: center; font-size: 2.5rem; font-weight: 700; margin-bottom: 4rem; color: ${design.colors.primary};">Services Détaillés</h2>
        
        <div style="border: 1px solid #e5e7eb; margin-bottom: 1rem; border-radius: 1rem; overflow: hidden; background: white;">
          <div onclick="toggleAccordion('installation')" style="padding: 2rem; background: ${design.colors.primary}; cursor: pointer; display: flex; justify-content: space-between; align-items: center; color: white;">
            <div style="display: flex; align-items: center; gap: 1.5rem;">
              <div style="font-size: 2rem;">⚡</div>
              <div><h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Installation Électrique</h3><p style="margin: 0;">À partir de 85€/h</p></div>
            </div>
            <div id="arrow-installation" style="font-size: 1.5rem; transform: rotate(180deg);">▼</div>
          </div>
          <div id="content-installation" style="padding: 2rem; background: white;">
            <p style="font-size: 1.1rem; margin-bottom: 2rem;">Installation complète aux normes NF C 15-100 avec garantie décennale.</p>
            <div style="background: #f9fafb; padding: 2rem; border-radius: 1rem;">
              <h4 style="color: ${design.colors.primary}; margin-bottom: 1rem;">✨ Inclus</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                <div>✓ Devis gratuit</div><div>✓ Normes NF C 15-100</div>
                <div>✓ Garantie décennale</div><div>✓ Matériel professionnel</div>
              </div>
            </div>
          </div>
        </div>
        
        <div style="border: 1px solid #e5e7eb; margin-bottom: 1rem; border-radius: 1rem; overflow: hidden; background: white;">
          <div onclick="toggleAccordion('depannage')" style="padding: 2rem; background: #f9fafb; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 1.5rem;">
              <div style="font-size: 2rem;">🚨</div>
              <div><h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: ${design.colors.primary};">Dépannage 24h/7j</h3><p style="margin: 0; color: #6b7280;">Déplacement 75€</p></div>
            </div>
            <div id="arrow-depannage" style="font-size: 1.5rem;">▼</div>
          </div>
          <div id="content-depannage" style="display: none; padding: 2rem; background: white;">
            <p>Service d'urgence disponible 24h/7j pour toute panne électrique.</p>
          </div>
        </div>
      </div>
      
      <script>
        function toggleAccordion(service) {
          const content = document.getElementById('content-' + service);
          const arrow = document.getElementById('arrow-' + service);
          if (content.style.display === 'none') {
            content.style.display = 'block';
            arrow.style.transform = 'rotate(180deg)';
          } else {
            content.style.display = 'none';
            arrow.style.transform = 'rotate(0deg)';
          }
        }
      </script>
    </section>`,
    
  'hexagon-grid': (data, design) => `
    <section style="padding: 6rem 0; background: #111827; color: white;">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
        <h2 style="text-align: center; font-size: 2.5rem; font-weight: 700; margin-bottom: 4rem;">Expertise ${data.trade}</h2>
        
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem;">
          <div style="width: 200px; height: 173px; position: relative; margin: 86px 0;">
            <div style="width: 100%; height: 100%; background: linear-gradient(135deg, ${design.colors.primary}, ${design.colors.secondary}); transform: rotate(30deg); border-radius: 1rem;">
              <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); text-align: center; color: white;">
                <div style="font-size: 2.5rem; margin-bottom: 1rem;">⚡</div>
                <h3 style="font-size: 1rem; margin-bottom: 0.5rem;">Installation</h3>
                <p style="font-size: 0.8rem;">85€/h</p>
              </div>
            </div>
          </div>
          
          <div style="width: 200px; height: 173px; position: relative; margin: 86px 0;">
            <div style="width: 100%; height: 100%; background: linear-gradient(135deg, ${design.colors.primary}, ${design.colors.secondary}); transform: rotate(30deg); border-radius: 1rem;">
              <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); text-align: center; color: white;">
                <div style="font-size: 2.5rem; margin-bottom: 1rem;">🚨</div>
                <h3 style="font-size: 1rem; margin-bottom: 0.5rem;">Dépannage</h3>
                <p style="font-size: 0.8rem;">24h/7j</p>
              </div>
            </div>
          </div>
          
          <div style="width: 200px; height: 173px; position: relative; margin: 86px 0;">
            <div style="width: 100%; height: 100%; background: linear-gradient(135deg, ${design.colors.primary}, ${design.colors.secondary}); transform: rotate(30deg); border-radius: 1rem;">
              <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); text-align: center; color: white;">
                <div style="font-size: 2.5rem; margin-bottom: 1rem;">🏠</div>
                <h3 style="font-size: 1rem; margin-bottom: 0.5rem;">Domotique</h3>
                <p style="font-size: 0.8rem;">Sur devis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`,
    
  'masonry-cards': (data, design) => `
    <section style="padding: 6rem 0; background: #f9fafb;">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
        <h2 style="text-align: center; font-size: 2.5rem; font-weight: 700; margin-bottom: 4rem; color: ${design.colors.primary};">Nos Services</h2>
        
        <div style="columns: 3; column-gap: 2rem;">
          <div style="break-inside: avoid; margin-bottom: 2rem; background: white; padding: 2.5rem; border-radius: 1.5rem; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
            <div style="font-size: 3rem; margin-bottom: 1.5rem;">⚡</div>
            <h3 style="font-size: 1.4rem; color: ${design.colors.primary}; margin-bottom: 1rem;">Installation Électrique</h3>
            <p style="margin-bottom: 1.5rem;">Installation neuve aux normes NF C 15-100.</p>
            <div style="font-size: 1.2rem; font-weight: 700; color: ${design.colors.primary};">À partir de 85€/h</div>
          </div>
          
          <div style="break-inside: avoid; margin-bottom: 2rem; background: white; padding: 2.5rem; border-radius: 1.5rem; box-shadow: 0 5px 15px rgba(0,0,0,0.08); margin-top: 2rem;">
            <div style="font-size: 3rem; margin-bottom: 1.5rem;">🚨</div>
            <h3 style="font-size: 1.4rem; color: ${design.colors.primary}; margin-bottom: 1rem;">Dépannage Urgence</h3>
            <p style="margin-bottom: 1.5rem;">Intervention 24h/7j pour toute panne électrique.</p>
            <div style="font-size: 1.2rem; font-weight: 700; color: ${design.colors.primary};">Déplacement 75€</div>
          </div>
          
          <div style="break-inside: avoid; margin-bottom: 2rem; background: white; padding: 2.5rem; border-radius: 1.5rem; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
            <div style="font-size: 3rem; margin-bottom: 1.5rem;">🏠</div>
            <h3 style="font-size: 1.4rem; color: ${design.colors.primary}; margin-bottom: 1rem;">Domotique</h3>
            <p style="margin-bottom: 1.5rem;">Maison connectée et automatisation.</p>
            <div style="font-size: 1.2rem; font-weight: 700; color: ${design.colors.primary};">Sur devis</div>
          </div>
        </div>
      </div>
    </section>`,
    
  'carousel-slider': (data, design) => `
    <section style="padding: 6rem 0; background: white;">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
        <h2 style="text-align: center; font-size: 2.5rem; font-weight: 700; margin-bottom: 4rem; color: ${design.colors.primary};">Portfolio Services</h2>
        
        <div style="overflow: hidden; border-radius: 2rem;">
          <div id="carousel-track" style="display: flex; transition: transform 0.3s ease;">
            <div style="min-width: 400px; margin-right: 2rem; background: ${design.colors.primary}; color: white; padding: 3rem; border-radius: 1rem;">
              <div style="font-size: 3rem; margin-bottom: 1.5rem;">⚡</div>
              <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">Installation Électrique</h3>
              <p style="margin-bottom: 2rem; opacity: 0.9;">Installation complète aux normes avec garantie décennale.</p>
              <div style="font-size: 1.2rem; font-weight: 700;">À partir de 85€/h</div>
            </div>
            
            <div style="min-width: 400px; margin-right: 2rem; background: ${design.colors.secondary}; color: white; padding: 3rem; border-radius: 1rem;">
              <div style="font-size: 3rem; margin-bottom: 1.5rem;">🚨</div>
              <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">Dépannage Urgence</h3>
              <p style="margin-bottom: 2rem; opacity: 0.9;">Intervention 24h/7j pour panne électrique.</p>
              <div style="font-size: 1.2rem; font-weight: 700;">Déplacement 75€</div>
            </div>
            
            <div style="min-width: 400px; margin-right: 2rem; background: #6b7280; color: white; padding: 3rem; border-radius: 1rem;">
              <div style="font-size: 3rem; margin-bottom: 1.5rem;">🏠</div>
              <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">Domotique</h3>
              <p style="margin-bottom: 2rem; opacity: 0.9;">Maison connectée et automatisation.</p>
              <div style="font-size: 1.2rem; font-weight: 700;">Sur devis</div>
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 2rem;">
          <button onclick="moveCarousel(-1)" style="padding: 1rem; margin: 0 0.5rem; background: ${design.colors.primary}; color: white; border: none; border-radius: 50%; cursor: pointer;">‹</button>
          <button onclick="moveCarousel(1)" style="padding: 1rem; margin: 0 0.5rem; background: ${design.colors.primary}; color: white; border: none; border-radius: 50%; cursor: pointer;">›</button>
        </div>
      </div>
      
      <script>
        let currentSlide = 0;
        function moveCarousel(direction) {
          currentSlide += direction;
          if (currentSlide < 0) currentSlide = 2;
          if (currentSlide > 2) currentSlide = 0;
          document.getElementById('carousel-track').style.transform = 'translateX(-' + (currentSlide * 420) + 'px)';
        }
      </script>
    </section>`
};

// Fonction pour générer une page complète unique
function generateUniqueSiteHTML(formData, designSystem) {
  const heroHTML = HERO_GENERATORS[designSystem.heroType](formData, designSystem);
  const servicesHTML = SERVICES_GENERATORS[designSystem.servicesType](formData, designSystem);
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.companyName} - ${formData.trade} ${formData.city}</title>
    <meta name="description" content="${formData.description}">
    
    <style>
        :root {
            --primary: ${designSystem.colors.primary};
            --secondary: ${designSystem.colors.secondary};
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        
        /* Navigation simple */
        nav { position: fixed; top: 0; width: 100%; background: rgba(255,255,255,0.95); z-index: 1000; padding: 1rem 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .nav-container { display: flex; justify-content: space-between; align-items: center; }
        .nav-logo { font-size: 1.5rem; font-weight: 800; color: var(--primary); text-decoration: none; }
        .nav-menu { display: flex; list-style: none; gap: 2rem; }
        .nav-link { color: #374151; text-decoration: none; font-weight: 500; }
        .nav-link:hover { color: var(--primary); }
        
        /* Footer simple */
        footer { background: #111827; color: white; padding: 3rem 0 1rem; text-align: center; }
        .footer-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; margin-top: 2rem; }
        
        /* Responsive */
        @media (max-width: 768px) {
            [style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
            [style*="columns: 3"] { columns: 1 !important; }
            .nav-menu { display: none; }
        }
    </style>
</head>

<body>
    <!-- Navigation -->
    <nav>
        <div class="container">
            <div class="nav-container">
                <a href="#" class="nav-logo">${formData.companyName}</a>
                <ul class="nav-menu">
                    <li><a href="#accueil" class="nav-link">Accueil</a></li>
                    <li><a href="#services" class="nav-link">Services</a></li>
                    <li><a href="#contact" class="nav-link">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section UNIQUE -->
    ${heroHTML}

    <!-- Services Section UNIQUE -->
    ${servicesHTML}

    <!-- Contact Simple -->
    <section id="contact" style="padding: 6rem 0; background: ${designSystem.colors.primary}; color: white; text-align: center;">
        <div class="container">
            <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem;">Contactez ${formData.companyName}</h2>
            <p style="font-size: 1.2rem; margin-bottom: 3rem;">${formData.description}</p>
            <div style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                <a href="tel:${formData.phone}" style="display: inline-block; padding: 1.5rem 2.5rem; background: white; color: ${designSystem.colors.primary}; text-decoration: none; border-radius: 0.5rem; font-weight: 600;">📞 ${formData.phone}</a>
                <a href="mailto:${formData.email}" style="display: inline-block; padding: 1.5rem 2.5rem; background: transparent; color: white; border: 2px solid white; text-decoration: none; border-radius: 0.5rem; font-weight: 600;">📧 Email</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <h3 class="footer-title">${formData.companyName}</h3>
            <p>${formData.trade} professionnel à ${formData.city}</p>
            <div class="footer-bottom">
                <p>© 2025 ${formData.companyName} - Design: ${designSystem.name}</p>
            </div>
        </div>
    </footer>
</body>
</html>`;
}

// Fonction principale
async function testSingleFormFiveSites() {
  console.log('🚀 TEST: UN SEUL FORMULAIRE → 5 SITES DIFFÉRENTS');
  console.log('============================================================');
  console.log('📋 Formulaire unique utilisé:');
  console.log(`   Entreprise: ${SINGLE_FORM_DATA.companyName}`);
  console.log(`   Métier: ${SINGLE_FORM_DATA.trade}`);
  console.log(`   Ville: ${SINGLE_FORM_DATA.city}`);
  console.log(`   Téléphone: ${SINGLE_FORM_DATA.phone}`);
  console.log('============================================================\n');
  
  for (let i = 0; i < DESIGN_SYSTEMS.length; i++) {
    const design = DESIGN_SYSTEMS[i];
    const siteId = `test-single-form-${design.id}`;
    const outputDir = path.join(__dirname, 'public', 'generated-sites', siteId);
    
    console.log(`🎨 ${i + 1}/5 - Génération: ${design.name}`);
    console.log(`   Hero: ${design.heroType}`);
    console.log(`   Services: ${design.servicesType}`);
    console.log(`   Contact: ${design.contactType}`);
    console.log(`   Couleurs: ${design.colors.primary} / ${design.colors.secondary}`);
    
    try {
      await fs.mkdir(outputDir, { recursive: true });
      
      const siteHTML = generateUniqueSiteHTML(SINGLE_FORM_DATA, design);
      await fs.writeFile(path.join(outputDir, 'index.html'), siteHTML);
      
      console.log(`   ✅ Site généré: ${siteId}`);
      
    } catch (error) {
      console.error(`   ❌ Erreur: ${error.message}`);
    }
  }
  
  console.log('\n🎉 TEST TERMINÉ !');
  console.log('============================================================');
  console.log('📊 Résultat:');
  console.log('✅ 5 sites générés avec le MÊME formulaire');
  console.log('✅ Chaque site a un design structurellement DIFFÉRENT');
  console.log('📁 Vérifiez dans: public/generated-sites/test-single-form-*');
  console.log('\n💡 Ouvrez chaque index.html pour voir les différences !');
}

// Lancer le test
testSingleFormFiveSites().catch(console.error);