import {Component} from "angular2/core";
import {Link} from "./link";
import {LinkDetailComponent} from "./link-detail.component";

var LINKS:Link[] = [
    {"id": 11, "name": "lowrey.me", "url": "http://lowrey.me/"},
    {"id": 12, "name": "Narco", "url": ""},
    {"id": 13, "name": "Bombasto", "url": ""},
    {"id": 14, "name": "Celeritas", "url": ""},
    {"id": 15, "name": "Magneta", "url": ""},
    {"id": 16, "name": "RubberMan", "url": ""},
    {"id": 17, "name": "Dynama", "url": ""},
    {"id": 18, "name": "Dr IQ", "url": ""},
    {"id": 19, "name": "Magma", "url": ""},
    {"id": 20, "name": "Tornado", "url": ""}
];

@Component({
    selector: "my-app",
    template: `
    <div class="container">
    <div class="list col-sm-6">
        <h1>{{title}}</h1>
        <ul class="links">
          <li *ngFor="#link of links"
            [class.selected]="link === selectedLink"
            (click)="onSelect(link)"
            class="link">
            <span class="badge">{{link.id}}</span> {{link.name}}
          </li>
        </ul>
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
      position: relative;
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
    .links .text {
      position: relative;
      top: -3px;
    }
    .links .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0em 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0px 0px 4px;
    }
  `],
    directives: [LinkDetailComponent]
})

export class AppComponent {
    public title = "Links";
    public links = LINKS;
    public selectedLink:Link;

    onSelect(link:Link) {
        this.selectedLink = link;
    }
}


