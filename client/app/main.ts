import {AppComponent} from "./app.component";
import {bootstrap}    from "angular2/platform/browser";
import {provide}    from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_PROVIDERS, LocationStrategy, PathLocationStrategy} from "angular2/router";
import "rxjs/Rx";

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    CORE_DIRECTIVES,
    provide(LocationStrategy, { useClass: PathLocationStrategy })
]);
