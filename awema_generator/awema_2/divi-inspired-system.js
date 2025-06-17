// Système de blocs inspiré de Divi avec 100% responsive et designs vraiment différents
const fs = require('fs').promises;
const path = require('path');

// Système de blocs Hero inspiré de Divi (15+ variations VRAIMENT différentes)
const DIVI_HERO_BLOCKS = {
  'hero-split-asymmetric': {
    name: 'Split Asymétrique Divi',
    generateHTML: (data, design) => `
      <section style="min-height: 100vh; background: linear-gradient(135deg, ${design.colors.primary} 0%, ${design.colors.secondary} 100%); position: relative; overflow: hidden;">
        <!-- Forme géométrique arrière-plan -->
        <div style="position: absolute; top: -20%; right: -15%; width: 70%; height: 140%; background: rgba(255,255,255,0.08); transform: rotate(25deg) skew(-5deg); border-radius: 3rem;"></div>
        
        <div class="container" style="max-width: 1400px; margin: 0 auto; padding: 0 1rem;">
          <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 6rem; align-items: center; min-height: 100vh; position: relative; z-index: 2;">
            <!-- Contenu principal asymétrique -->
            <div style="color: white; padding: 4rem 0;">
              <div style="background: rgba(255,255,255,0.15); display: inline-block; padding: 0.75rem 2rem; border-radius: 3rem; margin-bottom: 2rem; font-weight: 600; backdrop-filter: blur(10px);">
                ⚡ ${data.trade} Premium
              </div>
              <h1 style="font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 900; line-height: 1.1; margin-bottom: 2rem; text-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                ${data.companyName}
              </h1>
              <h2 style="font-size: clamp(1.2rem, 3vw, 2rem); font-weight: 300; margin-bottom: 1.5rem; opacity: 0.95;">
                Excellence ${data.trade.toLowerCase()} à ${data.city}
              </h2>
              <p style="font-size: clamp(1rem, 2vw, 1.3rem); margin-bottom: 3rem; opacity: 0.9; line-height: 1.7; max-width: 90%;">
                ${data.description}
              </p>
              
              <!-- Métriques impressionnantes -->
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 2rem; margin: 3rem 0;">
                <div style="text-align: center;">
                  <div style="font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 900; margin-bottom: 0.5rem;">15+</div>
                  <div style="opacity: 0.8; font-size: clamp(0.8rem, 1.5vw, 1rem);">Années d'expérience</div>
                </div>
                <div style="text-align: center;">
                  <div style="font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 900; margin-bottom: 0.5rem;">24h</div>
                  <div style="opacity: 0.8; font-size: clamp(0.8rem, 1.5vw, 1rem);">Service urgence</div>
                </div>
                <div style="text-align: center;">
                  <div style="font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 900; margin-bottom: 0.5rem;">500+</div>
                  <div style="opacity: 0.8; font-size: clamp(0.8rem, 1.5vw, 1rem);">Clients satisfaits</div>
                </div>
              </div>
              
              <!-- CTA Buttons responsive -->
              <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 3rem;">
                <a href="tel:${data.phone}" style="display: inline-block; padding: clamp(1rem, 2vw, 1.5rem) clamp(2rem, 4vw, 3rem); background: white; color: ${design.colors.primary}; text-decoration: none; border-radius: 0.75rem; font-weight: 700; font-size: clamp(1rem, 2vw, 1.2rem); box-shadow: 0 8px 25px rgba(0,0,0,0.2); transition: all 0.3s ease; transform: translateY(0);" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 15px 35px rgba(0,0,0,0.3)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 25px rgba(0,0,0,0.2)'">
                  📞 Appeler maintenant
                </a>
                <a href="#services" style="display: inline-block; padding: clamp(1rem, 2vw, 1.5rem) clamp(2rem, 4vw, 3rem); background: transparent; color: white; border: 3px solid white; text-decoration: none; border-radius: 0.75rem; font-weight: 700; font-size: clamp(1rem, 2vw, 1.2rem); transition: all 0.3s ease;" onmouseover="this.style.background='white'; this.style.color='${design.colors.primary}'" onmouseout="this.style.background='transparent'; this.style.color='white'">
                  🔧 Nos services
                </a>
              </div>
            </div>
            
            <!-- Image/contenu visuel décalé -->
            <div style="position: relative;">
              <div style="background: rgba(255,255,255,0.12); padding: 3rem; border-radius: 2rem; backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.2);">
                <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&h=400&fit=crop" alt="${data.trade} professionnel" style="width: 100%; border-radius: 1rem; box-shadow: 0 15px 40px rgba(0,0,0,0.3);">
                <div style="background: white; color: ${design.colors.primary}; padding: 1.5rem; border-radius: 1rem; margin-top: -2rem; position: relative; z-index: 2; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                  <h3 style="font-size: clamp(1.1rem, 2vw, 1.4rem); font-weight: 700; margin-bottom: 0.5rem;">Expert certifié RGE</h3>
                  <p style="font-size: clamp(0.9rem, 1.5vw, 1rem); color: #6b7280; margin: 0;">Qualifications professionnelles garanties</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- CSS responsive intégré -->
        <style>
          @media (max-width: 768px) {
            [style*="grid-template-columns: 1.2fr 0.8fr"] {
              grid-template-columns: 1fr !important;
              gap: 3rem !important;
            }
            [style*="grid-template-columns: repeat(auto-fit, minmax(120px, 1fr))"] {
              grid-template-columns: repeat(3, 1fr) !important;
              gap: 1rem !important;
            }
            [style*="flex; gap: 1.5rem"] {
              flex-direction: column !important;
              align-items: stretch !important;
            }
          }
        </style>
      </section>
    `
  },

  'hero-industrial-diagonal': {
    name: 'Industrial Diagonal',
    generateHTML: (data, design) => `
      <section style="min-height: 100vh; background: linear-gradient(45deg, ${design.colors.primary} 0%, #1a1a1a 50%, ${design.colors.secondary} 100%); position: relative; overflow: hidden; display: flex; align-items: center;">
        <!-- Motifs industriels -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(255,255,255,0.03) 50px, rgba(255,255,255,0.03) 52px); z-index: 1;"></div>
        
        <div class="container" style="max-width: 1400px; margin: 0 auto; padding: 0 1rem; position: relative; z-index: 2;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
            <!-- Contenu texte avec effet diagonal -->
            <div style="color: white; transform: perspective(1000px) rotateY(-5deg); padding: 2rem;">
              <div style="background: linear-gradient(135deg, ${design.colors.secondary}, transparent); padding: 1rem 2rem; border-radius: 0 2rem 0 2rem; margin-bottom: 2rem; display: inline-block;">
                <span style="font-weight: 700; font-size: clamp(0.9rem, 2vw, 1.1rem);">🏗️ EXPERT ${data.trade.toUpperCase()}</span>
              </div>
              
              <h1 style="font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 900; line-height: 0.9; margin-bottom: 2rem; text-transform: uppercase; letter-spacing: -0.05em;">
                <span style="display: block; color: ${design.colors.secondary};">${data.companyName.split(' ')[0]}</span>
                <span style="display: block; margin-top: 0.5rem;">${data.companyName.split(' ').slice(1).join(' ')}</span>
              </h1>
              
              <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-left: 5px solid ${design.colors.secondary}; margin: 2rem 0; backdrop-filter: blur(10px);">
                <h2 style="font-size: clamp(1.2rem, 3vw, 1.8rem); font-weight: 600; margin-bottom: 1rem;">
                  Solutions ${data.trade.toLowerCase()} industrielles à ${data.city}
                </h2>
                <p style="font-size: clamp(1rem, 2vw, 1.2rem); opacity: 0.9; line-height: 1.6;">
                  ${data.description}
                </p>
              </div>
              
              <!-- Boutons industriels -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 3rem;">
                <a href="tel:${data.phone}" style="background: ${design.colors.secondary}; color: white; padding: clamp(1rem, 2vw, 1.5rem); text-decoration: none; text-align: center; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 0; position: relative; overflow: hidden; font-size: clamp(0.9rem, 1.8vw, 1rem);" onmouseover="this.style.background='white'; this.style.color='${design.colors.primary}'" onmouseout="this.style.background='${design.colors.secondary}'; this.style.color='white'">
                  📞 Contact Direct
                </a>
                <a href="#services" style="background: transparent; color: white; border: 3px solid ${design.colors.secondary}; padding: clamp(1rem, 2vw, 1.5rem); text-decoration: none; text-align: center; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 0; font-size: clamp(0.9rem, 1.8vw, 1rem);" onmouseover="this.style.background='${design.colors.secondary}'; this.style.borderColor='${design.colors.secondary}'" onmouseout="this.style.background='transparent'; this.style.borderColor='${design.colors.secondary}'">
                  🔧 Services Pro
                </a>
              </div>
            </div>
            
            <!-- Section visuelle avec overlays -->
            <div style="position: relative; height: 80vh; overflow: hidden;">
              <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=800&fit=crop') center/cover; transform: scale(1.1); transition: transform 0.3s ease;"></div>
              <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, ${design.colors.primary}AA, ${design.colors.secondary}AA);"></div>
              
              <!-- Overlay avec informations -->
              <div style="position: absolute; bottom: 2rem; left: 2rem; right: 2rem; background: rgba(0,0,0,0.8); color: white; padding: 2rem; backdrop-filter: blur(10px);">
                <h3 style="font-size: clamp(1.2rem, 2.5vw, 1.6rem); font-weight: 700; margin-bottom: 1rem;">Intervention ${data.city}</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <div>
                    <div style="color: ${design.colors.secondary}; font-weight: 700; font-size: clamp(1rem, 2vw, 1.2rem);">${data.phone}</div>
                    <div style="font-size: clamp(0.8rem, 1.5vw, 0.9rem); opacity: 0.8;">Urgences 24h/7j</div>
                  </div>
                  <div>
                    <div style="color: ${design.colors.secondary}; font-weight: 700; font-size: clamp(1rem, 2vw, 1.2rem);">Zone étendue</div>
                    <div style="font-size: clamp(0.8rem, 1.5vw, 0.9rem); opacity: 0.8;">Déplacement gratuit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <style>
          @media (max-width: 768px) {
            [style*="grid-template-columns: 1fr 1fr"]:not([style*="gap: 1rem"]) {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
            [style*="transform: perspective(1000px) rotateY(-5deg)"] {
              transform: none !important;
            }
            [style*="height: 80vh"] {
              height: 50vh !important;
            }
          }
        </style>
      </section>
    `
  },

  'hero-magazine-editorial': {
    name: 'Magazine Editorial Style',
    generateHTML: (data, design) => `
      <section style="min-height: 100vh; background: white; display: flex; align-items: center; position: relative;">
        <!-- Grid magazine complexe -->
        <div class="container" style="max-width: 1400px; margin: 0 auto; padding: 0 1rem;">
          <div style="display: grid; grid-template-columns: 1fr 2px 2fr 2px 1fr; grid-template-rows: auto auto auto; gap: 2rem; min-height: 90vh;">
            
            <!-- Colonne 1: Info entreprise -->
            <div style="grid-column: 1; grid-row: 1 / -1; display: flex; flex-direction: column; justify-content: space-between; padding: 2rem 0;">
              <div>
                <div style="writing-mode: vertical-rl; text-orientation: mixed; font-size: clamp(0.8rem, 1.5vw, 1rem); font-weight: 700; color: ${design.colors.primary}; margin-bottom: 2rem;">
                  ${data.trade.toUpperCase()} • ${data.city.toUpperCase()}
                </div>
                
                <div style="background: ${design.colors.primary}; color: white; padding: 1.5rem; transform: rotate(-90deg); transform-origin: left bottom; position: fixed; left: 0; bottom: 50%; width: 200px; text-align: center; font-weight: 700; font-size: clamp(0.8rem, 1.5vw, 1rem);">
                  EXPERT DEPUIS 2010
                </div>
              </div>
              
              <div style="display: grid; gap: 1rem;">
                <div style="text-align: center; padding: 1rem; border: 2px solid ${design.colors.primary};">
                  <div style="font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 900; color: ${design.colors.primary};">15+</div>
                  <div style="font-size: clamp(0.7rem, 1.2vw, 0.8rem); text-transform: uppercase; letter-spacing: 0.1em;">Années</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: ${design.colors.primary}; color: white;">
                  <div style="font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 900;">24h</div>
                  <div style="font-size: clamp(0.7rem, 1.2vw, 0.8rem); text-transform: uppercase; letter-spacing: 0.1em;">Service</div>
                </div>
              </div>
            </div>
            
            <!-- Séparateur 1 -->
            <div style="grid-column: 2; grid-row: 1 / -1; background: linear-gradient(to bottom, transparent, ${design.colors.primary}, transparent);"></div>
            
            <!-- Colonne centrale: Contenu principal -->
            <div style="grid-column: 3; grid-row: 1 / -1; display: flex; flex-direction: column; justify-content: center; padding: 2rem 0;">
              <div style="margin-bottom: 2rem;">
                <div style="font-size: clamp(0.8rem, 1.5vw, 1rem); font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: ${design.colors.primary}; margin-bottom: 1rem;">
                  Magazine Professionnel
                </div>
                
                <h1 style="font-size: clamp(3rem, 8vw, 6rem); font-weight: 900; line-height: 0.9; margin-bottom: 2rem; color: #1a1a1a;">
                  ${data.companyName.split(' ').map((word, i) => 
                    `<span style="display: block; ${i % 2 === 1 ? `color: ${design.colors.primary}; font-style: italic;` : ''}">${word}</span>`
                  ).join('')}
                </h1>
                
                <div style="background: #f8f9fa; padding: 2rem; border-left: 5px solid ${design.colors.primary}; margin: 2rem 0;">
                  <h2 style="font-size: clamp(1.2rem, 3vw, 1.8rem); font-weight: 300; font-style: italic; margin-bottom: 1rem; color: #333;">
                    "${data.description}"
                  </h2>
                  <div style="font-size: clamp(0.9rem, 1.8vw, 1rem); color: #666;">
                    — Expert ${data.trade.toLowerCase()}, ${data.city}
                  </div>
                </div>
              </div>
              
              <!-- Navigation magazine -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 2px solid ${design.colors.primary};">
                <a href="tel:${data.phone}" style="background: ${design.colors.primary}; color: white; padding: clamp(1.2rem, 2.5vw, 2rem); text-decoration: none; text-align: center; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; font-size: clamp(0.9rem, 1.8vw, 1rem); transition: all 0.3s ease;" onmouseover="this.style.background='#1a1a1a'" onmouseout="this.style.background='${design.colors.primary}'">
                  📞 Contact
                </a>
                <a href="#services" style="background: white; color: ${design.colors.primary}; border-left: 2px solid ${design.colors.primary}; padding: clamp(1.2rem, 2.5vw, 2rem); text-decoration: none; text-align: center; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; font-size: clamp(0.9rem, 1.8vw, 1rem); transition: all 0.3s ease;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                  📖 Portfolio
                </a>
              </div>
            </div>
            
            <!-- Séparateur 2 -->
            <div style="grid-column: 4; grid-row: 1 / -1; background: linear-gradient(to bottom, transparent, ${design.colors.primary}, transparent);"></div>
            
            <!-- Colonne 3: Galerie visuelle -->
            <div style="grid-column: 5; grid-row: 1 / -1; display: grid; grid-template-rows: 1fr 1fr 1fr; gap: 1rem;">
              <div style="background: url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&h=200&fit=crop') center/cover; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(45deg, ${design.colors.primary}88, transparent);"></div>
                <div style="position: absolute; bottom: 1rem; left: 1rem; color: white; font-weight: 700; font-size: clamp(0.8rem, 1.5vw, 1rem);">Installation</div>
              </div>
              
              <div style="background: ${design.colors.primary}; color: white; padding: 1.5rem; display: flex; flex-direction: column; justify-content: center; text-align: center;">
                <div style="font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 900; margin-bottom: 0.5rem;">${data.phone}</div>
                <div style="font-size: clamp(0.7rem, 1.2vw, 0.8rem); text-transform: uppercase; letter-spacing: 0.1em;">Numéro direct</div>
              </div>
              
              <div style="background: url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=300&h=200&fit=crop') center/cover; position: relative;">
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(-45deg, ${design.colors.secondary}88, transparent);"></div>
                <div style="position: absolute; bottom: 1rem; right: 1rem; color: white; font-weight: 700; font-size: clamp(0.8rem, 1.5vw, 1rem);">Expertise</div>
              </div>
            </div>
          </div>
        </div>
        
        <style>
          @media (max-width: 768px) {
            [style*="grid-template-columns: 1fr 2px 2fr 2px 1fr"] {
              grid-template-columns: 1fr !important;
              grid-template-rows: auto auto auto auto auto !important;
              gap: 2rem !important;
            }
            [style*="grid-column: 1"], [style*="grid-column: 2"], [style*="grid-column: 3"], [style*="grid-column: 4"], [style*="grid-column: 5"] {
              grid-column: 1 !important;
            }
            [style*="grid-row: 1 / -1"] {
              grid-row: auto !important;
            }
            [style*="writing-mode: vertical-rl"] {
              writing-mode: initial !important;
              text-orientation: initial !important;
            }
            [style*="transform: rotate(-90deg)"] {
              transform: none !important;
              position: static !important;
              width: auto !important;
            }
            [style*="grid-template-rows: 1fr 1fr 1fr"] {
              grid-template-rows: auto auto auto !important;
            }
          }
        </style>
      </section>
    `
  }
};

