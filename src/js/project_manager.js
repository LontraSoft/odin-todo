import Project from './project';
import Priority from './priority';

class ProjectManager {
    #projects;

    isProjectsEmpty() {
	return this.#projects.length === 0;
    }

    constructor(projectList = []) {
	this.#projects = projectList;
    }
}

export default ProjectManager;
