import {Todo, TodoChecklistItem} from './todo.js';
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

    updateProjectName(projectIndex, newName) {
	this.#projects[projectIndex].name = newName;
	this.saveProjects();
	return this;
    }

    updateProjectPriority(projectIndex, newPriority) {
	this.#projects[projectIndex].priority = newPriority;
	this.saveProjects();
	return this;
    }

    updateTodoName(projectIndex, todoIndex, newTodoName) {
	let targetTodo = this.#projects[projectIndex].getTodo(todoIndex);
	targetTodo.name = newTodoName;
    }

    updateTodoDueDate(projectIndex, todoIndex, newDueDate) {
	let targetTodo = this.#projects[projectIndex].getTodo(todoIndex);
	targetTodo.dueDate = newDueDate;
    }

    updateTodoPriority(projectIndex, todoIndex, newPriority) {
	let targetTodo = this.#projects[projectIndex].getTodo(todoIndex);
	targetTodo.priority = newPriority;
    }

    updateTodoNotes(projectIndex, todoIndex, newNotes) {
	let targetTodo = this.#projects[projectIndex].getTodo(todoIndex);
	targetTodo.notes = newNotes;
    }

    updateTodoDescription(projectIndex, todoIndex, newDescription) {
	let targetTodo = this.#projects[projectIndex].getTodo(todoIndex);
	targetTodo.description = newDescription;
    }

    updateChecklistItemDescription(projectIndex, todoIndex, checklistItemIndex, newDescription) {
	let targetTodo = this.#projects[projectIndex].getTodo(todoIndex);
	let targetChecklistItem = targetTodo.getChecklistItem(checklistItemIndex);
	targetChecklistItem.description = newDescription;
    }

    updateChecklistItemCompletion(projectIndex, todoIndex, checklistItemIndex, isCompleted) {
	let targetTodo = this.#projects[projectIndex].getTodo(todoIndex);
	let targetChecklistItem = targetTodo.getChecklistItem(checklistItemIndex);
	targetChecklistItem.isCompleted = isCompleted;
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

    addChecklistItem(projectIndex, todoIndex, checklistItem) {
	let targetTodo = this.#projects[projectIndex].getTodo(todoIndex);
	targetTodo.addChecklistItem(checklistItem);
    }

    removeChecklistItem(projectIndex, todoIndex, checklistItemIndex) {
	let targetTodo = this.#projects[projectIndex].getTodo(todoIndex);
	targetTodo.removeChecklistItem(checklistItemIndex);
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

    moveProject(sourceIndex, targetIndex) {
	if (!this.isProjectIndexValid(sourceIndex)) {
	    console.error(`Attempted to move project from invalid source index(Index ${sourceIndex})`);
	    return this;
	}
	
	if (!this.isProjectIndexValid(targetIndex)) {
	    console.error(`Attempted to move project to invalid target index(Index ${targetIndex})`);
	    return this;
	}

	let projectToMove = this.#projects[sourceIndex];
	this.#projects.splice(sourceIndex, 1);
	this.#projects.splice(targetIndex, 0, projectToMove);
	this.saveProjects();
	
	return this;
    }

    moveTodo(sourceProjectIndex, targetProjectIndex, sourceTodoIndex, targetTodoIndex) {
	if (!this.isProjectIndexValid(sourceProjectIndex)) {
	    console.error(`Attempted to move todo from non-existant source project(Index ${sourceProjectIndex})`);
	}

	if (!this.isTodoIndexValid(sourceProjectIndex, sourceTodoIndex)) {
	    console.error(`Attempted to move non-existant todo(Project Index: ${sourceProjectIndex}, Todo Index: ${sourceTodoIndex})`);
	}

	if (!this.isProjectIndexValid(targetProjectIndex)) {
	    console.error(`Attempted to move todo to non-existant target project(Index ${targetProjectIndex})`);
	}

	let isTodoMovingToValidTargetIndex = this.#projects[targetProjectIndex].todoList.length <= targetTodoIndex;
	if (!isTodoMovingToValidTargetIndex) {
	    console.error(`Attempted to move todo to invalid target todo list slot(Index ${targetTodoIndex})`);
	}

	let todoToMove = this.#projects[sourceProjectIndex].todoList[sourceTodoIndex];
	this.#projects[sourceProjectIndex].removeTodo(sourceTodoIndex);
	this.#projects[targetProjectIndex].addTodo(todoToMove, targetTodoIndex);
	this.saveProjects();
	
	return this;
    }

    saveProjects() {
	let projectsJSON = JSON.stringify(this.#projects);
	localStorage.setItem('projects', projectsJSON);
    }

    #parseProjectData(projectData) {
	let todos = [];
	let projectName = projectData.name;
	let projectPriorityName = projectData.priority.name;
	let projectPriorityLevel = projectData.priority.priorityLevel;
	let projectPriority = new Priority(projectPriorityName, projectPriorityLevel);
	for (const todoData of projectData.todoList) {
	    todos.push(this.#parseTodoData(todoData));
	}
	
	return new Project(projectName, projectPriority, ...todos)
    }

    #parseTodoData(todoData) {
	let todoName = todoData.name;
	let todoDescription = todoData.description;
	let todoDueDate = new Date(todoData.dueDate);
	let todoPriorityName = todoData.priority.name;
	let todoPriorityLevel = todoData.priority.priorityLevel;
	let todoPriority = new Priority(todoPriorityName, todoPriorityLevel);
	let todoNotes = todoData.notes;
	let isTodoCompleted = todoData.isCompleted;
	let todo = new Todo(todoName, todoDescription, todoDueDate, todoPriority, todoNotes, isTodoCompleted);
	
	for (const checklistItemData of todoData.checklist) {
	    let checklistItemDescription = checklistItemData.description;
	    let checklistItemIsCompleted = checklistItemData.isCompleted;
	    let newChecklistItem = new TodoChecklistItem(checklistItemDescription, checklistItemIsCompleted);
	    todo.addChecklistItem(newChecklistItem);
	}
	return todo;
    }

    loadProjects() {
	let projectsData = JSON.parse(localStorage.getItem('projects'));
	for (const projectData of projectsData) {
	    this.#projects.push(this.#parseProjectData(projectData));
	}
    }
}

export default ProjectManager;
