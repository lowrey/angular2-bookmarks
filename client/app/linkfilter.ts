import {Pipe, Injectable, PipeTransform} from "angular2/core";
import {Link} from "./link";
import {Tuil as _} from "./tuil";

@Pipe({
  name: "linkfilter",
  pure: false
})
@Injectable()
export class LinkFilter implements PipeTransform {
  transform(items: Link[], args: string[]): Link[] {
    if (args[0] === undefined || items === undefined) {
      return items;
    }
    var filterBy = args[0].toLowerCase();
    return items.filter(item => _.get(item, "name", "").toLowerCase().includes(filterBy));
  }
}
