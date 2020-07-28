import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/filter';
import {Location, PopStateEvent} from '@angular/common';
import {Router, NavigationEnd, NavigationStart} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import * as $ from 'jquery';
import {UserService} from './Services/user/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

}
