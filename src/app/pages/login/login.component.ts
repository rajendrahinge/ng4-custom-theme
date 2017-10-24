import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {	
	
	public username:string;
	public password:string;
	public userError:boolean = false;
	public userErrorMsg:string;
	public passError:boolean = false;
	public passErrorMsg:string;
	public otherError:boolean = false;
	public otherErrorMsg:string;
	public checkPostCall:boolean = false;
	public loginCall:any = {};

	constructor(
		private router:Router, 
		private loginService:LoginService
		) {}

	ngOnInit() {}	

	/*declare namespace hasOwnProperty {
	  function call(obj, key): void;
	}*/

	isEmpty(obj) {

	    if (typeof obj == "string") {

	        obj = obj.trim();

	        if (obj === '0')  return true;
	        if (obj.length > 0)    return false;
	        if (obj.length === 0)  return true;
	    }

	    // null and undefined are "empty"
	    if (obj == null) return true;

	    if (obj == 0) return true;

	    // Assume if it has a length property with a non-zero value
	    // that that property is correct.
	    // if (obj.length > 0)    return false;
	    // if (obj.length === 0)  return true;

	    // If it isn't an object at this point
	    // it is empty, but it can't be anything *but* empty
	    // Is it empty?  Depends on your application.
	    // if (typeof obj !== "object") return true;

	    if (typeof obj == "number") {
	        if (obj.toString() === '0')  return true;        
	        if (obj.toString().length > 0) return false;        
	        if (obj.toString().length === 0) return true;
	    }

	    if (typeof obj == "object") {

	        if (obj.length > 0) return false;
	        if (obj.length === 0) return true;

	        // Otherwise, does it have any properties of its own?
	        // Note that this doesn't handle
	        // toString and valueOf enumeration bugs in IE < 9
	        for (let key in obj) {
	            //if (hasOwnProperty.call(obj, key)) return false;
	        	if (obj && (Object.keys(key).length === 0)) return false;
	        }
	        
	    }

	    return true;
	}

	chLogin(events) {		
		events.preventDefault();
		this.username = events.target.elements[0].value;
		this.password = events.target.elements[1].value; 
		this.userError = false;
		this.passError = false;
		if(this.username == '') {
			this.userError = true;
			this.userErrorMsg = 'Please add username';
		}
		if(this.password == '') {
			this.passError = true;
			this.passErrorMsg = 'Please add password';
		}

		if(this.passError == false && this.userError == false) {

			this.loginService.CheckLogin(this.username,this.password)
			.subscribe( loginResponse => {
						if ( !!loginResponse ) {
							this.loginCall = loginResponse;
							this.otherError    = false;
							if(typeof this.loginCall.error_code != 'undefined' && this.loginCall.error_code != '') {
								this.otherError    = true;
								this.otherErrorMsg = this.loginCall.error_messages[0];
							}
							// email : admin@justcrm.in 
							if(typeof this.loginCall.code != 'undefined' && this.loginCall.code == 200) {
								this.router.navigate(['/dashboard']);
							}							
						} 
					}
				);
		}
		return false;
	}
}