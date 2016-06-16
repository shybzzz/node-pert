import {App} from "./app"

let app = new App({
    port: 80,
    dbDest: 'mongodb://localhost/pert',
    mongoOptions: {
        server: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}},
        replset: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}}
    }
}).start();
