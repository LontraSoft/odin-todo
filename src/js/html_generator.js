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
    }

    generateProjectHTML (project) {
	// TODO: implement
	console.log('Attempted to generate a project');
    }
}

export default htmlGenerator;
