class Project {
    constructor(title, techStack, gitUrl, description) {
        this.title = title;
        this.techStack = techStack;
        this.gitUrl = gitUrl;
        this.description = description;
    }
}

window.addEventListener("load", () => {
    let loader = document.querySelector(".loader");

    const LOADER_DURATION = 100;

    setTimeout(() => {
        loader.classList.add("exit");

        setTimeout(() => {loader.remove()}, 10)
    }, LOADER_DURATION);
})

const ProjectType = {
    TOP: "TOP",
    APPS: "APPS",
    SERVERS: "SERVERS"
}

function getProjects(projectType) {
    const eduMeilleur = new Project("EduMeilleur", "ASP.NET Core, Angular, PostgreSQL, Xunit", "https://github.com/AdanRiasat/EduMeilleur", "• Développé une application Web full-stack utilisant ASP.NET Core (C#) pour l’API   REST backend et Angular (TypeScript, HTML, CSS, Bootstrap) pour l’interface frontend.\n• Rédigé des tests unitaires automatisés pour les contrôleurs et services backend avec Xunit.");
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
        let seeMoreDiv = document.createElement('div');
        let imageDiv = document.createElement('div');

        let titleH = document.createElement('h2');
        let stackSpan = document.createElement('span');
        let descriptionUl = document.createElement('ul');
        let imageImg = document.createElement('img');

        addProjectClasses(projectDiv, detailsDiv, imageDiv, stackSpan, seeMoreDiv)

        titleH.textContent = p.title;
        stackSpan.textContent = " " + p.techStack;
        titleH.appendChild(stackSpan);

        descriptionUl.innerHTML = p.description
            .split('\n')
            .map(line => `<li>${line.replace(/^•\s*/, '')}</li>`)
            .join('');

        seeMoreDiv.innerHTML = "See more"
        seeMoreDiv.addEventListener('click', () => getReadme(p.gitUrl));


       completeProjectList(detailsDiv, imageDiv, projectDiv, titleH, descriptionUl, imageImg, seeMoreDiv, projectList);
    }
}

async function getReadme(gitUrl) {
    let [, , , owner, repo] = gitUrl.split('/');

    let readMeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;

    let res = await fetch(readMeUrl, {
        headers: { 'Accept': 'application/vnd.github.raw+json'}
    });

    let markdown = await res.text();
    
    let htmlRes = await fetch('https://api.github.com/markdown', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: markdown,
            mode: 'gfm',
            context: `${owner}/${repo}`
        })
    });
    
    let html = await htmlRes.text();
    console.log(html);

    readmeModal(html);
}


function readmeModal(content) {
    let modal = document.createElement('dialog');
    modal.id = 'readme'

    let closeBtn = document.createElement('button');
    closeBtn.classList.add('modal-close');
    closeBtn.innerText = 'x'

    closeBtn.addEventListener('click', () => {
        modal.close();
    });

    let bodyDiv = document.createElement('div');
    bodyDiv.classList.add('modal-body');
    bodyDiv.innerHTML = content;

    modal.appendChild(closeBtn);
    modal.appendChild(bodyDiv);


    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });

    modal.addEventListener('close', () => modal.remove());

    document.body.appendChild(modal);
    modal.showModal();
}

function addProjectClasses(projectDiv, detailsDiv, imageDiv, stackSpan, seeMoreDiv) {
    projectDiv.classList.add('project');
    detailsDiv.classList.add('project-details');
    imageDiv.classList.add('project-image');
    stackSpan.classList.add('project-stack');
    seeMoreDiv.classList.add('project-see-more');
}

function completeProjectList(detailsDiv, imageDiv, projectDiv, titleH, descriptionUl, imageImg, seeMoreDiv, projectList) {
    detailsDiv.appendChild(titleH);
    detailsDiv.appendChild(descriptionUl);
    detailsDiv.appendChild(seeMoreDiv);
    imageDiv.appendChild(imageImg);
    projectDiv.appendChild(detailsDiv);
    projectDiv.appendChild(imageDiv);
    projectList.appendChild(projectDiv);
}

