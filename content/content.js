/* ═══════════════════════════════════════════════════════════════
   CYBERCLIK — FICHIER DE CONTENU ÉDITABLE
   ─────────────────────────────────────────────────────────────
   ✏️  TOUTE la galerie, ses légendes et filtres se modifient ICI.
       Ajoutez / supprimez / réordonnez les affiches sans toucher
       au HTML : le site se met à jour tout seul au rechargement.

   POUR AJOUTER UNE AFFICHE :
     1. Déposez votre image (PNG/JPG, portrait 2:3 idéal) dans /images
     2. Copiez un bloc { ... } dans le tableau "gallery" ci-dessous
     3. Remplissez :  src (chemin), title (titre), cat (catégorie),
                      desc (légende affichée sous l'image + visionneuse)
     Catégories : "services" · "ia" · "cristaux" · "branding"
     (nouvelle catégorie = 1 mot dans "categories" + "labels")

   Le hero utilise  /images/hero-abidjan.jpg
   Le logo (menu/footer) :  /images/logo.png
   Le logo rond (favicon, préloader) :  /images/logo-round.jpg
   Palette à respecter : noir perle #0A0A0A · or #FFD700 ·
   orange #FF6F00 · blanc #FFFFFF
   ═══════════════════════════════════════════════════════════════ */

