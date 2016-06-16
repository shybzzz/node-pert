import {Component, ViewChild, AfterViewInit, OnInit, ElementRef, Input} from "@angular/core"

@Component({
    selector: "vis-network",
    templateUrl: "VisNetwork.html"
})

export class VisNetwork implements AfterViewInit, OnInit {
    @ViewChild("holder") holder:ElementRef;
    @Input() nodes:any[] = [];
    @Input() edges:any[] = [];
    @Input() options = {};

    //noinspection TypeScriptUnresolvedVariable
    data = {
        nodes: new vis.DataSet(),
        edges: new vis.DataSet()
    };
    network:any;

    ngOnInit() {
        this.refreshData();
    }

    ngAfterViewInit():any {
        //noinspection TypeScriptUnresolvedVariable
        this.network = new vis.Network(this.holder.nativeElement, this.data, this.options);
    }

    refresh(data) {
        this.nodes = data.nodes;
        this.edges = data.edges;
        this.refreshData();
    };

    refreshData() {
        VisNetwork.refreshDataSet(this.data.edges, this.edges);
        VisNetwork.refreshDataSet(this.data.nodes, this.nodes);
    };

    private static refreshDataSet(dataSet, data) {
        dataSet.clear();
        data && dataSet.add(data);
    };

}