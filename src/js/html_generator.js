export default htmlGenerator;
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

    generateTodoHTML (todo) {
	// TODO: implement
	console.log('Attempted to generate a Todo');
    }

    generateProjectHTML (project) {
	// TODO: implement
	console.log('Attempted to generate a project');
    }
}
