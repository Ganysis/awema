import { randomBytes } from 'crypto'
import { prisma } from './prisma'

export function generateUniqueToken(): string {
  return randomBytes(32).toString('hex')
}

// Créer un formulaire pour un client
export async function createClientForm(clientId: string): Promise<string> {
  const token = generateUniqueToken()
  const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 jours

  await prisma.clientForm.create({
    data: {
      token,
      clientId,
      expiresAt,
      currentStep: 1,
      formData: JSON.stringify({})
    }
  })

  return token
}

// Récupérer les données d'un formulaire
export async function getFormData(token: string) {
  const form = await prisma.clientForm.findUnique({
    where: { token },
    include: {
      client: true
    }
  })

  if (!form || form.expiresAt < new Date()) {
    return null
  }

  return {
    id: form.id,
    token: form.token,
    client: form.client,
    currentStep: form.currentStep,
    formData: form.formData ? JSON.parse(form.formData) : {},
    completedAt: form.completedAt,
    expiresAt: form.expiresAt
  }
}

// Sauvegarder les données du formulaire
export async function saveFormData(token: string, step: number, data: any) {
  const form = await prisma.clientForm.findUnique({
    where: { token }
  })

  if (!form || form.expiresAt < new Date()) {
    throw new Error('Formulaire non trouvé ou expiré')
  }

  const currentData = form.formData ? JSON.parse(form.formData) : {}
  const updatedData = { ...currentData, [`step${step}`]: data }

  await prisma.clientForm.update({
    where: { token },
    data: {
      currentStep: Math.max(step, form.currentStep),
      formData: JSON.stringify(updatedData),
      updatedAt: new Date()
    }
  })
}

// Compléter le formulaire
export async function completeForm(token: string) {
  const form = await prisma.clientForm.findUnique({
    where: { token },
    include: { client: true }
  })

  if (!form) {
    throw new Error('Formulaire non trouvé')
  }

  // Marquer le formulaire comme complété
  await prisma.clientForm.update({
    where: { token },
    data: {
      completedAt: new Date(),
      currentStep: 3 // Étape finale
    }
  })

  // Mettre à jour le statut du client
  await prisma.client.update({
    where: { id: form.clientId },
    data: {
      status: 'DONNEES_COLLECTEES'
    }
  })

  return form
}