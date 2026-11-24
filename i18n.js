// Vanilla i18n
// English for static text lives in index.html
// English for projects lives in seed.js

const DEFAULT_LANG = "en";
const STORAGE_KEY = "lang";

const translations = {
  en: {
    "projects.seeMore": "See more",
    "projects.noInfo": "Sorry, no extra information is available for this project",
    "projects.error": "Something happened, an error occured",
  },
  fr: {
    "nav.about": "À propos",
    "nav.experience": "Expérience",
    "nav.education": "Formation",
    "nav.projects": "Projets",

    "hero.title": `
            <span style="font-size: clamp(25px, calc(2vw + 15px), 30px)">Bonjour,</span><br />
            <span style="font-size: clamp(35px, calc(2vw + 30px), 46px)"> Je suis <span style="color: #d093ff">Adan</span> <br />Développeur logiciel </span>
          `,
    "hero.description": "Développeur logiciel spécialisé en web, mobile et IA. Ouvert à collaborer sur de nouveaux projets.",
    "hero.imageAlt": "salut toi",

    "exp.title": "Expérience de travail",
    "exp.agecem.title": "Développeur backend Go à l'AGECEM",
    "exp.agecem.date": "2026, 7 mois",
    "exp.agecem.p1": "Travaillé sur les applications internes de l'AGECEM.",
    "exp.agecem.p2": `
                  Corrigé des bogues, optimisé des fonctionnalités existantes et développé de nouvelles<br />
                  fonctionnalités sur plusieurs applications.
                `,
    "exp.agecem.p3": "Développé des services backend avec Go, Docker, PostgreSQL et K8s.",
    "exp.tutor.title": "Tuteur au Cégep Édouard-Montpetit",
    "exp.tutor.date": "2025, 3 mois",
    "exp.tutor.p1": "Tuteur en programmation web transactionnelle.",
    "exp.tutor.p2": "Aidé les étudiants à compléter leurs travaux et répondu à leurs questions.",
    "exp.tutor.p3": `
                  Expliqué les concepts clés liés à l'architecture MVC, Entity<br />
                  Framework, JavaScript, jQuery et AJAX.
                `,

    "edu.title": "Formation",
    "edu.cegep.degree": "DEC technique en informatique",
    "edu.cegep.desc":
      "Appris à concevoir des applications web, mobiles et de bureau, ainsi qu'à travailler avec les méthodologies agiles, gérer des bases de données et concevoir des applications.",
    "edu.cegep.score": "Cote R : 30,7",
    "edu.concordia.degree": "Baccalauréat en informatique",
    "edu.concordia.desc": "J'apprends la science derrière le calcul, comment les systèmes sont construits et comment ils fonctionnent.",
    "edu.concordia.score": "GPA : N/D",

    "projects.title": "Projets personnels",
    "projects.top": "Meilleurs projets",
    "projects.apps": "Applications",
    "projects.servers": "Serveurs",
    "projects.all": "Tous les projets",
    "projects.seeMore": "Voir plus",
    "projects.noInfo": "Désolé, aucune information supplémentaire n'est disponible pour ce projet",
    "projects.error": "Une erreur s'est produite",
  },
};

