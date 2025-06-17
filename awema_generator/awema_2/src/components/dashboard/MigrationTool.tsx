// Outil de migration des sites existants vers le système de blocs
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Zap, 
  Shield, 
  TrendingUp,
  Clock,
  Star,
  ArrowRight
} from 'lucide-react'

interface MigrationToolProps {
  projectId: string
  siteData: {
    templateName: string
    status: string
    metadata?: any
  }
  onMigrationComplete?: (newSiteId: string) => void
}

export default function MigrationTool({ 
  projectId, 
  siteData, 
  onMigrationComplete 
}: MigrationToolProps) {
  const [migrationAnalysis, setMigrationAnalysis] = useState(null)
  const [migrationStatus, setMigrationStatus] = useState<'idle' | 'analyzing' | 'ready' | 'migrating' | 'complete' | 'error'>('idle')
  const [migrationResult, setMigrationResult] = useState(null)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)

  // Vérifier si le site peut être migré
  const canMigrate = siteData.metadata?.generationMethod !== 'BLOCKS_SYSTEM'

  useEffect(() => {
    if (canMigrate) {
      analyzeMigrationFeasibility()
    }
  }, [projectId, canMigrate])

  const analyzeMigrationFeasibility = async () => {
    setMigrationStatus('analyzing')
    setError('')

    try {
      const response = await fetch(`/api/projects/${projectId}/migrate-to-blocks`)
      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setMigrationStatus('error')
        return
      }

      setMigrationAnalysis(data)
      setMigrationStatus('ready')
    } catch (err) {
      setError('Erreur lors de l\'analyse de faisabilité')
      setMigrationStatus('error')
    }
  }

  const startMigration = async () => {
    setMigrationStatus('migrating')
    setError('')
    setProgress(0)

    try {
      // Simuler le progrès
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + Math.random() * 15, 90))
      }, 500)

      const response = await fetch(`/api/projects/${projectId}/migrate-to-blocks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          createBackup: true,
          style: 'standard',
          preserveCustomizations: true
        })
      })

      clearInterval(progressInterval)
      setProgress(100)

      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setMigrationStatus('error')
        return
      }

      setMigrationResult(data)
      setMigrationStatus('complete')
      
      if (onMigrationComplete) {
        onMigrationComplete(data.newSiteInstanceId)
      }
    } catch (err) {
      setError('Erreur lors de la migration')
      setMigrationStatus('error')
    }
  }

  if (!canMigrate) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            Site déjà modernisé
          </CardTitle>
          <CardDescription className="text-green-600">
            Ce site utilise déjà le système de blocs modulaire ultra-moderne
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-green-700">
            <Badge className="bg-green-100 text-green-800">
              Système Blocs Actif
            </Badge>
            {siteData.metadata?.migrationDate && (
              <span>
                Migré le {new Date(siteData.metadata.migrationDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            Migration vers le Système de Blocs
          </CardTitle>
          <CardDescription>
            Modernisez votre site avec la technologie révolutionnaire 2025
          </CardDescription>
        </CardHeader>
        <CardContent>
          {migrationStatus === 'analyzing' && (
            <div className="flex items-center gap-3 py-4">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span>Analyse de votre site en cours...</span>
            </div>
          )}

          {migrationStatus === 'error' && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {migrationStatus === 'ready' && migrationAnalysis && (
            <div className="space-y-6">
              {/* Analyse de faisabilité */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-gray-900">Éléments conservés</h4>
                  <div className="space-y-2">
                    {migrationAnalysis.analysis.preservableElements.map((element, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{element}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-gray-900">Bénéfices de la migration</h4>
                  <div className="space-y-2">
                    {migrationAnalysis.analysis.benefits.slice(0, 4).map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Score de bénéfice */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Score de bénéfice</span>
                  <Badge 
                    className={
                      migrationAnalysis.benefitScore > 80 
                        ? 'bg-green-100 text-green-800'
                        : migrationAnalysis.benefitScore > 60
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }
                  >
                    {migrationAnalysis.benefitScore}/100
                  </Badge>
                </div>
                <Progress value={migrationAnalysis.benefitScore} className="mb-2" />
                <p className="text-sm text-gray-600">
                  {migrationAnalysis.recommendation === 'HIGHLY_RECOMMENDED' && 'Très fortement recommandé'}
                  {migrationAnalysis.recommendation === 'RECOMMENDED' && 'Recommandé'}
                  {migrationAnalysis.recommendation === 'OPTIONAL' && 'Optionnel'}
                </p>
              </div>

              {/* Informations techniques */}
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>Temps: {migrationAnalysis.analysis.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Sauvegarde automatique</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                  <span>Complexité: {migrationAnalysis.analysis.complexity}</span>
                </div>
              </div>

              {/* Problèmes potentiels */}
              {migrationAnalysis.analysis.potentialIssues.length > 0 && (
                <Alert className="border-yellow-200 bg-yellow-50">
                  <Info className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <div className="font-medium mb-1">Points d'attention:</div>
                    <ul className="space-y-1 text-sm">
                      {migrationAnalysis.analysis.potentialIssues.map((issue, index) => (
                        <li key={index}>• {issue}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* Avant/Après */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Comparaison Avant / Après</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium text-gray-700 mb-2">Actuel</div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>Template: {migrationAnalysis.currentData.templateName}</div>
                      <div>Services: {migrationAnalysis.currentData.servicesCount}</div>
                      <div>Villes: {migrationAnalysis.currentData.citiesCount}</div>
                      <div>Design: Standard</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-purple-700 mb-2">Après migration</div>
                    <div className="space-y-1 text-sm text-purple-600">
                      <div>Système: Blocs modulaires</div>
                      <div>Design: Ultra-professionnel 2025</div>
                      <div>SEO: Ultra-optimisé</div>
                      <div>Performance: +40% plus rapide</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={startMigration}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Migrer vers le système de blocs
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {migrationStatus === 'migrating' && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <div className="font-medium">Migration en cours...</div>
                <div className="text-sm text-gray-600">
                  Modernisation de votre site avec le système de blocs
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progression</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} />
              </div>

              <div className="text-xs text-gray-500 text-center">
                Création de la sauvegarde, conversion des éléments, génération des blocs...
              </div>
            </div>
          )}

          {migrationStatus === 'complete' && migrationResult && (
            <div className="space-y-6">
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <div className="font-medium">Migration réussie !</div>
                  <div className="text-sm mt-1">
                    Votre site a été modernisé avec le système de blocs
                  </div>
                </AlertDescription>
              </Alert>

              {/* Statistiques de migration */}
              <div className="grid sm:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {migrationResult.stats.convertedBlocks}
                  </div>
                  <div className="text-sm text-gray-600">Blocs créés</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {migrationResult.stats.convertedElements}
                  </div>
                  <div className="text-sm text-gray-600">Éléments convertis</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {migrationResult.stats.warnings}
                  </div>
                  <div className="text-sm text-gray-600">Avertissements</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {migrationResult.stats.recommendations}
                  </div>
                  <div className="text-sm text-gray-600">Recommandations</div>
                </div>
              </div>

              {/* Rapport détaillé */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Rapport de migration</h4>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium text-green-700">Éléments convertis:</div>
                    <ul className="mt-1 space-y-1 text-gray-600">
                      {migrationResult.migrationReport.convertedElements.map((element, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {element}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {migrationResult.migrationReport.warnings.length > 0 && (
                    <div>
                      <div className="font-medium text-yellow-700">Avertissements:</div>
                      <ul className="mt-1 space-y-1 text-gray-600">
                        {migrationResult.migrationReport.warnings.map((warning, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <AlertTriangle className="h-3 w-3 text-yellow-500" />
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <div className="font-medium text-blue-700">Recommandations:</div>
                    <ul className="mt-1 space-y-1 text-gray-600">
                      {migrationResult.migrationReport.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Info className="h-3 w-3 text-blue-500" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions post-migration */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="outline"
                  onClick={() => window.open(migrationResult.previewUrl, '_blank')}
                >
                  Prévisualiser le nouveau site
                </Button>
                <Button>
                  Accéder au dashboard CMS
                </Button>
              </div>

              {migrationResult.backupSiteId && (
                <div className="text-center text-sm text-gray-500">
                  Une sauvegarde de l'ancien site a été créée automatiquement
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}