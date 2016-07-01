import express = require("express");
import path = require("path");
import mongoose = require('mongoose');
import bodyParser = require('body-parser');

import {tasksRouter} from './Routes/tasks';
import {projectsRouter} from './Routes/projects';

//noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
let parent = path.dirname(__dirname);

export interface AppConfig {
    port: number,
    dbDest: string,
    mongoOptions: any
}

export class App {
    private app;

    constructor(private config:AppConfig) {
        mongoose.connect(config.dbDest, config.mongoOptions);
        let app = this.app = express();
        //noinspection TypeScriptUnresolvedFunction
        app.use(express.static(parent + "/public"));

        this
            .useBodyParser()
            .useRoutes();

        app.get('*', function (req, res) {
            res.sendFile(parent + '/public/index.html');
        });


    }

    useRoutes() {
        this.app.use("/api/tasks", tasksRouter);
        this.app.use("/api/projects", projectsRouter)
    }

    private useBodyParser():App {
        let app = this.app;
        //noinspection TypeScriptUnresolvedFunction
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json());
        return this;
    };

    start():App {
        let server = this.app.listen(this.config.port, ()=> {
            let host = server.address().address;
            let port = server.address().port;
            console.log("Example app listening at http://%s:%s", host, port)
        });
        return this.app;
    }
}