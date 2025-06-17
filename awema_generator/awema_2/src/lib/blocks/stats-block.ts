// Bloc Stats (Statistiques) ultra-professionnel avec animations et compteurs
import { BaseBlock, BlockType, DesignStyle, BlockOptions, TemplateData } from './block-system'

export class StatsBlock extends BaseBlock {
  type: BlockType = 'stats'
  variants = ['standard', 'animated', 'circular', 'minimal', 'ultra-pro']

  render(variant: string): string {
    const style = this.getDesignStyle()
    
    switch (variant) {
      case 'ultra-pro':
        return this.renderUltraPro(style)
      case 'animated':
        return this.renderAnimated(style)
      case 'circular':
        return this.renderCircular(style)
      case 'minimal':
        return this.renderMinimal(style)
      default:
        return this.renderStandard(style)
    }
  }

  // Stats Ultra-Pro avec animations avancées et glassmorphism
  private renderUltraPro(style: DesignStyle): string {
    const colors = this.getColorPalette(style)
    const stats = this.generateStats(style)
    
    return `
      <section class="stats-ultra-pro" style="
        background: linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}05);
        padding: 5rem 2rem;
        position: relative;
        overflow: hidden;
      ">
        <!-- Background pattern -->
        <div class="stats-pattern" style="
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: 
            linear-gradient(30deg, ${colors.primary}08 12%, transparent 12.5%, transparent 87%, ${colors.primary}08 87.5%, ${colors.primary}08),
            linear-gradient(150deg, ${colors.primary}08 12%, transparent 12.5%, transparent 87%, ${colors.primary}08 87.5%, ${colors.primary}08);
          background-size: 60px 60px;
          animation: statsPattern 20s linear infinite;
        "></div>
        
        <div class="container" style="
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        ">
          <!-- Header -->
          <div class="stats-header" style="
            text-align: center;
            margin-bottom: 4rem;
          ">
            <div class="trust-indicator" style="
              display: inline-block;
              background: ${colors.primary};
              color: white;
              padding: 0.5rem 1.5rem;
              border-radius: 50px;
              font-size: 0.9rem;
              font-weight: 600;
              margin-bottom: 1.5rem;
              position: relative;
              overflow: hidden;
            ">
              <span style="position: relative; z-index: 2;">📊 Nos performances en chiffres</span>
              <div class="shimmer" style="
                position: absolute;
                top: 0; left: -100%;
                width: 100%; height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                animation: shimmer 2s infinite;
              "></div>
            </div>
            
            <h2 style="
              font-size: 2.5rem;
              font-weight: 800;
              background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 1rem;
            ">
              Des chiffres qui parlent
            </h2>
            
            <p style="
              font-size: 1.2rem;
              color: ${colors.text};
              max-width: 600px;
              margin: 0 auto;
            ">
              Découvrez pourquoi nous sommes le choix n°1 pour vos projets ${this.data.trade?.toLowerCase()}
            </p>
          </div>
          
          <!-- Stats Grid -->
          <div class="stats-grid" style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
          ">
            ${stats.map((stat, index) => `
              <div class="stat-card" style="
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 1.5rem;
                padding: 2.5rem 2rem;
                text-align: center;
                position: relative;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
                animation: statSlideUp 0.6s ease forwards;
                animation-delay: ${index * 0.1}s;
                opacity: 0;
                transform: translateY(30px);
              " onmouseover="this.style.transform='translateY(-10px) scale(1.02)'; this.style.boxShadow='0 30px 60px rgba(0,0,0,0.15)'"
                 onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.1)'">
                
