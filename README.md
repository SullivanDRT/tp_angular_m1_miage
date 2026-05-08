# BiblioApp — Gestion de Bibliothèque

Sullivan DEMARET — M1 MIAGE — Mai 2026

## Description

Application web de gestion de bibliothèque développée avec Angular. Elle permet de gérer un catalogue de livres avec des fonctionnalités CRUD complètes (Créer, Lire, Modifier, Supprimer), une recherche avancée, des filtres, et un système d'authentification simulé.

## Prérequis

- Node.js v18+
- Angular CLI : `npm install -g @angular/cli`
- JSON Server : `npm install -g json-server`

## Lancer le projet

```bash
# Installation des dépendances
npm install

# Terminal 1 : Lancer le serveur JSON (API REST simulée)
json-server --watch db.json --port 3000

# Terminal 2 : Lancer l'application Angular
ng serve
```

Ouvrir : [http://localhost:4200](http://localhost:4200)

## Fonctionnalités/Bonus réalisées (Tous les Tps ont été réalisés)

### Gestion des livres
- ✅ Affichage de la liste des livres avec cards stylisées
- ✅ Détail d'un livre (page dédiée)
- ✅ Ajout d'un nouveau livre (formulaire réactif avec validations)
- ✅ Modification d'un livre existant
- ✅ Suppression d'un livre avec confirmation

### Recherche et filtres
- ✅ Recherche par titre ou auteur
- ✅ Filtre par disponibilité (Tous / Disponibles / Indisponibles)
- ✅ Tri par titre (A→Z, Z→A) ou par année (croissant/décroissant)
- ✅ Pagination (5 livres par page) avec boutons Précédent/Suivant

### UX / UI
- ✅ Notification pop-up verte après ajout ou modification réussie (disparaît après 5 secondes)
- ✅ Indicateur de chargement (spinner)
- ✅ Messages d'erreur en cas de problème de connexion à l'API

### Pipes

- ✅ Pipe personnalisé `depuisAnnee` : affiche "publié il y a N ans"

### Guards et sécurité
- ✅ `authGuard` : protection des routes d'ajout/modification (authentification requise)
- ✅ `unsavedChangesGuard` : confirmation avant de quitter un formulaire modifié non sauvegardé
- ✅ Boutons Connexion / Déconnexion dans la Navbar

### Communication entre composants
- ✅ `@Input` : passage du nombre total de livres à la Navbar
- ✅ `@Output` : émission du compteur depuis ListeLivres vers App

## Structure du projet

```
src/app/
├── components/
│   ├── detail-livre/
│   ├── formulaire-livre/
│   ├── liste-livres/
│   └── navbar/
├── guards/
│   ├── auth.guard.ts
│   └── unsaved-changes.guard.ts
├── models/
│   └── livre.model.ts
├── pipes/
│   └── depuis-annee.pipe.ts
├── services/
│   ├── auth.service.ts
│   ├── livre.service.ts
│   └── notification.service.ts
└── app.routes.ts
```

## Technologies utilisées

- Angular 21
- TypeScript
- RxJS
- JSON Server (API REST simulée)
- CSS3 (variables, flexbox, grid, animations)
