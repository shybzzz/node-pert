import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: "shortenString"})
export class ShortenString implements PipeTransform {
    transform(inp:string, maxLength:number):any {
        return inp.length > maxLength ? inp.substring(0, maxLength) + "..." : inp;
    }

}