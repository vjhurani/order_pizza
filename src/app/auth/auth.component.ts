import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {AuthRequest} from "./auth-request.model";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthResponse} from "./auth-response.model";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  error = "";
  constructor( private authService : AuthService, private router: Router) {
  }
  onSubmit(authForm: NgForm){
    if(!authForm.valid) {
      return;
    }
    let authObs: Observable<AuthResponse>;

    let authRequest = new AuthRequest(authForm.value.username,authForm.value.password);
    authObs = this.authService.authenticateUser(authRequest);

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.router.navigate(['/orders']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;

      }
    );

    authForm.reset();
  }

  ngOnInit(): void {
  }

}
