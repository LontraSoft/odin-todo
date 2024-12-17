import Priority from './priority'
import Todo from './todo'

class Project {
    #name;
    #priority;
    #todoList = [];

    loadTodoList(...todos) {
	for (let todo of todos) {
	    if (todo instanceof Todo) {
		this.#todoList.push(todo);
	    }
	}
    }
    
    constructor(name, priority = Priority.MEDIUM, ...todos) {
	this.#name = name;
	this.#priority = priority;
	this.#todoList = [];
	this.loadTodoList(todos);
    }

    get name() { return this.#name; }
    set name(newName) { this.#name = newName; }

    get priority() { return this.#priority; }
    set priority(newPriority) { this.#priority = newPriority; }

    get todoList() { return this.#todoList; }

    addTodo(name, description, dueDate, priority, notes) {
	const addedTodo = new Todo(name, description, dueDate, priority, notes);
	this.#todoList.push(addedTodo);
    }

}

export default Project;
