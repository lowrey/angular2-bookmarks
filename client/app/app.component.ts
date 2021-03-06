import {Component} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {HomeComponent} from "./home.component";

@RouteConfig([
  {
    path: "/",
    component: HomeComponent,
    as: "Home"
  },
  {
    path: "/:id",
    component: HomeComponent,
    as: "HomeDetail"
  }
])
@Component({
  selector: "app",
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES]
})

export class AppComponent {
  constructor() {
    console.log("Here we go");
  }
}
