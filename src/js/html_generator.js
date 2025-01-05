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
	return date.toISOString().slice(0, 10);
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

	checklistItemDescription.value = todoChecklistItem.description;

	checklistItem.appendChild(checklistItemDescription);
	checklistItem.appendChild(checklistItemCheckbox);

	return checklistItem;
    }

    generateTodoChecklist(checklist) {
	const todoChecklist = this.doc.createElement('ul');
	todoChecklist.className = 'todo-checklist';

	checklist.forEach((todoChecklistItem) => {
	    todoChecklist.appendChild(this.generateTodoChecklistItem(todoChecklistItem));
	});

	return todoChecklist;
    }

    generateTodoList(todos) {
	const todoList = this.doc.createElement('ul');

	todoList.className = 'todo-list';

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
	prioritySelection.className = 'priority-dropdown';

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
	todoDueDate.type = 'date';
	todoDueDate.value = this.#dateToDateTimeLocalValue(date);

	return todoDueDate;
    }

    generateTodoNotes(notes) {
	const todoNotes = this.doc.createElement('textarea');	

	todoNotes.className = 'todo-notes';
	todoNotes.textContent = notes;

	return todoNotes;
    }

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

	todoContainer.className = 'todo-container';
	todoContentContainer.className = 'todo-content-container';

	todoSidebar.className = 'todo-sidebar';
	todoCompleteButton.className = 'todo-complete-button';
	todoCompleteButton.type = 'button';
	todoSidebar.appendChild(todoCompleteButton);

	todoPriority.value = todo.priority.priorityLevel;

	todoRemoveButton.className = 'todo-remove-button';
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

	projectContainer.className = 'project-container';

	projectName.className = 'project-name';
	projectName.textContent = project.name;

	projectPriority.className = 'project-priority-dropdown';

	projectRemoveButton.className = 'project-remove-button';
	projectRemoveButton.type = 'button';

	projectContainer.appendChild(projectName);
	projectContainer.appendChild(projectPriority);
	projectContainer.appendChild(projectRemoveButton);
	projectContainer.appendChild(todoList);

	return projectContainer;
    }
}

export default htmlGenerator;
