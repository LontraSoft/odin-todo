import Priority from './priority'
import Todo from './todo'

class Project {
    #id
    #name;
    #priority;
    #todoList = [];

    static #nextId = 0;

    static #checkoutId() {
	const id = this.#nextId;
	this.#nextId += 1;
	return id;
    }

    loadTodoList(...todos) {
	for (let todo of todos) {
	    if (todo instanceof Todo) {
		this.#todoList.push(todo);
	    }
	}
    }
    
    constructor(name, priority = Priority.MEDIUM, ...todos) {
	this.#id = Project.#checkoutId();
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

    addTodo(todo) {
	this.#todoList.push(todo);
    }

}

export default Project;
