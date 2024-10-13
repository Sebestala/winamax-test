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

## Notes

- Voir d'autres dimensions de pages
- Supprimer les classes CSS et apprendre raccourcis claviers
- Diminuer taille texte et image quand tout petit écran, enlever span-2 ?
- lors du scroll vers le haut, la topnavbar est un peu mangée
- Manque accessibilité
- Voir Lighthouse
- Activer le toggle quand je clic sur valider budget

## Questions à poser

- Sur la page d'acceuil, il n'est aps précisé si je dois afficher toute la liste json ou non. Si je
  peux faire une pagination pour améliorer les performences.
- Est-ce grave si je ne fais aps du pixel perfect ? Car cela va a l'encontre du principe de TW
  (Tailwind) et de son Design system

## Pixel Perfect

Je n'ai pas fais du pixel perfect pour deux raisons:

- Il aurait fallu une maquette Figma/AdobeXD, un screen n'est pas suffisant pour faire du pixel
  perfect
- Cela va à l'encontre du principe de TW (Tailwind) et de son Design system

Cependant le projet se rapproche autant que possible du pixel perfect. Comment cela affecte le
projet:

- Dans TW on ne peut aller en dessous de la taille text-xs, pour la date du tournoi il me semble que
  ça reste trop grand.
- Les arrondis des angles des drapeaux et icons ne sont pas parfaitement identiques, il faudrait
  utiliser une taille intermediaire entre rounded-sm et rounded-md
- La hauteur des cards est plus grande que la maquette

## Autres

- J'ai limité la taille des composants car il n'y a aps assez de données à mon goût pour pouvoir
  agrandire d'avantage les composants. Cela évite à l'utilisateur de devoir balayer de gauche à
  droite l'écran afin d'avoir toutes les infos nécéssaires.
- Amélioration: mettre du son
- L'animation présente 1 défault, si on clique trop vite sur le bouton elle bug.
- Parler du fait que j'ai hésité avec l'affichage des triplets. Que j'ai hésité à afficher Toutes
  les triplets possibles, mais que j'ai opté pour cette solution qui est bien plus ergonomique et
  plus performante, pour un résultat similaire.
- Amélioration: afficher une animation sur les cards lors du survol, lorsqu'elles
  disparaissent/apparaissent

## Améliorations

### Améliorations au niveau du code

- Régler le problème des index.ts, pour ne plus à avoir à afficher index dans les paths
- ⚠️ lint pour TW

### Améliorations Graphiques
