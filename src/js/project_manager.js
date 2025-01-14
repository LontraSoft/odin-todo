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

    addTodo(projectIndex, todo) {
	if (!this.isProjectIndexValid(projectIndex)) {
	    console.error(`Attempted to add to non-existant project: Id ${projectIndex}`);
	    return this;
	}

	this.#projects[projectIndex].addTodo(todo);
	this.saveProjects();
	return this;
    }

    getProject(projectIndex) {
	if (!this.isProjectIndexValid(projectIndex)) {
	    console.error(`Attempted to get non-existent project(Project Index: ${projectIndex})`);
	}
	
	return this.#projects[projectIndex];
    }

}

export default ProjectManager;
