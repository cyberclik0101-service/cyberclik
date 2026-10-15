# 📁 content/ — Votre contenu, entre vos mains

Ce dossier contient **tout ce qui est modifiable sans toucher au code** du site.

## `content.js` — le cerveau du contenu

| Ce qu'il contient | Comment le modifier |
|---|---|
| **La galerie** (23 affiches, prêtes pour 25+) | Tableau `gallery` : chaque bloc `{ src, title, cat, desc, tall }` = une affiche |
| **Les filtres** de la galerie | Tableaux `categories` + `labels` |
| **Coordonnées** (WhatsApp, téléphones, email) | Objet `brand` |

La légende (`desc`) est affichée **en permanence sous chaque affiche** et
en version complète dans la visionneuse (lightbox).

### ➕ Ajouter une affiche en 30 secondes
1. Déposez l'image (PNG ou JPG, **portrait 2:3** idéal ~1024×1536) dans **`/images`**.
2. Ajoutez un bloc dans `gallery` :
   ```js
   {
     src: "images/ma-nouvelle-affiche.png",   // ← chemin de l'image
     title: "Mon titre d'affiche",            // ← titre sous l'image
     cat: "ia",                               // ← "services" | "ia" | "cristaux" | "branding"
     desc: "La légende captivante de l'affiche.",
     tall: true                               // ← true = affiche pleine hauteur (rythme)
   }
   ```
3. Rechargez la page. C'est tout — filtres, visionneuse, parallaxe se mettent à jour seuls.

### 🎨 Palette à respecter pour de nouvelles affiches
Noir perle `#0A0A0A` · Or royal `#FFD700` · Blanc diamant `#FFFFFF` ·
Orange ivoirien `#FF6F00` (vert uniquement pour les éléments de marque
WhatsApp et le drapeau ivoirien).

## 💡 Astuces
- Le **hero** (fond d'accueil) = `images/hero-abidjan.jpg` (panoramique 16:9).
- Le **logo** menu/footer = `images/logo.png` (large).
- Le **logo rond** (favicon + préloader) = `images/logo-round.jpg`.
- Les **liens sociaux**, **numéros**, **email** et **CTA WhatsApp** sont dans
  `index.html` (recherchez `wa.me/2250767441771`, `cyberclik0101@gmail.com`…).
- Les **chiffres des statistiques** sont dans `index.html` : attributs
  `data-target` des balises `.counter`.
