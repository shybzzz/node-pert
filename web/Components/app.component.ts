import 'rxjs/Rx';
import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {CrudService} from '../Services/CrudService'
import {TasksService} from '../Services/TasksService'
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {TasksService} from "../Services/TasksService";
import {ProjectsService} from "../Services/ProjectsService";
import {PertProjects} from "./pert.projects";
import {PertWidget} from "./pert.widget";
import {PertDashBoard} from "./pert.dashboard";
import {ProjectEditor} from "./project.editor";
import {ProjectTasks} from "./project.tasks";
import {ProjectKanban} from "./Kanban/project.kanban";
import {TasksTable} from "./tasks.table";
import {TasksList} from "./TasksList/TasksList";


@Component({
    selector: 'pert',
    templateUrl: 'app.component.html',
    providers: [CrudService, TasksService, ProjectsService, HTTP_PROVIDERS, ROUTER_PROVIDERS],
    directives: [ROUTER_DIRECTIVES, PertWidget, PertProjects, PertDashBoard, ProjectEditor, ProjectTasks]
})
@RouteConfig([
    {path: '/dashboard', component: PertDashBoard, name: "Dashboard", useAsDefault: true},
    {path: '/projects', component: PertProjects, name: "Projects"},
    {path: '/projects/:id', component: ProjectEditor, name: "EditProject"},
    {path: '/projects/:id/tasks/', component: ProjectTasks, name: "ProjectTasks"},
    {path: '/projects/:id/kanban/', component: ProjectKanban, name: "ProjectKanban"},
    {path: '/projects/:id/tasksTable/', component: TasksTable, name: "TasksTable"},
    {path: '/projects/:id/tasksList/', component: TasksList, name: "TasksList"}

])

export class AppComponent {

    constructor() {
    }

}