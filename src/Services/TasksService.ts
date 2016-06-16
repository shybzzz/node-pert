import {projectsRepository, tasksRepository} from "../Repositories"
import {ProjectOperator} from "../../shared/project.operator";
import {TasksOperator} from "../../shared/tasks.operator";
import {CrudService} from "./CrudService";

export class TaskService {

    static getProjectTasks(projectId, done) {
        tasksRepository.find({
            projectId: projectId,
        }, done);
    }

    static getCurrentTasks(projectId, done) {
        TaskService.getProjectTasks(projectId,
            (err, tasks)=>done(err, ProjectOperator
                .getStartedTasks(tasks)
                .map(TasksOperator.sortTaskWork)
            ));
    }

    static getBlockedTasks(projectId, done) {
        TaskService.getProjectTasks(projectId,
            (err, tasks)=>done(err, ProjectOperator
                .getBlockedTasks(tasks)
                .map(TasksOperator.sortTaskWork)
            ));
    }

    static getTodoTasks(projectId, done) {
        TaskService.getProjectTasks(projectId,
            (err, tasks)=>done(err, ProjectOperator
                .getNewTasks(tasks)
                .map(TasksOperator.sortTaskWork)
            ));
    }

    static getDoingTasks(projectId, done) {
        TaskService.getProjectTasks(projectId,
            (err, tasks)=>done(err, ProjectOperator
                .getPendingTasks(tasks)
                .map(TasksOperator.sortTaskWork)
            ));
    }

    static getDoneTasks(projectId, done) {
        TaskService.getProjectTasks(projectId,
            (err, tasks)=>done(err, ProjectOperator
                .getCompletedTasks(tasks)
                .map(TasksOperator.sortTaskWork)
            ));
    }

    static getProjectTasksStatusSummary(projectId, done) {
        TaskService.getProjectTasks(projectId,
            (err, tasks)=>done(err, ProjectOperator
                .getProjectTasksStatusSummary(tasks)
            ));
    }

    static getPredecessorSuggestions(taskId, done) {
        TaskService.getSameProjectTasks(taskId, (task, tasks)=>done(ProjectOperator.getPredecessorSuggestions(task, tasks)))
    }

    static getSameProjectTasks(taskId, done) {
        tasksRepository.findById(taskId, (err, task:any)=>TaskService.getProjectTasks(task.projectId, (err, tasks)=>done(task, tasks)));
    }

    static getTaskPredecessors(taskId, done, next) {
        tasksRepository.findById(taskId, (err, task:any)=> {
            if (err) {
                return next(err);
            }
            tasksRepository.find({
                '_id': {
                    $in: task.predecessors
                }
            }, done)
        })
    }

    static deleteTask(taskId, done, next) {


        tasksRepository.findById(taskId, (err, task:any)=> {
            if (err) {
                return next(err);
            }

            TaskService.getProjectTasks(task.projectId, (err, tasks)=> {
                let started = 0;
                let completed = 0;
                if (err) {
                    return next(err);
                }
                tasks.forEach((t)=> {
                    let predecessors = t.predecessors;
                    let ind = predecessors.indexOf(taskId);
                    if (ind > -1) {
                        predecessors.splice(ind, 1);
                    }
                    let successors = t.successors;
                    let ind = successors.indexOf(taskId);
                    if (ind > -1) {
                        successors.splice(ind, 1);
                    }

                    started++;
                    CrudService.updateById(tasksRepository, t, t._id, ()=> {
                        completed++;
                        if (started == completed) {
                            CrudService.deleteById(tasksRepository, taskId, (err)=> {
                                if (err) {
                                    return next(err);
                                }
                                done();
                            })
                        }
                    });

                })
            });


        })
    }

    static getGraphData(projectId, done, next){
        TaskService.getProjectTasks(projectId, (err, tasks)=>{
            if(err){
                console.log("service", err, projectId);
                return next(err)
            }

            done(TasksOperator.getTasksGraphData(tasks));
        })
    }


}
