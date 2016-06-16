import {TasksOperator} from "./tasks.operator";
import {TasksOperator} from "./tasks.operator";
export class ProjectOperator {

    static getStartedTasks(tasks) {
        return tasks && tasks.filter(TasksOperator.isTaskStarted)
    }

    static getBlockedTasks(tasks) {
        return tasks && tasks.filter(task=>ProjectOperator.isTaskBlocked(tasks, task));
    }

    static getNewTasks(tasks:any[]):any {
        return tasks && tasks.filter(TasksOperator.isTaskNew);
    }

    static getPendingTasks(tasks:any[]):any {
        return tasks && tasks.filter(TasksOperator.isTaskPending);
    }

    static getCompletedTasks(tasks:any[]):any {
        return tasks && tasks.filter(TasksOperator.isTaskCompleted);
    }

    static getProjectTasksStatusSummary(tasks:any[]):any {
        let projectTasksStatusSummary = {
            'blocked': 0,
            'new': 0,
            'started': 0,
            'pending': 0,
            'completed': 0,
            'unknown': 0
        };
        tasks && tasks.forEach(t=> {
            let add = ProjectOperator.isTaskBlocked(tasks, t) ? 'blocked'
                : TasksOperator.isTaskNew(t) ? 'new'
                : TasksOperator.isTaskStarted(t) ? 'started'
                : TasksOperator.isTaskPending(t) ? 'pending'
                : TasksOperator.isTaskCompleted(t) ? 'completed'
                : 'unknown';
            projectTasksStatusSummary[add]++;
        });
        return projectTasksStatusSummary;
    }

    static getTotalEfforts(tasks:any[]):any {
        var s = 0;
        tasks && tasks.forEach(t=> {
            s += TasksOperator.getDuration(t);
        });
        return s;
    }

    static getTaskPredecessors(tasks:any[], task:any) {
        let predecessors = task && task.predecessors;
        return predecessors ? predecessors.map((predecessorId)=>ProjectOperator.getTaskById(tasks, predecessorId)) : [];
    }

    static getTaskById(tasks:any[], taskId:any) {
        return tasks && tasks.filter(t=>t && t._id == taskId)[0];
    }

    static getPredecessorSuggestions(task:any, tasks:any[]) {
        return tasks && tasks.filter((t)=>!(
                t._id == task._id
                || TasksOperator.isTaskPredecessor(task, t)
                || ProjectOperator.isTaskSuccessor(task, t, tasks)
            ));
    }

    static isTaskSuccessor(task, possibleSuccessor, tasks) {
        return TasksOperator.isTaskSuccessor(task, possibleSuccessor)
            || ProjectOperator.getSuccessors(tasks, task).some((successor)=>ProjectOperator.isTaskSuccessor(successor, possibleSuccessor, tasks));

    }

    static getSuccessors(tasks, task) {
        return task && task.successors.map((successorId)=>ProjectOperator.getTaskById(tasks, successorId));
    }

    static getAllPredecessors(tasks:any[], task:any, predecessors?:any[]):any[] {
        let predecessors = predecessors || [];
        let taskPredecessors = ProjectOperator.getTaskPredecessors(tasks, task);
        taskPredecessors.forEach(predecessor=> {
            if (predecessor && predecessors.indexOf(predecessor) == -1) {
                predecessors.push(predecessor);
            }
            predecessors = ProjectOperator.getAllPredecessors(tasks, predecessor, predecessors);
        });
        return predecessors;
    }

    static isTaskBlocked(tasks:any[], task:any) {
        return task && ProjectOperator.getAllPredecessors(tasks, task).some(predecessor=>predecessor ? !predecessor.isCompleted : false);
    }

}
