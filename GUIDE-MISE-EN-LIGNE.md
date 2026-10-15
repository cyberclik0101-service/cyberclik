# 🚀 Guide de mise en ligne — CyberClik

Votre site est **100% statique** (HTML/CSS/JS) : pas de base de données, pas de
serveur PHP, pas de maintenance. Il peut vivre sur n'importe quel hébergeur.

---

## Option 1 — Hetzner / OVH / o2switch (domaine .ci, recommandé)

1. **Choisissez un hébergement** avec option "site statique" ou FTP
   (OVH, o2switch, Hostinger, Netcup… ~1 à 5 €/mois).
2. **Connectez-vous au cPanel ou au gestionnaire de fichiers** de l'hébergeur.
3. **Dézippez** l'archive `cyberclik-site.zip`.
4. **Téléversez** le contenu (pas le dossier, **le contenu**) dans
   `public_html/` (ou `www/`) :
   ```
   public_html/
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── README.md
   ├── GUIDE-MISE-EN-LIGNE.md
   ├── content/
   └── images/
   ```
   → L'arborescence doit rester **exactement identique** (les chemins
   `images/…` et `content/…` sont relatifs).
5. **Vérifiez** : `https://votre-domaine.ci` doit afficher le site.
   Le SSL (https) est généralement activé en 1 clic (Let's Encrypt) chez l'hébergeur.

### Optimiser le poids du site (recommandé)
Les affiches PNG font 3 à 8 Mo chacune. Pour un chargement éclair sur le mobile
ivoirien, compressez-les une fois (résultat identique à l'œil) :
- [Squoosh.app](https://squoosh.app) (gratuit, glisser-déposer, format WebP) →
  renommez en `.webp` et mettez à jour les `src` dans `content/content.js`.
- Ou gardez les PNG : le site reste fonctionnel, le premier chargement sera
  simplement plus gourmand.

### Formulaire de contact
Le formulaire valide les champs et **relaie la demande sur WhatsApp** (bouton
vert « Envoyer aussi via WhatsApp » après validation) — zéro configuration.
Pour recevoir aussi les messages **par email**, branchez un service gratuit en
10 minutes :
1. Créez un compte sur [Formspree](https://formspree.io) → nouveau formulaire.
2. Dans `index.html`, ligne `<form id="contact-form" novalidate>` :
   ajoutez `action="https://formspree.io/f/VOTRE_ID" method="POST"`.
3. Dans `script.js`, fonction formulaire : supprimez `e.preventDefault();`
   si vous voulez le comportement natif, ou gardez le validation JS.

---

## Option 2 — Netlify (gratuit, 5 minutes)

1. Allez sur [netlify.com](https://app.netlify.com/drop) → **Netlify Drop**.
2. Glissez-déposez le **dossier dézippé** (celui qui contient `index.html`)
   directement dans la page.
3. Le site est en ligne : `https://cyberclik-xxxxx.netlify.app`.
4. (Optionnel) Ajoutez votre domaine .ci dans *Domain settings*.

---

## Option 3 — Vercel (gratuit, 5 minutes)

1. Créez un dépôt Git (GitHub) et poussez-y les fichiers du site.
2. Importez le dépôt sur [vercel.com](https://vercel.com/new).
3. Vercel détecte le site statique et déploie automatiquement.

---

## ✔️ Checklist avant d'annoncer la mise en ligne

- [ ] Le logo s'affiche bien dans le menu et le footer.
- [ ] La galerie charge **toutes** les affiches (13 minimum).
- [ ] Le bouton WhatsApp (bulle verte en bas à droite) ouvre bien la
      conversation sur **07 67 44 17 71**.
- [ ] Les deux numéros cliquables appellent bien **05 95 82 57 31**
      et **07 13 64 40 62** (testez sur mobile).
- [ ] Les liens TikTok / Facebook / Instagram ouvrent les bons profils.
- [ ] La carte Abidjan : survol des communes, zoom +/−, déplacement à la souris.
- [ ] Le formulaire affiche l'écran vert « Demande reçue ! ».
- [ ] Test final sur **mobile 375 px** (votre téléphone) — tout doit être fluide.

## 🔁 Mettre à jour le site plus tard
- **Ajouter des affiches** → voir `content/README.md` (30 secondes).
- **Changer un texte** → ouvrez `index.html`, trouvez le texte, remplacez,
  re-téléversez le fichier.
- **Changer une couleur** → tout est dans les variables `:root` en haut de
  `styles.css` (`--or`, `--orange`, `--vert`…).
