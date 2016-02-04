import {Link} from "./link";

export class LinkData {
    public links:Link[];

    constructor() {
        this.links = [
            {"id": 11, "name": "lowrey.me", "url": "http://lowrey.me/"},
            {"id": 12, "name": "Mystery", "url": "https://www.youtube.com/watch?v=YQpLNCRIxWA"},
        ];
    }
}
