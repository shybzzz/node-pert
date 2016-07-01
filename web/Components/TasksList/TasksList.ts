import {Component, OnInit} from "@angular/core"
import {RouteParams} from "@angular/router-deprecated";
import {TasksStatusColors} from '../../AppConstants'
import {TasksService} from "../../Services/TasksService";
import {CrudService} from "../../Services/CrudService";
import {ROUTES} from "../../routes";
import {ProjectOperator} from "../../../shared/project.operator";
import {TasksOperator} from "../../../shared/tasks.operator";

var projectsUrl = ROUTES.api.projects;

@Component({
    select: "tasks-list",
    templateUrl: "TasksList.html"
})
export class TasksList implements OnInit {
    projectId;
    isAddingTask:boolean = false;
    tasks:any[];
    project;
    private updatedTasks = {};

    ngOnInit():any {
        this.projectId = this.routeParams.get("id");
        this.crud.safeGateEntityById(projectsUrl, this.projectId).then((project)=> {
            this.project = project;
        });
        this.tasksService.safeGetProjectTasks(this.projectId).then(tasks=> {
            this.tasks = tasks;
        })
    }

    constructor(private crud:CrudService,
                private tasksService:TasksService,
                private routeParams:RouteParams) {

    }

    addTask() {
        this.isAddingTask = true;
    }

    getTaskColor(task) {
        return ProjectOperator.isTaskBlocked(this.tasks, task) ? TasksStatusColors.blocked
            : TasksOperator.isTaskNew(task) ? TasksStatusColors.new
            : TasksOperator.isTaskStarted(task) ? TasksStatusColors.started
            : TasksOperator.isTaskPending(task) ? TasksStatusColors.pending
            : TasksOperator.isTaskCompleted(task) ? TasksStatusColors.completed
            : ""
    }

    taskIsUpdated(task) {
        this.updatedTasks[task._id] = true;
    }

    deleteTask(task) {

    }
}