import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './pages/login/login.service';
import { LoginComponent } from './pages/login/login.component';

@Injectable()
export class AuthguardGuard implements CanActivate {
	
	constructor(private login: LoginService,private loginData : LoginComponent,private router:Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {

		/*if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }*/

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
		//return this.login.CheckLogin( this.loginData.username , this.loginData.password );
	}
}
