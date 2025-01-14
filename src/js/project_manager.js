import Project from './project';
import Priority from './priority';

class ProjectManager {
    #projects;

    constructor(projectList = []) {
	this.#projects = projectList;
    }
}

export default ProjectManager;
