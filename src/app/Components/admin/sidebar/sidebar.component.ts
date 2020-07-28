import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../Services/user/user.service';
import {Router} from '@angular/router';

declare const $: any;

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private userService: UserService,private router:Router) {
    this.userService.ROUTES.subscribe((routes) => {
      this.menuItems = routes.filter(menuItem => menuItem);
    });
  }

  ngOnInit() {


  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  logout() {
    this.userService.logout();
  }

}
