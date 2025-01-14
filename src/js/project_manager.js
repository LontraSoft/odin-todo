import Project from './project';
import Priority from './priority';

class ProjectManager {
    #projects;

    static #_EMPTY_PROJECTS = [];

    isProjectsEmpty() {
	return this.#projects.length === 0;
    }

    isProjectIndexValid(index) {
	return index < this.#projects.length;
    }

    isTodoIndexValid(projectIndex, todoIndex) {
	return this.isProjectIndexValid(projectIndex) && todoIndex < this.#projects[projectIndex].todoList.length; 
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

    removeProject(projectIndex) {
	if (!this.isProjectIndexValid(projectIndex)) {
	    console.error(`Attempted to remove non-existant project(Index ${projectIndex})`);
	}
	
	this.#projects.splice(projectIndex, 1);
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

    removeTodo(projectIndex, todoIndex) {
	if (!this.isProjectIndexValid(projectIndex)) {
	    console.error(`Attempted to remove todo from non-existant project: Id ${projectIndex}`);
	    return this;
	}
	
	if (!this.isTodoIndexValid(projectIndex, todoIndex)) {
	    console.error(`Attempted to remove non-existant todo(Id ${todoIndex}) from project(Id ${projectIndex})`);
	    return this;
	}

	this.#projects[projectIndex].removeTodo(todoIndex);
	this.saveProjects();

	return this;
    }

    getProject(projectIndex) {
	if (!this.isProjectIndexValid(projectIndex)) {
	    console.error(`Attempted to get non-existent project(Project Index: ${projectIndex})`);
	}
	
	return this.#projects[projectIndex];
    }

    getProjects() {
	return this.#projects;
    }

    saveProjects() {
	console.log(`TODO: Implement save functionality`);
	let projectsJSON = JSON.stringify(this.#projects);
	localStorage.setItem('projects', projectsJSON);
    }

    // When dates are loaded in from JSON they are stored as strings this
    // puts them back in a Date object
    #fixTodoDueDates() {
	for (const project of this.#projects) {
	    for (const todo of project.todoList) {
		todo.dueDate = new Date(todo.dueDate);
	    }
	}
    }
    
    loadProjects() {
	console.log(`TODO: Implement load functionality`);
	this.#projects = JSON.parse(localStorage.getItem('projects'));
	if (this.#projects === null) {
	    this.#projects = ProjectManager.#_EMPTY_PROJECTS;
	}
	this.#fixTodoDueDates();
    }
}

export default ProjectManager;
