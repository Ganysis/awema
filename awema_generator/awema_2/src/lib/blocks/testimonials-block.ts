// Bloc Testimonials (Témoignages) ultra-professionnel pour crédibilité et social proof
import { BaseBlock, BlockType, DesignStyle, BlockOptions, TemplateData } from './block-system'

export class TestimonialsBlock extends BaseBlock {
  type: BlockType = 'testimonials'
  variants = ['grid', 'carousel', 'single', 'wall', 'ultra-pro']

  render(variant: string): string {
    const style = this.getDesignStyle()
    
    switch (variant) {
      case 'ultra-pro':
        return this.renderUltraPro(style)
      case 'carousel':
        return this.renderCarousel(style)
      case 'single':
        return this.renderSingle(style)
      case 'wall':
        return this.renderWall(style)
      default:
        return this.renderGrid(style)
    }
  }

  // Testimonials Ultra-Pro avec animations et design premium
  private renderUltraPro(style: DesignStyle): string {
    const colors = this.getColorPalette(style)
    const testimonials = this.generateTestimonials(style)
    
    return `
      <section class="testimonials-ultra-pro" style="
        background: linear-gradient(135deg, ${colors.background}, ${colors.primary}05);
        padding: 5rem 2rem;
        position: relative;
        overflow: hidden;
      ">
        <!-- Background pattern -->
        <div class="pattern-bg" style="
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, ${colors.primary}08 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, ${colors.accent}08 2px, transparent 2px);
          background-size: 50px 50px, 80px 80px;
          animation: testimonialsBg 30s linear infinite;
        "></div>
        
        <div class="container" style="
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        ">
          <!-- Header section -->
          <div class="section-header" style="
            text-align: center;
            margin-bottom: 4rem;
          ">
            <div class="trust-badge" style="
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
              <span style="position: relative; z-index: 2;">⭐ Nos clients témoignent</span>
              <div style="
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
              color: ${colors.primary};
              margin-bottom: 1rem;
              background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            ">
              Plus de 500 clients satisfaits
            </h2>
            
            <p style="
              font-size: 1.2rem;
              color: ${colors.text};
              max-width: 600px;
              margin: 0 auto;
              line-height: 1.6;
            ">
              Découvrez pourquoi nos clients nous font confiance pour leurs projets ${this.data.trade?.toLowerCase()}
            </p>
          </div>
          
          <!-- Testimonials grid -->
          <div class="testimonials-grid" style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
          ">
            ${testimonials.slice(0, 3).map((testimonial, index) => `
              <div class="testimonial-card" style="
                background: white;
                padding: 2rem;
                border-radius: 1.5rem;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                position: relative;
                overflow: hidden;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                animation: testimonialSlideUp 0.6s ease forwards;
                animation-delay: ${index * 0.2}s;
                opacity: 0;
                transform: translateY(30px);
              " onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 25px 50px rgba(0,0,0,0.15)'"
                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.1)'">
                
                <!-- Quote icon -->
                <div style="
                  position: absolute;
                  top: -10px;
                  right: 20px;
                  font-size: 4rem;
                  color: ${colors.primary}20;
                  line-height: 1;
                ">"</div>
                
                <!-- Stars rating -->
                <div class="rating" style="
                  color: #fbbf24;
                  font-size: 1.2rem;
                  margin-bottom: 1rem;
                  position: relative;
                  z-index: 2;
                ">
                  ${'⭐'.repeat(testimonial.rating)}
                </div>
                
                <!-- Testimonial text -->
                <blockquote style="
                  font-size: 1.1rem;
                  line-height: 1.6;
                  color: ${colors.text};
                  margin-bottom: 1.5rem;
                  position: relative;
                  z-index: 2;
                  font-style: italic;
                ">
                  "${testimonial.text}"
                </blockquote>
                
                <!-- Author info -->
                <div class="author" style="
                  display: flex;
                  align-items: center;
                  gap: 1rem;
                  position: relative;
                  z-index: 2;
                ">
                  <div class="avatar" style="
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 1.2rem;
                  ">
                    ${testimonial.author.charAt(0)}
                  </div>
                  
