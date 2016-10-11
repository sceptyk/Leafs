import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [
        AuthService
    ]
})
export class LoginPage {

    private credentials: {
        email: string;
        password: string;
    } = { email: "", password: "" };

    constructor(
        private navCtrl: NavController,
        private as: AuthService
    ) {
        this.as.isUser().subscribe(observer => {
            this.redirect();
        });
    }

    public signInWithFacebook() {
        this.as.loginWithFacebook();
    }

    public signInWithGoogle() {
        this.as.loginWithGoogle().subscribe(observer => {
            console.log(observer);
        });
    }

    public signInWithEmail() {
        this.as.loginWithEmail(this.credentials);
    }

    public signUpWithEmail() {
        this.as.registerUser(this.credentials).subscribe(data => {
            if (data.created) {
                this.redirect();
            }
        });
    }

    private redirect() {
        this.navCtrl.setRoot(TabsPage);
    }
}
