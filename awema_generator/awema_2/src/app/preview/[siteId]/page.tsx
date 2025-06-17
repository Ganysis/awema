import { redirect } from 'next/navigation'

interface PreviewPageProps {
  params: { siteId: string }
}

export default function PreviewPage({ params }: PreviewPageProps) {
  // Rediriger vers l'API de prévisualisation
  redirect(`/api/preview/${params.siteId}?file=index.html`)
}

// Générer les metadata pour SEO
export async function generateMetadata({ params }: PreviewPageProps) {
  return {
    title: `Prévisualisation - Site ${params.siteId}`,
    description: 'Prévisualisation du site en construction par AWEMA',
    robots: 'noindex, nofollow' // Ne pas indexer les prévisualisations
  }
}