                  <div>
                    <div style="
                      font-weight: 600;
                      color: ${colors.primary};
                      margin-bottom: 0.2rem;
                    ">
                      ${testimonial.author}
                    </div>
                    <div style="
                      font-size: 0.9rem;
                      color: ${colors.text};
                      opacity: 0.8;
                    ">
                      ${testimonial.location} • ${testimonial.service}
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          
          <!-- Social proof stats -->
          <div class="social-proof" style="
            background: white;
            border-radius: 1.5rem;
            padding: 2rem;
            box-shadow: 0 15px 30px rgba(0,0,0,0.08);
            border: 1px solid ${colors.primary}10;
          ">
            <div style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 2rem;
              text-align: center;
            ">
              <div class="stat">
                <div style="
                  font-size: 2.5rem;
                  font-weight: 800;
                  color: ${colors.primary};
                  margin-bottom: 0.5rem;
                ">500+</div>
                <div style="
                  color: ${colors.text};
                  font-weight: 600;
                ">Clients satisfaits</div>
              </div>
              
              <div class="stat">
                <div style="
                  font-size: 2.5rem;
                  font-weight: 800;
                  color: ${colors.primary};
                  margin-bottom: 0.5rem;
                ">4.9/5</div>
                <div style="
                  color: ${colors.text};
                  font-weight: 600;
                ">Note moyenne</div>
              </div>
              
              <div class="stat">
                <div style="
                  font-size: 2.5rem;
                  font-weight: 800;
                  color: ${colors.primary};
                  margin-bottom: 0.5rem;
                ">24h</div>
                <div style="
                  color: ${colors.text};
                  font-weight: 600;
                ">Délai d'intervention</div>
              </div>
              
              <div class="stat">
                <div style="
                  font-size: 2.5rem;
                  font-weight: 800;
                  color: ${colors.primary};
                  margin-bottom: 0.5rem;
                ">100%</div>
                <div style="
                  color: ${colors.text};
                  font-weight: 600;
                ">Satisfaction garantie</div>
              </div>
            </div>
          </div>
        </div>
        
        <style>
          @keyframes testimonialsBg {
            0% { transform: translateX(0) translateY(0); }
            100% { transform: translateX(-50px) translateY(-50px); }
          }
          
          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          
          @keyframes testimonialSlideUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @media (max-width: 768px) {
            .testimonials-ultra-pro {
              padding: 3rem 1rem !important;
            }
            
            .testimonials-grid {
              grid-template-columns: 1fr !important;
              gap: 1.5rem !important;
            }
            
            .testimonials-ultra-pro h2 {
              font-size: 2rem !important;
            }
            
            .social-proof > div {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 1.5rem !important;
            }
          }
        </style>
      </section>
    `
  }

  // Testimonials Carousel avec navigation
  private renderCarousel(style: DesignStyle): string {
    const colors = this.getColorPalette(style)
    const testimonials = this.generateTestimonials(style)
    
    return `
      <section class="testimonials-carousel" style="
        background: ${colors.background};
        padding: 4rem 2rem;
      ">
        <div class="container" style="
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        ">
          <h2 style="
            font-size: 2.2rem;
            font-weight: 700;
            color: ${colors.primary};
            margin-bottom: 3rem;
          ">
            Ce que disent nos clients
          </h2>
          
          <div class="carousel-container" style="
            position: relative;
            overflow: hidden;
            border-radius: 1rem;
            background: white;
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
            padding: 3rem 2rem;
          ">
            <div class="carousel-track" id="testimonialTrack" style="
              display: flex;
              transition: transform 0.5s ease;
              transform: translateX(0);
            ">
              ${testimonials.map((testimonial, index) => `
                <div class="testimonial-slide" style="
                  min-width: 100%;
                  padding: 0 2rem;
                ">
                  <div style="
                    color: #fbbf24;
                    font-size: 1.5rem;
                    margin-bottom: 1.5rem;
                  ">
                    ${'⭐'.repeat(testimonial.rating)}
                  </div>
                  
                  <blockquote style="
                    font-size: 1.3rem;
                    line-height: 1.6;
                    color: ${colors.text};
                    margin-bottom: 2rem;
                    font-style: italic;
                    max-width: 600px;
                    margin-left: auto;
                    margin-right: auto;
                  ">
                    "${testimonial.text}"
                  </blockquote>
                  
                  <div style="
                    font-weight: 600;
                    color: ${colors.primary};
                    font-size: 1.1rem;
                  ">
                    ${testimonial.author}
                  </div>
                  <div style="
                    color: ${colors.text};
                    opacity: 0.8;
                    margin-top: 0.5rem;
                  ">
                    ${testimonial.location} • ${testimonial.service}
                  </div>
                </div>
              `).join('')}
            </div>
            
