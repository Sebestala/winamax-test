# 🃏 Test Poker Winamax - Sébastien Garcia

## 🚀 Lancement du projet

Deux options pour démarrer le projet :

1. Deux options pour démarrer le projet :

```bash
npm run build && npm run start
# ou
yarn build && yarn start
# ou
pnpm build && pnpm start
# ou
bun build && bun start
```

2. Environnement de développement (pour effectuer des modifications) :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

## 🛠️ Choix Techniques

- TailwindCSS : Facile à utiliser pour un design responsive, un design system, et des performances accrues.
- Next.js : Performant avec un excellent SEO grâce aux Server Components.
- Framer Motion : Pour des animations fluides et soignées.
- React Hook Form : Simplifie la gestion des formulaires.
- Prettier : Assure un code propre et homogène.
- Sinon : Simulation des dates pour les tests.
- date-fns : Gestion efficace des dates.

## ✨ Fonctionnalités

- Pour les Triplets Poker, j’avais initialement opté pour afficher toutes les combinaisons possibles (environ 5 millions). Cependant, cette solution posait des problèmes de performance. J’ai partiellement résolu cela en procédant par calculs incrémentaux, tous les 20 résultats je m'arretais puis reprenait si besoin les calculs là où ils en étaient, mais j’ai opté pour une solution plus ergonomique et performante.
- Mise en place d’un scroll infini pour la liste des tournois, avec un observer natif pour optimiser les performances.
- Utilisation des contextes pour une gestion optimisée des données et éviter des re-rendus inutiles.
- Le nombre de jetons affichés dans l’animation d’une TournamentCard dépend du prizepool.
- J’ai simulé la date du 18 septembre 2023 pour un affichage cohérent dans la démo.
- Utilisation de `use Client` pour les composants clients dans Next.js.
- Utilisation de la mémoïsation pour réduire les re-rendus inutiles.

## 🔧 Pistes d'amélioration

- Ajouter des animations aux cartes lors du hover et à leur disparition/apparition.
- Résoudre le bug d’animation lors de clics rapides sur les `TournamentCard`.
- Corriger l’affichage des chemins dans les index.ts.
- Mettre en place des tests unitaires et end-to-end.
- Ajouter du cache avec Tanstack (React-Query).
- Intégrer Storybook.

## 📝 Notes

- Pas de pixel perfect car il n’y avait pas de maquette spécifique et cela irait à l’encontre de l’approche Tailwind et du design system.
- Limitation de la taille des composants pour éviter que l’utilisateur ait à balayer l’écran des yeux.
- Lors de la recherche de triplets, les trois étoiles du `ButtonTournamentsMenu` sont animées.
- Les scores Lighthouse en production (avec pnpm start) sont excellents ! 🚀
