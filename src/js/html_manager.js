import * as HTML_CONSTANTS from './html_constants';
import HtmlGenerator from './html_generator';

class htmlManager {
    #win;
    #doc;
    #htmlGenerator;
    #projectsContainer;
    
    #isValidProjectIndex(projectIndex) {
	let projectsContainer = this.getProjectsContainer();
	
	return projectIndex < projectsContainer.children.length;
    }
    
    constructor(win, doc) {
	this.#win = win;
	this.#doc = doc;
	this.#htmlGenerator = new HtmlGenerator(win, doc);
	this.#projectsContainer = this.#doc.querySelector(`#${HTML_CONSTANTS.PROJECTS_CONTAINER}`);
    }
    
    getProjectsContainer() {
	return this.#projectsContainer;
    }
    
    getProjectContainer(projectIndex) {
	if (!this.#isValidProjectIndex(projectIndex)) {
	    this.#win.console.error(`Attempted to get non-existant project container(Project Index ${projectIndex})`);
	}

	let projectsContainer = this.getProjectsContainer();
	
	return projectsContainer.children[projectIndex];
    }

    getAddProjectValue() {
	let addProjectInput = this.#doc.querySelector(`#${HTML_CONSTANTS.ADD_PROJECT_INPUT_ID}`);
	return addProjectInput.value;
    }

    getTodoList(projectIndex) {
	let sourceProject = this.getProjectContainer(projectIndex);
	return sourceProject.querySelector(`.${HTML_CONSTANTS.TODO_LIST}`);
    }

    getTodo(projectIndex, todoIndex) {
	let todoList = this.getTodoList(projectIndex);

	let isValidTodoIndex = todoIndex < todoList.children.length;
	if (!isValidTodoIndex) {
	    console.error(`Attempted to get non-existant todo container(Todo Index ${todoIndex})`);
	}
	
	return todoList.children[todoIndex];
    }

    prependProject(project) {
	let projectHTML = this.#htmlGenerator.generateProjectHTML(project);

	this.#projectsContainer.prepend(projectHTML);
	return this;
    }

    appendProject(project) {
	let projectHTML = this.#htmlGenerator.generateProjectHTML(project);

	this.#projectsContainer.appendChild(projectHTML);
	return this;   
    }

}

export default htmlManager;
