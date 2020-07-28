import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../../Services/user/user.service';
import {AccessToken} from '../../Models/Token/access-token';

@Injectable({
  providedIn: 'root'
})
export class CaissieGuard implements CanActivate {
  constructor(private userService:UserService,private router:Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.userService.currentUser.value!=null)
    {
      if(this.userService.currentUser.value.role=="Caissié") {
        return true;
      }
    } else if(localStorage.getItem("token")!=null){
      let token: AccessToken = JSON.parse(localStorage.getItem('token'));
          if(token.role=="Caissié"){
            return true;
          }
    }
    this.router.navigate(['/dashboard']);
    return false;
  }

}
