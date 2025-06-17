// API Route pour optimiser un site avec le moteur d'optimisation complet
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { OptimizationEngine, OptimizationEngineConfig } from '@/lib/blocks/optimization-engine'
import { generateSiteFromFormData, AWEMAFormData } from '@/lib/blocks/form-integration'

export async function POST(
  request: NextRequest,
  { params }: { params: { siteId: string } }
) {
  try {
    const { siteId } = params
    const { 
      config = {},
      pages = [],
      autoOptimization = true 
    } = await request.json()

    // Récupérer les informations du site
    const siteInstance = await prisma.siteInstance.findUnique({
      where: { id: siteId },
      include: {
        project: {
          include: {
            client: true
          }
        }
      }
    })

    if (!siteInstance) {
      return NextResponse.json(
        { error: 'Site non trouvé' },
        { status: 404 }
      )
    }

    // Parser les données template
    const templateData = JSON.parse(siteInstance.templateData)

    // Configuration par défaut basée sur le métier
    const defaultConfig: Partial<OptimizationEngineConfig> = {
      performance: {
        enableLazyLoading: true,
        enableImageOptimization: true,
        enableCSSMinification: true,
        enableJSMinification: true,
        enableCriticalCSS: true,
        enablePreloading: true,
        enableServiceWorker: true,
        enableCompression: true
      },
      seo: {
        enableAdvancedSchema: true,
        enableLocalSEO: true,
        enableFAQSchema: true,
        targetKeywordDensity: 2.5
      },
      monitoring: {
        enabled: true,
        intervalMs: 30000,
        alertThresholds: {
          performance: 75,
          seo: 80,
          ux: 85
        }
      },
      autoOptimization: {
        enabled: autoOptimization,
        aggressiveness: 'moderate'
      }
    }

    // Merger avec la config fournie
    const optimizationConfig = {
      ...defaultConfig,
      ...config,
      performance: { ...defaultConfig.performance, ...config.performance },
      seo: { ...defaultConfig.seo, ...config.seo },
      monitoring: { ...defaultConfig.monitoring, ...config.monitoring },
      autoOptimization: { ...defaultConfig.autoOptimization, ...config.autoOptimization }
    }

    // Initialiser le moteur d'optimisation
    const optimizationEngine = new OptimizationEngine(templateData, optimizationConfig)

    let optimizationResults = new Map()
    let compositions = new Map()

    // Si des pages spécifiques sont demandées
    if (pages.length > 0) {
      // Optimiser seulement les pages spécifiées
      for (const pageRequest of pages) {
        const { pageType, serviceId, city } = pageRequest
        
        // Générer la composition de page
        const formData: AWEMAFormData = {
          step1: {
            companyName: templateData.companyName || '',
            trade: templateData.trade || '',
            description: templateData.description || '',
            ownerName: templateData.ownerName || '',
            email: templateData.email || '',
            phone: templateData.phone || '',
            address: templateData.address || '',
            city: templateData.city || ''
          },
          step2: {
            primaryColor: templateData.primaryColor || '#1e40af',
            secondaryColor: templateData.secondaryColor || '#3b82f6',
            logoUrl: templateData.logoUrl,
            services: templateData.services || []
          },
          step3: {
            serviceCities: templateData.serviceCities || [],
            legalInfo: templateData.legalInfo || {},
            openingHours: templateData.openingHours,
            emergencyAvailable: templateData.emergencyAvailable || false,
            domain: templateData.domain || '',
            keywords: templateData.keywords || []
          }
        }

        const siteResult = generateSiteFromFormData(formData, {
          style: 'ultra-pro',
          includeLocalSeo: true
        })

        // Trouver la page correspondante
        const page = siteResult.pages.find(p => {
          if (pageType === 'home') return p.type === 'home'
          if (pageType === 'service' && serviceId) return p.type === 'service' && p.filename.includes(serviceId)
          if (pageType === 'local-seo' && serviceId && city) {
            return p.type === 'local-seo' && p.filename.includes(serviceId) && p.filename.includes(city.toLowerCase())
          }
          return p.type === pageType
        })

        if (page) {
          const pageId = page.filename.replace('.html', '')
          const composition = {
            type: page.type,
            style: 'ultra-pro',
            blocks: page.blocks,
            navigation: siteResult.navigation,
            seo: {
              title: page.title,
              description: templateData.description || '',
              keywords: templateData.keywords || []
            },
            linking: siteResult.linking
          }

          compositions.set(pageId, composition)
          
          // Optimiser la page
          const result = await optimizationEngine.optimizePage(
            composition,
            pageType,
            serviceId,
            city
          )
          
          optimizationResults.set(pageId, result)
        }
      }
    } else {
      // Optimiser toutes les pages du site
      const siteResult = generateSiteFromFormData({
        step1: {
          companyName: templateData.companyName || '',
          trade: templateData.trade || '',
          description: templateData.description || '',
          ownerName: templateData.ownerName || '',
          email: templateData.email || '',
          phone: templateData.phone || '',
          address: templateData.address || '',
          city: templateData.city || ''
        },
        step2: {
          primaryColor: templateData.primaryColor || '#1e40af',
          secondaryColor: templateData.secondaryColor || '#3b82f6',
          logoUrl: templateData.logoUrl,
          services: templateData.services || []
        },
        step3: {
          serviceCities: templateData.serviceCities || [],
          legalInfo: templateData.legalInfo || {},
          openingHours: templateData.openingHours,
          emergencyAvailable: templateData.emergencyAvailable || false,
          domain: templateData.domain || '',
          keywords: templateData.keywords || []
        }
      }, {
        style: 'ultra-pro',
        includeLocalSeo: true
      })

      // Créer les compositions pour toutes les pages
      siteResult.pages.forEach(page => {
        const pageId = page.filename.replace('.html', '')
        const composition = {
          type: page.type,
          style: 'ultra-pro',
          blocks: page.blocks,
          navigation: siteResult.navigation,
          seo: {
            title: page.title,
            description: templateData.description || '',
            keywords: templateData.keywords || []
          },
          linking: siteResult.linking
        }
        compositions.set(pageId, composition)
      })

      // Optimiser toutes les pages
      optimizationResults = await optimizationEngine.optimizeAllPages(compositions)
    }

    // Démarrer le monitoring
    optimizationEngine.startMonitoring(compositions)

    // Générer le rapport complet
    const comprehensiveReport = optimizationEngine.generateComprehensiveReport(compositions)

    // Calculer les statistiques globales
    const allResults = Array.from(optimizationResults.values())
    const successfulOptimizations = allResults.filter(r => r.success)
    
    const averageImprovement = {
      performance: successfulOptimizations.reduce((sum, r) => sum + r.improvements.performance, 0) / successfulOptimizations.length || 0,
      seo: successfulOptimizations.reduce((sum, r) => sum + r.improvements.seo, 0) / successfulOptimizations.length || 0,
      ux: successfulOptimizations.reduce((sum, r) => sum + r.improvements.ux, 0) / successfulOptimizations.length || 0,
      conversion: successfulOptimizations.reduce((sum, r) => sum + r.improvements.conversion, 0) / successfulOptimizations.length || 0
    }

    const totalExecutionTime = allResults.reduce((sum, r) => sum + r.executionTime, 0)

    // Sauvegarder les résultats d'optimisation
    await prisma.siteInstance.update({
      where: { id: siteId },
      data: {
        metadata: JSON.stringify({
          ...JSON.parse(siteInstance.metadata || '{}'),
          lastOptimization: {
            timestamp: new Date().toISOString(),
            results: Object.fromEntries(optimizationResults),
            averageImprovement,
            comprehensiveReport: {
              overview: comprehensiveReport.overview,
              summary: {
                totalOptimizations: allResults.length,
                successfulOptimizations: successfulOptimizations.length,
                totalExecutionTime: Math.round(totalExecutionTime)
              }
            }
          }
        })
      }
    })

    return NextResponse.json({
      success: true,
      siteId,
      optimization: {
        totalPages: optimizationResults.size,
        successfulOptimizations: successfulOptimizations.length,
        failedOptimizations: allResults.length - successfulOptimizations.length,
        averageImprovement,
        totalExecutionTime: Math.round(totalExecutionTime)
      },
      results: Object.fromEntries(optimizationResults),
      report: comprehensiveReport,
      config: optimizationConfig,
      recommendations: {
        immediate: comprehensiveReport.actionPlan.immediate,
        next: comprehensiveReport.actionPlan.shortTerm.slice(0, 3)
      },
      monitoring: {
        enabled: optimizationConfig.monitoring.enabled,
        alertThresholds: optimizationConfig.monitoring.alertThresholds
      }
    })

  } catch (error) {
    console.error('Erreur optimisation site:', error)
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'optimisation du site',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

// GET - Rapport d'optimisation et métriques actuelles
export async function GET(
  request: NextRequest,
  { params }: { params: { siteId: string } }
) {
  try {
    const { siteId } = params
    const { searchParams } = new URL(request.url)
    const includeDetails = searchParams.get('details') === 'true'
    const timeRange = searchParams.get('timeRange') || '24h'

    // Récupérer les informations du site
    const siteInstance = await prisma.siteInstance.findUnique({
      where: { id: siteId },
      include: {
        project: {
          include: {
            client: true
          }
        }
      }
    })

    if (!siteInstance) {
      return NextResponse.json(
        { error: 'Site non trouvé' },
        { status: 404 }
      )
    }

    const metadata = JSON.parse(siteInstance.metadata || '{}')
    const lastOptimization = metadata.lastOptimization

    if (!lastOptimization) {
      return NextResponse.json({
        siteId,
        status: 'never_optimized',
        message: 'Ce site n\'a jamais été optimisé',
        recommendation: 'Lancez une première optimisation pour obtenir des métriques'
      })
    }

    // Calculer les métriques de base
    const optimizationAge = Date.now() - new Date(lastOptimization.timestamp).getTime()
    const hoursAgo = Math.round(optimizationAge / (1000 * 60 * 60))

    const response = {
      siteId,
      status: 'optimized',
      lastOptimization: {
        timestamp: lastOptimization.timestamp,
        hoursAgo,
        summary: lastOptimization.comprehensiveReport?.summary
      },
      currentMetrics: {
        averageScore: lastOptimization.comprehensiveReport?.overview?.averageScore || 0,
        totalPages: lastOptimization.comprehensiveReport?.overview?.totalPages || 0,
        improvements: lastOptimization.averageImprovement
      },
      status_indicators: {
        performance: lastOptimization.averageImprovement?.performance > 5 ? 'good' : 'needs_attention',
        seo: lastOptimization.averageImprovement?.seo > 5 ? 'good' : 'needs_attention',
        ux: lastOptimization.averageImprovement?.ux > 5 ? 'good' : 'needs_attention'
      }
    }

    if (includeDetails) {
      response['detailedResults'] = lastOptimization.results
      response['fullReport'] = lastOptimization.comprehensiveReport
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Erreur récupération métriques:', error)
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération des métriques',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

// DELETE - Arrêter le monitoring
export async function DELETE(
  request: NextRequest,
  { params }: { params: { siteId: string } }
) {
  try {
    const { siteId } = params

    // Récupérer les informations du site
    const siteInstance = await prisma.siteInstance.findUnique({
      where: { id: siteId }
    })

    if (!siteInstance) {
      return NextResponse.json(
        { error: 'Site non trouvé' },
        { status: 404 }
      )
    }

    // Mettre à jour les métadonnées pour indiquer l'arrêt du monitoring
    const metadata = JSON.parse(siteInstance.metadata || '{}')
    
    await prisma.siteInstance.update({
      where: { id: siteId },
      data: {
        metadata: JSON.stringify({
          ...metadata,
          monitoringStopped: {
            timestamp: new Date().toISOString(),
            reason: 'Manual stop'
          }
        })
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Monitoring arrêté pour ce site',
      siteId
    })

  } catch (error) {
    console.error('Erreur arrêt monitoring:', error)
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'arrêt du monitoring',
        details: error.message 
      },
      { status: 500 }
    )
  }
}