class Project {
    constructor(title, techStack, gitUrl, description) {
        this.title = title;
        this.techStack = techStack;
        this.gitUrl = gitUrl;
        this.description = description;
    }
}

const ProjectType = {
    TOP: "TOP",
    APPS: "APPS",
    SERVERS: "SERVERS"
}

function getProjects(projectType) {
    const eduMeilleur = new Project("EduMeilleur", "ASP.NET Core, Angular, PostgreSQL, Xunit", "no sir", "• Développé une application Web full-stack utilisant ASP.NET Core (C#) pour l’API   REST backend et Angular (TypeScript, HTML, CSS, Bootstrap) pour l’interface frontend.\n• Rédigé des tests unitaires automatisés pour les contrôleurs et services backend avec Xunit.");
    const gameHub = new Project("GameHub", "React, Firebase", "no sir", "no sir");

    let projects = [];

     switch (projectType) {
        case ProjectType.TOP:
            projects = [eduMeilleur];
            break;
        case ProjectType.APPS:
            projects = [gameHub];
            break;
        case ProjectType.SERVERS:
            projects = [eduMeilleur, gameHub];
            break;
    }

    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';

    for (let p of projects) {
        let projectDiv = document.createElement('div');
        let detailsDiv = document.createElement('div');
        let imageDiv = document.createElement('div');

        let titleH = document.createElement('h2');
        let stackSpan = document.createElement('span');
        let descriptionUl = document.createElement('ul');
        let imageImg = document.createElement('img');

        addProjectClasses(projectDiv, detailsDiv, imageDiv, stackSpan)

        titleH.textContent = p.title;
        stackSpan.textContent = " " + p.techStack;
        titleH.appendChild(stackSpan);

        descriptionUl.innerHTML = p.description
            .split('\n')
            .map(line => `<li>${line.replace(/^•\s*/, '')}</li>`)
            .join('');

       completeProjectList(detailsDiv, imageDiv, projectDiv, titleH, descriptionUl, imageImg, projectList);
    }
}

function addProjectClasses(projectDiv, detailsDiv, imageDiv, stackSpan) {
    projectDiv.classList.add('project');
    detailsDiv.classList.add('project-details');
    imageDiv.classList.add('project-image');
    stackSpan.classList.add('project-stack');
}

function completeProjectList(detailsDiv, imageDiv, projectDiv, titleH, descriptionUl, imageImg, projectList) {
    detailsDiv.appendChild(titleH);
    detailsDiv.appendChild(descriptionUl)
    imageDiv.appendChild(imageImg);
    projectDiv.appendChild(detailsDiv);
    projectDiv.appendChild(imageDiv);
    projectList.appendChild(projectDiv);
}

window.addEventListener("load", () => {
    let loader = document.querySelector(".loader");

    const LOADER_DURATION = 2000;

    setTimeout(() => {
        loader.classList.add("exit");

        setTimeout(() => {loader.remove()}, 1000)
    }, LOADER_DURATION);
})