import {Component, OnInit} from "@angular/core";
import {CrudService} from "../Services/CrudService";
import {ROUTES} from "../routes";
import {RouteParams, Router} from "@angular/router-deprecated";

var projectsUrl = ROUTES.api.projects;

@Component({
    selector: "project-editor",
    templateUrl: "project.editor.html"
})

export class ProjectEditor implements OnInit {
    private project;

    ngOnInit():any {
        this.crud.getEntityById(projectsUrl, this.routeParams.get('id')).subscribe((project)=> {
            this.project = project;
        });
    }

    constructor(private crud:CrudService, private routeParams:RouteParams, private router:Router) {
    }

    navigateToProjects() {
        this.router.navigate(['Projects']);
    }

    save() {
        this.crud.updateEntity(projectsUrl, this.project).subscribe(()=> {
            this.navigateToProjects();
        });
    }
}