window.CYBERCLIK = {

  brand: {
    name: "CyberClik",
    tagline: "L'Agence Digitale N°1 en Côte d'Ivoire",
    slogan: "Votre succès commence en ligne",
    waNumber: "2250767441771",
    waDisplay: "07 67 44 17 71",
    email: "cyberclik0101@gmail.com",
    phones: [
      { display: "05 95 82 57 31", tel: "+2250595825731" },
      { display: "07 13 64 40 62", tel: "+2250713644062" }
    ]
  },

  categories: ["tous", "services", "ia", "cristaux", "branding"],

  labels: {
    tous: "Tous",
    services: "Services",
    ia: "IA & Futur",
    cristaux: "Cristaux & Luxe",
    branding: "Branding"
  },

  /* ── GALERIE ────────────────────────────────────────────────
     "tall": true  →  l'affiche occupe 2 rangées (rythme de grille) */
  gallery: [

    /* ── SERVICES ──────────────────────────────────────────── */
    {
      src: "images/poster-site-vitrine.png",
      title: "Site Web Vitrine Premium",
      cat: "services",
      desc: "Votre activité habillée en 6 étoiles : un site ultrarapide, 100% responsive et taillé pour Google, qui transforme chaque visite en affaire.",
      tall: false
    },
    {
      src: "images/poster-video-ia.png",
      title: "Vidéo IA — Nouvelle Génération",
      cat: "services",
      desc: "Impact, Influence, Domination : des spots publicitaires 4K ultra réalistes, générés par IA, livrés en 72h pour TikTok, Instagram et la TV.",
      tall: true
    },
    {
      src: "images/poster-visibilite-locale.png",
      title: "Adresse & Visibilité Locale",
      cat: "services",
      desc: "Fiche Google Business vérifiée, horaires, avis clients, Apple Plans : votre entreprise, trouvée partout à Abidjan, en un seul clic.",
      tall: false
    },
    {
      src: "images/poster-boost-commerce.png",
      title: "Boostez Votre Commerce",
      cat: "services",
      desc: "La dynamique complète de la croissance digitale ivoirienne : sites, vidéos IA, infographies, affiches et visibilité, du Plateau jusqu'à Bingerville.",
      tall: false
    },
    {
      src: "images/poster-infographie.png",
      title: "Infographies Data Premium",
      cat: "services",
      desc: "Vos chiffres, racontés en or : graphiques holographiques, rapports et présentations qui convainquent avant même d'être lus.",
      tall: false
    },
    {
      src: "images/poster-affiche-studio.png",
      title: "Affiches Prêtes à Imprimer",
      cat: "services",
      desc: "L'exigence du print de luxe : des affiches générées par IA, retouchées main, prêtes à sortir de l'imprimerie en haute définition.",
      tall: false
    },
    {
      src: "images/poster-pin-hologramme.png",
      title: "Visibilité sur la Carte",
      cat: "services",
      desc: "Votre emplacement, épinglé dans la lumière : référencement local, itinéraires et conversions, quartier par quartier.",
      tall: false
    },
    {
      src: "images/poster-hologramme-mains.png",
      title: "Main & Hologramme",
      cat: "services",
      desc: "Le geste humain rencontre l'interface d'or : la philosophie CyberClik, où l'intelligence artificielle reste au service du talent.",
      tall: false
    },

    /* ── IA & FUTUR ────────────────────────────────────────── */
    {
      src: "images/poster-afrique-verte.png",
      title: "Afrique Connectée",
      cat: "ia",
      desc: "Le continent en réseau vivant : nœuds, flux, énergie — et la Côte d'Ivoire épinglée au centre du jeu digital mondial.",
      tall: false
    },
    {
      src: "images/poster-interface-ia.png",
      title: "Interface IA Immersive",
      cat: "ia",
      desc: "Verre sombre, or royal, données en mouvement : l'esthétique des outils sur-mesure que nous concevons pour vos projets.",
      tall: false
    },
    {
      src: "images/poster-ecran-courbe.png",
      title: "Cinéma Écran Courbe",
      cat: "ia",
      desc: "L'immersion totale de vos campagnes : la précision du grand écran, la puissance d'un message qui saisit la salle entière.",
      tall: false
    },
    {
      src: "images/poster-androide.png",
      title: "Androide Premium",
      cat: "ia",
      desc: "Le gardien silencieux de votre image : circuits d'or, regard de braise, conception Abidjan, ambition mondiale.",
      tall: false
    },
    {
      src: "images/poster-neon-or.png",
      title: "Silk Néon Royal",
      cat: "ia",
      desc: "Des rubans de lumière or et orange dans la nuit : l'énergie cinétique d'une marque qui avance sans s'arrêter.",
      tall: false
    },
    {
      src: "images/poster-ecran-immersif.png",
      title: "Hologramme d'Aurore",
      cat: "ia",
      desc: "Votre contenu projeté au-delà de l'écran : lumière, particules, présence. Le digital comme il doit être ressenti.",
      tall: false
    },
    {
      src: "images/poster-cristal-blanc.png",
      title: "Prisme Cristal",
      cat: "ia",
      desc: "La clarté du prisme : un rendu net, précis, sans compromis — la lumière elle-même au service du message.",
      tall: false
    },
    {
      src: "images/poster-poussiere-diamant.png",
      title: "Poussière de Diamant",
      cat: "ia",
      desc: "Chaque détail compte : une spirale de brillance pure, blanc diamant et or, pour les marques qui n'acceptent pas le presque.",
      tall: false
    },
    {
      src: "images/poster-orange-ivoirien.png",
      title: "Énergie Orange Ivoirienne",
      cat: "ia",
      desc: "L'orange national en flux pur : la pulsation d'un pays qui avance, porté par sa digitale.",
      tall: false
    },

    /* ── CRISTAUX & LUXE ───────────────────────────────────── */
    {
      src: "images/poster-rubis.png",
      title: "Rubis Cybernétique",
      cat: "cristaux",
      desc: "Un rubis taillé au laser, veines de circuits d'or : la puissance concentrée du luxe cybernétique.",
      tall: false
    },
    {
      src: "images/poster-or-premium.png",
      title: "Double Hélice d'Or",
      cat: "cristaux",
      desc: "L'ADN de la réussite en or liquide : force, mouvement, pureté — le premium+ dans sa forme la plus noble.",
      tall: false
    },
    {
      src: "images/poster-diamant.png",
      title: "Diamant Blanc Diamant",
      cat: "cristaux",
      desc: "L'éclat absolu : le blanc diamant sur noir perle, rayons d'or — la signature visuelle du 6 étoiles.",
      tall: true
    },

    /* ── BRANDING ──────────────────────────────────────────── */
    {
      src: "images/poster-branding-cyberclik.png",
      title: "Identité CyberClik",
      cat: "branding",
      desc: "Le mot s'allume, le curseur scintille : la marque qui fait mouche, telle que vous la verrez bientôt partout.",
      tall: false
    },
    {
      src: "images/poster-cursor-clic.png",
      title: "Le Clic Décisif",
      cat: "branding",
      desc: "Un clic, une étincelle : c'est ainsi que commence chaque réussite — cliquez, et voyez la différence.",
      tall: false
    },
    {
      src: "images/poster-abidjan-wireframe.png",
      title: "Abidjan, Jumeau Numérique",
      cat: "branding",
      desc: "La ville en lumière de données, du Plateau à la lagune : votre succès s'écrit d'abord sur sa carte.",
      tall: false
    },
    {
      src: "images/poster-emblème-n1.png",
      title: "Emblème N°1",
      cat: "branding",
      desc: "Lauriers d'or, rayons, prestige : la position de leader, gravée en lumière. L'agence N°1 en Côte d'Ivoire.",
      tall: false
    },
    {
      src: "images/poster-constellation-or.png",
      title: "Constellation d'Or",
      cat: "ia",
      desc: "Chaque client est une étoile ; CyberClik dessine les lignes qui les relient : une constellation entière de réussite.",
      tall: false
    }

    /* ✏️ AJOUTEZ ICI vos prochaines affiches pour agrandir la galerie */
  ]
};