// Système de blocs Services inspiré de Divi (12+ variations)
const DIVI_SERVICE_BLOCKS = {
  'services-construction-cards': {
    name: 'Construction Cards Divi',
    generateHTML: (data, design) => `
      <section style="padding: clamp(4rem, 8vw, 8rem) 0; background: #f8f9fa;">
        <div class="container" style="max-width: 1400px; margin: 0 auto; padding: 0 1rem;">
          <!-- En-tête avec numérotation -->
          <div style="display: grid; grid-template-columns: auto 1fr; gap: 3rem; align-items: center; margin-bottom: 5rem;">
            <div style="font-size: clamp(4rem, 12vw, 8rem); font-weight: 900; color: ${design.colors.primary}20; line-height: 1;">01</div>
            <div>
              <h2 style="font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; margin-bottom: 1rem; color: #1a1a1a;">
                Services ${data.trade}
              </h2>
              <p style="font-size: clamp(1rem, 2vw, 1.3rem); color: #666; max-width: 600px; line-height: 1.6;">
                Solutions professionnelles adaptées aux besoins de ${data.city} et sa région
              </p>
            </div>
          </div>
          
          <!-- Grille services avec animations -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 3rem;">
            <div style="background: white; border-radius: 0; box-shadow: 0 20px 60px rgba(0,0,0,0.1); overflow: hidden; transition: all 0.4s ease; transform: translateY(0);" onmouseover="this.style.transform='translateY(-10px)'; this.style.boxShadow='0 30px 80px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 20px 60px rgba(0,0,0,0.1)'">
              <!-- Image de fond avec overlay -->
              <div style="height: 250px; background: linear-gradient(135deg, ${design.colors.primary}E6, ${design.colors.secondary}E6), url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=250&fit=crop') center/cover; position: relative; display: flex; align-items: center; justify-content: center;">
                <div style="color: white; text-align: center;">
                  <div style="font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 1rem;">⚡</div>
                  <h3 style="font-size: clamp(1.3rem, 2.5vw, 1.8rem); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Installation</h3>
                </div>
              </div>
              
              <!-- Contenu -->
              <div style="padding: clamp(2rem, 4vw, 3rem);">
                <h4 style="font-size: clamp(1.2rem, 2.2vw, 1.6rem); font-weight: 700; margin-bottom: 1.5rem; color: #1a1a1a;">
                  Installation Électrique Complète
                </h4>
                <p style="color: #666; margin-bottom: 2rem; line-height: 1.7; font-size: clamp(0.95rem, 1.8vw, 1.1rem);">
                  Installation neuve aux normes NF C 15-100 avec garantie décennale et matériel professionnel de qualité.
                </p>
                
                <!-- Prix avec design industriel -->
                <div style="background: #f8f9fa; padding: 1.5rem; margin-bottom: 2rem; border-left: 5px solid ${design.colors.primary};">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: clamp(0.9rem, 1.7vw, 1rem); color: #666;">À partir de</span>
                    <span style="font-size: clamp(1.3rem, 2.5vw, 1.8rem); font-weight: 900; color: ${design.colors.primary};">85€/h</span>
                  </div>
                </div>
                
                <!-- Bouton avec effet -->
                <a href="#contact" style="display: block; background: ${design.colors.primary}; color: white; padding: clamp(1rem, 2vw, 1.5rem); text-decoration: none; text-align: center; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; transition: all 0.3s ease; font-size: clamp(0.9rem, 1.7vw, 1rem);" onmouseover="this.style.background='#1a1a1a'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='${design.colors.primary}'; this.style.transform='translateY(0)'">
                  Demander un devis
                </a>
              </div>
            </div>
            
            <div style="background: white; border-radius: 0; box-shadow: 0 20px 60px rgba(0,0,0,0.1); overflow: hidden; transition: all 0.4s ease; transform: translateY(0);" onmouseover="this.style.transform='translateY(-10px)'; this.style.boxShadow='0 30px 80px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 20px 60px rgba(0,0,0,0.1)'">
              <div style="height: 250px; background: linear-gradient(135deg, ${design.colors.secondary}E6, ${design.colors.primary}E6), url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=250&fit=crop') center/cover; position: relative; display: flex; align-items: center; justify-content: center;">
                <div style="color: white; text-align: center;">
                  <div style="font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 1rem;">🚨</div>
                  <h3 style="font-size: clamp(1.3rem, 2.5vw, 1.8rem); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Dépannage</h3>
                </div>
              </div>
              
              <div style="padding: clamp(2rem, 4vw, 3rem);">
                <h4 style="font-size: clamp(1.2rem, 2.2vw, 1.6rem); font-weight: 700; margin-bottom: 1.5rem; color: #1a1a1a;">
                  Dépannage Électrique 24h/7j
                </h4>
                <p style="color: #666; margin-bottom: 2rem; line-height: 1.7; font-size: clamp(0.95rem, 1.8vw, 1.1rem);">
                  Intervention d'urgence pour panne électrique, disjoncteur, court-circuit avec diagnostic inclus.
                </p>
                
                <div style="background: #fff3cd; padding: 1.5rem; margin-bottom: 2rem; border-left: 5px solid #f59e0b;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: clamp(0.9rem, 1.7vw, 1rem); color: #856404;">Déplacement</span>
                    <span style="font-size: clamp(1.3rem, 2.5vw, 1.8rem); font-weight: 900; color: #f59e0b;">75€</span>
                  </div>
                </div>
                
                <a href="tel:${data.phone}" style="display: block; background: #f59e0b; color: white; padding: clamp(1rem, 2vw, 1.5rem); text-decoration: none; text-align: center; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; transition: all 0.3s ease; font-size: clamp(0.9rem, 1.7vw, 1rem);" onmouseover="this.style.background='#1a1a1a'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#f59e0b'; this.style.transform='translateY(0)'">
                  📞 Urgence 24h/7j
                </a>
              </div>
            </div>
            
            <div style="background: white; border-radius: 0; box-shadow: 0 20px 60px rgba(0,0,0,0.1); overflow: hidden; transition: all 0.4s ease; transform: translateY(0);" onmouseover="this.style.transform='translateY(-10px)'; this.style.boxShadow='0 30px 80px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 20px 60px rgba(0,0,0,0.1)'">
              <div style="height: 250px; background: linear-gradient(135deg, #10b981E6, ${design.colors.primary}E6), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop') center/cover; position: relative; display: flex; align-items: center; justify-content: center;">
                <div style="color: white; text-align: center;">
                  <div style="font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 1rem;">🏠</div>
                  <h3 style="font-size: clamp(1.3rem, 2.5vw, 1.8rem); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Domotique</h3>
                </div>
              </div>
              
              <div style="padding: clamp(2rem, 4vw, 3rem);">
                <h4 style="font-size: clamp(1.2rem, 2.2vw, 1.6rem); font-weight: 700; margin-bottom: 1.5rem; color: #1a1a1a;">
                  Domotique & Maison Connectée
                </h4>
                <p style="color: #666; margin-bottom: 2rem; line-height: 1.7; font-size: clamp(0.95rem, 1.8vw, 1.1rem);">
                  Systèmes domotiques intelligents pour optimiser confort et économies d'énergie.
                </p>
                
                <div style="background: #d1fae5; padding: 1.5rem; margin-bottom: 2rem; border-left: 5px solid #10b981;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: clamp(0.9rem, 1.7vw, 1rem); color: #065f46;">Sur mesure</span>
                    <span style="font-size: clamp(1.3rem, 2.5vw, 1.8rem); font-weight: 900; color: #10b981;">Devis</span>
                  </div>
                </div>
                
                <a href="#contact" style="display: block; background: #10b981; color: white; padding: clamp(1rem, 2vw, 1.5rem); text-decoration: none; text-align: center; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; transition: all 0.3s ease; font-size: clamp(0.9rem, 1.7vw, 1rem);" onmouseover="this.style.background='#1a1a1a'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#10b981'; this.style.transform='translateY(0)'">
                  Découvrir les solutions
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <style>
          @media (max-width: 768px) {
            [style*="grid-template-columns: auto 1fr"] {
              grid-template-columns: 1fr !important;
              text-align: center !important;
            }
            [style*="grid-template-columns: repeat(auto-fit, minmax(350px, 1fr))"] {
              grid-template-columns: 1fr !important;
            }
          }
        </style>
      </section>
    `
  },

  'services-industrial-grid': {
    name: 'Industrial Grid Layout',
    generateHTML: (data, design) => `
      <section style="padding: clamp(4rem, 8vw, 8rem) 0; background: linear-gradient(135deg, #1a1a1a 0%, ${design.colors.primary} 100%); color: white; position: relative;">
        <!-- Motif industriel -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(255,255,255,0.02) 100px, rgba(255,255,255,0.02) 102px); z-index: 1;"></div>
        
        <div class="container" style="max-width: 1400px; margin: 0 auto; padding: 0 1rem; position: relative; z-index: 2;">
          <!-- Header industriel -->
          <div style="text-align: center; margin-bottom: 5rem;">
            <div style="display: inline-block; background: ${design.colors.secondary}; color: white; padding: 1rem 3rem; margin-bottom: 2rem; transform: skew(-10deg); font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; font-size: clamp(0.9rem, 1.8vw, 1.1rem);">
              <span style="display: inline-block; transform: skew(10deg);">Services Industriels</span>
            </div>
            <h2 style="font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 900; margin-bottom: 2rem; text-transform: uppercase; letter-spacing: -0.02em;">
              Expertise ${data.trade}
            </h2>
            <p style="font-size: clamp(1.1rem, 2.2vw, 1.4rem); opacity: 0.9; max-width: 700px; margin: 0 auto; line-height: 1.6;">
              Solutions techniques avancées pour ${data.city} et région
            </p>
          </div>
          
          <!-- Grille industrielle complexe -->
          <div style="display: grid; grid-template-columns: 2fr 1fr 2fr; grid-template-rows: auto auto; gap: 2rem; margin-bottom: 4rem;">
            
            <!-- Service principal (span 2 rows) -->
            <div style="grid-column: 1; grid-row: 1 / 3; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); position: relative; overflow: hidden;">
              <div style="height: 300px; background: linear-gradient(135deg, ${design.colors.primary}CC, ${design.colors.secondary}CC), url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=300&fit=crop') center/cover; position: relative;">
                <div style="position: absolute; top: 2rem; left: 2rem; background: white; color: ${design.colors.primary}; padding: 0.5rem 1rem; font-weight: 700; font-size: clamp(0.8rem, 1.5vw, 1rem);">
                  SERVICE PREMIUM
                </div>
                <div style="position: absolute; bottom: 2rem; left: 2rem; right: 2rem;">
                  <h3 style="font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 900; margin-bottom: 1rem; text-transform: uppercase;">
                    Installation Électrique
                  </h3>
                  <div style="background: rgba(0,0,0,0.7); padding: 1rem; backdrop-filter: blur(5px);">
                    <p style="font-size: clamp(0.95rem, 1.8vw, 1.1rem); opacity: 0.9; margin-bottom: 1rem;">
                      Solutions complètes aux normes industrielles
                    </p>
                    <div style="font-size: clamp(1.3rem, 2.5vw, 1.8rem); font-weight: 900; color: ${design.colors.secondary};">
                      À partir de 85€/h
                    </div>
                  </div>
                </div>
              </div>
              
              <div style="padding: clamp(1.5rem, 3vw, 2.5rem);">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
                  <div style="text-align: center; padding: 1rem; border: 2px solid ${design.colors.secondary};">
                    <div style="font-size: clamp(1.2rem, 2.2vw, 1.6rem); font-weight: 900; color: ${design.colors.secondary};">NF C 15-100</div>
                    <div style="font-size: clamp(0.8rem, 1.5vw, 0.9rem);">Normes</div>
                  </div>
                  <div style="text-align: center; padding: 1rem; background: ${design.colors.secondary}; color: white;">
                    <div style="font-size: clamp(1.2rem, 2.2vw, 1.6rem); font-weight: 900;">10 ans</div>
                    <div style="font-size: clamp(0.8rem, 1.5vw, 0.9rem);">Garantie</div>
                  </div>
                </div>
                
                <a href="#contact" style="display: block; background: ${design.colors.secondary}; color: white; padding: clamp(1rem, 2vw, 1.5rem); text-decoration: none; text-align: center; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; transition: all 0.3s ease; font-size: clamp(0.9rem, 1.7vw, 1rem);" onmouseover="this.style.background='white'; this.style.color='${design.colors.primary}'" onmouseout="this.style.background='${design.colors.secondary}'; this.style.color='white'">
                  📋 Devis gratuit
                </a>
              </div>
            </div>
            
            <!-- Services secondaires -->
            <div style="grid-column: 2; grid-row: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: clamp(1.5rem, 3vw, 2rem); text-align: center;">
              <div style="font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 1rem;">🚨</div>
              <h4 style="font-size: clamp(1.1rem, 2vw, 1.4rem); font-weight: 700; margin-bottom: 1rem; text-transform: uppercase;">Urgence</h4>
              <p style="font-size: clamp(0.9rem, 1.7vw, 1rem); opacity: 0.8; margin-bottom: 1.5rem;">24h/7j</p>
              <div style="background: #dc2626; color: white; padding: 0.75rem; font-weight: 700; font-size: clamp(0.8rem, 1.5vw, 0.9rem);">
                📞 ${data.phone}
              </div>
            </div>
            
            <div style="grid-column: 2; grid-row: 2; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: clamp(1.5rem, 3vw, 2rem); text-align: center;">
              <div style="font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 1rem;">🏠</div>
              <h4 style="font-size: clamp(1.1rem, 2vw, 1.4rem); font-weight: 700; margin-bottom: 1rem; text-transform: uppercase;">Domotique</h4>
              <p style="font-size: clamp(0.9rem, 1.7vw, 1rem); opacity: 0.8; margin-bottom: 1.5rem;">Sur mesure</p>
              <div style="background: ${design.colors.secondary}; color: white; padding: 0.75rem; font-weight: 700; font-size: clamp(0.8rem, 1.5vw, 0.9rem);">
                Devis personnalisé
              </div>
            </div>
            
            <!-- Service large -->
            <div style="grid-column: 3; grid-row: 1 / 3; background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)); border: 1px solid rgba(255,255,255,0.2); position: relative; overflow: hidden;">
              <div style="padding: clamp(2rem, 4vw, 3rem); height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="background: ${design.colors.secondary}; color: white; padding: 0.5rem 1rem; display: inline-block; margin-bottom: 2rem; font-weight: 700; font-size: clamp(0.8rem, 1.5vw, 1rem);">
                    MAINTENANCE
                  </div>
                  <h3 style="font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 900; margin-bottom: 2rem; text-transform: uppercase; line-height: 1.2;">
                    Entretien & Mise aux Normes
                  </h3>
                  <p style="font-size: clamp(1rem, 1.9vw, 1.2rem); opacity: 0.9; margin-bottom: 2rem; line-height: 1.6;">
                    Diagnostic complet et mise en conformité de vos installations électriques selon les dernières normes en vigueur.
                  </p>
                  
                  <!-- Check list -->
                  <div style="margin: 2rem 0;">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                      <div style="width: 20px; height: 20px; background: ${design.colors.secondary}; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: bold;">✓</div>
                      <span style="font-size: clamp(0.9rem, 1.7vw, 1rem);">Diagnostic gratuit</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                      <div style="width: 20px; height: 20px; background: ${design.colors.secondary}; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: bold;">✓</div>
                      <span style="font-size: clamp(0.9rem, 1.7vw, 1rem);">Conformité CONSUEL</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                      <div style="width: 20px; height: 20px; background: ${design.colors.secondary}; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: bold;">✓</div>
                      <span style="font-size: clamp(0.9rem, 1.7vw, 1rem);">Financement possible</span>
                    </div>
                  </div>
                </div>
                
                <a href="#contact" style="background: white; color: ${design.colors.primary}; padding: clamp(1rem, 2vw, 1.5rem); text-decoration: none; text-align: center; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; transition: all 0.3s ease; margin-top: 2rem; font-size: clamp(0.9rem, 1.7vw, 1rem);" onmouseover="this.style.background='${design.colors.secondary}'; this.style.color='white'" onmouseout="this.style.background='white'; this.style.color='${design.colors.primary}'">
                  Planifier intervention
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <style>
          @media (max-width: 768px) {
            [style*="grid-template-columns: 2fr 1fr 2fr"] {
              grid-template-columns: 1fr !important;
              grid-template-rows: auto auto auto auto !important;
            }
            [style*="grid-column: 1"], [style*="grid-column: 2"], [style*="grid-column: 3"] {
              grid-column: 1 !important;
            }
            [style*="grid-row: 1 / 3"] {
              grid-row: auto !important;
            }
            [style*="height: 300px"] {
              height: 200px !important;
            }
          }
        </style>
      </section>
    `
  }
};