            <!-- Navigation buttons -->
            <button onclick="previousTestimonial()" style="
              position: absolute;
              left: 20px;
              top: 50%;
              transform: translateY(-50%);
              background: ${colors.primary};
              color: white;
              border: none;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              cursor: pointer;
              font-size: 1.2rem;
              transition: background 0.3s ease;
            " onmouseover="this.style.background='${colors.secondary}'"
               onmouseout="this.style.background='${colors.primary}'">
              ‹
            </button>
            
            <button onclick="nextTestimonial()" style="
              position: absolute;
              right: 20px;
              top: 50%;
              transform: translateY(-50%);
              background: ${colors.primary};
              color: white;
              border: none;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              cursor: pointer;
              font-size: 1.2rem;
              transition: background 0.3s ease;
            " onmouseover="this.style.background='${colors.secondary}'"
               onmouseout="this.style.background='${colors.primary}'">
              ›
            </button>
          </div>
          
          <!-- Dots indicator -->
          <div class="carousel-dots" style="
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 2rem;
          ">
            ${testimonials.map((_, index) => `
              <button onclick="goToTestimonial(${index})" class="carousel-dot" style="
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: none;
                background: ${index === 0 ? colors.primary : colors.primary + '40'};
                cursor: pointer;
                transition: background 0.3s ease;
              "></button>
            `).join('')}
          </div>
        </div>
        
        <script>
          let currentTestimonial = 0;
          const totalTestimonials = ${testimonials.length};
          
