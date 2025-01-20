import '../css/index.css'
import Priority from './priority';
import Project from './project';
import {Todo, TodoChecklistItem} from './todo';
import HtmlManager from './html_manager';
import ProjectManager from './project_manager';

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

