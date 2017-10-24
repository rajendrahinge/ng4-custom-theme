import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

interface userResponse{
  error_code : number,
  error_messages : any[];
}

@Injectable()
export class LoginService {

  private isUserLoggedIn;
  private postData:any;
  private resData:any;
  

  constructor(private http:Http) { 
  	this.isUserLoggedIn = false;
  }

  setUserLoggedIn() {
  	this.isUserLoggedIn = true;
  }

  getUserLoggedIn() {
  	return this.isUserLoggedIn;
  }

  CheckLogin (username:string , pass:string) : Observable<boolean> {
    
    this.postData = {
      parameters: [{
        callName: ['checkLogin'],
        params:   {
          emailId:username,
          password:pass,
          panelTypeId:1
        }
      }]
    }

    //this.http.post( 'http://justcrm_api.justcrm.com/api' , this.postData ).subscribe(res => {console.log(res)});
    return this.http.post( 'http://justcrm_api.justcrm.com/api' , this.postData ).map(res => res.json());

  }

}
