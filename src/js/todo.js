import Priority from './priority';

class TodoChecklistItem {
    constructor(description, isCompleted = false) {
	this.description = description;
	this.isCompleted = isCompleted;
    }
}

class Todo {
    #name;
    #description;
    #dueDate;
    #priority;
    #notes;
    #checklist;

    constructor(name,
		description = "",
		dueDate = new Date() + 1,
		priority = Priority.MEDIUM,
		notes = "")
    {
	this.#name = name;
	this.#description = description;
	this.#dueDate = dueDate;
	this.#priority = priority;
	this.#notes = notes;
	this.#checklist = [];
    }

    get name() { return this.#name; }
    set name(newName) { this.#name = newName; }

    get description() { return this.#description; }
    set description(newDescription) { this.#description = newDescription; }

    get dueDate() { return this.#dueDate; }
    set dueDate(newDueDate) { this.#dueDate = newDueDate; }

    get priority() { return this.#priority; }
    set priority(newPriority) {
	if (!newPriority instanceof Priority) {
	    throw "Attempted to assign invalid priority"
	}
	this.#priority = newPriority;
    }

    get notes() { return this.#notes }
    set notes(newNotes) { this.#notes = newNotes; }

    get checklist() {
	return this.#checklist;
    }

    hasChecklist() {
	return !this.#checklist.isEmpty();
    }

    addChecklistItem(description, isCompleted = false) {
	this.#checklist.addChecklistItem(description, isCompleted);
    }

        addChecklistItem(description, isCompleted = false) {
	this.#checklist.push(new TodoChecklistItem(description, isCompleted));
	return this;
    }

    removeChecklistItem(indexOfRemovedItem) {
	this.#checklist.splice(indexOfRemovedItem, 1);
    }

    resetChecklist() {
	this.#checklist.splice(0, this.#checklist.length);
    }

    toJSON() {
	return {
	    name: this.#name,
	    description: this.#description,
	    dueDate: this.#dueDate,
	    priority: this.#priority,
	    notes: this.#notes,
	    checklist: this.#checklist,
	};
    }
}

export default Todo;
