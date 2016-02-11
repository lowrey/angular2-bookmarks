import {Injectable} from "angular2/core";
import {Link} from "./link";
import {Http, Response} from "angular2/http";
import {Observable}     from "rxjs/Observable";

@Injectable()
export class LinkData {
    public links: Link[];
    public error: any;

    constructor(private http: Http) {
    }

    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || "Server error");
    }

    private url: string = "/assets/testdata.json";

    getLinks() {
        return this.http.get(this.url)
            .map(res => {
                return <Link[]>res.json();
            })
            .do(data => {
                return console.log(data);
            }) // eyeball results in the console
            .catch(this.handleError);
    }
}

