import Todo from './todo';
import Project from './project';
import Priority from './priority';
import * as HTML_CONSTANTS from './html_constants';

const PROJECT_NAME_PLACEHOLDER_TEXT = 'Project name...';
const ADD_TODO_PLACEHOLDER_TEXT = 'Add todo...';
const TODO_NAME_PLACEHOLDER_TEXT = 'Todo name...';
const TODO_DESCRIPTION_PLACEHOLDER_TEXT = 'Todo description...';
const TODO_NOTES_PLACEHOLDER_TEXT = 'Todo notes...';
const CHECKLIST_ITEM_DESCRIPTION_PLACEHOLDER_TEXT = 'Checklist item...';
const ADD_CHECKLIST_ITEM_PLACEHOLDER_TEXT = 'Add checklist item...';

class htmlGenerator {
    win;
    doc;
    
    constructor(win, doc) {
	this.win = win;
	this.doc = doc;
    }

    #dateToDateTimeLocalValue(date) {
	if(!(date instanceof Date)) {
	    this.win.console.error(`Expected date, got ${date}`);
	}
	return date.toISOString().slice(0, 10);
    }

    generateTodoChecklistItem (todoChecklistItem) {
	const checklistItem = this.doc.createElement('li');
	const checklistItemDescription = this.doc.createElement('input');
	const checklistItemCheckbox = this.doc.createElement('input');
	const checklistItemRemoveButton = this.doc.createElement('button');

	checklistItem.className = HTML_CONSTANTS.TODO_CHECKLIST_ITEM;
	
	checklistItemDescription.className = HTML_CONSTANTS.TODO_CHECKLIST_ITEM_DESCRIPTION;
	checklistItemDescription.type = 'text';
	checklistItemDescription.value = todoChecklistItem.description;
	checklistItemDescription.placeholder = CHECKLIST_ITEM_DESCRIPTION_PLACEHOLDER_TEXT;
	
	checklistItemCheckbox.className = HTML_CONSTANTS.TODO_CHECKLIST_ITEM_CHECKBOX;
	checklistItemCheckbox.type = 'checkbox';
	checklistItemCheckbox.checked = todoChecklistItem.isCompleted;

	checklistItemRemoveButton.type = 'button';
	checklistItemRemoveButton.className = HTML_CONSTANTS.TODO_CHECKLIST_ITEM_REMOVE_BUTTON;

	checklistItem.appendChild(checklistItemDescription);
	checklistItem.appendChild(checklistItemCheckbox);
	checklistItem.appendChild(checklistItemRemoveButton);

	return checklistItem;
    }

    generateTodoChecklist(checklist) {
	const todoChecklist = this.doc.createElement('ul');
	todoChecklist.className = HTML_CONSTANTS.TODO_CHECKLIST;

	checklist.forEach((todoChecklistItem) => {
	    todoChecklist.appendChild(this.generateTodoChecklistItem(todoChecklistItem));
	});


	return todoChecklist;
    }

    generateAddChecklistItem() {
	const addChecklistItemContainer = this.doc.createElement('section');
	const addChecklistItemButton = this.doc.createElement('button');
	const addChecklistItemInput = this.doc.createElement('input');

	addChecklistItemContainer.className = HTML_CONSTANTS.ADD_CHECKLIST_ITEM_CONTAINER;

	addChecklistItemInput.className = HTML_CONSTANTS.ADD_CHECKLIST_ITEM_INPUT;
	addChecklistItemInput.type = 'text';
	addChecklistItemInput.placeholder = ADD_CHECKLIST_ITEM_PLACEHOLDER_TEXT;

	addChecklistItemButton.className = HTML_CONSTANTS.ADD_CHECKLIST_ITEM_BUTTON;
	addChecklistItemButton.type = 'button';

	addChecklistItemContainer.appendChild(addChecklistItemButton);
	addChecklistItemContainer.appendChild(addChecklistItemInput);

	return addChecklistItemContainer;
    }

    generateTodoList(todos) {
	const todoList = this.doc.createElement('ul');

	todoList.className = HTML_CONSTANTS.TODO_LIST;

	if (!todos) {
	    return todoList;
	}

	todos.forEach((todo) => {
	    todoList.appendChild(this.generateTodo(todo));
	});

	return todoList;
    }

    generatePriority(priority) {
	const priorityOption = this.doc.createElement('option');

	priorityOption.className = 'priority-option';
	priorityOption.label = priority.name;
	priorityOption.dataset.priorityLevel = priority.priorityLevel;

	return priorityOption;
    }

    generatePriorityDropdown() {
	const prioritySelection = this.doc.createElement('select');
	prioritySelection.className = HTML_CONSTANTS.PRIORITY_DROPDOWN;

	const lowestPriority = this.generatePriority(Priority.LOWEST);
	const lowPriority = this.generatePriority(Priority.LOW);
	const mediumPriority = this.generatePriority(Priority.MEDIUM);
	const highPriority = this.generatePriority(Priority.HIGH);
	const highestPriority = this.generatePriority(Priority.HIGHEST);

	lowestPriority.value = Priority.LOWEST.priorityLevel;
	lowPriority.value = Priority.LOW.priorityLevel;
	mediumPriority.value = Priority.MEDIUM.priorityLevel;
	highPriority.value = Priority.HIGH.priorityLevel;
	highestPriority.value = Priority.HIGHEST.priorityLevel;
	
	prioritySelection.appendChild(lowestPriority);
	prioritySelection.appendChild(lowPriority);
	prioritySelection.appendChild(mediumPriority);
	prioritySelection.appendChild(highPriority);
	prioritySelection.appendChild(highestPriority);

	return prioritySelection;
    }

    generateTodoName(name) {
	const todoName = this.doc.createElement('input');

	todoName.className = HTML_CONSTANTS.TODO_NAME;
	todoName.type = 'text';
	todoName.placeholder = TODO_NAME_PLACEHOLDER_TEXT;
	todoName.value = name;

	return todoName;
    }

    generateTodoDescription(description) {
	const todoDescription = this.doc.createElement('input');

	todoDescription.className = HTML_CONSTANTS.TODO_DESCRIPTION;
	todoDescription.type = 'text';
	todoDescription.placeholder = TODO_DESCRIPTION_PLACEHOLDER_TEXT;
	todoDescription.value = description;

	return todoDescription;
    }

    generateTodoDueDate(date) {
	const todoDueDate = this.doc.createElement('input');
	
	todoDueDate.className = HTML_CONSTANTS.TODO_DUE_DATE;
	todoDueDate.type = 'date';
	todoDueDate.value = this.#dateToDateTimeLocalValue(date);

	return todoDueDate;
    }

    generateTodoNotes(notes) {
	const todoNotes = this.doc.createElement('textarea');	

	todoNotes.className = HTML_CONSTANTS.TODO_NOTES;
	todoNotes.textContent = notes;
	todoNotes.placeholder = TODO_NOTES_PLACEHOLDER_TEXT;

	return todoNotes;
    }

    generateAddTodo() {
	const addTodoContainer = this.doc.createElement('section');
	const addTodoButton = this.doc.createElement('button');
	const addTodoInput = this.doc.createElement('input');

	addTodoContainer.className = HTML_CONSTANTS.ADD_TODO_CONTAINER;
	
	addTodoButton.className = HTML_CONSTANTS.ADD_TODO_BUTTON;
	addTodoButton.type = 'button';

	addTodoInput.className = HTML_CONSTANTS.ADD_TODO_INPUT;
	addTodoInput.type = 'text';
	addTodoInput.placeholder = ADD_TODO_PLACEHOLDER_TEXT;

	addTodoContainer.appendChild(addTodoButton);
	addTodoContainer.appendChild(addTodoInput);

	return addTodoContainer;
    }

    // TODO: Add dragdrop icon
    generateTodo (todo) {
	const todoContainer = this.doc.createElement('div');
	const todoSidebar = this.doc.createElement('div');
	const todoCompleteCheckbox = this.doc.createElement('input');
	const todoContentContainer = this.doc.createElement('div');
	const todoContentHeader = this.doc.createElement('div');
	const todoName = this.generateTodoName(todo.name);
	const todoRemoveButton = this.doc.createElement('button');
	const todoDueDate = this.generateTodoDueDate(todo.dueDate);
	const todoPriority = this.generatePriorityDropdown();
	const todoExpandButton = this.doc.createElement('button');
	const todoContentBody = this.doc.createElement('div');
	const todoDescription = this.generateTodoDescription(todo.description);
	const todoNotes = this.generateTodoNotes();
	const todoChecklist = this.generateTodoChecklist(todo.checklist);
	const addChecklistItemHTML = this.generateAddChecklistItem();

	todoContainer.className = HTML_CONSTANTS.TODO_CONTAINER;
	todoContentContainer.className = HTML_CONSTANTS.TODO_CONTENT_CONTAINER;

	todoSidebar.className = HTML_CONSTANTS.TODO_SIDEBAR;
	todoCompleteCheckbox.className = HTML_CONSTANTS.TODO_COMPLETE_CHECKBOX;
	todoCompleteCheckbox.type = 'checkbox';
	todoCompleteCheckbox.checked = todo.isCompleted;
	todoSidebar.appendChild(todoCompleteCheckbox);

	todoContentHeader.className = HTML_CONSTANTS.TODO_CONTENT_HEADER;
	todoContentBody.className = HTML_CONSTANTS.TODO_CONTENT_BODY;

	todoExpandButton.className = HTML_CONSTANTS.TODO_EXPAND_BUTTON;
	todoExpandButton.type = 'button';

	todoPriority.value = todo.priority.priorityLevel;

	todoRemoveButton.className = HTML_CONSTANTS.TODO_REMOVE_BUTTON;
	
	todoContentHeader.appendChild(todoName);
	todoContentHeader.appendChild(todoRemoveButton);
	todoContentHeader.appendChild(todoDueDate);
	todoContentHeader.appendChild(todoPriority);
	
	todoContentBody.appendChild(todoDescription);
	todoContentBody.appendChild(todoNotes);
	todoContentBody.appendChild(todoChecklist);
	todoContentBody.appendChild(addChecklistItemHTML);

	todoContentContainer.appendChild(todoContentHeader);
	todoContentContainer.appendChild(todoContentBody);
	
	todoContainer.appendChild(todoSidebar);
	todoContainer.appendChild(todoContentContainer);

	todoContainer.appendChild(todoExpandButton);
	
	return todoContainer;
    }

    generateProjectHTML (project) {
	const projectContainer = this.doc.createElement('div');
	const projectHeader = this.doc.createElement('div');
	const projectName = this.doc.createElement('input');
	const projectPriority = this.generatePriorityDropdown();
	const projectRemoveButton = this.doc.createElement('button');
	const addTodoContainer = this.generateAddTodo();
	const projectBody = this.doc.createElement('div');
	const todoList = this.generateTodoList(project.todoList);

	projectContainer.className = HTML_CONSTANTS.PROJECT_CONTAINER;
	projectHeader.className = HTML_CONSTANTS.PROJECT_HEADER;
	projectBody.className = HTML_CONSTANTS.PROJECT_BODY;

	projectName.className = HTML_CONSTANTS.PROJECT_NAME;
	projectName.type = 'text';
	projectName.value = project.name;
	projectName.placeholder = PROJECT_NAME_PLACEHOLDER_TEXT;

	projectPriority.className = HTML_CONSTANTS.PROJECT_PRIORITY_DROPDOWN;
	projectPriority.value = project.priority.priorityLevel;

	projectRemoveButton.className = HTML_CONSTANTS.PROJECT_REMOVE_BUTTON;
	projectRemoveButton.type = 'button';

	projectHeader.appendChild(projectName);
	projectHeader.appendChild(projectPriority);
	projectHeader.appendChild(projectRemoveButton);

	projectBody.appendChild(addTodoContainer);
	projectBody.appendChild(todoList);

	projectContainer.appendChild(projectHeader);
	projectContainer.appendChild(projectBody);
	
	return projectContainer;
    }
}

export default htmlGenerator;
