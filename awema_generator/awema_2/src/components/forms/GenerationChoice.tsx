// Composant pour choisir le système de génération (Legacy vs Blocs)
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Zap, Palette, Smartphone, TrendingUp, Settings, Star } from 'lucide-react'

interface GenerationChoiceProps {
  formToken: string
  formData: any
  onGenerate: (method: 'legacy' | 'blocks', options: any) => void
  loading: boolean
}

export default function GenerationChoice({ 
  formToken, 
  formData, 
  onGenerate, 
  loading 
}: GenerationChoiceProps) {
  const [selectedMethod, setSelectedMethod] = useState<'legacy' | 'blocks'>('blocks')
  const [selectedStyle, setSelectedStyle] = useState<'ultra-pro' | 'premium' | 'standard' | 'minimal'>('ultra-pro')
  const [includeLocalSeo, setIncludeLocalSeo] = useState(true)
  const [showPreview, setShowPreview] = useState(false)
  const [previewData, setPreviewData] = useState(null)

  const styles = {
    'ultra-pro': {
      name: 'Ultra-Pro 2025',
      description: 'Design premium avec animations avancées et effets glassmorphism',
      features: ['Animations parallax', 'Glassmorphism', 'Design 2025', 'Performance optimisée'],
      recommended: true,
      price: '+0€'
    },
    'premium': {
      name: 'Premium',
      description: 'Design professionnel avec carrousels et vidéos',
      features: ['Carrousels interactifs', 'Supports vidéo', 'Design moderne', 'SEO optimisé'],
      recommended: false,
      price: '+0€'
    },
    'standard': {
      name: 'Standard',
      description: 'Design classique et efficace',
      features: ['Grilles de services', 'Design propre', 'Responsive', 'Rapide à charger'],
      recommended: false,
      price: '+0€'
    },
    'minimal': {
      name: 'Minimal',
      description: 'Design épuré et minimaliste',
      features: ['Design épuré', 'Ultra-rapide', 'Mobile-first', 'Conversion optimisée'],
      recommended: false,
      price: '+0€'
    }
  }

  const handlePreview = async () => {
    if (selectedMethod === 'blocks') {
      try {
        setShowPreview(true)
        const response = await fetch(`/api/forms/${formToken}/generate-blocks?style=${selectedStyle}&includeLocalSeo=${includeLocalSeo}`)
        const data = await response.json()
        setPreviewData(data.preview)
      } catch (error) {
        console.error('Erreur prévisualisation:', error)
      }
    }
  }

  const handleGenerate = () => {
    if (selectedMethod === 'blocks') {
      onGenerate('blocks', {
        style: selectedStyle,
        includeLocalSeo,
        customBlocks: []
      })
    } else {
      onGenerate('legacy', {})
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Choisissez votre système de génération
        </h1>
        <p className="text-lg text-gray-600">
          Sélectionnez le système qui correspond le mieux à vos besoins
        </p>
      </div>

      {/* Choix du système */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Système Legacy */}
        <Card 
          className={`cursor-pointer transition-all duration-300 ${
            selectedMethod === 'legacy' 
              ? 'ring-2 ring-blue-500 bg-blue-50' 
              : 'hover:bg-gray-50'
          }`}
          onClick={() => setSelectedMethod('legacy')}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Système Classique
              </CardTitle>
              <Badge variant="secondary">Éprouvé</Badge>
            </div>
            <CardDescription>
              Système traditionnel rapide et fiable
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Génération ultra-rapide
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Templates éprouvés
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Compatible mobile
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                SEO de base inclus
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-500">
                Temps de génération: 10-30 secondes
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Système Blocs */}
        <Card 
          className={`cursor-pointer transition-all duration-300 relative ${
            selectedMethod === 'blocks' 
              ? 'ring-2 ring-purple-500 bg-purple-50' 
              : 'hover:bg-gray-50'
          }`}
          onClick={() => setSelectedMethod('blocks')}
        >
          <div className="absolute -top-2 -right-2">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Star className="h-3 w-3 mr-1" />
              NOUVEAU
            </Badge>
          </div>
          
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Système Blocs Modulaire
              </CardTitle>
              <Badge variant="default" className="bg-purple-100 text-purple-800">
                Recommandé
              </Badge>
            </div>
            <CardDescription>
              Technologie révolutionnaire 2025 avec blocs modulaires
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Palette className="h-4 w-4 text-purple-500" />
                Design ultra-professionnel 2025
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Smartphone className="h-4 w-4 text-purple-500" />
                Animations & effets visuels
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                SEO ultra-optimisé
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-purple-500" />
                Modulaire et flexible
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-500">
                Temps de génération: 30-90 secondes
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Options du système Blocs */}
      {selectedMethod === 'blocks' && (
        <div className="space-y-6 animate-in slide-in-from-bottom duration-300">
          {/* Choix du style */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Choisissez votre style</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(styles).map(([key, style]) => (
                <Card
                  key={key}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedStyle === key
                      ? 'ring-2 ring-purple-500 bg-purple-50'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedStyle(key as any)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{style.name}</CardTitle>
                      {style.recommended && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          <Star className="h-3 w-3 mr-1" />
                          Top
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm">
                      {style.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1">
                      {style.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <span className="text-sm font-medium text-purple-600">
                        {style.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Options supplémentaires */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Options avancées</h3>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLocalSeo}
                  onChange={(e) => setIncludeLocalSeo(e.target.checked)}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <div>
                  <div className="font-medium">SEO Local Avancé</div>
                  <div className="text-sm text-gray-600">
                    Génère automatiquement des pages optimisées pour chaque service + ville
                    {formData.step3?.serviceCities && (
                      <span className="ml-1 font-medium">
                        ({formData.step2?.services?.length || 0} × {formData.step3.serviceCities.length} = {(formData.step2?.services?.length || 0) * formData.step3.serviceCities.length} pages)
                      </span>
                    )}
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Prévisualisation */}
          {showPreview && previewData && (
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-blue-800">
                Aperçu de votre site
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-medium text-blue-700">Pages totales</div>
                  <div className="text-2xl font-bold text-blue-900">{previewData.totalPages}</div>
                </div>
                <div>
                  <div className="font-medium text-blue-700">Types de blocs</div>
                  <div className="text-2xl font-bold text-blue-900">{previewData.blockTypes.length}</div>
                </div>
                <div>
                  <div className="font-medium text-blue-700">Score SEO</div>
                  <div className="text-2xl font-bold text-blue-900">{previewData.seoScore}/100</div>
                </div>
                <div>
                  <div className="font-medium text-blue-700">Temps estimé</div>
                  <div className="text-lg font-bold text-blue-900">{previewData.estimatedTime}</div>
                </div>
              </div>
              
              {previewData.recommendations?.length > 0 && (
                <div className="mt-4">
                  <div className="font-medium text-blue-700 mb-2">Recommandations:</div>
                  <ul className="space-y-1">
                    {previewData.recommendations.map((rec, index) => (
                      <li key={index} className="text-blue-600 text-sm flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        {selectedMethod === 'blocks' && (
          <Button
            variant="outline"
            onClick={handlePreview}
            disabled={loading}
            className="order-2 sm:order-1"
          >
            Aperçu du résultat
          </Button>
        )}
        
        <Button
          onClick={handleGenerate}
          disabled={loading}
          size="lg"
          className={`order-1 sm:order-2 ${
            selectedMethod === 'blocks'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Génération en cours...
            </div>
          ) : (
            `Générer mon site ${selectedMethod === 'blocks' ? 'avec blocs' : 'classique'}`
          )}
        </Button>
      </div>

      {/* Comparaison */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-center">Comparaison des systèmes</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium">Fonctionnalité</th>
                <th className="text-center py-2 font-medium">Classique</th>
                <th className="text-center py-2 font-medium">Blocs Modulaire</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              <tr className="border-b">
                <td className="py-2">Temps de génération</td>
                <td className="text-center py-2">⚡ 10-30s</td>
                <td className="text-center py-2">🔥 30-90s</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Design qualité</td>
                <td className="text-center py-2">✅ Bien</td>
                <td className="text-center py-2">🌟 Exceptionnel</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Animations & effets</td>
                <td className="text-center py-2">❌ Basique</td>
                <td className="text-center py-2">✨ Avancés</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">SEO optimisation</td>
                <td className="text-center py-2">✅ Standard</td>
                <td className="text-center py-2">🚀 Ultra-optimisé</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Personnalisation</td>
                <td className="text-center py-2">⚠️ Limitée</td>
                <td className="text-center py-2">🎨 Illimitée</td>
              </tr>
              <tr>
                <td className="py-2">Différenciation concurrence</td>
                <td className="text-center py-2">📱 Correct</td>
                <td className="text-center py-2">💎 Unique</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}