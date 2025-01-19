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

    redirectProjectsContainerClick = (event) => {
	switch(event.target.className) {
	case HTML_CONSTANTS.ADD_TODO_BUTTON:
	    this.onAddTodoClick(event);
	    break;
	case HTML_CONSTANTS.ADD_CHECKLIST_ITEM_BUTTON:
	    this.onAddChecklistItemClick(event);
	    break;
	case HTML_CONSTANTS.TODO_REMOVE_BUTTON:
	    this.onRemoveTodoClick(event);
	    break;
	case HTML_CONSTANTS.TODO_CHECKLIST_ITEM_REMOVE_BUTTON:
	    this.onRemoveChecklistItemClick(event);
	    break;
	case HTML_CONSTANTS.PROJECT_REMOVE_BUTTON:
	    this.onRemoveProjectClick(event);
	    break;
	}

	// DEBUG
	this.#win.console.log(this.#projectManager.getProjects());
    }

    onAddNewProject = (event) => {
	let newProjectName = this.#htmlManager.getAddProjectValue();
	let project = new Project(newProjectName);
	
	this.#projectManager.addProject(project);
	this.#htmlManager.prependProject(project);

	this.#projectManager.saveProjects();

	return this;
    }

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

    onRemoveTodoClick = (event) => {
	let projectIndex = this.#htmlManager.getProjectIndexFromChild(event.target);
	let todoIndex = this.#htmlManager.getTodoIndexFromChild(event.target);
	this.#removeTodo(projectIndex, todoIndex);
    }

    onRemoveChecklistItemClick = (event) => {
	let projectIndex = this.#htmlManager.getProjectIndexFromChild(event.target);
	let todoIndex = this.#htmlManager.getTodoIndexFromChild(event.target);
	let checklistItemIndex = this.#htmlManager.getChecklistIndexFromChild(event.target);
	this.#projectManager.removeChecklistItem(projectIndex, todoIndex, checklistItemIndex);
	this.#htmlManager.removeChecklistItem(projectIndex, todoIndex, checklistItemIndex);
    }

    onRemoveProjectClick = (event) => {
	let projectIndex = this.#htmlManager.getProjectIndexFromChild(event.target);
	this.#projectManager.removeProject(projectIndex);
	this.#htmlManager.removeProject(projectIndex);
    }

    #addTodo(projectIndex, todoName) {
	let newTodo = new Todo(todoName);

	this.#projectManager.addTodo(projectIndex, newTodo);
	this.#htmlManager.addTodo(projectIndex, newTodo);

	this.#projectManager.saveProjects();
	
	return this;
    }

    #removeTodo(projectIndex, todoIndex) {
	this.#projectManager.removeTodo(projectIndex, todoIndex);
	this.#htmlManager.removeTodo(projectIndex, todoIndex);

	this.#projectManager.saveProjects();
	
	return this;
    }

    #addChecklistItem(projectIndex, todoIndex, checklistDescription) {
	let newChecklistItem = new TodoChecklistItem(checklistDescription);
	this.#projectManager.addChecklistItem(projectIndex, todoIndex, newChecklistItem);
	this.#htmlManager.addChecklistItem(projectIndex, todoIndex, newChecklistItem);
    }
}

export default TodoEventHandler;
