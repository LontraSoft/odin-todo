// Higher priority values are given greater importance
class Priority {
    constructor(name, priorityLevel) {
	this.name = name;
	this.priorityLevel = priorityLevel;
    }

    static LOWEST = Object.freeze(new Priority('Lowest', 0));
    static LOW = Object.freeze(new Priority('Low', 5));
    static MEDIUM = Object.freeze(new Priority('Medium', 10));
    static HIGH = Object.freeze(new Priority('High', 15));
    static HIGHEST = Object.freeze(new Priority('Highest', 20));
}

export default Priority;
