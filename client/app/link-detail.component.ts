import {Component} from "angular2/core";
import {Link} from "./link";
import {LinkData} from "./link-data";

@Component({
  inputs: ["link"],
  selector: "link-detail",
  templateUrl: "assets/link-detail.tpl.html",
})
export class LinkDetailComponent {
  public link: Link;
  public status: string = "";

  constructor(private linkData: LinkData) {
  }

  onSubmit(form){
    if(form.valid){
    this.linkData.edit(this.link)
      .subscribe(
      data => {
        this.status = "Updated";
      },
      error => this.status = <any>error);
    }
  }

  openTab() {
    window.open(this.link.url, "_blank");
  }
}
