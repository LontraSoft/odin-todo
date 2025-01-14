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
    
}

export default htmlHandler;
