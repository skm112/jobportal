import { Injectable, Inject } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
@Injectable()
export class CanActivateAuthGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate() {
        if (localStorage.getItem('token')) {
            return true;
        } else {
            this.router.navigateByUrl("/login");

        }
        return false;
    }
}