                <!-- Gradient overlay -->
                <div style="
                  position: absolute;
                  top: 0; left: 0; right: 0;
                  height: 4px;
                  background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.accent});
                "></div>
                
                <!-- Icon -->
                <div class="stat-icon" style="
                  width: 80px;
                  height: 80px;
                  margin: 0 auto 1.5rem auto;
                  background: linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20);
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 2rem;
                  position: relative;
                  overflow: hidden;
                ">
                  <div style="
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: linear-gradient(45deg, ${colors.primary}10, transparent, ${colors.accent}10);
                    animation: iconRotate 4s linear infinite;
                  "></div>
                  <span style="position: relative; z-index: 2;">${stat.icon}</span>
                </div>
                
                <!-- Number with animation -->
                <div class="stat-number" style="
                  font-size: 3rem;
                  font-weight: 900;
                  color: ${colors.primary};
                  margin-bottom: 0.5rem;
                  line-height: 1;
                  position: relative;
                ">
                  <span class="counter" data-target="${stat.number}">${stat.number}</span>
                  <span style="font-size: 1.5rem; color: ${colors.secondary};">${stat.suffix}</span>
                </div>
                
                <!-- Label -->
                <div class="stat-label" style="
                  font-size: 1.1rem;
                  font-weight: 600;
                  color: ${colors.primary};
                  margin-bottom: 0.5rem;
                ">
                  ${stat.label}
                </div>
                
                <!-- Description -->
                <div class="stat-description" style="
                  font-size: 0.9rem;
                  color: ${colors.text};
                  opacity: 0.8;
                  line-height: 1.4;
                ">
                  ${stat.description}
                </div>
                
                <!-- Progress bar for some stats -->
                ${stat.showProgress ? `
                  <div style="
                    width: 100%;
                    height: 4px;
                    background: ${colors.primary}20;
                    border-radius: 2px;
                    margin-top: 1rem;
                    overflow: hidden;
                  ">
                    <div style="
                      width: ${stat.progress}%;
                      height: 100%;
                      background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary});
                      border-radius: 2px;
                      animation: progressFill 2s ease-out ${index * 0.2}s forwards;
                      transform: translateX(-100%);
                    "></div>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
          
          <!-- Trust indicators -->
          <div class="trust-section" style="
            margin-top: 4rem;
            text-align: center;
          ">
            <div style="
              background: white;
              border-radius: 1.5rem;
              padding: 2rem;
              box-shadow: 0 15px 30px rgba(0,0,0,0.08);
              border: 1px solid ${colors.primary}10;
            ">
              <h3 style="
                font-size: 1.5rem;
                font-weight: 700;
                color: ${colors.primary};
                margin-bottom: 1.5rem;
              ">
                Certifications & Garanties
              </h3>
              
              <div style="
                display: flex;
                justify-content: center;
                gap: 2rem;
                flex-wrap: wrap;
                align-items: center;
              ">
                <div style="
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                  padding: 0.5rem 1rem;
                  background: ${colors.primary}10;
                  border-radius: 50px;
                  font-weight: 600;
                  color: ${colors.primary};
                ">
                  🛡️ Garantie décennale
                </div>
                
                <div style="
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                  padding: 0.5rem 1rem;
                  background: ${colors.primary}10;
                  border-radius: 50px;
                  font-weight: 600;
                  color: ${colors.primary};
                ">
                  ⭐ Certifié RGE
                </div>
                
                <div style="
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                  padding: 0.5rem 1rem;
                  background: ${colors.primary}10;
                  border-radius: 50px;
                  font-weight: 600;
                  color: ${colors.primary};
                ">
                  📞 Service 24h/7j
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <style>
          @keyframes statsPattern {
            0% { transform: translateX(0) translateY(0); }
            100% { transform: translateX(60px) translateY(60px); }
          }
          
          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          
          @keyframes statSlideUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes iconRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes progressFill {
            to {
              transform: translateX(0);
            }
          }
          
          @keyframes countUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @media (max-width: 768px) {
            .stats-ultra-pro {
              padding: 3rem 1rem !important;
            }
            
            .stats-grid {
              grid-template-columns: 1fr !important;
              gap: 1.5rem !important;
            }
            
            .stats-ultra-pro h2 {
              font-size: 2rem !important;
            }
            
            .stat-number {
              font-size: 2.5rem !important;
            }
            
            .trust-section > div > div {
              flex-direction: column !important;
              gap: 1rem !important;
            }
          }
        </style>
        
        <script>
          // Animation des compteurs
          function animateCounters() {
            const counters = document.querySelectorAll('.counter');
            
            counters.forEach(counter => {
              const target = parseInt(counter.getAttribute('data-target'));
              const duration = 2000; // 2 secondes
              const increment = target / (duration / 16); // 60fps
              let current = 0;
              
              const updateCounter = () => {
                if (current < target) {
                  current += increment;
                  if (current > target) current = target;
                  counter.textContent = Math.floor(current);
                  requestAnimationFrame(updateCounter);
                } else {
                  counter.textContent = target;
                }
              };
              
              // Démarrer l'animation quand l'élément est visible
              const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    setTimeout(updateCounter, 500);
                    observer.unobserve(entry.target);
                  }
                });
              });
              
              observer.observe(counter);
            });
          }
          
          // Démarrer les animations au chargement
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', animateCounters);
          } else {
            animateCounters();
          }
        </script>
      </section>
    `
  }

  // Stats animées simples
  private renderAnimated(style: DesignStyle): string {
    const colors = this.getColorPalette(style)
    const stats = this.generateStats(style)
    
    return `
      <section class="stats-animated" style="
        background: ${colors.primary};
        color: white;
        padding: 4rem 2rem;
        position: relative;
        overflow: hidden;
      ">
        <div style="
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.1);
        "></div>
        
        <div class="container" style="
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        ">
          <h2 style="
            font-size: 2.2rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 3rem;
          ">
            Nos performances
          </h2>
          
          <div style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            text-align: center;
          ">
            ${stats.slice(0, 4).map((stat, index) => `
              <div class="animated-stat" style="
                animation: statFadeIn 0.6s ease forwards;
                animation-delay: ${index * 0.2}s;
                opacity: 0;
              ">
                <div style="
                  font-size: 2.5rem;
                  margin-bottom: 1rem;
                ">
                  ${stat.icon}
                </div>
                
                <div style="
                  font-size: 3rem;
                  font-weight: 900;
                  margin-bottom: 0.5rem;
                ">
                  <span class="counter" data-target="${stat.number}">${stat.number}</span>${stat.suffix}
                </div>
                
                <div style="
                  font-size: 1.2rem;
                  font-weight: 600;
                  opacity: 0.9;
                ">
                  ${stat.label}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <style>
          @keyframes statFadeIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animated-stat {
            transform: translateY(20px);
          }
        </style>
      </section>
    `
  }

  // Stats circulaires avec progress bars
  private renderCircular(style: DesignStyle): string {
    const colors = this.getColorPalette(style)
    const stats = this.generateStats(style)
    
    return `
      <section class="stats-circular" style="
        background: ${colors.background};
        padding: 4rem 2rem;
      ">
        <div class="container" style="
          max-width: 1000px;
          margin: 0 auto;
        ">
          <h2 style="
            font-size: 2.2rem;
            font-weight: 700;
            color: ${colors.primary};
            text-align: center;
            margin-bottom: 3rem;
          ">
            Notre expertise en chiffres
          </h2>
          
          <div style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 3rem;
            text-align: center;
          ">
            ${stats.slice(0, 4).map((stat, index) => `
              <div class="circular-stat">
                <div style="
                  position: relative;
                  width: 150px;
                  height: 150px;
                  margin: 0 auto 1.5rem auto;
                ">
                  <!-- Background circle -->
                  <svg width="150" height="150" style="transform: rotate(-90deg);">
                    <circle
                      cx="75" cy="75" r="65"
                      fill="none"
                      stroke="${colors.primary}20"
                      stroke-width="8"
                    />
                    <circle
                      cx="75" cy="75" r="65"
                      fill="none"
                      stroke="${colors.primary}"
                      stroke-width="8"
                      stroke-dasharray="408"
                      stroke-dashoffset="408"
                      stroke-linecap="round"
                      style="
                        animation: circleProgress 2s ease-out ${index * 0.3}s forwards;
                      "
                    />
                  </svg>
                  
                  <!-- Center content -->
                  <div style="
                    position: absolute;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                  ">
                    <div style="
                      font-size: 1.5rem;
                      margin-bottom: 0.5rem;
                    ">
                      ${stat.icon}
                    </div>
                    <div style="
                      font-size: 1.5rem;
                      font-weight: 700;
                      color: ${colors.primary};
                    ">
                      ${stat.number}${stat.suffix}
                    </div>
                  </div>
                </div>
                
                <h3 style="
                  font-size: 1.2rem;
                  font-weight: 600;
                  color: ${colors.primary};
                  margin-bottom: 0.5rem;
                ">
                  ${stat.label}
                </h3>
                
                <p style="
                  color: ${colors.text};
                  font-size: 0.9rem;
                ">
                  ${stat.description}
                </p>
              </div>
            `).join('')}
          </div>
        </div>
        
        <style>
          @keyframes circleProgress {
            to {
              stroke-dashoffset: 0;
            }
          }
        </style>
      </section>
    `
  }

  // Stats minimales et épurées
  private renderMinimal(style: DesignStyle): string {
    const colors = this.getColorPalette(style)
    const stats = this.generateStats(style)
    
    return `
      <section class="stats-minimal" style="
        background: white;
        padding: 3rem 2rem;
        border-top: 1px solid ${colors.primary}20;
        border-bottom: 1px solid ${colors.primary}20;
      ">
        <div class="container" style="
          max-width: 800px;
          margin: 0 auto;
        ">
          <div style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 2rem;
            text-align: center;
          ">
            ${stats.slice(0, 4).map(stat => `
              <div>
                <div style="
                  font-size: 2.5rem;
                  font-weight: 900;
                  color: ${colors.primary};
                  margin-bottom: 0.5rem;
                ">
                  ${stat.number}${stat.suffix}
                </div>
                <div style="
                  font-size: 1rem;
                  color: ${colors.text};
                  font-weight: 500;
                ">
                  ${stat.label}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `
  }

  // Stats standard
  private renderStandard(style: DesignStyle): string {
    const colors = this.getColorPalette(style)
    const stats = this.generateStats(style)
    
    return `
      <section class="stats-standard" style="
        background: ${colors.background};
        padding: 4rem 2rem;
      ">
        <div class="container" style="
          max-width: 1000px;
          margin: 0 auto;
        ">
          <h2 style="
            font-size: 2.2rem;
            font-weight: 700;
            color: ${colors.primary};
            text-align: center;
            margin-bottom: 3rem;
          ">
            Nos chiffres clés
          </h2>
          
          <div style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            text-align: center;
          ">
            ${stats.map(stat => `
              <div style="
                background: white;
                padding: 2rem;
                border-radius: 1rem;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                border-top: 4px solid ${colors.primary};
              ">
                <div style="
                  font-size: 2rem;
                  margin-bottom: 1rem;
                ">
                  ${stat.icon}
                </div>
                
                <div style="
                  font-size: 2.5rem;
                  font-weight: 900;
                  color: ${colors.primary};
                  margin-bottom: 0.5rem;
                ">
                  ${stat.number}${stat.suffix}
                </div>
                
                <div style="
                  font-size: 1.1rem;
                  font-weight: 600;
                  color: ${colors.text};
                  margin-bottom: 0.5rem;
                ">
                  ${stat.label}
                </div>
                
                <div style="
                  font-size: 0.9rem;
                  color: ${colors.text};
                  opacity: 0.8;
                ">
                  ${stat.description}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `
  }

  // Méthodes utilitaires
  private getDesignStyle(): DesignStyle {
    const trade = this.data.trade?.toLowerCase()
    if (trade?.includes('électricien') || trade?.includes('electrique')) return 'electricien'
    if (trade?.includes('plombier') || trade?.includes('plomberie')) return 'plombier'
    if (trade?.includes('chauffagiste') || trade?.includes('chauffage')) return 'chauffagiste'
    if (trade?.includes('multi') || trade?.includes('bâtiment')) return 'multi'
    return 'universal'
  }

  private getColorPalette(style: DesignStyle) {
    const palettes = {
      electricien: {
        primary: '#1e40af',
        secondary: '#3b82f6',
        accent: '#fbbf24',
        background: '#f8fafc',
        text: '#475569'
      },
      plombier: {
        primary: '#0ea5e9',
        secondary: '#06b6d4',
        accent: '#f97316',
        background: '#f0f9ff',
        text: '#475569'
      },
      chauffagiste: {
        primary: '#ea580c',
        secondary: '#dc2626',
        accent: '#fbbf24',
        background: '#fef7ec',
        text: '#92400e'
      },
      multi: {
        primary: '#7c3aed',
        secondary: '#8b5cf6',
        accent: '#f59e0b',
        background: '#faf5ff',
        text: '#6b21a8'
      },
      universal: {
        primary: '#374151',
        secondary: '#6b7280',
        accent: '#3b82f6',
        background: '#f9fafb',
        text: '#4b5563'
      }
    }
    return palettes[style] || palettes.universal
  }

  private generateStats(style: DesignStyle) {
    const trade = this.data.trade?.toLowerCase() || 'artisan'
    
    const statsByTrade = {
      electricien: [
        {
          number: 500,
          suffix: '+',
          label: 'Clients satisfaits',
          description: 'Installations électriques réalisées',
          icon: '👥',
          showProgress: true,
          progress: 95
        },
        {
          number: 15,
          suffix: '',
          label: 'Années d\'expérience',
          description: 'Au service des particuliers',
          icon: '⚡',
          showProgress: false,
          progress: 100
        },
        {
          number: 24,
          suffix: 'h',
          label: 'Service d\'urgence',
          description: 'Disponible 7 jours sur 7',
          icon: '🚨',
          showProgress: true,
          progress: 100
        },
        {
          number: 100,
          suffix: '%',
          label: 'Aux normes',
          description: 'Conformité NF C 15-100',
          icon: '✅',
          showProgress: true,
          progress: 100
        },
        {
          number: 48,
          suffix: 'h',
          label: 'Délai moyen',
          description: 'Pour intervention',
          icon: '⏱️',
          showProgress: true,
          progress: 80
        },
        {
          number: 4,
          suffix: '.9/5',
          label: 'Note moyenne',
          description: 'Avis clients vérifiés',
          icon: '⭐',
          showProgress: true,
          progress: 98
        }
      ],
      plombier: [
        {
          number: 450,
          suffix: '+',
          label: 'Interventions',
          description: 'Réparations et installations',
          icon: '🔧',
          showProgress: true,
          progress: 92
        },
        {
          number: 12,
          suffix: '',
          label: 'Années d\'expérience',
          description: 'Expertise plomberie',
          icon: '💧',
          showProgress: false,
          progress: 100
        },
        {
          number: 2,
          suffix: 'h',
          label: 'Délai d\'urgence',
          description: 'Intervention rapide',
          icon: '🚨',
          showProgress: true,
          progress: 95
        },
        {
          number: 98,
          suffix: '%',
          label: 'Succès première intervention',
          description: 'Réparation efficace',
          icon: '✅',
          showProgress: true,
          progress: 98
        },
        {
          number: 365,
          suffix: 'j',
          label: 'Disponibilité',
          description: 'Service toute l\'année',
          icon: '📅',
          showProgress: true,
          progress: 100
        },
        {
          number: 5,
          suffix: '/5',
          label: 'Satisfaction',
          description: 'Note clients',
          icon: '⭐',
          showProgress: true,
          progress: 100
        }
      ],
      chauffagiste: [
        {
          number: 300,
          suffix: '+',
          label: 'Installations',
          description: 'Systèmes de chauffage',
          icon: '🔥',
          showProgress: true,
          progress: 88
        },
        {
          number: 20,
          suffix: '',
          label: 'Années d\'expérience',
          description: 'Expertise chauffage',
          icon: '🏠',
          showProgress: false,
          progress: 100
        },
        {
          number: 30,
          suffix: '%',
          label: 'Économies moyennes',
          description: 'Sur facture énergétique',
          icon: '💰',
          showProgress: true,
          progress: 85
        },
        {
          number: 100,
          suffix: '%',
          label: 'Certifié RGE',
          description: 'Aides financières garanties',
          icon: '🛡️',
          showProgress: true,
          progress: 100
        },
        {
          number: 10,
          suffix: 'ans',
          label: 'Garantie',
          description: 'Sur nos installations',
          icon: '⚙️',
          showProgress: true,
          progress: 100
        },
        {
          number: 4,
          suffix: '.8/5',
          label: 'Satisfaction',
          description: 'Avis clients',
          icon: '⭐',
          showProgress: true,
          progress: 96
        }
      ]
    }
    
    const tradeKey = style === 'electricien' ? 'electricien' 
                   : style === 'plombier' ? 'plombier' 
                   : style === 'chauffagiste' ? 'chauffagiste' 
                   : 'electricien'
    
    return statsByTrade[tradeKey] || statsByTrade.electricien
  }
}