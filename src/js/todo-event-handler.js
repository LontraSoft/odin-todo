import {Todo, TodoChecklistItem} from './todo';
import ProjectManager from './project_manager';
import Project from './project';
import HtmlGenerator from './html_generator';
import HtmlManager from './html_manager';
import * as HTML_CONSTANTS from './html_constants';

class TodoEventHandler {
    #win;
    #doc;
    #htmlManager;
    #projectManager;
    #projectsContainer;

    constructor(win, doc, htmlManager, projectManager) {
	this.#win = win;
	this.#doc = doc;
	this.#htmlManager = htmlManager;
	this.#projectManager = projectManager;

	let projectsContainer = this.#htmlManager.getProjectsContainer();
	projectsContainer.addEventListener('click', this.redirectProjectsContainerClick);
	
	return this;
    }

    updateHtmlManager(newHtmlManager) {
	this.#htmlManager = newHtmlManager;
    }

    updateProjectManager(newProjectManager) {
	this.#projectManager = newProjectManager;
    }

    onAddNewProject = (event) => {
	let newProjectName = this.#htmlManager.getAddProjectValue();
	let project = new Project(newProjectName);
	
	this.#projectManager.addProject(project);
	this.#htmlManager.prependProject(project);

    onAddTodoClick = (event) => {
	let projectIndex = this.#htmlManager.getProjectIndexFromChild(event.target);
	let todoName = this.#htmlManager.getAddTodoValue(projectIndex);
	this.#addTodo(projectIndex, todoName);
    }

    onAddChecklistItemClick = (event) => {
	let projectIndex = this.#htmlManager.getProjectIndexFromChild(event.target);
	let todoIndex = this.#htmlManager.getTodoIndexFromChild(event.target);
	let checklistDescription = this.#htmlManager.getAddChecklistItemValue(projectIndex, todoIndex);
	this.#addChecklistItem(projectIndex, todoIndex, checklistDescription);
    }

	this.saveProjects();

	return this;
    }

}

export default TodoEventHandler;
