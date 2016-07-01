import {Component, OnInit} from "@angular/core"
import {RouteParams, Router} from "@angular/router-deprecated";
import {TasksService} from "../../Services/TasksService";
import {StickySet} from "./sticky.set";

@Component({
    selector: "project-kanban",
    templateUrl: "project.kanban.html",
    directives: [StickySet]
})

export class ProjectKanban implements OnInit {

    projectId:string;
    currentTasks:any[];
    blockedTasks:any[];
    todoTasks:any[];
    doingTasks:any[];
    doneTasks:any[];

    ngOnInit():any {
        this.projectId = this.routeParams.get('id');
        this.refresh();
    }

    refresh() {
        this.refreshCurrentTasks();
        this.refreshBlockedTasks();
        this.refreshTodoTasks();
        this.refreshDoingTasks();
        this.refreshDoneTasks();
    }

    refreshCurrentTasks() {
        this.tasksService.getCurrentTasks(this.projectId).then((tasks)=> {
            this.currentTasks = tasks;
        });
    }

    refreshBlockedTasks() {
        this.tasksService.getBlockedTasks(this.projectId).then((tasks)=> {
            this.blockedTasks = tasks;
        });
    }

    refreshTodoTasks() {
        this.tasksService.getTodoTasks(this.projectId).then((tasks)=> {
            this.todoTasks = tasks;
        });
    }

    refreshDoingTasks() {
        this.tasksService.getDoingTasks(this.projectId).then((tasks)=> {
            this.doingTasks = tasks;
        });
    }

    refreshDoneTasks() {
        this.tasksService.getDoneTasks(this.projectId).then((tasks)=> {
            this.doneTasks = tasks;
        });
    }

    constructor(private routeParams:RouteParams,
                private tasksService:TasksService) {
    }
}