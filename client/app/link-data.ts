import {Injectable} from "angular2/core";
import {Link} from "./link";
import {Http, Response, Headers} from "angular2/http";
import {Observable} from "rxjs/Observable";

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

  private allUrl: string = "/api/links";
  private url: string = "/api/link/";

  getLinks() {
    return this.http.get(this.allUrl)
      .map(res => {
        return <Link[]>res.json();
      })
      .do(data => {
        return console.log(data);
      }) // eyeball results in the console
      .catch(this.handleError);
  }

  add(link: any) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http.post(this.url, JSON.stringify(link), { headers: headers })
      .map(res => {
        return res.json();
      })
      .do(data => {
        return console.log(data);
      }) // eyeball results in the console
      .catch(this.handleError);
  }

  edit(link: any) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http.put(this.url + link._id, JSON.stringify(link), { headers: headers })
      .map(res => {
        return <Number>res.json() === 1;
      })
      .do(data => {
        return console.log(data);
      }) // eyeball results in the console
      .catch(this.handleError);
  }

  delete(id: Number) {
    return this.http.delete(this.url + id)
      .map(res => {
        return <Number>res.json() === 1;
      })
      .do(data => {
        return console.log(data);
      }) // eyeball results in the console
      .catch(this.handleError);
  }
}