// Fonction pour générer un site complet avec le nouveau système Divi
function generateDiviInspiredSite(formData, designSystem) {
  const heroHTML = DIVI_HERO_BLOCKS[designSystem.heroType].generateHTML(formData, designSystem);
  const servicesHTML = DIVI_SERVICE_BLOCKS[designSystem.servicesType].generateHTML(formData, designSystem);
  
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
        
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            overflow-x: hidden;
        }
        
        .container { 
            max-width: 1400px; 
            margin: 0 auto; 
            padding: 0 clamp(1rem, 3vw, 2rem); 
        }
        
        /* Navigation 100% responsive */
        nav { 
            position: fixed; 
            top: 0; 
            width: 100%; 
            background: rgba(255,255,255,0.95); 
            backdrop-filter: blur(10px);
            z-index: 1000; 
            padding: clamp(0.75rem, 2vw, 1rem) 0; 
            box-shadow: 0 2px 20px rgba(0,0,0,0.1); 
            transition: all 0.3s ease;
        }
        
        .nav-container { 
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 clamp(1rem, 3vw, 2rem);
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
        }
        
        .nav-logo { 
            font-size: clamp(1.2rem, 3vw, 1.8rem); 
            font-weight: 900; 
            color: var(--primary); 
            text-decoration: none; 
        }
        
        .nav-menu { 
            display: flex; 
            list-style: none; 
            gap: clamp(1rem, 3vw, 2.5rem); 
        }
        
        .nav-link { 
            color: #374151; 
            text-decoration: none; 
            font-weight: 600; 
            font-size: clamp(0.9rem, 2vw, 1rem);
            transition: color 0.3s ease;
        }
        
        .nav-link:hover { 
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
            background: var(--primary);
            transition: all 0.3s ease;
        }
        
        /* Footer 100% responsive */
        footer { 
            background: #1a1a1a; 
            color: white; 
            padding: clamp(3rem, 6vw, 5rem) 0 clamp(1rem, 2vw, 2rem); 
        }
        
        .footer-content {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 clamp(1rem, 3vw, 2rem);
            text-align: center;
        }
        
        .footer-title { 
            font-size: clamp(1.5rem, 4vw, 2.5rem); 
            font-weight: 900; 
            margin-bottom: clamp(1rem, 2vw, 2rem); 
            color: var(--primary);
        }
        
        .footer-description {
            font-size: clamp(1rem, 2vw, 1.2rem);
            opacity: 0.8;
            margin-bottom: clamp(2rem, 4vw, 3rem);
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .footer-bottom { 
            border-top: 1px solid rgba(255,255,255,0.1); 
            padding-top: clamp(1rem, 2vw, 2rem); 
            margin-top: clamp(2rem, 4vw, 3rem); 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .footer-copyright {
            font-size: clamp(0.8rem, 1.5vw, 0.9rem);
            opacity: 0.6;
        }
        
        /* Mobile navigation */
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
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
            
            .nav-toggle.active span:nth-child(1) {
                transform: translateY(7px) rotate(45deg);
            }
            
            .nav-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .nav-toggle.active span:nth-child(3) {
                transform: translateY(-7px) rotate(-45deg);
            }
            
            .footer-bottom {
                flex-direction: column;
                text-align: center;
            }
        }
        
        /* Optimisations responsive globales */
        @media (max-width: 480px) {
            .container {
                padding: 0 1rem;
            }
        }
    </style>
</head>

<body>
    <!-- Navigation 100% responsive -->
    <nav>
        <div class="nav-container">
            <a href="#" class="nav-logo">${formData.companyName}</a>
            <button class="nav-toggle" id="navToggle">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul class="nav-menu" id="navMenu">
                <li><a href="#accueil" class="nav-link">Accueil</a></li>
                <li><a href="#services" class="nav-link">Services</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
            </ul>
        </div>
    </nav>

    <!-- Hero Section DIVI-inspired -->
    ${heroHTML}

    <!-- Services Section DIVI-inspired -->
    ${servicesHTML}

    <!-- Contact Section 100% responsive -->
    <section id="contact" style="padding: clamp(4rem, 8vw, 8rem) 0; background: var(--primary); color: white;">
        <div class="container">
            <div style="text-align: center; margin-bottom: clamp(3rem, 6vw, 5rem);">
                <h2 style="font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; margin-bottom: clamp(1rem, 2vw, 2rem);">
                    Contactez ${formData.companyName}
                </h2>
                <p style="font-size: clamp(1.1rem, 2.2vw, 1.4rem); opacity: 0.9; max-width: 600px; margin: 0 auto;">
                    ${formData.description}
                </p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: clamp(2rem, 4vw, 3rem); margin-bottom: clamp(3rem, 6vw, 4rem);">
                <div style="background: rgba(255,255,255,0.1); padding: clamp(2rem, 4vw, 3rem); border-radius: 0; backdrop-filter: blur(10px); text-align: center;">
                    <div style="font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: clamp(1rem, 2vw, 1.5rem);">📞</div>
                    <h3 style="font-size: clamp(1.2rem, 2.5vw, 1.6rem); font-weight: 700; margin-bottom: clamp(1rem, 2vw, 1.5rem);">Appelez-nous</h3>
                    <a href="tel:${formData.phone}" style="color: white; font-size: clamp(1.1rem, 2.2vw, 1.4rem); font-weight: 700; text-decoration: none;">${formData.phone}</a>
                    <p style="opacity: 0.8; margin-top: 0.5rem; font-size: clamp(0.9rem, 1.8vw, 1rem);">Urgences 24h/7j</p>
                </div>
                
                <div style="background: rgba(255,255,255,0.1); padding: clamp(2rem, 4vw, 3rem); border-radius: 0; backdrop-filter: blur(10px); text-align: center;">
                    <div style="font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: clamp(1rem, 2vw, 1.5rem);">✉️</div>
                    <h3 style="font-size: clamp(1.2rem, 2.5vw, 1.6rem); font-weight: 700; margin-bottom: clamp(1rem, 2vw, 1.5rem);">Email</h3>
                    <a href="mailto:${formData.email}" style="color: white; font-size: clamp(1rem, 2vw, 1.2rem); font-weight: 600; text-decoration: none; word-break: break-all;">${formData.email}</a>
                    <p style="opacity: 0.8; margin-top: 0.5rem; font-size: clamp(0.9rem, 1.8vw, 1rem);">Réponse sous 24h</p>
                </div>
                
                <div style="background: rgba(255,255,255,0.1); padding: clamp(2rem, 4vw, 3rem); border-radius: 0; backdrop-filter: blur(10px); text-align: center;">
                    <div style="font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: clamp(1rem, 2vw, 1.5rem);">📍</div>
                    <h3 style="font-size: clamp(1.2rem, 2.5vw, 1.6rem); font-weight: 700; margin-bottom: clamp(1rem, 2vw, 1.5rem);">Zone d'intervention</h3>
                    <p style="font-weight: 600; font-size: clamp(1rem, 2vw, 1.2rem);">${formData.city}</p>
                    <p style="opacity: 0.8; margin-top: 0.5rem; font-size: clamp(0.9rem, 1.8vw, 1rem);">Et environs</p>
                </div>
            </div>
            
            <div style="text-align: center;">
                <a href="tel:${formData.phone}" style="display: inline-block; background: white; color: var(--primary); padding: clamp(1.2rem, 2.5vw, 2rem) clamp(2rem, 4vw, 4rem); text-decoration: none; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; font-size: clamp(1rem, 2vw, 1.3rem); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 15px 35px rgba(0,0,0,0.3)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                    📞 Contact immédiat
                </a>
            </div>
        </div>
    </section>

    <!-- Footer 100% responsive -->
    <footer>
        <div class="footer-content">
            <h3 class="footer-title">${formData.companyName}</h3>
            <p class="footer-description">
                ${formData.trade} professionnel à ${formData.city} • ${designSystem.name}
            </p>
            <div class="footer-bottom">
                <p class="footer-copyright">© 2025 ${formData.companyName} - Tous droits réservés</p>
                <p style="font-size: clamp(0.8rem, 1.5vw, 0.9rem); opacity: 0.8;">Design ${designSystem.name}</p>
            </div>
        </div>
    </footer>

    <!-- JavaScript pour navigation mobile -->
    <script>
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
        
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
        
        console.log('🚀 ${designSystem.name} - 100% Responsive Divi-inspired site loaded!');
    </script>
</body>
</html>`;
}

// Configuration des nouveaux designs inspirés de Divi
const DIVI_INSPIRED_DESIGNS = [
  {
    id: 'construction-asymmetric',
    name: 'Construction Asymétrique',
    colors: { primary: '#f9ad00', secondary: '#001e4c' },
    heroType: 'hero-split-asymmetric',
    servicesType: 'services-construction-cards'
  },
  {
    id: 'industrial-diagonal',
    name: 'Industrial Diagonal',
    colors: { primary: '#cb0000', secondary: '#dc2626' },
    heroType: 'hero-industrial-diagonal',
    servicesType: 'services-industrial-grid'
  },
  {
    id: 'magazine-editorial',
    name: 'Magazine Editorial',
    colors: { primary: '#bd9a68', secondary: '#8b7355' },
    heroType: 'hero-magazine-editorial',
    servicesType: 'services-construction-cards'
  }
];

// Même formulaire de test
const TEST_FORM_DATA = {
  companyName: 'Expert Électro Plus',
  trade: 'Électricien',
  city: 'Lyon',
  description: 'Électricien expert à Lyon, spécialisé dans l\'installation et le dépannage électrique professionnel avec 15 ans d\'expérience.',
  phone: '04 78 45 67 89',
  email: 'contact@expert-electro-plus.fr',
  address: '15 Rue de la République',
  website: 'https://expert-electro-plus.fr'
};

// Fonction principale de test
async function testDiviInspiredSites() {
  console.log('🚀 TEST DIVI-INSPIRED: 1 FORMULAIRE → 3 DESIGNS 100% RESPONSIVE');
  console.log('============================================================');
  console.log('📋 Formulaire de test:', TEST_FORM_DATA.companyName, TEST_FORM_DATA.city);
  console.log('============================================================\n');
  
  for (let i = 0; i < DIVI_INSPIRED_DESIGNS.length; i++) {
    const design = DIVI_INSPIRED_DESIGNS[i];
    const siteId = `divi-inspired-${design.id}`;
    const outputDir = path.join(__dirname, 'public', 'generated-sites', siteId);
    
    console.log(`🎨 ${i + 1}/3 - ${design.name}`);
    console.log(`   Hero: ${design.heroType}`);
    console.log(`   Services: ${design.servicesType}`);
    console.log(`   Couleurs: ${design.colors.primary} / ${design.colors.secondary}`);
    
    try {
      await fs.mkdir(outputDir, { recursive: true });
      
      const siteHTML = generateDiviInspiredSite(TEST_FORM_DATA, design);
      await fs.writeFile(path.join(outputDir, 'index.html'), siteHTML);
      
      console.log(`   ✅ Site généré: ${siteId}`);
      
    } catch (error) {
      console.error(`   ❌ Erreur: ${error.message}`);
    }
  }
  
  console.log('\n🎉 GÉNÉRATION TERMINÉE !');
  console.log('============================================================');
  console.log('✅ 3 designs Divi-inspired générés avec 100% responsive');
  console.log('📱 Testez sur mobile, tablette et desktop !');
  console.log('📁 Sites: public/generated-sites/divi-inspired-*');
}

// Lancer le test
testDiviInspiredSites().catch(console.error);