import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router-deprecated";
import {CrudService} from "../Services/CrudService";
import {ROUTES} from "../routes";

var projectsUrl = ROUTES.api.projects;

@Component({
    selector: "projects",
    templateUrl: "pert.projects.html"
})

export class PertProjects implements OnInit {
    projects:any[];

    ngOnInit():any {
        this.crud.getAllEntities(projectsUrl).subscribe((projects)=> {
            this.projects = projects;
        });
    }

    constructor(private _router:Router, private crud:CrudService) {
    }

    navigateToDashboard() {
        this._router.navigate(["Dashboard"]);
    }

    addProject() {
        var name = "Project " + (this.projects.length + 1);
        this.crud.addEntity(projectsUrl, {
            name: name,
            description: name + " description"
        }).subscribe((project)=> {
            this.editProject(project);
        })
    }

    editProject(project) {
        this._router.navigate(["EditProject", {id: project._id}]);
    }

    removeProject(project) {
        this.crud.deleteEntity(projectsUrl, project).subscribe(()=> {
            var projects = this.projects;
            var index = projects.indexOf(project);
            index > -1 && projects.splice(index, 1);
        })
    }

    goToProjectTasks(project){
        this._router.navigate(["ProjectCanban", {id: project._id}])
    }
}