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
import {ProjectCanban} from "./project.canban";
import {TasksTable} from "./tasks.table";


@RouteConfig([
    {path: '/dashboard', component: PertDashBoard, as: "Dashboard", useAsDefault: true},
    {path: '/projects', component: PertProjects, as: "Projects"},
    {path: '/projects/:id', component: ProjectEditor, as: "EditProject"},
    {path: '/projects/:id/tasks/', component: ProjectTasks, as: "ProjectTasks"},
    {path: '/projects/:id/canban/', component: ProjectCanban, as: "ProjectCanban"},
    {path: '/projects/:id/tasksTable/', component: TasksTable, as: "TasksTable"}

])

@Component({
    selector: 'pert',
    templateUrl: 'app.component.html',
    providers: [CrudService, TasksService, ProjectsService, HTTP_PROVIDERS, ROUTER_PROVIDERS],
    directives: [ROUTER_DIRECTIVES, PertWidget, PertProjects, PertDashBoard, ProjectEditor, ProjectTasks]
})
export class AppComponent {

    constructor() {
    }

}