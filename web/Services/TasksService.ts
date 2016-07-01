import {Injectable} from '@angular/core';
import {CrudService} from "./CrudService";
import {Http} from "@angular/http";
import {ROUTES} from "../routes";
import {Observable} from "rxjs";
import 'rxjs/add/operator/toPromise';
import {BaseService} from "./BaseService";
import {TasksOperator} from "../../shared/tasks.operator";
import Promise = webdriver.promise.Promise;

var projectsUrl = ROUTES.api.projects;
var tasksUrl = ROUTES.api.tasks;

@Injectable()
export class TasksService extends BaseService {

    constructor(private crud:CrudService, private http:Http) {
    }

    getProjectTasks(projectId):Observable<any> {
        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(projectsUrl + projectId + "/tasks/")
            .map(res => res.json());
    }

    getCurrentTasks(projectId) {
        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(projectsUrl + projectId + "/currentTasks")
            .toPromise()
            .then(resp=> resp.json())
            .catch(this.handleError);
    }

    getBlockedTasks(projectId) {
        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(projectsUrl + projectId + "/blockedTasks")
            .toPromise()
            .then(resp=> resp.json())
            .catch(this.handleError);
    }

    getTodoTasks(projectId) {
        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(projectsUrl + projectId + "/todoTasks")
            .toPromise()
            .then(resp=> resp.json())
            .catch(this.handleError);
    }

    getDoingTasks(projectId) {
        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(projectsUrl + projectId + "/doingTasks")
            .toPromise()
            .then(resp=> resp.json())
            .catch(this.handleError);
    }

    getDoneTasks(projectId) {
        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(projectsUrl + projectId + "/doneTasks")
            .toPromise()
            .then(resp=> resp.json())
            .catch(this.handleError);
    }

    getProjectTasksStatusSummary(projectId) {
        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(projectsUrl + projectId + "/projectTasksStatusSummary")
            .toPromise()
            .then(resp=> resp.json())
            .catch(this.handleError);
    }

    getTaskPredecessors(task) {
        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(tasksUrl + task._id + "/predecessors")
            .toPromise()
            .then(resp=> resp.json())
            .catch(this.handleError);
    }

    getPredecessorSuggestions(task) {
        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(tasksUrl + task._id + "/predecessorSuggestions")
            .toPromise()
            .then(resp=> resp.json())
            .catch(this.handleError);
    }

    saveTask(task) {
        return this.crud.updateEntity(projectsUrl + task.projectId + "/tasks/", task).toPromise()
            .then(()=>task)
            .catch(this.handleError);
    }

    getTasksGraphData(projectId:any):any {
        //return this.getProjectTasks(projectId).toPromise().then(tasks=>TasksOperator.getTasksGraphData(tasks));
        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(projectsUrl + projectId + "/graphData")
            .toPromise()
            .then(r=>r.json())
            .catch(this.handleError);
    }

    safeGetProjectTasks(projectId:string):Promise {
        //noinspection TypeScriptUnresolvedFunction
        return this.getProjectTasks(projectId).toPromise();
    }
}
