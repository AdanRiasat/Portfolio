class Project {
  constructor(title, techStack, gitUrl, description, imagePath, imageContain = false) {
    this.title = title;
    this.techStack = techStack;
    this.gitUrl = gitUrl;
    this.description = description;
    this.imagePath = imagePath;
    this.imageContain = imageContain;
  }
}

const eduMeilleur = new Project(
  "EduMeilleur",
  "ASP.NET Core, Angular, PostgreSQL, Xunit",
  "https://github.com/AdanRiasat/EduMeilleur",
  "• Développé une application Web full-stack utilisant ASP.NET Core (C#) pour l’API   REST backend et Angular (TypeScript, HTML, CSS, Bootstrap) pour l’interface frontend.\n• Rédigé des tests unitaires automatisés pour les contrôleurs et services backend avec Xunit.",
  "assets/images/edumeilleur-logo.png",
  true,
);
const gameHub = new Project(
  "GameHub",
  "React, Firebase",
  "",
  "• Website to showcase games I’ve developed, including JavaScript/React games and engine-based games.\n• Uses Firebase for authentication and database management.\n• Currently hosts simple games such as Snake, No-Wifi Dino, and Tic-Tac-Toe.",
  "",
);
const raspiWeb = new Project(
  "Raspi_WebHost",
  "Bash, Nginx, Debian",
  "https://github.com/AdanRiasat/RaspPi_WebHost",
  "• Configuré un Raspberry Pi 4 sous Debian pour héberger entièrement l’application ÉduMeilleur, incluant le frontend Angular, le backend ASP.NET Core et la base de données PostgreSQL",
  "",
);
const consoleTodo = new Project(
  "Console To-Do list",
  "C++",
  "https://github.com/AdanRiasat/ToDoList_Cpp",
  "• Développé une application console To-Do List en C++ pour pratiquer la gestion de mémoire, les pointeurs et les structures de données",
  "",
);
const fanNoise = new Project(
  "Fan Noise Mobile",
  "Flutter, SQLite",
  "",
  "Flutter mobile app that plays white noise to help with sleep.\n• Uses SQLite for local storage, making the app fully serverless and offline-friendly.\n• Includes preset sounds (e.g., fan noise) and allows users to add their own audio files.",
  "assets/images/fanNoise.png",
);

export const projectsByType = {
  TOP: [eduMeilleur, raspiWeb],
  APPS: [eduMeilleur, gameHub, consoleTodo, fanNoise],
  SERVERS: [raspiWeb],
};
