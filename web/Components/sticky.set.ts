import {Component, Input} from "@angular/core"
import {StickyTask} from "./sticky.task";

@Component({
    selector: "sticky-set",
    templateUrl: "sticky.set.html",
    directives: [StickyTask]
})
export class StickySet{
    @Input() title: string;
    @Input() status: string;
    @Input() tasks: any[];
}