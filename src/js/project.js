import Priority from './priority'
import Todo from './todo'

class Project {
    #id;
    #name;
    #priority;
    #todoList;

    static #nextId = 0;

    static #checkoutId() {
	const id = this.#nextId;
	this.#nextId += 1;
	return id;
    }

    #isTodoIndexValid(todoIndex) {
	return todoIndex >= 0 && todoIndex < this.#todoList.length;
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

    addTodo(todo, index = this.#todoList.length) {
	let isIndexAtEnd = index === this.#todoList.length;
	if (isIndexAtEnd) {
	    this.#todoList.push(todo);
	    return;
	}
	if (!this.#isTodoIndexValid(index)) {
	    console.error(`Attempted to add todo at invalid index(Todo Index: ${index})`);
	}
	this.#todoList.splice(index, 0, todo);
    }

    removeTodo(todoIndex) {
	if (!this.#isTodoIndexValid(todoIndex)) {
	    console.error(`Attempted to remove non-existant Todo(Todo Index: ${todoIndex})`);
	}
	this.#todoList.splice(todoIndex, 1);
    }

    toJSON() {
	return {
	    id: this.#id,
	    name: this.#name,
	    priority: this.#priority,
	    todoList: this.#todoList,
	};
    }
}

export default Project;
