import {Component, Input, ViewChild, AfterViewInit} from "@angular/core"
import {VisNetwork} from "./../VisNetwork";
import {TasksService} from "../../Services/TasksService";

@Component({
    selector: "tasks-graph",
    templateUrl: "TasksGraph.html",
    directives: [VisNetwork]
})
export class TasksGraph implements AfterViewInit {
    @Input() projectId;
    @Input() options = {};
    @ViewChild(VisNetwork) visNetwork;


    constructor(private tasksService:TasksService) {
    }

    ngAfterViewInit():any {
        this.refresh();
    }

    refresh() {
        this.tasksService.getTasksGraphData(this.projectId).then(data=> {
            this.visNetwork.refresh(data);
        });

    }
}