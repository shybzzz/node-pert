import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {CrudService} from "../Services/CrudService";
import {TasksService} from "../Services/TasksService";
import {ROUTES} from "../routes";
import {TasksOperator} from "../../shared/tasks.operator";
import {TaskDuration} from "../Pipes/task.duration";
import {TasksOperator} from "../../shared/tasks.operator";
import {PredecessorsList} from "./predecessors.list";

var projectsUrl = ROUTES.api.projects;

@Component({
    selector: "pert-task-row",
    templateUrl: "task.row.html",
    pipes: [TaskDuration],
    directives: [PredecessorsList]
})

export class TaskRow implements OnInit {

    @Input()
    task:any;

    @Input()
    title:any;

    @Output()
    onTaskRemoved:EventEmitter<any> = new EventEmitter();

    private tasksUrl() {
        return projectsUrl + this.task.projectId + "/tasks/";
    }

    constructor(private crud:CrudService,
                private tasksService:TasksService) {
    }

    ngOnInit():any {
    }

    saveTask(task?:any) {
        this.tasksService.saveTask(task || this.task);
    }

    deleteTask() {
        var task = this.task;
        this.crud.deleteEntity(this.tasksUrl(), task).subscribe(()=> {
            this.onTaskRemoved.emit(task);
        });
    }

    isTaskNew() {
        return TasksOperator.isTaskNew(this.task);
    }

    isTaskStarted() {
        return TasksOperator.isTaskStarted(this.task);
    }

    isTaskPending() {
        return TasksOperator.isTaskPending(this.task);
    }


    isTaskCompleted() {
        return TasksOperator.isTaskCompleted(this.task);
    }

    completeTask() {
        TasksOperator.completeTask(this.task);
        this.saveTask();
    }

    isWorkStarted() {
        return TasksOperator.isWorkStarted(this.task);
    };

    startWork() {
        TasksOperator.startWork(this.task);
        this.saveTask();
    }

    isWorking() {
        return TasksOperator.isWorking(this.task);
    }

    pauseWork() {
        TasksOperator.pauseWork(this.task);
        this.saveTask();
    }

    getDuration() {
        return TasksOperator.getDuration(this.task);
    }

    canCompleteTask() {
        return TasksOperator.canCompleteTask(this.task);
    }

    restartTask() {
        TasksOperator.restartTask(this.task);
        this.saveTask();
    }

    canStartWork() {
        return TasksOperator.canStartWork(this.task);
    }

    canPendWork() {
        return TasksOperator.canPendWork(this.task);
    }


}