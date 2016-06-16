import {TaskService} from "../Services/TasksService";
import {CrudService} from "../Services/CrudService";
import {Model} from "mongoose";
import {Request, Response} from "express";

export class TasksAdapter {

    static getProjectTasks(req:Request, res:Response, next) {
        TaskService.getProjectTasks( req.params.id, (err, tasks)=> {
            if (err) return next(err);
            res.json(tasks);
        });
    }

    static getCurrentTasks(req:Request, res:Response, next) {
        TaskService.getCurrentTasks( req.params.id, (err, tasks)=> {
            if (err) return next(err);
            res.json(tasks);
        });
    }

    static getBlockedTasks(req:Request, res:Response, next) {
        TaskService.getBlockedTasks( req.params.id, (err, tasks)=> {
            if (err) return next(err);
            res.json(tasks);
        });
    }

    static getTodoTasks(req:Request, res:Response, next) {
        TaskService.getTodoTasks( req.params.id, (err, tasks)=> {
            if (err) return next(err);
            res.json(tasks);
        });
    }

    static getDoingTasks(req:Request, res:Response, next) {
        TaskService.getDoingTasks( req.params.id, (err, tasks)=> {
            if (err) return next(err);
            res.json(tasks);
        });
    }

    static getDoneTasks(req:Request, res:Response, next) {
        TaskService.getDoneTasks( req.params.id, (err, tasks)=> {
            if (err) return next(err);
            res.json(tasks);
        });
    }

    static getProjectTasksStatusSummary(req:Request, res:Response, next) {
        TaskService.getProjectTasksStatusSummary( req.params.id, (err, projectTasksStatusSummary)=> {
            if (err) return next(err);
            res.json(projectTasksStatusSummary);
        });
    }

    static getPredecessorSuggestions(req:Request, res:Response, next) {
        TaskService.getPredecessorSuggestions( req.params.id, (suggestions)=> {
            res.json(suggestions);
        })
    }

    static getTaskPredecessors(req:Request, res:Response, next) {
        let taskId = req.params.id;
        TaskService.getTaskPredecessors(taskId, (err, predecessors)=> {
            if (err) {
                return next(err);
            }
            res.json(predecessors);
        }, next);
    }

    static deleteTask(req:Request, res:Response, next) {
        let taskId = req.params.id;
        TaskService.deleteTask(taskId, (err)=> {
            if (err) {
                return next(err);
            }
            res.json(taskId);
        }, next);
    }

    static getGraphData(req:Request, res:Response, next) {
        let projectId = req.params.id;
        TaskService.getGraphData(projectId, (graphData)=> {
            res.json(graphData);
        }, next);
    }

}