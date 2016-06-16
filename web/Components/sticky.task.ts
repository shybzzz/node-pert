import {Component, Input} from "@angular/core"
import {TasksOperator} from "../../shared/tasks.operator";
import {TaskDuration} from "../Pipes/task.duration";
import {ShortenString} from "../Pipes/shorten.string";

@Component({
    selector: "sticky-task",
    templateUrl: "sticky.task.html",
    pipes: [TaskDuration, ShortenString]
})
export class StickyTask {

    @Input() task:any;
    @Input() status:string;

    getDuration() {
        let task = this.task;
        return task && TasksOperator.getDuration(task);
    }
}