          function updateCarousel() {
            const track = document.getElementById('testimonialTrack');
            const dots = document.querySelectorAll('.carousel-dot');
            
            if (track) {
              track.style.transform = \`translateX(-\${currentTestimonial * 100}%)\`;
            }
            
            dots.forEach((dot, index) => {
              dot.style.background = index === currentTestimonial ? '${colors.primary}' : '${colors.primary}40';
            });
          }
          
          function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            updateCarousel();
          }
          
          function previousTestimonial() {
            currentTestimonial = currentTestimonial === 0 ? totalTestimonials - 1 : currentTestimonial - 1;
            updateCarousel();
          }
          
          function goToTestimonial(index) {
            currentTestimonial = index;
            updateCarousel();
          }
          
          // Auto-play
          setInterval(nextTestimonial, 5000);
        </script>
        
        <style>
          @media (max-width: 768px) {
            .testimonials-carousel {
              padding: 2rem 1rem !important;
            }
            
            .carousel-container {
              padding: 2rem 1rem !important;
            }
            
            .testimonial-slide {
              padding: 0 1rem !important;
            }
            
            .testimonial-slide blockquote {
              font-size: 1.1rem !important;
            }
          }
        </style>
      </section>
    `
  }

  // Testimonials Grid simple
  private renderGrid(style: DesignStyle): string {
    const colors = this.getColorPalette(style)
    const testimonials = this.generateTestimonials(style)
    
    return `
      <section class="testimonials-grid" style="
        background: ${colors.background};
        padding: 4rem 2rem;
      ">
        <div class="container" style="
          max-width: 1200px;
          margin: 0 auto;
        ">
          <h2 style="
            font-size: 2.2rem;
            font-weight: 700;
            color: ${colors.primary};
            text-align: center;
            margin-bottom: 3rem;
          ">
            Témoignages clients
          </h2>
          
          <div style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
          ">
            ${testimonials.slice(0, 4).map(testimonial => `
              <div style="
                background: white;
                padding: 2rem;
                border-radius: 1rem;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                transition: transform 0.3s ease;
              " onmouseover="this.style.transform='translateY(-5px)'"
                 onmouseout="this.style.transform='translateY(0)'">
                
                <div style="
                  color: #fbbf24;
                  font-size: 1.2rem;
                  margin-bottom: 1rem;
                ">
                  ${'⭐'.repeat(testimonial.rating)}
                </div>
                
                <blockquote style="
                  font-size: 1rem;
                  line-height: 1.6;
                  color: ${colors.text};
                  margin-bottom: 1.5rem;
                  font-style: italic;
                ">
                  "${testimonial.text}"
                </blockquote>
                
                <div>
                  <div style="
                    font-weight: 600;
                    color: ${colors.primary};
                    margin-bottom: 0.2rem;
                  ">
                    ${testimonial.author}
                  </div>
                  <div style="
                    font-size: 0.9rem;
                    color: ${colors.text};
                    opacity: 0.8;
                  ">
                    ${testimonial.location} • ${testimonial.service}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `
  }

  // Testimonial unique mis en avant
  private renderSingle(style: DesignStyle): string {
    const colors = this.getColorPalette(style)
    const testimonial = this.generateTestimonials(style)[0]
    
    return `
      <section class="testimonial-single" style="
        background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
        color: white;
        padding: 4rem 2rem;
        margin: 3rem 0;
        text-align: center;
        position: relative;
        overflow: hidden;
      ">
        <div style="
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
        "></div>
        
        <div class="container" style="
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        ">
          <div style="
            font-size: 4rem;
            opacity: 0.3;
            margin-bottom: 1rem;
          ">"</div>
          
          <div style="
            color: ${colors.accent};
            font-size: 1.5rem;
            margin-bottom: 2rem;
          ">
            ${'⭐'.repeat(testimonial.rating)}
          </div>
          
          <blockquote style="
            font-size: 1.5rem;
            line-height: 1.6;
            margin-bottom: 2rem;
            font-style: italic;
            font-weight: 300;
          ">
            "${testimonial.text}"
          </blockquote>
          
          <div style="
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          ">
            ${testimonial.author}
          </div>
          <div style="
            opacity: 0.9;
          ">
            ${testimonial.location} • ${testimonial.service}
          </div>
        </div>
      </section>
    `
  }

  // Wall of testimonials (beaucoup de témoignages courts)
  private renderWall(style: DesignStyle): string {
    const colors = this.getColorPalette(style)
    const testimonials = this.generateTestimonials(style, 8)
    
    return `
      <section class="testimonials-wall" style="
        background: ${colors.background};
        padding: 4rem 2rem;
      ">
        <div class="container" style="
          max-width: 1200px;
          margin: 0 auto;
        ">
          <h2 style="
            font-size: 2.2rem;
            font-weight: 700;
            color: ${colors.primary};
            text-align: center;
            margin-bottom: 3rem;
          ">
            Nos clients parlent de nous
          </h2>
          
          <div style="
            columns: 3;
            column-gap: 2rem;
            column-fill: balance;
          ">
            ${testimonials.map((testimonial, index) => `
              <div style="
                background: white;
                padding: 1.5rem;
                border-radius: 1rem;
                box-shadow: 0 8px 20px rgba(0,0,0,0.08);
                margin-bottom: 1.5rem;
                break-inside: avoid;
                border-left: 4px solid ${colors.primary};
                transition: transform 0.3s ease;
              " onmouseover="this.style.transform='scale(1.02)'"
                 onmouseout="this.style.transform='scale(1)'">
                
                <div style="
                  color: #fbbf24;
                  font-size: 1rem;
                  margin-bottom: 1rem;
                ">
                  ${'⭐'.repeat(testimonial.rating)}
                </div>
                
                <p style="
                  font-size: 0.95rem;
                  line-height: 1.5;
                  color: ${colors.text};
                  margin-bottom: 1rem;
                  font-style: italic;
                ">
                  "${testimonial.text}"
                </p>
                
                <div style="
                  font-weight: 600;
                  color: ${colors.primary};
                  font-size: 0.9rem;
                ">
                  ${testimonial.author}
                </div>
                <div style="
                  font-size: 0.8rem;
                  color: ${colors.text};
                  opacity: 0.8;
                ">
                  ${testimonial.location}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <style>
          @media (max-width: 1024px) {
            .testimonials-wall > div > div {
              columns: 2 !important;
            }
          }
          
          @media (max-width: 768px) {
            .testimonials-wall > div > div {
              columns: 1 !important;
            }
          }
        </style>
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

  private generateTestimonials(style: DesignStyle, count: number = 6) {
    const trade = this.data.trade?.toLowerCase() || 'artisan'
    const city = this.data.city || 'Paris'
    const cities = this.data.serviceCities || [city, 'Boulogne-Billancourt', 'Neuilly-sur-Seine']
    const services = this.data.services || []
    
    const testimonialTemplates = {
      electricien: [
        {
          text: "Installation électrique parfaite ! Travail propre et rapide, je recommande vivement.",
          author: "Marie Dubois",
          service: "Installation électrique",
          rating: 5
        },
        {
          text: "Dépannage en urgence un dimanche soir, très professionnel et tarif honnête.",
          author: "Pierre Martin",
          service: "Dépannage urgence",
          rating: 5
        },
        {
          text: "Mise aux normes de tout l'appartement, excellent travail et conseils avisés.",
          author: "Sophie Leroy",
          service: "Mise aux normes",
          rating: 5
        },
        {
          text: "Très satisfait de la rénovation électrique complète de ma maison.",
          author: "Jean-Claude Bernard",
          service: "Rénovation électrique",
          rating: 5
        }
      ],
      plombier: [
        {
          text: "Intervention rapide pour une fuite, résultat impeccable et prix raisonnable.",
          author: "Claire Moreau",
          service: "Dépannage fuite",
          rating: 5
        },
        {
          text: "Installation de salle de bain complète, travail soigné et dans les délais.",
          author: "Michel Roux",
          service: "Installation salle de bain",
          rating: 5
        },
        {
          text: "Débouchage canalisation efficace, plombier très professionnel.",
          author: "Anne Durand",
          service: "Débouchage",
          rating: 5
        },
        {
          text: "Réparation chauffe-eau parfaite, je recommande sans hésiter.",
          author: "Robert Petit",
          service: "Réparation chauffe-eau",
          rating: 5
        }
      ],
      chauffagiste: [
        {
          text: "Installation pompe à chaleur excellente, économies immédiates sur la facture.",
          author: "Sylvie Girard",
          service: "Installation PAC",
          rating: 5
        },
        {
          text: "Entretien chaudière méticuleux, chauffagiste très compétent.",
          author: "François Blanc",
          service: "Entretien chaudière",
          rating: 5
        },
        {
          text: "Dépannage chauffage en urgence, intervention rapide et efficace.",
          author: "Catherine Roy",
          service: "Dépannage chauffage",
          rating: 5
        },
        {
          text: "Rénovation système de chauffage complet, travail remarquable.",
          author: "Laurent Denis",
          service: "Rénovation chauffage",
          rating: 5
        }
      ]
    }
    
    const tradeKey = style === 'electricien' ? 'electricien' 
                   : style === 'plombier' ? 'plombier' 
                   : style === 'chauffagiste' ? 'chauffagiste' 
                   : 'electricien'
    
    const baseTestimonials = testimonialTemplates[tradeKey] || testimonialTemplates.electricien
    
    // Générer plus de témoignages si nécessaire
    const allTestimonials = []
    for (let i = 0; i < count; i++) {
      const base = baseTestimonials[i % baseTestimonials.length]
      const randomCity = cities[Math.floor(Math.random() * cities.length)]
      
      allTestimonials.push({
        ...base,
        location: randomCity,
        rating: Math.random() > 0.1 ? 5 : 4 // 90% de 5 étoiles, 10% de 4 étoiles
      })
    }
    
    return allTestimonials
  }
}