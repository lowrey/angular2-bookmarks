import {Component,  OnInit} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {Link} from "./link";
import {LinkData} from "./link-data";
import {LinkDetailComponent} from "./link-detail.component";
import {LinkFilter} from "./linkfilter";

@Component({
    selector: "Home",
    template: `
    <div class="container">
    <div class="list col-sm-6">
        <h1>{{title}}</h1>
        <div class="row">
        <form class="form-horizontal col-sm-12">
          <div class="form-group">
            <label for="flink" class="control-label col-sm-2">Filter: </label>
            <div class="col-sm-10">
              <input #flink (keyup)="filterLinks(flink.value)" class="form-control" id="flink" type="text"/>
            </div>
          </div>
        </form>
        </div>
        <div class="row">
        <ul class="links row">
          <li *ngFor="#link of links"
            [class.selected]="link === selectedLink"
            (click)="onSelect(link)"
            class="link">
            <span class="badge">{{link.id}}</span> {{link.name}}
          </li>
        </ul>
        </div>
    </div>
    <div class="detail col-sm-6">
        <my-link-detail [link]="selectedLink"></my-link-detail>
    </div>
    </div> 
  `,
    styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .links {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
    }
    .links li {
      cursor: pointer;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      border-radius: 4px;
    }
    .links li.selected:hover {
      color: white;
    }
    .links li:hover {
      color: #607D8B;
      background-color: #EEE;
      left: .1em;
    }
    .links .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0em 0.7em;
      background-color: #607D8B;
      height: 2.0em;
      margin-right: .8em;
    }
    .detail{
      position: fixed;
      right: 5px;
    }
  `],
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
