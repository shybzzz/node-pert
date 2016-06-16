import {Component, OnInit, Input, DoCheck} from "@angular/core"
import {UIChart} from 'primeng/primeng';
import {TasksService} from "../Services/TasksService";
import {TasksStatusColors} from "../AppConstants";

@Component({
    selector: "tasks-status-pie",
    templateUrl: "tasks.status.pie.html",
    directives: [UIChart]
})

export class TaskStatusPie implements OnInit, DoCheck {

    projectTasksStatusSummary;
    pieData;
    @Input() projectId;

    constructor(private tasksService:TasksService) {

    }

    ngDoCheck():any {
        //this.projectTasksStatusSummary && this.refreshPieData();
    }

    ngOnInit():any {
        this.refreshProjectTasksStatusSummary();
    }

    refreshProjectTasksStatusSummary() {
        this.tasksService.getProjectTasksStatusSummary(this.projectId).then((projectTasksStatusSummary)=> {
            this.projectTasksStatusSummary = projectTasksStatusSummary;
            this.refreshPieData();
        })
    };

    private refreshPieData() {
        let projectTasksStatusSummary = this.projectTasksStatusSummary;
        this.pieData = {
            labels: [
                "Blocked",
                'New',
                'Started',
                'Pending',
                'Completed',
                'Unknown'
            ],
            datasets: [
                {
                    data: [
                        projectTasksStatusSummary.blocked,
                        projectTasksStatusSummary.new,
                        projectTasksStatusSummary.started,
                        projectTasksStatusSummary.pending,
                        projectTasksStatusSummary.completed,
                        projectTasksStatusSummary.unknown,
                    ],
                    backgroundColor: [
                        TasksStatusColors.blocked,
                        TasksStatusColors.new,
                        TasksStatusColors.started,
                        TasksStatusColors.pending,
                        TasksStatusColors.completed
                    ]
                }]
        };
        return projectTasksStatusSummary;
    };

}