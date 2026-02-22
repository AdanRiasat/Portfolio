// Intro animation

function drawSignature() {
    const path = document.getElementById('signature-path');
    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes drawSignature {
            to {
                stroke-dashoffset: 0;
            }
        }
    `;
    document.head.appendChild(style);

    path.style.animation = 'drawSignature 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';
}

window.addEventListener("load", () => {
    let loader = document.querySelector(".loader");

    const LOADER_DURATION = 3000;

    drawSignature()

    setTimeout(() => {
        loader.classList.add("exit");

        setTimeout(() => {loader.remove()}, 2000)
    }, LOADER_DURATION);
})

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
    SERVERS: "SERVERS"
}

function getProjects(projectType, categoryDiv) {
    document.querySelectorAll('.categories div').forEach(div => div.classList.remove('select'));
    categoryDiv.classList.add('select');

    const projectSection = document.querySelector('.projects');
    projectSection.scrollIntoView({ behavior: 'smooth', block: 'start'});

    const projects = getProjectList(projectType);

    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';

    projects.forEach((p, index) => {
        let projectDiv = document.createElement('div');
        let detailsDiv = document.createElement('div');
        let seeMoreDiv = document.createElement('div');
        let imageDiv = document.createElement('div');
        let projectHeaderDiv = document.createElement('div')

        let titleH = document.createElement('h2');
        let stackSpan = document.createElement('span');
        let descriptionUl = document.createElement('ul');
        let imageImg = document.createElement('img');
        
        addProjectClasses(projectDiv, detailsDiv, imageDiv, stackSpan, seeMoreDiv, projectHeaderDiv);

        titleH.textContent = p.title;
        stackSpan.textContent = " " + p.techStack;

        titleH.appendChild(stackSpan);
        projectHeaderDiv.appendChild(titleH);

        if (p.gitUrl != ""){
            projectGithubLink(p.gitUrl, projectHeaderDiv)
        }
        
        descriptionUl.innerHTML = p.description
            .split('\n')
            .map(line => `<li>${line.replace(/^•\s*/, '')}</li>`)
            .join('');

        seeMoreDiv.innerHTML = "See more"
        seeMoreDiv.addEventListener('click', () => getReadme(p.gitUrl));

        imageImg.src = p.imagePath;

       completeProject(detailsDiv, imageDiv, projectDiv, projectHeaderDiv, descriptionUl, imageImg, seeMoreDiv, projectList);

       setTimeout(() => {
        projectDiv.classList.add('show');
       }, index * 120)
    }) 
}

async function getReadme(gitUrl) {
    let [, , , owner, repo] = gitUrl.split('/');

    let readMeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;

    try {
        let res = await fetch(readMeUrl, {
            headers: { 'Accept': 'application/vnd.github.raw+json'}
        });

        if (!res.ok) {
            errorModal('Sorry, no extra information is available for this project');
            return;
        }

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

        if (!htmlRes.ok) {
            errorModal('Sorry, no extra information is available for this project');
            return;
        }
        
        let html = await htmlRes.text();
        console.log(html);
        

        readmeModal(html);
    } catch (error){
        errorModal('Something happened, an error occured');
    }
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
    bodyDiv.classList.add('markdown-body')
    
    if (typeof content === 'string'){
        bodyDiv.innerHTML = content
    } else {
        bodyDiv.appendChild(content)
    }

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

function errorModal(message) {
    let contentDiv = document.createElement('div');
    let messageH2 = document.createElement('h3');
    let iconSvg = document.getElementById('sad-face-icon').content.cloneNode(true);

    contentDiv.classList.add('error-modal-content')
    messageH2.innerText = message;
    contentDiv.appendChild(messageH2);
    contentDiv.appendChild(iconSvg);

    readmeModal(contentDiv)
}

function getProjectList(projectType) {
    const eduMeilleur = new Project("EduMeilleur", "ASP.NET Core, Angular, PostgreSQL, Xunit", "https://github.com/AdanRiasat/EduMeilleur", "• Développé une application Web full-stack utilisant ASP.NET Core (C#) pour l’API   REST backend et Angular (TypeScript, HTML, CSS, Bootstrap) pour l’interface frontend.\n• Rédigé des tests unitaires automatisés pour les contrôleurs et services backend avec Xunit.", "");
    const gameHub = new Project("GameHub", "React, Firebase", "", "no sir", "");
    const raspiWeb = new Project("Raspi_WebHost", "Bash, Nginx, Debian", "https://github.com/AdanRiasat/RaspPi_WebHost", "• Configuré un Raspberry Pi 4 sous Debian pour héberger entièrement l’application ÉduMeilleur, incluant le frontend Angular, le backend ASP.NET Core et la base de données PostgreSQL", "");
    const consoleTodo = new Project("Console To-Do list", "C++", "https://github.com/AdanRiasat/ToDoList_Cpp", "• Développé une application console To-Do List en C++ pour pratiquer la gestion de mémoire, les pointeurs et les structures de données", "assets/images/consoleCpp.png");
    const fanNoise = new Project("Fan Noise Mobile", "Flutter, SQLite", "", "no sir", "assets/images/fanNoise.png");

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

function projectGithubLink(gitUrl, projectHeaderDiv){
    let gitLinkA = document.createElement('a');
    let gitSvg = document.getElementById('github-icon').cloneNode(true);

    gitSvg.classList.add('project-github')
    gitLinkA.setAttribute('href', gitUrl);
    gitLinkA.appendChild(gitSvg)
    
    projectHeaderDiv.appendChild(gitLinkA);
}

function addProjectClasses(projectDiv, detailsDiv, imageDiv, stackSpan, seeMoreDiv, projectHeaderDiv) {
    projectHeaderDiv.classList.add('project-header')
    projectDiv.classList.add('project');
    detailsDiv.classList.add('project-details');
    imageDiv.classList.add('project-image');
    stackSpan.classList.add('project-stack');
    seeMoreDiv.classList.add('project-see-more');
}

function completeProject(detailsDiv, imageDiv, projectDiv, projectHeaderDiv, descriptionUl, imageImg, seeMoreDiv, projectList) {
    detailsDiv.appendChild(projectHeaderDiv);
    detailsDiv.appendChild(descriptionUl);
    detailsDiv.appendChild(seeMoreDiv);
    imageDiv.appendChild(imageImg);
    projectDiv.appendChild(detailsDiv);
    projectDiv.appendChild(imageDiv);
    projectList.appendChild(projectDiv);
}

let defaultCategory = document.querySelector('.categories div');
getProjects(ProjectType.TOP, defaultCategory); // get projects on init

