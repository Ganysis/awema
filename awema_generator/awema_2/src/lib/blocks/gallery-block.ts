// Bloc Gallery (Galerie) ultra-professionnel avec lightbox et filtres
import { BaseBlock, BlockType, DesignStyle, BlockOptions, TemplateData } from './block-system'

export class GalleryBlock extends BaseBlock {
  type: BlockType = 'gallery'
  variants = ['grid', 'masonry', 'carousel', 'filterable', 'ultra-pro']

  render(variant: string): string {
    const style = this.getDesignStyle()
    
    switch (variant) {
      case 'ultra-pro':
        return this.renderUltraPro(style)
      case 'masonry':
        return this.renderMasonry(style)
      case 'carousel':
        return this.renderCarousel(style)
      case 'filterable':
        return this.renderFilterable(style)
      default:
        return this.renderGrid(style)
    }
  }

  // Gallery Ultra-Pro avec lightbox avancé et animations
  private renderUltraPro(style: DesignStyle): string {
    const colors = this.getColorPalette(style)
    const images = this.generateImages(style)
    
    return `
      <section class="gallery-ultra-pro" style="
        background: linear-gradient(135deg, ${colors.background}, ${colors.primary}05);
        padding: 5rem 2rem;
        position: relative;
        overflow: hidden;
      ">
        <!-- Background pattern -->
        <div class="gallery-pattern" style="
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, ${colors.primary}06 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, ${colors.accent}06 2px, transparent 2px);
          background-size: 60px 60px, 90px 90px;
          animation: galleryPattern 25s linear infinite;
        "></div>
        
        <div class="container" style="
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        ">
          <!-- Header -->
          <div class="gallery-header" style="
            text-align: center;
            margin-bottom: 4rem;
          ">
            <div class="portfolio-badge" style="
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
              <span style="position: relative; z-index: 2;">📸 Notre portfolio</span>
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
              Nos réalisations ${this.data.trade?.toLowerCase()}
            </h2>
            
            <p style="
              font-size: 1.2rem;
              color: ${colors.text};
              max-width: 600px;
              margin: 0 auto;
            ">
              Découvrez quelques-unes de nos plus belles réalisations
            </p>
          </div>
          
          <!-- Gallery Grid -->
          <div class="gallery-grid" style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
          ">
            ${images.map((image, index) => `
              <div class="gallery-item" style="
                position: relative;
                border-radius: 1rem;
                overflow: hidden;
                background: white;
                box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
                animation: gallerySlideUp 0.6s ease forwards;
                animation-delay: ${index * 0.1}s;
                opacity: 0;
                transform: translateY(30px);
                cursor: pointer;
                ${index % 6 === 0 || index % 6 === 3 ? 'grid-row: span 2;' : ''}
              " onmouseover="this.style.transform='translateY(-10px) scale(1.02)'; this.style.boxShadow='0 25px 50px rgba(0,0,0,0.2)'"
                 onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 15px 35px rgba(0,0,0,0.1)'"
                 onclick="openLightbox(${index})">
                
                <!-- Image -->
                <div style="
                  aspect-ratio: ${index % 6 === 0 || index % 6 === 3 ? '1/1.5' : '1/1'};
                  background: linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20);
                  position: relative;
                  overflow: hidden;
                ">
                  <!-- Placeholder pour image réelle -->
                  <div style="
                    position: absolute;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 3rem;
                    opacity: 0.5;
                  ">
                    ${image.icon}
                  </div>
                  
                  <!-- Overlay -->
                  <div class="image-overlay" style="
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: linear-gradient(135deg, ${colors.primary}80, ${colors.secondary}60);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 2rem;
                  " onmouseover="this.style.opacity='1'"
                     onmouseout="this.style.opacity='0'">
                    🔍
                  </div>
                </div>
                
                <!-- Info -->
                <div style="
                  padding: 1.5rem;
                ">
                  <h3 style="
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: ${colors.primary};
                    margin-bottom: 0.5rem;
                  ">
                    ${image.title}
                  </h3>
                  
