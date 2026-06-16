// Intro animation

function drawSignature() {
  const path = document.getElementById("signature-path");
  const pathLength = path.getTotalLength();

  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;
  path.style.opacity = 1;

  const style = document.createElement("style");
  style.innerHTML = `
        @keyframes drawSignature {
            to {
                stroke-dashoffset: 0;
            }
        }
    `;
  document.head.appendChild(style);

  path.style.animation = "drawSignature 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards";
}

window.addEventListener("load", () => {
  let loader = document.querySelector(".loader");

  const LOADER_DURATION = 3000;

  document.body.classList.add("no-scroll");

  drawSignature();

  setTimeout(() => {
    loader.classList.add("exit");
    document.body.classList.remove("no-scroll");

    setTimeout(() => {
      loader.remove();
    }, 2000);
  }, LOADER_DURATION);
});

// Floating items

document.querySelectorAll(".hero-image-wrapper .floating-item").forEach((item, i) => {
  // Floating animation and positioning
  item.style.animationDelay = `${i * 0.8}s`;

  const sides = ["top", "right", "bottom", "left"];
  const side = sides[i % sides.length];

  const totalItems = document.querySelectorAll(".hero-image-wrapper .floating-item").length;
  const itemsPerSide = Math.ceil(totalItems / sides.length);

  const slotIndex = Math.floor(i / sides.length);
  const slotSize = 70 / itemsPerSide;
  const slotStart = 15 + slotIndex * slotSize;
  const pos = `${slotStart + Math.random() * slotSize}%`;

  const placement = {
    top: { top: "-25px", left: pos },
    bottom: { top: "100%", left: pos },
    left: { top: pos, left: "-25px" },
    right: { top: pos, left: "100%" },
  }[side];

  Object.assign(item.style, placement);
});

document.querySelectorAll(".floating-item svg").forEach((svg) => {
  // Mouse tracking animation
  svg.addEventListener("mousemove", (e) => {
    const rect = svg.getBoundingClientRect();
    const deltaX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const deltaY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    svg.style.transform = `translate(${deltaX * 12}px, ${deltaY * 12}px)`;
  });

  svg.addEventListener("mouseleave", () => {
    svg.style.transform = "translate(0, 0)";
  });
});

// Project

class Project {
  constructor(title, techStack, gitUrl, description, imagePath) {
    this.title = title;
    this.techStack = techStack;
    this.gitUrl = gitUrl;
    this.description = description;
    this.imagePath = imagePath;
  }
}

const ProjectType = {
  TOP: "TOP",
  APPS: "APPS",
  SERVERS: "SERVERS",
};

function getProjects(projectType, categoryDiv) {
  document.querySelectorAll(".categories div").forEach((div) => div.classList.remove("select"));
  categoryDiv.classList.add("select");

  const projects = getProjectList(projectType);

  const projectList = document.getElementById("project-list");
  projectList.innerHTML = "";

  projects.forEach((p, index) => {
    let projectDiv = document.createElement("div");
    let detailsDiv = document.createElement("div");
    let seeMoreDiv = document.createElement("div");
    let imageDiv = document.createElement("div");
    let projectHeaderDiv = document.createElement("div");
    let projectBodyDiv = document.createElement("div");

    let titleH = document.createElement("h2");
    let stackSpan = document.createElement("span");
    let descriptionUl = document.createElement("ul");
    let imageImg = document.createElement("img");

    addProjectClasses(projectDiv, detailsDiv, imageDiv, stackSpan, seeMoreDiv, projectHeaderDiv, projectBodyDiv);

    titleH.textContent = p.title;
    stackSpan.textContent = " " + p.techStack;

    titleH.appendChild(stackSpan);
    projectHeaderDiv.appendChild(titleH);

    if (p.gitUrl != "") {
      projectGithubLink(p.gitUrl, projectDiv);
    }

    descriptionUl.innerHTML = p.description
      .split("\n")
      .map((line) => `<li>${line.replace(/^•\s*/, "")}</li>`)
      .join("");

    seeMoreDiv.innerHTML = "See more";
    seeMoreDiv.addEventListener("click", () => getReadme(p.gitUrl));

    if (p.imagePath != "") {
      imageImg.src = p.imagePath;
    }

    completeProject(detailsDiv, imageDiv, projectDiv, projectHeaderDiv, descriptionUl, imageImg, seeMoreDiv, projectList, projectBodyDiv);

    if (p.imagePath == "") {
      imageDiv.classList.add("no-image");
      const container = document.createElement("div");
      container.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M30 3.414L28.586 2L2 28.586L3.414 30l2-2H26a2.003 2.003 0 0 0 2-2V5.414ZM26 26H7.414l7.793-7.793l2.379 2.379a2 2 0 0 0 2.828 0L22 19l4 3.997Zm0-5.832l-2.586-2.586a2 2 0 0 0-2.828 0L19 19.168l-2.377-2.377L26 7.414ZM6 22v-3l5-4.997l1.373 1.374l1.416-1.416l-1.375-1.375a2 2 0 0 0-2.828 0L6 16.172V6h16V4H6a2 2 0 0 0-2 2v16Z"/></svg>`;
      imageImg.replaceWith(container.firstChild);
    }

    setTimeout(() => {
      projectDiv.classList.add("show");
    }, index * 120);
  });
}

async function getReadme(gitUrl) {
  let [, , , owner, repo] = gitUrl.split("/");

  let readMeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;

  try {
    let res = await fetch(readMeUrl, {
      headers: { Accept: "application/vnd.github.raw+json" },
    });

    if (!res.ok) {
      errorModal("Sorry, no extra information is available for this project");
      return;
    }

    let markdown = await res.text();

    let htmlRes = await fetch("https://api.github.com/markdown", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: markdown,
        mode: "gfm",
        context: `${owner}/${repo}`,
      }),
    });

    if (!htmlRes.ok) {
      errorModal("Sorry, no extra information is available for this project");
      return;
    }

    let html = await htmlRes.text();
    console.log(html);

    readmeModal(html);
  } catch (error) {
    errorModal("Something happened, an error occured");
  }
}

function readmeModal(content) {
  let modal = document.createElement("dialog");
  modal.id = "readme";

  let closeBtn = document.createElement("button");
  closeBtn.classList.add("modal-close");
  closeBtn.innerText = "x";

  closeBtn.addEventListener("click", () => {
    modal.close();
  });

  let bodyDiv = document.createElement("div");
  bodyDiv.classList.add("modal-body");
  bodyDiv.classList.add("markdown-body");

  if (typeof content === "string") {
    bodyDiv.innerHTML = content;
  } else {
    bodyDiv.appendChild(content);
  }

  modal.appendChild(closeBtn);
  modal.appendChild(bodyDiv);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });

  modal.addEventListener("close", () => modal.remove());

  document.body.appendChild(modal);
  modal.showModal();
}

function errorModal(message) {
  let contentDiv = document.createElement("div");
  let messageH2 = document.createElement("h3");
  let iconSvg = document.getElementById("sad-face-icon").content.cloneNode(true);

  contentDiv.classList.add("error-modal-content");
  messageH2.innerText = message;
  contentDiv.appendChild(messageH2);
  contentDiv.appendChild(iconSvg);

  readmeModal(contentDiv);
}

function getProjectList(projectType) {
  const eduMeilleur = new Project(
    "EduMeilleur",
    "ASP.NET Core, Angular, PostgreSQL, Xunit",
    "https://github.com/AdanRiasat/EduMeilleur",
    "• Développé une application Web full-stack utilisant ASP.NET Core (C#) pour l’API   REST backend et Angular (TypeScript, HTML, CSS, Bootstrap) pour l’interface frontend.\n• Rédigé des tests unitaires automatisés pour les contrôleurs et services backend avec Xunit.",
    "",
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
    "assets/images/consoleCpp.png",
  );
  const fanNoise = new Project(
    "Fan Noise Mobile",
    "Flutter, SQLite",
    "",
    "Flutter mobile app that plays white noise to help with sleep.\n• Uses SQLite for local storage, making the app fully serverless and offline-friendly.\n• Includes preset sounds (e.g., fan noise) and allows users to add their own audio files.",
    "assets/images/fanNoise.png",
  );

  let projects = [];

  switch (projectType) {
    case ProjectType.TOP:
      projects = [eduMeilleur, raspiWeb];
      break;
    case ProjectType.APPS:
      projects = [eduMeilleur, gameHub, consoleTodo, fanNoise];
      break;
    case ProjectType.SERVERS:
      projects = [raspiWeb];
      break;
  }

  return projects;
}

function projectGithubLink(gitUrl, projectDiv) {
  let gitLinkA = document.createElement("a");
  let gitSvg = document.getElementById("github-icon").cloneNode(true);

  gitSvg.classList.add("project-github");
  gitLinkA.classList.add("project-github-link");
  gitLinkA.setAttribute("href", gitUrl);
  gitLinkA.setAttribute("target", "_blank");
  gitLinkA.appendChild(gitSvg);

  projectDiv.appendChild(gitLinkA);
}

function addProjectClasses(projectDiv, detailsDiv, imageDiv, stackSpan, seeMoreDiv, projectHeaderDiv, projectBodyDiv) {
  projectHeaderDiv.classList.add("project-header");
  projectBodyDiv.classList.add("project-body");
  projectDiv.classList.add("project");
  detailsDiv.classList.add("project-details");
  imageDiv.classList.add("project-image");
  stackSpan.classList.add("project-stack");
  seeMoreDiv.classList.add("project-see-more");
}

function completeProject(detailsDiv, imageDiv, projectDiv, projectHeaderDiv, descriptionUl, imageImg, seeMoreDiv, projectList, projectBodyDiv) {
  projectBodyDiv.appendChild(descriptionUl);
  projectBodyDiv.appendChild(seeMoreDiv);
  detailsDiv.appendChild(projectHeaderDiv);
  detailsDiv.appendChild(projectBodyDiv);
  imageDiv.appendChild(imageImg);

  projectDiv.appendChild(detailsDiv);
  projectDiv.appendChild(imageDiv);
  projectList.appendChild(projectDiv);
}

let defaultCategory = document.querySelector(".categories div");
getProjects(ProjectType.TOP, defaultCategory); // get projects on init
