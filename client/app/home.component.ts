import {Component,  OnInit} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {Link} from "./link";
import {LinkData} from "./link-data";
import {LinkDetailComponent} from "./link-detail.component";
import {LinkFilter} from "./linkfilter";

@Component({
    selector: "Home",
    templateUrl: "assets/home.tpl.html",
    styleUrls: ["assets/home.styles.css"],
    directives: [LinkDetailComponent],
    providers: [
        HTTP_PROVIDERS,
        LinkData,
        LinkFilter
    ]
})

export class HomeComponent implements OnInit {
    title:string = "Bookmarks";
    private allLinks:Link[];
    links:Link[];
    error:any;
    selectedLink:Link;

    constructor(private linkData:LinkData, private linkFilter: LinkFilter) {
    }

    ngOnInit() {
        this.getLinks();
    }

    getLinks() {
        this.linkData.getLinks()
            .subscribe(
                data => {
                  this.allLinks = data;
                  this.links = data;
                },
                error => this.error = <any>error);
    }

    filterLinks(filter:string){
      this.links = this.linkFilter.transform(this.allLinks, [filter]);
    }

    onSelect(link:Link) {
        this.selectedLink = link;
    }
}
