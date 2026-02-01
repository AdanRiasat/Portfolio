class Project {
    constructor(title, techStack, gitUrl, description) {
        this.title = title;
        this.techStack = techStack;
        this.gitUrl = gitUrl;
        this.description = description;
    }
}

function topProjects() {
    let eduMeilleur = new Project("EduMeilleur", "no sir", "no sir", "no sir");

    let projectDiv = document.createElement('div');
    let detailsDiv = document.createElement('div');
    let imageDiv = document.createElement('div');

    let titleH = document.createElement('h2')

    projectDiv.classList.add('project')
    detailsDiv.classList.add('project-details')
    imageDiv.classList.add('project-image')

    titleH.textContent = eduMeilleur.title

    detailsDiv.appendChild(titleH)
    projectDiv.appendChild(detailsDiv)

    let projectList = document.getElementById('project-list')
    projectList.appendChild(projectDiv)
}