# AWEMA 2 - Générateur de sites web simplifié

AWEMA 2 est une version simplifiée et optimisée de la plateforme AWEMA pour la création et gestion de sites web professionnels.

## 🚀 Fonctionnalités principales

### 📊 Dashboard de gestion
- Vue d'ensemble de l'activité
- Statistiques en temps réel
- Actions rapides

### 👥 Gestion des clients
- Ajout et gestion des clients
- Statuts automatiques (NOUVEAU → FORMULAIRE_ENVOYE → DONNEES_COLLECTEES → EN_PRODUCTION → LIVRE)
- Interface simple et intuitive

### 📝 Système de formulaires
- Formulaires en 3 étapes pour les clients :
  1. **Informations entreprise** : Coordonnées, activité, description
  2. **Design et services** : Couleurs, logo, services proposés
  3. **Finalisation** : Horaires, domaine, mots-clés SEO
- Auto-sauvegarde à chaque étape
- URLs sécurisées avec tokens uniques
- Expiration automatique (14 jours)

### 🏭 Pipeline de production
- Génération automatique de sites web
- Template universel responsive
- SEO optimisé avec Schema.org
- Prévisualisation avec bandeau "construction"

### 👁️ Système de prévisualisation
- URL unique par site généré
- Mode "construction" pour les clients
- Sites 100% locaux avant déploiement

## 🛠️ Installation et utilisation

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation
```bash
# Installation des dépendances
npm install

# Configuration de la base de données
npx prisma generate
npx prisma db push

# Démarrage du serveur de développement
npm run dev
```

### Accès
- Dashboard admin : http://localhost:3001/dashboard
- Formulaires clients : http://localhost:3001/form/[token]
- Prévisualisations : http://localhost:3001/preview/[siteId]

## 📱 Utilisation

### 1. Ajouter un client
1. Aller dans "Clients" depuis le dashboard
2. Cliquer sur "Nouveau client"
3. Remplir les informations de base

### 2. Envoyer un formulaire
1. Dans la liste des clients, cliquer sur "Envoyer formulaire"
2. Copier l'URL générée et l'envoyer au client
3. Le client remplit le formulaire en 3 étapes

### 3. Générer le site
1. Une fois le formulaire complété, aller dans "Production"
2. Cliquer sur "Générer site" pour le projet
3. Le site est automatiquement créé et une URL de prévisualisation est disponible

### 4. Livraison
1. Tester le site via l'URL de prévisualisation
2. Marquer le projet comme "Livré" une fois terminé

## 🎨 Template universel

Le template inclut :
- **Header fixe** avec logo et contacts
- **Section hero** avec présentation
- **Services** (jusqu'à 6 services)
- **À propos** avec caractéristiques
- **Contact** avec formulaire fonctionnel
- **Footer** complet

### Fonctionnalités du template :
- 100% responsive (mobile-first)
- Couleurs personnalisables
- Logo optionnel
- Formulaire de contact (mailto)
- Animations CSS
- SEO optimisé
- Schema.org structured data

## 🗂️ Structure des données

### Modèles Prisma :
- **User** : Administrateurs AWEMA
- **Client** : Entreprises clientes
- **ClientForm** : Formulaires envoyés
- **Project** : Projets de sites web
- **Template** : Templates de sites (extensible)

### Statuts :
- **Clients** : NOUVEAU → FORMULAIRE_ENVOYE → DONNEES_COLLECTEES → EN_PRODUCTION → LIVRE
- **Projets** : COLLECTE → PRODUCTION → PRET → LIVRE

## 🔧 Configuration

### Variables d'environnement (.env)
```env
DATABASE_URL="file:./prisma/awema2.db"
NEXTAUTH_SECRET="awema2-secret-key-2024"
NEXTAUTH_URL="http://localhost:3001"
```

### Ports
- Port par défaut : 3001 (configurable)
- Base de données SQLite locale

## 📁 Structure du projet

```
src/
├── app/
│   ├── api/                 # API Routes
│   │   ├── clients/         # Gestion clients
│   │   ├── forms/           # Gestion formulaires
│   │   └── projects/        # Gestion projets
│   ├── dashboard/           # Interface admin
│   ├── form/               # Formulaires clients
│   └── preview/            # Prévisualisation sites
├── lib/
│   ├── prisma.ts           # Configuration Prisma
│   ├── forms.ts            # Utilitaires formulaires
│   └── template.ts         # Génération de templates
└── prisma/
    └── schema.prisma       # Schéma base de données
```

## 🚧 Prochaines améliorations

- [ ] Système d'authentification admin
- [ ] Templates multiples
- [ ] Export FTP automatique
- [ ] Gestion des médias
- [ ] Système de notifications
- [ ] Analytics de performance

## 💡 Différences avec AWEMA 1

### Simplifications :
- ✅ Un seul template universel (vs 7 templates)
- ✅ 3 étapes de formulaire (vs 5 étapes)
- ✅ Base de données SQLite (vs PostgreSQL complexe)
- ✅ Génération 100% locale (vs externe)
- ✅ Interface épurée et intuitive

### Améliorations :
- ✅ Auto-sauvegarde formulaires
- ✅ Prévisualisation intégrée
- ✅ Statuts automatiques
- ✅ SEO optimisé par défaut
- ✅ Templates responsive modernes

AWEMA 2 conserve toutes les fonctionnalités essentielles tout en simplifiant l'expérience utilisateur et la maintenance.
