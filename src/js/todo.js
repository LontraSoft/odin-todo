class TodoChecklistItem {
    constructor(description, isCompleted = false) {
	this.description = description;
	this.isCompleted = isCompleted;
    }
}

class TodoChecklist {
    #checklist;
    
    constructor() {
	this.#checklist = [];
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

    isEmpty() {
	return this.#checklist.length === 0;
    }
}
