import {Injectable} from '@angular/core';
import {Http, HTTP_PROVIDERS, Headers, RequestOptions} from '@angular/http';
import {Observable} from "../../node_modules/rxjs/Observable";

const postOptions = new RequestOptions({
    headers: new Headers({'Content-Type': 'application/json'})
});

@Injectable()
export class CrudService {

    constructor(private http:Http) {
    }

    getAllEntities(url:string):Observable {
        return this.http.get(url)
            .map(res => res.json());
    }

    getEntityById(url:string, id:any) {
        return this.http.get(url + id)
            .map(res => res.json());
    }

    addEntity(url:string, entity:any):Observable {
        return this.http.post(url, JSON.stringify(entity), postOptions).map(res => res.json())
    }

    updateEntity(url:string, entity:any) {
        return this.http.put(url + entity._id, JSON.stringify(entity), postOptions).map(res => res.json())
    }

    deleteEntity(url:string, entity:any) {
        return this.http.delete(url + entity._id)
    }

}