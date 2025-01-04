import Todo from './todo';
import Project from './project';
import Priority from './priority';

class htmlGenerator {
    win;
    doc;
    
    constructor(win, doc) {
	this.win = win;
	this.doc = doc;
    }

    #dateToDateTimeLocalValue(date) {
	return date.toISOString().slice(0, 16);
    }

    generateTodoChecklistItem (todoChecklistItem) {
	const checklistItem = this.doc.createElement('li');
	const checklistItemDescription = this.doc.createElement('input');
	const checklistItemCheckbox = this.doc.createElement('input');

	checklistItemDescription.className = 'checklist-item-description';
	checklistItemDescription.type = 'text';
	
	checklistItemCheckbox.className = 'checklist-item-checkbox';
	checklistItemCheckbox.type = 'checkbox';
	checklistItemCheckbox.checked = todoChecklistItem.isCompleted;

	checklistItemDescription.textContent = todoChecklistItem.description;

	checklistItem.appendChild(checklistItemDescription);
	checklistItem.appendChild(checklistItemCheckbox);

	return checklistItem;
    }

    generatePriority(priority) {
	const priorityOption = this.doc.createElement('option');

	priorityOption.className = 'priority-option';
	priorityOption.textContent = priority.name;
	priorityOption.dataset.priorityLevel = priority.priorityLevel;

	return priorityOption;
    }

    generateTodoName(name) {
	const todoName = this.doc.createElement('h3');

	todoName.className = 'todo-name';
	todoName.type = 'text';
	todoName.textContent = name;

	return todoName;
    }

    generateTodoDescription(description) {
	const todoDescription = this.doc.createElement('input');

	todoDescription.className = 'todo-description';
	todoDescription.type = 'text';
	todoDescription.textContent = description;

	return todoDescription;
    }

    generateTodoDueDate(date) {
	const todoDueDate = this.doc.createElement('input');
	
	todoDueDate.className = 'todo-due-date';
	todoDueDate.type = 'datetime-local';
	todoDueDate.value = this.#dateToDateTimeLocalValue(date);

	return todoDueDate;
    }
    }

    generateProjectHTML (project) {
	// TODO: implement
	console.log('Attempted to generate a project');
    }
}

export default htmlGenerator;
