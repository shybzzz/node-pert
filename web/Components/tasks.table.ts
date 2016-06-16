import {Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList} from "@angular/core"
import {CrudService} from "../Services/CrudService";
import {TasksService} from "../Services/TasksService";

import {TasksOperator} from "../../shared/tasks.operator";
import {ProjectOperator} from "../../shared/project.operator";

import {ROUTES} from "../routes";
import {RouteParams, Router} from "@angular/router-deprecated";
import {TaskStatusPie} from "./tasks.status.pie";
import {TasksStatusColors} from '../AppConstants'
import {PredecessorsList} from "./predecessors.list";
import {TasksGraph} from "./TasksGraph";

var projectsUrl = ROUTES.api.projects;
@Component({
    selector: "tasks-table",
    templateUrl: "tasks.table.html",
    directives: [TaskStatusPie, PredecessorsList, TasksGraph]
})

export class TasksTable implements OnInit, AfterViewInit {
    projectId:string;
    tasks:any[];
    project:any;
    @ViewChild(TaskStatusPie) statusPie:TaskStatusPie;
    @ViewChild(TasksGraph) taskGraph:TasksGraph;
    @ViewChildren(PredecessorsList) predecessorsLists:QueryList<PredecessorsList>;

    constructor(private crud:CrudService,
                private tasksService:TasksService,
                private routeParams:RouteParams,
                private router:Router) {
    }

    ngAfterViewInit():any {
        this.refreshTasks();
    }
    ngOnInit():any {
        this.projectId = this.routeParams.get('id');
        this.refreshProject();
    }

    refreshTasks() {
        this.tasksService.getProjectTasks(this.projectId).subscribe(tasks=> {
            this.tasks = tasks;
            this.refreshPie();
            this.taskGraph.refresh();
            this.predecessorsLists.toArray().forEach((p)=>p.refresh());
        });
    };

    refreshPie() {
        this.statusPie.refreshProjectTasksStatusSummary();
    };

    private refreshProject() {
        this.crud.getEntityById(projectsUrl, this.projectId).subscribe((project)=> {
            this.project = project;
        });
    };

    getStatusStyle(task) {
        return {
            'border-left-color': ProjectOperator.isTaskBlocked(this.tasks, task) ? TasksStatusColors.blocked
                : TasksOperator.isTaskNew(task) ? TasksStatusColors.new
                : TasksOperator.isTaskStarted(task) ? TasksStatusColors.started
                : TasksOperator.isTaskPending(task) ? TasksStatusColors.pending
                : TasksOperator.isTaskCompleted(task) ? TasksStatusColors.completed
                : ""
        }

    }

    private tasksUrl() {
        return projectsUrl + this.project._id + "/tasks/";
    }

    addNew() {
        this.crud.addEntity(this.tasksUrl(), TasksOperator.getEmptyTask(this.project._id)).subscribe((t)=> {
            this.refreshTasks();
        });
    }

    deleteTask(task) {
        this.crud.deleteEntity(ROUTES.api.tasks, task).subscribe(()=> this.refreshTasks());
    }

    saveTask(task) {
        this.tasksService.saveTask(task).then(()=>this.taskGraph.refresh());

    }

    taskGraphOptions = {
        "height": "400px"
    }

}