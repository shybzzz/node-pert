import {Injectable} from '@angular/core';
import {CrudService} from "./CrudService";
import {Http} from "@angular/http";
import {ROUTES} from "../routes";
import {Observable} from "rxjs";
import 'rxjs/add/operator/toPromise';
import {BaseService} from "./BaseService";

var projectsUrl = ROUTES.api.projects;
var tasksUrl = ROUTES.api.tasks;

@Injectable()
export class ProjectsService extends BaseService{
    constructor(private crud:CrudService, private http:Http) {
    }

    getTotalEfforts(project){
        return this.http.get(projectsUrl+"totalEfforts/" + project._id)
            .toPromise()
            .then(resp=> resp.json())
            .catch(this.handleError);
    }
}