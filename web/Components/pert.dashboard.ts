import {Component} from "@angular/core";
import {Router} from "@angular/router-deprecated"
import {PertWidget} from "./pert.widget";

@Component({
    select: "dashboard",
    templateUrl: "pert.dashboard.html",
    directives: [PertWidget]
})

export class PertDashBoard {
    constructor(private _router:Router) {
    }

    navigateToProjects() {
        this._router.navigate(['/Projects']);
    }
}