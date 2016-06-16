import {Component} from "@angular/core";
import {CrudService} from "../Services/CrudService";
import {ROUTES} from "../routes";
import {RouteParams, Router} from "@angular/router-deprecated";
import {TasksService} from "../Services/TasksService";
import {TaskRow} from "./task.row";
import 'rxjs/Rx';
import {TasksOperator} from "../../shared/tasks.operator";
import {ProjectOperator} from "../../shared/project.operator";
import {TaskDuration} from "../Pipes/task.duration";
import {ProjectOperator} from "../../shared/project.operator";

var projectsUrl = ROUTES.api.projects;

@Component({
    selector: "project-tasks",
    templateUrl: "project.tasks.html",
    directives: [ TaskRow],
    pipes: [TaskDuration]
})

export class ProjectTasks {


    tasks:any[];
    project:any;
    projectId:string;

    ngOnInit():any {
        var projectId = this.projectId = this.routeParams.get('id');
        this.crud.getEntityById(projectsUrl, projectId).subscribe((project)=> {
            this.project = project;
        });
        this.tasksService.getProjectTasks(projectId).subscribe((tasks)=> {
            this.tasks = tasks.map(TasksOperator.sortTaskWork);
        });
    }

    constructor(private crud:CrudService,
                private tasksService:TasksService,
                private routeParams:RouteParams,
                private router:Router) {
    }

    navigateToProjects() {
        this.router.navigate(['Projects']);
    }

    private tasksUrl() {
        return projectsUrl + this.project._id + "/tasks/";
    }

    addNew() {
        var projectId = this.project._id;
        this.crud.addEntity(this.tasksUrl(), TasksOperator.getEmptyTask(projectId)).subscribe((t)=> {
            this.tasks.push(t)
        })
    }

    removeTask(task) {
        var tasks = this.tasks;
        var index = tasks.indexOf(task);
        index > -1 && tasks.splice(index, 1);
    }

    getStartedTasks() {
        return ProjectOperator.getStartedTasks(this.tasks);
    }

    getNewTasks() {
        return ProjectOperator.getNewTasks(this.tasks);
    }

    getPendingTasks() {
        return ProjectOperator.getPendingTasks(this.tasks);
    }

    getCompletedTasks() {
        return ProjectOperator.getCompletedTasks(this.tasks);
    }

    getTotalEfforts() {
        return ProjectOperator.getTotalEfforts(this.tasks);
    }


    getPredecessorSuggestions(task) {
        return ProjectOperator.getPredecessorSuggestions(task, this.tasks);
    }

}