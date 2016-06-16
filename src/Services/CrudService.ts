import {Model} from "mongoose";
import {Request, Response} from "express";

export class CrudService {

    static create(model:Model, body, done) {
        model.create(body, done);
    }

    static getAll(model:Model, done) {
        model.find(done);
    }

    static getById(model:Model, id:string, done) {
        model.findById(id, done);
    }

    static updateById(model:Model, body, id:string, done?) {
        model.findByIdAndUpdate(id, body, done);
    }

    static deleteById(model:Model, id:string, done) {
        model.findByIdAndRemove(id, done);
    }

}