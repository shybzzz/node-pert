import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core"
import {TasksOperator} from "../../shared/tasks.operator";
import {TasksService} from "../Services/TasksService";
import {AutoComplete} from 'primeng/primeng';

@Component({
    selector: "predecessors-list",
    templateUrl: "predecessors.list.html",
    directives: [AutoComplete]
})
export class PredecessorsList implements OnInit {
    @Input() task:any;
    @Output() onChange:EventEmitter = new EventEmitter();
    predecessors = null;
    predecessorSuggestions = null;
    selectedPredecessor:any;
    filteredSuggestions = [];

    constructor(private tasksService:TasksService) {

    }

    ngOnInit():any {
        this.refresh();
    }

    saveTask(task?:any) {
        let task = task || this.task;
        return this.tasksService
            .saveTask(task)
            .then(()=>this.onChange.emit(task));
    }

    removePredecessor(predecessor) {
        TasksOperator.removePredecessor(this.task, predecessor);
        this.saveTask(predecessor).then(()=>this.saveAndRefresh());
    }

    querySuggestions($event) {
        let predecessorSuggestions = this.predecessorSuggestions;
        this.filteredSuggestions = predecessorSuggestions && predecessorSuggestions.filter(s=>s.name.toLowerCase().indexOf($event.query.toLowerCase()) > -1);
    }

    onPredecessorSelect(predecessor) {
        TasksOperator.addPredecessor(this.task, predecessor);
        this.saveTask(predecessor).then(()=>this.saveAndRefresh());
        this.selectedPredecessor = null;
    }

    refresh() {
        let task = this.task;
        let tasksService = this.tasksService;
        tasksService.getTaskPredecessors(task).then((predecessors)=> {
            this.predecessors = predecessors;
        });
        tasksService.getPredecessorSuggestions(task).then(predecessorSuggestions=> {
            this.predecessorSuggestions = predecessorSuggestions;
        })
    }

    saveAndRefresh() {
        this.tasksService.saveTask(this.task).then(()=>this.refresh());
    }

}