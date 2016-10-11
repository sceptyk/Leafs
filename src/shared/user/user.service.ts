import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods} from "angularfire2";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {

    constructor(private af: AngularFire) { }

    public getCard() {
        return Observable.create(observer => {
            this.af.auth.subscribe(authData => {
                this.af.database.object('users' + authData.uid).subscribe(userData => {
                    console.log(userData);
                    observer.next(userData);
                    observer.complete();
                });
            });
        });
    }

    public getLinks() {
        return Observable.create(observer => {
            this.af.auth.subscribe(authData => {
                this.af.database.list('/details/' + authData.uid).subscribe(data => {
                    observer.next(data);
                    observer.complete();
                });
            });
        });
    }

    public updateCard(userData) {
        return Observable.create(obsever => {
            this.af.auth.subscribe(authData => {
                this.af.database.object('/users/' + authData.uid).update(userData);
            });
        });
    }

    public addLink(newLink){
        return Observable.create(observer => {
            this.af.auth.subscribe(authData => {
                this.af.database.list('/details/' + authData.uid).push(newLink);
            })
        });
    }
}