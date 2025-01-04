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
