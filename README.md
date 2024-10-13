# Test Poker Winamax - Sébastien Garcia

## Lancement du projet

Pour lancer le projet, vous avez deux options :

1. Pour un environnement de production :

   ```bash
   npm run build
   npm run start
   # ou
   yarn build
   yarn start
   # ou
   pnpm build
   pnpm start
   # ou
   bun build
   bun start
   ```

2. Pour un environnement de développement (si vous souhaitez faire des changements) :
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   # ou
   bun dev
   ```

## Choix Techniques

- Next.JS: C'est performant, ça permet de facilement faire des server component, d'avoir un SEO
  (référecnement google) excellent. Utilisation de "use Client" pour les Client component. Les fichier page.tsx ainsi que l'architecture du dossier `app` sert à la navigation entre les pages.
- TailwindCSS :Permet d'avoir facilement un design responsive , un design system, et de gagner en
  performance
- Framer Motion : Permet d'avoir des animations fluides et de qualité
- React Hook Form : Permet de gérer facilement les formulaires
- date-fns : Pour la gestion des dates
- sinon : Pour simuler une date
- prettier: Pour avoir un code propre et homogène

## Notes

- J'ai limité la taille des composants car il n'y a aps assez de données à mon goût pour pouvoir
  agrandire d'avantage les composants. Cela évite à l'utilisateur de devoir balayer de gauche à
  droite l'écran afin d'avoir toutes les infos nécéssaires.
- Pour la partie des Triplet Poker, j'ai d'abord opté pour afficher tous les triples tournois
  possibles. De souvenir j'étais arrivé à plus de 5 millions de possibilités. Cette solution avait
  deux problèmes selon moi. Le premier était pour les performance, j'ai commencé à résoudre ce
  problème en faisant les calculs de manière incrémentiels, je m'arrétais tous les 20 résultats et
  reprenait là où j'en étais. L'autre problème qui est encore plus important est que, selon moi,
  cette solution n'est pas la bonne d'un point de vue UX/UI. J'ai donc opté pour la solution que
  j'ai implémenté qui est plus ergonomique et plus performante, pour arriver a un résultat
  similaire.
  - Afin d'avoir un système d'affichage de la date équivalent qui puisse être visible dans la démo,
    j'ai du simuler la date du 18 septembre 2023 dans la fonction d'affichage de la date.

## Pistes d'améliorations

- Régler le problème des index.ts, pour ne plus à avoir à afficher index dans les paths
- ⚠️ Mettre de la doc
- L'animation présente 1 défault, si on clique trop vite sur le bouton elle bug.
- Amélioration: afficher une animation sur les cards lors du survol, lorsqu'elles
  disparaissent/apparaissent
- Mettre des tests unitaires et/end to end
- Mettre en place Storybook
- Mise en place du cache avec Tanstack (React-Query)
- Le fichier TournamentList est un peu long, il pourrait être amélioré.

Parler de l'utilisation des context pour faciliter la gestion des données à travers le projet, eviter de rerendre certains composants inutilements.
