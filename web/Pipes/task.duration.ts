import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: "taskDuration"})
export class TaskDuration implements PipeTransform {
    transform(duration:any):any {
        return duration < 36e5 ? Math.round(duration / 6e4) + " min" : Math.round(duration / 36e3) / 100 + " h";
    }

}