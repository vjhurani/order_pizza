import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  showLogout: boolean = false;
  private userSubscription: Subscription;


  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.authResponse.subscribe(
    data=>{
      if ( !!data && !!data.token){
        this.showLogout = true;
      }
      else{
        this.showLogout = false;
        this.router.navigate([''])
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['']);
    this.showLogout = false;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }


}
