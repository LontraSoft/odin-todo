import '../css/index.css'
import Priority from './priority';
import Project from './project';
import {Todo, TodoChecklistItem} from './todo';
import HtmlManager from './html_manager';
import ProjectManager from './project_manager';
import TodoEventHandler from './todo-event-handler';
import * as HTML_CONSTANTS from './html_constants';

let projectManager = new ProjectManager();
let htmlManager = new HtmlManager(window, document);
let todoEventHandler = new TodoEventHandler(window, document, htmlManager, projectManager);

function createExampleProject() {
    let exampleProject = new Project('Example Project');
    let exampleTodo1 = new Todo('Todo 1');
    let exampleTodo2 = new Todo('Todo 2');
    let exampleTodoChecklistItem1 = new TodoChecklistItem('Checklist Item 1');
    let exampleTodoChecklistItem2 = new TodoChecklistItem('Checklist Item 2', true);

    exampleTodo1.addChecklistItem(exampleTodoChecklistItem1);
    exampleTodo1.addChecklistItem(exampleTodoChecklistItem2);
    
    exampleProject.name = 'Example Project';
    exampleProject.addTodo(exampleTodo1);
    exampleProject.addTodo(exampleTodo2);

    return exampleProject;
}

function saveTestingEnvironment() {
    let testProjectManager = new ProjectManager();

    let testProject1 = createExampleProject();
    let testProject2 = createExampleProject();
    let testProject3 = createExampleProject();
    let testProject4 = createExampleProject();

    testProject1.name = 'Test Project 1';
    testProject2.name = 'Test Project 2';
    testProject3.name = 'Test Project 3';
    testProject4.name = 'Test Project 4';

    testProject1.priority = Priority.LOWEST;
    testProject2.priority = Priority.MEDIUM;
    testProject3.priority = Priority.HIGH;
    testProject4.priority = Priority.HIGHEST;

    testProjectManager.addProject(testProject4);
    testProjectManager.addProject(testProject3);
    testProjectManager.addProject(testProject2);
    testProjectManager.addProject(testProject1);

    testProjectManager.saveProjects();
}

function loadProjects() {
    projectManager.loadProjects();

    let projects = projectManager.getProjects();
    
    htmlManager.loadProjects(projects);
}

saveTestingEnvironment();
loadProjects();
