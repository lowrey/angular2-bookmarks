import {Pipe, Injectable, PipeTransform} from "angular2/core";
@Pipe({
    name: "stringfilter",
    pure: false
})
@Injectable()
export class StringFilter implements PipeTransform {
    transform(items: string[], args: string[]): string[] {
        // filter items array, items which match and return true will be kept, false will be filtered out
        var filterBy = args[0].toLowerCase();
        return items.filter(item => item.toLowerCase().includes(filterBy));
    }
}