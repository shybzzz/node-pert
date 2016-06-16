import {CrudService} from "../Services/CrudService";
import {Model} from "mongoose";
import {Request, Response} from "express";

function handleResponse(res:Response, next) {
    return (err, post)=> {
        if (err) return next(err);
        res.json(post);
    }
}

export class CrudAdapter {

    static create(model:Model) {
        return (req:Request, resp:Response, next)=>CrudService.create(model, req.body, handleResponse(resp, next));
    }

    static getAll(model:Model) {
        return (req:Request, res:Response, next)=>CrudService.getAll(model, handleResponse(res, next));
    }

    static getById(model:Model, id:string) {
        return (req:Request, res:Response, next)=> {
            CrudService.getById(model, req.params[id], handleResponse(res, next));
        }
    }

    static updateById(model:Model, id:string) {
        return (req:Request, res:Response, next)=> {
            CrudService.updateById(model, req.body, req.params[id], handleResponse(res, next));
        }
    }

    static deleteById(model:Model, id:string) {
        return (req:Request, res:Response, next)=> {
            CrudService.deleteById(model, req.params[id], handleResponse(res, next));
        }
    }

}