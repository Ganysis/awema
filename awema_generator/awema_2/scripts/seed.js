const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Créer un utilisateur admin par défaut
  const admin = await prisma.user.upsert({
    where: { email: 'admin@awema.fr' },
    update: {},
    create: {
      id: 'admin',
      email: 'admin@awema.fr',
      name: 'Admin AWEMA',
      password: 'awema2024'
    }
  })

  console.log('Utilisateur admin créé:', admin)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })