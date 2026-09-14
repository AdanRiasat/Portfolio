import { projectsByType } from "./seed.js";

const ProjectType = {
  TOP: "TOP",
  APPS: "APPS",
  SERVERS: "SERVERS",
  ALL: "ALL",
};

function getProjects(projectType, categoryDiv) {
  document.querySelectorAll(".categories div").forEach((div) => div.classList.remove("select"));
  categoryDiv.classList.add("select");

  const projects = projectsByType[projectType] ?? [];

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
      if (p.imageContain) imageDiv.classList.add("image-contain");
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

document.querySelectorAll(".categories div").forEach((div) => {
  div.addEventListener("click", () => getProjects(ProjectType[div.dataset.projectType], div));
});

let defaultCategory = document.querySelector(".categories div");
getProjects(ProjectType.TOP, defaultCategory); // get projects on init
