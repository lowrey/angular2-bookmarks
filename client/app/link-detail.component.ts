import {Component} from "angular2/core";
import {Link} from "./link";

@Component({
    inputs: ["link"],
    selector: "link-detail",
    template: `
    <div *ngIf="link">
      <h2><a href="#" (click)="openTab()">{{link.name}}</a></h2>
      <!--
      <div>
        <label>id: </label>{{link.id}}
      </div>
      -->
      <div>
        <label>url: </label>
        <input [(ngModel)]="link.url" placeholder="url"/>
      </div>
      <div>
        <label>notes: </label>
        <div>
          <textarea [(ngModel)]="link.notes" 
          placeholder="notes">
          </textarea>
        </div>
      </div>
      <!--<div>-->
        <!--<label>link: </label>-->
        <!--<a [href]="link.url">{{link.name}}</a>-->
      <!--</div>-->
    </div>
  `,
})
export class LinkDetailComponent {
    public link: Link;

    openTab() {
        window.open(this.link.url, "_blank");
    }
}
