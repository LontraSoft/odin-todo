import Todo from './todo';
import Project from './project';
import Priority from './priority';
import * as html_classnames from './html_classnames';

class htmlGenerator {
    win;
    doc;
    
    constructor(win, doc) {
	this.win = win;
	this.doc = doc;
    }

    #dateToDateTimeLocalValue(date) {
	return date.toISOString().slice(0, 10);
    }

    generateTodoChecklistItem (todoChecklistItem) {
	const checklistItem = this.doc.createElement('li');
	const checklistItemDescription = this.doc.createElement('input');
	const checklistItemCheckbox = this.doc.createElement('input');

	
	checklistItemDescription.className = html_classnames.TODO_CHECKLIST_ITEM_DESCRIPTION;
	checklistItemDescription.type = 'text';
	
	checklistItemCheckbox.className = html_classnames.TODO_CHECKLIST_ITEM_CHECKBOX;
	checklistItemCheckbox.type = 'checkbox';
	checklistItemCheckbox.checked = todoChecklistItem.isCompleted;

	checklistItemDescription.value = todoChecklistItem.description;

	checklistItem.appendChild(checklistItemDescription);
	checklistItem.appendChild(checklistItemCheckbox);

	return checklistItem;
    }

    generateTodoChecklist(checklist) {
	const todoChecklist = this.doc.createElement('ul');
	todoChecklist.className = html_classnames.TODO_CHECKLIST;

	checklist.forEach((todoChecklistItem) => {
	    todoChecklist.appendChild(this.generateTodoChecklistItem(todoChecklistItem));
	});

	return todoChecklist;
    }

    generateTodoList(todos) {
	const todoList = this.doc.createElement('ul');

	todoList.className = html_classnames.TODO_LIST;

	todos.forEach((todo) => {
	    console.log(todo);
	    todoList.appendChild(this.generateTodo(todo));
	})

	return todoList;
    }

    generatePriority(priority) {
	const priorityOption = this.doc.createElement('option');

	priorityOption.className = 'priority-option';
	priorityOption.textContent = priority.name;
	priorityOption.dataset.priorityLevel = priority.priorityLevel;

	return priorityOption;
    }

    generatePriorityDropdown() {
	const prioritySelection = this.doc.createElement('select');
	prioritySelection.className = html_classnames.PRIORITY_DROPDOWN;

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

	todoName.className = html_classnames.TODO_NAME;
	todoName.type = 'text';
	todoName.value = name;

	return todoName;
    }

    generateTodoDescription(description) {
	const todoDescription = this.doc.createElement('input');

	todoDescription.className = html_classnames.TODO_DESCRIPTION;
	todoDescription.type = 'text';
	todoDescription.textContent = description;

	return todoDescription;
    }

    generateTodoDueDate(date) {
	const todoDueDate = this.doc.createElement('input');
	
	todoDueDate.className = html_classnames.TODO_DUE_DATE;
	todoDueDate.type = 'date';
	todoDueDate.value = this.#dateToDateTimeLocalValue(date);

	return todoDueDate;
    }

    generateTodoNotes(notes) {
	const todoNotes = this.doc.createElement('textarea');	

	todoNotes.className = html_classnames.TODO_NOTES;
	todoNotes.textContent = notes;

	return todoNotes;
    }

    // TODO: Add dragdrop icon
    generateTodo (todo) {
	const todoContainer = this.doc.createElement('div');
	const todoSidebar = this.doc.createElement('div');
	const todoCompleteButton = this.doc.createElement('button');
	const todoContentContainer = this.doc.createElement('div');
	const todoName = this.generateTodoName(todo.name);
	const todoDueDate = this.generateTodoDueDate(todo.dueDate);
	const todoPriority = this.generatePriorityDropdown();
	const todoDescription = this.generateTodoDescription(todo.description);
	const todoNotes = this.generateTodoNotes();
	const todoChecklist = this.generateTodoChecklist(todo.checklist);
	const todoRemoveButton = this.doc.createElement('button');

	todoContainer.className = html_classnames.TODO_CONTAINER;
	todoContentContainer.className = html_classnames.TODO_CONTENT_CONTAINER;

	todoCompleteButton.type = 'button';
	todoSidebar.className = html_classnames.TODO_SIDEBAR;
	todoCompleteButton.className = html_classnames.TODO_COMPLETE_BUTTON;
	todoSidebar.appendChild(todoCompleteButton);

	todoPriority.value = todo.priority.priorityLevel;

	todoRemoveButton.className = html_classnames.TODO_REMOVE_BUTTON;
	todoRemoveButton.textContent = 'Remove';

	todoContentContainer.appendChild(todoName);
	todoContentContainer.appendChild(todoDueDate);
	todoContentContainer.appendChild(todoPriority);
	todoContentContainer.appendChild(todoDescription);
	todoContentContainer.appendChild(todoNotes);
	todoContentContainer.appendChild(todoChecklist);
	todoContentContainer.appendChild(todoRemoveButton);

	todoContainer.appendChild(todoSidebar);
	todoContainer.appendChild(todoContentContainer);

	return todoContainer;
    }

    generateProjectHTML (project) {
	const projectContainer = this.doc.createElement('div');
	const projectName = this.doc.createElement('input');
	const projectPriority = this.generatePriorityDropdown();
	const projectRemoveButton = this.doc.createElement('button');
	const todoList = this.generateTodoList(project.todoList);

	projectContainer.className = html_classnames.PROJECT_CONTAINER;

	projectName.className = html_classnames.PROJECT_NAME;
	projectName.type = 'text';
	projectName.value = project.name;

	projectPriority.className = html_classnames.PROJECT_PRIORITY_DROPDOWN;

	projectRemoveButton.className = html_classnames.PROJECT_REMOVE_BUTTON;
	projectRemoveButton.type = 'button';

	projectContainer.appendChild(projectName);
	projectContainer.appendChild(projectPriority);
	projectContainer.appendChild(projectRemoveButton);
	projectContainer.appendChild(todoList);

	return projectContainer;
    }
}

export default htmlGenerator;
