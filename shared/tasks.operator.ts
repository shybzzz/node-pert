export class TasksOperator {

    static sortTaskWork(task) {
        var workItems = task.workItems;
        workItems.forEach((w:any)=> {
            if (w.started) {
                w.started = new Date(w.started);
            }

            if (w.finished) {
                w.finished = new Date(w.finished);
            }
        });
        task.workItems = workItems.sort((w1, w2)=> {
            var started1 = w1.started;
            var started2 = w2.started;
            return started1 < started2 ? 1 : started1 == started2 ? 0 : -1;
        });
        return task;
    }

    static getEmptyTask(projectId) {
        return {
            projectId: projectId,
            name: "",
            duration: 0
        }
    }

    static getLastWork(task) {
        return task.workItems[0];
    }

    static isTaskNew(task) {
        return !task.isCompleted && !TasksOperator.getLastWork(task);
    }

    static isTaskStarted(task) {
        var lastWork = TasksOperator.getLastWork(task);
        return !task.isCompleted && lastWork && !lastWork.finished;
    }

    static isTaskPending(task) {
        var lastWork = TasksOperator.getLastWork(task);
        return !task.isCompleted && lastWork && !!lastWork.finished
    }

    static isTaskCompleted(task) {
        return !!task.isCompleted;
    }

    static startWork(task) {
        var workItem = {
            started: new Date()
        };
        task.workItems.unshift(workItem);
    }

    static completeTask(task) {
        task.isCompleted = true;
        TasksOperator.getLastWork(task).finished = new Date();
    }

    static isWorkStarted(task) {
        var lastWork = TasksOperator.getLastWork(task);
        return lastWork && !!lastWork.started && !lastWork.finished;
    };

    static isWorking(task) {
        var lastWork = TasksOperator.getLastWork(task);
        return lastWork && lastWork.started;
    }

    static pauseWork(task) {
        TasksOperator.getLastWork(task).finished = new Date();
    }

    static getDuration(task) {
        let d = 0;
        task.workItems.map(w=> {
            var finished = w.finished;
            var started = w.started;
            if (finished && started)
                d += Math.abs(new Date(finished) - new Date(started));
        });
        return d;
    }

    static canCompleteTask(task) {
        return !TasksOperator.isTaskCompleted(task) && (TasksOperator.isTaskPending(task) || TasksOperator.isWorkStarted(task))
    }

    static restartTask(task) {
        task.isCompleted = false;
    }

    static  canStartWork(task) {
        return !TasksOperator.isWorkStarted(task) && !TasksOperator.isTaskCompleted(task);
    }

    static  canPendWork(task) {
        return TasksOperator.isWorkStarted(task) && !TasksOperator.isTaskCompleted(task);
    }

    static addPredecessor(task, predecessor) {
        let predecessorId = predecessor._id;
        let predecessors = task.predecessors;
        let taskId = task._id;
        let successors = predecessor.successors;
        predecessors.indexOf(predecessorId) == -1 && predecessors.push(predecessorId);
        successors.indexOf(taskId) == -1 && successors.push(taskId);

    }

    static removePredecessor(task, predecessor) {
        let predecessors = task.predecessors;
        let predecessorInd = predecessors.indexOf(predecessor._id);
        let successors = predecessor.successors;
        let taskInd = successors.indexOf(task._id);
        predecessorInd > -1 && predecessors.splice(predecessorInd, 1);
        taskInd > -1 && successors.splice(taskInd, 1);
    }

    static isTaskSuccessor(task, possibleSuccessor) {
        return task.successors.indexOf(possibleSuccessor._id) > -1;
    }

    static isTaskPredecessor(task, possibleSuccessor) {
        return task.predecessors.indexOf(possibleSuccessor._id) > -1;
    }

    static getTasksGraphData(tasks:any[]):any {
        let nodes = [];
        let edges = [];
        tasks && tasks.forEach(t=> {
            let taskId = t._id;
            nodes.push({
                id: taskId,
                label: t.name
            });

            t.predecessors.forEach(predecessorId=>edges.push({from: predecessorId, to: taskId}));
        });
        return {
            nodes: nodes,
            edges: edges
        }
    }
}