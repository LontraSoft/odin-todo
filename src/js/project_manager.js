import Project from './project';
import Priority from './priority';

class ProjectManager {
    #projects;

    isProjectsEmpty() {
	return this.#projects.length === 0;
    }

    isProjectIndexValid(index) {
	return index < this.#projects.length;
    }

    isTodoIndexValid(projectIndex, todoIndex) {
	return isProjectIndexValid(projectIndex) && todoIndex < this.#projects[projectIndex].todoList.length; 
    }
    
    constructor(projectList = []) {
	this.#projects = projectList;
    }

    getProjectCount() {
	return this.#projects.length;
    }

    addProject(project) {
	this.#projects.unshift(project);
	this.saveProjects();
	return this;
    }

}

export default ProjectManager;
