import {AppComponent} from "./app.component";
import {bootstrap}    from "angular2/platform/browser";
import {provide}    from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_BINDINGS, ROUTER_PROVIDERS, LocationStrategy, PathLocationStrategy} from "angular2/router";

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    CORE_DIRECTIVES,
    provide(LocationStrategy, {useClass: PathLocationStrategy})
]);
