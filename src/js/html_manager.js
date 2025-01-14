import * as HTML_CONSTANTS from './html_constants';
import HtmlGenerator from './html_generator';

class htmlHandler {
    #win;
    #doc;
    #htmlGenerator;
    #projectsContainer;
    
    constructor(win, doc) {
	this.#win = win;
	this.#doc = doc;
	this.#htmlGenerator = new HtmlGenerator(win, doc);
	this.#projectsContainer = this.#doc.querySelector(`#${HTML_CONSTANTS.PROJECTS_CONTAINER}`);
    }
    
    getProjectsContainer() {
	return this.#projectsContainer;
    }
    
    getProjectContainer(projectIndex) {
	if (!this.#isValidProjectIndex(projectIndex)) {
	    this.#win.console.error(`Attempted to get non-existant project container(Project Index ${projectIndex})`);
	}

	let projectsContainer = this.getProjectsContainer();
	
	return projectsContainer.children[projectIndex];
    }

}

export default htmlHandler;