// French overrides for seed.js projects, keyed by the project's English title.
// Any field left out falls back to the English value from seed.js.
const projectTranslations = {
  fr: {
    EduMeilleur: {
      description:
        "• Développé une application web full-stack avec ASP.NET Core (C#) pour l'API REST backend et Angular (TypeScript, HTML, CSS, Bootstrap) pour l'interface frontend.\n• Rédigé des tests unitaires automatisés pour les contrôleurs et services backend avec Xunit.",
    },
    GameHub: {
      description:
        "• Site web pour présenter les jeux que j'ai développés, incluant des jeux JavaScript/React et des jeux faits avec un moteur de jeu.\n• Utilise Firebase pour l'authentification et la gestion de la base de données.\n• Héberge présentement des jeux simples comme Snake, le dinosaure No-Wifi et Tic-Tac-Toe.",
    },
    Raspi_WebHost: {
      description:
        "• Configuré un Raspberry Pi 4 sous Debian pour héberger entièrement l'application ÉduMeilleur, incluant le frontend Angular, le backend ASP.NET Core et la base de données PostgreSQL.",
    },
    "Console To-Do list": {
      title: "Liste de tâches console",
      description: "• Développé une application console de liste de tâches en C++ pour pratiquer la gestion de la mémoire, les pointeurs et les structures de données.",
    },
    "Fan Noise Mobile": {
      description:
        "Application mobile Flutter qui joue du bruit blanc pour aider à dormir.\n• Utilise SQLite pour le stockage local, ce qui rend l'application entièrement sans serveur et utilisable hors ligne.\n• Inclut des sons prédéfinis (ex. bruit de ventilateur) et permet aux utilisateurs d'ajouter leurs propres fichiers audio.",
    },
    "2D platformer": {
      title: "Jeu de plateforme 2D",
      description:
        "• Jeu de plateforme 2D développé avec Unity avec un contrôleur de style Metroidvania.\n Comprend un système de parade à l'épée personnalisé, des combats contre des vagues d'ennemis et des combats de boss pour atteindre la fin.\n Utilise des ressources gratuites de l'Unity Asset Store.",
    },
    "Centre Multi Service": {
      description:
        "• Système de point de vente avec gestion complète de l'inventaire pour un petit commerce géré par l'AGECEM au Cégep Édouard-Montpetit.\n Utilise le microservice bottin pour les données des membres, avec connexion Google OAuth2 et contrôle d'accès basé sur les rôles.",
    },
    Resolutions: {
      title: "Résolutions",
      description:
        "• Système de gestion des résolutions soumises par les membres de l'AGECEM.\n Importe les données des résolutions à partir de fichiers Excel et offre une interface propulsée par HTMX pour la révision et le suivi.",
    },
    "AGECEM Website": {
      title: "Site web de l'AGECEM",
      description: "• Site web public de l'AGECEM.\n Utilise l'application des résolutions comme microservice pour afficher publiquement la liste des résolutions.",
    },
    Portfolio: {
      description: "• Mon site portfolio, oui, celui-ci même.",
    },
  },
};

let currentLang = DEFAULT_LANG;

export function getLang() {
  return currentLang;
}

export function t(key) {
  return translations[currentLang]?.[key] ?? translations[DEFAULT_LANG][key] ?? key;
}

// Returns the project with its title/description in the current language
export function translateProject(project) {
  const override = projectTranslations[currentLang]?.[project.title] ?? {};
  return { ...project, ...override };
}

export function setLang(lang) {
  if (!translations[lang]) lang = DEFAULT_LANG;
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
  document.querySelectorAll("[data-i18n-html]").forEach((el) => (el.innerHTML = t(el.dataset.i18nHtml)));
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => (el.alt = t(el.dataset.i18nAlt)));

  document.querySelectorAll(".lang-item[data-lang]").forEach((el) => el.classList.toggle("active", el.dataset.lang === lang));

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {}

  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
}

function captureEnglish() {
  const en = translations.en;
  document.querySelectorAll("[data-i18n]").forEach((el) => (en[el.dataset.i18n] ??= el.textContent));
  document.querySelectorAll("[data-i18n-html]").forEach((el) => (en[el.dataset.i18nHtml] ??= el.innerHTML));
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => (en[el.dataset.i18nAlt] ??= el.alt));
}

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;
  } catch {}
  return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : DEFAULT_LANG;
}

captureEnglish();

document.querySelectorAll(".lang-item[data-lang]").forEach((el) => {
  el.addEventListener("click", () => {
    if (el.dataset.lang !== currentLang) setLang(el.dataset.lang);
  });
});

setLang(initialLang());
