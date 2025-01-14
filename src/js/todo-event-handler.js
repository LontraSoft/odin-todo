import ProjectManager from './project_manager';
import Project from './project';
import HtmlGenerator from './html_generator';
import HtmlManager from './html_manager';
import * as html_classnames from './html_constants';

class TodoEventHandler {
    #htmlManager;
    #projectManager;

    constructor(htmlGenerator, htmlManager, projectManager) {
	this.#htmlManager = htmlManager;
	this.#projectManager = projectManager;
	return this;
    }

    updateHtmlManager(newHtmlManager) {
	this.#htmlManager = newHtmlManager;
    }

    updateProjectManager(newProjectManager) {
	this.#projectManager = newProjectManager;
    }

    addNewProject = (event) => {
	let newProjectName = this.#htmlManager.getAddProjectValue();
	let project = new Project(newProjectName);
	
	this.#projectManager.addProject(project);
	this.#htmlManager.prependProject(project);

	this.saveProjects();

	return this;
    }

}

export default TodoEventHandler;