                  <p style="
                    color: ${colors.text};
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                    line-height: 1.4;
                  ">
                    ${image.description}
                  </p>
                  
                  <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.8rem;
                    color: ${colors.text};
                    opacity: 0.8;
                  ">
                    <span>📍 ${image.location}</span>
                    <span>📅 ${image.date}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          
          <!-- View More Button -->
          <div style="text-align: center;">
            <button style="
              background: ${colors.primary};
              color: white;
              border: none;
              padding: 1rem 2rem;
              border-radius: 50px;
              font-weight: 600;
              font-size: 1.1rem;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            " onmouseover="this.style.background='${colors.secondary}'; this.style.transform='translateY(-2px)'"
               onmouseout="this.style.background='${colors.primary}'; this.style.transform='translateY(0)'">
              Voir plus de réalisations
            </button>
          </div>
        </div>
        
        <!-- Lightbox -->
        <div id="lightbox" style="
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.9);
          z-index: 9999;
          display: none;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        " onclick="closeLightbox()">
          
          <div class="lightbox-content" style="
            max-width: 90vw;
            max-height: 90vh;
            position: relative;
            background: white;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 30px 60px rgba(0,0,0,0.3);
          " onclick="event.stopPropagation()">
            
            <!-- Close button -->
            <button onclick="closeLightbox()" style="
              position: absolute;
              top: 1rem; right: 1rem;
              background: ${colors.primary};
              color: white;
              border: none;
              width: 40px; height: 40px;
              border-radius: 50%;
              cursor: pointer;
              font-size: 1.2rem;
              z-index: 10;
              transition: background 0.3s ease;
            " onmouseover="this.style.background='${colors.secondary}'"
               onmouseout="this.style.background='${colors.primary}'">
              ×
            </button>
            
            <!-- Navigation -->
            <button onclick="previousImage()" style="
              position: absolute;
              left: 1rem; top: 50%;
              transform: translateY(-50%);
              background: rgba(0,0,0,0.5);
              color: white;
              border: none;
              width: 40px; height: 40px;
              border-radius: 50%;
              cursor: pointer;
              font-size: 1.2rem;
              z-index: 10;
            ">‹</button>
            
            <button onclick="nextImage()" style="
              position: absolute;
              right: 1rem; top: 50%;
              transform: translateY(-50%);
              background: rgba(0,0,0,0.5);
              color: white;
              border: none;
              width: 40px; height: 40px;
              border-radius: 50%;
              cursor: pointer;
              font-size: 1.2rem;
              z-index: 10;
            ">›</button>
            
            <!-- Image container -->
            <div id="lightbox-image" style="
              width: 100%;
              height: 70vh;
              background: linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 4rem;
              color: ${colors.primary};
            ">
              📸
            </div>
            
            <!-- Info -->
            <div id="lightbox-info" style="
              padding: 2rem;
              background: white;
            ">
              <h3 id="lightbox-title" style="
                font-size: 1.5rem;
                font-weight: 600;
                color: ${colors.primary};
                margin-bottom: 0.5rem;
              "></h3>
              <p id="lightbox-description" style="
                color: ${colors.text};
                margin-bottom: 1rem;
              "></p>
              <div style="
                display: flex;
                gap: 2rem;
                font-size: 0.9rem;
                color: ${colors.text};
                opacity: 0.8;
              ">
                <span id="lightbox-location"></span>
                <span id="lightbox-date"></span>
              </div>
            </div>
          </div>
        </div>
        
        <style>
          @keyframes galleryPattern {
            0% { transform: translate(0, 0); }
            100% { transform: translate(60px, 60px); }
          }
          
          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          
          @keyframes gallerySlideUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @media (max-width: 768px) {
            .gallery-ultra-pro {
              padding: 3rem 1rem !important;
            }
            
            .gallery-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }
            
            .gallery-item {
              grid-row: span 1 !important;
            }
            
            .gallery-ultra-pro h2 {
              font-size: 2rem !important;
            }
            
            .lightbox-content {
              max-width: 95vw !important;
              max-height: 95vh !important;
            }
            
            #lightbox-image {
              height: 50vh !important;
            }
          }
        </style>
        
        <script>
          let currentImageIndex = 0;
          const images = ${JSON.stringify(images)};
          
          function openLightbox(index) {
            currentImageIndex = index;
            updateLightboxContent();
            document.getElementById('lightbox').style.display = 'flex';
            document.body.style.overflow = 'hidden';
          }
          
          function closeLightbox() {
            document.getElementById('lightbox').style.display = 'none';
            document.body.style.overflow = 'auto';
          }
          
          function nextImage() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateLightboxContent();
          }
          
          function previousImage() {
            currentImageIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
            updateLightboxContent();
          }
          
          function updateLightboxContent() {
            const image = images[currentImageIndex];
            document.getElementById('lightbox-title').textContent = image.title;
            document.getElementById('lightbox-description').textContent = image.description;
            document.getElementById('lightbox-location').textContent = '📍 ' + image.location;
            document.getElementById('lightbox-date').textContent = '📅 ' + image.date;
            document.getElementById('lightbox-image').innerHTML = '<div style="font-size: 4rem;">' + image.icon + '</div>';
          }
          
          // Keyboard navigation
          document.addEventListener('keydown', function(e) {
            if (document.getElementById('lightbox').style.display === 'flex') {
              if (e.key === 'Escape') closeLightbox();
              if (e.key === 'ArrowLeft') previousImage();
              if (e.key === 'ArrowRight') nextImage();
            }
          });
        </script>
      </section>
    `
  }

  // Gallery Masonry (Pinterest style)
  private renderMasonry(style: DesignStyle): string {
    const colors = this.getColorPalette(style)
    const images = this.generateImages(style)
    
    return `
      <section class="gallery-masonry" style="
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
            Galerie de nos travaux
          </h2>
          
          <div style="
            columns: 3;
            column-gap: 1.5rem;
            column-fill: balance;
          ">
            ${images.map((image, index) => `
              <div style="
                background: white;
                border-radius: 1rem;
                overflow: hidden;
                margin-bottom: 1.5rem;
                break-inside: avoid;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                transition: transform 0.3s ease;
                cursor: pointer;
              " onmouseover="this.style.transform='translateY(-5px)'"
                 onmouseout="this.style.transform='translateY(0)'">
                
                <div style="
                  aspect-ratio: ${Math.random() > 0.5 ? '1/1.2' : '1/0.8'};
                  background: linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 2.5rem;
                  color: ${colors.primary};
                ">
                  ${image.icon}
                </div>
                
                <div style="padding: 1.5rem;">
                  <h3 style="
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: ${colors.primary};
                    margin-bottom: 0.5rem;
                  ">
                    ${image.title}
                  </h3>
                  
                  <p style="
                    color: ${colors.text};
                    font-size: 0.9rem;
                    line-height: 1.4;
                  ">
                    ${image.description}
                  </p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <style>
          @media (max-width: 1024px) {
            .gallery-masonry > div > div {
              columns: 2 !important;
            }
          }
          
          @media (max-width: 768px) {
            .gallery-masonry > div > div {
              columns: 1 !important;
            }
          }
        </style>
      </section>
    `
  }

  // Gallery Grid simple
  private renderGrid(style: DesignStyle): string {
    const colors = this.getColorPalette(style)
    const images = this.generateImages(style)
    
    return `
      <section class="gallery-grid" style="
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
            Nos réalisations
          </h2>
          
          <div style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
          ">
            ${images.map(image => `
              <div style="
                background: white;
                border-radius: 1rem;
                overflow: hidden;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                transition: transform 0.3s ease;
              " onmouseover="this.style.transform='translateY(-5px)'"
                 onmouseout="this.style.transform='translateY(0)'">
                
                <div style="
                  aspect-ratio: 1/1;
                  background: linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 3rem;
                  color: ${colors.primary};
                ">
                  ${image.icon}
                </div>
                
                <div style="padding: 1.5rem;">
                  <h3 style="
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: ${colors.primary};
                    margin-bottom: 0.5rem;
                  ">
                    ${image.title}
                  </h3>
                  
                  <p style="
                    color: ${colors.text};
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                  ">
                    ${image.description}
                  </p>
                  
                  <div style="
                    font-size: 0.8rem;
                    color: ${colors.text};
                    opacity: 0.8;
                  ">
                    📍 ${image.location}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `
  }

  // Gallery Carousel
  private renderCarousel(style: DesignStyle): string {
    const colors = this.getColorPalette(style)
    const images = this.generateImages(style)
    
    return `
      <section class="gallery-carousel" style="
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
            Portfolio
          </h2>
          
          <div class="carousel-container" style="
            position: relative;
            overflow: hidden;
            border-radius: 1rem;
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          ">
            <div class="carousel-track" id="galleryTrack" style="
              display: flex;
              transition: transform 0.5s ease;
            ">
              ${images.map(image => `
                <div style="
                  min-width: 100%;
                  aspect-ratio: 16/9;
                  background: linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 4rem;
                  color: ${colors.primary};
                  position: relative;
                ">
                  ${image.icon}
                  
                  <div style="
                    position: absolute;
                    bottom: 0; left: 0; right: 0;
                    background: linear-gradient(transparent, rgba(0,0,0,0.7));
                    color: white;
                    padding: 2rem;
                  ">
                    <h3 style="
                      font-size: 1.5rem;
                      font-weight: 600;
                      margin-bottom: 0.5rem;
                    ">
                      ${image.title}
                    </h3>
                    <p style="opacity: 0.9;">
                      ${image.description}
                    </p>
                  </div>
                </div>
              `).join('')}
            </div>
            
            <!-- Navigation -->
            <button onclick="previousGalleryImage()" style="
              position: absolute;
              left: 20px; top: 50%;
              transform: translateY(-50%);
              background: rgba(0,0,0,0.5);
              color: white;
              border: none;
              width: 50px; height: 50px;
              border-radius: 50%;
              cursor: pointer;
              font-size: 1.5rem;
            ">‹</button>
            
            <button onclick="nextGalleryImage()" style="
              position: absolute;
              right: 20px; top: 50%;
              transform: translateY(-50%);
              background: rgba(0,0,0,0.5);
              color: white;
              border: none;
              width: 50px; height: 50px;
              border-radius: 50%;
              cursor: pointer;
              font-size: 1.5rem;
            ">›</button>
          </div>
          
          <!-- Dots -->
          <div style="
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 2rem;
          ">
            ${images.map((_, index) => `
              <button onclick="goToGalleryImage(${index})" class="gallery-dot" style="
                width: 12px; height: 12px;
                border-radius: 50%;
                border: none;
                background: ${index === 0 ? colors.primary : colors.primary + '40'};
                cursor: pointer;
              "></button>
            `).join('')}
          </div>
        </div>
        
        <script>
          let currentGalleryIndex = 0;
          const totalGalleryImages = ${images.length};
          
          function updateGalleryCarousel() {
            const track = document.getElementById('galleryTrack');
            const dots = document.querySelectorAll('.gallery-dot');
            
            if (track) {
              track.style.transform = \`translateX(-\${currentGalleryIndex * 100}%)\`;
            }
            
            dots.forEach((dot, index) => {
              dot.style.background = index === currentGalleryIndex ? '${colors.primary}' : '${colors.primary}40';
            });
          }
          
          function nextGalleryImage() {
            currentGalleryIndex = (currentGalleryIndex + 1) % totalGalleryImages;
            updateGalleryCarousel();
          }
          
          function previousGalleryImage() {
            currentGalleryIndex = currentGalleryIndex === 0 ? totalGalleryImages - 1 : currentGalleryIndex - 1;
            updateGalleryCarousel();
          }
          
          function goToGalleryImage(index) {
            currentGalleryIndex = index;
            updateGalleryCarousel();
          }
          
          // Auto-play
          setInterval(nextGalleryImage, 4000);
        </script>
      </section>
    `
  }

  // Gallery avec filtres par catégorie
  private renderFilterable(style: DesignStyle): string {
    const colors = this.getColorPalette(style)
    const images = this.generateImages(style)
    const categories = [...new Set(images.map(img => img.category))]
    
    return `
      <section class="gallery-filterable" style="
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
            margin-bottom: 2rem;
          ">
            Nos réalisations par catégorie
          </h2>
          
          <!-- Filters -->
          <div style="
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 3rem;
            flex-wrap: wrap;
          ">
            <button onclick="filterImages('all')" class="filter-btn active" style="
              background: ${colors.primary};
              color: white;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 50px;
              cursor: pointer;
              font-weight: 600;
              transition: all 0.3s ease;
            ">
              Toutes
            </button>
            
            ${categories.map(category => `
              <button onclick="filterImages('${category}')" class="filter-btn" style="
                background: transparent;
                color: ${colors.primary};
                border: 2px solid ${colors.primary};
                padding: 0.75rem 1.5rem;
                border-radius: 50px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
              " onmouseover="this.style.background='${colors.primary}'; this.style.color='white'"
                 onmouseout="if(!this.classList.contains('active')) { this.style.background='transparent'; this.style.color='${colors.primary}' }">
                ${category}
              </button>
            `).join('')}
          </div>
          
          <!-- Gallery -->
          <div class="filterable-grid" style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
          ">
            ${images.map(image => `
              <div class="gallery-item" data-category="${image.category}" style="
                background: white;
                border-radius: 1rem;
                overflow: hidden;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
              " onmouseover="this.style.transform='translateY(-5px)'"
                 onmouseout="this.style.transform='translateY(0)'">
                
                <div style="
                  aspect-ratio: 1/1;
                  background: linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 3rem;
                  color: ${colors.primary};
                  position: relative;
                ">
                  ${image.icon}
                  
                  <div style="
                    position: absolute;
                    top: 10px; right: 10px;
                    background: ${colors.primary};
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 50px;
                    font-size: 0.8rem;
                    font-weight: 600;
                  ">
                    ${image.category}
                  </div>
                </div>
                
                <div style="padding: 1.5rem;">
                  <h3 style="
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: ${colors.primary};
                    margin-bottom: 0.5rem;
                  ">
                    ${image.title}
                  </h3>
                  
                  <p style="
                    color: ${colors.text};
                    font-size: 0.9rem;
                  ">
                    ${image.description}
                  </p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <script>
          function filterImages(category) {
            const items = document.querySelectorAll('.gallery-item');
            const buttons = document.querySelectorAll('.filter-btn');
            
            // Update buttons
            buttons.forEach(btn => {
              btn.classList.remove('active');
              btn.style.background = 'transparent';
              btn.style.color = '${colors.primary}';
            });
            
            event.target.classList.add('active');
            event.target.style.background = '${colors.primary}';
            event.target.style.color = 'white';
            
            // Filter items
            items.forEach(item => {
              if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
              } else {
                item.style.display = 'none';
              }
            });
          }
          
          // Add fade in animation
          const style = document.createElement('style');
          style.textContent = \`
            @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.9); }
              to { opacity: 1; transform: scale(1); }
            }
          \`;
          document.head.appendChild(style);
        </script>
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

  private generateImages(style: DesignStyle) {
    const trade = this.data.trade?.toLowerCase() || 'artisan'
    const city = this.data.city || 'Paris'
    const cities = this.data.serviceCities || [city, 'Boulogne-Billancourt', 'Neuilly-sur-Seine']
    
    const imagesByTrade = {
      electricien: [
        {
          title: 'Installation tableau électrique',
          description: 'Mise en place d\'un tableau électrique aux normes NF C 15-100',
          icon: '⚡',
          category: 'Installation',
          location: cities[0],
          date: '2024'
        },
        {
          title: 'Éclairage LED moderne',
          description: 'Installation d\'un système d\'éclairage LED économique',
          icon: '💡',
          category: 'Éclairage',
          location: cities[1],
          date: '2024'
        },
        {
          title: 'Prise électrique cuisine',
          description: 'Ajout de prises électriques pour cuisine équipée',
          icon: '🔌',
          category: 'Installation',
          location: cities[2],
          date: '2024'
        },
        {
          title: 'Dépannage urgent',
          description: 'Réparation d\'une panne électrique générale',
          icon: '🚨',
          category: 'Dépannage',
          location: cities[0],
          date: '2024'
        },
        {
          title: 'Rénovation complète',
          description: 'Refonte totale de l\'installation électrique',
          icon: '🏠',
          category: 'Rénovation',
          location: cities[1],
          date: '2023'
        },
        {
          title: 'Mise aux normes',
          description: 'Mise en conformité d\'une installation ancienne',
          icon: '✅',
          category: 'Conformité',
          location: cities[2],
          date: '2024'
        }
      ],
      plombier: [
        {
          title: 'Salle de bain moderne',
          description: 'Installation complète d\'une salle de bain contemporaine',
          icon: '🛁',
          category: 'Installation',
          location: cities[0],
          date: '2024'
        },
        {
          title: 'Réparation fuite',
          description: 'Intervention d\'urgence pour fuite d\'eau',
          icon: '💧',
          category: 'Dépannage',
          location: cities[1],
          date: '2024'
        },
        {
          title: 'Chauffe-eau thermodynamique',
          description: 'Installation d\'un chauffe-eau économique',
          icon: '🌡️',
          category: 'Installation',
          location: cities[2],
          date: '2024'
        },
        {
          title: 'Débouchage canalisations',
          description: 'Nettoyage et débouchage de canalisations',
          icon: '🚿',
          category: 'Maintenance',
          location: cities[0],
          date: '2024'
        },
        {
          title: 'Cuisine équipée',
          description: 'Raccordement plomberie pour cuisine moderne',
          icon: '🚽',
          category: 'Installation',
          location: cities[1],
          date: '2023'
        },
        {
          title: 'Rénovation totale',
          description: 'Refonte complète du réseau de plomberie',
          icon: '🔧',
          category: 'Rénovation',
          location: cities[2],
          date: '2024'
        }
      ],
      chauffagiste: [
        {
          title: 'Pompe à chaleur',
          description: 'Installation d\'une PAC air-eau haute performance',
          icon: '🔥',
          category: 'Installation',
          location: cities[0],
          date: '2024'
        },
        {
          title: 'Chaudière gaz condensation',
          description: 'Remplacement par chaudière haute efficacité',
          icon: '🌡️',
          category: 'Installation',
          location: cities[1],
          date: '2024'
        },
        {
          title: 'Radiateurs design',
          description: 'Installation de radiateurs décoratifs',
          icon: '♨️',
          category: 'Installation',
          location: cities[2],
          date: '2024'
        },
        {
          title: 'Entretien chaudière',
          description: 'Maintenance annuelle et vérification',
          icon: '⚙️',
          category: 'Maintenance',
          location: cities[0],
          date: '2024'
        },
        {
          title: 'Plancher chauffant',
          description: 'Installation d\'un système de chauffage au sol',
          icon: '🏠',
          category: 'Installation',
          location: cities[1],
          date: '2023'
        },
        {
          title: 'Climatisation réversible',
          description: 'Système de climatisation avec chauffage',
          icon: '❄️',
          category: 'Installation',
          location: cities[2],
          date: '2024'
        }
      ]
    }
    
    const tradeKey = style === 'electricien' ? 'electricien' 
                   : style === 'plombier' ? 'plombier' 
                   : style === 'chauffagiste' ? 'chauffagiste' 
                   : 'electricien'
    
    return imagesByTrade[tradeKey] || imagesByTrade.electricien
  }
}