class Project {
  constructor(title, techStack, gitUrl, prodUrl, description, imagePath, imageContain = false) {
    this.title = title;
    this.techStack = techStack;
    this.gitUrl = gitUrl;
    this.prodUrl = prodUrl;
    this.description = description;
    this.imagePath = imagePath;
    this.imageContain = imageContain;
  }
}

const eduMeilleur = new Project(
  "EduMeilleur",
  "ASP.NET Core, Angular, PostgreSQL, Xunit",
  "https://github.com/AdanRiasat/EduMeilleur",
  "https://edumeilleur.ca",
  "• Développé une application Web full-stack utilisant ASP.NET Core (C#) pour l’API   REST backend et Angular (TypeScript, HTML, CSS, Bootstrap) pour l’interface frontend.\n• Rédigé des tests unitaires automatisés pour les contrôleurs et services backend avec Xunit.",
  "assets/images/edumeilleur-logo.png",
  true,
);
const gameHub = new Project(
  "GameHub",
  "React, Firebase",
  "",
  "",
  "• Website to showcase games I’ve developed, including JavaScript/React games and engine-based games.\n• Uses Firebase for authentication and database management.\n• Currently hosts simple games such as Snake, No-Wifi Dino, and Tic-Tac-Toe.",
  "",
);
const raspiWeb = new Project(
  "Raspi_WebHost",
  "Bash, Nginx, Debian",
  "https://github.com/AdanRiasat/RaspPi_WebHost",
  "",
  "• Configuré un Raspberry Pi 4 sous Debian pour héberger entièrement l’application ÉduMeilleur, incluant le frontend Angular, le backend ASP.NET Core et la base de données PostgreSQL",
  "",
);
const consoleTodo = new Project(
  "Console To-Do list",
  "C++",
  "https://github.com/AdanRiasat/ToDoList_Cpp",
  "",
  "• Développé une application console To-Do List en C++ pour pratiquer la gestion de mémoire, les pointeurs et les structures de données",
  "",
);
const fanNoise = new Project(
  "Fan Noise Mobile",
  "Flutter, SQLite",
  "",
  "",
  "Flutter mobile app that plays white noise to help with sleep.\n• Uses SQLite for local storage, making the app fully serverless and offline-friendly.\n• Includes preset sounds (e.g., fan noise) and allows users to add their own audio files.",
  "assets/images/fanNoise.png",
);
const bill = new Project(
  "2D platformer",
  "Unity, C#",
  "",
  "",
  "• 2D platformer built in Unity with a Metroidvania-style controller.\n Features a custom sword parry system, wave-based enemy fights, and boss battles to reach the end.\n Uses free assets from the Unity Asset Store.",
  "",
);
const cms = new Project(
  "Centre Multi Service",
  "Go, Docker, K8s, HTMX, PostgreSQL",
  "https://git.agecem.com/bottin/cms",
  "",
  "• POS system with full inventory management for a small shop run by AGECEM within Cégep Édouard-Montpetit.\n Uses the bottin microservice for member data, with Google OAuth2 login and role-based access control.",
  "",
);
const resolutions = new Project(
  "Resolutions",
  "Go, Docker, K8s, HTMX, PostgreSQL",
  "https://git.agecem.com/agecem/resolutions",
  "",
  "• Management system for resolutions submitted by AGECEM members.\n Imports resolution data from Excel spreadsheets and provides an HTMX-driven UI for review and tracking.",
  "",
);
const agecem = new Project(
  "AGECEM Website",
  "Go, Docker, K8s, HTMX",
  "https://git.agecem.com/agecem/agecem-org",
  "https://agecem.org/",
  "• Public website for AGECEM.\n Uses the resolutions app as a microservice to display the list of resolutions publicly.",
  "",
);

const portfolio = new Project("Portfolio", "HTML, CSS, JS", "https://github.com/AdanRiasat/Portfolio", "", "• My portfolio site, yep this one right here.", "");

export const projectsByType = {
  TOP: [eduMeilleur, raspiWeb, cms, bill],
  APPS: [eduMeilleur, gameHub, consoleTodo, fanNoise, cms, resolutions, agecem, bill, portfolio],
  SERVERS: [raspiWeb],
  ALL: [eduMeilleur, gameHub, consoleTodo, fanNoise, cms, resolutions, agecem, bill, raspiWeb, portfolio],
};
