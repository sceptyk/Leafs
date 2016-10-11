import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods} from "angularfire2";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {

  constructor(private af: AngularFire) {}

  public isUser(){
    return Observable.create(observer => {
      this.af.auth.subscribe(authData => {
        if (authData) {
          observer.next(this.handleAuthData(authData));
        } else {
          observer.error();
        }
      });
    });
  }

  public registerUser(credentials: any) {
    return Observable.create(observer => {
      this.af.auth.createUser(credentials).then(authData => {
        observer.next(this.handleAuthData(authData));
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  public loginWithEmail(credentials) {
    return Observable.create(observer => {
      this.af.auth.login(credentials, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((authData) => {
        observer.next(this.handleAuthData(authData));
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  public loginWithFacebook() {
    return Observable.create(observer => {
      this.af.auth.login({
        provider: AuthProviders.Facebook,
        method: AuthMethods.Popup
      }).then((authData) => {
        observer.next(this.handleAuthData(authData));
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  public loginWithGoogle() {
    return Observable.create(observer => {
      this.af.auth.login({
        provider: AuthProviders.Google,
        method: AuthMethods.Popup
      }).then((authData) => {
        observer.next(this.handleAuthData(authData));
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  public logout() {
    this.af.auth.logout();
  }

  private handleAuthData(authData){

    return authData;
  }
}