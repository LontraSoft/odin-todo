import * as HTML_CONSTANTS from './html_constants';
import HtmlGenerator from './html_generator';

const PROJECT_CLASSES_WITH_ON_CHANGE_EVENTS = [
    HTML_CONSTANTS.PROJECT_NAME,
    HTML_CONSTANTS.PROJECT_PRIORITY_DROPDOWN,
];

const TODO_CLASSES_WITH_ON_CHANGE_EVENTS = [
    HTML_CONSTANTS.TODO_NAME,
    HTML_CONSTANTS.TODO_DUE_DATE,
];

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

    #getAddProjectInput() {
	return this.#doc.querySelector(`#${HTML_CONSTANTS.ADD_PROJECT_INPUT_ID}`);
    }

    getAddProjectValue() {
	let addProjectInput = this.#getAddProjectInput();
	return addProjectInput.value;
    }

    clearAddProjectValue() {
	let addProjectInput = this.#getAddProjectInput();
	addProjectInput.value = '';
    }

    #getAddTodoInput(projectIndex) {
	let projectContainer = this.getProjectContainer(projectIndex);
	return projectContainer.querySelector(`.${HTML_CONSTANTS.ADD_TODO_INPUT}`);
    }
    
    getAddTodoValue(projectIndex) {
	let addTodoInput = this.#getAddTodoInput(projectIndex);
	return addTodoInput.value;
    }

    clearAddTodoValue(projectIndex) {
	let addTodoInput = this.#getAddTodoInput(projectIndex);
	addTodoInput.value = '';
    }

    #getAddChecklistItemInput(projectIndex, todoIndex) {
	let todoContainer = this.getTodo(projectIndex, todoIndex);
	return todoContainer.querySelector(`.${HTML_CONSTANTS.ADD_CHECKLIST_ITEM_INPUT}`);
    }

    getAddChecklistItemValue(projectIndex, todoIndex) {
	let addChecklistItemInput = this.#getAddChecklistItemInput(projectIndex, todoIndex);
	return addChecklistItemInput.value;
    }

    clearAddChecklistItemValue(projectIndex, todoIndex) {
	let addChecklistItemInput = this.#getAddChecklistItemInput(projectIndex, todoIndex);
	addChecklistItemInput.value = '';
    }

    getTodoNameValue(projectIndex, todoIndex) {
	let targetTodo = this.getTodo(projectIndex, todoIndex);
	let targetTodoInput = targetTodo.querySelector(`.${HTML_CONSTANTS.TODO_NAME}`);
	return targetTodoInput.value;
    }

    getTodoDueDate(projectIndex, todoIndex) {
	let targetTodo = this.getTodo(projectIndex, todoIndex);
	let targetDueDateInput = targetTodo.querySelector(`.${HTML_CONSTANTS.TODO_DUE_DATE}`);
	return targetDueDateInput.value;
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

    getTodoChecklist(projectIndex, todoIndex) {
	let targetTodo = this.getTodo(projectIndex, todoIndex);
	return targetTodo.querySelector(`.${HTML_CONSTANTS.TODO_CHECKLIST}`);
    }

    getProjectIndexFromChild(projectChildNode) {
	let projectContainer = projectChildNode.closest(`.${HTML_CONSTANTS.PROJECT_CONTAINER}`);
	return Array.prototype.indexOf.call(this.#projectsContainer.children, projectContainer);
    }

    getTodoIndexFromChild(todoChildNode) {
	let todoListContainer = todoChildNode.closest(`.${HTML_CONSTANTS.TODO_LIST}`);
	let todoContainer = todoChildNode.closest(`.${HTML_CONSTANTS.TODO_CONTAINER}`);
	return Array.prototype.indexOf.call(todoListContainer.children, todoContainer);
    }

    getChecklistIndexFromChild(checklistChildNode) {
	let checklistContainer = checklistChildNode.closest(`.${HTML_CONSTANTS.TODO_CHECKLIST}`);
	let checklistItemContainer = checklistChildNode.closest(`.${HTML_CONSTANTS.TODO_CHECKLIST_ITEM}`);
	return Array.prototype.indexOf.call(checklistContainer.children, checklistItemContainer);
    }

    #getTodoHtmlList(projectHTML) {
	return projectHTML.querySelectorAll(`.${HTML_CONSTANTS.TODO_CONTAINER}`);
    }

    #attachProjectEventListeners(projectHTML, onChangeDelegateFunction) {
	for(const className of PROJECT_CLASSES_WITH_ON_CHANGE_EVENTS) {
	    let targetNode = projectHTML.querySelector(`.${className}`);
	    targetNode.addEventListener('change', onChangeDelegateFunction);
	}

	let todoHtmlNodes = this.#getTodoHtmlList(projectHTML);	
	for(const todoHTML of todoHtmlNodes) {
	    this.#attachTodoEventListeners(todoHTML, onChangeDelegateFunction);
	}
    }

    prependProject(project, onChangeDelegateFunction) {
	let projectHTML = this.#htmlGenerator.generateProjectHTML(project);

	this.#attachProjectEventListeners(projectHTML, onChangeDelegateFunction);
	this.#projectsContainer.prepend(projectHTML);
	return this;
    }

    appendProject(project, onChangeDelegateFunction) {
	let projectHTML = this.#htmlGenerator.generateProjectHTML(project);

	this.#attachProjectEventListeners(projectHTML, onChangeDelegateFunction);
	this.#projectsContainer.appendChild(projectHTML);
	return this;   
    }

    insertProject(project, index, onChangeDelegateFunction) {
	if (index === 0) {
	    this.prependProject(project);
	    return this;
	}

	let isIndexEnd = index === this.#projectsContainer.children.length;
	if (isIndexEnd) {
	    this.appendProject(project);
	}

	let projectHTML = this.#htmlGenerator.generateProjectHTML(project);

	if (!this.#isValidProjectIndex(index)) {
	    console.error(`Attempted to add project at index outside of current project list(Project Index ${index})`);
	    return this;
	}

	let projectInDesiredIndex = this.#projectsContainer.children[index];

	this.#attachProjectEventListeners(projectHTML, onChangeDelegateFunction);
	this.#projectsContainer.insertBefore(projectHTML, projectInDesiredIndex);
    }

    removeProject(projectIndex) {
	let targetProject = this.getProjectContainer(projectIndex);
	this.#projectsContainer.removeChild(targetProject);
    }

    #attachTodoEventListeners(todoHTML, onChangeDelegateFunction) {
	for(const className of TODO_CLASSES_WITH_ON_CHANGE_EVENTS) {
	    let targetNode = todoHTML.querySelector(`.${className}`);
	    targetNode.addEventListener('change', onChangeDelegateFunction);
	}
    }

    addTodo(projectIndex, todo, onChangeDelegateFunction) {
	let targetTodoList = this.getTodoList(projectIndex);
	let newTodoHTML = this.#htmlGenerator.generateTodo(todo);
	this.#attachTodoEventListeners(newTodoHTML, onChangeDelegateFunction);
	targetTodoList.appendChild(newTodoHTML);
    }

    removeTodo(projectIndex, todoIndex) {
	let targetTodoList = this.getTodoList(projectIndex);
	let targetTodo = this.getTodo(projectIndex, todoIndex);
	targetTodoList.removeChild(targetTodo);
    }

    addChecklistItem(projectIndex, todoIndex, todoChecklistItem) {
	let targetTodo = this.getTodo(projectIndex, todoIndex);
	let targetChecklist = targetTodo.querySelector(`.${HTML_CONSTANTS.TODO_CHECKLIST}`);
	let newChecklistItemHTML = this.#htmlGenerator.generateTodoChecklistItem(todoChecklistItem);
	targetChecklist.appendChild(newChecklistItemHTML);
    }

    removeChecklistItem(projectIndex, todoIndex, todoChecklistItemIndex) {
	let targetChecklist = this.getTodoChecklist(projectIndex, todoIndex);
	let targetChecklistItem = targetChecklist.children[todoChecklistItemIndex];
	targetChecklist.removeChild(targetChecklistItem);
    }

    loadProjects(projectList, onChangeDelegateFunction) {
	let thisHtmlHandler = this;
	for (const project of projectList) {
	    thisHtmlHandler.appendProject(project, onChangeDelegateFunction);
	}
    }
}

export default htmlManager;
